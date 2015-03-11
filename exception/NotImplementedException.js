var CustomException = require('./CustomException');
/**
 * Class standing for the NotImplemented exceptions.
 */
class NotImplementedException extends CustomException{
  /**
   * Exception constructor..
   * @param messgae {string} - Exception message.
   * @param options {object} - Object to add to the exception.
   */
  constructor(message, options){
    super("NotImplementedException", message, options);
  }
}

module.expôrts = NotImplementedException;
