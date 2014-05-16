/*global  i18n, _, window*/
(function(NS) {
    "use strict";
    // Filename: views/search-results-view.js
    NS = NS || {};
    var isInBrowser = typeof module === 'undefined' && typeof window !== 'undefined';
    
    //Dependencies.
    var ListView = isInBrowser ? NS.Views.ListView : require('./list-view');
    var templateNoResults = isInBrowser ? NS.templates.noResults : function() {};
    
    //View to use in order to display search results.
    var SearchResultsView = ListView.extend({
        
        //Defaults options of the searchresults view.
        defaultOptions: _.extend({}, ListView.prototype.defaultOptions, {
            isModelToLoad: false,
            isReadyResultsData: true
        }),
        
        //Template use in order to display the fact that there is no results.
        templateNoResults: templateNoResults,
        
        //Trigger a fetch for the consultation 
        fetchDemand: function fetchDemandResultView() {
            this.trigger('results:fetchDemand');
        },
        
        //Function call when there is no result.
        renderEmptyList: function renderEmptySearchResults() {
            //Is recherche launched.
            this.$el.html(this.templateNoResults({
                message: i18n.t('search.noResult')
            }));
            /*backboneNotification.addNotification({
                type: 'info',
                message: i18n.t('search.noResult')
            }, true);*/
        },
        
        //Indicate if the function is ready to be displayed. If not the spinner is display.
        isReady : function readySearchResults(){
            return this.opts.isReadyResultsData === true && ListView.prototype.isReady.call(this);
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