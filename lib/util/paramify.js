/**
 * Takes an object and convert it into a string in order to build a url param.
 * @param  {object} obj - Object to paramify.
 * @return {string}
 * @example -  paramify({a: 1, b:"papa"}) => 'a=1&b=papa'
 */
module.exports =  function(obj) {
  return Object.keys(obj).map(function(k) {
    return encodeURIComponent(k) + '=' + encodeURIComponent(obj[k]);
  }).join('&');
};