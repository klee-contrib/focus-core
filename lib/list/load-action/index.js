//Dependencies.
'use strict';

var assign = require('object-assign');
var _builder = require('./builder');
var _parser = require('./parser');

/**
* Search action generated from the config.
* @param  {object} config - Action configuration.
* @return {function} - The generated action from the congig.
*/
module.exports = function loadActionFn(config) {
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
    return function listLoader(isScroll) {
        //Read search options from the accessor define in the config.
        // TODO: see if results should be named results.

        var _config$getListOptions = config.getListOptions();

        var criteria = _config$getListOptions.criteria;
        var groupingKey = _config$getListOptions.groupingKey;
        var sortBy = _config$getListOptions.sortBy;
        var sortAsc = _config$getListOptions.sortAsc;
        var dataList = _config$getListOptions.dataList;
        var totalCount = _config$getListOptions.totalCount;

        //Number of element to search on each search.
        var nbElement = config.nbElement;
        //Process the query if empty.

        //Build URL data.
        var urlData = assign(_builder.pagination({ dataList: dataList, totalCount: totalCount, isScroll: isScroll, nbElement: nbElement }), _builder.orderAndSort({ sortBy: sortBy, sortAsc: sortAsc }));
        //Build body data.
        var postData = {
            criteria: criteria,
            group: groupingKey || ''
        };
        config.service({ urlData: urlData, data: postData }).then(function (response) {
            return _parser(response, { isScroll: isScroll, dataList: dataList });
        }).then(_dispatchResult);
    };
};