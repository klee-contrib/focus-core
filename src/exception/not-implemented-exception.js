const CustomException = require('./custom-exception');
/**
* Class standing for the NotImplemented exceptions.
*/
class NotImplementedException extends CustomException{
    /**
    * Exception constructor.
    * @param message {string} - Exception message.
    * @param options {object} - Object to add to the exception.
    */
    constructor(message, options){
        super('NotImplementedException', message, options);
    }
}

module.exports = NotImplementedException;
