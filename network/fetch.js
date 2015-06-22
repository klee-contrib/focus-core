"use strict";
/**
 * Dependency on the CORS module.
 * @type {object}
 */
var createCORSRequest = require('./cors');
var cancellablePromiseBuilder = require('./cancellable-promise-builder');
var uuid = require('uuid').v4;
var dispatcher = require('../dispatcher');


/**
 * Create a pending status.
 * @return {object} The instanciated request status.
 */
function createRequestStatus(){
  return {
    id : uuid(),
    status: 'pending'
  };
}
/**
 * Update the request status.
 * @param  {object} request - The request to treat.
 * @return {[object} - The request to dispatch.
 */
function updateRequestStatus(request){
  if(!request || !request.id || !request.status){return;}
  dispatcher.handleViewAction({
    data: {request: request},
    type: 'update'
  });
  return request;

}

function jsonParser(req){
  return JSON.parse(req.responseText);
};

/**
 * Fetch function to ease http request.
 * @param  {object} obj - method: http verb, url: http url, data:The json to save.
 * @param  {object} options - The options object.
 * @return {CancellablePromise} The promise of the execution of the HTTP request.
 */
function fetch(obj, options) {
  options = options || {};
  options.parser = options.parser || jsonParser;
  options.errorParser = options.errorParser ||  jsonParser;
  var request = createCORSRequest(obj.method, obj.url, options);
  var requestStatus = createRequestStatus();
  var config = require('./config').get();
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
      var status = request.status;
      var err = JSON.parse(request.response);
      if (status < 200 || status >= 300 ) {
        var err = JSON.parse(request.response);
        err.statusCode = status;
        if(config.xhrErrors[status]){
          config.xhrErrors[status](request.response);
        }
        updateRequestStatus({id: requestStatus.id, status: 'error'});
        failure(err);
      }
      var contentType = request.getResponseHeader('content-type');
      var data;
      if (contentType && contentType.indexOf("application/json") !== -1) {
        data = options.parser(request);
      } else {
        data = request.responseText;
      }
      updateRequestStatus({id: requestStatus.id, status: 'success'});
      success(data);
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
