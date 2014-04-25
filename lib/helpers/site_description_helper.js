/* global window, _*/
(function(NS) {
  "use strict";
  //Filename: helpers/routes_helper.js
  NS = NS || {};
  //Dependency gestion depending on the fact that we are in the browser or in node.
  var isInBrowser = typeof module === 'undefined' && typeof window !== 'undefined';
  var userHelper = isInBrowser ? NS.Helpers.userHelper : require("./userHelper");
  //Container for the site description and routes.
  var siteDescription, routes, siteStructure;

  //Define the application site description.
  //The siteDescription must be an object with the following structure: 
  // `{headers: [{name: "NameOfTheModule", url: "#nameOftheModule/:param, roles:['CHIEF', 'MASTER']", headers: [[{name: "NameOfTheModule", url: "#nameOftheModule/:param, roles:['CHIEF', 'MASTER']", headers: []}]]}]}`
  var defineSiteDescription = function defineSiteDescription(steDescription) {
    siteDescription = steDescription;
    //Generate the routes associated.
    generateRoutes(siteDescription.headers);
  };


  //Generate the routes fromSiteDescription.
  var generateRoutes = function generateRoutes(headers, prefix) {
    if (prefix !== undefined && prefix !== null && prefix !== "") {
      prefix = prefix + ".";
    }
    for (var siteDesc in headers) {
      var prefixsiteDesc = prefix + siteDesc.name;
      if (siteDesc.headers) {
        generateRoutes(siteDesc.headers, prefixsiteDesc);
      } else {
        //Add the route only if the user has one of the required role.
        if (userHelper.hasOneRole(siteDesc.roles)) {
          var route = {
            roles: siteDesc.roles,
            name: prefixsiteDesc,
            route: siteDesc.route
          };
          routes[siteDesc.url] = route;
          siteStructure[prefixsiteDesc] = route;
        }
      }
    }
  };

  //Get the siteDescription.
  var getSiteDescription = function getSiteDescription() {
    return _.clone(siteDescription);
  };

  //Get all the application routes from the siteDescription.
  var getRoutes = function getRoutes(routeName) {
    return _.clone(routeName);
  };

  var routesHelper = {
    defineSiteDescription: defineSiteDescription,
    getRoutes: getRoutes,
    getSiteDescription: getSiteDescription
  };

  // Differenciating export for node or browser.
  if (isInBrowser) {
    NS.Helpers = NS.Helpers || {};
    NS.Helpers.routesHelper = routesHelper;
  } else {
    module.exports = routesHelper;
  }
})(typeof module === 'undefined' && typeof window !== 'undefined' ? window.Fmk : module.exports);