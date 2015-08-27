//Dependencies.
'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var CoreStore = require('../CoreStore');
var getDefinition = require('./definition');
var uuid = require('uuid').v4;
var PUSH = 'push';
var CLEAR = 'clear';
var AppDispatcher = require('../../dispatcher');

/**
 * Class standing for the cartridge store.
 */

var MessageStore = (function (_CoreStore) {
  _inherits(MessageStore, _CoreStore);

  /**
   * Add a listener on the global change on the search store.
   * @param {object} conf - The configuration of the message store.
   */

  function MessageStore(conf) {
    _classCallCheck(this, MessageStore);

    conf = conf || {};
    conf.definition = conf.definition || getDefinition();
    _CoreStore.call(this, conf);
  }

  /**
   * Get a message from its identifier.
   * @param {string} messageId - The message identifier.
   * @returns {object} - The requested message.
   */

  MessageStore.prototype.getMessage = function getMessage(messageId) {
    if (!this.data.has(messageId)) {
      return undefined;
    }
    var message = this.data.get(messageId);
    if (!message.isAck) {
      this.deleteMessage(messageId);
    }
    return message;
  };

  /**
   * Delete a message given its id.
   * @param {string} messageId - The message identifier.
   */

  MessageStore.prototype.deleteMessage = function deleteMessage(messageId) {
    if (this.data.has(messageId)) {
      this.data = this.data['delete'](messageId);
    }
  };

  /**
   * Add a listener on the global change on the search store.
   * @param {object} message - The message to add.
   */

  MessageStore.prototype.pushMessage = function pushMessage(message) {
    message.id = '' + uuid();
    this.data = this.data.set(message.id, message);
    this.emit(PUSH, message.id);
  };

  /**
   * Clear all messages in the stack.
   */

  MessageStore.prototype.clearMessages = function clearMessages() {
    this.data = this.data.clear();
    this.emit(CLEAR);
  };

  /**
   * Add a listener on the global change on the search store.
   * @param {function} cb - The callback to call when a message is pushed.
   */

  MessageStore.prototype.addPushedMessageListener = function addPushedMessageListener(cb) {
    this.addListener(PUSH, cb);
  };

  /**
   * Remove a listener on the global change on the search store.
   * @param {function} cb - The callback to called when a message is pushed.
   */

  MessageStore.prototype.removePushedMessageListener = function removePushedMessageListener(cb) {
    this.removeListener(PUSH, cb);
  };

  /**
   * Add a listener on the global change on the search store.
   * @param {function} cb - The callback to call when a message is pushed.
   */

  MessageStore.prototype.addClearMessagesListener = function addClearMessagesListener(cb) {
    this.addListener(CLEAR, cb);
  };

  /**
   * Remove a listener on the global change on the search store.
   * @param {function} cb - The callback to called when a message is pushed.
   */

  MessageStore.prototype.removeClearMessagesListener = function removeClearMessagesListener(cb) {
    this.removeListener(CLEAR, cb);
  };

  MessageStore.prototype.registerDispatcher = function registerDispatcher() {
    var currentStore = this;
    this.dispatch = AppDispatcher.register(function (transferInfo) {
      var rawData = transferInfo.action.data;
      var type = transferInfo.action.type;

      switch (type) {
        case 'push':
          if (rawData.message) {
            currentStore.pushMessage(rawData.message);
          }
          break;
        case 'clear':
          if (rawData.messages) {
            currentStore.clearMessages();
          }
          break;
      }
    });
  };

  return MessageStore;
})(CoreStore);

module.exports = MessageStore;