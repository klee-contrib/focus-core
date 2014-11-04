/* global window, Promise, Backbone, i18n*/
(function(NS) {
  "use strict";
  //Filename: helpers/router.js
  NS = NS || {};
  //Dependency gestion depending on the fact that we are in the browser or in node.
  var isInBrowser = typeof module === 'undefined' && typeof window !== 'undefined';
  var userHelper = isInBrowser ? NS.Helpers.userHelper : require("./user_helper");
  var siteDescriptionBuilder = isInBrowser ? NS.Helpers.siteDescriptionBuilder : require("./site_description_builder");
  var backboneNotification = isInBrowser ? NS.Helpers.backboneNotification : require("./backbone_notification");
  var ArgumentNullException = isInBrowser ? NS.Helpers.Exceptions.ArgumentNullException : require("./custom_exception").ArgumentNullException;
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
    noRoleRoute: 'home',
    route: function(route, name, callback) {
      var router = this;
      if (!callback){
        callback = this[name];
      }
      if(callback === undefined || callback === null){
        throw new ArgumentNullException("The route callback seems to be undefined, please check your router file for your route: ", name);
      }
      var f = function() {
          //console.log('route before', route);
        //Treat the home case.
        if(route === ""){route = router.noRoleRoute;}
        var n = siteDescriptionBuilder.findRouteName(route);
        var rt = siteDescriptionBuilder.getRoute(n);
        //If the route does not exists, or the user does not have any right on the route display an error.
        if((rt === undefined && route!== '') || !userHelper.hasOneRole(rt.roles)){
          backboneNotification.addNotification({type: "error", message: i18n.t('application.noRights')});
          return Backbone.history.navigate('', true);
        }else {
          //Rendre all the notifications in the stack.
          backboneNotification.renderNotifications();
        }
        //console.log('routeObject', siteDescriptionBuilder.getRoute(n));
        callback.apply(router, arguments);
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