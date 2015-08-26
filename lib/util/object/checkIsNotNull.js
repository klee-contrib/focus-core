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