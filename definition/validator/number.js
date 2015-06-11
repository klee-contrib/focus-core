const NUMBER_REGEX = /^-?\d+(?:\.d*)?(?:e[+\-]?\d+)?$/i;
let {isUndefined, isNull} = require('lodash/lang/isUndefined');

//Function to  validate that an input is a number.
module.exports = function numberValidation(numberToValidate, options) {
   options = options || {};
  if (_.isUndefined(numberToValidate) || _.isNull(numberToValidate)) {
    return true;
  }
  if (_.isNaN(numberToValidate)) {
    return false;
  }
  numberToValidate = +numberToValidate; //Cast it into a number.
  var isMin = options.min !== undefined ? numberToValidate >= options.min : true;
  var isMax = options.max !== undefined ? numberToValidate <= options.max : true;
  return isMin && isMax;
};
