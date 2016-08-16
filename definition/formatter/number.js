'use strict';

var _numeral = require('numeral');

var _numeral2 = _interopRequireDefault(_numeral);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DEFAULT_FORMAT = '0,0';

//TODO change numeral lib and regroup initializers
function language(key, conf) {
    return _numeral2.default.language(key, conf);
};

/**
* Format a number using a given format.
* @param  {number} number - The number to format.
* @param  {string} format - The format to transform.
* @return {string} - The formated number.
*/
function format(number, format) {
    format = format || DEFAULT_FORMAT;
    return (0, _numeral2.default)(number).format(format);
};

module.exports = {
    format: format,
    language: language
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInByb2Nlc3Nvci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBOzs7Ozs7QUFFQSxJQUFNLGlCQUFpQixLQUF2Qjs7QUFFQTtBQUNBLFNBQVMsUUFBVCxDQUFrQixHQUFsQixFQUF1QixJQUF2QixFQUE2QjtBQUN6QixXQUFPLGtCQUFRLFFBQVIsQ0FBaUIsR0FBakIsRUFBc0IsSUFBdEIsQ0FBUDtBQUNIOztBQUVEOzs7Ozs7QUFNQSxTQUFTLE1BQVQsQ0FBZ0IsTUFBaEIsRUFBd0IsTUFBeEIsRUFBZ0M7QUFDNUIsYUFBUyxVQUFVLGNBQW5CO0FBQ0EsV0FBTyx1QkFBUSxNQUFSLEVBQWdCLE1BQWhCLENBQXVCLE1BQXZCLENBQVA7QUFDSDs7QUFFRCxPQUFPLE9BQVAsR0FBaUI7QUFDYixrQkFEYTtBQUViO0FBRmEsQ0FBakIiLCJmaWxlIjoicHJvY2Vzc29yLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IG51bWVyYWwgZnJvbSAnbnVtZXJhbCc7XHJcblxyXG5jb25zdCBERUZBVUxUX0ZPUk1BVCA9ICcwLDAnO1xyXG5cclxuLy9UT0RPIGNoYW5nZSBudW1lcmFsIGxpYiBhbmQgcmVncm91cCBpbml0aWFsaXplcnNcclxuZnVuY3Rpb24gbGFuZ3VhZ2Uoa2V5LCBjb25mKSB7XHJcbiAgICByZXR1cm4gbnVtZXJhbC5sYW5ndWFnZShrZXksIGNvbmYpO1xyXG59O1xyXG5cclxuLyoqXHJcbiogRm9ybWF0IGEgbnVtYmVyIHVzaW5nIGEgZ2l2ZW4gZm9ybWF0LlxyXG4qIEBwYXJhbSAge251bWJlcn0gbnVtYmVyIC0gVGhlIG51bWJlciB0byBmb3JtYXQuXHJcbiogQHBhcmFtICB7c3RyaW5nfSBmb3JtYXQgLSBUaGUgZm9ybWF0IHRvIHRyYW5zZm9ybS5cclxuKiBAcmV0dXJuIHtzdHJpbmd9IC0gVGhlIGZvcm1hdGVkIG51bWJlci5cclxuKi9cclxuZnVuY3Rpb24gZm9ybWF0KG51bWJlciwgZm9ybWF0KSB7XHJcbiAgICBmb3JtYXQgPSBmb3JtYXQgfHwgREVGQVVMVF9GT1JNQVQ7XHJcbiAgICByZXR1cm4gbnVtZXJhbChudW1iZXIpLmZvcm1hdChmb3JtYXQpO1xyXG59O1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSB7XHJcbiAgICBmb3JtYXQsXHJcbiAgICBsYW5ndWFnZVxyXG59O1xyXG4iXX0=