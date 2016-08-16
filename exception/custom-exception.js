'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }

/**
* Classe standing for custom exception.
* @see https://gist.github.com/daliwali/09ca19032ab192524dc6
*/
var CustomException = function (_Error) {
    _inherits(CustomException, _Error);

    function CustomException(name, message, options) {
        _classCallCheck(this, CustomException);

        var _this = _possibleConstructorReturn(this, _Error.call(this));

        if (Error.hasOwnProperty('captureStackTrace')) {
            Error.captureStackTrace(_this, _this.constructor);
        } else {
            Object.defineProperty(_this, 'stack', {
                value: new Error().stack
            });
        }
        Object.defineProperty(_this, 'message', {
            value: message
        });
        _this.options = options;
        return _this;
    }

    /**
    * Log the exception in the js console.
    */
    CustomException.prototype.log = function log() {
        console.error('name', this.name, 'message', this.message, 'options', this.options);
    };
    /**
     * Jsonify the exception.
     * @return {object} - The json exception.
     */


    CustomException.prototype.toJSON = function toJSON() {
        var name = this.name;
        var message = this.message;
        var options = this.options;

        return { name: name, message: message, options: options };
    };

    _createClass(CustomException, [{
        key: 'name',
        get: function get() {
            return this.constructor.name;
        }
    }]);

    return CustomException;
}(Error);

module.exports = CustomException;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInByb2Nlc3Nvci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFBQTs7OztJQUlNLGU7OztBQUNGLDZCQUFZLElBQVosRUFBa0IsT0FBbEIsRUFBMkIsT0FBM0IsRUFBbUM7QUFBQTs7QUFBQSxxREFDL0IsaUJBRCtCOztBQUUvQixZQUFJLE1BQU0sY0FBTixDQUFxQixtQkFBckIsQ0FBSixFQUE4QztBQUMxQyxrQkFBTSxpQkFBTixRQUE4QixNQUFLLFdBQW5DO0FBQ0gsU0FGRCxNQUVNO0FBQ0YsbUJBQU8sY0FBUCxRQUE0QixPQUE1QixFQUFxQztBQUNqQyx1QkFBUSxJQUFJLEtBQUosRUFBRCxDQUFjO0FBRFksYUFBckM7QUFHSDtBQUNELGVBQU8sY0FBUCxRQUE0QixTQUE1QixFQUF1QztBQUNuQyxtQkFBTztBQUQ0QixTQUF2QztBQUdBLGNBQUssT0FBTCxHQUFlLE9BQWY7QUFaK0I7QUFhbEM7O0FBSUQ7Ozs4QkFHQSxHLGtCQUFLO0FBQ0QsZ0JBQVEsS0FBUixDQUFjLE1BQWQsRUFBc0IsS0FBSyxJQUEzQixFQUFpQyxTQUFqQyxFQUE0QyxLQUFLLE9BQWpELEVBQTBELFNBQTFELEVBQXFFLEtBQUssT0FBMUU7QUFDSCxLO0FBQ0Q7Ozs7Ozs4QkFJQSxNLHFCQUFRO0FBQUEsWUFDRyxJQURILEdBQzZCLElBRDdCLENBQ0csSUFESDtBQUFBLFlBQ1MsT0FEVCxHQUM2QixJQUQ3QixDQUNTLE9BRFQ7QUFBQSxZQUNrQixPQURsQixHQUM2QixJQUQ3QixDQUNrQixPQURsQjs7QUFFSixlQUFPLEVBQUMsVUFBRCxFQUFPLGdCQUFQLEVBQWdCLGdCQUFoQixFQUFQO0FBQ0gsSzs7Ozs0QkFoQlc7QUFDUixtQkFBTyxLQUFLLFdBQUwsQ0FBaUIsSUFBeEI7QUFDSDs7OztFQWpCeUIsSzs7QUFvQzlCLE9BQU8sT0FBUCxHQUFpQixlQUFqQiIsImZpbGUiOiJwcm9jZXNzb3IuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcclxuKiBDbGFzc2Ugc3RhbmRpbmcgZm9yIGN1c3RvbSBleGNlcHRpb24uXHJcbiogQHNlZSBodHRwczovL2dpc3QuZ2l0aHViLmNvbS9kYWxpd2FsaS8wOWNhMTkwMzJhYjE5MjUyNGRjNlxyXG4qL1xyXG5jbGFzcyBDdXN0b21FeGNlcHRpb24gZXh0ZW5kcyBFcnJvcntcclxuICAgIGNvbnN0cnVjdG9yKG5hbWUsIG1lc3NhZ2UsIG9wdGlvbnMpe1xyXG4gICAgICAgIHN1cGVyKCk7XHJcbiAgICAgICAgaWYgKEVycm9yLmhhc093blByb3BlcnR5KCdjYXB0dXJlU3RhY2tUcmFjZScpKXtcclxuICAgICAgICAgICAgRXJyb3IuY2FwdHVyZVN0YWNrVHJhY2UodGhpcywgdGhpcy5jb25zdHJ1Y3Rvcik7XHJcbiAgICAgICAgfSBlbHNle1xyXG4gICAgICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkodGhpcywgJ3N0YWNrJywge1xyXG4gICAgICAgICAgICAgICAgdmFsdWU6IChuZXcgRXJyb3IoKSkuc3RhY2tcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0aGlzLCAnbWVzc2FnZScsIHtcclxuICAgICAgICAgICAgdmFsdWU6IG1lc3NhZ2VcclxuICAgICAgICB9KTtcclxuICAgICAgICB0aGlzLm9wdGlvbnMgPSBvcHRpb25zO1xyXG4gICAgfVxyXG4gICAgZ2V0IG5hbWUgKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmNvbnN0cnVjdG9yLm5hbWU7XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICogTG9nIHRoZSBleGNlcHRpb24gaW4gdGhlIGpzIGNvbnNvbGUuXHJcbiAgICAqL1xyXG4gICAgbG9nKCl7XHJcbiAgICAgICAgY29uc29sZS5lcnJvcignbmFtZScsIHRoaXMubmFtZSwgJ21lc3NhZ2UnLCB0aGlzLm1lc3NhZ2UsICdvcHRpb25zJywgdGhpcy5vcHRpb25zKTtcclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICogSnNvbmlmeSB0aGUgZXhjZXB0aW9uLlxyXG4gICAgICogQHJldHVybiB7b2JqZWN0fSAtIFRoZSBqc29uIGV4Y2VwdGlvbi5cclxuICAgICAqL1xyXG4gICAgdG9KU09OKCl7XHJcbiAgICAgICAgY29uc3Qge25hbWUsIG1lc3NhZ2UsIG9wdGlvbnN9ID0gdGhpcztcclxuICAgICAgICByZXR1cm4ge25hbWUsIG1lc3NhZ2UsIG9wdGlvbnN9O1xyXG4gICAgfVxyXG59XHJcblxyXG5cclxuXHJcbm1vZHVsZS5leHBvcnRzID0gQ3VzdG9tRXhjZXB0aW9uO1xyXG4iXX0=