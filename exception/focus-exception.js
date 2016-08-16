'use strict';

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }

var CustomException = require('./custom-exception');
/**
* Class standing for the FocusException exceptions.
*/

var FocusException = function (_CustomException) {
	_inherits(FocusException, _CustomException);

	/**
 * Exception constructor..
 * @param messgae {string} - Exception message.
 * @param options {object} - Object to add to the exception.
 */
	function FocusException(message, options) {
		_classCallCheck(this, FocusException);

		return _possibleConstructorReturn(this, _CustomException.call(this, 'FocusException', message, options));
	}

	return FocusException;
}(CustomException);

module.exports = FocusException;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInByb2Nlc3Nvci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEsSUFBTSxrQkFBa0IsUUFBUSxvQkFBUixDQUF4QjtBQUNBOzs7O0lBR00sYzs7O0FBQ0w7Ozs7O0FBS0EseUJBQVksT0FBWixFQUFxQixPQUFyQixFQUE4QjtBQUFBOztBQUFBLDBDQUM3Qiw0QkFBTSxnQkFBTixFQUF3QixPQUF4QixFQUFpQyxPQUFqQyxDQUQ2QjtBQUU3Qjs7O0VBUjJCLGU7O0FBVzdCLE9BQU8sT0FBUCxHQUFpQixjQUFqQiIsImZpbGUiOiJwcm9jZXNzb3IuanMiLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCBDdXN0b21FeGNlcHRpb24gPSByZXF1aXJlKCcuL2N1c3RvbS1leGNlcHRpb24nKTtcclxuLyoqXHJcbiogQ2xhc3Mgc3RhbmRpbmcgZm9yIHRoZSBGb2N1c0V4Y2VwdGlvbiBleGNlcHRpb25zLlxyXG4qL1xyXG5jbGFzcyBGb2N1c0V4Y2VwdGlvbiBleHRlbmRzIEN1c3RvbUV4Y2VwdGlvbiB7XHJcblx0LyoqXHJcblx0KiBFeGNlcHRpb24gY29uc3RydWN0b3IuLlxyXG5cdCogQHBhcmFtIG1lc3NnYWUge3N0cmluZ30gLSBFeGNlcHRpb24gbWVzc2FnZS5cclxuXHQqIEBwYXJhbSBvcHRpb25zIHtvYmplY3R9IC0gT2JqZWN0IHRvIGFkZCB0byB0aGUgZXhjZXB0aW9uLlxyXG5cdCovXHJcblx0Y29uc3RydWN0b3IobWVzc2FnZSwgb3B0aW9ucykge1xyXG5cdFx0c3VwZXIoJ0ZvY3VzRXhjZXB0aW9uJywgbWVzc2FnZSwgb3B0aW9ucyk7XHJcblx0fVxyXG59XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IEZvY3VzRXhjZXB0aW9uO1xyXG4iXX0=