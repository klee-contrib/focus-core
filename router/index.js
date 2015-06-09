var render = require('../application/render');
var Backbone = require('backbone');
var ArgumentNullException = require('../exception/ArgumentNullException');
var message = require('../message');
var userHelper = require('../user');
var dispatcher = require('../dispatcher');

/**
 * Function call before each route.
 */
function beforeRouting(){
  console.log('Routing: before');
  //Clear header
  dispatcher.handleViewAction({
    data: {
      cartridgeComponent: {component: React.DOM.div},
      summaryComponent: {component: React.DOM.div},
      actions: {primary: [], secondary: []}
    },
    type: 'update'
  });
  //Clear errors

  //Render stack errors

}
module.exports = Backbone.Router.extend({
  noRoleRoute: 'home',
  route : function (urlRoute, name, callback) {
    var router = this;
    if (!callback){
      callback = this[name];
    }
    if(callback === undefined || callback === null){
      console.warn(`
        The callback is not defined for your route, you should check these two points in the routes property of your router:
        - You directly have a callback associated to your route: 'routeName': function handleRoute(){ //do what you want}
        - You have a string property, your router should have a function in its declaration with the same name as your property
        For more informations please see http://backbonejs.org/#Router-route
      `);
      throw new ArgumentNullException(`The route callback seems to be undefined, please check your router file for your route: ${name}`);
    }
    var customWrapperAroundCallback = ()=>{
      var currentRoute = urlRoute;
      console.log(`Route change: ${urlRoute}`);
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

        //Rendre all the errors notifications in the stack.
        //backboneNotification.renderNotifications();
        beforeRouting();
      }
      //console.log('routeObject', siteDescriptionBuilder.getRoute(n));
      callback.apply(router, arguments);

  };
    return Backbone.Router.prototype.route.call(this, urlRoute, name, customWrapperAroundCallback);
  },
  /**
   * Render the compoennt into the page content.
   */
  _pageContent(component, options){
    return render(component, '[data-focus="page-content"]', options);
  }
});
