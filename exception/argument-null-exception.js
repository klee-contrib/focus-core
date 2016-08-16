'use strict';

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }

var CustomException = require('./custom-exception');
/**
* Class standing for the NotImplemented exceptions.
*/

var ArgumentNullException = function (_CustomException) {
    _inherits(ArgumentNullException, _CustomException);

    /**
    * Exception constructor..
    * @param message {string} - Exception message.
    * @param options {object} - Object to add to the exception.
    */
    function ArgumentNullException(message, options) {
        _classCallCheck(this, ArgumentNullException);

        return _possibleConstructorReturn(this, _CustomException.call(this, 'ArgumentNullException', message, options));
    }

    return ArgumentNullException;
}(CustomException);

module.exports = ArgumentNullException;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInByb2Nlc3Nvci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEsSUFBTSxrQkFBa0IsUUFBUSxvQkFBUixDQUF4QjtBQUNBOzs7O0lBR00scUI7OztBQUNGOzs7OztBQUtBLG1DQUFZLE9BQVosRUFBcUIsT0FBckIsRUFBNkI7QUFBQTs7QUFBQSxnREFDekIsNEJBQU0sdUJBQU4sRUFBK0IsT0FBL0IsRUFBd0MsT0FBeEMsQ0FEeUI7QUFFNUI7OztFQVIrQixlOztBQVdwQyxPQUFPLE9BQVAsR0FBaUIscUJBQWpCIiwiZmlsZSI6InByb2Nlc3Nvci5qcyIsInNvdXJjZXNDb250ZW50IjpbImNvbnN0IEN1c3RvbUV4Y2VwdGlvbiA9IHJlcXVpcmUoJy4vY3VzdG9tLWV4Y2VwdGlvbicpO1xyXG4vKipcclxuKiBDbGFzcyBzdGFuZGluZyBmb3IgdGhlIE5vdEltcGxlbWVudGVkIGV4Y2VwdGlvbnMuXHJcbiovXHJcbmNsYXNzIEFyZ3VtZW50TnVsbEV4Y2VwdGlvbiBleHRlbmRzIEN1c3RvbUV4Y2VwdGlvbntcclxuICAgIC8qKlxyXG4gICAgKiBFeGNlcHRpb24gY29uc3RydWN0b3IuLlxyXG4gICAgKiBAcGFyYW0gbWVzc2FnZSB7c3RyaW5nfSAtIEV4Y2VwdGlvbiBtZXNzYWdlLlxyXG4gICAgKiBAcGFyYW0gb3B0aW9ucyB7b2JqZWN0fSAtIE9iamVjdCB0byBhZGQgdG8gdGhlIGV4Y2VwdGlvbi5cclxuICAgICovXHJcbiAgICBjb25zdHJ1Y3RvcihtZXNzYWdlLCBvcHRpb25zKXtcclxuICAgICAgICBzdXBlcignQXJndW1lbnROdWxsRXhjZXB0aW9uJywgbWVzc2FnZSwgb3B0aW9ucyk7XHJcbiAgICB9XHJcbn1cclxuXHJcbm1vZHVsZS5leHBvcnRzID0gQXJndW1lbnROdWxsRXhjZXB0aW9uO1xyXG4iXX0=