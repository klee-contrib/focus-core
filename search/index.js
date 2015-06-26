let dispatcher = require('../dispatcher');
module.exports = {
    builtInStore: require('./built-in-store'),
    /**
     * Action builder
     */
    actionBuilder: require('./action-builder'),
    /*
    * Dispatch the change of the query value, with the callerId information.
    */
    changeQuery(queryValue, callerId){
      dispatcher.handleViewAction({data: {query: queryValue}, type: 'update', callerId: callerId});
    },
    /*
    * Dispatch the change of the scope value, with the callerId information.
    */
    changeScope(scopeValue, callerId){
      dispatcher.handleViewAction({data: {scope: scopeValue}, type: 'update', callerId: callerId});
    }
};
