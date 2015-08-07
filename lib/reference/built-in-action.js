'use strict';

var loadManyReferenceList = require('./builder').loadMany;
var dispatcher = require('../dispatcher');

/**
 * Focus reference action.
 * @param {array} referenceNames - An array which contains the name of all the references to load.
 * @returns {Promise} - The promise of loading all the references.
 */
function builtInReferenceAction(referenceNames) {
  return function () {
    if (!referenceNames) {
      return undefined;
    }
    return Promise.all(loadManyReferenceList(referenceNames)).then(function successReferenceLoading(data) {
      //Rebuilt a constructed information from the map.
      var reconstructedData = {};
      referenceNames.map(function (name, index) {
        reconstructedData[name] = data[index];
      });
      //
      dispatcher.handleViewAction({ data: reconstructedData, type: 'update', subject: 'reference' });
    }, function errorReferenceLoading(err) {
      dispatcher.handleViewAction({ data: err, type: 'error' });
    });
  };
}

module.exports = builtInReferenceAction;