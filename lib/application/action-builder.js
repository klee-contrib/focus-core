'use strict';

var dispatcher = require('../dispatcher');
var message = require('../message');

var _require = require('../network/error-parsing');

var manageResponseErrors = _require.manageResponseErrors;

/**
 * Method call before the service.
 * @param  {Object} config - The action builder config.
 */
function _preServiceCall() {
    var _data, _status;

    var config = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
    var node = config.node;
    var type = config.type;
    var preStatus = config.preStatus;
    var callerId = config.callerId;

    dispatcher.handleViewAction({
        data: (_data = {}, _data[node] = undefined, _data),
        type: type,
        status: (_status = {}, _status[node] = { name: preStatus }, _status.isLoading = true, _status),
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

    var _data2, _status2;

    var node = config.node;
    var type = config.type;
    var status = config.status;
    var callerId = config.callerId;

    dispatcher.handleServerAction({
        data: (_data2 = {}, _data2[node] = json, _data2),
        type: type,
        status: (_status2 = {}, _status2[node] = { name: status }, _status2.isLoading = false, _status2),
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
        //It the callerId is not defined in the config, it is overriden with the form identifier.
        config.callerId = config.callerId || this._identifier;
        _preServiceCall(config);
        return config.service(criteria).then(function (jsonData) {
            return _postServiceCall(config, jsonData);
        }, function (err) {
            return _errorOnCall(config, err);
        });
    };
};