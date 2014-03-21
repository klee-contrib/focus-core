/*global Backbone, i18n, $, window*/
"use strict";
(function (NS) {
    // Filename: views/list-view.js
    NS = NS || {};
    var isInBrowser = typeof module === 'undefined' && typeof window !== 'undefined';
    //var NotImplementedException = isInBrowser ? NS.Helpers.Exceptions.NotImplementedException : require('../helpers/custom_exception').NotImplementedException;
    var _url = isInBrowser ? NS.Helpers.urlHelper : require('../helpers/url_helper');
    var templatePagination = function () { }; //Todo: call a handlebar herlper.//require('../templates/collection-pagination');
    var CoreView = isInBrowser ? NS.Views.CoreView : require('./core-view');
    
    var ListView = CoreView.extend({
        tagName: 'div',
        className: 'resultView',
        resultsPagination: 'div#pagination',
        templatePagination: templatePagination,
        search: undefined,
        searchCriteria: {},
        initialize: function initializeSearchResult(options) {
            options = options || {};
            CoreView.prototype.initialize.call(this);
           
            this.listenTo(this.model, "reset", function () {
                this.render({
                    isSearchTriggered: true
                });
            }, this);

            if (this.search !== undefined) {
                // Fusion des critères venant du rooter (options.searchCriteria) et de la vue (this.searchCriteria).
                var criteria = {};
                _.extend(criteria, this.searchCriteria, options.searchCriteria)

                var currentView = this;
                //Call the service and inject the result into the model.    
                this.search(criteria, this.model.pageInfo()).then(function success(jsonResponse) {
                    currentView.model.setTotalRecords(jsonResponse.totalRecords);
                    currentView.model.reset(jsonResponse.values);
                }).then(null, function error(errorResponse) {
                    Fmk.Helpers.errorHelper.manageResponseErrors(errorResponse, {
                        isDisplay: true
                    });
                });
            }
        },
        events: {
            'click tbody td[data-selection]': 'lineSelection',
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

        generateNavigationUrl: function generateNavigationUrl(id) {
            return _url.generateUrl([this.model.model.prototype.modelName.replace('.', '/'), 'show', id]);
        },

        lineSelection: function lineSelectionSearchResults(event) {
            event.preventDefault();
            var id = +event.target.parentElement.getAttribute('id');
            //Navigate 
            var url = this.generateNavigationUrl(id);
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
                    collection: this.getRenderData(),
                    sortField: infos.sortField.field,
                    order: infos.sortField.order,
                    totalRecords: this.model.totalRecords
                }));

                //render pagination
                $(this.resultsPagination, this.$el).html(this.templatePagination(this.model.pageInfo())); //TODO : this.model.pageInfo() {currentPage: 0, firstPage: 0, totalPages: 10}
            }
            this.delegateEvents();
            return this;
        }
    });

    // Differenciating export for node or browser.
    if (isInBrowser) {
        NS.Views = NS.Views || {};
        NS.Views.ListView = ListView;
    } else {
        module.exports = ListView;
    }
})(typeof module === 'undefined' && typeof window !== 'undefined' ? window.Fmk : module.exports);