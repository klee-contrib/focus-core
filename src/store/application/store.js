//Dependencies.
var CoreStore = require('../CoreStore');
var getDefinition = require('./definition');
var Immutable = require('immutable');
/**
 * Class standing for the cartridge store.
 */
class ApplicationStore extends CoreStore {
  constructor(conf){
    conf = conf || {};
    conf.definition = conf.definition || getDefinition();
    super(conf);
  }
  /**
   * Update the mode value.
   * @param  {object} dataNode - The value of the data.
   */
  updateMode(dataNode){
    var modeData = this.data.has('mode') ? this.data.get('mode') : Immutable.fromJS({});
    var newModeValue  = modeData.has(dataNode.newMode)? (modeData.get(dataNode.newMode) + 1) : 1;
    //Add a check to not have a negative mode, but it should not happen.
    var previousModeValue =  modeData.has(dataNode.previousMode)? (modeData.get(dataNode.previousMode) - 1) : 0;
    this.data = this.data.set('mode',
      modeData.set(dataNode.newMode, newModeValue).set(dataNode.previousMode, previousModeValue)
    );
    this.willEmit('mode:change');
  }
}

module.exports = ApplicationStore;
