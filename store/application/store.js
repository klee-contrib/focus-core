//Dependencies.
var CoreStore = require('../CoreStore');
var getDefinition = require('./definition');

/**
 * Class standing for the cartridge store.
 */
class CartridgeStore extends CoreStore {
  constructor(conf){
    conf = conf || {};
    conf.definition = conf.definition || getDefinition();
    super(conf);
  }

}

module.exports = CartridgeStore;
