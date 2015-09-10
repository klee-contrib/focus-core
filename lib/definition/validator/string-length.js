'use strict';

var _require = require('lodash/lang');

var isString = _require.isString;

/**
 * Validate a string given options.
 * @param  {string} stringToTest - The string to test.
 * @param  {object} options - Validators options, supports minLength and maxLength both optionals.
 * @return {boolean} - True if the string is valid , false otherwise.
 */
module.exports = function stringLength(stringToTest) {
    var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

    if (!isString(stringToTest)) {
        return false;
    }
    options.minLength = options.minLength || 0;
    var isMinLength = options.minLength !== undefined ? stringToTest.length >= options.minLength : true;
    var isMaxLength = options.maxLength !== undefined ? stringToTest.length <= options.maxLength : true;
    return isMinLength && isMaxLength;
};