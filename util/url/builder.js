var urlProcessor = require('./url-processor');
/*
* @module config/server/url-builder
* @param url - url with params such as http://url/entity/${id}
* @param method - HTTP verb {GET, POST, PUT, DELETE}
* @return {function}
*/
module.exports =  function(url, method){
  /**
   * Function returns by the module.
   * @param  {object} data - The JSON data to inject in the URL.
   * @return {function} returns a function which takes the URL as parameters.
   */
  return function generateUrl(data){
    return {
      url: urlProcessor(url, data),
      method: method
    };
  };
};
