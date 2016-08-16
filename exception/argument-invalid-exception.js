'use strict';

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }

var CustomException = require('./custom-exception');
/**
* Class standing for the NotImplemented exceptions.
*/

var ArgumentInvalidException = function (_CustomException) {
	_inherits(ArgumentInvalidException, _CustomException);

	/**
 * Exception constructor.
 * @param {string} message  - Exception message.
 * @param {object} options  - Object to add to the exception.
 */
	function ArgumentInvalidException(message, options) {
		_classCallCheck(this, ArgumentInvalidException);

		return _possibleConstructorReturn(this, _CustomException.call(this, 'ArgumentInvalidException', message, options));
	}

	return ArgumentInvalidException;
}(CustomException);

module.exports = ArgumentInvalidException;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInByb2Nlc3Nvci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEsSUFBTSxrQkFBa0IsUUFBUSxvQkFBUixDQUF4QjtBQUNBOzs7O0lBR00sd0I7OztBQUNMOzs7OztBQUtBLG1DQUFZLE9BQVosRUFBcUIsT0FBckIsRUFBOEI7QUFBQTs7QUFBQSwwQ0FDN0IsNEJBQU0sMEJBQU4sRUFBa0MsT0FBbEMsRUFBMkMsT0FBM0MsQ0FENkI7QUFFN0I7OztFQVJxQyxlOztBQVd2QyxPQUFPLE9BQVAsR0FBaUIsd0JBQWpCIiwiZmlsZSI6InByb2Nlc3Nvci5qcyIsInNvdXJjZXNDb250ZW50IjpbImNvbnN0IEN1c3RvbUV4Y2VwdGlvbiA9IHJlcXVpcmUoJy4vY3VzdG9tLWV4Y2VwdGlvbicpO1xyXG4vKipcclxuKiBDbGFzcyBzdGFuZGluZyBmb3IgdGhlIE5vdEltcGxlbWVudGVkIGV4Y2VwdGlvbnMuXHJcbiovXHJcbmNsYXNzIEFyZ3VtZW50SW52YWxpZEV4Y2VwdGlvbiBleHRlbmRzIEN1c3RvbUV4Y2VwdGlvbiB7XHJcblx0LyoqXHJcblx0KiBFeGNlcHRpb24gY29uc3RydWN0b3IuXHJcblx0KiBAcGFyYW0ge3N0cmluZ30gbWVzc2FnZSAgLSBFeGNlcHRpb24gbWVzc2FnZS5cclxuXHQqIEBwYXJhbSB7b2JqZWN0fSBvcHRpb25zICAtIE9iamVjdCB0byBhZGQgdG8gdGhlIGV4Y2VwdGlvbi5cclxuXHQqL1xyXG5cdGNvbnN0cnVjdG9yKG1lc3NhZ2UsIG9wdGlvbnMpIHtcclxuXHRcdHN1cGVyKCdBcmd1bWVudEludmFsaWRFeGNlcHRpb24nLCBtZXNzYWdlLCBvcHRpb25zKTtcclxuXHR9XHJcbn1cclxuXHJcbm1vZHVsZS5leHBvcnRzID0gQXJndW1lbnRJbnZhbGlkRXhjZXB0aW9uO1xyXG4iXX0=