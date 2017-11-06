import dispatcher from '../dispatcher';
import { manageResponseErrors } from '../network/error-parsing';
import identity from 'lodash/utility/identity';

/**
 * Method call before the service.
 * @param {object} config The action builder config.
 * @param {obejct} payload Payload to dispatch.
 */
function _preServiceCall({ node, type, preStatus, callerId, shouldDumpStoreOnActionCall }, payload) {
    //There is a problem if the node is empty. //Node should be an array
    let data = {};
    let status = {};
    const STATUS = { name: preStatus, isLoading: true };
    type = shouldDumpStoreOnActionCall ? 'update' : 'updateStatus';
    // When there is a multi node update it should be an array.
    if (Array.isArray(node)) {
        node.forEach((nd) => {
            data[nd] = shouldDumpStoreOnActionCall ? null : (payload && payload[nd]) || null;
            status[nd] = STATUS;
        });
    } else {
        data[node] = shouldDumpStoreOnActionCall ? null : (payload || null);
        status[node] = STATUS;
    }
    //Dispatch store cleaning.
    dispatcher.handleViewAction({ data, type, status, callerId });
}

/**
 * Method call after the service call.
 * @param {object} config Action builder config.
 * @param {object} json  The data return from the service call.
 * @returns {promise} Update information.
 */
function _dispatchServiceResponse({ node, type, status, callerId }, json) {
    const isMultiNode = Array.isArray(node);
    const data = isMultiNode ? json : { [node]: json };
    const postStatus = { name: status, isLoading: false };
    let newStatus = {};
    if (isMultiNode) {
        node.forEach((nd) => { newStatus[nd] = postStatus; });
    } else {
        newStatus[node] = postStatus;
    }
    dispatcher.handleServerAction({
        data,
        type,
        status: newStatus,
        callerId
    });

    // Update information similar to store::afterChange
    return {
        properties: Object.keys(data),
        data,
        status: newStatus,
        informations: { callerId }
    };
}

/**
 * The main objective of this function is to cancel the loading state on all the nodes concerned by the service call.
 * @param {obejct} config Action builder config.
 * @param {object} errorResult Error returned.
 */
function _dispatchFieldErrors({ node, callerId }, errorResult) {
    const isMultiNode = Array.isArray(node);
    const data = {};
    if (isMultiNode) {
        node.forEach((nd) => {
            data[nd] = (errorResult || {})[nd] || null;
        });
    } else {
        data[node] = errorResult;
    }

    const errorStatus = {
        name: 'error',
        isLoading: false
    };
    let newStatus = {};
    if (isMultiNode) {
        node.forEach((nd) => {
            newStatus[nd] = errorStatus;
        });
    } else {
        newStatus[node] = errorStatus;
    }
    dispatcher.handleServerAction({
        data,
        type: 'updateError',
        status: newStatus,
        callerId
    });
}

/**
 * Method call when there is an error.
 * @param {object} config The action builder configuration.
 * @param {object} err The error from the API call.
 */
function _errorOnCall(config, err) {
    const errorResult = manageResponseErrors(err, config);
    _dispatchFieldErrors(config, errorResult.fields);
}

/**
 * Action builder function.
 * @param  {object} config The action builder configuration should contain:
 *                         type(:string) - Is the action an update, a load, a save.
 *                         preStatus(:string) The status to dispatch before the calling.
 *                         service(:function) The service to call for the action. Should return a Promise.
 *                         status(:string)} The status after the action.
 * @returns {function} The build action from the configuration. This action dispatch the preStatus, call the service and dispatch the result from the server.
 */
export default function actionBuilder(config = {}) {
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

    return function actionBuilderFn(payload, context) {
        context = context || this || {};
        const conf = {
            callerId: context._identifier,
            postService: identity, ...config
        };
        const { postService } = conf;
        _preServiceCall(conf, payload);
        return conf.service(payload).then(postService).then((jsonData) => {
            return _dispatchServiceResponse(conf, jsonData);
        }, (err) => {
            _errorOnCall(conf, err);
        });
    };
}

export {
    _errorOnCall as errorOnCall,
    _dispatchServiceResponse as dispatchServiceResponse,
    _preServiceCall as preServiceCall
};
