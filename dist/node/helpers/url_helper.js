/* global $, _ */
(function(NS) {
  NS = NS || {};
  //Dependency gestion depending on the fact that we are in the browser or in node.
  var isInBrowser = typeof module === 'undefined' && typeof window !== 'undefined';

//*This helper has a dependency on underscore and jQuery.*/
var urlHelper = {};
// Generate an url with all the parameters
urlHelper.generateUrl = function generateUrl(route, params) {
	var url = '',
		SEP = '/',
		PARAM = '?',
		ET = '&';
	for (var i = 0, routeLength = route.length; i < routeLength; i++) {
		url += (route[i] + SEP);
	}
	if (typeof params !== "undefined" && params !== null && !_.isEmpty(params)) {
		url += PARAM;
		for (var propt in params) {
			url += (propt + '=' + params[propt] + ET);
		}
	}
	return url.slice(0, -1); //Remove the last ET.
};

//Parse the parameters of the url.
urlHelper.parseParam = function parseParam(params) {
	var result = {};
	var paramsLength = params.length;
	//If the string params are not in the chain wich starts with a ?
	if (paramsLength === 0 || '?' !== params[0]) {
		throw "parseParam : the params is not well formated : " + params;
	}
	var namedParams = params.slice(1).split('&');
	//For each name param (param=value) we put it in an object, we get pack the parameter we have given in the url.
	$.each(namedParams, function(index, value) {
		if (value) {
			/**/
			var param = value.split('=');
			if (param[1] === 'true') {
				param[1] = true;
			} else if (param[1] === 'false') {
				param[1] = false;
			}
			result[param[0]] = param[1];
		}
	});
	return result;
};

// Differenciating export for node or browser.
  if(isInBrowser){
    NS.Helpers = NS.Helpers || {};
    NS.Helpers.urlHelper = urlHelper;
  }else {
    module.exports = urlHelper;
  }
})(typeof module === 'undefined' && typeof window !== 'undefined' ? window.Fmk : module.exports);