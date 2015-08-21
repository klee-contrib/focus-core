const dispatcher = require('../dispatcher');
const {manageResponseErrors} = require('../network/error-parsing');
const {clone, isArray} = require('lodash/lang');

/**
 * Method call before the service.
 * @param  {Object} config - The action builder config.
 */
function _preServiceCall(config = {}){
    //There is a problem if the node is empty. //Node should be an array
    const {node, type, preStatus, callerId} = config;
    let data = {};
    let status;
    // When there is a multi node update it should be an array.
    if(isArray(node)){
        node.forEach((nd)=>{
            data[nd] = null;
            status[nd] = {name: preStatus, isLoading: true};
        });
    }else{
        data[node] = null;
        status[node] = {name: preStatus, isLoading: true};
    }
    //Dispatch store cleaning.
    dispatcher.handleViewAction({
        data: data,
        type: type,
        status: status,
        callerId: callerId
    });
}
/**
 * Method call after the service call.
 * @param  {Object} config - Action builder config.
 * @param  {object} json   - The data return from the service call.
 */
function _postServiceCall(config = {}, json){
    const {node, type, status, callerId} = config;
    const isMultiNode = isArray(node);
    const data = isMultiNode ? json : {[node]: json};
    const postStatus = {name: status, isLoading: false};
    let newStatus;
    if(isMultiNode){
        node.forEach((nd)=>{newStatus[nd] = postStatus; });
    }else {
        newStatus[node] = postStatus;
    }
    dispatcher.handleServerAction({
        data: data,
        type: type,
        status: status,
        callerId: callerId
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
    if(!config.node){
        throw new Error('You shoud specify the store node name impacted by the action');
    }
  /*if(!config.data){
    throw new Error('You need to provide an action data');
  }*/
  //Exposes a function consumes by the compoennt.
    return function actionBuilderFn(criteria) {
        let conf = clone(config);
        //It the callerId is not defined in the config, it is overriden with the form identifier.
        conf.callerId = conf.callerId || this._identifier;
        _preServiceCall(conf);
        return conf.service(criteria).then((jsonData)=>{
            return _postServiceCall(conf, jsonData);
        }, (err)=>{
            return _errorOnCall(conf, err);
        });
    };
};
