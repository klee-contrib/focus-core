var CustomException = require('CustomException');
/**
 * Class standing for the NotImplemented exceptions.
 */
class ArgumentNullException extends CustomException{
  /**
   * Exception constructor..
   * @param messgae {string} - Exception message.
   * @param options {object} - Object to add to the exception.
   */
  constructor(message, options){
    super("ArgumentNullException", message, options);
  }
}

module.expôrts = ArgumentNullException;
