/*global _*/
var ArgumentNullException =  require("../helpers/custom_exception").ArgumentNullException;
var ArgumentInvalidException = require("./helpers/custom_exception").ArgumentInvalidException;

var config = {
  list: {
    metadatas: "GET", //POST    
  }
};

/**
 * @module /core/http_response_builder
 * @type {Object}
 */
module.exports = {
  list: {
    configure: function configureListOptions(conf) {
      if (!_.isObject(conf)) {
        throw new ArgumentInvalidException('The configuration should be an objet.');
      }
      config.list = _.extend(config.list, conf);
    },
    /**
     * Create the options
     * @param  {[type]} metadatas [description]
     * @param  {[type]} criteria  [description]
     * @return {[type]}           [description]
     */
    createMetadatasOptions: function createListMetadatasOptions(metadatas) {
      if (config.list.metadatas === "GET") {
        return paramify(metadatas);
      }
      return {metadatas: metadatas};
    }
  }
};

var paramify = function (obj) {
  return Object.keys(obj).map(function (k) {
    return encodeURIComponent(k) + '=' + encodeURIComponent(a[k])
  }).join('&');
};