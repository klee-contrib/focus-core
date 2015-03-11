var compile = require('lodash/string/template');
/**
* Process an url in order to build them.
*/
module.exports = function(url, data){
  return compile(url)(data);
};
