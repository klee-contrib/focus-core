import CustomException from './custom-exception';
/**
* Class standing for the FocusException exceptions.
*/
class FocusException extends CustomException {
    /**
	* Exception constructor..
	* @param messgae {string} - Exception message.
	* @param options {object} - Object to add to the exception.
	*/
    constructor(message, options) {
        super('FocusException', message, options);
    }
}

export default FocusException;
