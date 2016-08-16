'use strict';

var _require = require('lodash/lang');

var isString = _require.isString;
/**
 * Validate a string given options.
 * @param  {string} stringToTest - The string to test.
 * @param  {object} options - Validators options, supports minLength and maxLength both optionals.
 * @return {boolean} - True if the string is valid , false otherwise.
 */

module.exports = function stringLength(stringToTest) {
    var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

    if (!isString(stringToTest)) {
        return false;
    }
    options.minLength = options.minLength || 0;
    var isMinLength = options.minLength !== undefined ? stringToTest.length >= options.minLength : true;
    var isMaxLength = options.maxLength !== undefined ? stringToTest.length <= options.maxLength : true;
    return isMinLength && isMaxLength;
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInByb2Nlc3Nvci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztlQUFpQixRQUFRLGFBQVIsQzs7SUFBWixRLFlBQUEsUTtBQUNMOzs7Ozs7O0FBTUEsT0FBTyxPQUFQLEdBQWlCLFNBQVMsWUFBVCxDQUFzQixZQUF0QixFQUFrRDtBQUFBLFFBQWQsT0FBYyx5REFBSixFQUFJOztBQUMvRCxRQUFJLENBQUMsU0FBUyxZQUFULENBQUwsRUFBNkI7QUFDekIsZUFBTyxLQUFQO0FBQ0g7QUFDRCxZQUFRLFNBQVIsR0FBb0IsUUFBUSxTQUFSLElBQXFCLENBQXpDO0FBQ0EsUUFBTSxjQUFjLFFBQVEsU0FBUixLQUFzQixTQUF0QixHQUFrQyxhQUFhLE1BQWIsSUFBdUIsUUFBUSxTQUFqRSxHQUE2RSxJQUFqRztBQUNBLFFBQU0sY0FBYyxRQUFRLFNBQVIsS0FBc0IsU0FBdEIsR0FBa0MsYUFBYSxNQUFiLElBQXVCLFFBQVEsU0FBakUsR0FBNkUsSUFBakc7QUFDQSxXQUFPLGVBQWUsV0FBdEI7QUFDSCxDQVJEIiwiZmlsZSI6InByb2Nlc3Nvci5qcyIsInNvdXJjZXNDb250ZW50IjpbImxldCB7aXNTdHJpbmd9ID0gcmVxdWlyZSgnbG9kYXNoL2xhbmcnKTtcclxuLyoqXHJcbiAqIFZhbGlkYXRlIGEgc3RyaW5nIGdpdmVuIG9wdGlvbnMuXHJcbiAqIEBwYXJhbSAge3N0cmluZ30gc3RyaW5nVG9UZXN0IC0gVGhlIHN0cmluZyB0byB0ZXN0LlxyXG4gKiBAcGFyYW0gIHtvYmplY3R9IG9wdGlvbnMgLSBWYWxpZGF0b3JzIG9wdGlvbnMsIHN1cHBvcnRzIG1pbkxlbmd0aCBhbmQgbWF4TGVuZ3RoIGJvdGggb3B0aW9uYWxzLlxyXG4gKiBAcmV0dXJuIHtib29sZWFufSAtIFRydWUgaWYgdGhlIHN0cmluZyBpcyB2YWxpZCAsIGZhbHNlIG90aGVyd2lzZS5cclxuICovXHJcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gc3RyaW5nTGVuZ3RoKHN0cmluZ1RvVGVzdCwgb3B0aW9ucyA9IHt9KSB7XHJcbiAgICBpZiAoIWlzU3RyaW5nKHN0cmluZ1RvVGVzdCkpIHtcclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcbiAgICBvcHRpb25zLm1pbkxlbmd0aCA9IG9wdGlvbnMubWluTGVuZ3RoIHx8IDA7XHJcbiAgICBjb25zdCBpc01pbkxlbmd0aCA9IG9wdGlvbnMubWluTGVuZ3RoICE9PSB1bmRlZmluZWQgPyBzdHJpbmdUb1Rlc3QubGVuZ3RoID49IG9wdGlvbnMubWluTGVuZ3RoIDogdHJ1ZTtcclxuICAgIGNvbnN0IGlzTWF4TGVuZ3RoID0gb3B0aW9ucy5tYXhMZW5ndGggIT09IHVuZGVmaW5lZCA/IHN0cmluZ1RvVGVzdC5sZW5ndGggPD0gb3B0aW9ucy5tYXhMZW5ndGggOiB0cnVlO1xyXG4gICAgcmV0dXJuIGlzTWluTGVuZ3RoICYmIGlzTWF4TGVuZ3RoO1xyXG59O1xyXG4iXX0=