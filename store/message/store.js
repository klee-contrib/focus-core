'use strict';

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }

//Dependencies.
var CoreStore = require('../CoreStore');
var getDefinition = require('./definition');
var uuid = require('uuid').v4;
var PUSH = 'push';
var CLEAR = 'clear';
var AppDispatcher = require('../../dispatcher');

/**
 * Class standing for the cartridge store.
 */

var MessageStore = function (_CoreStore) {
  _inherits(MessageStore, _CoreStore);

  /**
   * Add a listener on the global change on the search store.
   * @param {object} conf - The configuration of the message store.
   */
  function MessageStore(conf) {
    _classCallCheck(this, MessageStore);

    conf = conf || {};
    conf.definition = conf.definition || getDefinition();
    return _possibleConstructorReturn(this, _CoreStore.call(this, conf));
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
      this.data = this.data.delete(messageId);
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
}(CoreStore);

module.exports = MessageStore;
//# sourceMappingURL=data:application/json;base64,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QUFpQixZQUFqQiIsImZpbGUiOiJwcm9jZXNzb3IuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvL0RlcGVuZGVuY2llcy5cclxudmFyIENvcmVTdG9yZSA9IHJlcXVpcmUoJy4uL0NvcmVTdG9yZScpO1xyXG52YXIgZ2V0RGVmaW5pdGlvbiA9IHJlcXVpcmUoJy4vZGVmaW5pdGlvbicpO1xyXG52YXIgdXVpZCA9IHJlcXVpcmUoJ3V1aWQnKS52NDtcclxuY29uc3QgUFVTSCA9ICdwdXNoJztcclxuY29uc3QgQ0xFQVIgPSAnY2xlYXInO1xyXG52YXIgQXBwRGlzcGF0Y2hlciA9IHJlcXVpcmUoJy4uLy4uL2Rpc3BhdGNoZXInKTtcclxuXHJcbi8qKlxyXG4gKiBDbGFzcyBzdGFuZGluZyBmb3IgdGhlIGNhcnRyaWRnZSBzdG9yZS5cclxuICovXHJcbmNsYXNzIE1lc3NhZ2VTdG9yZSBleHRlbmRzIENvcmVTdG9yZSB7XHJcbiAgLyoqXHJcbiAgICogQWRkIGEgbGlzdGVuZXIgb24gdGhlIGdsb2JhbCBjaGFuZ2Ugb24gdGhlIHNlYXJjaCBzdG9yZS5cclxuICAgKiBAcGFyYW0ge29iamVjdH0gY29uZiAtIFRoZSBjb25maWd1cmF0aW9uIG9mIHRoZSBtZXNzYWdlIHN0b3JlLlxyXG4gICAqL1xyXG4gIGNvbnN0cnVjdG9yKGNvbmYpe1xyXG4gICAgY29uZiA9IGNvbmYgfHwge307XHJcbiAgICBjb25mLmRlZmluaXRpb24gPSBjb25mLmRlZmluaXRpb24gfHwgZ2V0RGVmaW5pdGlvbigpO1xyXG4gICAgc3VwZXIoY29uZik7XHJcbiAgfVxyXG4gIC8qKlxyXG4gICAqIEdldCBhIG1lc3NhZ2UgZnJvbSBpdHMgaWRlbnRpZmllci5cclxuICAgKiBAcGFyYW0ge3N0cmluZ30gbWVzc2FnZUlkIC0gVGhlIG1lc3NhZ2UgaWRlbnRpZmllci5cclxuICAgKiBAcmV0dXJucyB7b2JqZWN0fSAtIFRoZSByZXF1ZXN0ZWQgbWVzc2FnZS5cclxuICAgKi9cclxuICBnZXRNZXNzYWdlKG1lc3NhZ2VJZCl7XHJcbiAgICBpZighdGhpcy5kYXRhLmhhcyhtZXNzYWdlSWQpKXtcclxuICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcclxuICAgIH1cclxuICAgIHZhciBtZXNzYWdlID0gdGhpcy5kYXRhLmdldChtZXNzYWdlSWQpO1xyXG4gICAgaWYoIW1lc3NhZ2UuaXNBY2spe1xyXG4gICAgICB0aGlzLmRlbGV0ZU1lc3NhZ2UobWVzc2FnZUlkKTtcclxuICAgIH1cclxuICAgIHJldHVybiBtZXNzYWdlO1xyXG4gIH1cclxuICAvKipcclxuICAgKiBEZWxldGUgYSBtZXNzYWdlIGdpdmVuIGl0cyBpZC5cclxuICAgKiBAcGFyYW0ge3N0cmluZ30gbWVzc2FnZUlkIC0gVGhlIG1lc3NhZ2UgaWRlbnRpZmllci5cclxuICAgKi9cclxuICBkZWxldGVNZXNzYWdlKG1lc3NhZ2VJZCl7XHJcbiAgICBpZih0aGlzLmRhdGEuaGFzKG1lc3NhZ2VJZCkpe1xyXG4gICAgICB0aGlzLmRhdGEgPSB0aGlzLmRhdGEuZGVsZXRlKG1lc3NhZ2VJZCk7XHJcbiAgICB9XHJcbiAgfVxyXG4gIC8qKlxyXG4gICAqIEFkZCBhIGxpc3RlbmVyIG9uIHRoZSBnbG9iYWwgY2hhbmdlIG9uIHRoZSBzZWFyY2ggc3RvcmUuXHJcbiAgICogQHBhcmFtIHtvYmplY3R9IG1lc3NhZ2UgLSBUaGUgbWVzc2FnZSB0byBhZGQuXHJcbiAgICovXHJcbiAgcHVzaE1lc3NhZ2UobWVzc2FnZSl7XHJcbiAgICBtZXNzYWdlLmlkID0gYCR7dXVpZCgpfWA7XHJcbiAgICB0aGlzLmRhdGEgPSB0aGlzLmRhdGEuc2V0KG1lc3NhZ2UuaWQsIG1lc3NhZ2UpO1xyXG4gICAgdGhpcy5lbWl0KFBVU0gsIG1lc3NhZ2UuaWQpO1xyXG4gIH1cclxuICAvKipcclxuICAgKiBDbGVhciBhbGwgbWVzc2FnZXMgaW4gdGhlIHN0YWNrLlxyXG4gICAqL1xyXG4gIGNsZWFyTWVzc2FnZXMoKXtcclxuICAgIHRoaXMuZGF0YSA9IHRoaXMuZGF0YS5jbGVhcigpO1xyXG4gICAgdGhpcy5lbWl0KENMRUFSKTtcclxuICB9XHJcbiAgLyoqXHJcbiAgICogQWRkIGEgbGlzdGVuZXIgb24gdGhlIGdsb2JhbCBjaGFuZ2Ugb24gdGhlIHNlYXJjaCBzdG9yZS5cclxuICAgKiBAcGFyYW0ge2Z1bmN0aW9ufSBjYiAtIFRoZSBjYWxsYmFjayB0byBjYWxsIHdoZW4gYSBtZXNzYWdlIGlzIHB1c2hlZC5cclxuICAgKi9cclxuICBhZGRQdXNoZWRNZXNzYWdlTGlzdGVuZXIoY2Ipe1xyXG4gICAgdGhpcy5hZGRMaXN0ZW5lcihQVVNILCBjYik7XHJcbiAgfVxyXG4gIC8qKlxyXG4gICAqIFJlbW92ZSBhIGxpc3RlbmVyIG9uIHRoZSBnbG9iYWwgY2hhbmdlIG9uIHRoZSBzZWFyY2ggc3RvcmUuXHJcbiAgICogQHBhcmFtIHtmdW5jdGlvbn0gY2IgLSBUaGUgY2FsbGJhY2sgdG8gY2FsbGVkIHdoZW4gYSBtZXNzYWdlIGlzIHB1c2hlZC5cclxuICAgKi9cclxuICByZW1vdmVQdXNoZWRNZXNzYWdlTGlzdGVuZXIoY2Ipe1xyXG4gICAgdGhpcy5yZW1vdmVMaXN0ZW5lcihQVVNILCBjYik7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBBZGQgYSBsaXN0ZW5lciBvbiB0aGUgZ2xvYmFsIGNoYW5nZSBvbiB0aGUgc2VhcmNoIHN0b3JlLlxyXG4gICAqIEBwYXJhbSB7ZnVuY3Rpb259IGNiIC0gVGhlIGNhbGxiYWNrIHRvIGNhbGwgd2hlbiBhIG1lc3NhZ2UgaXMgcHVzaGVkLlxyXG4gICAqL1xyXG4gIGFkZENsZWFyTWVzc2FnZXNMaXN0ZW5lcihjYil7XHJcbiAgICB0aGlzLmFkZExpc3RlbmVyKENMRUFSLCBjYik7XHJcbiAgfVxyXG4gIC8qKlxyXG4gICAqIFJlbW92ZSBhIGxpc3RlbmVyIG9uIHRoZSBnbG9iYWwgY2hhbmdlIG9uIHRoZSBzZWFyY2ggc3RvcmUuXHJcbiAgICogQHBhcmFtIHtmdW5jdGlvbn0gY2IgLSBUaGUgY2FsbGJhY2sgdG8gY2FsbGVkIHdoZW4gYSBtZXNzYWdlIGlzIHB1c2hlZC5cclxuICAgKi9cclxuICByZW1vdmVDbGVhck1lc3NhZ2VzTGlzdGVuZXIoY2Ipe1xyXG4gICAgdGhpcy5yZW1vdmVMaXN0ZW5lcihDTEVBUiwgY2IpO1xyXG4gIH1cclxuICByZWdpc3RlckRpc3BhdGNoZXIoKXtcclxuICAgIHZhciBjdXJyZW50U3RvcmUgPSB0aGlzO1xyXG4gICAgdGhpcy5kaXNwYXRjaCA9IEFwcERpc3BhdGNoZXIucmVnaXN0ZXIoZnVuY3Rpb24odHJhbnNmZXJJbmZvKSB7XHJcbiAgICAgIHZhciByYXdEYXRhID0gdHJhbnNmZXJJbmZvLmFjdGlvbi5kYXRhO1xyXG4gICAgICB2YXIgdHlwZSA9IHRyYW5zZmVySW5mby5hY3Rpb24udHlwZTtcclxuXHJcbiAgICAgIHN3aXRjaCAodHlwZSkge1xyXG4gICAgICAgIGNhc2UgJ3B1c2gnOlxyXG4gICAgICAgICAgaWYocmF3RGF0YS5tZXNzYWdlKXtcclxuICAgICAgICAgICAgY3VycmVudFN0b3JlLnB1c2hNZXNzYWdlKHJhd0RhdGEubWVzc2FnZSk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlICdjbGVhcic6XHJcbiAgICAgICAgICBpZihyYXdEYXRhLm1lc3NhZ2VzKXtcclxuICAgICAgICAgICAgY3VycmVudFN0b3JlLmNsZWFyTWVzc2FnZXMoKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIGJyZWFrO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICB9XHJcbn1cclxuXHJcbm1vZHVsZS5leHBvcnRzID0gTWVzc2FnZVN0b3JlO1xyXG4iXX0=