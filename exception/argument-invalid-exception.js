import CustomException from './custom-exception';
/**
* Class standing for the NotImplemented exceptions.
*/
class ArgumentInvalidException extends CustomException {
    /**
	* Exception constructor.
	* @param {string} message  - Exception message.
	* @param {object} options  - Object to add to the exception.
	*/
    constructor(message, options) {
        super('ArgumentInvalidException', message, options);
    }
}

export default ArgumentInvalidException;
