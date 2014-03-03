/*global i18n*/
var DependencyException = require('./custom_exception').DependencyException;
var regex = {
	email: /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
	number: /^-?\d+(?:\.d*)?(?:e[+\-]?\d+)?$/i
};

//Function to test an email.
function emailValidation(emailToValidate, options) {
	options = options || options;
	return regex.email.test(emailToValidate);
}

//Function to test the length of a string.
function stringLength(stringToTest, options) {
	if ('string' !== typeof stringToTest) {
		return false;
	}
	options = options || {};
	//console.log(options);
	var isMinLength = options.minLength ? stringToTest.length > options.minLength : true;
	var isMaxLength = options.maxLength ? stringToTest.length < options.maxLength : true;
	return isMinLength && isMaxLength;
}
//Function to  validate that an input is a number.
function numberValidation(numberToValidate, options) {
	options = options || options;
	numberToValidate = '' + numberToValidate; //Cast it into a number.
	return regex.number.test(numberToValidate);
}

//Validate a property, a property shoul be as follow: `{name: "field_name",value: "field_value", validators: [{...}] }`
var validate = function(property, validators) {
	//console.log("validate", property, validators);
	var errors, res, validator, _i, _len;
	errors = [];
	if (validators) {
		for (_i = 0, _len = validators.length; _i < _len; _i++) {
			validator = validators[_i];
			res = validateProperty(property, validator);
			if (res != null) {
				errors.push(res);
			}
		}
	}
	return {
		name: property.name,
		value: property.value,
		isValid: errors.length === 0,
		errors: errors
	};
};

var validateProperty = function(property, validator) {
	var isValid;
	if (validator == null) {
		return void 0;
	}
	if (property == null) {
		return void 0;
	}
	isValid = (function() {
		switch (validator.type) {
			case "required":
				var prevalidString = property.value === "" ? false : true;
				var prevalidDate = true;
				return validator.value === true ? (property.value != null && prevalidString && prevalidDate) : true;
			case "regex":
				return validator.value.test(property.value);
			case "email":
				return emailValidation(property.value, validator.options);
			case "number":
				return numberValidation(property.value, validator.options);
			case "string":
				return stringLength(property.value, validator.options);
			case "function":
				return validator.value(property.value, validator.options);
			default:
				return void 0;
		}
	})();
	if(isValid === undefined || isValid === null){
		console.warn('The validator of type: ' + validator.type + ' is not defined');//Todo: call the logger.
	}
	else if (isValid === false) {

		//Add the name of the property.
		return getErrorLalel(validator.type, property.name ,validator.options);//"The property " + property.name + " is invalid.";
	}
};

function getErrorLalel(type, fieldName, options) {
	options = options || {};
	if(!i18n){throw new DependencyException("Dependency not resolved: i18n.js");}
	var translationKey = options.translationKey ? options.translationKey : "domain.validation."+ type;
	return i18n.translate(translationKey, {fieldName: fieldName, options : options});
	/*var message = (function() {
		switch (type) {
			case "required":
				return i18n.translate();
			case "regex":
				return validator.value.test(property.value);
			case "email":
				return emailValidation(property.value, validator.options);
			case "number":
				return numberValidation(property.value, validator.options);
			case "string":
				return stringLength(property.value, validator.options);
			case "function":
				return validator.value(property.value, validator.options);
			default:
				return void 0;
		}
	})();*/
}

// Validations functions.
module.exports = {
	email: emailValidation,
	stringLength: stringLength,
	number: numberValidation,
	validate: validate
};