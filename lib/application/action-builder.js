'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var dispatcher = require('../dispatcher');

var _require = require('../network/error-parsing');

var manageResponseErrors = _require.manageResponseErrors;

var _require2 = require('lodash/lang');

var isArray = _require2.isArray;

var _require3 = require('lodash/utility');

var identity = _require3.identity;

/**
 * Method call before the service.
 * @param  {Object} config - The action builder config.
 */
function _preServiceCall(_ref2, payload) {
    var node = _ref2.node;
    var type = _ref2.type;
    var preStatus = _ref2.preStatus;
    var callerId = _ref2.callerId;
    var shouldDumpStoreOnActionCall = _ref2.shouldDumpStoreOnActionCall;

    //There is a problem if the node is empty. //Node should be an array
    var data = {};
    var status = {};
    var STATUS = { name: preStatus, isLoading: true };
    // When there is a multi node update it should be an array.
    if (isArray(node)) {
        node.forEach(function (nd) {
            data[nd] = shouldDumpStoreOnActionCall ? null : payload && payload[nd] || null;
            status[nd] = STATUS;
        });
    } else {
        data[node] = shouldDumpStoreOnActionCall ? null : payload || null;
        status[node] = STATUS;
    }
    //Dispatch store cleaning.
    dispatcher.handleViewAction({ data: data, type: type, status: status, callerId: callerId });
}
/**
 * Method call after the service call.
 * @param  {Object} config - Action builder config.
 * @param  {object} json   - The data return from the service call.
 */
function _dispatchServiceResponse(_ref3, json) {
    var node = _ref3.node;
    var type = _ref3.type;
    var status = _ref3.status;
    var callerId = _ref3.callerId;

    var _ref;

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
module.exports = function actionBuilder() {
    var config = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

    config.type = config.type || 'update';
    config.preStatus = config.preStatus || 'loading';
    config.shouldDumpStoreOnActionCall = config.shouldDumpStoreOnActionCall || false;
    if (!config.service) {
        throw new Error('You need to provide a service to call');
    }
    if (!config.status) {
        throw new Error('You need to provide a status to your action');
    }
    if (!config.node) {
        throw new Error('You shoud specify the store node name impacted by the action');
    }
    return function actionBuilderFn(payload) {
        var conf = _extends({ callerId: this._identifier, postService: identity }, config);
        var postService = conf.postService;

        _preServiceCall(conf, payload);
        return conf.service(payload).then(postService).then(function (jsonData) {
            return _dispatchServiceResponse(conf, jsonData);
        }, function (err) {
            return _errorOnCall(conf, err);
        });
    };
};