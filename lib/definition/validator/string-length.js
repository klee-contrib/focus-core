//Function to test the length of a string.
'use strict';

module.exports = function stringLength(stringToTest, options) {
  if ('string' !== typeof stringToTest) {
    return false;
  }
  options = options || {};
  //console.log(options);
  options.minLength = options.minLength || 0;
  var isMinLength = options.minLength !== undefined ? stringToTest.length >= options.minLength : true;
  var isMaxLength = options.maxLength !== undefined ? stringToTest.length <= options.maxLength : true;
  return isMinLength && isMaxLength;
};