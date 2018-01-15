import dispatcher from '../dispatcher';
import isString from 'lodash/lang/isString';
import builtInStore from './built-in-store';

/**
 * Transform the message into objet if it is a string.
 * @param {[string, object]} message - The message to display (object or string).
 * @returns {object} - The well constructed message.
 */
function _parseString(message) {
    if (isString(message)) {
        message = { content: message };
    }
    return message;
}

/**
 * Add a message.
 * @param {object} message - The message object.
 */
function addMessage(message) {
    dispatcher.handleServerAction({
        data: { message: message },
        type: 'push'
    });
}

/**
 * Add an error message.
 * @param {object} message - The message content.
 */
function addErrorMessage(message) {
    message = _parseString(message);
    message.type = 'error';
    addMessage(message);
}
/**
 * Add a warning message.
 * @param {object} message - The message content.
 */
function addWarningMessage(message) {
    message = _parseString(message);
    message.type = 'warning';
    addMessage(message);
}

/**
 * Add an information message.
 * @param {object} message - The message content.
 */
function addInformationMessage(message) {
    message = _parseString(message);
    message.type = 'info';
    addMessage(message);
}

/**
 * Add a success message.
 * @param {object} message - The message content.
 */
function addSuccessMessage(message) {
    message = _parseString(message);
    message.type = 'success';
    addMessage(message);
}

function clearMessages() {
    dispatcher.handleServerAction({ data: { messages: {} }, type: 'clear' });
}

export {
    addMessage,
    addWarningMessage,
    addInformationMessage,
    addErrorMessage,
    addSuccessMessage,
    clearMessages,
    builtInStore
};

export default {
    addMessage,
    addWarningMessage,
    addInformationMessage,
    addErrorMessage,
    addSuccessMessage,
    clearMessages,
    builtInStore
};
