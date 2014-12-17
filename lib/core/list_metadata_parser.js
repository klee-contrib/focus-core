/*global _*/
//Dependencies.
var ArgumentInvalidException = require("../helpers/custom_exception").ArgumentNullException;
var paramify = require('../util/paramify');

/**
 * Default config.
 * @type {Object}
 */
var config = {
  metadata: "GET" //POST
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
 * Creates an ajax request for the list.
 * @param  {object} data    - The data to save.
 * @param  {object} options - The options for the ajax request
 * @return {Promise}
 */
function createAjaxRequest(data, options) {
    options = options || {};
    if(!_.isString(options.url)){
      throw new ArgumentInvalidException('The url should be a string');
    }
    if (!_.isObject(data)) {
      throw new ArgumentInvalidException('The data should be an objet.');
    }
    if (options !== undefined && !_.isObject(options)) {
      throw new ArgumentInvalidException('The options should be an objet.');
    }
    //List without metadata is still a possibility.
    if (data.metadata !== undefined && !_.isObject(data.metadata)) {
      throw new ArgumentInvalidException('The metadata should be an objet.');
    }
    if (!_.isObject(data.criteria)) {
      throw new ArgumentInvalidException('The criteria should be an object');
    }
    
    options.data = data.criteria;
    
    if (data.metadata) {
      var metadata = createListMetadatasOptions(data.metadata);
      if (_.isString(metadata)) {
        options.url = options.url + metadata;
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
function createListMetadatasOptions(metadata) {
    if (config.metadata === "GET") {
      return paramify(metadata);
    }
    return {
      metadata: metadata
    };
  }
  /**
   * @module /core/http_response_builder
   * @type {Object}
   */
module.exports = {

  configure: configureListOptions,

  load: createAjaxRequest,

  createMetadataOptions: createListMetadatasOptions
};