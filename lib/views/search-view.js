/*global Backbone, _, $, Promise*/

(function(NS) {
	NS = NS || {};
	var isInBrowser = typeof module === 'undefined' && typeof window !== 'undefined';
	var NotImplementedException = isInBrowser ? NS.Helpers.Exceptions.NotImplementedException : require('../helpers/custom_exception').NotImplementedException;
	var ErrorHelper = isInBrowser ? NS.Helpers.errorHelper : require('../helpers/error_helper');
	var form_helper = isInBrowser ? NS.Helpers.formHelper : require('../helpers/form_helper');
	var _url = isInBrowser ? NS.Helpers.urlHelper : require('../helpers/url_helper');
	var ModelValidator = isInBrowser ? NS.Helpers.modelValidationPromise : require('../helpers/modelValidationPromise');
	var RefHelper = isInBrowser ? NS.Helpers.referenceHelper : require('../helpers/reference_helper');

	var SearchView = Backbone.View.extend({
		tagName: 'div',
		className: 'searchView',
		ResultsView: undefined,
		Results: undefined,
		search: undefined,
		resultsSelector: 'div#results',
		isMoreCriteria: false,
		referenceNames: undefined,
		initialize: function initializeSearch(options) {
			options = options || {};
			this.isSearchTriggered = options.isSearchTriggered || false;
			this.isReadOnly = options.isReadOnly || false;
			this.model.set({
				isCriteriaReadonly: false
			}, {
				silent: true
			});

			//init results collection
			this.searchResults = new this.Results();
			//handle the clear criteria action
			this.listenTo(this.model, 'change', this.render);
			//initialization of the result view 
			this.searchResultsView = new this.ResultsView({
				model: this.searchResults,
				criteria: this.model
			});
			this.listenTo(this.searchResultsView, 'results:fetchDemand', function() {
				this.runSearch(null, {
					isFormBinded: false
				});
			});
			if (this.isSearchTriggered) {
				this.runSearch(null, {
					isFormBinded: false
				});
			}
			//Load all the references lists which are defined in referenceNames.

			var currentView = this;
			Promise.all(RefHelper.loadMany(this.referenceNames)).then(function(results) {
				var res = {}; //Container for all the results.
				for (var i = 0, l = results.length; i < l; i++) {
					res[currentView.referenceNames[i].name] = results[i];
					//The results are save into an object with a name for each reference list.
				}
				currentView.model.set(res); //This trigger a render due to model change.
				currentView.isReady = true; //Inform the view that we are ready to render well.
			}).
			catch (function(e) {
				console.error("error when getting your stuff", e);
			});
		},

		events: {
			"submit form": 'runSearch', // Launch the search.
			"click button#btnReset": 'clearSearchCriteria', // Reset all the criteria.
			"click button#btnEditCriteria": 'editCriteria', //Deal with the edit mode.
			"click button.toogleCriteria": 'toogleMoreCriteria' // Deal with the more / less criteria.
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
			throw new NotImplementedException('getRenderData');
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
			ErrorHelper.manageResponseErrors(response, {
				isDisplay: true
			});
		},

		runSearch: function runSearch(event, options) {
			if (event !== undefined && event !== null) {
				event.preventDefault();
			}
			options = options || {};
			var isFormBinded = options.isFormBinded || true;
			//bind form fields on model
			if (isFormBinded) {
				form_helper.formModelBinder({
					inputs: $('input', this.$el)
				}, this.model);
			}
			var currentView = this;
			ModelValidator
				.validate(this.model)
				.then(function(model) {
					currentView.model.unsetErrors();
					currentView.search(currentView.model.toJSON(), currentView.searchResults.pageInfo())
						.then(function success(jsonResponse) {
							return currentView.searchSuccess(jsonResponse);
						}).
					catch (function error(errorResponse) {
						currentView.searchError(errorResponse);
					});
				}).
			catch (function error(errors) {
				currentView.model.setErrors(errors);
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
			this.model.clear();
			this.initialize(); //Call initialize again in order to refresh the view with criteria lists.
		},

		render: function renderSearch() {
			this.$el.html(this.template(_.extend({
				isMoreCriteria: this.isMoreCriteria
			}, this.getRenderData())));
			$(this.resultsSelector, this.$el).html(this.searchResultsView.render().el);
			return this;
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