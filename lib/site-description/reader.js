'use strict';

var ArgumentNullException = require('../exception').ArgumentNullException;
var ArgumentInvalidException = require('../exception').ArgumentInvalidException;

var _require = require('lodash/lang');

var isObject = _require.isObject;
var isFunction = _require.isFunction;
var isArray = _require.isArray;
var isEqual = _require.isEqual;
var clone = _require.clone;

var contains = require('lodash/collection/contains');
var intersection = require('lodash/array/intersection');
var keys = require('lodash/object/keys');

//Module page.
var siteDescriptionStructure = undefined,
    siteDescriptionParams = undefined,
    isProcess = false;

//Get the site process
var getSite = function getSite() {
  isProcess = true;
  if (!isFunction(siteDescriptionStructure)) {
    console.warn('You are trying to call getSite before it was correctly initialized...');
  }
  return siteDescriptionStructure(siteDescriptionParams);
};

//Define the application site description.
//The siteDescription must be a function which return an object with the following structure:
// `{headers: [{name: "NameOfTheModule", url: "#nameOftheModule/:param, roles:['CHIEF', 'MASTER']", headers: [[{name: "NameOfTheModule", url: "#nameOftheModule/:param, roles:['CHIEF', 'MASTER']", headers: []}]]}]}`
var defineSite = function defineSite(siteDescription) {
  if (!isObject(siteDescription)) {
    throw new ArgumentNullException('SiteDescription must be an object', siteDescription);
  }
  if (!isObject(siteDescription.params)) {
    throw new ArgumentNullException('SiteDescription.params must be an object', siteDescription);
  }
  if (!isFunction(siteDescription.value)) {
    throw new ArgumentNullException('SiteDescription.value must be a function', siteDescription);
  }
  siteDescriptionParams = siteDescription.params || {};
  siteDescriptionStructure = siteDescription.value;
  return getSite();
};

//param must be a {name: 'paramName', value: 'paramValue'} object.
var defineParam = function defineParamSiteDescriptionHelper(param) {
  if (param === undefined) {
    throw new ArgumentNullException('You cannot set an undefined param.', param);
  }
  //console.log("Debug", param.name, siteDescriptionParams,siteDescriptionParams['codePays']);
  if (siteDescriptionParams[param.name] === undefined) {
    throw new ArgumentNullException('The parameter you try to define has not been anticipated by the siteDescription', {
      param: param,
      siteParams: siteDescriptionParams
    });
  }
  if (siteDescriptionParams[param.name].value === param.value && isEqual(siteDescriptionParams[param.name].title, param.title)) {
    console.info('No changes on param', param);
    return false;
  }
  siteDescriptionParams[param.name] = {
    value: param.value,
    title: param.title,
    isDefine: true
  };
  isProcess = false;
  return true;
};

//Check if the params is define in the params list.
var checkParams = function checkParams(paramsArray) {
  if (typeof paramsArray === 'undefined') {
    return true;
  }
  if (isArray(paramsArray)) {
    throw new ArgumentInvalidException('The paramsArray must be an array');
  }
  if (intersection(keys(siteDescriptionParams), paramsArray).length !== paramsArray.length) {
    return false;
  }
  for (var prop in siteDescriptionParams) {
    if (contains(paramsArray, prop) && !siteDescriptionParams[prop].isDefine) {
      return false;
    }
  }
  return true;
};

var siteDescriptionHelper = {
  defineSite: defineSite,
  defineParam: defineParam,
  getSite: getSite,
  getParams: function getParams() {
    return clone(siteDescriptionParams);
  },
  checkParams: checkParams,
  isProcessed: function isProcessed() {
    return isProcess;
  }
};

module.exports = siteDescriptionHelper;