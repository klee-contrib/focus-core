//Dependencies.
var CoreStore = require('../CoreStore');
var buildDefinition = require('./definition');
/**
 * Class standing for the reference store.
 */
class ReferenceStore extends CoreStore {
  constructor(conf){
    conf = conf || {};
    conf.definition = conf.definition || buildDefinition();
    super(conf);
  }
}

module.exports = ReferenceStore;
