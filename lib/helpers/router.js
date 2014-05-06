/* global window, Promise, Backbone*/
(function(NS) {
  "use strict";
  //Filename: helpers/router.js
  NS = NS || {};
  //Dependency gestion depending on the fact that we are in the browser or in node.
  var isInBrowser = typeof module === 'undefined' && typeof window !== 'undefined';
  var middleWares = [];
  var middlewarePromise = function middlewarePromise(middleWareFunction) {
    return new Promise(function(resolve, reject) {
      if (middleWareFunction(arguments)) {
        resolve(arguments);
      } else {
        reject(arguments);
      }
    });
  };

  var registerMiddleWare = function registerMiddleWare(middleWareFunction) {
    middleWares.push(middleWareFunction);
  };
  //Extend the backbone router.
  var Router = Backbone.Router.extend({
    route: function(route, name, callback) {
      var router = this;
      if (!callback) callback = this[name];

      var f = function() {
        //console.log('route before', route);
        if(route === ""){route = "home";}
        var n = Fmk.Helpers.siteDescriptionBuilder.findRouteName(route);
        var rt = Fmk.Helpers.siteDescriptionBuilder.getRoute(n);
        //todo: reprocess the urls.
        /*if((rt === undefined && route!== '') || !Fmk.Helpers.userHelper.hasOneRole(rt.roles)){
          Fmk.Helpers.backboneNotification.addNotification({type: "error", message: i18n.t('application.noRights')}, true);
          return Backbone.history.navigate('', true);
        }*/
        console.log('routeName', n);
        console.log('routeObject', Fmk.Helpers.siteDescriptionBuilder.getRoute(n));
        callback.apply(router, arguments);
        //console.log('route after', route);
      };
      return Backbone.Router.prototype.route.call(this, route, name, f);
    }
  });

  // Differenciating export for node or browser.
  if (isInBrowser) {
    NS.Helpers = NS.Helpers || {};
    NS.Helpers.Router = Router;
  } else {
    module.exports = Router;
  }
})(typeof module === 'undefined' && typeof window !== 'undefined' ? window.Fmk : module.exports);