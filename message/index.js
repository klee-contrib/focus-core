var dispatcher = require('../dispatcher');
var isObject = require("lodash/lang/isObject");

/**
 * Add a message.
 * @param {object} message - The message object.
 */
function addMessage(message){
  dispatcher.handleServerAction({
    data: {message: message},
    type: 'push'
  });
}

/**
 * Add an error message.
 * @param {object} message - The message content.
 */
function addErrorMessage(message){
  message = parseStringMessage(message);
  message.type = 'error';
  addMessage(message);
}
/**
 * Add a warning message.
 * @param {object} message - The message content.
 */
function addWarningMessage(message){
  message = parseStringMessage(message);
  message.type = 'warning';
  addMessage(message);
}

/**
 * Add an information message.
 * @param {object} message - The message content.
 */
function addInformationMessage(message){
  message = parseStringMessage(message);
  message.type = 'info';
  addMessage(message);
}

/**
 * Add a success message.
 * @param {object} message - The message content.
 */
function addSuccessMessage(message){
  message = parseStringMessage(message);
  message.type = 'success';
  addMessage(message);
}

function clearMessages(){
  dispatcher.handleServerAction({data: {messages: {}}, type: 'clear'});
}

function parseStringMessage(message) {
    if(!isObject(message)) {
        message = {content: message};
    }
    return message;
}

module.exports = {
  addMessage: addMessage,
  addWarningMessage: addWarningMessage,
  addInformationMessage: addInformationMessage,
  addErrorMessage: addErrorMessage,
  addSuccessMessage: addSuccessMessage,
  clearMessages: clearMessages,
  builtInStore: require('./built-in-store')
};
