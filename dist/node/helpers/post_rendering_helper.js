/*global window, _,  $*/
"use strict";
(function(NS) {
  // Filename: post_rendering_helper.js
  NS = NS || {};
  var isInBrowser = typeof module === 'undefined' && typeof window !== 'undefined';
  var ArgumentInvalidException = isInBrowser ? NS.Helpers.Exceptions.ArgumentInvalidException : require("./custom_exception").ArgumentInvalidException;
  var ArgumentNullException = isInBrowser ? NS.Helpers.Exceptions.ArgumentNullException : require("./custom_exception").ArgumentNullException;
  var DependencyException = isInBrowser ? NS.Helpers.Exceptions.DependencyException : require("./custom_exception").DependencyException;
  //Container for all the post renderings functions.
  var postRenderingHelpers = {};
  //Register a helper inside the application.
  //Example call: `Fmk.postRenderingHelper.registerHelper({name: "hlpName", fn: fct})`
  var registerHelper = function registerHelper(helper) {
      if (helper === undefined || helper === null || _.isEmpty(helper)) {
          throw new ArgumentNullException("registerHelper, helper argument cannot be null or undefined ");
      }
      if (helper.name === null || helper.name === undefined) {
          throw new ArgumentNullException("registerHelper, helper.name cannot be null or undefined");
      }
      if (typeof helper.name !== "string") {
          throw new ArgumentInvalidException("registerHelper, helper.name must be a string.", helper);
      }
      if (helper.fn === null || helper.fn === undefined) {
          throw new ArgumentNullException("registerHelper, helper.fn cannot be null or undefined");
      }
      if (typeof helper.fn !== "string") {
          throw new ArgumentInvalidException("registerHelper, helper.fn must be a function name: a string.", helper);
      }
      if (!$.fn[helper.fn]) {
          throw new DependencyException("registerHelper, helper.fn: "+ helper.fn +" must be a registered JQuery plugin in $.fn");
      }
      if (typeof helper.parseFunction !== "string") {
          throw new ArgumentInvalidException("registerHelper, helper.fn must be a function name: a string.", helper);
      }
      if (!$.fn[helper.parseFunction]) {
          throw new DependencyException("registerHelper, helper.fn: "+ helper.parseFunction +" must be a registered JQuery plugin in $.fn");
      }
      postRenderingHelpers[helper.name] = {fn: helper.fn, options: helper.options, parseArgument: helper.parseArgument, parseFunction: helper.parseFunction};
  };
  //Options must have a selector property and a helperName one.
  var callHelper = function callHelper(config) {
      
    //If there is nothing selected.
    if(config.selector === undefined || config.selector.size() === 0){
      return;
    }
    if (typeof config.helperName !== "string") {
        throw new ArgumentInvalidException("callHelper, config.helperName must be a string, check your in your domain file any the decorator property", config);
    }
    //If the function  desn not exist on the selection.
    if(config.selector[postRenderingHelpers[config.helperName].fn] === undefined){
      return;
    }
    var postRenderingOptions = postRenderingHelpers[config.helperName].options;
    if (config.decoratorOptions) {
        //Extend the post rendering options defined in the helper definition with options define in the model (optionnaly)
        // For each property: `Model.extend({metadatas:{propertyName: {decoratorOptions: {opt1: 1, opt2: 2}}}})`
        _.extend(postRenderingOptions, config.decoratorOptions);
    }
    config.selector[postRenderingHelpers[config.helperName].fn](postRenderingOptions);
    //config.selector[config.helperName](options);
  };

  //Call the parser plugin
  var callParser = function callParser(config){
    //If there is nothing selected.
    if(config.selector === undefined || config.selector.size() === 0){
      return;
    }
    if (typeof config.helperName !== "string") {
        throw new ArgumentInvalidException("callHelper, config.helperName must be a string, check your in your domain file any the decorator property", config);
    }
    //If the function  desn not exist on the selection.
    if(config.selector[postRenderingHelpers[config.helperName].parseFunction] === undefined){
      return;
    }
    var helper = postRenderingHelpers[config.helperName];
    return config.selector[helper.parseFunction](helper.parseArgument);
  };
  var mdl = {
    registerHelper: registerHelper,
    callHelper: callHelper,
    callParser:callParser
  };
    // Differenciating export for node or browser.
  if (isInBrowser) {
    NS.Helpers = NS.Helpers || {};
    NS.Helpers.postRenderingHelper = mdl;
  } else {
    module.exports = mdl;
  }

})(typeof module === 'undefined' && typeof window !== 'undefined' ? window.Fmk : module.exports);