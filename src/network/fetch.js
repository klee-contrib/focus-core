/**
* Dependency on the CORS module.
* @type {object}
*/
import createCORSRequest from './cors';
import cancellablePromiseBuilder from './cancellable-promise-builder';
import { v4 as uuid } from 'uuid';
import dispatcher from '../dispatcher';
import isObject from 'lodash/lang/isObject';
import { get as configGetter } from './config';
import requestStore from './built-in-store';
/**
* Update the request status.
* @param  {object} request - The request to treat.
* @return {object} - The request to dispatch.
*/
function updateRequestStatus(id, status) {
    if (!request.id || !request.status) { return; }
    dispatcher.handleViewAction({
        data: {
            request: {
                id,
                status
            }
        },
        type: 'update',
        identifier: requestStore.identifier
    });
    return request;
}
/**
* Parse the response.
* @param  {object} req - The requets object send back from the xhr.
* @return {object}     - The parsed object.
*/
function jsonParser(req) {
    if (null === req.responseText || null === req.responseText || '' === req.responseText) {
        console.warn('The response of your request was empty');
        return null;
    }
    let parsedObject;
    try {
        parsedObject = JSON.parse(req.responseText);
    } catch (error) {
        parsedObject = {
            globalErrors: [{
                message: `${req.status} error when calling ${req.responseURL}`
            }]
        };
    }
    if (!isObject(parsedObject)) {
        //Maybe this check should read the header content-type
        console.warn('The response did not sent a JSON object');
    }
    return parsedObject;
}

/**
* Fetch function to ease http request.
* @param  {object} obj - method: http verb, url: http url, data:The json to save.
* @param  {object} options - The options object.
* @return {CancellablePromise} The promise of the execution of the HTTP request.
*/
function fetch(obj, options = {}) {
    options.parser = options.parser || jsonParser;
    options.errorParser = options.errorParser || jsonParser;
    let config = configGetter();
    let request = createCORSRequest(obj.method, obj.url, { ...config, ...options });
    let requestId = uuid();
    if (!request) {
        throw new Error('You cannot perform ajax request on other domains.');
    }

    return cancellablePromiseBuilder(function promiseFn(success, failure) {
        //Request error handler
        request.onerror = error => {
            updateRequestStatus(requestId, 'error');
            failure(error);
        };
        //Request success handler
        request.onload = () => {
            let status = request.status;
            if (status < 200 || status >= 300) {
                let err = options.errorParser(request);
                err.status = status;
                if (config.xhrErrors[status]) {
                    config.xhrErrors[status](request.response);
                }
                updateRequestStatus(requestId, 'error');
                return failure(err);
            }
            let data;
            if (204 === status) {
                data = undefined;
                updateRequestStatus(requestId, 'success');
                return success(data);
            }
            let contentType = request.contentType ? request.contentType : request.getResponseHeader('content-type');
            if (contentType && contentType.indexOf('application/json') !== -1) {
                data = options.parser(request);
            } else {
                data = request.responseText;
            }
            updateRequestStatus(requestId, 'success');
            return success(data);
        };
        updateRequestStatus(requestId, 'pending');
        //Execute the request.
        request.send(JSON.stringify(obj.data));
    }, function cancelHandler() { // Promise cancel handler
        if (request.status === 0) { // request has not yet ended
            updateRequestStatus(requestId, 'cancelled');
            request.abort();
            return true;
        } else { // trying to abort an ended request, send a warning to the console
            console.warn('Tried to abort an already ended request', request);
            return false;
        }
    });
}

export default fetch;
