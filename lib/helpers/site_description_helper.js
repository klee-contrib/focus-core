/* global window, _*/
(function(NS) {
  "use strict";
  //Filename: helpers/routes_helper.js
  NS = NS || {};
  //Dependency gestion depending on the fact that we are in the browser or in node.
  var isInBrowser = typeof module === 'undefined' && typeof window !== 'undefined';
  var userHelper = isInBrowser ? NS.Helpers.userHelper : require("./user_helper");
  var ArgumentNullException = isInBrowser ? NS.Helpers.Exceptions.ArgumentNullException : require("./custom_exception").ArgumentNullException;
  //Container for the site description and routes.
  var siteDescription, routes = {}, siteStructure = {};

  //Define the application site description.
  //The siteDescription must be an object with the following structure: 
  // `{headers: [{name: "NameOfTheModule", url: "#nameOftheModule/:param, roles:['CHIEF', 'MASTER']", headers: [[{name: "NameOfTheModule", url: "#nameOftheModule/:param, roles:['CHIEF', 'MASTER']", headers: []}]]}]}`
  var defineSiteDescription = function defineSiteDescription(steDescription) {
    siteDescription = steDescription;
    //Generate the routes associated.
    regenerateRoutes();
    return siteDescription;
  };

  var regenerateRoutes = function regenerateRoutes() {
    generateRoutes(siteDescription);
  };


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


  var processElement = function(siteDescElt, prefix) {
    if (!siteDescElt) {
      console.warn('The siteDescription does not exists', siteDescElt);
      return;
    }
    var pfx = processName(prefix, siteDescElt.name);
    processHeaders(siteDescElt, pfx);
    processPages(siteDescElt, pfx);
    processRoute(siteDescElt, pfx);
  };


  var processHeaders = function(siteDesc, prefix) {

    if (!siteDesc.headers) {
      return;
    }
    //console.log('headers', siteDesc.headers, 'prefix', prefix);
    var headers = siteDesc.headers;
    for (var i in headers) {
      processElement(headers[i], prefix);
    }
  };

  var processPages = function(siteDesc, prefix) {
    if (siteDesc.pages !== undefined && siteDesc.pages !== null) {
      //console.log('pages', siteDesc.pages, 'prefix', prefix);

      for (var i in siteDesc.pages) {
        processElement(siteDesc.pages[i], prefix);
      }
    }
  };

  var findRouteName = function(routeToTest) {
    var handlers = [{
      callback: function(fragment) {},
      route: "/^(?:\?([\s\S]*))?$/"
    }, {callback: function(){}, route:"/^administration/security/roleList(?:\?([\s\S]*))?$/"]; //Backbone.history.handlers
    return _.any(handlers, function(handler) {
      if (handler.route.test(routeToTest)) {
        return '' + handler.route;
      }
    });
  };

  var processRoute = function(siteDesc, prefix) {
    if (siteDesc.roles !== undefined && siteDesc.url !== undefined)
    //console.log('route', siteDesc.url, 'prefix', prefix);

      if (userHelper.hasOneRole(siteDesc.roles)) {
        var route = {
          roles: siteDesc.roles,
          name: prefix,
          route: siteDesc.url
        };
        //Call the Backbone.history.handlers....

        routes[findRouteName(siteDesc.url)] = route;
      }
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

  var siteDescriptionHelper = {
    defineSiteDescription: defineSiteDescription,
    getRoute: getRoute,
    getRoutes: getRoutes,
    getSiteDescription: getSiteDescription,
    regenerateRoutes: regenerateRoutes,
    getSiteStructure: getSiteStructure
  };

  // Differenciating export for node or browser.
  if (isInBrowser) {
    NS.Helpers = NS.Helpers || {};
    NS.Helpers.siteDescriptionHelper = siteDescriptionHelper;
  } else {
    module.exports = siteDescriptionHelper;
  }
})(typeof module === 'undefined' && typeof window !== 'undefined' ? window.Fmk : module.exports);