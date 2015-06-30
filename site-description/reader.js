/* global  _*/
"use strict";
//Filename: helpers/routes_helper.js
//Dependency gestion depending on the fact that we are in the browser or in node.
var ArgumentNullException = require("./custom_exception").ArgumentNullException;
var ArgumentInvalidException = require("./custom_exception").ArgumentInvalidException;
//Module page.
var siteDescriptionStructure,
  siteDescriptionParams,
  isProcess = false;
//Define the application site description.
//The siteDescription must be a function which return an object with the following structure:
// `{headers: [{name: "NameOfTheModule", url: "#nameOftheModule/:param, roles:['CHIEF', 'MASTER']", headers: [[{name: "NameOfTheModule", url: "#nameOftheModule/:param, roles:['CHIEF', 'MASTER']", headers: []}]]}]}`
var defineSite = function defineSite(siteDescription) {
  if (typeof siteDescription !== "object") {
    throw new ArgumentNullException('SiteDescription must be an object', siteDescription);
  }
  if (typeof siteDescription.params !== "object") {
    throw new ArgumentNullException('SiteDescription.params must be an object', siteDescription);
  }
  if (typeof siteDescription.value !== "function") {
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
  if (siteDescriptionParams[param.name].value === param.value && _.isEqual(siteDescriptionParams[param.name].title, param.title)) {
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

//Get the site process
var getSite = function getSite() {
  isProcess = true;
  return siteDescriptionStructure(siteDescriptionParams);
};

//Check if the params is define in the params list.
var checkParams = function checkParams(paramsArray) {
  if (typeof paramsArray === "undefined") {
    return true;
  }
  if (!_.isArray(paramsArray)) {
    throw new ArgumentInvalidException("The paramsArray must be an array");
  }
  if (_.intersection(_.keys(siteDescriptionParams), paramsArray).length !== paramsArray.length) {
    return false;
  }
  for (var prop in siteDescriptionParams) {
    if (_.contains(paramsArray, prop) && !siteDescriptionParams[prop].isDefine) {
      return false;
    }
  }
  return true;
};
/**
 * @description Get th site structure processed with the user roles.
 * @returns {object}
 */
function getUserSiteStructure(){
  return require("./site_description_builder").getSiteStructure();
}

var siteDescriptionHelper = {
  defineSite: defineSite,
  defineParam: defineParam,
  getSite: getSite,
  getParams: function () {
    return _.clone(siteDescriptionParams);
  },
  checkParams: checkParams,
  isProcessed: function isProcessed() {
    return isProcess;
  },
  getUserSiteStructure: getUserSiteStructure
};

module.exports = siteDescriptionHelper;