/*global Backbone, _, $, Promise, window*/
"use strict";
(function (NS) {
    // Filename: views/search-view.js
    NS = NS || {};
    var isInBrowser = typeof module === 'undefined' && typeof window !== 'undefined';
    var NotImplementedException = isInBrowser ? NS.Helpers.Exceptions.NotImplementedException : require('../helpers/custom_exception').NotImplementedException;
    var ErrorHelper = isInBrowser ? NS.Helpers.errorHelper : require('../helpers/error_helper');
    var form_helper = isInBrowser ? NS.Helpers.formHelper : require('../helpers/form_helper');
    var ModelValidator = isInBrowser ? NS.Helpers.modelValidationPromise : require('../helpers/modelValidationPromise');
    var CoreView = isInBrowser ? NS.Views.CoreView : require('./core-view');
    var errorHelper = isInBrowser ? NS.Helpers.errorHelper : require('../helpers/error_helper');
    var backboneNotification = isInBrowser ? NS.Helpers.backboneNotification : require("../helpers/backbone_notification");

    var SearchView = CoreView.extend({
        tagName: 'div',
        className: 'searchView',
        ResultsView: undefined,
        Results: undefined,
        search: undefined,
        resultsSelector: 'div#results',
        isMoreCriteria: false,

        //Default options of the search view.
        defaultOptions: _.extend({}, Fmk.Views.CoreView.prototype.defaultOptions, {
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
            this.searchResults = new this.Results();
            //initialization of the result view 
            this.searchResultsView = new this.ResultsView({
                model: this.searchResults,
                criteria: this.model,
                searchView: this
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
            this.getSessionCriteria().then(function (crit) {
                //Restore the criteria if save into the session.
                if (crit !== undefined && crit !== null && crit.pageInfo !== undefined && crit.pageInfo !== null) {
                    currentView.model.set(crit.criteria, { silent: false });
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
                this.events = _.extend({}, this.defaultEvents, this.refreshSearchOnInputChangeEvents);
            }
            this.delegateEvents();
        },

        defaultEvents: {
            "submit form": 'runSearch', // Launch the search.
            "click button.btnReset": 'clearSearchCriteria', // Reset all the criteria.
            "click button.btnEditCriteria": 'editCriteria', //Deal with the edit mode.
            "click button.toogleCriteria": 'toogleMoreCriteria', // Deal with the more / less criteria.
            "click .panel-heading": "toogleCollapse"
        },

        events: this.defaultEvents,

        refreshSearchOnInputChangeEvents: {
            "change input:not([noRefresh])": "runSearch",
            "change select:not([noRefresh]) ": "runSearch"
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
            return this.model.toJSON();
        },

        editCriteria: function editCriteria() {
            this.model.set({
                isCriteriaReadonly: false
            });
        },

        searchSuccess: function searchSuccess(jsonResponse) {
            this.searchResults.setTotalRecords(jsonResponse.totalRecords);
            this.searchResults.reset(jsonResponse.values);
        },
        searchError: function searchError(response) {
            this.searchResults.reset([]);
            ErrorHelper.manageResponseErrors(response, {
                isDisplay: true
            });
        },

        getCriteria: function () {
            return _.clone(_.omit(this.model.toJSON(), this.referenceNames));
        },

        runSearch: function runSearchSearchView(event, options) {
            var searchButton;
            if (event !== undefined && event !== null) {
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
				.then(function (model) {
				    currentView.model.unsetErrors({
				        silent: false
				    });
				    var criteria = currentView.getCriteria();
				    var pageInfo = currentView.searchResults.pageInfo();
				    currentView.search(criteria, pageInfo)
						.then(function success(jsonResponse) {
						    //Save the criteria in session.
						    currentView.searchResultsView.opts.isReadyResultsData = true;
						    currentView.saveSessionCriteria({
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
            //Backbone.Notification.clearNotifications();
            var unchanged = {};
            var vals = this.getUnchangedFields();
            for (var i in vals) {
                unchanged[vals[i]] = this.model.get(vals[i]);
            }
            this.model.clear();
            for (field in unchanged) {
                this.model.set(field, unchanged[field], { silent: true });
            }
            this.saveSessionCriteria({}); // clear session criteria.
            this.initialize(); //Call initialize again in order to refresh the view with criteria lists.
        },

        getUnchangedFields: function getUnchangedFields() { return [] },

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

    /*ModelValidator.validate(this.model)
			.catch (currentView.model.setErrors)
			.then(function(model) {
				currentView.model.unsetErrors();
				currentView.search(currentView.model.toJSON())
					//.then(currentView.searchSuccess.bind(currentView))
					.then(currentView.searchResults.reset.bind(currentView.searchResults))
					.catch (currentView.searchError.bind(currentView))
			});*/

    // Differenciating export for node or browser.
    if (isInBrowser) {
        NS.Views = NS.Views || {};
        NS.Views.SearchView = SearchView;
    } else {
        module.exports = SearchView;
    }
})(typeof module === 'undefined' && typeof window !== 'undefined' ? window.Fmk : module.exports);