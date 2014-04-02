/*global window*/
"use strict";
(function(NS) {
  // Filename: post_rendering_helper.js
  NS = NS || {};
  var isInBrowser = typeof module === 'undefined' && typeof window !== 'undefined';
  //Container for all the post renderings functions.
  var postRenderingHelpers = {};
  //Register a helper inside the application.
  //Example call: `Fmk.postRenderingHelper.registerHelper({name: "hlpName", fn: fct})`
  var registerHelper = function registerHelper(helper) {
    postRenderingHelpers[helper.name] = {fn: helper.fn, options: helper.options};
  };
  //Options must have a selector property and a helperName one.
  var callHelper = function callHelper( config) {
    //If there is nothing selected.
    if(config.selector === undefined || config.selector.size() === 0){
      return;
    }
    //If the function  desn not exist on the selection.
    if(config.selector[postRenderingHelpers[config.helperName].fn] === undefined){
      return;
    }
    config.selector[postRenderingHelpers[config.helperName].fn](postRenderingHelpers[config.helperName].options);
    //config.selector[config.helperName](options);
  };
  var mdl = {
    registerHelper: registerHelper,
    callHelper: callHelper
  };
    // Differenciating export for node or browser.
  if (isInBrowser) {
    NS.Helpers = NS.Helpers || {};
    NS.Helpers.postRenderingHelper = mdl;
  } else {
    module.exports = mdl;
  }

})(typeof module === 'undefined' && typeof window !== 'undefined' ? window.Fmk : module.exports);