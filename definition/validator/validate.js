'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; //Dependency

//Focus validators


var _exception = require('../../exception');

var _objectAssign = require('object-assign');

var _objectAssign2 = _interopRequireDefault(_objectAssign);

var _translation = require('../../translation');

var _email = require('./email');

var _email2 = _interopRequireDefault(_email);

var _number = require('./number');

var _number2 = _interopRequireDefault(_number);

var _stringLength = require('./string-length');

var _stringLength2 = _interopRequireDefault(_stringLength);

var _date = require('./date');

var _date2 = _interopRequireDefault(_date);

var _lang = require('lodash/lang');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
* Validae a property given validators.
* @param  {object} property   - Property to validate which should be as follows: `{name: "field_name",value: "field_value", validators: [{...}] }`.
* @param  {array} validators - The validators to apply on the property.
* @return {object} - The validation status.
*/
function validate(property, validators) {
    //console.log("validate", property, validators);
    var errors = [],
        res = void 0,
        validator = void 0;
    if (validators) {
        for (var i = 0, _len = validators.length; i < _len; i++) {
            validator = validators[i];
            res = validateProperty(property, validator);
            if (!(0, _lang.isNull)(res) && !(0, _lang.isUndefined)(res)) {
                errors.push(res);
            }
        }
    }
    //Check what's the good type to return.
    return {
        name: property.name,
        value: property.value,
        isValid: 0 === errors.length,
        errors: errors
    };
}

/**
* Validate a property.
* @param  {object} property  - The property to validate.
* @param  {function} validator - The validator to apply.
* @return {object} - The property validation status.
*/
function validateProperty(property, validator) {
    var isValid = void 0;
    if (!validator) {
        return void 0;
    }
    if (!property) {
        return void 0;
    }
    var value = property.value;
    var options = validator.options;

    var isValueNullOrUndefined = (0, _lang.isNull)(value) || (0, _lang.isUndefined)(value);
    isValid = function () {
        switch (validator.type) {
            case 'required':
                var prevalidString = '' === property.value ? false : true;
                var prevalidDate = true;
                return true === validator.value ? !(0, _lang.isNull)(value) && !(0, _lang.isUndefined)(value) && prevalidString && prevalidDate : true;
            case 'regex':
                if (isValueNullOrUndefined) {
                    return true;
                }
                return validator.value.test(value);
            case 'email':
                if (isValueNullOrUndefined) {
                    return true;
                }
                return (0, _email2.default)(value, options);
            case 'number':
                return (0, _number2.default)(value, options);
            case 'string':
                var stringToValidate = value || '';
                return (0, _stringLength2.default)(stringToValidate, options);
            case 'date':
                return (0, _date2.default)(value, options);
            case 'function':
                return validator.value(value, options);
            default:
                return void 0;
        }
    }();
    if ((0, _lang.isUndefined)(isValid) || (0, _lang.isNull)(isValid)) {
        console.warn('The validator of type: ' + validator.tye + ' is not defined');
    } else if (false === isValid) {
        //Add the name of the property.
        return getErrorLabel(validator.type, property.modelName + '.' + property.name, options); //"The property " + property.name + " is invalid.";
    }
}
/**
 * Get the error label from a type and a field name.
 * @param  {string} type      - The type name.
 * @param  {string} fieldName - The field name.
 * @param  {object} options - The options to put such as the translationKey which could be defined in the domain.
 * @return {string} The formatted error.
 */
function getErrorLabel(type, fieldName) {
    var options = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];

    options = options || {};
    var translationKey = options.translationKey ? options.translationKey : 'domain.validation.' + type;
    var opts = _extends({ fieldName: (0, _translation.translate)(fieldName) }, options);
    return (0, _translation.translate)(translationKey, opts);
}

exports.default = validate;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,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NkJBQXVDLFVBQVUsR0FBakQ7QUFDSCxLQUZELE1BRU8sSUFBSSxVQUFVLE9BQWQsRUFBdUI7QUFDMUI7QUFDQSxlQUFPLGNBQWMsVUFBVSxJQUF4QixFQUE4QixTQUFTLFNBQVQsR0FBcUIsR0FBckIsR0FBMkIsU0FBUyxJQUFsRSxFQUF3RSxPQUF4RSxDQUFQLENBRjBCLENBRStEO0FBQzVGO0FBQ0o7QUFDRDs7Ozs7OztBQU9BLFNBQVMsYUFBVCxDQUF1QixJQUF2QixFQUE2QixTQUE3QixFQUFzRDtBQUFBLFFBQWQsT0FBYyx5REFBSixFQUFJOztBQUNsRCxjQUFVLFdBQVcsRUFBckI7QUFDQSxRQUFNLGlCQUFpQixRQUFRLGNBQVIsR0FBeUIsUUFBUSxjQUFqQywwQkFBdUUsSUFBOUY7QUFDQSxRQUFNLGtCQUFRLFdBQVcsNEJBQVUsU0FBVixDQUFuQixJQUE0QyxPQUE1QyxDQUFOO0FBQ0EsV0FBTyw0QkFBVSxjQUFWLEVBQTBCLElBQTFCLENBQVA7QUFDSDs7a0JBRWMsUSIsImZpbGUiOiJwcm9jZXNzb3IuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvL0RlcGVuZGVuY3lcclxuaW1wb3J0IHtEZXBlbmRlbmN5RXhjZXB0aW9ufSBmcm9tICcuLi8uLi9leGNlcHRpb24nO1xyXG5pbXBvcnQgYXNzaWduIGZyb20gJ29iamVjdC1hc3NpZ24nO1xyXG5pbXBvcnQge3RyYW5zbGF0ZX0gZnJvbSAnLi4vLi4vdHJhbnNsYXRpb24nO1xyXG4vL0ZvY3VzIHZhbGlkYXRvcnNcclxuaW1wb3J0IGVtYWlsVmFsaWRhdGlvbiBmcm9tICcuL2VtYWlsJztcclxuaW1wb3J0IG51bWJlclZhbGlkYXRpb24gZnJvbSAnLi9udW1iZXInO1xyXG5pbXBvcnQgc3RyaW5nTGVuZ3RoIGZyb20gJy4vc3RyaW5nLWxlbmd0aCc7XHJcbmltcG9ydCBkYXRlVmFsaWRhdGlvbiBmcm9tICcuL2RhdGUnO1xyXG5pbXBvcnQge2lzTnVsbCwgaXNVbmRlZmluZWR9IGZyb20gJ2xvZGFzaC9sYW5nJztcclxuXHJcbi8qKlxyXG4qIFZhbGlkYWUgYSBwcm9wZXJ0eSBnaXZlbiB2YWxpZGF0b3JzLlxyXG4qIEBwYXJhbSAge29iamVjdH0gcHJvcGVydHkgICAtIFByb3BlcnR5IHRvIHZhbGlkYXRlIHdoaWNoIHNob3VsZCBiZSBhcyBmb2xsb3dzOiBge25hbWU6IFwiZmllbGRfbmFtZVwiLHZhbHVlOiBcImZpZWxkX3ZhbHVlXCIsIHZhbGlkYXRvcnM6IFt7Li4ufV0gfWAuXHJcbiogQHBhcmFtICB7YXJyYXl9IHZhbGlkYXRvcnMgLSBUaGUgdmFsaWRhdG9ycyB0byBhcHBseSBvbiB0aGUgcHJvcGVydHkuXHJcbiogQHJldHVybiB7b2JqZWN0fSAtIFRoZSB2YWxpZGF0aW9uIHN0YXR1cy5cclxuKi9cclxuZnVuY3Rpb24gdmFsaWRhdGUocHJvcGVydHksIHZhbGlkYXRvcnMpIHtcclxuICAgIC8vY29uc29sZS5sb2coXCJ2YWxpZGF0ZVwiLCBwcm9wZXJ0eSwgdmFsaWRhdG9ycyk7XHJcbiAgICBsZXQgZXJyb3JzID0gW10sIHJlcywgdmFsaWRhdG9yO1xyXG4gICAgaWYgKHZhbGlkYXRvcnMpIHtcclxuICAgICAgICBmb3IgKGxldCBpID0gMCwgX2xlbiA9IHZhbGlkYXRvcnMubGVuZ3RoOyBpIDwgX2xlbjsgaSsrKSB7XHJcbiAgICAgICAgICAgIHZhbGlkYXRvciA9IHZhbGlkYXRvcnNbaV07XHJcbiAgICAgICAgICAgIHJlcyA9IHZhbGlkYXRlUHJvcGVydHkocHJvcGVydHksIHZhbGlkYXRvcik7XHJcbiAgICAgICAgICAgIGlmICghaXNOdWxsKHJlcykgJiYgIWlzVW5kZWZpbmVkKHJlcykpIHtcclxuICAgICAgICAgICAgICAgIGVycm9ycy5wdXNoKHJlcyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICAvL0NoZWNrIHdoYXQncyB0aGUgZ29vZCB0eXBlIHRvIHJldHVybi5cclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgbmFtZTogcHJvcGVydHkubmFtZSxcclxuICAgICAgICB2YWx1ZTogcHJvcGVydHkudmFsdWUsXHJcbiAgICAgICAgaXNWYWxpZDogMCA9PT0gZXJyb3JzLmxlbmd0aCxcclxuICAgICAgICBlcnJvcnM6IGVycm9yc1xyXG4gICAgfTtcclxufVxyXG5cclxuLyoqXHJcbiogVmFsaWRhdGUgYSBwcm9wZXJ0eS5cclxuKiBAcGFyYW0gIHtvYmplY3R9IHByb3BlcnR5ICAtIFRoZSBwcm9wZXJ0eSB0byB2YWxpZGF0ZS5cclxuKiBAcGFyYW0gIHtmdW5jdGlvbn0gdmFsaWRhdG9yIC0gVGhlIHZhbGlkYXRvciB0byBhcHBseS5cclxuKiBAcmV0dXJuIHtvYmplY3R9IC0gVGhlIHByb3BlcnR5IHZhbGlkYXRpb24gc3RhdHVzLlxyXG4qL1xyXG5mdW5jdGlvbiB2YWxpZGF0ZVByb3BlcnR5KHByb3BlcnR5LCB2YWxpZGF0b3IpIHtcclxuICAgIGxldCBpc1ZhbGlkO1xyXG4gICAgaWYgKCF2YWxpZGF0b3IpIHtcclxuICAgICAgICByZXR1cm4gdm9pZCAwO1xyXG4gICAgfVxyXG4gICAgaWYgKCFwcm9wZXJ0eSkge1xyXG4gICAgICAgIHJldHVybiB2b2lkIDA7XHJcbiAgICB9XHJcbiAgICBjb25zdCB7dmFsdWV9ID0gcHJvcGVydHk7XHJcbiAgICBjb25zdCB7b3B0aW9uc30gPSB2YWxpZGF0b3I7XHJcbiAgICBjb25zdCBpc1ZhbHVlTnVsbE9yVW5kZWZpbmVkID0gaXNOdWxsKHZhbHVlKSB8fCBpc1VuZGVmaW5lZCh2YWx1ZSApO1xyXG4gICAgaXNWYWxpZCA9ICgoKSA9PiB7XHJcbiAgICAgICAgc3dpdGNoICh2YWxpZGF0b3IudHlwZSkge1xyXG4gICAgICAgICAgICBjYXNlICdyZXF1aXJlZCc6XHJcbiAgICAgICAgICAgICAgICBjb25zdCBwcmV2YWxpZFN0cmluZyA9ICcnID09PSBwcm9wZXJ0eS52YWx1ZSA/IGZhbHNlIDogdHJ1ZTtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHByZXZhbGlkRGF0ZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZSA9PT0gdmFsaWRhdG9yLnZhbHVlID8gKCFpc051bGwodmFsdWUpICYmICFpc1VuZGVmaW5lZCh2YWx1ZSkgJiYgcHJldmFsaWRTdHJpbmcgJiYgcHJldmFsaWREYXRlKSA6IHRydWU7XHJcbiAgICAgICAgICAgIGNhc2UgJ3JlZ2V4JzpcclxuICAgICAgICAgICAgICAgIGlmIChpc1ZhbHVlTnVsbE9yVW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdmFsaWRhdG9yLnZhbHVlLnRlc3QodmFsdWUpO1xyXG4gICAgICAgICAgICBjYXNlICdlbWFpbCc6XHJcbiAgICAgICAgICAgICAgICBpZiAoaXNWYWx1ZU51bGxPclVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGVtYWlsVmFsaWRhdGlvbih2YWx1ZSwgb3B0aW9ucyk7XHJcbiAgICAgICAgICAgIGNhc2UgJ251bWJlcic6XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbnVtYmVyVmFsaWRhdGlvbih2YWx1ZSwgb3B0aW9ucyk7XHJcbiAgICAgICAgICAgIGNhc2UgJ3N0cmluZyc6XHJcbiAgICAgICAgICAgICAgICBjb25zdCBzdHJpbmdUb1ZhbGlkYXRlID0gdmFsdWUgfHwgJyc7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gc3RyaW5nTGVuZ3RoKHN0cmluZ1RvVmFsaWRhdGUsIG9wdGlvbnMpO1xyXG4gICAgICAgICAgICBjYXNlICdkYXRlJzpcclxuICAgICAgICAgICAgICAgIHJldHVybiBkYXRlVmFsaWRhdGlvbih2YWx1ZSwgb3B0aW9ucyk7XHJcbiAgICAgICAgICAgIGNhc2UgJ2Z1bmN0aW9uJzpcclxuICAgICAgICAgICAgICAgIHJldHVybiB2YWxpZGF0b3IudmFsdWUodmFsdWUsIG9wdGlvbnMpO1xyXG4gICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHZvaWQgMDtcclxuICAgICAgICB9XHJcbiAgICB9KSgpO1xyXG4gICAgaWYgKGlzVW5kZWZpbmVkKGlzVmFsaWQpIHx8IGlzTnVsbChpc1ZhbGlkKSkge1xyXG4gICAgICAgIGNvbnNvbGUud2FybihgVGhlIHZhbGlkYXRvciBvZiB0eXBlOiAke3ZhbGlkYXRvci50eWV9IGlzIG5vdCBkZWZpbmVkYCk7XHJcbiAgICB9IGVsc2UgaWYgKGZhbHNlID09PSBpc1ZhbGlkKSB7XHJcbiAgICAgICAgLy9BZGQgdGhlIG5hbWUgb2YgdGhlIHByb3BlcnR5LlxyXG4gICAgICAgIHJldHVybiBnZXRFcnJvckxhYmVsKHZhbGlkYXRvci50eXBlLCBwcm9wZXJ0eS5tb2RlbE5hbWUgKyAnLicgKyBwcm9wZXJ0eS5uYW1lLCBvcHRpb25zKTsgLy9cIlRoZSBwcm9wZXJ0eSBcIiArIHByb3BlcnR5Lm5hbWUgKyBcIiBpcyBpbnZhbGlkLlwiO1xyXG4gICAgfVxyXG59XHJcbi8qKlxyXG4gKiBHZXQgdGhlIGVycm9yIGxhYmVsIGZyb20gYSB0eXBlIGFuZCBhIGZpZWxkIG5hbWUuXHJcbiAqIEBwYXJhbSAge3N0cmluZ30gdHlwZSAgICAgIC0gVGhlIHR5cGUgbmFtZS5cclxuICogQHBhcmFtICB7c3RyaW5nfSBmaWVsZE5hbWUgLSBUaGUgZmllbGQgbmFtZS5cclxuICogQHBhcmFtICB7b2JqZWN0fSBvcHRpb25zIC0gVGhlIG9wdGlvbnMgdG8gcHV0IHN1Y2ggYXMgdGhlIHRyYW5zbGF0aW9uS2V5IHdoaWNoIGNvdWxkIGJlIGRlZmluZWQgaW4gdGhlIGRvbWFpbi5cclxuICogQHJldHVybiB7c3RyaW5nfSBUaGUgZm9ybWF0dGVkIGVycm9yLlxyXG4gKi9cclxuZnVuY3Rpb24gZ2V0RXJyb3JMYWJlbCh0eXBlLCBmaWVsZE5hbWUsIG9wdGlvbnMgPSB7fSkge1xyXG4gICAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XHJcbiAgICBjb25zdCB0cmFuc2xhdGlvbktleSA9IG9wdGlvbnMudHJhbnNsYXRpb25LZXkgPyBvcHRpb25zLnRyYW5zbGF0aW9uS2V5IDogYGRvbWFpbi52YWxpZGF0aW9uLiR7dHlwZX1gO1xyXG4gICAgY29uc3Qgb3B0cyA9IHtmaWVsZE5hbWU6IHRyYW5zbGF0ZShmaWVsZE5hbWUpLCAuLi5vcHRpb25zfTtcclxuICAgIHJldHVybiB0cmFuc2xhdGUodHJhbnNsYXRpb25LZXksIG9wdHMpO1xyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCB2YWxpZGF0ZTtcclxuIl19