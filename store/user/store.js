//Dependencies.
var CoreStore = require('../CoreStore');
var buildDefinition = require('./definition');
/**
 * Class standing for the reference store.
 */
class UserStore extends CoreStore {
  constructor(conf){
    conf = conf || {};
    conf.definition = conf.definition || buildDefinition();
    super(conf);
  }

}

module.exports = UserStore;
