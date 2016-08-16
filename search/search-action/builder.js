'use strict';

var _keys = require('lodash/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _mapValues = require('lodash/object/mapValues');

var _mapValues2 = _interopRequireDefault(_mapValues);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Build facets for server expected format.
 *
 * Expected format :
 * -----------------
 * {
 * 	  "criteria": "*",
 *   "facets": {FCT_MOVIE_TYPE: "Télefilm", FCT_MOVIE_TITLE: "g-m"}
 * }
 *
 *
 * @param  {[type]} facets [description]
 * @return {[type]}        [description]
 */
var _buildFacets = function _buildFacets(facets) {
  return (0, _mapValues2.default)(facets, function (facetData) {
    return facetData.key;
  });
};

/**
 * Build sort infotmation.
 * @param  {object} sortConf - The sort configuration.
 * @return {object} - The builded sort configuration.
 */
var _buildOrderAndSort = function _buildOrderAndSort(sortConf) {
  return {
    sortFieldName: sortConf.sortBy,
    sortDesc: sortConf.sortAsc === undefined ? false : !sortConf.sortAsc
  };
};

var _buildPagination = function _buildPagination(opts) {
  var resultsKeys = (0, _keys2.default)(opts.results);
  if (opts.isScroll && resultsKeys.length === 1) {
    var key = resultsKeys[0];
    var previousRes = opts.results[key];
    if (previousRes.length < opts.totalCount) {
      return {
        top: opts.nbSearchElement,
        skip: previousRes.length
      };
      //Else should not be called.
      console.warn('This should not happen.');
    };
  } else {
    return {
      skip: 0,
      top: opts.nbSearchElement || 0
    };
  }
};

module.exports = {
  pagination: _buildPagination,
  orderAndSort: _buildOrderAndSort,
  facets: _buildFacets
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInByb2Nlc3Nvci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBOzs7O0FBQ0E7Ozs7OztBQUVBOzs7Ozs7Ozs7Ozs7OztBQWNBLElBQU0sZUFBZSxTQUFmLFlBQWUsU0FBVTtBQUMzQixTQUFPLHlCQUFVLE1BQVYsRUFBa0IscUJBQWE7QUFDbEMsV0FBTyxVQUFVLEdBQWpCO0FBQ0gsR0FGTSxDQUFQO0FBR0gsQ0FKRDs7QUFNQTs7Ozs7QUFLQSxJQUFNLHFCQUFxQixTQUFyQixrQkFBcUIsV0FBWTtBQUNuQyxTQUFPO0FBQ0wsbUJBQWUsU0FBUyxNQURuQjtBQUVMLGNBQVUsU0FBUyxPQUFULEtBQXFCLFNBQXJCLEdBQStCLEtBQS9CLEdBQXFDLENBQUMsU0FBUztBQUZwRCxHQUFQO0FBSUgsQ0FMRDs7QUFTQSxJQUFNLG1CQUFtQixTQUFuQixnQkFBbUIsT0FBUTtBQUM3QixNQUFNLGNBQWMsb0JBQUssS0FBSyxPQUFWLENBQXBCO0FBQ0EsTUFBRyxLQUFLLFFBQUwsSUFBaUIsWUFBWSxNQUFaLEtBQXVCLENBQTNDLEVBQTZDO0FBQzNDLFFBQU0sTUFBTSxZQUFZLENBQVosQ0FBWjtBQUNBLFFBQU0sY0FBYyxLQUFLLE9BQUwsQ0FBYSxHQUFiLENBQXBCO0FBQ0EsUUFBRyxZQUFZLE1BQVosR0FBcUIsS0FBSyxVQUE3QixFQUF3QztBQUN0QyxhQUFPO0FBQ0wsYUFBSyxLQUFLLGVBREw7QUFFTCxjQUFNLFlBQVk7QUFGYixPQUFQO0FBSUE7QUFDQSxjQUFRLElBQVIsQ0FBYSx5QkFBYjtBQUNEO0FBQ0YsR0FYRCxNQVdPO0FBQ0wsV0FBTztBQUNMLFlBQU0sQ0FERDtBQUVMLFdBQUssS0FBSyxlQUFMLElBQXdCO0FBRnhCLEtBQVA7QUFJRDtBQUNKLENBbkJEOztBQXNCQSxPQUFPLE9BQVAsR0FBaUI7QUFDZixjQUFZLGdCQURHO0FBRWYsZ0JBQWMsa0JBRkM7QUFHZixVQUFRO0FBSE8sQ0FBakIiLCJmaWxlIjoicHJvY2Vzc29yLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGtleXMgZnJvbSAnbG9kYXNoL29iamVjdC9rZXlzJztcclxuaW1wb3J0IG1hcFZhbHVlcyBmcm9tICdsb2Rhc2gvb2JqZWN0L21hcFZhbHVlcyc7XHJcblxyXG4vKipcclxuICogQnVpbGQgZmFjZXRzIGZvciBzZXJ2ZXIgZXhwZWN0ZWQgZm9ybWF0LlxyXG4gKlxyXG4gKiBFeHBlY3RlZCBmb3JtYXQgOlxyXG4gKiAtLS0tLS0tLS0tLS0tLS0tLVxyXG4gKiB7XHJcbiAqIFx0ICBcImNyaXRlcmlhXCI6IFwiKlwiLFxyXG4gKiAgIFwiZmFjZXRzXCI6IHtGQ1RfTU9WSUVfVFlQRTogXCJUw6lsZWZpbG1cIiwgRkNUX01PVklFX1RJVExFOiBcImctbVwifVxyXG4gKiB9XHJcbiAqXHJcbiAqXHJcbiAqIEBwYXJhbSAge1t0eXBlXX0gZmFjZXRzIFtkZXNjcmlwdGlvbl1cclxuICogQHJldHVybiB7W3R5cGVdfSAgICAgICAgW2Rlc2NyaXB0aW9uXVxyXG4gKi9cclxuY29uc3QgX2J1aWxkRmFjZXRzID0gZmFjZXRzID0+IHtcclxuICAgIHJldHVybiBtYXBWYWx1ZXMoZmFjZXRzLCBmYWNldERhdGEgPT4ge1xyXG4gICAgICAgIHJldHVybiBmYWNldERhdGEua2V5O1xyXG4gICAgfSk7XHJcbn07XHJcblxyXG4vKipcclxuICogQnVpbGQgc29ydCBpbmZvdG1hdGlvbi5cclxuICogQHBhcmFtICB7b2JqZWN0fSBzb3J0Q29uZiAtIFRoZSBzb3J0IGNvbmZpZ3VyYXRpb24uXHJcbiAqIEByZXR1cm4ge29iamVjdH0gLSBUaGUgYnVpbGRlZCBzb3J0IGNvbmZpZ3VyYXRpb24uXHJcbiAqL1xyXG5jb25zdCBfYnVpbGRPcmRlckFuZFNvcnQgPSBzb3J0Q29uZiA9PiB7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICBzb3J0RmllbGROYW1lOiBzb3J0Q29uZi5zb3J0QnksXHJcbiAgICAgIHNvcnREZXNjOiBzb3J0Q29uZi5zb3J0QXNjID09PSB1bmRlZmluZWQ/ZmFsc2U6IXNvcnRDb25mLnNvcnRBc2NcclxuICAgIH1cclxufTtcclxuXHJcblxyXG5cclxuY29uc3QgX2J1aWxkUGFnaW5hdGlvbiA9IG9wdHMgPT4ge1xyXG4gICAgY29uc3QgcmVzdWx0c0tleXMgPSBrZXlzKG9wdHMucmVzdWx0cyk7XHJcbiAgICBpZihvcHRzLmlzU2Nyb2xsICYmIHJlc3VsdHNLZXlzLmxlbmd0aCA9PT0gMSl7XHJcbiAgICAgIGNvbnN0IGtleSA9IHJlc3VsdHNLZXlzWzBdO1xyXG4gICAgICBjb25zdCBwcmV2aW91c1JlcyA9IG9wdHMucmVzdWx0c1trZXldO1xyXG4gICAgICBpZihwcmV2aW91c1Jlcy5sZW5ndGggPCBvcHRzLnRvdGFsQ291bnQpe1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICB0b3A6IG9wdHMubmJTZWFyY2hFbGVtZW50LFxyXG4gICAgICAgICAgc2tpcDogcHJldmlvdXNSZXMubGVuZ3RoXHJcbiAgICAgICAgfTtcclxuICAgICAgICAvL0Vsc2Ugc2hvdWxkIG5vdCBiZSBjYWxsZWQuXHJcbiAgICAgICAgY29uc29sZS53YXJuKCdUaGlzIHNob3VsZCBub3QgaGFwcGVuLicpXHJcbiAgICAgIH07XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICByZXR1cm4ge1xyXG4gICAgICAgIHNraXA6IDAsXHJcbiAgICAgICAgdG9wOiBvcHRzLm5iU2VhcmNoRWxlbWVudCB8fCAwXHJcbiAgICAgIH1cclxuICAgIH1cclxufTtcclxuXHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IHtcclxuICBwYWdpbmF0aW9uOiBfYnVpbGRQYWdpbmF0aW9uLFxyXG4gIG9yZGVyQW5kU29ydDogX2J1aWxkT3JkZXJBbmRTb3J0LFxyXG4gIGZhY2V0czogX2J1aWxkRmFjZXRzXHJcbn07XHJcbiJdfQ==