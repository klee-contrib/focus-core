/* global  _, Backbone*/
  "use strict";
  //Filename: helpers/routes_helper.js

  var userHelper = require("./user_helper");
  var siteDescriptionHelper = require("./site_description_helper");
  var ArgumentNullException =  require("./custom_exception").ArgumentNullException;
  //Container for the site description and routes.
  var siteDescription, routes = {}, siteStructure = {};

  //Process the siteDescription if necessary.
  var processSiteDescription = function(options){
    options = options || {};
    if(!siteDescriptionHelper.isProcessed() || options.isForceProcess){
      siteDescription = siteDescriptionHelper.getSite();
      regenerateRoutes();
      return siteDescription;
    }
    return false;
  };

  //Regenerate the application routes.
  var regenerateRoutes = function regenerateRoutes() {
    //Clean all previous registered routes.
    routes = {};
    siteStructure = {};
    //Process the new routes.
    processElement(siteDescription);
  };

  //Process the name of 
  var processName = function(pfx, eltDescName) {
    if (pfx === undefined || pfx === null) {
      pfx = "";
    }
    if (eltDescName === undefined || eltDescName === null) {
      return pfx;
    }
    if (pfx === "") {
      return eltDescName;
    }
    return pfx + '.' + eltDescName;
  };

  
  var processElement = function(siteDescElt, prefix, options) {
    options = options || {};
    if (!siteDescElt) {
      console.warn('The siteDescription does not exists', siteDescElt);
      return;
    }
    var pfx = processName(prefix, siteDescElt.name);
    //if(siteDescriptionHelper.checkParams(siteDescElt.requiredParams)){
     processHeaders(siteDescElt, pfx);
    //}
    processPages(siteDescElt, pfx);
    processRoute(siteDescElt, pfx, options);
  };

  //Process the deaders element of the site description element.
  var processHeaders = function(siteDesc, prefix) {

    if (!siteDesc.headers) {
      return;
    }
    //console.log('headers', siteDesc.headers, 'prefix', prefix);
    var headers = siteDesc.headers;
    var isInSiteStructure = false;
    if(siteDescriptionHelper.checkParams(siteDesc.requiredParams)){
      isInSiteStructure = true;
    }
    for (var i in headers) {
      processElement(headers[i], prefix, {isInSiteStructure: isInSiteStructure});
    }
  };

  //Process the pages element of the site description.
  var processPages = function(siteDesc, prefix) {
    if (siteDesc.pages !== undefined && siteDesc.pages !== null) {
      //console.log('pages', siteDesc.pages, 'prefix', prefix);

      for (var i in siteDesc.pages) {
        processElement(siteDesc.pages[i], prefix);
      }
    }
  };

 
  //Process the route part of the site description element.
  var processRoute = function(siteDesc, prefix, options) {
    options = options || {};
    if (siteDesc.roles !== undefined && siteDesc.url !== undefined)
    //console.log('route', siteDesc.url, 'prefix', prefix);

      if (userHelper.hasOneRole(siteDesc.roles)) {
        var route = {
          roles: siteDesc.roles,
          name: prefix,
          route: siteDesc.url,
          regex: routeToRegExp(siteDesc.url),
          requiredParams: siteDesc.requiredParams
        };
        //Call the Backbone.history.handlers....
        //console.log('*****************');
        //console.log('ROute name: ',route.route);
        //console.log('Route handler name : ',  findRouteName(route.route.substring(1)));
        routes[findRouteName(route.route.substring(1))] = route;
        if(options.isInSiteStructure){
          siteStructure[prefix] = route;
        }
      }
  };

//Find a route with its name.
// _routeToTest_ : Route to test.
// *return* : The handler route name. 
 var findRouteName = function(routeToTest) {
    var handlers = Backbone.history.handlers;
    //console.log('handlers', )
    var h = _.find(handlers, function(handler){
      return handler.route.test(routeToTest);
    });
    if(h !== undefined){
      return  h.route.toString();
    }
    return _.any(handlers, function(handler) {
      if (handler.route.test(routeToTest)) {
        return  handler.route.toString();
      }
    });
  };
  

    //Convert a route to regexp
  var optionalParam = /\((.*?)\)/g;
  var namedParam    = /(\(\?)?:\w+/g;
  var splatParam    = /\*\w+/g;
  var escapeRegExp  = /[\-{}\[\]+?.,\\\^$|#\s]/g;
  var routeToRegExp=  function routeToRegExp(route) {
      route = route.replace(escapeRegExp, '\\$&')
                   .replace(optionalParam, '(?:$1)?')
                   .replace(namedParam, function(match, optional) {
                     return optional ? match : '([^/?]+)';
                   })
                   .replace(splatParam, '([^?]*?)');
      return new RegExp('^' + route + '(?:\\?([\\s\\S]*))?$');
    };

  //Get the siteDescription.
  var getSiteDescription = function getSiteDescription() {
    return _.clone(siteDescription);
  };

  //Get all the application routes from the siteDescription.
  var getRoute = function getRoutes(routeName) {
    return _.clone(routes[routeName]);
  };

  var getRoutes = function getRoutes() {
    return _.clone(routes);
  };

  var getSiteStructure = function getSiteStructure() {
    return _.clone(siteStructure);
  };

  var siteDescriptionBuilder = {
    getRoute: getRoute,
    getRoutes: getRoutes,
    getSiteDescription: getSiteDescription,
    regenerateRoutes: regenerateRoutes,
    getSiteStructure: getSiteStructure,
    processSiteDescription: processSiteDescription,
    findRouteName: findRouteName,
    routeToRegExp:routeToRegExp
  };

  module.exports = siteDescriptionBuilder;