/*global Backbone, i18n, $*/

(function(NS) {
	NS = NS || {};
	var isInBrowser = typeof module === 'undefined' && typeof window !== 'undefined';
	var NotImplementedException = isInBrowser ? NS.Helpers.Exceptions.NotImplementedException : require('../helpers/custom_exception').NotImplementedException;
	var _url = isInBrowser ? NS.Helpers.urlHelper : require('../helpers/url_helper');
	var templatePagination = function() {}; //Todo: call a handlebar herlper.//require('../templates/collection-pagination');

	var SearchResultsView = Backbone.View.extend({
		tagName: 'div',
		className: 'resultView',
		resultsPagination: 'div#pagination',
		templatePagination: templatePagination,
		initialize: function initializeSearchResult(options) {
			this.listenTo(this.model, "reset", function() {
				this.render({
					isSearchTriggered: true
				});
			}, this);
		},
		events: {
			'click tbody tr': 'lineSelection',
			'click .pagination li': 'goToPage',
			'click a.sortColumn': 'sortCollection'
		},

		sortCollection: function sortCollection(event) {
			event.preventDefault();
			var collectionInfos = this.model.pageInfo();
			var sortField = event.target.getAttribute("data-name");
			var currentSort = collectionInfos.sortField;
			var order = "asc";
			if (currentSort !== undefined && sortField === currentSort.field && currentSort.order === "asc") {
				order = "desc";
			}
			this.model.setSortField(sortField, order);
			this.fetchDemand();
		},

		goToPage: function goToPage(event) {
			event.preventDefault();
			var page = +event.target.getAttribute("data-page");
			this.model.setPage(page);
			this.fetchDemand();
		},

		nextPage: function nextPage(event) {
			event.preventDefault();
			this.model.setNextPage();
			this.fetchDemand();
		},

		previousPage: function PreviousPage(event) {
			event.preventDefault();
			this.model.setPreviousPage();
			this.fetchDemand();
		},

		fetchDemand: function fetchDemand() {
			this.trigger('results:fetchDemand');
		},

		lineSelection: function lineSelectionSearchResults(event) {
			event.preventDefault();
			//throw new NotImplementedException('lineSelection');
			var id = +event.target.parentElement.getAttribute('id');
			//Navigate 
			var url = _url.generateUrl([this.model.model.prototype.modelName, id]);
			//Backbone.Notification.clearNotifications();
			Backbone.history.navigate(url, true);
		},

		render: function renderSearchResults(options) {
			options = options || {};
			//If the research was not launch triggered.
			if (!options.isSearchTriggered) {
				return this;
			}
			//If there is no result.
			if (this.model.length === 0) {
				//Is recherche launched.
				this.$el.html("<p>No results...</p>");
				Backbone.Notification.addNotification({
					type: 'info',
					message: i18n.t('search.noResult')
				}, true);
			} else {
				//the template must have named property to iterate over it
				var infos = this.model.pageInfo();
				this.$el.html(this.template({
					collection: this.model.toJSON(),
					sortField: infos.sortField.field,
					order: infos.sortField.order
				}));

				//render pagination
				$(this.resultsPagination, this.$el).html(this.templatePagination(this.model.pageInfo())); //TODO : this.model.pageInfo() {currentPage: 0, firstPage: 0, totalPages: 10}
			}
			return this;
		}
	});

	// Differenciating export for node or browser.
	if (isInBrowser) {
		NS.Views = NS.Views || {};
		NS.Views.SearchResultsView = SearchResultsView;
	} else {
		module.exports = SearchResultsView;
	}
})(typeof module === 'undefined' && typeof window !== 'undefined' ? window.Fmk : module.exports);