let merge = require('lodash/object/merge');
let {isObject, clone} = require('lodash/lang');

/**
 * Configuration object.
 * @type {{CORS: boolean}}
 */
let configuration = {
  CORS: true,
  xhrErrors: {}
};

/**
 * Function which overrides the configuration.
 * @param conf
 */
function configure(conf){
  if(isObject(conf)){
    merge(configuration, conf);
  }

}


module.exports = {
  configure: configure,
  get(){
    return clone(configuration);
  }
};
