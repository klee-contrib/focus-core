'use strict';

var urlProcessor = require('./processor');
/*
* @module config/server/url-builder
* @param url - url with params such as http://url/entity/${id}
* @param method - HTTP verb {GET, POST, PUT, DELETE}
* @return {function}
*/
module.exports = function (url, method) {
  /**
   * Function returns by the module.
   * @param  {object} param - urlData: The JSON data to inject in the URL, data: The JSON data to give to the request.
   * @return {function} returns a function which takes the URL as parameters.
   */
  return function generateUrl(param) {
    if (param == undefined) {
      param = {};
    }
    return {
      url: urlProcessor(url, param.urlData),
      method: method,
      data: param.data || param.bodyData
    };
  };
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInByb2Nlc3Nvci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLElBQUksZUFBZSxRQUFRLGFBQVIsQ0FBbkI7QUFDQTs7Ozs7O0FBTUEsT0FBTyxPQUFQLEdBQWlCLFVBQVMsR0FBVCxFQUFjLE1BQWQsRUFBcUI7QUFDcEM7Ozs7O0FBS0EsU0FBTyxTQUFTLFdBQVQsQ0FBcUIsS0FBckIsRUFBMkI7QUFDaEMsUUFBSSxTQUFTLFNBQWIsRUFBd0I7QUFDdEIsY0FBUSxFQUFSO0FBQ0Q7QUFDRCxXQUFPO0FBQ0wsV0FBSyxhQUFhLEdBQWIsRUFBa0IsTUFBTSxPQUF4QixDQURBO0FBRUwsY0FBUSxNQUZIO0FBR0wsWUFBTSxNQUFNLElBQU4sSUFBYyxNQUFNO0FBSHJCLEtBQVA7QUFLRCxHQVREO0FBVUQsQ0FoQkQiLCJmaWxlIjoicHJvY2Vzc29yLmpzIiwic291cmNlc0NvbnRlbnQiOlsidmFyIHVybFByb2Nlc3NvciA9IHJlcXVpcmUoJy4vcHJvY2Vzc29yJyk7XHJcbi8qXHJcbiogQG1vZHVsZSBjb25maWcvc2VydmVyL3VybC1idWlsZGVyXHJcbiogQHBhcmFtIHVybCAtIHVybCB3aXRoIHBhcmFtcyBzdWNoIGFzIGh0dHA6Ly91cmwvZW50aXR5LyR7aWR9XHJcbiogQHBhcmFtIG1ldGhvZCAtIEhUVFAgdmVyYiB7R0VULCBQT1NULCBQVVQsIERFTEVURX1cclxuKiBAcmV0dXJuIHtmdW5jdGlvbn1cclxuKi9cclxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbih1cmwsIG1ldGhvZCl7XHJcbiAgLyoqXHJcbiAgICogRnVuY3Rpb24gcmV0dXJucyBieSB0aGUgbW9kdWxlLlxyXG4gICAqIEBwYXJhbSAge29iamVjdH0gcGFyYW0gLSB1cmxEYXRhOiBUaGUgSlNPTiBkYXRhIHRvIGluamVjdCBpbiB0aGUgVVJMLCBkYXRhOiBUaGUgSlNPTiBkYXRhIHRvIGdpdmUgdG8gdGhlIHJlcXVlc3QuXHJcbiAgICogQHJldHVybiB7ZnVuY3Rpb259IHJldHVybnMgYSBmdW5jdGlvbiB3aGljaCB0YWtlcyB0aGUgVVJMIGFzIHBhcmFtZXRlcnMuXHJcbiAgICovXHJcbiAgcmV0dXJuIGZ1bmN0aW9uIGdlbmVyYXRlVXJsKHBhcmFtKXtcclxuICAgIGlmIChwYXJhbSA9PSB1bmRlZmluZWQpIHtcclxuICAgICAgcGFyYW0gPSB7fTtcclxuICAgIH1cclxuICAgIHJldHVybiB7XHJcbiAgICAgIHVybDogdXJsUHJvY2Vzc29yKHVybCwgcGFyYW0udXJsRGF0YSksXHJcbiAgICAgIG1ldGhvZDogbWV0aG9kLFxyXG4gICAgICBkYXRhOiBwYXJhbS5kYXRhIHx8IHBhcmFtLmJvZHlEYXRhXHJcbiAgICB9O1xyXG4gIH07XHJcbn07XHJcbiJdfQ==