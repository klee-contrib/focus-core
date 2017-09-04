import moment from 'moment';

/**
* Validate a date.
* @param  {string | date} dateToValidate - The date to validate.
* @param  {object} options   - The validator options.
* @return {boolean} - True if the date is valide , false otherwise.
*/
export default function dateValidation(dateToValidate, options) {
    return moment(dateToValidate, options).isValid();
}