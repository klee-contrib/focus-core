'use strict';

var ArgumentInvalidException = require('../../exception/ArgumentInvalidException');
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