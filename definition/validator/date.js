'use strict';

/**
* Validate a date.
* @param  {string | date} dateToValidate - The date to validate.
* @param  {object} options   - The validator options.
* @return {boolean} - True if the date is valide , false otherwise.
*/
module.exports = function dateValidation(dateToValidate, options) {
    var moment = require('moment');
    if (!moment) {
        console.warn('Moment library is not a part of your project, please download it : http://momentjs.com/');
    }
    return moment(dateToValidate, options).isValid();
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInByb2Nlc3Nvci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBOzs7Ozs7QUFNQSxPQUFPLE9BQVAsR0FBaUIsU0FBUyxjQUFULENBQXdCLGNBQXhCLEVBQXdDLE9BQXhDLEVBQWlEO0FBQzlELFFBQU0sU0FBUyxRQUFRLFFBQVIsQ0FBZjtBQUNBLFFBQUcsQ0FBQyxNQUFKLEVBQVc7QUFDUCxnQkFBUSxJQUFSLENBQWEseUZBQWI7QUFDSDtBQUNELFdBQU8sT0FBTyxjQUFQLEVBQXVCLE9BQXZCLEVBQWdDLE9BQWhDLEVBQVA7QUFDSCxDQU5EIiwiZmlsZSI6InByb2Nlc3Nvci5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxyXG4qIFZhbGlkYXRlIGEgZGF0ZS5cclxuKiBAcGFyYW0gIHtzdHJpbmcgfCBkYXRlfSBkYXRlVG9WYWxpZGF0ZSAtIFRoZSBkYXRlIHRvIHZhbGlkYXRlLlxyXG4qIEBwYXJhbSAge29iamVjdH0gb3B0aW9ucyAgIC0gVGhlIHZhbGlkYXRvciBvcHRpb25zLlxyXG4qIEByZXR1cm4ge2Jvb2xlYW59IC0gVHJ1ZSBpZiB0aGUgZGF0ZSBpcyB2YWxpZGUgLCBmYWxzZSBvdGhlcndpc2UuXHJcbiovXHJcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gZGF0ZVZhbGlkYXRpb24oZGF0ZVRvVmFsaWRhdGUsIG9wdGlvbnMpIHtcclxuICAgIGNvbnN0IG1vbWVudCA9IHJlcXVpcmUoJ21vbWVudCcpO1xyXG4gICAgaWYoIW1vbWVudCl7XHJcbiAgICAgICAgY29uc29sZS53YXJuKCdNb21lbnQgbGlicmFyeSBpcyBub3QgYSBwYXJ0IG9mIHlvdXIgcHJvamVjdCwgcGxlYXNlIGRvd25sb2FkIGl0IDogaHR0cDovL21vbWVudGpzLmNvbS8nKTtcclxuICAgIH1cclxuICAgIHJldHVybiBtb21lbnQoZGF0ZVRvVmFsaWRhdGUsIG9wdGlvbnMpLmlzVmFsaWQoKTtcclxufTtcclxuIl19