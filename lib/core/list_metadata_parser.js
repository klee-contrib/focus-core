/**
 * [ArgumentNullException description]
 * @type {[type]}
 */
var ArgumentNullException =  require("../helpers/custom_exception").ArgumentNullException;
var ArgumentInvalidException = require("../helpers/custom_exception").ArgumentNullException;
 
var config = {
    metadatas: "GET", //POST    
};

/**
 * @module /core/http_response_builder
 * @type {Object}
 */
module.exports = {
    /**
     * [configure description]
     * @param  {[type]} conf [description]
     * @return {[type]}      [description]
     */
    configure: function configureListOptions(conf){
      if(!_.isObject(conf)){
        throw new ArgumentInvalidException('The configuration should be an objet.');
      }
      _.extend(config, conf);
    },
    /**
     * Create the options 
     * @param  {object} criteria - Criteria for the search.
     * @param  {object} metadatas - Search metadats.
     * @return {object}
     */
    createOptions: function createListMetadatasOptions(criteria , metadatas){
      if(config.list.metadatas === "GET"){
        return $.param(metadatas);        
      }
      return {metadatas: metadatas};
    }
};