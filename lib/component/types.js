"use strict";
//Dependencies.
var React = require('react');
var isString = require('lodash/lang/isString');
var isArray = require('lodash/lang/isArray');

/**
 * Expose a React type validation for the component properties validation.
 * @see http://facebook.github.io/react/docs/reusable-components.html
 * @param   {string} type - String or array of the types to use.
 * @param   {boolean} isRequired - Defines if the props is mandatory.
 * @returns {object} The corresponding react type.
 */
module.exports = function (type, isRequired) {
  var isStringType = isString(type);
  if (!isStringType && !isArray(type)) {
    throw new Error('The type should be a string or an array');
  }
  //Container for the propTypes.
  var propTypeToReturn;
  //Array case.
  if (isStringType) {
    propTypeToReturn = React.PropTypes[type];
  } else {
    propTypeToReturn = React.PropTypes.oneOfType(type.map(function (type) {
      return React.PropTypes[type];
    }));
  }
  //Mandatory case
  if (isRequired) {
    propTypeToReturn = propTypeToReturn.isRequired;
  }
  return propTypeToReturn;
};