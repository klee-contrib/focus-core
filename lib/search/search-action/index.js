//Dependencies.
'use strict';

var assign = require('object-assign');
var _builder = require('./builder');
var _parser = require('./parser');
var ALL = 'ALL';
var STAR = '*';

/**
* Search action generated from the config.
* @param  {object} config - Action configuration.
* @return {function} - The generated action from the congig.
*/
module.exports = function (config) {
    /**
    * Dispatch the results on the search store
    * @param  {object} data - The data to dispatch.
    */
    var _dispatchResult = function _dispatchResult(data) {
        Focus.dispatcher.handleServerAction({
            data: data,
            type: 'update',
            identifier: config.identifier
        });
    };

    /**
    * Build search action.
    * @param  {Boolean} isScroll - Is the action result from a scrolling.
    */
    return function searchAction(isScroll) {
        //Read search options from the accessor define in the config.

        var _config$getSearchOptions = config.getSearchOptions();

        var scope = _config$getSearchOptions.scope;
        var query = _config$getSearchOptions.query;
        var selectedFacets = _config$getSearchOptions.selectedFacets;
        var groupingKey = _config$getSearchOptions.groupingKey;
        var sortBy = _config$getSearchOptions.sortBy;
        var sortAsc = _config$getSearchOptions.sortAsc;
        var results = _config$getSearchOptions.results;
        var totalCount = _config$getSearchOptions.totalCount;

        //Number of element to search on each search.
        var nbSearchElement = config.nbSearchElement;
        //Process the query if empty.
        if (!query || query === '') {
            query = STAR;
        }
        //Build URL data.
        var urlData = assign(_builder.pagination({ results: results, totalCount: totalCount, isScroll: isScroll, nbSearchElement: nbSearchElement }), _builder.orderAndSort({ sortBy: sortBy, sortAsc: sortAsc }));
        //Build body data.
        var postData = {
            criteria: { scope: scope, query: query },
            facets: selectedFacets ? _builder.facets(selectedFacets) : [],
            group: groupingKey || ''
        };
        //Different call depending on the scope.
        if (scope === ALL) {
            //Call the search action.
            config.service.unscoped({ urlData: urlData, data: postData }).then(_parser.unscopedResponse).then(_dispatchResult);
        } else {
            //The component which call the serice should be know if it has all the data.
            config.service.scoped({ urlData: urlData, data: postData }).then(function (response) {
                return _parser.scopedResponse(response, { isScroll: isScroll, scope: scope, results: results });
            }).then(_dispatchResult);
        }
    };
};