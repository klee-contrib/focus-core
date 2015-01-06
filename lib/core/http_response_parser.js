/*global _*/

/**
 * @module core/http_response_parser
 * @description Global notifications mecanism around the whole application.
 * @see file helpers/backbone_notifications.js
 * @author pbesson
 */

/*
 Jquery ajax error and success [documentation](http://api.jquery.com/jquery.ajax/).
 error
 Type: Function( jqXHR jqXHR, String textStatus, String errorThrown )
 A function to be called if the request fails. The function receives three arguments: The jqXHR (in jQuery 1.4.x, XMLHttpRequest) object, a string describing the type of error that occurred and an optional exception object, if one occurred. Possible values for the second argument (besides null) are "timeout", "error", "abort", and "parsererror". When an HTTP error occurs, errorThrown receives the textual portion of the HTTP status, such as "Not Found" or "Internal Server Error." As of jQuery 1.5, the error setting can accept an array of functions. Each function will be called in turn. Note: This handler is not called for cross-domain script and cross-domain JSONP requests. This is an Ajax Event.
 success:
 Type: Function( PlainObject data, String textStatus, jqXHR jqXHR )
 A function to be called if the request succeeds. The function gets passed three arguments: The data returned from the server, formatted according to the dataType parameter; a string describing the status; and the jqXHR (in jQuery 1.4.x, XMLHttpRequest) object. As of jQuery 1.5, the success setting can accept an array of functions. Each function will be called in turn. This is an Ajax Event.
 */

"use strict";
var ArgumentNullException = require("../helpers/custom_exception").ArgumentNullException;
var httpHelper = {setAccessToken: function(){console.warn('setAccessToken not implemented...')}};//require("../helpers/http_helper");
/**
 * Default configuration.
 * @type {Object}
 */
var config = {
  //Parameters to parse the response
  totalCountKey: "totalRecords",
  valuesKey: "values",
  //parameters to expose the data
  parseResponse: {
    totalCountKey: "totalRecords",
    valuesKey: "values"
  }
};

/**
 * Configure the response parser.
 * @param  {object} extendConf - the property you want to configure in the configuration.
 * @return {[type]}            [description]
 */
var configure = function configureHttpResponseParser(extendConf) {
  if (!_.isObject(extendConf)) {
    return;
  }
  _.extend(config, extendConf);
};

/**
 * All the headers.
 * @type {Object}
 */
var HEADERS_KEYS = {
  CONTENT_TYPE: "Content-Type",
  TOTAL_COUNT: "X-Total-Count",
  ACCESS_TOKEN: "x-access-token"
};
/**
 * All the content types.
 * @type {Object}
 */
var CONTENT_TYPES = {
  LIST: "json+list",
  LIST_META: "json+list:",
  ENTITY_DESC: "json+entity",
  ENTITY: "application/json"
};

/**
 * Get the object name from the content type.
 * @param  {string} contentType - The content type.
 * @return {string} The name of the object.
 */
var getObjectName = function getObjectNameFromContentType(contentType) {
  var splitContent = contentType.split('+');
  if (splitContent !== undefined && splitContent.length > 1) {
    return splitContent[1].split(';')[0];

  }
  return undefined;
};
/**
 * Parse an entity http response.
 * @param  {jqXHR} response   - jQuery XmlHttpRequest.
 * @param {object} contentType -  Object name in the contentType.
 * @return {object}           - The parse response.
 */
var entityParser = function entityParser(response, contentType) {
  var entity = response.responseJSON;
  //Set an object name if it is given as argument.
  if (contentType) {
    entity._objectName = getObjectName(contentType);
  }
  return entity;
};

/**
 * Collection response parser.
 * {jqXHR} response - jQuery XmlHttpRequest.
 * @return {object}         - The parse response.
 */
var collectionParser = function collectionParser(response, isMetaInHeader) {

  var totalCount, values;
  var jsonResponse = response.responseJSON || JSON.parse(response.responseText);

  if (isMetaInHeader) {
    totalCount = +(response.getResponseHeader(HEADERS_KEYS.TOTAL_COUNT));
    values = jsonResponse;
    if (!_.isArray(values)) {
      throw new ArgumentNullException("response.jsonResponse." + config.valuesKey + " should be an array.", response);
    }
  } else {

    totalCount = jsonResponse[config.totalCountKey] || jsonResponse.length;
    values = jsonResponse[config.valuesKey];
    if (!_.isArray(values)) {
      throw new ArgumentNullException("response.jsonResponse should be an array.", response);
    }
  }
  //Result list to be publish
  var listResult = {};
  listResult[config.parseResponse.totalCountKey] = totalCount;
  listResult[config.parseResponse.valuesKey] = values;
  return listResult;
};

/**
 * @param  {[type]} response [description]
 * @return {[type]}          [description]
 */
var parseAccessToken = function parseAccessToken(response) {
  var accessToken = response.getResponseHeader(HEADERS_KEYS.ACCESS_TOKEN);
  if (accessToken) {
    httpHelper.setAccessToken(accessToken, true);
  }
};

/**
 * Polyfill for the string contains method.
 * @param  {string} string  - The string to test.
 * @param  {string} pattern - The pattern to identify.
 * @return {boolean}         true or false.
 */
var contains = function stringContains(string, pattern) {
  if (!_.isString(string)) {
    return false;
  }
  return string.indexOf(pattern) !== -1;
};

/**
 * Parse HttpResponse.
 * @param  {jqXHR} response - jQuery XmlHttpRequest.
 * @return {object}         - The parse response.
 */
var parseResponse = function parseResponse(response) {
  var contentType = response.getResponseHeader(HEADERS_KEYS.CONTENT_TYPE);
  //parseAccessToken(response);
  if (contains(contentType, CONTENT_TYPES.LIST_META)) {
    return collectionParser(response, true);
  } else if (contains(contentType, CONTENT_TYPES.LIST)) {
    return collectionParser(response, true);
  } else if (contains(contentType, CONTENT_TYPES.ENTITY_DESC)) {
    return entityParser(response, contentType);
  } else if (contains(contentType, CONTENT_TYPES.ENTITY)) {
    return entityParser(response);
  } else {
    return response.responseJSON;
  }
};
/**
 * Container for the export.
 * @type {Object}
 */
var httpResponseParser = {
  entity: entityParser,
  collection: collectionParser,
  parse: parseResponse,
  configure: configure
};
module.exports = httpResponseParser;