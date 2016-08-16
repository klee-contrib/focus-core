'use strict';

var _objectAssign = require('object-assign');

var _objectAssign2 = _interopRequireDefault(_objectAssign);

var _builder2 = require('./builder');

var _builder3 = _interopRequireDefault(_builder2);

var _parser2 = require('./parser');

var _parser3 = _interopRequireDefault(_parser2);

var _dispatcher = require('../../dispatcher');

var _dispatcher2 = _interopRequireDefault(_dispatcher);

var _errorParsing = require('../../network/error-parsing');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
        _dispatcher2.default.handleServerAction({
            data: data,
            type: 'update',
            identifier: config.identifier
        });
    };
    /**
     * Method call when there is an error.
     * @param  {object} config -  The action builder configuration.
     * @param  {object} err    - The error from the API call.
     * @return {object}     - The data from the manageResponseErrors function.
     */
    function _errorOnCall(err) {
        (0, _errorParsing.manageResponseErrors)(err, config);
        //_dispatchGlobalError shoud be separated.
    }

    /**
    * Build search action.
    * @param  {Boolean} isScroll - Is the action result from a scrolling.
    */
    return function listLoader(isScroll) {
        //Read search options from the accessor define in the config.
        // TODO: see if results should be named results.
        var _config$getListOption = config.getListOptions();

        var criteria = _config$getListOption.criteria;
        var groupingKey = _config$getListOption.groupingKey;
        var sortBy = _config$getListOption.sortBy;
        var sortAsc = _config$getListOption.sortAsc;
        var dataList = _config$getListOption.dataList;
        var totalCount = _config$getListOption.totalCount;

        //Number of element to search on each search.

        var nbElement = config.nbElement;
        //Process the query if empty.

        //Build URL data.
        var urlData = (0, _objectAssign2.default)(_builder3.default.pagination({ dataList: dataList, totalCount: totalCount, isScroll: isScroll, nbElement: nbElement }), _builder3.default.orderAndSort({ sortBy: sortBy, sortAsc: sortAsc }));
        //Build body data.
        var postData = {
            criteria: criteria,
            group: groupingKey || ''
        };
        config.service({ urlData: urlData, data: postData }).then(function (response) {
            return (0, _parser3.default)(response, { isScroll: isScroll, dataList: dataList });
        }).then(_dispatchResult).catch(_errorOnCall);
    };
}; //Dependencies.
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInByb2Nlc3Nvci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFHQTs7Ozs7QUFLQSxPQUFPLE9BQVAsR0FBaUIsU0FBUyxZQUFULENBQXNCLE1BQXRCLEVBQTZCO0FBQzFDOzs7O0FBSUEsUUFBTSxrQkFBa0IsU0FBbEIsZUFBa0IsQ0FBQyxJQUFELEVBQVU7QUFDOUIsNkJBQVcsa0JBQVgsQ0FBOEI7QUFDMUIsc0JBRDBCO0FBRTFCLGtCQUFNLFFBRm9CO0FBRzFCLHdCQUFZLE9BQU87QUFITyxTQUE5QjtBQUtILEtBTkQ7QUFPQTs7Ozs7O0FBTUEsYUFBUyxZQUFULENBQXVCLEdBQXZCLEVBQTJCO0FBQ3ZCLGdEQUFxQixHQUFyQixFQUEwQixNQUExQjtBQUNBO0FBQ0g7O0FBRUQ7Ozs7QUFJQSxXQUFPLFNBQVMsVUFBVCxDQUFvQixRQUFwQixFQUE2QjtBQUNoQztBQUNBO0FBRmdDLG9DQU81QixPQUFPLGNBQVAsRUFQNEI7O0FBQUEsWUFJNUIsUUFKNEIseUJBSTVCLFFBSjRCO0FBQUEsWUFLNUIsV0FMNEIseUJBSzVCLFdBTDRCO0FBQUEsWUFLZixNQUxlLHlCQUtmLE1BTGU7QUFBQSxZQUtQLE9BTE8seUJBS1AsT0FMTztBQUFBLFlBTTVCLFFBTjRCLHlCQU01QixRQU40QjtBQUFBLFlBTWxCLFVBTmtCLHlCQU1sQixVQU5rQjs7QUFTaEM7O0FBQ0EsWUFBTSxZQUFZLE9BQU8sU0FBekI7QUFDQTs7QUFFQTtBQUNBLFlBQU0sVUFBVSw0QkFDWixrQkFBUyxVQUFULENBQW9CLEVBQUMsa0JBQUQsRUFBVyxzQkFBWCxFQUF1QixrQkFBdkIsRUFBaUMsb0JBQWpDLEVBQXBCLENBRFksRUFFWixrQkFBUyxZQUFULENBQXNCLEVBQUMsY0FBRCxFQUFTLGdCQUFULEVBQXRCLENBRlksQ0FBaEI7QUFJQTtBQUNBLFlBQU0sV0FBVztBQUNiLHNCQUFVLFFBREc7QUFFYixtQkFBTyxlQUFlO0FBRlQsU0FBakI7QUFJQSxlQUFPLE9BQVAsQ0FBZSxFQUFDLFNBQVMsT0FBVixFQUFtQixNQUFNLFFBQXpCLEVBQWYsRUFDQyxJQURELENBQ00sVUFBQyxRQUFELEVBQVk7QUFDZCxtQkFBTyxzQkFDQyxRQURELEVBRUMsRUFBQyxrQkFBRCxFQUFXLGtCQUFYLEVBRkQsQ0FBUDtBQUlILFNBTkQsRUFPQyxJQVBELENBT00sZUFQTixFQVFDLEtBUkQsQ0FRTyxZQVJQO0FBU0gsS0FoQ0Q7QUFpQ0gsQ0E1REQsQyxDQWJBIiwiZmlsZSI6InByb2Nlc3Nvci5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vRGVwZW5kZW5jaWVzLlxyXG5pbXBvcnQgYXNzaWduIGZyb20gJ29iamVjdC1hc3NpZ24nO1xyXG5pbXBvcnQgX2J1aWxkZXIgZnJvbSAnLi9idWlsZGVyJztcclxuaW1wb3J0IF9wYXJzZXIgZnJvbSAnLi9wYXJzZXInO1xyXG5pbXBvcnQgZGlzcGF0Y2hlciBmcm9tICcuLi8uLi9kaXNwYXRjaGVyJztcclxuaW1wb3J0IHttYW5hZ2VSZXNwb25zZUVycm9yc30gZnJvbSAnLi4vLi4vbmV0d29yay9lcnJvci1wYXJzaW5nJztcclxuXHJcblxyXG4vKipcclxuKiBTZWFyY2ggYWN0aW9uIGdlbmVyYXRlZCBmcm9tIHRoZSBjb25maWcuXHJcbiogQHBhcmFtICB7b2JqZWN0fSBjb25maWcgLSBBY3Rpb24gY29uZmlndXJhdGlvbi5cclxuKiBAcmV0dXJuIHtmdW5jdGlvbn0gLSBUaGUgZ2VuZXJhdGVkIGFjdGlvbiBmcm9tIHRoZSBjb25naWcuXHJcbiovXHJcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gbG9hZEFjdGlvbkZuKGNvbmZpZyl7XHJcbiAgICAvKipcclxuICAgICogRGlzcGF0Y2ggdGhlIHJlc3VsdHMgb24gdGhlIHNlYXJjaCBzdG9yZVxyXG4gICAgKiBAcGFyYW0gIHtvYmplY3R9IGRhdGEgLSBUaGUgZGF0YSB0byBkaXNwYXRjaC5cclxuICAgICovXHJcbiAgICBjb25zdCBfZGlzcGF0Y2hSZXN1bHQgPSAoZGF0YSkgPT4ge1xyXG4gICAgICAgIGRpc3BhdGNoZXIuaGFuZGxlU2VydmVyQWN0aW9uKHtcclxuICAgICAgICAgICAgZGF0YSxcclxuICAgICAgICAgICAgdHlwZTogJ3VwZGF0ZScsXHJcbiAgICAgICAgICAgIGlkZW50aWZpZXI6IGNvbmZpZy5pZGVudGlmaWVyXHJcbiAgICAgICAgfSk7XHJcbiAgICB9O1xyXG4gICAgLyoqXHJcbiAgICAgKiBNZXRob2QgY2FsbCB3aGVuIHRoZXJlIGlzIGFuIGVycm9yLlxyXG4gICAgICogQHBhcmFtICB7b2JqZWN0fSBjb25maWcgLSAgVGhlIGFjdGlvbiBidWlsZGVyIGNvbmZpZ3VyYXRpb24uXHJcbiAgICAgKiBAcGFyYW0gIHtvYmplY3R9IGVyciAgICAtIFRoZSBlcnJvciBmcm9tIHRoZSBBUEkgY2FsbC5cclxuICAgICAqIEByZXR1cm4ge29iamVjdH0gICAgIC0gVGhlIGRhdGEgZnJvbSB0aGUgbWFuYWdlUmVzcG9uc2VFcnJvcnMgZnVuY3Rpb24uXHJcbiAgICAgKi9cclxuICAgIGZ1bmN0aW9uIF9lcnJvck9uQ2FsbCggZXJyKXtcclxuICAgICAgICBtYW5hZ2VSZXNwb25zZUVycm9ycyhlcnIsIGNvbmZpZyk7XHJcbiAgICAgICAgLy9fZGlzcGF0Y2hHbG9iYWxFcnJvciBzaG91ZCBiZSBzZXBhcmF0ZWQuXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAqIEJ1aWxkIHNlYXJjaCBhY3Rpb24uXHJcbiAgICAqIEBwYXJhbSAge0Jvb2xlYW59IGlzU2Nyb2xsIC0gSXMgdGhlIGFjdGlvbiByZXN1bHQgZnJvbSBhIHNjcm9sbGluZy5cclxuICAgICovXHJcbiAgICByZXR1cm4gZnVuY3Rpb24gbGlzdExvYWRlcihpc1Njcm9sbCl7XHJcbiAgICAgICAgLy9SZWFkIHNlYXJjaCBvcHRpb25zIGZyb20gdGhlIGFjY2Vzc29yIGRlZmluZSBpbiB0aGUgY29uZmlnLlxyXG4gICAgICAgIC8vIFRPRE86IHNlZSBpZiByZXN1bHRzIHNob3VsZCBiZSBuYW1lZCByZXN1bHRzLlxyXG4gICAgICAgIGNvbnN0IHtcclxuICAgICAgICAgICAgY3JpdGVyaWEsXHJcbiAgICAgICAgICAgIGdyb3VwaW5nS2V5LCBzb3J0QnksIHNvcnRBc2MsXHJcbiAgICAgICAgICAgIGRhdGFMaXN0LCB0b3RhbENvdW50XHJcbiAgICAgICAgfSA9IGNvbmZpZy5nZXRMaXN0T3B0aW9ucygpO1xyXG5cclxuICAgICAgICAvL051bWJlciBvZiBlbGVtZW50IHRvIHNlYXJjaCBvbiBlYWNoIHNlYXJjaC5cclxuICAgICAgICBjb25zdCBuYkVsZW1lbnQgPSBjb25maWcubmJFbGVtZW50O1xyXG4gICAgICAgIC8vUHJvY2VzcyB0aGUgcXVlcnkgaWYgZW1wdHkuXHJcblxyXG4gICAgICAgIC8vQnVpbGQgVVJMIGRhdGEuXHJcbiAgICAgICAgY29uc3QgdXJsRGF0YSA9IGFzc2lnbihcclxuICAgICAgICAgICAgX2J1aWxkZXIucGFnaW5hdGlvbih7ZGF0YUxpc3QsIHRvdGFsQ291bnQsIGlzU2Nyb2xsLCBuYkVsZW1lbnR9KSxcclxuICAgICAgICAgICAgX2J1aWxkZXIub3JkZXJBbmRTb3J0KHtzb3J0QnksIHNvcnRBc2N9KVxyXG4gICAgICAgICk7XHJcbiAgICAgICAgLy9CdWlsZCBib2R5IGRhdGEuXHJcbiAgICAgICAgY29uc3QgcG9zdERhdGEgPSB7XHJcbiAgICAgICAgICAgIGNyaXRlcmlhOiBjcml0ZXJpYSxcclxuICAgICAgICAgICAgZ3JvdXA6IGdyb3VwaW5nS2V5IHx8ICcnXHJcbiAgICAgICAgfTtcclxuICAgICAgICBjb25maWcuc2VydmljZSh7dXJsRGF0YTogdXJsRGF0YSwgZGF0YTogcG9zdERhdGF9KVxyXG4gICAgICAgIC50aGVuKChyZXNwb25zZSk9PntcclxuICAgICAgICAgICAgcmV0dXJuIF9wYXJzZXIoXHJcbiAgICAgICAgICAgICAgICAgICAgcmVzcG9uc2UsXHJcbiAgICAgICAgICAgICAgICAgICAge2lzU2Nyb2xsLCBkYXRhTGlzdH1cclxuICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgfSlcclxuICAgICAgICAudGhlbihfZGlzcGF0Y2hSZXN1bHQpXHJcbiAgICAgICAgLmNhdGNoKF9lcnJvck9uQ2FsbCk7XHJcbiAgICB9O1xyXG59O1xyXG4iXX0=