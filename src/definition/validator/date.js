/**
* Validate a date.
* @param  {string | date} dateToValidate - The date to validate.
* @param  {object} options   - The validator options.
* @return {boolean} - True if the date is valide , false otherwise.
*/
module.exports = function dateValidation(dateToValidate, options) {
    const moment = require('moment');
    if(!moment){
        console.warn('Moment library is not a part of your project, please download it : http://momentjs.com/');
    }
    return moment(dateToValidate, options).isValid();
};
