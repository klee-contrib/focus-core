/*global Promise,  _*/
'use strict';

  /* Filename: helpers/reference_helper.js  */
  //Dependency gestion depending on the fact that we are in the browser or in node.
  var fetch = require('../network/fetch');
  var checkIsString = require('../util/string/check');

  //Container for the list and
  var getConfigurationElement = require('./config').getElement;


  /**
   * Load a list from its description
   * @param {object} listDesc - Description of the list to load
   * @returns {Promise} - A promise of the loading.
   * @example - refHelper.loadList({url: "http://localhost:8080/api/list/1"}).then(console.log,console.error);
   */
  function loadList(listDesc){
      return fetch({ url: listDesc.url, method: 'GET' });
  }

  // Load a reference with its list name.
  // It calls the service which must have been registered.
  /**
   * Load a list by name.
   * @param {string} listName - The name of the list to load.
   * @param {object} args     - Argument to provide to the function.
   */
  function loadListByName(listName, args) {
    checkIsString('listName', listName);
    var configurationElement = getConfigurationElement(listName);
    if (typeof configurationElement !== `function`) {
        throw new Error(`You are trying to load the reference list: ${listName} which does not have a list configure.`);
    }
    //Call the service, the service must return a promise.
      return configurationElement(args);
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
  /**
   * Get a function to trigger in autocomplete case.
   * The function will trigger a promise.
   * @param {string} listName - Name of the list.
   */
  function getAutoCompleteServiceQuery(listName) {
      return function (query) {
          loadListByName(listName, query.term).then(function (results) {
              query.callback(results);
          });
      };
  }

  module.exports = {
    loadListByName: loadListByName,
    loadList: loadList,
    loadMany: loadMany,
    getAutoCompleteServiceQuery: getAutoCompleteServiceQuery
  };
