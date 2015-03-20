"use strict";
/**
 * Dependency on the CORS module.
 * @type {object}
 */
var createCORSRequest = require('./cors');

/**
 * Fecth function to ease http request.
 * @param  {object} obj - method: http verb, url: http url, data:The json to save.
 * @param  {object} options - The options object.
 * @return {Promise} The promise of the execution of the HTTP request.
 */
function fetch(obj, options) {
  options = options || {};
  options.parser = options.parser || function(req){
    return JSON.parse(req.responseText);
  };
  var request = createCORSRequest(obj.method, obj.url, options);
  if (!request) {
    throw new Error('You cannot perform ajax request on other domains.');
  }
  return new Promise(function (success, failure) {
    //Request error handler
    request.onerror = function (error) {
      failure(error);
    };
    //Request success handler
    request.onload = function () {
      var status = request.status;
      if (status !== 200) {
        var err = JSON.parse(request.response);
        err.statusCode = status;
        failure(err);
      }
      var contentType = request.getResponseHeader('content-type');
      var data;
      if (contentType && contentType.indexOf("application/json") !== -1) {
        data = options.parser(request);
      } else {
        data = request.responseText;
      }
      success(data);
    };
    //Execute the request.
    request.send(JSON.stringify(obj.data));
  });

}

module.exports = fetch;
