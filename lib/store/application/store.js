//Dependencies.
'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var CoreStore = require('../CoreStore');
var getDefinition = require('./definition');
var Immutable = require('immutable');
/**
 * Class standing for the cartridge store.
 */

var ApplicationStore = (function (_CoreStore) {
  _inherits(ApplicationStore, _CoreStore);

  function ApplicationStore(conf) {
    _classCallCheck(this, ApplicationStore);

    conf = conf || {};
    conf.definition = conf.definition || getDefinition();
    _CoreStore.call(this, conf);
  }

  /**
   * Update the mode value.
   * @param  {object} dataNode - The value of the data.
   */

  ApplicationStore.prototype.updateMode = function updateMode(dataNode) {
    var modeData = this.data.has('mode') ? this.data.get('mode') : Immutable.fromJS({});
    var newModeValue = modeData.has(dataNode.newMode) ? modeData.get(dataNode.newMode) + 1 : 1;
    //Add a check to not have a negative mode, but it should not happen.
    var previousModeValue = modeData.has(dataNode.previousMode) ? modeData.get(dataNode.previousMode) - 1 : 0;
    this.data = this.data.set('mode', modeData.set(dataNode.newMode, newModeValue).set(dataNode.previousMode, previousModeValue));
    this.willEmit('mode:change');
  };

  return ApplicationStore;
})(CoreStore);

module.exports = ApplicationStore;