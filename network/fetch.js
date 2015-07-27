/**
* Dependency on the CORS module.
* @type {object}
*/
let createCORSRequest = require('./cors');
let cancellablePromiseBuilder = require('./cancellable-promise-builder');
let uuid = require('uuid').v4;
let dispatcher = require('../dispatcher');
let isObject = require('lodash/lang/isObject');

/**
* Create a pending status.
* @return {object} The instanciated request status.
*/
function createRequestStatus(){
    return {
        id: uuid(),
        status: 'pending'
    };
}
/**
* Update the request status.
* @param  {object} request - The request to treat.
* @return {object} - The request to dispatch.
*/
function updateRequestStatus(request){
    if(!request || !request.id || !request.status){return; }
    dispatcher.handleViewAction({
        data: {request: request},
        type: 'update'
    });
    return request;
}
/**
* Parse the response.
* @param  {object} req - The requets object send back from the xhr.
* @return {object}     - The parsed object.
*/
function jsonParser(req){
    if(null === req.responseText || null === req.responseText || '' === req.responseText){
        console.warn('The response of your request was empty');
        return null;
    }
    let parsedObject;
    try {
        parsedObject = JSON.parse(req.responseText);
    } catch(error) {
        parsedObject = {
            globalErrors: [{
                message: `${req.status} error when calling ${req.responseURL}`
            }]
        }
    }
    if(!isObject(parsedObject)){
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
function fetch(obj, options) {
    options = options || {};
    options.parser = options.parser || jsonParser;
    options.errorParser = options.errorParser || jsonParser;
    let request = createCORSRequest(obj.method, obj.url, options);
    let requestStatus = createRequestStatus();
    let config = require('./config').get();
    if (!request) {
        throw new Error('You cannot perform ajax request on other domains.');
    }

    return cancellablePromiseBuilder(function promiseFn(success, failure) {
        //Request error handler
        request.onerror = function (error) {
            updateRequestStatus({id: requestStatus.id, status: 'error'});
            failure(error);
        };
        //Request success handler
        request.onload = function () {
            let status = request.status;
            if (status < 200 || status >= 300 ) {
                let err = options.errorParser(request);
                err.status = status;
                if(config.xhrErrors[status]){
                    config.xhrErrors[status](request.response);
                }
                updateRequestStatus({id: requestStatus.id, status: 'error'});
                return failure(err);
            }
            if (204 === status) {
                data = undefined;
                return success(data);
            }
            let contentType = request.getResponseHeader('content-type');
            let data;
            if (contentType && contentType.indexOf('application/json') !== -1) {
                data = options.parser(request);
            } else {
                data = request.responseText;
            }
            updateRequestStatus({id: requestStatus.id, status: 'success'});
            return success(data);
        };
        updateRequestStatus({id: requestStatus.id, status: 'pending'});
        //Execute the request.
        request.send(JSON.stringify(obj.data));
    }, function cancelHandler() { // Promise cancel handler
        if (request.status === 0) { // request has not yet ended
            updateRequestStatus({id: requestStatus.id, status: 'cancelled'});
            request.abort();
            return true;
        } else { // trying to abort an ended request, send a warning to the console
            console.warn('Tried to abort an already ended request', request);
            return false;
        }
    });
}

module.exports = fetch;
