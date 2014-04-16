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

  // This method perform an ajax request within a promise.
  // Example call : refHelper.loadList({url: "http://localhost:8080/api/list/1"}).then(console.log,console.error);
  var loadList = function loadList(listDesc){
    return new Promise(function promiseLoadList(resolve, reject) {
      //console.log("Errors", errors);
      $.ajax({
          url: listDesc.url,
          type: "GET",
          dataType: "json",
          crossDomain: true,
          success: function(data) {
            //references[listDesc.name] = data; //In order to not reload the next time,  warning, as promises are asynchronous, when the promise is define, this could be false.
            resolve(data);
          },
          error: function(error) {
            reject(error);
          }
        });
    });
  };

  // Load a reference with its list name.
  // It calls the service which must have been registered.
  function loadListByName(listName) {
      return getService(listName);
  }
  
    //Load a service by name.
  function getService(listName, args) {
      if (typeof configuration[listName] !== "function") {
          throw new Error("You are trying to load the reference list: "+ listName + " which does not have a list configure." );
      }
      //Call the service, the service must return a promise.
      return configuration[listName](args);
  }

    
  //Load many lists by their names. `refHelper.loadMany(['list1', 'list2']).then(success, error)`
  // Return an array of many promises for all the given lists.
  // Be carefull, if there is a problem for one list, the error callback is called.
  function loadMany(names) {
      var promises = [];
      //todo: add a _.isArray tests and throw an rxception.
      if (names !== undefined) {
          names.forEach(function (name) {
              promises.push(loadListByName(name));
          });
      }
    return promises;
  }

  function getAutoCompleteServiceQuery(listName) {
      return function (query) {
          getService(listName)(query.term).then(function (results) {
              query.callback(results);
          });
      }
  }

  var referenceHelper = {
    loadListByName: loadListByName,
    loadList: loadList,
    loadMany: loadMany,
    getAutoCompleteServiceQuery: getAutoCompleteServiceQuery,
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