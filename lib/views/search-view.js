/*global  _, $*/
"use strict";

// Filename: views/search-view.js
var NotImplementedException = require('../helpers/custom_exception').NotImplementedException;
var ErrorHelper = require('../helpers/error_helper');
var form_helper = require('../helpers/form_helper');
var ModelValidator = require('../helpers/model_validation_promise');
var CoreView = require('./core-view');
var errorHelper = require('../helpers/error_helper');
var backboneNotification = require("../helpers/backbone_notification");

var SearchView;
SearchView = CoreView.extend({
  tagName: 'div',
  className: 'searchView',
  ResultsView: undefined,
  Results: undefined,
  search: undefined,
  resultsSelector: 'div#results',
  isMoreCriteria: false,

  //Default options of the search view.
  defaultOptions: _.extend({}, CoreView.prototype.defaultOptions, {
    isRefreshSearchOnInputChange: true
  }),

  initialize: function initializeSearch(options) {
    options = options || {};
    // Call the initialize function of the core view.
    CoreView.prototype.initialize.call(this, options);
    this.isSearchTriggered = options.isSearchTriggered || false;
    this.stopListening(this.model, "reset");
    this.isReadOnly = options.isReadOnly || false;
    this.model.set({
      isCriteriaReadonly: false
    }, {
      silent: true
    });

    //init results collection
    if (!this.Results) {
      throw new NotImplementedException('Your view should have a Reference to the result collection in the Results property', this);
    }
    if (!this.ResultsView) {
      throw new NotImplementedException('Your view should have a Reference to the ResultsView in order to display the results', this);
    }
    this.searchResults = new this.Results();
    //initialization of the result view
    this.searchResultsView = new this.ResultsView({
      model: this.searchResults,
      criteria: this.model,
      searchView: this,
      isSearchTriggered: false
    });
    //handle the clear criteria action
    this.listenTo(this.model, 'change', this.render);
    this.listenTo(this.searchResultsView, 'results:fetchDemand', function () {
      this.runSearch(null, {
        isFormBinded: false
      });
    });
    this.listenTo(this.searchResultsView, 'listview:lineSelected', function () {
      $('.collapse', this.$el).collapse('hide');
    });
    var currentView = this;
    this.session.get().then(function (crit) {
      //Restore the criteria if save into the session.
      if (crit !== undefined && crit !== null && crit.pageInfo !== undefined && crit.pageInfo !== null) {
        currentView.model.set(crit.criteria, {
          silent: false
        });
        currentView.searchResults.setPageInfo(crit.pageInfo);
        currentView.isSearchTriggered = true;
      }
      //If the serach has to be triggered, trigger it.
      if (currentView.isSearchTriggered) {
        currentView.runSearch(null, {
          isFormBinded: false
        });
      }
    }, function (error) {
      errorHelper.manageResponseErrors(error);
    });

    if (this.opts.isRefreshSearchOnInputChange) {
      this.events = _.extend({}, this.events, this.defaultEvents, this.refreshSearchOnInputChangeEvents);
    }
    this.delegateEvents();
  },

  events: {
    "submit form": 'runSearch', // Launch the search.
    "click button.btnReset": 'clearSearchCriteria', // Reset all the criteria.
    "click button.btnEditCriteria": 'editCriteria', //Deal with the edit mode.
    "click button.toogleCriteria": 'toogleMoreCriteria', // Deal with the more / less criteria.
    "click .panel-heading": "toggleCollapse",
    "click button.btnCreate": "create"
  },

  refreshSearchOnInputChangeEvents: {
    "change [data-refresh]  input:not([noRefresh])": "runSearch",
    "change [data-refresh] select:not([noRefresh]) ": "runSearch"
  },

  //Change the fact that the view is in the mode mode or less criteria.
  toogleMoreCriteria: function toogleMoreCriteria() {
    this.isMoreCriteria = !this.isMoreCriteria;
    form_helper.formModelBinder({
      inputs: $('input', this.$el)
    }, this.model);
    this.render();
  },
  //get the JSON to attach to the template
  getRenderData: function getRenderDataSearch() {
    var jsonToRender = this.model.toJSON();
    if (this.model.references) {
      _.extend(jsonToRender, this.model.references);
    }
    return jsonToRender;
  },

  editCriteria: function editCriteria() {
    this.model.set({
      isCriteriaReadonly: false
    });
  },
  create: function createNavigate() {
    this.searchResultsView.create();
  },

  searchSuccess: function searchSuccess(jsonResponse) {
    this.searchResults.setTotalRecords(jsonResponse.totalRecords);
    this.searchResults.reset(jsonResponse.values);
  },
  searchError: function searchError(response) {
    this.searchResults.reset([]);
    ErrorHelper.manageResponseErrors(response, {
      isDisplay: true,
      model: this.model
    });
  },
  /**
   * Get the criteria from the view.
   * @return {object} A clone of the json model.
   */
  getCriteria: function () {
    return _.clone(this.model.toJSON());
  },
  /**
   * Run the search whent it is trigerred by the formaction or the session saved criteria.
   * @param  {object} event   - jQuery event.
   * @param  {object} options - Options for the running search.
   * @return {undefined}
   */
  runSearch: function runSearchSearchView(event, options) {
    var searchButton;
    var isEvent = event !== undefined && event !== null;
    if (isEvent) {
      event.preventDefault();
      searchButton = $("button[type=submit]", event.target); // retrieving the button that triggered the search
    }
    options = options || {};
    var isFormBinded = options.isFormBinded === undefined ? true : options.isFormBinded;
    //bind form fields on model
    if (isFormBinded) {
      form_helper.formModelBinder({
        inputs: $('input', this.$el),
        options: $('select', this.$el)
      }, this.model);
    }
    //Render loading inside the search results:
    this.searchResultsView.opts.isReadyResultsData = false;
    this.searchResultsView.render();
    var currentView = this;
    ModelValidator
        .validate(this.model)
        .then(function(model) {
          currentView.model.unsetErrors({
            silent: false
          });
          var criteria = currentView.getCriteria();
          var pageInfo = currentView.searchResults.pageInfo();

          if (isEvent) {
            pageInfo.currentPage = 1;
          }
          if (!currentView.search) {
            throw new NotImplementedException('The search property of this view is not defined, the search cannot be launched.', this);
          }
          currentView
              .search(criteria, pageInfo)
              .then(function success(jsonResponse) {
                //Save the criteria in session.
                currentView.searchResultsView.opts.isReadyResultsData = true;
                currentView.searchResultsView.isSearchTriggered = true;
                currentView.searchResults.setPageInfo(pageInfo);
                currentView.session.save({
                  criteria: criteria,
                  pageInfo: pageInfo
                }).then(function (s) {
                  //console.log('criteria save in session', s);
                  backboneNotification.clearNotifications();
                  return currentView.searchSuccess(jsonResponse);
                });
              }).then(null, function error(errorResponse) {
                currentView.searchResultsView.opts.isReadyResultsData = true;
                currentView.searchError(errorResponse);
              }).then(function resetButton() {
                if (searchButton) {
                  searchButton.button('reset');
                }
              });
        }).then(null, function error(errors) {
          currentView.model.setErrors(errors);
          if (searchButton) {
            searchButton.button('reset');
          }
        });

    if (this.isReadOnly) {
      this.model.set({
        isCriteriaReadonly: true
      });
    }
  },

  clearSearchCriteria: function clearSearchCriteria(event) {
    event.preventDefault();
    this.model.clear();
    var currentView = this;
    this.session.get().then(function (item) {
      if (item !== null) {
        currentView.session.delete().then(function(item){}); // clear session criteria.
      }
      currentView.searchResultsView.isSearchTriggered = false;
      currentView.searchResults.reset();
    });
  },

  // Get the id of the criteria.
  getSessionKey: function getSessionKey() {
    var hash = CoreView.prototype.getSessionKey.call(this);
    if (this.opts.criteriaId !== undefined) {
      hash += this.opts.criteriaId;
    }
    return hash;
  },

  render: function renderSearch(options) {
    options = options || {};
    CoreView.prototype.render.call(this, options);
    this.$el.html(this.template(_.extend({
      isMoreCriteria: this.isMoreCriteria
    }, this.getRenderData())));
    $(this.resultsSelector, this.$el).html(this.searchResultsView.render().el);
    return this;
  },
  afterRender: function postRenderSearchView() {
    CoreView.prototype.afterRender.call(this);
    $('.collapse', this.$el).collapse('show');
  }
});

module.exports = SearchView;