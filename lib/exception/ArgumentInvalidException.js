"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var CustomException = require('./CustomException');
/** 
 * Class standing for the NotImplemented exceptions.
 */

var ArgumentInvalidException = (function (_CustomException) {
	_inherits(ArgumentInvalidException, _CustomException);

	/**
  * Exception constructor..
  * @param messgae {string} - Exception message.
  * @param options {object} - Object to add to the exception.
  */

	function ArgumentInvalidException(message, options) {
		_classCallCheck(this, ArgumentInvalidException);

		_CustomException.call(this, "ArgumentInvalidException", message, options);
	}

	return ArgumentInvalidException;
})(CustomException);

module.exports = ArgumentInvalidException;