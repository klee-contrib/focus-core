/**
 * [ArgumentNullException description]
 * @type {[type]}
 */
var ArgumentNullException = require("../helpers/custom_exception").ArgumentNullException;
var ArgumentInvalidException = require("../helpers/custom_exception").ArgumentNullException;

var config = {
  metadata: "GET" //POST    
};

/**
 * [configure description]
 * @param  {[type]} conf [description]
 * @return {[type]}      [description]
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
    if (!_.isObject(data)) {
      throw new ArgumentInvalidException('The data should be an objet.');
    }
    if (options !== undefined && !_.isObject(options)) {
      throw new ArgumentInvalidException('The options should be an objet.');
    }



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


var paramify = function(obj){
  return Object.keys(obj).map(function(k) {
    return encodeURIComponent(k) + '=' + encodeURIComponent(obj[k])
}).join('&');
}