'use strict';

var ArgumentNullException = require('../../exception/argument-null-exception');

var _require = require('lodash/lang');

var isNull = _require.isNull;
var isUndefined = _require.isUndefined;

/**
 * Assert an object is an objet.
 * @param  {string} name - The property name
 * @param  {object} data - The data to validate.
 * @returns {undefined} - Return nothing, throw an Exception if this is not valid.
 * @example var objToTest = { papa : "singe"}; isNull('objToTest', objToTest);
 */

module.exports = function (name, data) {
  if (isNull(data) || isUndefined(data)) {
    throw new ArgumentNullException(name + ' should be defined');
  }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInByb2Nlc3Nvci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLElBQUksd0JBQXdCLFFBQVEseUNBQVIsQ0FBNUI7O2VBQzRCLFFBQVEsYUFBUixDOztJQUF2QixNLFlBQUEsTTtJQUFRLFcsWUFBQSxXOztBQUViOzs7Ozs7OztBQU9BLE9BQU8sT0FBUCxHQUFpQixVQUFTLElBQVQsRUFBZSxJQUFmLEVBQXFCO0FBQ3JDLE1BQUksT0FBTyxJQUFQLEtBQWdCLFlBQVksSUFBWixDQUFwQixFQUF1QztBQUN0QyxVQUFNLElBQUkscUJBQUosQ0FBNkIsSUFBN0Isd0JBQU47QUFDQTtBQUNELENBSkQiLCJmaWxlIjoicHJvY2Vzc29yLmpzIiwic291cmNlc0NvbnRlbnQiOlsidmFyIEFyZ3VtZW50TnVsbEV4Y2VwdGlvbiA9IHJlcXVpcmUoJy4uLy4uL2V4Y2VwdGlvbi9hcmd1bWVudC1udWxsLWV4Y2VwdGlvbicpO1xyXG52YXIge2lzTnVsbCwgaXNVbmRlZmluZWR9ID0gcmVxdWlyZSgnbG9kYXNoL2xhbmcnKTtcclxuXHJcbi8qKlxyXG4gKiBBc3NlcnQgYW4gb2JqZWN0IGlzIGFuIG9iamV0LlxyXG4gKiBAcGFyYW0gIHtzdHJpbmd9IG5hbWUgLSBUaGUgcHJvcGVydHkgbmFtZVxyXG4gKiBAcGFyYW0gIHtvYmplY3R9IGRhdGEgLSBUaGUgZGF0YSB0byB2YWxpZGF0ZS5cclxuICogQHJldHVybnMge3VuZGVmaW5lZH0gLSBSZXR1cm4gbm90aGluZywgdGhyb3cgYW4gRXhjZXB0aW9uIGlmIHRoaXMgaXMgbm90IHZhbGlkLlxyXG4gKiBAZXhhbXBsZSB2YXIgb2JqVG9UZXN0ID0geyBwYXBhIDogXCJzaW5nZVwifTsgaXNOdWxsKCdvYmpUb1Rlc3QnLCBvYmpUb1Rlc3QpO1xyXG4gKi9cclxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihuYW1lLCBkYXRhKSB7XHJcblx0aWYgKGlzTnVsbChkYXRhKSB8fCBpc1VuZGVmaW5lZChkYXRhKSkge1xyXG5cdFx0dGhyb3cgbmV3IEFyZ3VtZW50TnVsbEV4Y2VwdGlvbihgJHtuYW1lfSBzaG91bGQgYmUgZGVmaW5lZGApO1xyXG5cdH1cclxufTtcclxuIl19