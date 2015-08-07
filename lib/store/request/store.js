//Dependencies.
'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Immutable = require('immutable');
var CoreStore = require('../CoreStore');
var getDefinition = require('./definition');
var uuid = require('uuid').v4;
var CLEAR = 'clear';
var UPDATE = 'update';
var AppDispatcher = require('../../dispatcher');

/**
 * Class standing for the cartridge store.
 */

var RequestStore = (function (_CoreStore) {
  _inherits(RequestStore, _CoreStore);

  /**
   * Add a listener on the global change on the search store.
   * @param {object} conf - The configuration of the request store.
   */

  function RequestStore(conf) {
    _classCallCheck(this, RequestStore);

    conf = conf || {};
    conf.definition = conf.definition || getDefinition();
    _CoreStore.call(this, conf);
    this.pending = Immutable.Map({});
    this.success = Immutable.Map({});
    this.error = Immutable.Map({});
    this.cancelled = Immutable.Map({});
  }

  /**
   * Get a message from its identifier.
   * @param {string} messageId - The message identifier.
   * @returns {object} - The requested message.
   */

  RequestStore.prototype.getRequest = function getRequest(requestId) {
    if (!this.data.has(requestId)) {
      return undefined;
    }
    return this.data.get(requestId);
  };

  /**
   * Get the requests by type
   * @return {object} An object with the total of request by type.
   */

  RequestStore.prototype.getRequests = function getRequests() {
    return {
      'pending': this.pending.size,
      'cancelled': this.cancelled.size,
      'success': this.success.size,
      'error': this.error.size,
      'total': this.pending.size + this.cancelled.size + this.success.size + this.error.size
    };
  };

  /**
   * Add a listener on the global change on the search store.
   * @param {object} message - The message to add.
   */

  RequestStore.prototype.updateRequest = function updateRequest(request) {
    request.id = request.id || '' + uuid();
    //If the status is supported
    if (this.definition[request.status]) {
      //Update the associated collection
      this[request.status] = this[request.status].set(request.id, request);
      //Remove the associated request from pending
      if (request.status !== 'pending' && this.pending.has(request.id)) {
        this.pending = this.pending['delete'](request.id);
      }
    }
    this.emit(UPDATE, request.id);
  };

  /**
   * Clear all messages in the stack.
   */

  RequestStore.prototype.clearRequests = function clearRequests() {
    this.data = this.data.clear();
    this.emit(CLEAR);
  };

  /**
   * Add a listener on the global change on the search store.
   * @param {function} cb - The callback to call when a message is pushed.
   */

  RequestStore.prototype.addUpdateRequestListener = function addUpdateRequestListener(cb) {
    this.addListener(UPDATE, cb);
  };

  /**
   * Remove a listener on the global change on the search store.
   * @param {function} cb - The callback to called when a message is pushed.
   */

  RequestStore.prototype.removeUpdateRequestListener = function removeUpdateRequestListener(cb) {
    this.removeListener(UPDATE, cb);
  };

  /**
   * Add a listener on the global change on the search store.
   * @param {function} cb - The callback to call when a message is pushed.
   */

  RequestStore.prototype.addClearRequestsListener = function addClearRequestsListener(cb) {
    this.addListener(CLEAR, cb);
  };

  /**
   * Remove a listener on the global change on the search store.
   * @param {function} cb - The callback to called when a message is pushed.
   */

  RequestStore.prototype.removeClearRequestsListener = function removeClearRequestsListener(cb) {
    this.removeListener(CLEAR, cb);
  };

  RequestStore.prototype.registerDispatcher = function registerDispatcher() {
    var currentStore = this;
    this.dispatch = AppDispatcher.register(function (transferInfo) {
      var rawData = transferInfo.action.data;
      var type = transferInfo.action.type;
      if (!rawData || !rawData.request) {
        return;
      }
      switch (type) {
        case 'update':
          if (rawData.request) {
            currentStore.updateRequest(rawData.request);
          }
          break;
        case 'clear':
          if (rawData.request) {
            currentStore.clearRequests();
          }
          break;
      }
    });
  };

  return RequestStore;
})(CoreStore);

module.exports = RequestStore;