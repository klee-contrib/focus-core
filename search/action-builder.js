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
     * @return {function} The update query function for the given identifier.
     */
    updateQuery(){
      console.warn('update query NOT IMPLEMENTED....');
      return identifier;
    },
    /**
     * Update the scope for the identifier scope.
     * @return {function} The update scope function for the given identifier.
     */
    updateScope(){
      console.warn('update scope NOT IMPLEMENTED....');
      return identifier;
    }
  };
};
