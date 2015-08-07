//Dependency
let DependencyException = require("../../exception").DependencyException;
let assign = require('object-assign');

//Focus validators
let emailValidation = require('./email');
let numberValidation = require('./number');
let stringLength = require('./string-length');
let dateValidation = require('./date');

//Validate a property, a property shoul be as follow: `{name: "field_name",value: "field_value", validators: [{...}] }`
var validate = function validate(property, validators) {
  //console.log("validate", property, validators);
  var errors, res, validator, _i, _len;
  errors = [];
  if (validators) {
    for (_i = 0, _len = validators.length; _i < _len; _i++) {
      validator = validators[_i];
      res = validateProperty(property, validator);
      if (res !== null && res !== undefined) {
        errors.push(res);
      }
    }
  }
  //Check what's the good type to return.
  return {
    name: property.name,
    value: property.value,
    isValid: errors.length === 0,
    errors: errors
  };
};

function validateProperty(property, validator) {
  var isValid;
  if (!validator) {
    return void 0;
  }
  if (!property) {
    return void 0;
  }
  isValid = (function () {
    switch (validator.type) {
      case "required":
        var prevalidString = property.value === "" ? false : true;
        var prevalidDate = true;
        return validator.value === true ? (property.value !== null && property.value !== undefined && prevalidString && prevalidDate) : true;
      case "regex":
        if (property.value === undefined || property.value === null) {
          return true;
        }
        return validator.value.test(property.value);
      case "email":
        if (property.value === undefined || property.value === null) {
          return true;
        }
        return emailValidation(property.value, validator.options);
      case "number":
        return numberValidation(property.value, validator.options);
      case "string":
        var stringToValidate = property.value || "";
        return stringLength(stringToValidate, validator.options);
      case "date":
        return dateValidation(property.value, validator.options);
      case "function":
        return validator.value(property.value, validator.options);
      default:
        return void 0;
    }
  })();
  if (isValid === undefined || isValid === null) {
    console.warn('The validator of type: ' + validator.type + ' is not defined'); //Todo: call the logger.
  } else if (isValid === false) {

    //Add the name of the property.
    return getErrorLalel(validator.type, property.modelName + '.' + property.name, validator.options); //"The property " + property.name + " is invalid.";
  }
};

function getErrorLalel(type, fieldName, options) {
  options = options || {};
  let i18n = require('i18n');
  if (!i18n) {
    throw new DependencyException("Dependency not resolved: i18n.js");
  }
  var translationKey = options.translationKey ? options.translationKey : "domain.validation." + type;
  var opts = assign({fieldName: i18n.t(fieldName)}, options);
  return i18n.t(translationKey, opts);
}

module.exports = validate;
