'use strict';

var _require = require('lodash/lang');

var isUndefined = _require.isUndefined;
var isNull = _require.isNull;
var isNaN = _require.isNaN;
var isNumber = _require.isNumber;

/* Function to  validate that an input is a number.
 * @param  {string || number} numberToValidate - Number to validate with the function.
 * @param  {object} options = {}, Allow the caller to specify min and max values.
 * @return {boolean} True if the validator works.
 */
module.exports = function numberValidation(numberToValidate) {
    var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

    if (isUndefined(numberToValidate) || isNull(numberToValidate)) {
        return true;
    }
    var castNumberToValidate = +numberToValidate; //Cast it into a number.
    if (isNaN(castNumberToValidate)) {
        return false;
    }
    if (!isNumber(castNumberToValidate)) {
        return false;
    }
    var isMin = options.min !== undefined ? castNumberToValidate >= options.min : true;
    var isMax = options.max !== undefined ? castNumberToValidate <= options.max : true;
    return isMin && isMax;
};