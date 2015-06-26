let dispatcher = require('../dispatcher');
module.exports = function(identifier){
  return {
    /**
     * Build the search for the identifier scope.
     * @return {function} The search function for the given identifier.
     */
    search(){
      console.warn(' search NOT IMPLEMENTED....');
      return identifier;
    },
    /**
     * Update the query for the identifier scope.
     * @param  {string} value - The query value
     * @return {function} The update query function for the given identifier.
     */
    updateQuery(value){
      return dispatcher.handleViewAction({
        data: {
          query: value
        },
        type: 'update',
        identifier: identifier
      });
    },
    /**
     * Update the scope for the identifier scope.
     * @param  {string} value - The scope value
     * @return {function} The update scope function for the given identifier.
     */
    updateScope(value){
      return dispatcher.handleViewAction({
        data: {
          scope: value
        },
        type: 'update',
        identifier: identifier
      });
    }
  };
};
