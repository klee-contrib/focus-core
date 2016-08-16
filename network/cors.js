'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; /*global XMLHttpRequest, XDomainRequest*/
/**
* Error.
* @type {Error}
*/

var _collection = require('lodash/collection');

var ArgumentInvalidException = Error;

/**
* Create a cors http request.
* @param {string} method - Type of method yopu want to reach.
* @param {string} url - Url to reach.
* @param {object} options - The cors options.
* @returns {XMLHttpRequest} - The CORS http request.
*/
module.exports = function createCORSRequest(method, url) {
    var options = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];

    var isCORS = options.isCORS || false;
    if (typeof method !== 'string') {
        throw new ArgumentInvalidException('The method should be a string in GET/POST/PUT/DELETE', method);
    }
    if (typeof url !== 'string') {
        throw new ArgumentInvalidException('The url should be a string', url);
    }
    var xhr = new XMLHttpRequest();
    // xhr.overrideMimeType('application/json');

    //If CORS is not needed.
    if (!isCORS) {
        xhr.open(method, url, true);
    } else {
        if ('withCredentials' in xhr) {
            // XHR for Chrome/Firefox/Opera/Safari.
            xhr.open(method, url, true);
        } else if (typeof XDomainRequest !== 'undefined') {
            // XDomainRequest for IE.
            xhr = new XDomainRequest();
            xhr.onprogress = function () {}; // Needs to be set to get it work on IE9 :/
            xhr.ontimeout = function () {}; // Needs to be set to get it work on IE9 :/
            xhr.open(method, url);
        } else {
            // CORS not supported.
            xhr = null;
        }
    }
    (0, _collection.map)(_extends({ 'Content-Type': 'application/json' }, options.headers), function (value, key) {
        if (xhr.setRequestHeader) xhr.setRequestHeader(key, value);
    });
    return xhr;
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInByb2Nlc3Nvci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztrUUFBQTtBQUNBOzs7OztBQUtBOztBQUVBLElBQU0sMkJBQTJCLEtBQWpDOztBQUVBOzs7Ozs7O0FBT0EsT0FBTyxPQUFQLEdBQWlCLFNBQVMsaUJBQVQsQ0FBMkIsTUFBM0IsRUFBbUMsR0FBbkMsRUFBc0Q7QUFBQSxRQUFkLE9BQWMseURBQUosRUFBSTs7QUFDbkUsUUFBTSxTQUFTLFFBQVEsTUFBUixJQUFrQixLQUFqQztBQUNBLFFBQUksT0FBTyxNQUFQLEtBQWtCLFFBQXRCLEVBQWdDO0FBQzVCLGNBQU0sSUFBSSx3QkFBSixDQUE2QixzREFBN0IsRUFBcUYsTUFBckYsQ0FBTjtBQUNIO0FBQ0QsUUFBSSxPQUFPLEdBQVAsS0FBZSxRQUFuQixFQUE2QjtBQUN6QixjQUFNLElBQUksd0JBQUosQ0FBNkIsNEJBQTdCLEVBQTJELEdBQTNELENBQU47QUFDSDtBQUNELFFBQUksTUFBTSxJQUFJLGNBQUosRUFBVjtBQUNBOztBQUVBO0FBQ0EsUUFBSSxDQUFDLE1BQUwsRUFBYTtBQUNULFlBQUksSUFBSixDQUFTLE1BQVQsRUFBaUIsR0FBakIsRUFBc0IsSUFBdEI7QUFDSCxLQUZELE1BRU87QUFDSCxZQUFJLHFCQUFxQixHQUF6QixFQUE4QjtBQUMxQjtBQUNBLGdCQUFJLElBQUosQ0FBUyxNQUFULEVBQWlCLEdBQWpCLEVBQXNCLElBQXRCO0FBQ0gsU0FIRCxNQUdPLElBQUksT0FBTyxjQUFQLEtBQTBCLFdBQTlCLEVBQTJDO0FBQzlDO0FBQ0Esa0JBQU0sSUFBSSxjQUFKLEVBQU47QUFDQSxnQkFBSSxVQUFKLEdBQWlCLFlBQU0sQ0FBRSxDQUF6QixDQUg4QyxDQUduQjtBQUMzQixnQkFBSSxTQUFKLEdBQWdCLFlBQU0sQ0FBRSxDQUF4QixDQUo4QyxDQUlwQjtBQUMxQixnQkFBSSxJQUFKLENBQVMsTUFBVCxFQUFpQixHQUFqQjtBQUNILFNBTk0sTUFNQTtBQUNIO0FBQ0Esa0JBQU0sSUFBTjtBQUNIO0FBQ0o7QUFDRCxvQ0FBSyxnQkFBZ0Isa0JBQXJCLElBQTRDLFFBQVEsT0FBcEQsR0FBOEQsVUFBQyxLQUFELEVBQVEsR0FBUixFQUFnQjtBQUMxRSxZQUFJLElBQUksZ0JBQVIsRUFBMEIsSUFBSSxnQkFBSixDQUFxQixHQUFyQixFQUEwQixLQUExQjtBQUM3QixLQUZEO0FBR0EsV0FBTyxHQUFQO0FBQ0gsQ0FqQ0QiLCJmaWxlIjoicHJvY2Vzc29yLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLypnbG9iYWwgWE1MSHR0cFJlcXVlc3QsIFhEb21haW5SZXF1ZXN0Ki9cclxuLyoqXHJcbiogRXJyb3IuXHJcbiogQHR5cGUge0Vycm9yfVxyXG4qL1xyXG5cclxuaW1wb3J0IHttYXB9IGZyb20gJ2xvZGFzaC9jb2xsZWN0aW9uJztcclxuXHJcbmNvbnN0IEFyZ3VtZW50SW52YWxpZEV4Y2VwdGlvbiA9IEVycm9yO1xyXG5cclxuLyoqXHJcbiogQ3JlYXRlIGEgY29ycyBodHRwIHJlcXVlc3QuXHJcbiogQHBhcmFtIHtzdHJpbmd9IG1ldGhvZCAtIFR5cGUgb2YgbWV0aG9kIHlvcHUgd2FudCB0byByZWFjaC5cclxuKiBAcGFyYW0ge3N0cmluZ30gdXJsIC0gVXJsIHRvIHJlYWNoLlxyXG4qIEBwYXJhbSB7b2JqZWN0fSBvcHRpb25zIC0gVGhlIGNvcnMgb3B0aW9ucy5cclxuKiBAcmV0dXJucyB7WE1MSHR0cFJlcXVlc3R9IC0gVGhlIENPUlMgaHR0cCByZXF1ZXN0LlxyXG4qL1xyXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGNyZWF0ZUNPUlNSZXF1ZXN0KG1ldGhvZCwgdXJsLCBvcHRpb25zID0ge30pIHtcclxuICAgIGNvbnN0IGlzQ09SUyA9IG9wdGlvbnMuaXNDT1JTIHx8IGZhbHNlO1xyXG4gICAgaWYgKHR5cGVvZiBtZXRob2QgIT09ICdzdHJpbmcnKSB7XHJcbiAgICAgICAgdGhyb3cgbmV3IEFyZ3VtZW50SW52YWxpZEV4Y2VwdGlvbignVGhlIG1ldGhvZCBzaG91bGQgYmUgYSBzdHJpbmcgaW4gR0VUL1BPU1QvUFVUL0RFTEVURScsIG1ldGhvZCk7XHJcbiAgICB9XHJcbiAgICBpZiAodHlwZW9mIHVybCAhPT0gJ3N0cmluZycpIHtcclxuICAgICAgICB0aHJvdyBuZXcgQXJndW1lbnRJbnZhbGlkRXhjZXB0aW9uKCdUaGUgdXJsIHNob3VsZCBiZSBhIHN0cmluZycsIHVybCk7XHJcbiAgICB9XHJcbiAgICBsZXQgeGhyID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XHJcbiAgICAvLyB4aHIub3ZlcnJpZGVNaW1lVHlwZSgnYXBwbGljYXRpb24vanNvbicpO1xyXG5cclxuICAgIC8vSWYgQ09SUyBpcyBub3QgbmVlZGVkLlxyXG4gICAgaWYgKCFpc0NPUlMpIHtcclxuICAgICAgICB4aHIub3BlbihtZXRob2QsIHVybCwgdHJ1ZSk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIGlmICgnd2l0aENyZWRlbnRpYWxzJyBpbiB4aHIpIHtcclxuICAgICAgICAgICAgLy8gWEhSIGZvciBDaHJvbWUvRmlyZWZveC9PcGVyYS9TYWZhcmkuXHJcbiAgICAgICAgICAgIHhoci5vcGVuKG1ldGhvZCwgdXJsLCB0cnVlKTtcclxuICAgICAgICB9IGVsc2UgaWYgKHR5cGVvZiBYRG9tYWluUmVxdWVzdCAhPT0gJ3VuZGVmaW5lZCcpIHtcclxuICAgICAgICAgICAgLy8gWERvbWFpblJlcXVlc3QgZm9yIElFLlxyXG4gICAgICAgICAgICB4aHIgPSBuZXcgWERvbWFpblJlcXVlc3QoKTtcclxuICAgICAgICAgICAgeGhyLm9ucHJvZ3Jlc3MgPSAoKSA9PiB7fTsgLy8gTmVlZHMgdG8gYmUgc2V0IHRvIGdldCBpdCB3b3JrIG9uIElFOSA6L1xyXG4gICAgICAgICAgICB4aHIub250aW1lb3V0ID0gKCkgPT4ge307IC8vIE5lZWRzIHRvIGJlIHNldCB0byBnZXQgaXQgd29yayBvbiBJRTkgOi9cclxuICAgICAgICAgICAgeGhyLm9wZW4obWV0aG9kLCB1cmwpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIC8vIENPUlMgbm90IHN1cHBvcnRlZC5cclxuICAgICAgICAgICAgeGhyID0gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBtYXAoeydDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbicsIC4uLm9wdGlvbnMuaGVhZGVyc30sICh2YWx1ZSwga2V5KSA9PiB7XHJcbiAgICAgICAgaWYgKHhoci5zZXRSZXF1ZXN0SGVhZGVyKSB4aHIuc2V0UmVxdWVzdEhlYWRlcihrZXksIHZhbHVlKTtcclxuICAgIH0pO1xyXG4gICAgcmV0dXJuIHhocjtcclxufTtcclxuIl19