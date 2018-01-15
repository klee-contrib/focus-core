import isUndefined from 'lodash/lang/isUndefined';
import isNull from 'lodash/lang/isNull';
import isNaN from 'lodash/lang/isNaN';
import isNumber from 'lodash/lang/isNumber';

/* Function to  validate that an input is a number.
 * @param  {string || number} numberToValidate - Number to validate with the function.
 * @param  {object} options = {}, Allow the caller to specify min and max values.
 * @return {boolean} True if the validator works.
 */
export default function numberValidation(numberToValidate, options = {}) {
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
