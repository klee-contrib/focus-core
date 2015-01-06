/*global _, $*/
var httpResponseParser = require('./http_response_parser');
var httpResponseBuilder = require('./http_response_builder');
/**
 * Defauls ajax settings.
 * @type {Object}
 */
var _settings = {
  crossDomain : true,
  contentType: "application/json; charset=UTF-8",
  dataType: "json"
};
/*global Promise*/
module.exports = function promiseAJAX(ajaxSettings){
    var settings = {};
   return new Promise(function promiseLoadList(resolve, reject) {
    _.extend(settings , _settings, ajaxSettings,buildPromiseObjectSettings(resolve, reject) );
    $.ajax(settings);
   });
};

/**
 * Build a promise object for the success Cb and the error Cb.
 * @param  {function} resolveCb - Call the resolve Cb.
 * @param  {function} rejectCb  - Cb to call when the request does not works.
 * @return {object}
 */
function buildPromiseObjectSettings(resolveCb, rejectCb){
  return {
    success: function(data, textStatus, jqXHR) {
      resolveCb(httpResponseParser.parse(jqXHR));
    },
    error: function(data){
      rejectCb(data);
    }
  };
}