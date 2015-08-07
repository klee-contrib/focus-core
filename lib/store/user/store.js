//Dependencies.
'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var CoreStore = require('../CoreStore');
var buildDefinition = require('./definition');
/**
 * Class standing for the user store.
 */

var UserStore = (function (_CoreStore) {
  _inherits(UserStore, _CoreStore);

  function UserStore(conf) {
    _classCallCheck(this, UserStore);

    conf = conf || {};
    conf.definition = conf.definition || buildDefinition();
    _CoreStore.call(this, conf);
  }

  return UserStore;
})(CoreStore);

module.exports = UserStore;