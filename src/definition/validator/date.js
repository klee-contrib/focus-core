
module.exports = function dateValidation(dateToValidate, options) {
  var moment = require('moment');
  if(!moment){
    console.warn('Moment library is not a part of your project, please download it : http://momentjs.com/');
  }
  return moment(dateToValidate).isValid();
};
