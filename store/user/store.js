//Dependencies.
var CoreStore = require('../CoreStore');
var buildDefinition = require('./definition');
/**
 * Class standing for the user store.
 */
class UserStore extends CoreStore {
  constructor(conf){
    conf = conf || {};
    conf.definition = conf.definition || buildDefinition();
    super(conf);
  }
  getRoles(){
    return ['DEFAULT_ROLE'];
  }

}

module.exports = UserStore;
