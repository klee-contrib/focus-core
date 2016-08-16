'use strict';

var keys = require('lodash/object/keys');
var isArray = require('lodash/lang/isArray');
/**
 * Build sort infotmation.
 * @param  {object} sortConf - The sort configuration.
 * @return {object} - The builded sort configuration.
 */
function _buildOrderAndSort(sortConf) {
    return {
        sortFieldName: sortConf.sortBy,
        sortDesc: sortConf.sortAsc === undefined ? false : !sortConf.sortAsc
    };
}

/**
 * Build the pagination configuration given the options.
 * @param  {object} opts - The pagination options should be :
 *   isScroll (:bool) - Are we in a scroll context.
 *   totalCount (:number) - The total number of element. (intresting only in the scroll case)
 *   nbSearchElement (:number) - The number of elements you want to get back from the search.
 * @return {object} - An object with {top, skip}.
 */
function _buildPagination(opts) {
    var isScroll = opts.isScroll;
    var dataList = opts.dataList;
    var totalCount = opts.totalCount;
    var nbElement = opts.nbElement;

    if (isScroll) {
        if (!isArray(dataList)) {
            throw new Error('The data list options sould exist and be an array');
        }
        if (dataList.length < totalCount) {
            return { top: nbElement, skip: dataList.length };
        }
    }
    return {
        top: nbElement,
        skip: 0
    };
}

module.exports = {
    pagination: _buildPagination,
    orderAndSort: _buildOrderAndSort
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInByb2Nlc3Nvci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLElBQUksT0FBTyxRQUFRLG9CQUFSLENBQVg7QUFDQSxJQUFJLFVBQVUsUUFBUSxxQkFBUixDQUFkO0FBQ0E7Ozs7O0FBS0EsU0FBUyxrQkFBVCxDQUE0QixRQUE1QixFQUFxQztBQUNqQyxXQUFPO0FBQ0gsdUJBQWUsU0FBUyxNQURyQjtBQUVILGtCQUFVLFNBQVMsT0FBVCxLQUFtQixTQUFuQixHQUE2QixLQUE3QixHQUFtQyxDQUFDLFNBQVM7QUFGcEQsS0FBUDtBQUlIOztBQUdEOzs7Ozs7OztBQVFBLFNBQVMsZ0JBQVQsQ0FBMEIsSUFBMUIsRUFBK0I7QUFBQSxRQUN0QixRQURzQixHQUN1QixJQUR2QixDQUN0QixRQURzQjtBQUFBLFFBQ1osUUFEWSxHQUN1QixJQUR2QixDQUNaLFFBRFk7QUFBQSxRQUNGLFVBREUsR0FDdUIsSUFEdkIsQ0FDRixVQURFO0FBQUEsUUFDVSxTQURWLEdBQ3VCLElBRHZCLENBQ1UsU0FEVjs7QUFFM0IsUUFBRyxRQUFILEVBQVk7QUFDUixZQUFHLENBQUMsUUFBUSxRQUFSLENBQUosRUFBc0I7QUFDbEIsa0JBQU0sSUFBSSxLQUFKLENBQVUsbURBQVYsQ0FBTjtBQUNIO0FBQ0QsWUFBRyxTQUFTLE1BQVQsR0FBa0IsVUFBckIsRUFBZ0M7QUFDNUIsbUJBQU8sRUFBQyxLQUFLLFNBQU4sRUFBaUIsTUFBTSxTQUFTLE1BQWhDLEVBQVA7QUFDSDtBQUNKO0FBQ0QsV0FBTztBQUNILGFBQUssU0FERjtBQUVILGNBQU07QUFGSCxLQUFQO0FBSUg7O0FBRUQsT0FBTyxPQUFQLEdBQWlCO0FBQ2IsZ0JBQVksZ0JBREM7QUFFYixrQkFBYztBQUZELENBQWpCIiwiZmlsZSI6InByb2Nlc3Nvci5qcyIsInNvdXJjZXNDb250ZW50IjpbImxldCBrZXlzID0gcmVxdWlyZSgnbG9kYXNoL29iamVjdC9rZXlzJyk7XHJcbmxldCBpc0FycmF5ID0gcmVxdWlyZSgnbG9kYXNoL2xhbmcvaXNBcnJheScpO1xyXG4vKipcclxuICogQnVpbGQgc29ydCBpbmZvdG1hdGlvbi5cclxuICogQHBhcmFtICB7b2JqZWN0fSBzb3J0Q29uZiAtIFRoZSBzb3J0IGNvbmZpZ3VyYXRpb24uXHJcbiAqIEByZXR1cm4ge29iamVjdH0gLSBUaGUgYnVpbGRlZCBzb3J0IGNvbmZpZ3VyYXRpb24uXHJcbiAqL1xyXG5mdW5jdGlvbiBfYnVpbGRPcmRlckFuZFNvcnQoc29ydENvbmYpe1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICBzb3J0RmllbGROYW1lOiBzb3J0Q29uZi5zb3J0QnksXHJcbiAgICAgICAgc29ydERlc2M6IHNvcnRDb25mLnNvcnRBc2M9PT11bmRlZmluZWQ/ZmFsc2U6IXNvcnRDb25mLnNvcnRBc2NcclxuICAgIH07XHJcbn1cclxuXHJcblxyXG4vKipcclxuICogQnVpbGQgdGhlIHBhZ2luYXRpb24gY29uZmlndXJhdGlvbiBnaXZlbiB0aGUgb3B0aW9ucy5cclxuICogQHBhcmFtICB7b2JqZWN0fSBvcHRzIC0gVGhlIHBhZ2luYXRpb24gb3B0aW9ucyBzaG91bGQgYmUgOlxyXG4gKiAgIGlzU2Nyb2xsICg6Ym9vbCkgLSBBcmUgd2UgaW4gYSBzY3JvbGwgY29udGV4dC5cclxuICogICB0b3RhbENvdW50ICg6bnVtYmVyKSAtIFRoZSB0b3RhbCBudW1iZXIgb2YgZWxlbWVudC4gKGludHJlc3Rpbmcgb25seSBpbiB0aGUgc2Nyb2xsIGNhc2UpXHJcbiAqICAgbmJTZWFyY2hFbGVtZW50ICg6bnVtYmVyKSAtIFRoZSBudW1iZXIgb2YgZWxlbWVudHMgeW91IHdhbnQgdG8gZ2V0IGJhY2sgZnJvbSB0aGUgc2VhcmNoLlxyXG4gKiBAcmV0dXJuIHtvYmplY3R9IC0gQW4gb2JqZWN0IHdpdGgge3RvcCwgc2tpcH0uXHJcbiAqL1xyXG5mdW5jdGlvbiBfYnVpbGRQYWdpbmF0aW9uKG9wdHMpe1xyXG4gICAgbGV0IHtpc1Njcm9sbCwgZGF0YUxpc3QsIHRvdGFsQ291bnQsIG5iRWxlbWVudH0gPSBvcHRzO1xyXG4gICAgaWYoaXNTY3JvbGwpe1xyXG4gICAgICAgIGlmKCFpc0FycmF5KGRhdGFMaXN0KSl7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignVGhlIGRhdGEgbGlzdCBvcHRpb25zIHNvdWxkIGV4aXN0IGFuZCBiZSBhbiBhcnJheScpXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKGRhdGFMaXN0Lmxlbmd0aCA8IHRvdGFsQ291bnQpe1xyXG4gICAgICAgICAgICByZXR1cm4ge3RvcDogbmJFbGVtZW50LCBza2lwOiBkYXRhTGlzdC5sZW5ndGh9O1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgdG9wOiBuYkVsZW1lbnQsXHJcbiAgICAgICAgc2tpcDogMFxyXG4gICAgfVxyXG59XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IHtcclxuICAgIHBhZ2luYXRpb246IF9idWlsZFBhZ2luYXRpb24sXHJcbiAgICBvcmRlckFuZFNvcnQ6IF9idWlsZE9yZGVyQW5kU29ydFxyXG59O1xyXG4iXX0=