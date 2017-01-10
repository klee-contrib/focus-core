import { isUndefined, isNull, isNaN, isNumber } from 'lodash';

/* Function to  validate that an input is a number.
 * @param  {string || number} numberToValidate - Number to validate with the function.
 * @param  {object} options = {}, Allow the caller to specify min and max values.
 * @return {boolean} True if the validator works.
 */
function numberValidation(numberToValidate, options = {}) {
    if (isUndefined(numberToValidate) || isNull(numberToValidate)) {
        return true;
    }
    let castNumberToValidate = +numberToValidate; //Cast it into a number.
    if (isNaN(castNumberToValidate)) {
        return false;
    }
    if (!isNumber(castNumberToValidate)) {
        return false;
    }
    let isMin = options.min !== undefined ? castNumberToValidate >= options.min : true;
    let isMax = options.max !== undefined ? castNumberToValidate <= options.max : true;
    return isMin && isMax;
}

export default numberValidation;