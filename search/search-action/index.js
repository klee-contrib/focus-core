'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; //Dependencies.


var _objectAssign = require('object-assign');

var _objectAssign2 = _interopRequireDefault(_objectAssign);

var _lang = require('lodash/lang');

var _builder2 = require('./builder');

var _builder3 = _interopRequireDefault(_builder2);

var _parser2 = require('./parser');

var _parser3 = _interopRequireDefault(_parser2);

var _dispatcher = require('../../dispatcher');

var _dispatcher2 = _interopRequireDefault(_dispatcher);

var _errorParsing = require('../../network/error-parsing');

var _isString = require('lodash/lang/isString');

var _isString2 = _interopRequireDefault(_isString);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var ALL = 'ALL';
var STAR = '*';

/**
* Search action generated from the config.
* @param  {object} config - Action configuration.
* @return {function} - The generated action from the congig.
*/
module.exports = function searchActionBuilder(config) {
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
    var parser = config.parser && (0, _lang.isObject)(config.parser) ? _extends({}, _parser3.default, config.parser) : _parser3.default;
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
    *
    * Expected server data format :
    * -----------------------------
    * {
    * 	"criteria": "*",
    *  	"facets": {FCT_MOVIE_TYPE: "Télefilm", FCT_MOVIE_TITLE: "g-m"}
    * }
    *
    * @param  {Boolean} isScroll - Is the action result from a scrolling.
    */
    return function searchAction(isScroll) {
        //Read search options from the accessor define in the config.
        var _config$getSearchOpti = config.getSearchOptions();

        var scope = _config$getSearchOpti.scope;
        var query = _config$getSearchOpti.query;
        var selectedFacets = _config$getSearchOpti.selectedFacets;
        var groupingKey = _config$getSearchOpti.groupingKey;
        var sortBy = _config$getSearchOpti.sortBy;
        var sortAsc = _config$getSearchOpti.sortAsc;
        var results = _config$getSearchOpti.results;
        var totalCount = _config$getSearchOpti.totalCount;

        var otherProps = _objectWithoutProperties(_config$getSearchOpti, ['scope', 'query', 'selectedFacets', 'groupingKey', 'sortBy', 'sortAsc', 'results', 'totalCount']);

        //Number of element to search on each search.


        var nbSearchElement = config.nbSearchElement;
        //Process the query if empty.
        if (!query || '' === query) {
            query = STAR;
        }
        //Build URL data.
        var urlData = (0, _objectAssign2.default)(_builder3.default.pagination({ results: results, totalCount: totalCount, isScroll: isScroll, nbSearchElement: nbSearchElement }), _builder3.default.orderAndSort({ sortBy: sortBy, sortAsc: sortAsc }));
        //Build body data.
        var postData = _extends({}, otherProps, {
            criteria: { query: query, scope: scope },
            facets: selectedFacets ? _builder3.default.facets(selectedFacets) : {},
            group: groupingKey || ''
        });
        //Different call depending on the scope.
        if ((0, _isString2.default)(scope) && scope.toUpperCase() === ALL) {
            //Call the search action.
            config.service.unscoped({ urlData: urlData, data: postData }).then(parser.unscopedResponse).then(_dispatchResult).catch(_errorOnCall);
        } else {
            //The component which call the serice should be know if it has all the data.
            config.service.scoped({ urlData: urlData, data: postData }).then(function (response) {
                return parser.scopedResponse(response, { isScroll: isScroll, scope: scope, results: results });
            }).then(_dispatchResult).catch(_errorOnCall);
        }
    };
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInByb2Nlc3Nvci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztrUUFBQTs7O0FBQ0E7Ozs7QUFDQTs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7QUFDQTs7Ozs7Ozs7QUFFQSxJQUFNLE1BQU0sS0FBWjtBQUNBLElBQU0sT0FBTyxHQUFiOztBQUVBOzs7OztBQUtBLE9BQU8sT0FBUCxHQUFpQixTQUFTLG1CQUFULENBQTZCLE1BQTdCLEVBQW9DO0FBQ2pEOzs7O0FBSUEsUUFBTSxrQkFBa0IsU0FBbEIsZUFBa0IsQ0FBQyxJQUFELEVBQVU7QUFDOUIsNkJBQVcsa0JBQVgsQ0FBOEI7QUFDMUIsc0JBRDBCO0FBRTFCLGtCQUFNLFFBRm9CO0FBRzFCLHdCQUFZLE9BQU87QUFITyxTQUE5QjtBQUtILEtBTkQ7QUFPQSxRQUFNLFNBQVMsT0FBTyxNQUFQLElBQWlCLG9CQUFTLE9BQU8sTUFBaEIsQ0FBakIsa0NBQTJELE9BQU8sTUFBbEUsb0JBQWY7QUFDQTs7Ozs7O0FBTUEsYUFBUyxZQUFULENBQXNCLEdBQXRCLEVBQTBCO0FBQ3RCLGdEQUFxQixHQUFyQixFQUEwQixNQUExQjtBQUNBO0FBQ0g7O0FBR0Q7Ozs7Ozs7Ozs7OztBQVlBLFdBQU8sU0FBUyxZQUFULENBQXNCLFFBQXRCLEVBQStCO0FBQ2xDO0FBRGtDLG9DQU85QixPQUFPLGdCQUFQLEVBUDhCOztBQUFBLFlBRzlCLEtBSDhCLHlCQUc5QixLQUg4QjtBQUFBLFlBR3ZCLEtBSHVCLHlCQUd2QixLQUh1QjtBQUFBLFlBR2hCLGNBSGdCLHlCQUdoQixjQUhnQjtBQUFBLFlBSTlCLFdBSjhCLHlCQUk5QixXQUo4QjtBQUFBLFlBSWpCLE1BSmlCLHlCQUlqQixNQUppQjtBQUFBLFlBSVQsT0FKUyx5QkFJVCxPQUpTO0FBQUEsWUFLOUIsT0FMOEIseUJBSzlCLE9BTDhCO0FBQUEsWUFLckIsVUFMcUIseUJBS3JCLFVBTHFCOztBQUFBLFlBTTNCLFVBTjJCOztBQVNsQzs7O0FBQ0EsWUFBTSxrQkFBa0IsT0FBTyxlQUEvQjtBQUNBO0FBQ0EsWUFBRyxDQUFDLEtBQUQsSUFBVSxPQUFPLEtBQXBCLEVBQTBCO0FBQ3RCLG9CQUFRLElBQVI7QUFDSDtBQUNEO0FBQ0EsWUFBTSxVQUFVLDRCQUNaLGtCQUFTLFVBQVQsQ0FBb0IsRUFBQyxnQkFBRCxFQUFVLHNCQUFWLEVBQXNCLGtCQUF0QixFQUFnQyxnQ0FBaEMsRUFBcEIsQ0FEWSxFQUVaLGtCQUFTLFlBQVQsQ0FBc0IsRUFBQyxjQUFELEVBQVMsZ0JBQVQsRUFBdEIsQ0FGWSxDQUFoQjtBQUlBO0FBQ0EsWUFBTSx3QkFDQyxVQUREO0FBRUYsc0JBQVUsRUFBQyxZQUFELEVBQVEsWUFBUixFQUZSO0FBR0Ysb0JBQVEsaUJBQWlCLGtCQUFTLE1BQVQsQ0FBZ0IsY0FBaEIsQ0FBakIsR0FBbUQsRUFIekQ7QUFJRixtQkFBTyxlQUFlO0FBSnBCLFVBQU47QUFNQTtBQUNBLFlBQUcsd0JBQVMsS0FBVCxLQUFtQixNQUFNLFdBQU4sT0FBd0IsR0FBOUMsRUFBbUQ7QUFDL0M7QUFDQSxtQkFBTyxPQUFQLENBQWUsUUFBZixDQUF3QixFQUFDLFNBQVMsT0FBVixFQUFtQixNQUFNLFFBQXpCLEVBQXhCLEVBQ0MsSUFERCxDQUNNLE9BQU8sZ0JBRGIsRUFFQyxJQUZELENBRU0sZUFGTixFQUdDLEtBSEQsQ0FHTyxZQUhQO0FBSUgsU0FORCxNQU1PO0FBQ0g7QUFDQSxtQkFBTyxPQUFQLENBQWUsTUFBZixDQUFzQixFQUFDLFNBQVMsT0FBVixFQUFtQixNQUFNLFFBQXpCLEVBQXRCLEVBQ0MsSUFERCxDQUNNLFVBQUMsUUFBRCxFQUFZO0FBQ2QsdUJBQU8sT0FBTyxjQUFQLENBQ0gsUUFERyxFQUVILEVBQUMsa0JBQUQsRUFBVyxZQUFYLEVBQWtCLGdCQUFsQixFQUZHLENBQVA7QUFJSCxhQU5ELEVBT0MsSUFQRCxDQU9NLGVBUE4sRUFRQyxLQVJELENBUU8sWUFSUDtBQVNIO0FBQ0osS0E5Q0Q7QUErQ0gsQ0FwRkQiLCJmaWxlIjoicHJvY2Vzc29yLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy9EZXBlbmRlbmNpZXMuXHJcbmltcG9ydCBhc3NpZ24gZnJvbSAnb2JqZWN0LWFzc2lnbic7XHJcbmltcG9ydCB7aXNPYmplY3R9IGZyb20gJ2xvZGFzaC9sYW5nJztcclxuaW1wb3J0IF9idWlsZGVyIGZyb20gJy4vYnVpbGRlcic7XHJcbmltcG9ydCBfcGFyc2VyIGZyb20gJy4vcGFyc2VyJztcclxuaW1wb3J0IGRpc3BhdGNoZXIgZnJvbSAnLi4vLi4vZGlzcGF0Y2hlcic7XHJcbmltcG9ydCB7bWFuYWdlUmVzcG9uc2VFcnJvcnN9IGZyb20gJy4uLy4uL25ldHdvcmsvZXJyb3ItcGFyc2luZyc7XHJcbmltcG9ydCBpc1N0cmluZyBmcm9tICdsb2Rhc2gvbGFuZy9pc1N0cmluZyc7XHJcblxyXG5jb25zdCBBTEwgPSAnQUxMJztcclxuY29uc3QgU1RBUiA9ICcqJztcclxuXHJcbi8qKlxyXG4qIFNlYXJjaCBhY3Rpb24gZ2VuZXJhdGVkIGZyb20gdGhlIGNvbmZpZy5cclxuKiBAcGFyYW0gIHtvYmplY3R9IGNvbmZpZyAtIEFjdGlvbiBjb25maWd1cmF0aW9uLlxyXG4qIEByZXR1cm4ge2Z1bmN0aW9ufSAtIFRoZSBnZW5lcmF0ZWQgYWN0aW9uIGZyb20gdGhlIGNvbmdpZy5cclxuKi9cclxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBzZWFyY2hBY3Rpb25CdWlsZGVyKGNvbmZpZyl7XHJcbiAgICAvKipcclxuICAgICogRGlzcGF0Y2ggdGhlIHJlc3VsdHMgb24gdGhlIHNlYXJjaCBzdG9yZVxyXG4gICAgKiBAcGFyYW0gIHtvYmplY3R9IGRhdGEgLSBUaGUgZGF0YSB0byBkaXNwYXRjaC5cclxuICAgICovXHJcbiAgICBjb25zdCBfZGlzcGF0Y2hSZXN1bHQgPSAoZGF0YSkgPT4ge1xyXG4gICAgICAgIGRpc3BhdGNoZXIuaGFuZGxlU2VydmVyQWN0aW9uKHtcclxuICAgICAgICAgICAgZGF0YSxcclxuICAgICAgICAgICAgdHlwZTogJ3VwZGF0ZScsXHJcbiAgICAgICAgICAgIGlkZW50aWZpZXI6IGNvbmZpZy5pZGVudGlmaWVyXHJcbiAgICAgICAgfSk7XHJcbiAgICB9O1xyXG4gICAgY29uc3QgcGFyc2VyID0gY29uZmlnLnBhcnNlciAmJiBpc09iamVjdChjb25maWcucGFyc2VyKSA/IHsuLi5fcGFyc2VyLCAuLi5jb25maWcucGFyc2VyfSA6IF9wYXJzZXI7XHJcbiAgICAvKipcclxuICAgICogTWV0aG9kIGNhbGwgd2hlbiB0aGVyZSBpcyBhbiBlcnJvci5cclxuICAgICogQHBhcmFtICB7b2JqZWN0fSBjb25maWcgLSAgVGhlIGFjdGlvbiBidWlsZGVyIGNvbmZpZ3VyYXRpb24uXHJcbiAgICAqIEBwYXJhbSAge29iamVjdH0gZXJyICAgIC0gVGhlIGVycm9yIGZyb20gdGhlIEFQSSBjYWxsLlxyXG4gICAgKiBAcmV0dXJuIHtvYmplY3R9ICAgICAtIFRoZSBkYXRhIGZyb20gdGhlIG1hbmFnZVJlc3BvbnNlRXJyb3JzIGZ1bmN0aW9uLlxyXG4gICAgKi9cclxuICAgIGZ1bmN0aW9uIF9lcnJvck9uQ2FsbChlcnIpe1xyXG4gICAgICAgIG1hbmFnZVJlc3BvbnNlRXJyb3JzKGVyciwgY29uZmlnKTtcclxuICAgICAgICAvL19kaXNwYXRjaEdsb2JhbEVycm9yIHNob3VkIGJlIHNlcGFyYXRlZC5cclxuICAgIH1cclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAqIEJ1aWxkIHNlYXJjaCBhY3Rpb24uXHJcbiAgICAqXHJcbiAgICAqIEV4cGVjdGVkIHNlcnZlciBkYXRhIGZvcm1hdCA6XHJcbiAgICAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgICAqIHtcclxuICAgICogXHRcImNyaXRlcmlhXCI6IFwiKlwiLFxyXG4gICAgKiAgXHRcImZhY2V0c1wiOiB7RkNUX01PVklFX1RZUEU6IFwiVMOpbGVmaWxtXCIsIEZDVF9NT1ZJRV9USVRMRTogXCJnLW1cIn1cclxuICAgICogfVxyXG4gICAgKlxyXG4gICAgKiBAcGFyYW0gIHtCb29sZWFufSBpc1Njcm9sbCAtIElzIHRoZSBhY3Rpb24gcmVzdWx0IGZyb20gYSBzY3JvbGxpbmcuXHJcbiAgICAqL1xyXG4gICAgcmV0dXJuIGZ1bmN0aW9uIHNlYXJjaEFjdGlvbihpc1Njcm9sbCl7XHJcbiAgICAgICAgLy9SZWFkIHNlYXJjaCBvcHRpb25zIGZyb20gdGhlIGFjY2Vzc29yIGRlZmluZSBpbiB0aGUgY29uZmlnLlxyXG4gICAgICAgIGxldCB7XHJcbiAgICAgICAgICAgIHNjb3BlLCBxdWVyeSwgc2VsZWN0ZWRGYWNldHMsXHJcbiAgICAgICAgICAgIGdyb3VwaW5nS2V5LCBzb3J0QnksIHNvcnRBc2MsXHJcbiAgICAgICAgICAgIHJlc3VsdHMsIHRvdGFsQ291bnQsXHJcbiAgICAgICAgICAgIC4uLm90aGVyUHJvcHNcclxuICAgICAgICB9ID0gY29uZmlnLmdldFNlYXJjaE9wdGlvbnMoKTtcclxuXHJcbiAgICAgICAgLy9OdW1iZXIgb2YgZWxlbWVudCB0byBzZWFyY2ggb24gZWFjaCBzZWFyY2guXHJcbiAgICAgICAgY29uc3QgbmJTZWFyY2hFbGVtZW50ID0gY29uZmlnLm5iU2VhcmNoRWxlbWVudDtcclxuICAgICAgICAvL1Byb2Nlc3MgdGhlIHF1ZXJ5IGlmIGVtcHR5LlxyXG4gICAgICAgIGlmKCFxdWVyeSB8fCAnJyA9PT0gcXVlcnkpe1xyXG4gICAgICAgICAgICBxdWVyeSA9IFNUQVI7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vQnVpbGQgVVJMIGRhdGEuXHJcbiAgICAgICAgY29uc3QgdXJsRGF0YSA9IGFzc2lnbihcclxuICAgICAgICAgICAgX2J1aWxkZXIucGFnaW5hdGlvbih7cmVzdWx0cywgdG90YWxDb3VudCwgaXNTY3JvbGwsIG5iU2VhcmNoRWxlbWVudH0pLFxyXG4gICAgICAgICAgICBfYnVpbGRlci5vcmRlckFuZFNvcnQoe3NvcnRCeSwgc29ydEFzY30pXHJcbiAgICAgICAgKTtcclxuICAgICAgICAvL0J1aWxkIGJvZHkgZGF0YS5cclxuICAgICAgICBjb25zdCBwb3N0RGF0YSA9IHtcclxuICAgICAgICAgICAgLi4ub3RoZXJQcm9wcyxcclxuICAgICAgICAgICAgY3JpdGVyaWE6IHtxdWVyeSwgc2NvcGV9LFxyXG4gICAgICAgICAgICBmYWNldHM6IHNlbGVjdGVkRmFjZXRzID8gX2J1aWxkZXIuZmFjZXRzKHNlbGVjdGVkRmFjZXRzKSA6IHt9LFxyXG4gICAgICAgICAgICBncm91cDogZ3JvdXBpbmdLZXkgfHwgJydcclxuICAgICAgICB9O1xyXG4gICAgICAgIC8vRGlmZmVyZW50IGNhbGwgZGVwZW5kaW5nIG9uIHRoZSBzY29wZS5cclxuICAgICAgICBpZihpc1N0cmluZyhzY29wZSkgJiYgc2NvcGUudG9VcHBlckNhc2UoKSA9PT0gQUxMKSB7XHJcbiAgICAgICAgICAgIC8vQ2FsbCB0aGUgc2VhcmNoIGFjdGlvbi5cclxuICAgICAgICAgICAgY29uZmlnLnNlcnZpY2UudW5zY29wZWQoe3VybERhdGE6IHVybERhdGEsIGRhdGE6IHBvc3REYXRhfSlcclxuICAgICAgICAgICAgLnRoZW4ocGFyc2VyLnVuc2NvcGVkUmVzcG9uc2UpXHJcbiAgICAgICAgICAgIC50aGVuKF9kaXNwYXRjaFJlc3VsdClcclxuICAgICAgICAgICAgLmNhdGNoKF9lcnJvck9uQ2FsbCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgLy9UaGUgY29tcG9uZW50IHdoaWNoIGNhbGwgdGhlIHNlcmljZSBzaG91bGQgYmUga25vdyBpZiBpdCBoYXMgYWxsIHRoZSBkYXRhLlxyXG4gICAgICAgICAgICBjb25maWcuc2VydmljZS5zY29wZWQoe3VybERhdGE6IHVybERhdGEsIGRhdGE6IHBvc3REYXRhfSlcclxuICAgICAgICAgICAgLnRoZW4oKHJlc3BvbnNlKT0+e1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHBhcnNlci5zY29wZWRSZXNwb25zZShcclxuICAgICAgICAgICAgICAgICAgICByZXNwb25zZSxcclxuICAgICAgICAgICAgICAgICAgICB7aXNTY3JvbGwsIHNjb3BlLCByZXN1bHRzfVxyXG4gICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgLnRoZW4oX2Rpc3BhdGNoUmVzdWx0KVxyXG4gICAgICAgICAgICAuY2F0Y2goX2Vycm9yT25DYWxsKTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG59O1xyXG4iXX0=