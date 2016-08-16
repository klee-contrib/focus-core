'use strict';

var ArgumentInvalidException = require('../../exception/argument-invalid-exception');
var isString = require('lodash/lang/isString');

/**
 * Assert an object is an objet.
 * @param  {string} name - The property name
 * @param  {string} data - The data to validate.
 * @return {undefined} - Return nothing, throw an Exception if this is not valid.
 */
module.exports = function (name, data) {
  if (!isString(data)) {
    throw new ArgumentInvalidException(name + ' should be a string', data);
  }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInByb2Nlc3Nvci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLElBQUksMkJBQTJCLFFBQzlCLDRDQUQ4QixDQUEvQjtBQUVBLElBQUksV0FBVyxRQUFRLHNCQUFSLENBQWY7O0FBRUE7Ozs7OztBQU1BLE9BQU8sT0FBUCxHQUFpQixVQUFTLElBQVQsRUFBZSxJQUFmLEVBQXFCO0FBQ3JDLE1BQUksQ0FBQyxTQUFTLElBQVQsQ0FBTCxFQUFxQjtBQUNwQixVQUFNLElBQUksd0JBQUosQ0FBZ0MsSUFBaEMsMEJBQTJELElBQTNELENBQU47QUFDQTtBQUNELENBSkQiLCJmaWxlIjoicHJvY2Vzc29yLmpzIiwic291cmNlc0NvbnRlbnQiOlsidmFyIEFyZ3VtZW50SW52YWxpZEV4Y2VwdGlvbiA9IHJlcXVpcmUoXHJcblx0Jy4uLy4uL2V4Y2VwdGlvbi9hcmd1bWVudC1pbnZhbGlkLWV4Y2VwdGlvbicpO1xyXG52YXIgaXNTdHJpbmcgPSByZXF1aXJlKCdsb2Rhc2gvbGFuZy9pc1N0cmluZycpO1xyXG5cclxuLyoqXHJcbiAqIEFzc2VydCBhbiBvYmplY3QgaXMgYW4gb2JqZXQuXHJcbiAqIEBwYXJhbSAge3N0cmluZ30gbmFtZSAtIFRoZSBwcm9wZXJ0eSBuYW1lXHJcbiAqIEBwYXJhbSAge3N0cmluZ30gZGF0YSAtIFRoZSBkYXRhIHRvIHZhbGlkYXRlLlxyXG4gKiBAcmV0dXJuIHt1bmRlZmluZWR9IC0gUmV0dXJuIG5vdGhpbmcsIHRocm93IGFuIEV4Y2VwdGlvbiBpZiB0aGlzIGlzIG5vdCB2YWxpZC5cclxuICovXHJcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24obmFtZSwgZGF0YSkge1xyXG5cdGlmICghaXNTdHJpbmcoZGF0YSkpIHtcclxuXHRcdHRocm93IG5ldyBBcmd1bWVudEludmFsaWRFeGNlcHRpb24oYCR7bmFtZX0gc2hvdWxkIGJlIGEgc3RyaW5nYCwgZGF0YSk7XHJcblx0fVxyXG59O1xyXG4iXX0=