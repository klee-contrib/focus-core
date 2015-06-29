let dispatcher = require('../dispatcher');
let searchAction = require('./search-action');
module.exports = function(config){
  config = config || {};
  if(!config.identifier){
    console.warn('Your action should have an identifier');
  }
  if(!config.service){
    console.warn('Your action should have a service');
  }
  return {
    /**
     * Build the search for the identifier scope.
     * @return {function} The search function for the given identifier.
     */
    search: searchAction(config),
    /**
     * Update the query for the identifier scope.
     * @param  {string} value - The query value
     * @return {function} The update query function for the given identifier.
     */
    updateProperties(value){
      return dispatcher.handleViewAction({
        data: value,
        type: 'update',
        identifier: config.identifier
      });
    }
  };
};
