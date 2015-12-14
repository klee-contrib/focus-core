/*global XMLHttpRequest, XDomainRequest*/
/**
* Error.
* @type {Error}
*/

import {map} from 'lodash/collection';

const ArgumentInvalidException = Error;

/**
* Create a cors http request.
* @param {string} method - Type of method yopu want to reach.
* @param {string} url - Url to reach.
* @param {object} options - The cors options.
* @returns {XMLHttpRequest} - The CORS http request.
*/
module.exports = function createCORSRequest(method, url, options = {}) {
    const isCORS = options.isCORS || false;
    if (typeof method !== 'string') {
        throw new ArgumentInvalidException('The method should be a string in GET/POST/PUT/DELETE', method);
    }
    if (typeof url !== 'string') {
        throw new ArgumentInvalidException('The url should be a string', url);
    }
    let xhr = new XMLHttpRequest();
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
            xhr.open(method, url);
        } else {
            // CORS not supported.
            xhr = null;
        }
    }
    map({'Content-Type': 'application/json', ...options.headers}, (value, key) => {
        xhr.setRequestHeader(key, value);
    });
    return xhr;
};
