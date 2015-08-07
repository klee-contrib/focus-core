//Dependencies.
'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var CoreStore = require('../CoreStore');
var buildDefinition = require('./definition');
/**
 * Class standing for the reference store.
 */

var ReferenceStore = (function (_CoreStore) {
  _inherits(ReferenceStore, _CoreStore);

  function ReferenceStore(conf) {
    _classCallCheck(this, ReferenceStore);

    conf = conf || {};
    conf.definition = conf.definition || buildDefinition();
    _CoreStore.call(this, conf);
  }

  ReferenceStore.prototype.getReference = function getReference(names) {
    var _this = this;

    var refs = {};
    names.map(function (name) {
      if (_this.data.has(name)) {
        refs[name] = _this.data.get(name);
      }
    });
    return { references: this.data.toJS() };
  };

  ReferenceStore.prototype.setReference = function setReference() {};

  return ReferenceStore;
})(CoreStore);

module.exports = ReferenceStore;