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

  var regenerateRoutes = function regenerateRoutes(){
    generateRoutes(siteDescription);
  };

  //Generate the routes fromSiteDescription.
  var generateRoutes = function generateRoutes(elementDesc, prefix) {
    if(!elementDesc){
      console.warn('The siteDescription does not exists', elementDesc);
      return;
    }
    prefix = ((prefix === undefined || prefix === null || prefix === "") ? "" : prefix + '.') + (elementDesc.name === undefined || elementDesc.name === null || elementDesc.name === "") ? "" : elementDesc.name;
    //process headers routes.
    var headers = elementDesc.header;
    for (var siteDescIdx in headers) {
      var siteDesc = headers[siteDescIdx];
      var prefixsiteDesc = prefix + siteDesc.name;
      if (siteDesc.header) {
        generateRoutes(siteDesc, prefixsiteDesc);
      } else {
        addRouteForUser(siteDesc, prefixsiteDesc);
      }
    }
    addRouteForUser(elementDesc, prefix);

  };

  //Add a route for a user.

  var addRouteForUser = function addRouteForUser(element, prefix) {
    if (!element) {
      return;
      //throw new ArgumentNullException("The element to add a route should not be undefined.", element);
    }
    if (prefix === undefined || prefix === null || prefix === "") {
      return;
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

  var routesHelper = {
    defineSiteDescription: defineSiteDescription,
    getRoute: getRoute,
    getRoutes: getRoutes,
    getSiteDescription: getSiteDescription,
    regenerateRoutes: regenerateRoutes
  };

  // Differenciating export for node or browser.
  if (isInBrowser) {
    NS.Helpers = NS.Helpers || {};
    NS.Helpers.routesHelper = routesHelper;
  } else {
    module.exports = routesHelper;
  }
})(typeof module === 'undefined' && typeof window !== 'undefined' ? window.Fmk : module.exports);