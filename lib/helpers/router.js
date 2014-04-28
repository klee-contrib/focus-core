/* global window, Promise*/
(function(NS) {
  "use strict";
  //Filename: helpers/router.js
  NS = NS || {};
  //Dependency gestion depending on the fact that we are in the browser or in node.
  var isInBrowser = typeof module === 'undefined' && typeof window !== 'undefined';
  var middleWares = [];
  var middlewarePromise = function middlewarePromise(middleWareFunction){
    return new Promise(function(resolve, reject){
      if(middleWareFunction(arguments)){
        resolve(arguments);
      }else{
        reject(arguments);
      }
    });
  };

  var registerMiddleWare = function registerMiddleWare(middleWareFunction){
    middleWares.push(middleWareFunction);
  }
  var router = {};

  // Differenciating export for node or browser.
  if (isInBrowser) {
    NS.Helpers = NS.Helpers || {};
    NS.Helpers.router = router;
  } else {
    module.exports = router;
  }
})(typeof module === 'undefined' && typeof window !== 'undefined' ? window.Fmk : module.exports);