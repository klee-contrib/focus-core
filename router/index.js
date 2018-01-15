import render from '../application/render';
import ArgumentNullException from '../exception/argument-null-exception';
import message from '../message';
import userHelper from '../user';
import dispatcher from '../dispatcher';
import application from '../application';
import isFunction from 'lodash/lang/isFunction';

/**
* Function call before each route.
*/
function _beforeRouting(newRoute){
    //application.changeRoute(newRoute);
    application.clearHeader();
}


// Creates a router from the router argument given to this function
// Example
// create a file in your project `default-[yourProjectName]-router.js`
//import createRouter from 'focus-core/router';
//export default createRouter(window.Backbone.Router);
// in each router file
// import DefaultProjectRouter from './default-project-router'
// export default DefaultProjectRouter.extend(...)
const createRouter = Backbone => Backbone.Router.extend({
    noRoleRoute: 'home',
    route : function (urlRoute, name, callback) {
        var router = this;
        if (!callback){
            callback = this[name];
        }
        if(!callback){
            console.warn(`
                The callback is not defined for your route, you should check these two points in the routes property of your router:
                - You directly have a callback associated to your route: 'routeName': function handleRoute(){ //do what you want}
                - You have a string property, your router should have a function in its declaration with the same name as your property
                For more informations please see http://backbonejs.org/#Router-route
                `);
                throw new ArgumentNullException(`The route callback seems to be undefined, please check your router file for your route: ${name}`);
            }
            function customWrapperAroundCallback(){
                var currentRoute = urlRoute;
                //Rebuild the callback arguments.
                var routeArguments = [urlRoute , ...arguments];

                if(router.log){
                    console.log(`Route change: ${urlRoute}`);
                }

                //The default route is the noRoleRoute by default
                if(currentRoute === ''){
                    currentRoute = router.noRoleRoute;
                }
                var routeName = '';//siteDescriptionBuilder.findRouteName(currentRoute);
                var routeDescciption = {roles: ['DEFAULT_ROLE']};//siteDescriptionBuilder.getRoute(routeName);
                //Test the user's role on the route.
                if((routeDescciption === undefined && currentRoute !== '') || !userHelper.hasRole(routeDescciption.roles)){
                    console.warn(`You don't have the needed role to see this page`);
                    message.addErrorMessage('application.noRights');
                    return Backbone.history.navigate('', true);
                }else {
                    //Rendre all the errors notifications in the stack.
                    //backboneNotification.renderNotifications();
                    _beforeRouting.apply(router, routeArguments);
                    //Call the instanciated router's method before performing the routing.
                    if(isFunction(router.beforeRoute)){
                        router.beforeRoute.apply(router, routeArguments);
                    }
                }
                //console.log('routeObject', siteDescriptionBuilder.getRoute(n));
                callback.apply(router, [...arguments]);

            };
            return Backbone.Router.prototype.route.call(this, urlRoute, name, customWrapperAroundCallback);
        },
        /**
        * Render the compoennt into the page content.
        */
        _pageContent(component, options){
            return render(component, '[data-focus="page-content"]', options);
        }
    }
);

export default createRouter;
