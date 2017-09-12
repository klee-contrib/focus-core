//Dependency
import { DependencyException } from '../../exception';
import assign from 'object-assign';
import { translate } from '../../translation';
//Focus validators
import emailValidation from './email';
import numberValidation from './number';
import stringLength from './string-length';
import dateValidation from './date';
import isNull from 'lodash/lang/isNull';
import isUndefined from 'lodash/lang/isUndefined';

/**
* Validae a property given validators.
* @param  {object} property   - Property to validate which should be as follows: `{name: "field_name",value: "field_value", validators: [{...}] }`.
* @param  {array} validators - The validators to apply on the property.
* @return {object} - The validation status.
*/
function validate(property, validators) {
    //console.log("validate", property, validators);
    let errors = [], res, validator;
    if (validators) {
        for (let i = 0, _len = validators.length; i < _len; i++) {
            validator = validators[i];
            res = validateProperty(property, validator);
            if (!isNull(res) && !isUndefined(res)) {
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
    let isValid;
    if (!validator) {
        return void 0;
    }
    if (!property) {
        return void 0;
    }
    const { value } = property;
    const { options } = validator;
    const isValueNullOrUndefined = isNull(value) || isUndefined(value);
    isValid = (() => {
        switch (validator.type) {
            case 'required':
                const prevalidString = '' === property.value ? false : true;
                const prevalidDate = true;
                return true === validator.value ? (!isNull(value) && !isUndefined(value) && prevalidString && prevalidDate) : true;
            case 'regex':
                if (isValueNullOrUndefined) {
                    return true;
                }
                return validator.value.test(value);
            case 'email':
                if (isValueNullOrUndefined) {
                    return true;
                }
                return emailValidation(value, options);
            case 'number':
                return numberValidation(value, options);
            case 'string':
                const stringToValidate = value || '';
                return stringLength(stringToValidate, options);
            case 'date':
                return dateValidation(value, options);
            case 'function':
                return validator.value(value, options);
            default:
                return void 0;
        }
    })();
    if (isUndefined(isValid) || isNull(isValid)) {
        console.warn(`The validator of type: ${validator.type} is not defined`);
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
function getErrorLabel(type, fieldName, options = {}) {
    options = options || {};
    const translationKey = options.translationKey ? options.translationKey : `domain.validation.${type}`;
    const opts = { fieldName: translate(fieldName), ...options };
    return translate(translationKey, opts);
}

export default validate;
