let dispatcher = require('../dispatcher');
let message = require('../message');
let {manageResponseErrors} = require('../network/error-parsing');

/**
 * Method call before the service.
 * @param  {Object} config - The action builder config.
 */
function _preServiceCall(config = {}){
    dispatcher.handleViewAction({
        data: {[config.node]: undefined},
        type: config.type,
        status: {[config.node]: {name: config.preStatus}, isLoading: true},
        caller: config.caller
    });
}
/**
 * Method call after the service call.
 * @param  {Object} config - Action builder config.
 * @param  {object} json   - The data return from the service call.
 */
function _postServiceCall(config = {}, json){
    dispatcher.handleServerAction({
        data: {[config.node]: json},
        type: config.type,
        status: {[config.node]: {name: config.status}, isLoading: false},
        caller: config.caller
    });
}

/**
 * Method call when there is an error.
 * @param  {object} config -  The action builder configuration.
 * @param  {object} err    - The error from the API call.
 * @return {object}     - The data from the manageResponseErrors function.
 */
function _errorOnCall(config, err){
    console.warn('Error in action', err);
    return manageResponseErrors(err, config);
}

/**
 * Action builder function.
 * @param  {object} config - The action builder configuration should contain:
 *                         - type(:string) - Is the action an update, a load, a save.
 *                         - preStatus(:string) The status to dispatch before the calling.
 *                         - service(:function) The service to call for the action. Should return a Promise.
 *                         - status(:string)} The status after the action.
 * @return {function} - The build action from the configuration. This action dispatch the preStatus, call the service and dispatch the result from the server.
 */
module.exports = function actionBuilder(config){
    config = config || {};
    config.type = config.type || 'update';
    config.preStatus = config.preStatus || 'loading';
    if(!config.service){
        throw new Error('You need to provide a service to call');
    }
    if(!config.status){
        throw new Error('You need to provide a status to your action');
    }
  /*if(!config.data){
    throw new Error('You need to provide an action data');
  }*/
  //Exposes a function consumes by the compoennt.
    return function actionBuilderFn(criteria){
        _preServiceCall(config);
        return config.service(criteria).then(
            jsonData => _postServiceCall(config, jsonData),
            err=> _errorOnCall(config, err)
        );
    };
};
