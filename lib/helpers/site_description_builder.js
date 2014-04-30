/* global window, _*/
(function(NS) {
  "use strict";
  //Filename: helpers/routes_helper.js
  NS = NS || {};
  //Dependency gestion depending on the fact that we are in the browser or in node.
  var isInBrowser = typeof module === 'undefined' && typeof window !== 'undefined';
  var userHelper = isInBrowser ? NS.Helpers.userHelper : require("./user_helper");
  var siteDescriptionHelper = isInBrowser ? NS.Helpers.siteDescriptionHelper : require("./site_description_helper");
  var ArgumentNullException = isInBrowser ? NS.Helpers.Exceptions.ArgumentNullException : require("./custom_exception").ArgumentNullException;
  //Container for the site description and routes.
  var siteDescription, routes = {}, siteStructure = {};

  //Process the siteDescription if necessary.
  var processSiteDescription = function(options){
    options = options || {};
    if(!siteDescriptionHelper.isProcessed() || options.isForceProcess){
      siteDescription = siteDescriptionHelper.getSite();
      regenerateRoutes();
      return siteDescription;
    }return false;
  };

  //Regenerate the application routes.
  var regenerateRoutes = function regenerateRoutes() {
    generateRoutes(siteDescription);
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
    if(siteDescriptionHelper.checkParams(siteDescElt.requiredParams)){
     processHeaders(siteDescElt, pfx);
    }
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
    for (var i in headers) {
      processElement(headers[i], prefix, {isInSiteStructure: true});
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
          regex: routeToRegExp(siteDesc.url)
        };
        //Call the Backbone.history.handlers....

        routes[route.regex.toString()] = route;
        if(options.isInSiteStructure){
          siteStructure[prefix] = route;
        }
      }
  };

//Find a route with its name.
 var findRouteName = function(routeToTest) {
    var handlers = Backbone.history.handlers;
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




  //Generate the routes fromSiteDescription.
  var generateRoutes = function generateRoutes(elementDesc, prefix) {
    if (!elementDesc) {
      console.warn('The siteDescription does not exists', elementDesc);
      return;
    }

    return processElement(elementDesc, prefix);

    var pfx = processName(prefix, elementDesc.name);

    //process headers routes.
    var headers = elementDesc.header;
    for (var siteDescIdx in headers) {
      var siteDesc = headers[siteDescIdx];
      var prefixsiteDesc = processName(pfx, siteDesc.name);
      console.log('prefix', prefix, ' prefixsiteDesc', prefixsiteDesc);
      if (siteDesc.header) {
        generateRoutes(siteDesc, prefixsiteDesc);
      } else {
        addRouteForUser(siteDesc, prefixsiteDesc);
      }
    }
    addRouteForUser(elementDesc, pfx);

  };

  //Add a route for a user.

  var addRouteForUser = function addRouteForUser(element, prefix) {
    console.log('addRouteForUser', 'prefix', prefix);
    if (!element) {
      return;
      //throw new ArgumentNullException("The element to add a route should not be undefined.", element);
    }
    if (prefix === undefined || prefix === null || prefix === "") {
      prefix = "";
      //throw new ArgumentNullException("The prefix to add a route should not be undefined.", prefix);
    }
    //Add the route only if the user has one of the required role.
    if (element.roles !== undefined && element.url !== undefined)
      if (userHelper.hasOneRole(element.roles)) {
        var route = {
          roles: element.roles,
          name: prefix,
          route: element.url
        };
        routes[element.url] = route;
        siteStructure[prefix] = route;
      }
      //process the site not in the menus  
    if (element.pages !== undefined && element.pages !== null) {
      for (var rtIdx in element.pages) {
        addRouteForUser(element.pages[rtIdx], prefix);
      }
    }

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
    processSiteDescription: processSiteDescription
  };

  // Differenciating export for node or browser.
  if (isInBrowser) {
    NS.Helpers = NS.Helpers || {};
    NS.Helpers.siteDescriptionBuilder = siteDescriptionBuilder;
  } else {
    module.exports = siteDescriptionBuilder;
  }
})(typeof module === 'undefsiteDescriptionBuilderined' && typeof window !== 'undefined' ? window.Fmk : module.exports);