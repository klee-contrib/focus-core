'use strict';

var _keys = require('lodash/object/keys');

var _keys2 = _interopRequireDefault(_keys);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

/**
* Parse server search result to build facet results.
* @param  {array[object]} facets server side facets results
* @return {object} object with facets as properties
*
* expected facet format :
* ------------------------
* "facets": [
*     {
*        "FCT_MOVIE_TYPE": [
*        	  {"Long-métrage": 10493},
*            {"Télefilm": 1368},
*            {"Court-métrage": 779},
*            {"Moyen-métrage": 98},
*            {"Sérials": 2},
*            {"Film à sketches": 1}
*        ]
*     },
*     {
*       "FCT_MOVIE_TITLE": [
*            {"#": 132},
*            {"a-f": 3205},
*            {"g-m": 5147},
*            {"n-s": 2133},
*            {"t-z": 2124}
*       ]
*     }
* ]
*
*
* Returned format :
* -----------------
* {
* 	  FCT_MOVIE_TYPE: [
* 	  	{
* 	  		label: 'Long-métrage',
*      		count: 52
* 	     }, {
*        	label: 'court-métrage',
* 	  	    count: 12
* 	     }
*    ],
*    FCT_MOVIE_YEAR: [
*    	 {
*    	 	label: '1990-2000',
*    	 	count: 8
*    	 }
*    ]
* }
*
*/
var _parseFacets = function _parseFacets(serverFacets) {
    return _.keys(serverFacets).reduce(function (formattedFacets, serverFacetKey) {
        //read facet keys
        var serverFacet = serverFacets[serverFacetKey];
        var serverFacetPopertyNames = _.keys(serverFacet);
        var facetName = serverFacetPopertyNames[0];
        var serverFacetData = serverFacet[facetName];
        var facetList = _.keys(serverFacetData).reduce(function (facetData, serverFacetItemKey) {
            //read facet values
            var serverFacetItem = serverFacetData[serverFacetItemKey];
            var serverFacetItemPopertyNames = _.keys(serverFacetItem);
            var facetItemName = serverFacetItemPopertyNames[0];
            var facetItemValue = serverFacetItem[facetItemName];
            // The facet content is now an array instead of an object to preserve sorting.
            return [].concat(_toConsumableArray(facetData), [{
                code: facetItemName,
                label: facetItemName,
                count: facetItemValue
            }]);
        }, []);

        return [].concat(_toConsumableArray(formattedFacets), [{ code: facetName, label: facetName, values: facetList }]);
    }, []);
};

var _parseUnscopedResponse = function _parseUnscopedResponse(data) {
    return {
        results: data.groups,
        facets: _parseFacets(data.facets),
        totalCount: data.totalCount
    };
};

var _parseScopedResponse = function _parseScopedResponse(data, context) {
    //Scroll can only happen when there is an ungroupSearch
    if (context.isScroll) {
        var resultsKeys = (0, _keys2.default)(context.results);
        var key = resultsKeys[0];
        //Concat previous data with incoming data.
        data.list = [].concat(_toConsumableArray(context.results[key]), _toConsumableArray(data.list));
    }
    return {
        results: data.groups || _defineProperty({}, context.scope, data.list),
        facets: _parseFacets(data.facets),
        totalCount: data.totalCount
    };
};

module.exports = {
    unscopedResponse: _parseUnscopedResponse,
    scopedResponse: _parseScopedResponse
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInByb2Nlc3Nvci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBOzs7Ozs7Ozs7O0FBRUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQW1EQSxJQUFNLGVBQWUsU0FBZixZQUFlLENBQUMsWUFBRCxFQUFrQjtBQUNuQyxXQUFPLEVBQUUsSUFBRixDQUFPLFlBQVAsRUFBcUIsTUFBckIsQ0FBNEIsVUFBQyxlQUFELEVBQWtCLGNBQWxCLEVBQXFDO0FBQ3BFO0FBQ0EsWUFBTSxjQUFjLGFBQWEsY0FBYixDQUFwQjtBQUNBLFlBQU0sMEJBQTBCLEVBQUUsSUFBRixDQUFPLFdBQVAsQ0FBaEM7QUFDQSxZQUFNLFlBQVksd0JBQXdCLENBQXhCLENBQWxCO0FBQ0EsWUFBTSxrQkFBa0IsWUFBWSxTQUFaLENBQXhCO0FBQ0EsWUFBTSxZQUFZLEVBQUUsSUFBRixDQUFPLGVBQVAsRUFBd0IsTUFBeEIsQ0FBK0IsVUFBQyxTQUFELEVBQVksa0JBQVosRUFBbUM7QUFDaEY7QUFDQSxnQkFBTSxrQkFBa0IsZ0JBQWdCLGtCQUFoQixDQUF4QjtBQUNBLGdCQUFNLDhCQUE4QixFQUFFLElBQUYsQ0FBTyxlQUFQLENBQXBDO0FBQ0EsZ0JBQU0sZ0JBQWdCLDRCQUE0QixDQUE1QixDQUF0QjtBQUNBLGdCQUFNLGlCQUFpQixnQkFBZ0IsYUFBaEIsQ0FBdkI7QUFDQTtBQUNBLGdEQUFXLFNBQVgsSUFBc0I7QUFDbEIsc0JBQU0sYUFEWTtBQUVsQix1QkFBTyxhQUZXO0FBR2xCLHVCQUFPO0FBSFcsYUFBdEI7QUFLSCxTQVppQixFQVlmLEVBWmUsQ0FBbEI7O0FBY0EsNENBQVcsZUFBWCxJQUE0QixFQUFDLE1BQU0sU0FBUCxFQUFrQixPQUFPLFNBQXpCLEVBQW9DLFFBQVEsU0FBNUMsRUFBNUI7QUFDSCxLQXJCTSxFQXFCSixFQXJCSSxDQUFQO0FBc0JILENBdkJEOztBQTBCQSxJQUFNLHlCQUF5QixTQUF6QixzQkFBeUIsQ0FBQyxJQUFELEVBQVU7QUFDckMsV0FBUTtBQUNKLGlCQUFTLEtBQUssTUFEVjtBQUVKLGdCQUFRLGFBQWEsS0FBSyxNQUFsQixDQUZKO0FBR0osb0JBQVksS0FBSztBQUhiLEtBQVI7QUFLSCxDQU5EOztBQVNBLElBQU0sdUJBQXVCLFNBQXZCLG9CQUF1QixDQUFDLElBQUQsRUFBTyxPQUFQLEVBQW1CO0FBQzVDO0FBQ0EsUUFBRyxRQUFRLFFBQVgsRUFBb0I7QUFDaEIsWUFBSSxjQUFjLG9CQUFLLFFBQVEsT0FBYixDQUFsQjtBQUNBLFlBQUksTUFBTSxZQUFZLENBQVosQ0FBVjtBQUNBO0FBQ0EsYUFBSyxJQUFMLGdDQUFnQixRQUFRLE9BQVIsQ0FBZ0IsR0FBaEIsQ0FBaEIsc0JBQXlDLEtBQUssSUFBOUM7QUFDSDtBQUNELFdBQVE7QUFDSixpQkFBUyxLQUFLLE1BQUwsd0JBQWlCLFFBQVEsS0FBekIsRUFBaUMsS0FBSyxJQUF0QyxDQURMO0FBRUosZ0JBQVEsYUFBYSxLQUFLLE1BQWxCLENBRko7QUFHSixvQkFBWSxLQUFLO0FBSGIsS0FBUjtBQUtILENBYkQ7O0FBZ0JBLE9BQU8sT0FBUCxHQUFpQjtBQUNiLHNCQUFrQixzQkFETDtBQUViLG9CQUFnQjtBQUZILENBQWpCIiwiZmlsZSI6InByb2Nlc3Nvci5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBrZXlzIGZyb20gJ2xvZGFzaC9vYmplY3Qva2V5cyc7XHJcblxyXG4vKipcclxuKiBQYXJzZSBzZXJ2ZXIgc2VhcmNoIHJlc3VsdCB0byBidWlsZCBmYWNldCByZXN1bHRzLlxyXG4qIEBwYXJhbSAge2FycmF5W29iamVjdF19IGZhY2V0cyBzZXJ2ZXIgc2lkZSBmYWNldHMgcmVzdWx0c1xyXG4qIEByZXR1cm4ge29iamVjdH0gb2JqZWN0IHdpdGggZmFjZXRzIGFzIHByb3BlcnRpZXNcclxuKlxyXG4qIGV4cGVjdGVkIGZhY2V0IGZvcm1hdCA6XHJcbiogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiogXCJmYWNldHNcIjogW1xyXG4qICAgICB7XHJcbiogICAgICAgIFwiRkNUX01PVklFX1RZUEVcIjogW1xyXG4qICAgICAgICBcdCAge1wiTG9uZy1tw6l0cmFnZVwiOiAxMDQ5M30sXHJcbiogICAgICAgICAgICB7XCJUw6lsZWZpbG1cIjogMTM2OH0sXHJcbiogICAgICAgICAgICB7XCJDb3VydC1tw6l0cmFnZVwiOiA3Nzl9LFxyXG4qICAgICAgICAgICAge1wiTW95ZW4tbcOpdHJhZ2VcIjogOTh9LFxyXG4qICAgICAgICAgICAge1wiU8OpcmlhbHNcIjogMn0sXHJcbiogICAgICAgICAgICB7XCJGaWxtIMOgIHNrZXRjaGVzXCI6IDF9XHJcbiogICAgICAgIF1cclxuKiAgICAgfSxcclxuKiAgICAge1xyXG4qICAgICAgIFwiRkNUX01PVklFX1RJVExFXCI6IFtcclxuKiAgICAgICAgICAgIHtcIiNcIjogMTMyfSxcclxuKiAgICAgICAgICAgIHtcImEtZlwiOiAzMjA1fSxcclxuKiAgICAgICAgICAgIHtcImctbVwiOiA1MTQ3fSxcclxuKiAgICAgICAgICAgIHtcIm4tc1wiOiAyMTMzfSxcclxuKiAgICAgICAgICAgIHtcInQtelwiOiAyMTI0fVxyXG4qICAgICAgIF1cclxuKiAgICAgfVxyXG4qIF1cclxuKlxyXG4qXHJcbiogUmV0dXJuZWQgZm9ybWF0IDpcclxuKiAtLS0tLS0tLS0tLS0tLS0tLVxyXG4qIHtcclxuKiBcdCAgRkNUX01PVklFX1RZUEU6IFtcclxuKiBcdCAgXHR7XHJcbiogXHQgIFx0XHRsYWJlbDogJ0xvbmctbcOpdHJhZ2UnLFxyXG4qICAgICAgXHRcdGNvdW50OiA1MlxyXG4qIFx0ICAgICB9LCB7XHJcbiogICAgICAgIFx0bGFiZWw6ICdjb3VydC1tw6l0cmFnZScsXHJcbiogXHQgIFx0ICAgIGNvdW50OiAxMlxyXG4qIFx0ICAgICB9XHJcbiogICAgXSxcclxuKiAgICBGQ1RfTU9WSUVfWUVBUjogW1xyXG4qICAgIFx0IHtcclxuKiAgICBcdCBcdGxhYmVsOiAnMTk5MC0yMDAwJyxcclxuKiAgICBcdCBcdGNvdW50OiA4XHJcbiogICAgXHQgfVxyXG4qICAgIF1cclxuKiB9XHJcbipcclxuKi9cclxuY29uc3QgX3BhcnNlRmFjZXRzID0gKHNlcnZlckZhY2V0cykgPT4ge1xuICAgIHJldHVybiBfLmtleXMoc2VydmVyRmFjZXRzKS5yZWR1Y2UoKGZvcm1hdHRlZEZhY2V0cywgc2VydmVyRmFjZXRLZXkpID0+IHtcbiAgICAgICAgLy9yZWFkIGZhY2V0IGtleXNcbiAgICAgICAgY29uc3Qgc2VydmVyRmFjZXQgPSBzZXJ2ZXJGYWNldHNbc2VydmVyRmFjZXRLZXldO1xuICAgICAgICBjb25zdCBzZXJ2ZXJGYWNldFBvcGVydHlOYW1lcyA9IF8ua2V5cyhzZXJ2ZXJGYWNldCk7XG4gICAgICAgIGNvbnN0IGZhY2V0TmFtZSA9IHNlcnZlckZhY2V0UG9wZXJ0eU5hbWVzWzBdO1xuICAgICAgICBjb25zdCBzZXJ2ZXJGYWNldERhdGEgPSBzZXJ2ZXJGYWNldFtmYWNldE5hbWVdO1xuICAgICAgICBjb25zdCBmYWNldExpc3QgPSBfLmtleXMoc2VydmVyRmFjZXREYXRhKS5yZWR1Y2UoKGZhY2V0RGF0YSwgc2VydmVyRmFjZXRJdGVtS2V5KSA9PiB7XG4gICAgICAgICAgICAvL3JlYWQgZmFjZXQgdmFsdWVzXG4gICAgICAgICAgICBjb25zdCBzZXJ2ZXJGYWNldEl0ZW0gPSBzZXJ2ZXJGYWNldERhdGFbc2VydmVyRmFjZXRJdGVtS2V5XTtcbiAgICAgICAgICAgIGNvbnN0IHNlcnZlckZhY2V0SXRlbVBvcGVydHlOYW1lcyA9IF8ua2V5cyhzZXJ2ZXJGYWNldEl0ZW0pO1xuICAgICAgICAgICAgY29uc3QgZmFjZXRJdGVtTmFtZSA9IHNlcnZlckZhY2V0SXRlbVBvcGVydHlOYW1lc1swXTtcbiAgICAgICAgICAgIGNvbnN0IGZhY2V0SXRlbVZhbHVlID0gc2VydmVyRmFjZXRJdGVtW2ZhY2V0SXRlbU5hbWVdO1xuICAgICAgICAgICAgLy8gVGhlIGZhY2V0IGNvbnRlbnQgaXMgbm93IGFuIGFycmF5IGluc3RlYWQgb2YgYW4gb2JqZWN0IHRvIHByZXNlcnZlIHNvcnRpbmcuXG4gICAgICAgICAgICByZXR1cm4gWy4uLmZhY2V0RGF0YSwge1xuICAgICAgICAgICAgICAgIGNvZGU6IGZhY2V0SXRlbU5hbWUsXG4gICAgICAgICAgICAgICAgbGFiZWw6IGZhY2V0SXRlbU5hbWUsXG4gICAgICAgICAgICAgICAgY291bnQ6IGZhY2V0SXRlbVZhbHVlXG4gICAgICAgICAgICB9XTtcbiAgICAgICAgfSwgW10pO1xuXG4gICAgICAgIHJldHVybiBbLi4uZm9ybWF0dGVkRmFjZXRzLCB7Y29kZTogZmFjZXROYW1lLCBsYWJlbDogZmFjZXROYW1lLCB2YWx1ZXM6IGZhY2V0TGlzdH1dO1xuICAgIH0sIFtdKTtcbn07XG5cclxuXHJcbmNvbnN0IF9wYXJzZVVuc2NvcGVkUmVzcG9uc2UgPSAoZGF0YSkgPT4ge1xyXG4gICAgcmV0dXJuICh7XHJcbiAgICAgICAgcmVzdWx0czogZGF0YS5ncm91cHMsXHJcbiAgICAgICAgZmFjZXRzOiBfcGFyc2VGYWNldHMoZGF0YS5mYWNldHMpLFxyXG4gICAgICAgIHRvdGFsQ291bnQ6IGRhdGEudG90YWxDb3VudFxyXG4gICAgfSk7XHJcbn07XHJcblxyXG5cclxuY29uc3QgX3BhcnNlU2NvcGVkUmVzcG9uc2UgPSAoZGF0YSwgY29udGV4dCkgPT4ge1xyXG4gICAgLy9TY3JvbGwgY2FuIG9ubHkgaGFwcGVuIHdoZW4gdGhlcmUgaXMgYW4gdW5ncm91cFNlYXJjaFxyXG4gICAgaWYoY29udGV4dC5pc1Njcm9sbCl7XHJcbiAgICAgICAgbGV0IHJlc3VsdHNLZXlzID0ga2V5cyhjb250ZXh0LnJlc3VsdHMpO1xyXG4gICAgICAgIGxldCBrZXkgPSByZXN1bHRzS2V5c1swXTtcclxuICAgICAgICAvL0NvbmNhdCBwcmV2aW91cyBkYXRhIHdpdGggaW5jb21pbmcgZGF0YS5cclxuICAgICAgICBkYXRhLmxpc3QgPSBbLi4uY29udGV4dC5yZXN1bHRzW2tleV0sIC4uLmRhdGEubGlzdF07XHJcbiAgICB9XHJcbiAgICByZXR1cm4gKHtcclxuICAgICAgICByZXN1bHRzOiBkYXRhLmdyb3VwcyB8fCB7W2NvbnRleHQuc2NvcGVdOiBkYXRhLmxpc3R9LFxyXG4gICAgICAgIGZhY2V0czogX3BhcnNlRmFjZXRzKGRhdGEuZmFjZXRzKSxcclxuICAgICAgICB0b3RhbENvdW50OiBkYXRhLnRvdGFsQ291bnRcclxuICAgIH0pO1xyXG59O1xyXG5cclxuXHJcbm1vZHVsZS5leHBvcnRzID0ge1xyXG4gICAgdW5zY29wZWRSZXNwb25zZTogX3BhcnNlVW5zY29wZWRSZXNwb25zZSxcclxuICAgIHNjb3BlZFJlc3BvbnNlOiBfcGFyc2VTY29wZWRSZXNwb25zZVxyXG59O1xyXG4iXX0=