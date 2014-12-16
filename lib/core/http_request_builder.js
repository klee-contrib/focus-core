var ArgumentNullException = isInBrowser ? NS.Helpers.Exceptions.ArgumentNullException : require("./custom_exception").ArgumentNullException;
 var ArgumentInvalidException = isInBrowser ? NS.Helpers.Exceptions.ArgumentInvalidException : require("./custom_exception").ArgumentInvalidException;
 
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
    configure: function configureListOptions(conf){
      if(!_.isObject(conf)){
        throw new ArgumentInvalidException('The configuration should be an objet.');
      }
      config.list = _.extend(config.list, conf);
    },
    /**
     * Crate the options
     * @param  {[type]} metadatas [description]
     * @param  {[type]} criteria  [description]
     * @return {[type]}           [description]
     */
    createMetadatasOptions: function createListMetadatasOptions(metadatas){
      if(config.list.metadatas === "GET"){
        return $.param(metadatas);        
      }
      return {metadatas: metadatas};
    }
  }
};