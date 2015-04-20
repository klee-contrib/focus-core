//Dependencies.
var CoreStore = require('../CoreStore');
var getDefinition = require('./definition');
var uuid = require('uuid').v4;
const PUSH = 'push';
const CLEAR = 'clear';
var AppDispatcher = require('../../dispatcher');

/**
 * Class standing for the cartridge store.
 */
class MessageStore extends CoreStore {
  /**
   * Add a listener on the global change on the search store.
   * @param {object} conf - The configuration of the message store.
   */
  constructor(conf){
    conf = conf || {};
    conf.definition = conf.definition || getDefinition();
    super(conf);
  }
  /**
   * Get a message from its identifier.
   * @param {string} messageId - The message identifier.
   * @returns {object} - The requested message.
   */
  getMessage(messageId){
    if(!this.data.has(messageId)){
      return undefined;
    }
    var message = this.data.get(messageId);
    if(!message.isAck){
      this.deleteMessage(messageId);
    }
    return message;
  }
  /**
   * Delete a message given its id.
   * @param {string} messageId - The message identifier.
   */
  deleteMessage(messageId){
    if(this.data.has(messageId)){
      this.data = this.data.delete(messageId);
    }
  }
  /**
   * Add a listener on the global change on the search store.
   * @param {object} message - The message to add.
   */
  pushMessage(message){
    message.id = `${uuid()}`;
    this.data = this.data.set(message.id, message);
    this.emit(PUSH, message.id);
  }
  /**
   * Clear all messages in the stack.
   */
  clearMessages(){
    this.data = this.data.clear();
    this.emit(CLEAR);
  }
  /**
   * Add a listener on the global change on the search store.
   * @param {function} cb - The callback to call when a message is pushed.
   */
  addPushedMessageListener(cb){
    this.addListener(PUSH, cb);
  }
  /**
   * Remove a listener on the global change on the search store.
   * @param {function} cb - The callback to called when a message is pushed.
   */
  removePushedMessageListener(cb){
    this.removeListener(PUSH, cb);
  }

  /**
   * Add a listener on the global change on the search store.
   * @param {function} cb - The callback to call when a message is pushed.
   */
  addClearMessagesListener(cb){
    this.addListener(CLEAR, cb);
  }
  /**
   * Remove a listener on the global change on the search store.
   * @param {function} cb - The callback to called when a message is pushed.
   */
  removeClearMessagesListener(cb){
    this.removeListener(CLEAR, cb);
  }
  registerDispatcher(){
    var currentStore = this;
    this.dispatch = AppDispatcher.register(function(transferInfo) {
      var rawData = transferInfo.action.data;
      var type = transferInfo.action.type;

      switch (type) {
        case 'push':
          if(rawData.message){
            currentStore.pushMessage(rawData.message);
          }
          break;
        case 'clear':
          if(rawData.messages){
            currentStore.clearMessages();
          }
          break;
      }
    });
  }
}

module.exports = MessageStore;
