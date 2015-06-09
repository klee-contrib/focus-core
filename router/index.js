var render = require('../application/render');
var Backbone = require('backbone');
var ArgumentNullException = require('../exception/ArgumentNullException');
var message = require('../message');
var userHelper = require('../user');
module.exports = Backbone.Router.extend({
  noRoleRoute: 'home',
  route(route, name, callback) {
    var router = this;
    if (!callback){
      callback = this[name];
    }
    if(callback === undefined || callback === null){
      throw new ArgumentNullException(`The route callback seems to be undefined, please check your router file for your route: ${name}`);
    }
    var customWrapperAroundCallback = ()=>{
      var currentRoute = route;
      console.log(`Route change: ${currentRoute}`);
      //The default route is the noRoleRoute by default
      if(currentRoute === ''){
        currentRoute = router.noRoleRoute;
      }
      var routeName = '';//siteDescriptionBuilder.findRouteName(currentRoute);
      var routeDescciption = {roles: ['DEFAULT_ROLE']};//siteDescriptionBuilder.getRoute(routeName);
      if((routeDescciption === undefined && currentRoute !== '') || !userHelper.hasRole(routeDescciption.roles)){
        message.addErrorMessage('application.noRights');
        return Backbone.history.navigate('', true);
      }else {
        //Rendre all the notifications in the stack.
        backboneNotification.renderNotifications();
      }
      //console.log('routeObject', siteDescriptionBuilder.getRoute(n));
      callback.apply(router, arguments);

  };
    return Backbone.Router.prototype.route.call(this, route, name, customWrapperAroundCallback);
  },
  /**
   * Render the compoennt into the page content.
   */
  _pageContent(component, options){
    return render(component, '[data-focus="page-content"]', options);
  }
});
