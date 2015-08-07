"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var CustomException = require('./CustomException');
/**
 * Class standing for the NotImplemented exceptions.
 */

var ArgumentNullException = (function (_CustomException) {
  _inherits(ArgumentNullException, _CustomException);

  /**
   * Exception constructor..
   * @param messgae {string} - Exception message.
   * @param options {object} - Object to add to the exception.
   */

  function ArgumentNullException(message, options) {
    _classCallCheck(this, ArgumentNullException);

    _CustomException.call(this, "ArgumentNullException", message, options);
  }

  return ArgumentNullException;
})(CustomException);

module.exports = ArgumentNullException;