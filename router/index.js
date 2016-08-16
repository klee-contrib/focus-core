'use strict';

var _backbone = require('backbone');

var _backbone2 = _interopRequireDefault(_backbone);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var render = require('../application/render');

var ArgumentNullException = require('../exception/argument-null-exception');
var message = require('../message');
var userHelper = require('../user');
var dispatcher = require('../dispatcher');
var application = require('../application');
var isFunction = require('lodash/lang/isFunction');
/**
 * Function call before each route.
 */
function _beforeRouting(newRoute) {
  //application.changeRoute(newRoute);
  application.clearHeader();
}
module.exports = _backbone2.default.Router.extend({
  noRoleRoute: 'home',
  route: function route(urlRoute, name, callback) {
    var router = this;
    if (!callback) {
      callback = this[name];
    }
    if (!callback) {
      console.warn('\n        The callback is not defined for your route, you should check these two points in the routes property of your router:\n        - You directly have a callback associated to your route: \'routeName\': function handleRoute(){ //do what you want}\n        - You have a string property, your router should have a function in its declaration with the same name as your property\n        For more informations please see http://backbonejs.org/#Router-route\n      ');
      throw new ArgumentNullException('The route callback seems to be undefined, please check your router file for your route: ' + name);
    }
    function customWrapperAroundCallback() {
      var currentRoute = urlRoute;
      //Rebuild the callback arguments.
      var routeArguments = [urlRoute].concat(Array.prototype.slice.call(arguments));

      if (router.log) {
        console.log('Route change: ' + urlRoute);
      }

      //The default route is the noRoleRoute by default
      if (currentRoute === '') {
        currentRoute = router.noRoleRoute;
      }
      var routeName = ''; //siteDescriptionBuilder.findRouteName(currentRoute);
      var routeDescciption = { roles: ['DEFAULT_ROLE'] }; //siteDescriptionBuilder.getRoute(routeName);
      //Test the user's role on the route.
      if (routeDescciption === undefined && currentRoute !== '' || !userHelper.hasRole(routeDescciption.roles)) {
        console.warn('You don\'t have the needed role to see this page');
        message.addErrorMessage('application.noRights');
        return _backbone2.default.history.navigate('', true);
      } else {
        //Rendre all the errors notifications in the stack.
        //backboneNotification.renderNotifications();
        _beforeRouting.apply(router, routeArguments);
        //Call the instanciated router's method before performing the routing.
        if (isFunction(router.beforeRoute)) {
          router.beforeRoute.apply(router, routeArguments);
        }
      }
      //console.log('routeObject', siteDescriptionBuilder.getRoute(n));
      callback.apply(router, [].concat(Array.prototype.slice.call(arguments)));
    };
    return _backbone2.default.Router.prototype.route.call(this, urlRoute, name, customWrapperAroundCallback);
  },
  /**
   * Render the compoennt into the page content.
   */
  _pageContent: function _pageContent(component, options) {
    return render(component, '[data-focus="page-content"]', options);
  }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInByb2Nlc3Nvci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUNBOzs7Ozs7QUFEQSxJQUFJLFNBQVMsUUFBUSx1QkFBUixDQUFiOztBQUVBLElBQUksd0JBQXdCLFFBQVEsc0NBQVIsQ0FBNUI7QUFDQSxJQUFJLFVBQVUsUUFBUSxZQUFSLENBQWQ7QUFDQSxJQUFJLGFBQWEsUUFBUSxTQUFSLENBQWpCO0FBQ0EsSUFBSSxhQUFhLFFBQVEsZUFBUixDQUFqQjtBQUNBLElBQUksY0FBYyxRQUFRLGdCQUFSLENBQWxCO0FBQ0EsSUFBSSxhQUFhLFFBQVEsd0JBQVIsQ0FBakI7QUFDQTs7O0FBR0EsU0FBUyxjQUFULENBQXdCLFFBQXhCLEVBQWlDO0FBQy9CO0FBQ0EsY0FBWSxXQUFaO0FBQ0Q7QUFDRCxPQUFPLE9BQVAsR0FBaUIsbUJBQVMsTUFBVCxDQUFnQixNQUFoQixDQUF1QjtBQUN0QyxlQUFhLE1BRHlCO0FBRXRDLFNBQVEsZUFBVSxRQUFWLEVBQW9CLElBQXBCLEVBQTBCLFFBQTFCLEVBQW9DO0FBQzFDLFFBQUksU0FBUyxJQUFiO0FBQ0EsUUFBSSxDQUFDLFFBQUwsRUFBYztBQUNaLGlCQUFXLEtBQUssSUFBTCxDQUFYO0FBQ0Q7QUFDRCxRQUFHLENBQUMsUUFBSixFQUFhO0FBQ1gsY0FBUSxJQUFSO0FBTUEsWUFBTSxJQUFJLHFCQUFKLDhGQUFxSCxJQUFySCxDQUFOO0FBQ0Q7QUFDRCxhQUFTLDJCQUFULEdBQXNDO0FBQ3BDLFVBQUksZUFBZSxRQUFuQjtBQUNBO0FBQ0EsVUFBSSxrQkFBa0IsUUFBbEIsb0NBQWdDLFNBQWhDLEVBQUo7O0FBRUEsVUFBRyxPQUFPLEdBQVYsRUFBYztBQUNaLGdCQUFRLEdBQVIsb0JBQTZCLFFBQTdCO0FBQ0Q7O0FBRUQ7QUFDQSxVQUFHLGlCQUFpQixFQUFwQixFQUF1QjtBQUNyQix1QkFBZSxPQUFPLFdBQXRCO0FBQ0Q7QUFDRCxVQUFJLFlBQVksRUFBaEIsQ0Fib0MsQ0FhakI7QUFDbkIsVUFBSSxtQkFBbUIsRUFBQyxPQUFPLENBQUMsY0FBRCxDQUFSLEVBQXZCLENBZG9DLENBY2E7QUFDakQ7QUFDQSxVQUFJLHFCQUFxQixTQUFyQixJQUFrQyxpQkFBaUIsRUFBcEQsSUFBMkQsQ0FBQyxXQUFXLE9BQVgsQ0FBbUIsaUJBQWlCLEtBQXBDLENBQS9ELEVBQTBHO0FBQ3hHLGdCQUFRLElBQVI7QUFDQSxnQkFBUSxlQUFSLENBQXdCLHNCQUF4QjtBQUNBLGVBQU8sbUJBQVMsT0FBVCxDQUFpQixRQUFqQixDQUEwQixFQUExQixFQUE4QixJQUE5QixDQUFQO0FBQ0QsT0FKRCxNQUlNO0FBQ0o7QUFDQTtBQUNBLHVCQUFlLEtBQWYsQ0FBcUIsTUFBckIsRUFBNkIsY0FBN0I7QUFDQTtBQUNBLFlBQUcsV0FBVyxPQUFPLFdBQWxCLENBQUgsRUFBa0M7QUFDaEMsaUJBQU8sV0FBUCxDQUFtQixLQUFuQixDQUF5QixNQUF6QixFQUFpQyxjQUFqQztBQUNEO0FBQ0Y7QUFDRDtBQUNBLGVBQVMsS0FBVCxDQUFlLE1BQWYsdUNBQTJCLFNBQTNCO0FBRUg7QUFDQyxXQUFPLG1CQUFTLE1BQVQsQ0FBZ0IsU0FBaEIsQ0FBMEIsS0FBMUIsQ0FBZ0MsSUFBaEMsQ0FBcUMsSUFBckMsRUFBMkMsUUFBM0MsRUFBcUQsSUFBckQsRUFBMkQsMkJBQTNELENBQVA7QUFDRCxHQWxEcUM7QUFtRHRDOzs7QUFHQSxjQXREc0Msd0JBc0R6QixTQXREeUIsRUFzRGQsT0F0RGMsRUFzRE47QUFDOUIsV0FBTyxPQUFPLFNBQVAsRUFBa0IsNkJBQWxCLEVBQWlELE9BQWpELENBQVA7QUFDRDtBQXhEcUMsQ0FBdkIsQ0FBakIiLCJmaWxlIjoicHJvY2Vzc29yLmpzIiwic291cmNlc0NvbnRlbnQiOlsidmFyIHJlbmRlciA9IHJlcXVpcmUoJy4uL2FwcGxpY2F0aW9uL3JlbmRlcicpO1xyXG5pbXBvcnQgQmFja2JvbmUgZnJvbSAnYmFja2JvbmUnO1xyXG52YXIgQXJndW1lbnROdWxsRXhjZXB0aW9uID0gcmVxdWlyZSgnLi4vZXhjZXB0aW9uL2FyZ3VtZW50LW51bGwtZXhjZXB0aW9uJyk7XHJcbnZhciBtZXNzYWdlID0gcmVxdWlyZSgnLi4vbWVzc2FnZScpO1xyXG52YXIgdXNlckhlbHBlciA9IHJlcXVpcmUoJy4uL3VzZXInKTtcclxudmFyIGRpc3BhdGNoZXIgPSByZXF1aXJlKCcuLi9kaXNwYXRjaGVyJyk7XHJcbnZhciBhcHBsaWNhdGlvbiA9IHJlcXVpcmUoJy4uL2FwcGxpY2F0aW9uJyk7XHJcbnZhciBpc0Z1bmN0aW9uID0gcmVxdWlyZSgnbG9kYXNoL2xhbmcvaXNGdW5jdGlvbicpO1xyXG4vKipcclxuICogRnVuY3Rpb24gY2FsbCBiZWZvcmUgZWFjaCByb3V0ZS5cclxuICovXHJcbmZ1bmN0aW9uIF9iZWZvcmVSb3V0aW5nKG5ld1JvdXRlKXtcclxuICAvL2FwcGxpY2F0aW9uLmNoYW5nZVJvdXRlKG5ld1JvdXRlKTtcclxuICBhcHBsaWNhdGlvbi5jbGVhckhlYWRlcigpO1xyXG59XHJcbm1vZHVsZS5leHBvcnRzID0gQmFja2JvbmUuUm91dGVyLmV4dGVuZCh7XHJcbiAgbm9Sb2xlUm91dGU6ICdob21lJyxcclxuICByb3V0ZSA6IGZ1bmN0aW9uICh1cmxSb3V0ZSwgbmFtZSwgY2FsbGJhY2spIHtcclxuICAgIHZhciByb3V0ZXIgPSB0aGlzO1xyXG4gICAgaWYgKCFjYWxsYmFjayl7XHJcbiAgICAgIGNhbGxiYWNrID0gdGhpc1tuYW1lXTtcclxuICAgIH1cclxuICAgIGlmKCFjYWxsYmFjayl7XHJcbiAgICAgIGNvbnNvbGUud2FybihgXHJcbiAgICAgICAgVGhlIGNhbGxiYWNrIGlzIG5vdCBkZWZpbmVkIGZvciB5b3VyIHJvdXRlLCB5b3Ugc2hvdWxkIGNoZWNrIHRoZXNlIHR3byBwb2ludHMgaW4gdGhlIHJvdXRlcyBwcm9wZXJ0eSBvZiB5b3VyIHJvdXRlcjpcclxuICAgICAgICAtIFlvdSBkaXJlY3RseSBoYXZlIGEgY2FsbGJhY2sgYXNzb2NpYXRlZCB0byB5b3VyIHJvdXRlOiAncm91dGVOYW1lJzogZnVuY3Rpb24gaGFuZGxlUm91dGUoKXsgLy9kbyB3aGF0IHlvdSB3YW50fVxyXG4gICAgICAgIC0gWW91IGhhdmUgYSBzdHJpbmcgcHJvcGVydHksIHlvdXIgcm91dGVyIHNob3VsZCBoYXZlIGEgZnVuY3Rpb24gaW4gaXRzIGRlY2xhcmF0aW9uIHdpdGggdGhlIHNhbWUgbmFtZSBhcyB5b3VyIHByb3BlcnR5XHJcbiAgICAgICAgRm9yIG1vcmUgaW5mb3JtYXRpb25zIHBsZWFzZSBzZWUgaHR0cDovL2JhY2tib25lanMub3JnLyNSb3V0ZXItcm91dGVcclxuICAgICAgYCk7XHJcbiAgICAgIHRocm93IG5ldyBBcmd1bWVudE51bGxFeGNlcHRpb24oYFRoZSByb3V0ZSBjYWxsYmFjayBzZWVtcyB0byBiZSB1bmRlZmluZWQsIHBsZWFzZSBjaGVjayB5b3VyIHJvdXRlciBmaWxlIGZvciB5b3VyIHJvdXRlOiAke25hbWV9YCk7XHJcbiAgICB9XHJcbiAgICBmdW5jdGlvbiBjdXN0b21XcmFwcGVyQXJvdW5kQ2FsbGJhY2soKXtcclxuICAgICAgdmFyIGN1cnJlbnRSb3V0ZSA9IHVybFJvdXRlO1xyXG4gICAgICAvL1JlYnVpbGQgdGhlIGNhbGxiYWNrIGFyZ3VtZW50cy5cclxuICAgICAgdmFyIHJvdXRlQXJndW1lbnRzID0gW3VybFJvdXRlICwgLi4uYXJndW1lbnRzXTtcclxuXHJcbiAgICAgIGlmKHJvdXRlci5sb2cpe1xyXG4gICAgICAgIGNvbnNvbGUubG9nKGBSb3V0ZSBjaGFuZ2U6ICR7dXJsUm91dGV9YCk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIC8vVGhlIGRlZmF1bHQgcm91dGUgaXMgdGhlIG5vUm9sZVJvdXRlIGJ5IGRlZmF1bHRcclxuICAgICAgaWYoY3VycmVudFJvdXRlID09PSAnJyl7XHJcbiAgICAgICAgY3VycmVudFJvdXRlID0gcm91dGVyLm5vUm9sZVJvdXRlO1xyXG4gICAgICB9XHJcbiAgICAgIHZhciByb3V0ZU5hbWUgPSAnJzsvL3NpdGVEZXNjcmlwdGlvbkJ1aWxkZXIuZmluZFJvdXRlTmFtZShjdXJyZW50Um91dGUpO1xyXG4gICAgICB2YXIgcm91dGVEZXNjY2lwdGlvbiA9IHtyb2xlczogWydERUZBVUxUX1JPTEUnXX07Ly9zaXRlRGVzY3JpcHRpb25CdWlsZGVyLmdldFJvdXRlKHJvdXRlTmFtZSk7XHJcbiAgICAgIC8vVGVzdCB0aGUgdXNlcidzIHJvbGUgb24gdGhlIHJvdXRlLlxyXG4gICAgICBpZigocm91dGVEZXNjY2lwdGlvbiA9PT0gdW5kZWZpbmVkICYmIGN1cnJlbnRSb3V0ZSAhPT0gJycpIHx8ICF1c2VySGVscGVyLmhhc1JvbGUocm91dGVEZXNjY2lwdGlvbi5yb2xlcykpe1xyXG4gICAgICAgIGNvbnNvbGUud2FybihgWW91IGRvbid0IGhhdmUgdGhlIG5lZWRlZCByb2xlIHRvIHNlZSB0aGlzIHBhZ2VgKTtcclxuICAgICAgICBtZXNzYWdlLmFkZEVycm9yTWVzc2FnZSgnYXBwbGljYXRpb24ubm9SaWdodHMnKTtcclxuICAgICAgICByZXR1cm4gQmFja2JvbmUuaGlzdG9yeS5uYXZpZ2F0ZSgnJywgdHJ1ZSk7XHJcbiAgICAgIH1lbHNlIHtcclxuICAgICAgICAvL1JlbmRyZSBhbGwgdGhlIGVycm9ycyBub3RpZmljYXRpb25zIGluIHRoZSBzdGFjay5cclxuICAgICAgICAvL2JhY2tib25lTm90aWZpY2F0aW9uLnJlbmRlck5vdGlmaWNhdGlvbnMoKTtcclxuICAgICAgICBfYmVmb3JlUm91dGluZy5hcHBseShyb3V0ZXIsIHJvdXRlQXJndW1lbnRzKTtcclxuICAgICAgICAvL0NhbGwgdGhlIGluc3RhbmNpYXRlZCByb3V0ZXIncyBtZXRob2QgYmVmb3JlIHBlcmZvcm1pbmcgdGhlIHJvdXRpbmcuXHJcbiAgICAgICAgaWYoaXNGdW5jdGlvbihyb3V0ZXIuYmVmb3JlUm91dGUpKXtcclxuICAgICAgICAgIHJvdXRlci5iZWZvcmVSb3V0ZS5hcHBseShyb3V0ZXIsIHJvdXRlQXJndW1lbnRzKTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgICAgLy9jb25zb2xlLmxvZygncm91dGVPYmplY3QnLCBzaXRlRGVzY3JpcHRpb25CdWlsZGVyLmdldFJvdXRlKG4pKTtcclxuICAgICAgY2FsbGJhY2suYXBwbHkocm91dGVyLCBbLi4uYXJndW1lbnRzXSk7XHJcblxyXG4gIH07XHJcbiAgICByZXR1cm4gQmFja2JvbmUuUm91dGVyLnByb3RvdHlwZS5yb3V0ZS5jYWxsKHRoaXMsIHVybFJvdXRlLCBuYW1lLCBjdXN0b21XcmFwcGVyQXJvdW5kQ2FsbGJhY2spO1xyXG4gIH0sXHJcbiAgLyoqXHJcbiAgICogUmVuZGVyIHRoZSBjb21wb2VubnQgaW50byB0aGUgcGFnZSBjb250ZW50LlxyXG4gICAqL1xyXG4gIF9wYWdlQ29udGVudChjb21wb25lbnQsIG9wdGlvbnMpe1xyXG4gICAgcmV0dXJuIHJlbmRlcihjb21wb25lbnQsICdbZGF0YS1mb2N1cz1cInBhZ2UtY29udGVudFwiXScsIG9wdGlvbnMpO1xyXG4gIH1cclxufSk7XHJcbiJdfQ==