/**
* Validate a date.
* @param  {string | date} dateToValidate - The date to validate.
* @param  {object} options   - The validator options.
* @return {string} - The formated date.
*/
module.exports = function dateValidation(dateToValidate, options) {
    const moment = require('moment');
    if(!moment){
        console.warn('Moment library is not a part of your project, please download it : http://momentjs.com/');
    }
    return moment(dateToValidate, options).isValid();
};
