/*global XMLHttpRequest, XDomainRequest*/
/**
* Error.
* @type {Error}
*/
const ArgumentInvalidException = Error;

/**
* Create a cors http request.
* @param {string} method - Type of method yopu want to reach.
* @param {string} url - Url to reach.
* @param {object} options - The cors options.
* @returns {XMLHttpRequest} - The CORS http request.
*/
export default function createCORSRequest(method, url, options = {}) {
    const isCORS = options.isCORS || false;
    const noContentType = options.noContentType || false;

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
            xhr.onprogress = () => { }; // Needs to be set to get it work on IE9 :/
            xhr.ontimeout = () => { }; // Needs to be set to get it work on IE9 :/
            xhr.open(method, url);
        } else {
            // CORS not supported.
            xhr = null;
        }
    }

    const headers = options.headers || {};
    // Setting 'Content-Type' header only if not in options
    // Also handling noContentType options
    if (!noContentType && !headers['Content-Type']) {
        if (xhr.setRequestHeader) {
            xhr.setRequestHeader('Content-Type', 'application/json');
        }
    }
    // Adding the other headers
    for (let prop in headers) {
        if (xhr.setRequestHeader) {
            xhr.setRequestHeader(prop, headers[prop]);
        }
    }

    return xhr;
}
