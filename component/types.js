//Dependencies.
var React = require('react');
var isString = require('lodash/lang/isString');
var isArray = require('lodash/lang/isArray');

/**
 * Expose a React type validation for the component properties validation.
 * @param  {string or array} type - String or array of the types to use.
 * @return {object} The corresponding react type.
 */
module.exports = function(type){
  var isStringType = isString(type);
  if(!isStringType && !isArray(type)){
    throw new Error('The type should be a string or an array');
  }
  if(isStringType){
    return React.PropTypes[type];
  } return React.PropTypes.oneOf(type);

};
