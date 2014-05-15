/*global Backbone, i18n, window*/
(function(NS) {
    "use strict";
    // Filename: views/search-results-view.js
    NS = NS || {};
    var isInBrowser = typeof module === 'undefined' && typeof window !== 'undefined';
    var ListView = isInBrowser ? NS.Views.ListView : require('./list-view');
    //var backboneNotification = isInBrowser ? NS.Helpers.backboneNotification : require("../helpers/backbone_notification");
    var templateNoResults = isInBrowser ? NS.templates.noResults : function() {};
    var SearchResultsView = ListView.extend({
        templateNoResults: templateNoResults,
        //Trigger a fetch for the consultation 
        fetchDemand: function fetchDemandResultView() {
            this.trigger('results:fetchDemand');
        },
        //Function call when there is no result.
        renderEmptyList: function renderEmptySearchResults() {
            //Is recherche launched.
            this.$el.html(this.templateNoResults({message: i18n.t('search.noResult')}));
            /*backboneNotification.addNotification({
                type: 'info',
                message: i18n.t('search.noResult')
            }, true);*/
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