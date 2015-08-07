var CustomException = require('./CustomException');
/** 
 * Class standing for the NotImplemented exceptions.
 */
class ArgumentInvalidException extends CustomException {
	/**
	 * Exception constructor..
	 * @param messgae {string} - Exception message.
	 * @param options {object} - Object to add to the exception.
	 */
	constructor(message, options) {
		super("ArgumentInvalidException", message, options);
	}
}

module.exports = ArgumentInvalidException;
