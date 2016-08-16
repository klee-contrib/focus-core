'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

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

function _preServiceCall(_ref, payload) {
    var node = _ref.node;
    var type = _ref.type;
    var preStatus = _ref.preStatus;
    var callerId = _ref.callerId;
    var shouldDumpStoreOnActionCall = _ref.shouldDumpStoreOnActionCall;

    //There is a problem if the node is empty. //Node should be an array
    var data = {};
    var status = {};
    var STATUS = { name: preStatus, isLoading: true };
    type = shouldDumpStoreOnActionCall ? 'update' : 'updateStatus';
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
function _dispatchServiceResponse(_ref2, json) {
    var node = _ref2.node;
    var type = _ref2.type;
    var status = _ref2.status;
    var callerId = _ref2.callerId;

    var isMultiNode = isArray(node);
    var data = isMultiNode ? json : _defineProperty({}, node, json);
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
 * The main objective of this function is to cancel the loading state on all the nodes concerned by the service call.
 */
function _dispatchFieldErrors(_ref4, errorResult) {
    var node = _ref4.node;
    var callerId = _ref4.callerId;

    var isMultiNode = isArray(node);
    var data = isMultiNode ? errorResult : _defineProperty({}, node, errorResult);
    var errorStatus = {
        name: 'error',
        isLoading: false
    };
    var newStatus = {};
    if (isMultiNode) {
        node.forEach(function (nd) {
            newStatus[nd] = errorStatus;
        });
    } else {
        newStatus[node] = errorStatus;
    }
    dispatcher.handleServerAction({
        data: data,
        type: 'updateError',
        status: newStatus,
        callerId: callerId
    });
}

function _dispatchGlobalErrors(conf, errors) {}
//console.warn('NOT IMPLEMENTED', conf, errors);


/**
 * Method call when there is an error.
 * @param  {object} config -  The action builder configuration.
 * @param  {object} err    - The error from the API call.
 * @return {object}     - The data from the manageResponseErrors function.
 */
function _errorOnCall(config, err) {
    var errorResult = manageResponseErrors(err, config);
    _dispatchGlobalErrors(config, errorResult.globals);
    _dispatchFieldErrors(config, errorResult.fields);
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
    return function actionBuilderFn(payload, context) {
        context = context || this;
        var conf = _extends({
            callerId: context._identifier,
            postService: identity }, config);
        var postService = conf.postService;

        _preServiceCall(conf, payload);
        return conf.service(payload).then(postService).then(function (jsonData) {
            return _dispatchServiceResponse(conf, jsonData);
        }, function (err) {
            _errorOnCall(conf, err);
        });
    };
};
//# sourceMappingURL=data:application/json;base64,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QjtBQUVGLHlCQUFhLFFBRlgsSUFFd0IsTUFGeEIsQ0FBTjtBQUY4QyxZQU12QyxXQU51QyxHQU14QixJQU53QixDQU12QyxXQU51Qzs7QUFPOUMsd0JBQWdCLElBQWhCLEVBQXNCLE9BQXRCO0FBQ0EsZUFBTyxLQUFLLE9BQUwsQ0FBYSxPQUFiLEVBQXNCLElBQXRCLENBQTJCLFdBQTNCLEVBQXdDLElBQXhDLENBQTZDLFVBQUMsUUFBRCxFQUFZO0FBQzVELG1CQUFPLHlCQUF5QixJQUF6QixFQUErQixRQUEvQixDQUFQO0FBQ0gsU0FGTSxFQUVKLFVBQUMsR0FBRCxFQUFTO0FBQ1IseUJBQWEsSUFBYixFQUFtQixHQUFuQjtBQUNILFNBSk0sQ0FBUDtBQUtILEtBYkQ7QUFjSCxDQTNCRCIsImZpbGUiOiJwcm9jZXNzb3IuanMiLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCBkaXNwYXRjaGVyID0gcmVxdWlyZSgnLi4vZGlzcGF0Y2hlcicpO1xyXG5jb25zdCB7bWFuYWdlUmVzcG9uc2VFcnJvcnN9ID0gcmVxdWlyZSgnLi4vbmV0d29yay9lcnJvci1wYXJzaW5nJyk7XHJcbmNvbnN0IHtpc0FycmF5fSA9IHJlcXVpcmUoJ2xvZGFzaC9sYW5nJyk7XHJcbmNvbnN0IHtpZGVudGl0eX0gPSByZXF1aXJlKCdsb2Rhc2gvdXRpbGl0eScpO1xyXG5cclxuLyoqXHJcbiAqIE1ldGhvZCBjYWxsIGJlZm9yZSB0aGUgc2VydmljZS5cclxuICogQHBhcmFtICB7T2JqZWN0fSBjb25maWcgLSBUaGUgYWN0aW9uIGJ1aWxkZXIgY29uZmlnLlxyXG4gKi9cclxuZnVuY3Rpb24gX3ByZVNlcnZpY2VDYWxsKHtub2RlLCB0eXBlLCBwcmVTdGF0dXMsIGNhbGxlcklkLCBzaG91bGREdW1wU3RvcmVPbkFjdGlvbkNhbGx9LCBwYXlsb2FkKXtcclxuICAgIC8vVGhlcmUgaXMgYSBwcm9ibGVtIGlmIHRoZSBub2RlIGlzIGVtcHR5LiAvL05vZGUgc2hvdWxkIGJlIGFuIGFycmF5XHJcbiAgICBsZXQgZGF0YSA9IHt9O1xyXG4gICAgbGV0IHN0YXR1cyA9IHt9O1xyXG4gICAgY29uc3QgU1RBVFVTID0ge25hbWU6IHByZVN0YXR1cywgaXNMb2FkaW5nOiB0cnVlfTtcclxuICAgIHR5cGUgPSBzaG91bGREdW1wU3RvcmVPbkFjdGlvbkNhbGwgPyAndXBkYXRlJyA6ICd1cGRhdGVTdGF0dXMnO1xyXG4gICAgLy8gV2hlbiB0aGVyZSBpcyBhIG11bHRpIG5vZGUgdXBkYXRlIGl0IHNob3VsZCBiZSBhbiBhcnJheS5cclxuICAgIGlmKGlzQXJyYXkobm9kZSkpe1xyXG4gICAgICAgIG5vZGUuZm9yRWFjaCgobmQpPT57XHJcbiAgICAgICAgICAgIGRhdGFbbmRdID0gc2hvdWxkRHVtcFN0b3JlT25BY3Rpb25DYWxsID8gbnVsbCA6IChwYXlsb2FkICYmIHBheWxvYWRbbmRdKSB8fCBudWxsO1xyXG4gICAgICAgICAgICBzdGF0dXNbbmRdID0gU1RBVFVTO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfWVsc2V7XHJcbiAgICAgICAgZGF0YVtub2RlXSA9IHNob3VsZER1bXBTdG9yZU9uQWN0aW9uQ2FsbCA/IG51bGwgOiAocGF5bG9hZCB8fCBudWxsKTtcclxuICAgICAgICBzdGF0dXNbbm9kZV0gPSBTVEFUVVM7XHJcbiAgICB9XHJcbiAgICAvL0Rpc3BhdGNoIHN0b3JlIGNsZWFuaW5nLlxyXG4gICAgZGlzcGF0Y2hlci5oYW5kbGVWaWV3QWN0aW9uKHtkYXRhLCB0eXBlLCBzdGF0dXMsIGNhbGxlcklkfSk7XHJcbn1cclxuLyoqXHJcbiAqIE1ldGhvZCBjYWxsIGFmdGVyIHRoZSBzZXJ2aWNlIGNhbGwuXHJcbiAqIEBwYXJhbSAge09iamVjdH0gY29uZmlnIC0gQWN0aW9uIGJ1aWxkZXIgY29uZmlnLlxyXG4gKiBAcGFyYW0gIHtvYmplY3R9IGpzb24gICAtIFRoZSBkYXRhIHJldHVybiBmcm9tIHRoZSBzZXJ2aWNlIGNhbGwuXHJcbiAqL1xyXG5mdW5jdGlvbiBfZGlzcGF0Y2hTZXJ2aWNlUmVzcG9uc2Uoe25vZGUsIHR5cGUsIHN0YXR1cywgY2FsbGVySWR9LCBqc29uKXtcclxuICAgIGNvbnN0IGlzTXVsdGlOb2RlID0gaXNBcnJheShub2RlKTtcclxuICAgIGNvbnN0IGRhdGEgPSBpc011bHRpTm9kZSA/IGpzb24gOiB7W25vZGVdOiBqc29ufTtcclxuICAgIGNvbnN0IHBvc3RTdGF0dXMgPSB7bmFtZTogc3RhdHVzLCBpc0xvYWRpbmc6IGZhbHNlfTtcclxuICAgIGxldCBuZXdTdGF0dXMgPSB7fTtcclxuICAgIGlmKGlzTXVsdGlOb2RlKXtcclxuICAgICAgICBub2RlLmZvckVhY2goKG5kKT0+e25ld1N0YXR1c1tuZF0gPSBwb3N0U3RhdHVzOyB9KTtcclxuICAgIH1lbHNlIHtcclxuICAgICAgICBuZXdTdGF0dXNbbm9kZV0gPSBwb3N0U3RhdHVzO1xyXG4gICAgfVxyXG4gICAgZGlzcGF0Y2hlci5oYW5kbGVTZXJ2ZXJBY3Rpb24oe1xyXG4gICAgICAgIGRhdGEsXHJcbiAgICAgICAgdHlwZSxcclxuICAgICAgICBzdGF0dXM6IG5ld1N0YXR1cyxcclxuICAgICAgICBjYWxsZXJJZFxyXG4gICAgfSk7XHJcbn1cclxuLyoqXHJcbiAqIFRoZSBtYWluIG9iamVjdGl2ZSBvZiB0aGlzIGZ1bmN0aW9uIGlzIHRvIGNhbmNlbCB0aGUgbG9hZGluZyBzdGF0ZSBvbiBhbGwgdGhlIG5vZGVzIGNvbmNlcm5lZCBieSB0aGUgc2VydmljZSBjYWxsLlxyXG4gKi9cclxuZnVuY3Rpb24gX2Rpc3BhdGNoRmllbGRFcnJvcnMoe25vZGUsIGNhbGxlcklkfSwgZXJyb3JSZXN1bHQpe1xyXG4gICAgY29uc3QgaXNNdWx0aU5vZGUgPSBpc0FycmF5KG5vZGUpO1xyXG4gICAgY29uc3QgZGF0YSA9IGlzTXVsdGlOb2RlID8gZXJyb3JSZXN1bHQgOiB7W25vZGVdOiBlcnJvclJlc3VsdH07XHJcbiAgICBjb25zdCBlcnJvclN0YXR1cyA9IHtcclxuICAgICAgICBuYW1lOiAnZXJyb3InLFxyXG4gICAgICAgIGlzTG9hZGluZzogZmFsc2VcclxuICAgIH07XHJcbiAgICBsZXQgbmV3U3RhdHVzID0ge307XHJcbiAgICBpZihpc011bHRpTm9kZSl7XHJcbiAgICAgICAgbm9kZS5mb3JFYWNoKChuZCk9PntuZXdTdGF0dXNbbmRdID0gZXJyb3JTdGF0dXM7IH0pO1xyXG4gICAgfWVsc2Uge1xyXG4gICAgICAgIG5ld1N0YXR1c1tub2RlXSA9IGVycm9yU3RhdHVzO1xyXG4gICAgfVxyXG4gICAgZGlzcGF0Y2hlci5oYW5kbGVTZXJ2ZXJBY3Rpb24oe1xyXG4gICAgICAgIGRhdGEsXHJcbiAgICAgICAgdHlwZTogJ3VwZGF0ZUVycm9yJyxcclxuICAgICAgICBzdGF0dXM6IG5ld1N0YXR1cyxcclxuICAgICAgICBjYWxsZXJJZFxyXG4gICAgfSk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIF9kaXNwYXRjaEdsb2JhbEVycm9ycyhjb25mICwgZXJyb3JzKXtcclxuICAgIC8vY29uc29sZS53YXJuKCdOT1QgSU1QTEVNRU5URUQnLCBjb25mLCBlcnJvcnMpO1xyXG59XHJcblxyXG4vKipcclxuICogTWV0aG9kIGNhbGwgd2hlbiB0aGVyZSBpcyBhbiBlcnJvci5cclxuICogQHBhcmFtICB7b2JqZWN0fSBjb25maWcgLSAgVGhlIGFjdGlvbiBidWlsZGVyIGNvbmZpZ3VyYXRpb24uXHJcbiAqIEBwYXJhbSAge29iamVjdH0gZXJyICAgIC0gVGhlIGVycm9yIGZyb20gdGhlIEFQSSBjYWxsLlxyXG4gKiBAcmV0dXJuIHtvYmplY3R9ICAgICAtIFRoZSBkYXRhIGZyb20gdGhlIG1hbmFnZVJlc3BvbnNlRXJyb3JzIGZ1bmN0aW9uLlxyXG4gKi9cclxuZnVuY3Rpb24gX2Vycm9yT25DYWxsKGNvbmZpZywgZXJyKXtcclxuICAgIGNvbnN0IGVycm9yUmVzdWx0ID0gbWFuYWdlUmVzcG9uc2VFcnJvcnMoZXJyLCBjb25maWcpO1xyXG4gICAgX2Rpc3BhdGNoR2xvYmFsRXJyb3JzKGNvbmZpZywgZXJyb3JSZXN1bHQuZ2xvYmFscyk7XHJcbiAgICBfZGlzcGF0Y2hGaWVsZEVycm9ycyhjb25maWcsIGVycm9yUmVzdWx0LmZpZWxkcyk7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBBY3Rpb24gYnVpbGRlciBmdW5jdGlvbi5cclxuICogQHBhcmFtICB7b2JqZWN0fSBjb25maWcgLSBUaGUgYWN0aW9uIGJ1aWxkZXIgY29uZmlndXJhdGlvbiBzaG91bGQgY29udGFpbjpcclxuICogICAgICAgICAgICAgICAgICAgICAgICAgLSB0eXBlKDpzdHJpbmcpIC0gSXMgdGhlIGFjdGlvbiBhbiB1cGRhdGUsIGEgbG9hZCwgYSBzYXZlLlxyXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAtIHByZVN0YXR1cyg6c3RyaW5nKSBUaGUgc3RhdHVzIHRvIGRpc3BhdGNoIGJlZm9yZSB0aGUgY2FsbGluZy5cclxuICogICAgICAgICAgICAgICAgICAgICAgICAgLSBzZXJ2aWNlKDpmdW5jdGlvbikgVGhlIHNlcnZpY2UgdG8gY2FsbCBmb3IgdGhlIGFjdGlvbi4gU2hvdWxkIHJldHVybiBhIFByb21pc2UuXHJcbiAqICAgICAgICAgICAgICAgICAgICAgICAgIC0gc3RhdHVzKDpzdHJpbmcpfSBUaGUgc3RhdHVzIGFmdGVyIHRoZSBhY3Rpb24uXHJcbiAqIEByZXR1cm4ge2Z1bmN0aW9ufSAtIFRoZSBidWlsZCBhY3Rpb24gZnJvbSB0aGUgY29uZmlndXJhdGlvbi4gVGhpcyBhY3Rpb24gZGlzcGF0Y2ggdGhlIHByZVN0YXR1cywgY2FsbCB0aGUgc2VydmljZSBhbmQgZGlzcGF0Y2ggdGhlIHJlc3VsdCBmcm9tIHRoZSBzZXJ2ZXIuXHJcbiAqL1xyXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGFjdGlvbkJ1aWxkZXIoY29uZmlnID0ge30pe1xyXG4gICAgY29uZmlnLnR5cGUgPSBjb25maWcudHlwZSB8fCAndXBkYXRlJztcclxuICAgIGNvbmZpZy5wcmVTdGF0dXMgPSBjb25maWcucHJlU3RhdHVzIHx8ICdsb2FkaW5nJztcclxuICAgIGNvbmZpZy5zaG91bGREdW1wU3RvcmVPbkFjdGlvbkNhbGwgPSBjb25maWcuc2hvdWxkRHVtcFN0b3JlT25BY3Rpb25DYWxsIHx8IGZhbHNlO1xyXG4gICAgaWYoIWNvbmZpZy5zZXJ2aWNlKXtcclxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1lvdSBuZWVkIHRvIHByb3ZpZGUgYSBzZXJ2aWNlIHRvIGNhbGwnKTtcclxuICAgIH1cclxuICAgIGlmKCFjb25maWcuc3RhdHVzKXtcclxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1lvdSBuZWVkIHRvIHByb3ZpZGUgYSBzdGF0dXMgdG8geW91ciBhY3Rpb24nKTtcclxuICAgIH1cclxuICAgIGlmKCFjb25maWcubm9kZSl7XHJcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdZb3Ugc2hvdWQgc3BlY2lmeSB0aGUgc3RvcmUgbm9kZSBuYW1lIGltcGFjdGVkIGJ5IHRoZSBhY3Rpb24nKTtcclxuICAgIH1cclxuICAgIHJldHVybiBmdW5jdGlvbiBhY3Rpb25CdWlsZGVyRm4ocGF5bG9hZCwgY29udGV4dCkge1xyXG4gICAgICAgIGNvbnRleHQgPSBjb250ZXh0IHx8IHRoaXM7XHJcbiAgICAgICAgY29uc3QgY29uZiA9IHtcclxuICAgICAgICAgICAgY2FsbGVySWQ6IGNvbnRleHQuX2lkZW50aWZpZXIsXHJcbiAgICAgICAgICAgIHBvc3RTZXJ2aWNlOiBpZGVudGl0eSwgLi4uY29uZmlnXHJcbiAgICAgICAgfTtcclxuICAgICAgICBjb25zdCB7cG9zdFNlcnZpY2V9ID0gY29uZjtcclxuICAgICAgICBfcHJlU2VydmljZUNhbGwoY29uZiwgcGF5bG9hZCk7XHJcbiAgICAgICAgcmV0dXJuIGNvbmYuc2VydmljZShwYXlsb2FkKS50aGVuKHBvc3RTZXJ2aWNlKS50aGVuKChqc29uRGF0YSk9PntcclxuICAgICAgICAgICAgcmV0dXJuIF9kaXNwYXRjaFNlcnZpY2VSZXNwb25zZShjb25mLCBqc29uRGF0YSk7XHJcbiAgICAgICAgfSwgKGVycikgPT4ge1xyXG4gICAgICAgICAgICBfZXJyb3JPbkNhbGwoY29uZiwgZXJyKTtcclxuICAgICAgICB9KTtcclxuICAgIH07XHJcbn07XHJcbiJdfQ==