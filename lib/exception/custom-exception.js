/**
* Classe standing for custom exception.
* @see https://gist.github.com/daliwali/09ca19032ab192524dc6
*/
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var CustomException = (function (_Error) {
    _inherits(CustomException, _Error);

    function CustomException(name, message, options) {
        _classCallCheck(this, CustomException);

        _Error.call(this);
        if (Error.hasOwnProperty('captureStackTrace')) {
            Error.captureStackTrace(this, this.constructor);
        } else {
            Object.defineProperty(this, 'stack', {
                value: new Error().stack
            });
        }
        Object.defineProperty(this, 'message', {
            value: message
        });
        this.options = options;
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
})(Error);

module.exports = CustomException;