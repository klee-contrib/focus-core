/*global _*/
//Dependencies.
var ArgumentInvalidException = require("../helpers/custom_exception").ArgumentInvalidException;
var PARAM_SEPARATOR = '?';
var paramify = require('../util/paramify');

/**
 * Default config.
 * @type {Object}
 */
var config = {
  paramsMethod: "GET",
  method: "POST",
  top: "top",
  skip: "skip",
  sortFieldName: "sortFieldName",
  sortDesc: "sortDesc",
  contentType: "application/json",
  crossDomain: true,
  dataType: "json",
  processData: false
};

/**
 * Extend the list options.
 * @param  {object} conf - The new configutation.
 * @return {undefined}
 */
function configureListOptions(conf) {
  if (!_.isObject(conf)) {
    throw new ArgumentInvalidException('The configuration should be an objet.');
  }
  _.extend(config, conf);
}

/**
 * Take the pageInfos from the form and creates the metdata to send to the server.
 * @param  {object} pageInfos -  Informations coming form the form.
 * @return {object} The parsed metadata.
 */
function convertPageInfosToMetadatas(pageInfos) {
  var metadata = {};
  if (pageInfos.perPage) {
    metadata[config.top] = pageInfos.perPage;
  }
  if (pageInfos.currentPage) {
    metadata[config.skip] = (pageInfos.currentPage - 1) * pageInfos.perPage;

  }
  if (pageInfos.sortField) {
    if (pageInfos.sortField.field) {
      metadata[config.sortFieldName] = pageInfos.sortField.field;
    }
    if (pageInfos.sortField.order) {
      metadata[config.sortDesc] = pageInfos.sortField.order !== "asc";

    }
  }

  return metadata;
}

/**
 * Creates an ajax request for the list.
 * @param  {object} data    - The data to save.
 * @param  {object} options - The options for the ajax request
 * @return {Promise}
 */
function createAjaxRequest(data, options) {
  options = options || {};
  options.type = options.method || config.method;
  if (!_.isString(options.url)) {
    throw new ArgumentInvalidException('The url should be a string');
  }
  if (!_.isObject(data)) {
    throw new ArgumentInvalidException('The data should be an objet.');
  }
  if (options !== undefined && !_.isObject(options)) {
    throw new ArgumentInvalidException('The options should be an objet.');
  }
  //List without metadata is still a possibility.
  if (data.pageInfo !== undefined && !_.isObject(data.pageInfo)) {
    throw new ArgumentInvalidException('The pageInfo should be an objet.');
  }
  if (!_.isObject(data.criteria)) {
    throw new ArgumentInvalidException('The criteria should be an object');
  }

  options.data = JSON.stringify(data.criteria); //decodeURIComponent(paramify(data.criteria));

  if (data.pageInfo) {
    var metadata = createListMetadatasOptions(data.pageInfo);
    if (_.isString(metadata)) {
      var cleanUrl = options.url.slice(-1) === "/" ? options.url.slice(0, -1) : options.url;
      options.url = cleanUrl + PARAM_SEPARATOR + metadata;
    } else {
      _.extend(options.data, {}, metadata);
    }
  }
  return options;

}
/**
 * Create the options
 * @param  {object} metadatas - Search metadats.
 * @return {object}
 */
function createListMetadatasOptions(pageInfo) {
  var metadata = convertPageInfosToMetadatas(pageInfo);
  if (config.paramsMethod === "GET") {
    return paramify(metadata);
  }
  return {
    metadata: metadata
  };
}
/**
 * @module /core/listMetadataParser
 * @type {Object}
 */
var listMetadataParser = {

  configure: configureListOptions,

  load: createAjaxRequest,

  createMetadataOptions: createAjaxRequest
};

module.exports = listMetadataParser;
