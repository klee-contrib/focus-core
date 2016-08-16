'use strict';

var ArgumentInvalidException = require('../../exception/argument-invalid-exception');
var isObject = require('lodash/lang/isObject');

/**
 * Assert an object is an objet.
 * @param  {string} name - The property name
 * @param  {object} data - The data to validate.
 * @return {undefined} - Return nothing, throw an Exception if this is not valid.
 */
module.exports = function (name, data) {
  if (data !== undefined && !isObject(data)) {
    throw new ArgumentInvalidException(name + ' should be an object', data);
  }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInByb2Nlc3Nvci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLElBQUksMkJBQTJCLFFBQzlCLDRDQUQ4QixDQUEvQjtBQUVBLElBQUksV0FBVyxRQUFRLHNCQUFSLENBQWY7O0FBRUE7Ozs7OztBQU1BLE9BQU8sT0FBUCxHQUFpQixVQUFTLElBQVQsRUFBZSxJQUFmLEVBQXFCO0FBQ3JDLE1BQUksU0FBUyxTQUFULElBQXNCLENBQUMsU0FBUyxJQUFULENBQTNCLEVBQTJDO0FBQzFDLFVBQU0sSUFBSSx3QkFBSixDQUFnQyxJQUFoQywyQkFBNEQsSUFBNUQsQ0FBTjtBQUNBO0FBQ0QsQ0FKRCIsImZpbGUiOiJwcm9jZXNzb3IuanMiLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgQXJndW1lbnRJbnZhbGlkRXhjZXB0aW9uID0gcmVxdWlyZShcclxuXHQnLi4vLi4vZXhjZXB0aW9uL2FyZ3VtZW50LWludmFsaWQtZXhjZXB0aW9uJyk7XHJcbnZhciBpc09iamVjdCA9IHJlcXVpcmUoJ2xvZGFzaC9sYW5nL2lzT2JqZWN0Jyk7XHJcblxyXG4vKipcclxuICogQXNzZXJ0IGFuIG9iamVjdCBpcyBhbiBvYmpldC5cclxuICogQHBhcmFtICB7c3RyaW5nfSBuYW1lIC0gVGhlIHByb3BlcnR5IG5hbWVcclxuICogQHBhcmFtICB7b2JqZWN0fSBkYXRhIC0gVGhlIGRhdGEgdG8gdmFsaWRhdGUuXHJcbiAqIEByZXR1cm4ge3VuZGVmaW5lZH0gLSBSZXR1cm4gbm90aGluZywgdGhyb3cgYW4gRXhjZXB0aW9uIGlmIHRoaXMgaXMgbm90IHZhbGlkLlxyXG4gKi9cclxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihuYW1lLCBkYXRhKSB7XHJcblx0aWYgKGRhdGEgIT09IHVuZGVmaW5lZCAmJiAhaXNPYmplY3QoZGF0YSkpIHtcclxuXHRcdHRocm93IG5ldyBBcmd1bWVudEludmFsaWRFeGNlcHRpb24oYCR7bmFtZX0gc2hvdWxkIGJlIGFuIG9iamVjdGAsIGRhdGEpO1xyXG5cdH1cclxufTtcclxuIl19