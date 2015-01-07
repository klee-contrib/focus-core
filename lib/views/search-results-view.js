/*global  i18n, _*/
"use strict";
// Filename: views/search-results-view.js


//Dependencies.
var ListView = require('./list-view');
var templateNoResults = require('../templates/hbs/noResults.hbs');

//View to use in order to display search results.
var SearchResultsView = ListView.extend({

  //Defaults options of the searchresults view.
  defaultOptions: _.extend({}, ListView.prototype.defaultOptions, {
    isModelToLoad: false,
    isReadyResultsData: true
  }),

  initialize: function initializeListView(options) {
    options = options || {};
    ListView.prototype.initialize.call(this, options);
    this.isSearchTriggered = options.isSearchTriggered || false;
  },

  // Get the criteria used to get the results.
  getCriteria: function getCriteriaResultsView() {
    var criteria = this.opts.searchView.getCriteria();
    return _.extend({}, ListView.prototype.getCriteria.call(this), criteria);
  },

  //Template use in order to display the fact that there is no results.
  templateNoResults: templateNoResults,

  //Trigger a fetch for the consultation
  fetchDemand: function fetchDemandResultView() {
    this.trigger('results:fetchDemand');
  },
  render: function renderSearchResultView(options) {
    options = options || {};
    //If the research was not launch triggered.
    return ListView.prototype.render.call(this, options);
  },
  //Function call when there is no result.
  renderEmptyList: function renderEmptySearchResults() {
    //Is recherche launched.
    if (this.isSearchTriggered) {
      this.$el.html(this.templateNoResults({
        message: i18n.t('search.noResult')
      }));
    } else {
      this.$el.html(this.templateNoResults({
        message: i18n.t('search.ready')
      }));
    }
  },
  toggleEditMode: function toogleEditModeSRV(event) {
    if (event) {
      event.preventDefault();
    }
    this.isEdit = !this.isEdit;
    this.render({
      isSearchTriggered: true
    }); //todo: fix this to have no options.
  },
  //Indicate if the function is ready to be displayed. If not the spinner is display.
  isReady: function readySearchResults() {
    return this.opts.isReadyResultsData === true && ListView.prototype.isReady.call(this);
  },

  saveCriteria: function saveSearchCriteria(criteria, pageInfo) {
    this.session.save({criteria: criteria, pageInfo: pageInfo}).then(function (s) {
      console.log('criteria save in session', s);
    });
  }
});

module.exports = SearchResultsView;