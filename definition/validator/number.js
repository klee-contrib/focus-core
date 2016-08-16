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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInByb2Nlc3Nvci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztlQUE2QyxRQUFRLGFBQVIsQzs7SUFBeEMsVyxZQUFBLFc7SUFBYSxNLFlBQUEsTTtJQUFRLEssWUFBQSxLO0lBQU8sUSxZQUFBLFE7O0FBRWpDOzs7Ozs7QUFLQSxPQUFPLE9BQVAsR0FBaUIsU0FBUyxnQkFBVCxDQUEwQixnQkFBMUIsRUFBMEQ7QUFBQSxRQUFkLE9BQWMseURBQUosRUFBSTs7QUFDdkUsUUFBSSxZQUFZLGdCQUFaLEtBQWlDLE9BQU8sZ0JBQVAsQ0FBckMsRUFBK0Q7QUFDM0QsZUFBTyxJQUFQO0FBQ0g7QUFDRCxRQUFJLHVCQUF1QixDQUFDLGdCQUE1QixDQUp1RSxDQUl6QjtBQUM5QyxRQUFJLE1BQU0sb0JBQU4sQ0FBSixFQUFpQztBQUM3QixlQUFPLEtBQVA7QUFDSDtBQUNELFFBQUcsQ0FBQyxTQUFTLG9CQUFULENBQUosRUFBbUM7QUFDL0IsZUFBTyxLQUFQO0FBQ0g7QUFDRCxRQUFJLFFBQVEsUUFBUSxHQUFSLEtBQWdCLFNBQWhCLEdBQTRCLHdCQUF3QixRQUFRLEdBQTVELEdBQWtFLElBQTlFO0FBQ0EsUUFBSSxRQUFRLFFBQVEsR0FBUixLQUFnQixTQUFoQixHQUE0Qix3QkFBd0IsUUFBUSxHQUE1RCxHQUFrRSxJQUE5RTtBQUNBLFdBQU8sU0FBUyxLQUFoQjtBQUNILENBZEQiLCJmaWxlIjoicHJvY2Vzc29yLmpzIiwic291cmNlc0NvbnRlbnQiOlsibGV0IHtpc1VuZGVmaW5lZCwgaXNOdWxsLCBpc05hTiwgaXNOdW1iZXJ9ID0gcmVxdWlyZSgnbG9kYXNoL2xhbmcnKTtcclxuXHJcbi8qIEZ1bmN0aW9uIHRvICB2YWxpZGF0ZSB0aGF0IGFuIGlucHV0IGlzIGEgbnVtYmVyLlxyXG4gKiBAcGFyYW0gIHtzdHJpbmcgfHwgbnVtYmVyfSBudW1iZXJUb1ZhbGlkYXRlIC0gTnVtYmVyIHRvIHZhbGlkYXRlIHdpdGggdGhlIGZ1bmN0aW9uLlxyXG4gKiBAcGFyYW0gIHtvYmplY3R9IG9wdGlvbnMgPSB7fSwgQWxsb3cgdGhlIGNhbGxlciB0byBzcGVjaWZ5IG1pbiBhbmQgbWF4IHZhbHVlcy5cclxuICogQHJldHVybiB7Ym9vbGVhbn0gVHJ1ZSBpZiB0aGUgdmFsaWRhdG9yIHdvcmtzLlxyXG4gKi9cclxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBudW1iZXJWYWxpZGF0aW9uKG51bWJlclRvVmFsaWRhdGUsIG9wdGlvbnMgPSB7fSkge1xyXG4gICAgaWYgKGlzVW5kZWZpbmVkKG51bWJlclRvVmFsaWRhdGUpIHx8IGlzTnVsbChudW1iZXJUb1ZhbGlkYXRlKSkge1xyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfVxyXG4gICAgbGV0IGNhc3ROdW1iZXJUb1ZhbGlkYXRlID0gK251bWJlclRvVmFsaWRhdGU7IC8vQ2FzdCBpdCBpbnRvIGEgbnVtYmVyLlxyXG4gICAgaWYgKGlzTmFOKGNhc3ROdW1iZXJUb1ZhbGlkYXRlKSkge1xyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuICAgIGlmKCFpc051bWJlcihjYXN0TnVtYmVyVG9WYWxpZGF0ZSkpe1xyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuICAgIGxldCBpc01pbiA9IG9wdGlvbnMubWluICE9PSB1bmRlZmluZWQgPyBjYXN0TnVtYmVyVG9WYWxpZGF0ZSA+PSBvcHRpb25zLm1pbiA6IHRydWU7XHJcbiAgICBsZXQgaXNNYXggPSBvcHRpb25zLm1heCAhPT0gdW5kZWZpbmVkID8gY2FzdE51bWJlclRvVmFsaWRhdGUgPD0gb3B0aW9ucy5tYXggOiB0cnVlO1xyXG4gICAgcmV0dXJuIGlzTWluICYmIGlzTWF4O1xyXG59O1xyXG4iXX0=