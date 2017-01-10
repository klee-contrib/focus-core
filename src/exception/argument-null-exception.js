import CustomException from './custom-exception';
/**
* Class standing for the NotImplemented exceptions.
*/
class ArgumentNullException extends CustomException {
    /**
    * Exception constructor..
    * @param message {string} - Exception message.
    * @param options {object} - Object to add to the exception.
    */
    constructor(message, options) {
        super('ArgumentNullException', message, options);
    }
}

export default ArgumentNullException;
