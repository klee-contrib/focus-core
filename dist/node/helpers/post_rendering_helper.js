/*global window.*/
(function(NS) {
  NS = NS || {};
  var isInBrowser = typeof module === 'undefined' && typeof window !== 'undefined';
  //Container for all the post renderings functions.
  var postRenderingHelpers = {};
  //Register a helper inside the application.
  var registerHelper = function registerHelper(name, fn){
    postRenderingHelpers[name] = fn;
  };
  //Options must have a selector property and a helperName one.
  var callHelper = function (selector, helperName){
    selector.postRenderingHelpers[helperName]();
  };
  var mdl = {registerHelper: registerHelper, callHelper: callHelper}
  // Differenciating export for node or browser.
    if (isInBrowser) {
        NS.Helpers = NS.Helpers || {};
        NS.Helpers.postRendering = mdl;
    } else {
        module.exports = mdl;
    }

})(typeof module === 'undefined' && typeof window !== 'undefined' ? window.Fmk : module.exports);