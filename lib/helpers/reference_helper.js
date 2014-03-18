/*global Promise, $, _, window*/
"use strict";
(function(NS) {
  NS = NS || {};
  /* Filename: helpers/reference_helper.js  */
  //Dependency gestion depending on the fact that we are in the browser or in node.
  var isInBrowser = typeof module === 'undefined' && typeof window !== 'undefined';

  // Container for all the references lists.
  var references = {};

  //Container for the list and 
  var configuration = {};
  
  //Can be use to override a service, can be call with options = {"referenceName": serviceFunction} 
  //serviceFunction is obtain with a require. 
  function configureRefServices(options){
    _.extend(configuration, options);
  }

  var loadList = function loadList(listDesc){
    return new Promise(function promiseLoadList(resolve, reject) {
      //console.log("Errors", errors);
      $.ajax({
          url: listDesc.url,
          type: "GET",
          dataType: "json",
          crossDomain: true,
          success: function(data) {
            references[listDesc.name] = data; //In order to not reload the next time,  warning, as promises are asynchronous, when the promise is define, this could be false.
            resolve(data);
          },
          error: function(error) {
            reject(error);
          }
        });
    });
  };

  // Load a reference with its list name.
  function loadListByName(listName) {
    //Call the service, the service must return a promise.
    return configuration[listName]();
  }

  // Return an array of many promises for all the given lists.
  function loadMany(names) {
    var promises = [];
    names.forEach(function(name) {
      promises.push(loadListByName(name));
    });
    return promises;
  }


  var referenceHelper = {
    loadListByName: loadListByName,
    loadList: loadList,
    loadMany: loadMany,
    configure: configureRefServices
  };

  // Differenciating export for node or browser.
  if (isInBrowser) {
    NS.Helpers = NS.Helpers || {};
    NS.Helpers.referenceHelper = referenceHelper;
  } else {
    module.exports = referenceHelper;
  }
})(typeof module === 'undefined' && typeof window !== 'undefined' ? window.Fmk : module.exports);