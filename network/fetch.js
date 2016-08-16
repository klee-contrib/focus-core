'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

/**
* Dependency on the CORS module.
* @type {object}
*/
var createCORSRequest = require('./cors');
var cancellablePromiseBuilder = require('./cancellable-promise-builder');
var uuid = require('uuid').v4;
var dispatcher = require('../dispatcher');
var isObject = require('lodash/lang/isObject');

/**
* Create a pending status.
* @return {object} The instanciated request status.
*/
function createRequestStatus() {
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
function updateRequestStatus(request) {
    if (!request || !request.id || !request.status) {
        return;
    }
    dispatcher.handleViewAction({
        data: { request: request },
        type: 'update'
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
    var parsedObject = void 0;
    try {
        parsedObject = JSON.parse(req.responseText);
    } catch (error) {
        parsedObject = {
            globalErrors: [{
                message: req.status + ' error when calling ' + req.responseURL
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
function fetch(obj) {
    var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

    options.parser = options.parser || jsonParser;
    options.errorParser = options.errorParser || jsonParser;
    var config = require('./config').get();
    var request = createCORSRequest(obj.method, obj.url, _extends({}, config, options));
    var requestStatus = createRequestStatus();
    if (!request) {
        throw new Error('You cannot perform ajax request on other domains.');
    }

    return cancellablePromiseBuilder(function promiseFn(success, failure) {
        //Request error handler
        request.onerror = function (error) {
            updateRequestStatus({ id: requestStatus.id, status: 'error' });
            failure(error);
        };
        //Request success handler
        request.onload = function () {
            var status = request.status;
            if (status < 200 || status >= 300) {
                var err = options.errorParser(request);
                err.status = status;
                if (config.xhrErrors[status]) {
                    config.xhrErrors[status](request.response);
                }
                updateRequestStatus({ id: requestStatus.id, status: 'error' });
                return failure(err);
            }
            if (204 === status) {
                data = undefined;
                updateRequestStatus({ id: requestStatus.id, status: 'success' });
                return success(data);
            }
            var contentType = request.contentType ? request.contentType : request.getResponseHeader('content-type');
            var data = void 0;
            if (contentType && contentType.indexOf('application/json') !== -1) {
                data = options.parser(request);
            } else {
                data = request.responseText;
            }
            updateRequestStatus({ id: requestStatus.id, status: 'success' });
            return success(data);
        };
        updateRequestStatus({ id: requestStatus.id, status: 'pending' });
        //Execute the request.
        request.send(JSON.stringify(obj.data));
    }, function cancelHandler() {
        // Promise cancel handler
        if (request.status === 0) {
            // request has not yet ended
            updateRequestStatus({ id: requestStatus.id, status: 'cancelled' });
            request.abort();
            return true;
        } else {
            // trying to abort an ended request, send a warning to the console
            console.warn('Tried to abort an already ended request', request);
            return false;
        }
    });
}

module.exports = fetch;
//# sourceMappingURL=data:application/json;base64,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S0FBUDtBQUNIO0FBQ0osS0E3Q00sQ0FBUDtBQThDSDs7QUFFRCxPQUFPLE9BQVAsR0FBaUIsS0FBakIiLCJmaWxlIjoicHJvY2Vzc29yLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXHJcbiogRGVwZW5kZW5jeSBvbiB0aGUgQ09SUyBtb2R1bGUuXHJcbiogQHR5cGUge29iamVjdH1cclxuKi9cclxubGV0IGNyZWF0ZUNPUlNSZXF1ZXN0ID0gcmVxdWlyZSgnLi9jb3JzJyk7XHJcbmxldCBjYW5jZWxsYWJsZVByb21pc2VCdWlsZGVyID0gcmVxdWlyZSgnLi9jYW5jZWxsYWJsZS1wcm9taXNlLWJ1aWxkZXInKTtcclxubGV0IHV1aWQgPSByZXF1aXJlKCd1dWlkJykudjQ7XHJcbmxldCBkaXNwYXRjaGVyID0gcmVxdWlyZSgnLi4vZGlzcGF0Y2hlcicpO1xyXG5sZXQgaXNPYmplY3QgPSByZXF1aXJlKCdsb2Rhc2gvbGFuZy9pc09iamVjdCcpO1xyXG5cclxuLyoqXHJcbiogQ3JlYXRlIGEgcGVuZGluZyBzdGF0dXMuXHJcbiogQHJldHVybiB7b2JqZWN0fSBUaGUgaW5zdGFuY2lhdGVkIHJlcXVlc3Qgc3RhdHVzLlxyXG4qL1xyXG5mdW5jdGlvbiBjcmVhdGVSZXF1ZXN0U3RhdHVzKCkge1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICBpZDogdXVpZCgpLFxyXG4gICAgICAgIHN0YXR1czogJ3BlbmRpbmcnXHJcbiAgICB9O1xyXG59XHJcbi8qKlxyXG4qIFVwZGF0ZSB0aGUgcmVxdWVzdCBzdGF0dXMuXHJcbiogQHBhcmFtICB7b2JqZWN0fSByZXF1ZXN0IC0gVGhlIHJlcXVlc3QgdG8gdHJlYXQuXHJcbiogQHJldHVybiB7b2JqZWN0fSAtIFRoZSByZXF1ZXN0IHRvIGRpc3BhdGNoLlxyXG4qL1xyXG5mdW5jdGlvbiB1cGRhdGVSZXF1ZXN0U3RhdHVzKHJlcXVlc3QpIHtcclxuICAgIGlmKCFyZXF1ZXN0IHx8ICFyZXF1ZXN0LmlkIHx8ICFyZXF1ZXN0LnN0YXR1cykge3JldHVybjsgfVxyXG4gICAgZGlzcGF0Y2hlci5oYW5kbGVWaWV3QWN0aW9uKHtcclxuICAgICAgICBkYXRhOiB7cmVxdWVzdDogcmVxdWVzdH0sXHJcbiAgICAgICAgdHlwZTogJ3VwZGF0ZSdcclxuICAgIH0pO1xyXG4gICAgcmV0dXJuIHJlcXVlc3Q7XHJcbn1cclxuLyoqXHJcbiogUGFyc2UgdGhlIHJlc3BvbnNlLlxyXG4qIEBwYXJhbSAge29iamVjdH0gcmVxIC0gVGhlIHJlcXVldHMgb2JqZWN0IHNlbmQgYmFjayBmcm9tIHRoZSB4aHIuXHJcbiogQHJldHVybiB7b2JqZWN0fSAgICAgLSBUaGUgcGFyc2VkIG9iamVjdC5cclxuKi9cclxuZnVuY3Rpb24ganNvblBhcnNlcihyZXEpIHtcclxuICAgIGlmKG51bGwgPT09IHJlcS5yZXNwb25zZVRleHQgfHwgbnVsbCA9PT0gcmVxLnJlc3BvbnNlVGV4dCB8fCAnJyA9PT0gcmVxLnJlc3BvbnNlVGV4dCkge1xyXG4gICAgICAgIGNvbnNvbGUud2FybignVGhlIHJlc3BvbnNlIG9mIHlvdXIgcmVxdWVzdCB3YXMgZW1wdHknKTtcclxuICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgIH1cclxuICAgIGxldCBwYXJzZWRPYmplY3Q7XHJcbiAgICB0cnkge1xyXG4gICAgICAgIHBhcnNlZE9iamVjdCA9IEpTT04ucGFyc2UocmVxLnJlc3BvbnNlVGV4dCk7XHJcbiAgICB9IGNhdGNoKGVycm9yKSB7XHJcbiAgICAgICAgcGFyc2VkT2JqZWN0ID0ge1xyXG4gICAgICAgICAgICBnbG9iYWxFcnJvcnM6IFt7XHJcbiAgICAgICAgICAgICAgICBtZXNzYWdlOiBgJHtyZXEuc3RhdHVzfSBlcnJvciB3aGVuIGNhbGxpbmcgJHtyZXEucmVzcG9uc2VVUkx9YFxyXG4gICAgICAgICAgICB9XVxyXG4gICAgICAgIH07XHJcbiAgICB9XHJcbiAgICBpZighaXNPYmplY3QocGFyc2VkT2JqZWN0KSkge1xyXG4gICAgICAgIC8vTWF5YmUgdGhpcyBjaGVjayBzaG91bGQgcmVhZCB0aGUgaGVhZGVyIGNvbnRlbnQtdHlwZVxyXG4gICAgICAgIGNvbnNvbGUud2FybignVGhlIHJlc3BvbnNlIGRpZCBub3Qgc2VudCBhIEpTT04gb2JqZWN0Jyk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gcGFyc2VkT2JqZWN0O1xyXG59XHJcblxyXG4vKipcclxuKiBGZXRjaCBmdW5jdGlvbiB0byBlYXNlIGh0dHAgcmVxdWVzdC5cclxuKiBAcGFyYW0gIHtvYmplY3R9IG9iaiAtIG1ldGhvZDogaHR0cCB2ZXJiLCB1cmw6IGh0dHAgdXJsLCBkYXRhOlRoZSBqc29uIHRvIHNhdmUuXHJcbiogQHBhcmFtICB7b2JqZWN0fSBvcHRpb25zIC0gVGhlIG9wdGlvbnMgb2JqZWN0LlxyXG4qIEByZXR1cm4ge0NhbmNlbGxhYmxlUHJvbWlzZX0gVGhlIHByb21pc2Ugb2YgdGhlIGV4ZWN1dGlvbiBvZiB0aGUgSFRUUCByZXF1ZXN0LlxyXG4qL1xyXG5mdW5jdGlvbiBmZXRjaChvYmosIG9wdGlvbnMgPSB7fSkge1xyXG4gICAgb3B0aW9ucy5wYXJzZXIgPSBvcHRpb25zLnBhcnNlciB8fCBqc29uUGFyc2VyO1xyXG4gICAgb3B0aW9ucy5lcnJvclBhcnNlciA9IG9wdGlvbnMuZXJyb3JQYXJzZXIgfHwganNvblBhcnNlcjtcclxuICAgIGxldCBjb25maWcgPSByZXF1aXJlKCcuL2NvbmZpZycpLmdldCgpO1xyXG4gICAgbGV0IHJlcXVlc3QgPSBjcmVhdGVDT1JTUmVxdWVzdChvYmoubWV0aG9kLCBvYmoudXJsLCB7Li4uY29uZmlnLCAuLi5vcHRpb25zfSk7XHJcbiAgICBsZXQgcmVxdWVzdFN0YXR1cyA9IGNyZWF0ZVJlcXVlc3RTdGF0dXMoKTtcclxuICAgIGlmICghcmVxdWVzdCkge1xyXG4gICAgICAgIHRocm93IG5ldyBFcnJvcignWW91IGNhbm5vdCBwZXJmb3JtIGFqYXggcmVxdWVzdCBvbiBvdGhlciBkb21haW5zLicpO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBjYW5jZWxsYWJsZVByb21pc2VCdWlsZGVyKGZ1bmN0aW9uIHByb21pc2VGbihzdWNjZXNzLCBmYWlsdXJlKSB7XHJcbiAgICAgICAgLy9SZXF1ZXN0IGVycm9yIGhhbmRsZXJcclxuICAgICAgICByZXF1ZXN0Lm9uZXJyb3IgPSBlcnJvciA9PiB7XHJcbiAgICAgICAgICAgIHVwZGF0ZVJlcXVlc3RTdGF0dXMoe2lkOiByZXF1ZXN0U3RhdHVzLmlkLCBzdGF0dXM6ICdlcnJvcid9KTtcclxuICAgICAgICAgICAgZmFpbHVyZShlcnJvcik7XHJcbiAgICAgICAgfTtcclxuICAgICAgICAvL1JlcXVlc3Qgc3VjY2VzcyBoYW5kbGVyXHJcbiAgICAgICAgcmVxdWVzdC5vbmxvYWQgPSAoKSA9PiB7XHJcbiAgICAgICAgICAgIGxldCBzdGF0dXMgPSByZXF1ZXN0LnN0YXR1cztcclxuICAgICAgICAgICAgaWYgKHN0YXR1cyA8IDIwMCB8fCBzdGF0dXMgPj0gMzAwICkge1xyXG4gICAgICAgICAgICAgICAgbGV0IGVyciA9IG9wdGlvbnMuZXJyb3JQYXJzZXIocmVxdWVzdCk7XHJcbiAgICAgICAgICAgICAgICBlcnIuc3RhdHVzID0gc3RhdHVzO1xyXG4gICAgICAgICAgICAgICAgaWYoY29uZmlnLnhockVycm9yc1tzdGF0dXNdKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uZmlnLnhockVycm9yc1tzdGF0dXNdKHJlcXVlc3QucmVzcG9uc2UpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgdXBkYXRlUmVxdWVzdFN0YXR1cyh7aWQ6IHJlcXVlc3RTdGF0dXMuaWQsIHN0YXR1czogJ2Vycm9yJ30pO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhaWx1cmUoZXJyKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoMjA0ID09PSBzdGF0dXMpIHtcclxuICAgICAgICAgICAgICAgIGRhdGEgPSB1bmRlZmluZWQ7XHJcbiAgICAgICAgICAgICAgICB1cGRhdGVSZXF1ZXN0U3RhdHVzKHtpZDogcmVxdWVzdFN0YXR1cy5pZCwgc3RhdHVzOiAnc3VjY2Vzcyd9KTtcclxuICAgICAgICAgICAgICAgIHJldHVybiBzdWNjZXNzKGRhdGEpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGxldCBjb250ZW50VHlwZSA9IHJlcXVlc3QuY29udGVudFR5cGUgPyByZXF1ZXN0LmNvbnRlbnRUeXBlIDogcmVxdWVzdC5nZXRSZXNwb25zZUhlYWRlcignY29udGVudC10eXBlJyk7XHJcbiAgICAgICAgICAgIGxldCBkYXRhO1xyXG4gICAgICAgICAgICBpZiAoY29udGVudFR5cGUgJiYgY29udGVudFR5cGUuaW5kZXhPZignYXBwbGljYXRpb24vanNvbicpICE9PSAtMSkge1xyXG4gICAgICAgICAgICAgICAgZGF0YSA9IG9wdGlvbnMucGFyc2VyKHJlcXVlc3QpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgZGF0YSA9IHJlcXVlc3QucmVzcG9uc2VUZXh0O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHVwZGF0ZVJlcXVlc3RTdGF0dXMoe2lkOiByZXF1ZXN0U3RhdHVzLmlkLCBzdGF0dXM6ICdzdWNjZXNzJ30pO1xyXG4gICAgICAgICAgICByZXR1cm4gc3VjY2VzcyhkYXRhKTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIHVwZGF0ZVJlcXVlc3RTdGF0dXMoe2lkOiByZXF1ZXN0U3RhdHVzLmlkLCBzdGF0dXM6ICdwZW5kaW5nJ30pO1xyXG4gICAgICAgIC8vRXhlY3V0ZSB0aGUgcmVxdWVzdC5cclxuICAgICAgICByZXF1ZXN0LnNlbmQoSlNPTi5zdHJpbmdpZnkob2JqLmRhdGEpKTtcclxuICAgIH0sIGZ1bmN0aW9uIGNhbmNlbEhhbmRsZXIoKSB7IC8vIFByb21pc2UgY2FuY2VsIGhhbmRsZXJcclxuICAgICAgICBpZiAocmVxdWVzdC5zdGF0dXMgPT09IDApIHsgLy8gcmVxdWVzdCBoYXMgbm90IHlldCBlbmRlZFxyXG4gICAgICAgICAgICB1cGRhdGVSZXF1ZXN0U3RhdHVzKHtpZDogcmVxdWVzdFN0YXR1cy5pZCwgc3RhdHVzOiAnY2FuY2VsbGVkJ30pO1xyXG4gICAgICAgICAgICByZXF1ZXN0LmFib3J0KCk7XHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH0gZWxzZSB7IC8vIHRyeWluZyB0byBhYm9ydCBhbiBlbmRlZCByZXF1ZXN0LCBzZW5kIGEgd2FybmluZyB0byB0aGUgY29uc29sZVxyXG4gICAgICAgICAgICBjb25zb2xlLndhcm4oJ1RyaWVkIHRvIGFib3J0IGFuIGFscmVhZHkgZW5kZWQgcmVxdWVzdCcsIHJlcXVlc3QpO1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcbn1cclxuXHJcbm1vZHVsZS5leHBvcnRzID0gZmV0Y2g7XHJcbiJdfQ==