'use strict';

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }

var CustomException = require('./custom-exception');
/**
* Class standing for the NotImplemented exceptions.
*/

var NotImplementedException = function (_CustomException) {
    _inherits(NotImplementedException, _CustomException);

    /**
    * Exception constructor.
    * @param message {string} - Exception message.
    * @param options {object} - Object to add to the exception.
    */
    function NotImplementedException(message, options) {
        _classCallCheck(this, NotImplementedException);

        return _possibleConstructorReturn(this, _CustomException.call(this, 'NotImplementedException', message, options));
    }

    return NotImplementedException;
}(CustomException);

module.exports = NotImplementedException;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInByb2Nlc3Nvci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEsSUFBTSxrQkFBa0IsUUFBUSxvQkFBUixDQUF4QjtBQUNBOzs7O0lBR00sdUI7OztBQUNGOzs7OztBQUtBLHFDQUFZLE9BQVosRUFBcUIsT0FBckIsRUFBNkI7QUFBQTs7QUFBQSxnREFDekIsNEJBQU0seUJBQU4sRUFBaUMsT0FBakMsRUFBMEMsT0FBMUMsQ0FEeUI7QUFFNUI7OztFQVJpQyxlOztBQVd0QyxPQUFPLE9BQVAsR0FBaUIsdUJBQWpCIiwiZmlsZSI6InByb2Nlc3Nvci5qcyIsInNvdXJjZXNDb250ZW50IjpbImNvbnN0IEN1c3RvbUV4Y2VwdGlvbiA9IHJlcXVpcmUoJy4vY3VzdG9tLWV4Y2VwdGlvbicpO1xyXG4vKipcclxuKiBDbGFzcyBzdGFuZGluZyBmb3IgdGhlIE5vdEltcGxlbWVudGVkIGV4Y2VwdGlvbnMuXHJcbiovXHJcbmNsYXNzIE5vdEltcGxlbWVudGVkRXhjZXB0aW9uIGV4dGVuZHMgQ3VzdG9tRXhjZXB0aW9ue1xyXG4gICAgLyoqXHJcbiAgICAqIEV4Y2VwdGlvbiBjb25zdHJ1Y3Rvci5cclxuICAgICogQHBhcmFtIG1lc3NhZ2Uge3N0cmluZ30gLSBFeGNlcHRpb24gbWVzc2FnZS5cclxuICAgICogQHBhcmFtIG9wdGlvbnMge29iamVjdH0gLSBPYmplY3QgdG8gYWRkIHRvIHRoZSBleGNlcHRpb24uXHJcbiAgICAqL1xyXG4gICAgY29uc3RydWN0b3IobWVzc2FnZSwgb3B0aW9ucyl7XHJcbiAgICAgICAgc3VwZXIoJ05vdEltcGxlbWVudGVkRXhjZXB0aW9uJywgbWVzc2FnZSwgb3B0aW9ucyk7XHJcbiAgICB9XHJcbn1cclxuXHJcbm1vZHVsZS5leHBvcnRzID0gTm90SW1wbGVtZW50ZWRFeGNlcHRpb247XHJcbiJdfQ==