"use strict";
/*global XMLHttpRequest, XDomainRequest*/
/**
 * Error.
 * @type {Error}
 */
var ArgumentInvalidException = Error;

/**
 * Create a cors http request.
 * @param {string} method - Type of method yopu want to reach.
 * @param {string} url - Url to reach.
 * @param {object} options - The cors options.
 * @returns {XMLHttpRequest} - The CORS http request.
 */
module.exports = function createCORSRequest(method, url, options) {
  options = options || {};
  var isCORS = true;
  if (typeof method !== "string") {
    throw new ArgumentInvalidException('The method should be a string in GET/POST/PUT/DELETE', method);
  }
  if (typeof url !== "string") {
    throw new ArgumentInvalidException('The url should be a string', url);
  }
  var xhr = new XMLHttpRequest();
  // xhr.overrideMimeType("application/json");

  //If CORS is not needed.
  if (!isCORS) {
    xhr.open(method, url, true);
  } else {
    if ("withCredentials" in xhr) {
      // XHR for Chrome/Firefox/Opera/Safari.
      xhr.open(method, url, true);
    } else if (typeof XDomainRequest !== "undefined") {
      // XDomainRequest for IE.
      xhr = new XDomainRequest();
      xhr.open(method, url);
    } else {
      // CORS not supported.
      xhr = null;
    }
  }
  xhr.setRequestHeader("Content-Type", "application/json");
  return xhr;
};
