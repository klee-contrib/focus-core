'use strict';

var dispatcher = require('../dispatcher');

var _require = require('../network/error-parsing');

var manageResponseErrors = _require.manageResponseErrors;

var _require2 = require('lodash/lang');

var clone = _require2.clone;
var isArray = _require2.isArray;

/**
 * Method call before the service.
 * @param  {Object} config - The action builder config.
 */
function _preServiceCall() {
    var config = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

    //There is a problem if the node is empty. //Node should be an array
    var node = config.node;
    var type = config.type;
    var preStatus = config.preStatus;
    var callerId = config.callerId;

    var data = {};
    var status = {};
    // When there is a multi node update it should be an array.
    if (isArray(node)) {
        node.forEach(function (nd) {
            data[nd] = null;
            status[nd] = { name: preStatus, isLoading: true };
        });
    } else {
        data[node] = null;
        status[node] = { name: preStatus, isLoading: true };
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
function _postServiceCall(config, json) {
    if (config === undefined) config = {};

    var _ref;

    var node = config.node;
    var type = config.type;
    var status = config.status;
    var callerId = config.callerId;

    var isMultiNode = isArray(node);
    var data = isMultiNode ? json : (_ref = {}, _ref[node] = json, _ref);
    var postStatus = { name: status, isLoading: false };
    var newStatus = {};
    if (isMultiNode) {
        node.forEach(function (nd) {
            newStatus[nd] = postStatus;
        });
    } else {
        newStatus[node] = postStatus;
    }
    dispatcher.handleServerAction({
        data: data,
        type: type,
        status: newStatus,
        callerId: callerId
    });
}

/**
 * Method call when there is an error.
 * @param  {object} config -  The action builder configuration.
 * @param  {object} err    - The error from the API call.
 * @return {object}     - The data from the manageResponseErrors function.
 */
function _errorOnCall(config, err) {
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
module.exports = function actionBuilder(config) {
    config = config || {};
    config.type = config.type || 'update';
    config.preStatus = config.preStatus || 'loading';
    if (!config.service) {
        throw new Error('You need to provide a service to call');
    }
    if (!config.status) {
        throw new Error('You need to provide a status to your action');
    }
    if (!config.node) {
        throw new Error('You shoud specify the store node name impacted by the action');
    }
    /*if(!config.data){
      throw new Error('You need to provide an action data');
    }*/
    //Exposes a function consumes by the compoennt.
    return function actionBuilderFn(criteria) {
        var conf = clone(config);
        //It the callerId is not defined in the config, it is overriden with the form identifier.
        conf.callerId = conf.callerId || this._identifier;
        _preServiceCall(conf);
        return conf.service(criteria).then(function (jsonData) {
            return _postServiceCall(conf, jsonData);
        }, function (err) {
            return _errorOnCall(conf, err);
        });
    };
};