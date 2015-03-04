/*global _*/
/**
 * @module focus/configuration
 */

/**
 * Configuration object.
 * @type {{CORS: boolean}}
 */
var configuration = {
  CORS: true,
  ajaxErrors: {}
};

/**
 * Function which overrides the configuration.
 * @param conf
 */
function configure(conf){
  if(_.isObject(conf)){
    _.extend(configuration, conf);
  }

}


module.exports = {
  configure: configure,
  get: function(){
    return _.clone(configuration);
  }
};