'use strict';

var _lang = require('lodash/lang');

var _confirm = require('./confirm');

var _confirm2 = _interopRequireDefault(_confirm);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var React = require('react');
var dispatcher = require('../dispatcher');

//Empty compoennt.
var Empty = function Empty(props) {
    return React.createElement('div', { 'data-focus': 'empty' });
};
Empty.displayName = 'Empty';

module.exports = {
    render: require('./render'),
    builtInStore: require('./built-in-store'),
    actionBuilder: require('./action-builder'),
    clear: require('./clear'),
    mountedComponents: require('./mounted-components'),
    /**
     * Change application mode.
     * @param  {string} newMode      - New application mode.
     * @param  {string} previousMode - Previous mode.
     */
    changeMode: function changeMode(newMode, previousMode) {
        var mode = { newMode: newMode, previousMode: previousMode };
        dispatcher.handleViewAction({ data: { mode: mode }, type: 'update' });
    },

    /**
     * Change application route (maybe not the wole route but a route's group.)
     * @param  {string} newRoute - new route name.
     */
    changeRoute: function changeRoute(newRoute) {
        dispatcher.handleViewAction({ data: { route: newRoute }, type: 'update' });
    },

    /**
     * Set component to application's header.
     * @param {ReactComponent} cartridge     component injected in the cartridge
     * @param {ReactComponent} summary       component injected in the summary bar
     * @param {ReactComponent} actions       arrays of cartridge actions
     * @param {ReactComponent} barLeft       component injected in the left bar
     * @param {ReactComponent} canDeploy     indicates wether the cartridge can deploy or not
     * @param {ReactComponent} barRight      component injected in the right bar
     * @param {ReactComponent} EmptyComponent Empty component
     */
    setHeader: function setHeader(_ref) {
        var cartridge = _ref.cartridge;
        var summary = _ref.summary;
        var actions = _ref.actions;
        var barLeft = _ref.barLeft;
        var canDeploy = _ref.canDeploy;
        var barRight = _ref.barRight;
        var _ref$EmptyComponent = _ref.EmptyComponent;
        var EmptyComponent = _ref$EmptyComponent === undefined ? Empty : _ref$EmptyComponent;

        var data = {
            cartridgeComponent: cartridge || { component: EmptyComponent },
            summaryComponent: summary || { component: EmptyComponent },
            actions: actions || { primary: [], secondary: [] },
            barContentLeftComponent: barLeft || { component: EmptyComponent },
            canDeploy: (0, _lang.isUndefined)(canDeploy) ? true : canDeploy
        };

        if (barRight) {
            data.barContentRightComponent = barRight;
        }

        dispatcher.handleViewAction({ data: data, type: 'update' });
    },

    /**
     * Set component to application's header with only the component gived in parameter.
     * @param {ReactComponent} cartridge     component injected in the cartridge
     * @param {ReactComponent} summary       component injected in the summary bar
     * @param {ReactComponent} actions       arrays of cartridge actions
     * @param {ReactComponent} barLeft       component injected in the left bar
     * @param {ReactComponent} canDeploy     indicates wether the cartridge can deploy or not
     * @param {ReactComponent} barRight      component injected in the right bar
     * @param {ReactComponent} EmptyComponent Empty component
     */
    setPartialHeader: function setPartialHeader(_ref2) {
        var cartridge = _ref2.cartridge;
        var summary = _ref2.summary;
        var actions = _ref2.actions;
        var barLeft = _ref2.barLeft;
        var barRight = _ref2.barRight;
        var canDeploy = _ref2.canDeploy;

        var data = {
            canDeploy: (0, _lang.isUndefined)(canDeploy) ? true : canDeploy
        };

        if (cartridge) {
            data.cartridgeComponent = cartridge;
        }
        if (summary) {
            data.summaryComponent = summary;
        }
        if (actions) {
            data.actions = actions;
        }
        if (barLeft) {
            data.barContentLeftComponent = barLeft;
        }
        if (barRight) {
            data.barContentRightComponent = barRight;
        }

        dispatcher.handleViewAction({ data: data, type: 'update' });
    },

    /**
     * Clear the application's header.
     * @return {[type]} [description]
     */
    clearHeader: function clearHeader() {
        dispatcher.handleViewAction({
            data: {
                cartridgeComponent: { component: Empty },
                barContentLeftComponent: { component: Empty },
                summaryComponent: { component: Empty },
                actions: { primary: [], secondary: [] }
            },
            type: 'update'
        });
    },

    confirm: _confirm2.default
};
//# sourceMappingURL=data:application/json;base64,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O0FBQ0g7QUFDRCxZQUFHLFFBQUgsRUFBYTtBQUNULGlCQUFLLHdCQUFMLEdBQWdDLFFBQWhDO0FBQ0g7O0FBRUQsbUJBQVcsZ0JBQVgsQ0FBNEIsRUFBQyxVQUFELEVBQU8sTUFBTSxRQUFiLEVBQTVCO0FBQ0gsS0EvRVk7O0FBZ0ZiOzs7O0FBSUEsZUFwRmEseUJBb0ZBO0FBQ1QsbUJBQVcsZ0JBQVgsQ0FBNEI7QUFDeEIsa0JBQU07QUFDRixvQ0FBb0IsRUFBQyxXQUFXLEtBQVosRUFEbEI7QUFFRix5Q0FBeUIsRUFBQyxXQUFXLEtBQVosRUFGdkI7QUFHRixrQ0FBa0IsRUFBQyxXQUFXLEtBQVosRUFIaEI7QUFJRix5QkFBUyxFQUFDLFNBQVMsRUFBVixFQUFjLFdBQVcsRUFBekI7QUFKUCxhQURrQjtBQU94QixrQkFBTTtBQVBrQixTQUE1QjtBQVNILEtBOUZZOztBQStGYjtBQS9GYSxDQUFqQiIsImZpbGUiOiJwcm9jZXNzb3IuanMiLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCBSZWFjdCA9IHJlcXVpcmUoJ3JlYWN0Jyk7XHJcbmNvbnN0IGRpc3BhdGNoZXIgPSByZXF1aXJlKCcuLi9kaXNwYXRjaGVyJyk7XHJcbmltcG9ydCB7aXNVbmRlZmluZWR9IGZyb20gJ2xvZGFzaC9sYW5nJztcclxuaW1wb3J0IGNvbmZpcm0gZnJvbSAnLi9jb25maXJtJztcclxuLy9FbXB0eSBjb21wb2VubnQuXHJcbmNvbnN0IEVtcHR5ID0gcHJvcHMgPT4gPGRpdiBkYXRhLWZvY3VzPSdlbXB0eSc+PC9kaXY+O1xyXG5FbXB0eS5kaXNwbGF5TmFtZSA9ICdFbXB0eSc7XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IHtcclxuICAgIHJlbmRlcjogcmVxdWlyZSgnLi9yZW5kZXInKSxcclxuICAgIGJ1aWx0SW5TdG9yZTogcmVxdWlyZSgnLi9idWlsdC1pbi1zdG9yZScpLFxyXG4gICAgYWN0aW9uQnVpbGRlcjogcmVxdWlyZSgnLi9hY3Rpb24tYnVpbGRlcicpLFxyXG4gICAgY2xlYXI6IHJlcXVpcmUoJy4vY2xlYXInKSxcclxuICAgIG1vdW50ZWRDb21wb25lbnRzOiByZXF1aXJlKCcuL21vdW50ZWQtY29tcG9uZW50cycpLFxyXG4gICAgLyoqXHJcbiAgICAgKiBDaGFuZ2UgYXBwbGljYXRpb24gbW9kZS5cclxuICAgICAqIEBwYXJhbSAge3N0cmluZ30gbmV3TW9kZSAgICAgIC0gTmV3IGFwcGxpY2F0aW9uIG1vZGUuXHJcbiAgICAgKiBAcGFyYW0gIHtzdHJpbmd9IHByZXZpb3VzTW9kZSAtIFByZXZpb3VzIG1vZGUuXHJcbiAgICAgKi9cclxuICAgIGNoYW5nZU1vZGUobmV3TW9kZSwgcHJldmlvdXNNb2RlKXtcclxuICAgICAgICBjb25zdCBtb2RlID0ge25ld01vZGU6IG5ld01vZGUsIHByZXZpb3VzTW9kZTogcHJldmlvdXNNb2RlfTtcclxuICAgICAgICBkaXNwYXRjaGVyLmhhbmRsZVZpZXdBY3Rpb24oe2RhdGE6IHttb2RlOiBtb2RlfSwgdHlwZTogJ3VwZGF0ZSd9KTtcclxuICAgIH0sXHJcbiAgICAvKipcclxuICAgICAqIENoYW5nZSBhcHBsaWNhdGlvbiByb3V0ZSAobWF5YmUgbm90IHRoZSB3b2xlIHJvdXRlIGJ1dCBhIHJvdXRlJ3MgZ3JvdXAuKVxyXG4gICAgICogQHBhcmFtICB7c3RyaW5nfSBuZXdSb3V0ZSAtIG5ldyByb3V0ZSBuYW1lLlxyXG4gICAgICovXHJcbiAgICBjaGFuZ2VSb3V0ZShuZXdSb3V0ZSl7XHJcbiAgICAgICAgZGlzcGF0Y2hlci5oYW5kbGVWaWV3QWN0aW9uKHtkYXRhOiB7cm91dGU6IG5ld1JvdXRlfSwgdHlwZTogJ3VwZGF0ZSd9KTtcclxuICAgIH0sXHJcbiAgICAvKipcclxuICAgICAqIFNldCBjb21wb25lbnQgdG8gYXBwbGljYXRpb24ncyBoZWFkZXIuXHJcbiAgICAgKiBAcGFyYW0ge1JlYWN0Q29tcG9uZW50fSBjYXJ0cmlkZ2UgICAgIGNvbXBvbmVudCBpbmplY3RlZCBpbiB0aGUgY2FydHJpZGdlXHJcbiAgICAgKiBAcGFyYW0ge1JlYWN0Q29tcG9uZW50fSBzdW1tYXJ5ICAgICAgIGNvbXBvbmVudCBpbmplY3RlZCBpbiB0aGUgc3VtbWFyeSBiYXJcclxuICAgICAqIEBwYXJhbSB7UmVhY3RDb21wb25lbnR9IGFjdGlvbnMgICAgICAgYXJyYXlzIG9mIGNhcnRyaWRnZSBhY3Rpb25zXHJcbiAgICAgKiBAcGFyYW0ge1JlYWN0Q29tcG9uZW50fSBiYXJMZWZ0ICAgICAgIGNvbXBvbmVudCBpbmplY3RlZCBpbiB0aGUgbGVmdCBiYXJcclxuICAgICAqIEBwYXJhbSB7UmVhY3RDb21wb25lbnR9IGNhbkRlcGxveSAgICAgaW5kaWNhdGVzIHdldGhlciB0aGUgY2FydHJpZGdlIGNhbiBkZXBsb3kgb3Igbm90XHJcbiAgICAgKiBAcGFyYW0ge1JlYWN0Q29tcG9uZW50fSBiYXJSaWdodCAgICAgIGNvbXBvbmVudCBpbmplY3RlZCBpbiB0aGUgcmlnaHQgYmFyXHJcbiAgICAgKiBAcGFyYW0ge1JlYWN0Q29tcG9uZW50fSBFbXB0eUNvbXBvbmVudCBFbXB0eSBjb21wb25lbnRcclxuICAgICAqL1xyXG4gICAgc2V0SGVhZGVyKHtjYXJ0cmlkZ2UsIHN1bW1hcnksIGFjdGlvbnMsIGJhckxlZnQsIGNhbkRlcGxveSwgYmFyUmlnaHQsIEVtcHR5Q29tcG9uZW50ID0gRW1wdHl9KSB7XHJcbiAgICAgICAgY29uc3QgZGF0YSA9IHtcclxuICAgICAgICAgICAgY2FydHJpZGdlQ29tcG9uZW50OiBjYXJ0cmlkZ2UgfHwge2NvbXBvbmVudDogRW1wdHlDb21wb25lbnR9LFxyXG4gICAgICAgICAgICBzdW1tYXJ5Q29tcG9uZW50OiBzdW1tYXJ5IHx8IHtjb21wb25lbnQ6IEVtcHR5Q29tcG9uZW50fSxcclxuICAgICAgICAgICAgYWN0aW9uczogYWN0aW9ucyB8fCB7cHJpbWFyeTogW10sIHNlY29uZGFyeTogW119LFxyXG4gICAgICAgICAgICBiYXJDb250ZW50TGVmdENvbXBvbmVudDogYmFyTGVmdCB8fCB7Y29tcG9uZW50OiBFbXB0eUNvbXBvbmVudH0sXHJcbiAgICAgICAgICAgIGNhbkRlcGxveTogaXNVbmRlZmluZWQoY2FuRGVwbG95KSA/IHRydWUgOiBjYW5EZXBsb3lcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICBpZiAoYmFyUmlnaHQpIHtcclxuICAgICAgICAgICAgZGF0YS5iYXJDb250ZW50UmlnaHRDb21wb25lbnQgPSBiYXJSaWdodDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGRpc3BhdGNoZXIuaGFuZGxlVmlld0FjdGlvbih7ZGF0YSwgdHlwZTogJ3VwZGF0ZSd9KTtcclxuICAgIH0sXHJcbiAgICAvKipcclxuICAgICAqIFNldCBjb21wb25lbnQgdG8gYXBwbGljYXRpb24ncyBoZWFkZXIgd2l0aCBvbmx5IHRoZSBjb21wb25lbnQgZ2l2ZWQgaW4gcGFyYW1ldGVyLlxyXG4gICAgICogQHBhcmFtIHtSZWFjdENvbXBvbmVudH0gY2FydHJpZGdlICAgICBjb21wb25lbnQgaW5qZWN0ZWQgaW4gdGhlIGNhcnRyaWRnZVxyXG4gICAgICogQHBhcmFtIHtSZWFjdENvbXBvbmVudH0gc3VtbWFyeSAgICAgICBjb21wb25lbnQgaW5qZWN0ZWQgaW4gdGhlIHN1bW1hcnkgYmFyXHJcbiAgICAgKiBAcGFyYW0ge1JlYWN0Q29tcG9uZW50fSBhY3Rpb25zICAgICAgIGFycmF5cyBvZiBjYXJ0cmlkZ2UgYWN0aW9uc1xyXG4gICAgICogQHBhcmFtIHtSZWFjdENvbXBvbmVudH0gYmFyTGVmdCAgICAgICBjb21wb25lbnQgaW5qZWN0ZWQgaW4gdGhlIGxlZnQgYmFyXHJcbiAgICAgKiBAcGFyYW0ge1JlYWN0Q29tcG9uZW50fSBjYW5EZXBsb3kgICAgIGluZGljYXRlcyB3ZXRoZXIgdGhlIGNhcnRyaWRnZSBjYW4gZGVwbG95IG9yIG5vdFxyXG4gICAgICogQHBhcmFtIHtSZWFjdENvbXBvbmVudH0gYmFyUmlnaHQgICAgICBjb21wb25lbnQgaW5qZWN0ZWQgaW4gdGhlIHJpZ2h0IGJhclxyXG4gICAgICogQHBhcmFtIHtSZWFjdENvbXBvbmVudH0gRW1wdHlDb21wb25lbnQgRW1wdHkgY29tcG9uZW50XHJcbiAgICAgKi9cclxuICAgIHNldFBhcnRpYWxIZWFkZXIoe2NhcnRyaWRnZSwgc3VtbWFyeSwgYWN0aW9ucywgYmFyTGVmdCwgYmFyUmlnaHQsIGNhbkRlcGxveX0pIHtcclxuICAgICAgICBjb25zdCBkYXRhID0ge1xyXG4gICAgICAgICAgICBjYW5EZXBsb3k6IGlzVW5kZWZpbmVkKGNhbkRlcGxveSkgPyB0cnVlIDogY2FuRGVwbG95XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgaWYoY2FydHJpZGdlKSB7XHJcbiAgICAgICAgICAgIGRhdGEuY2FydHJpZGdlQ29tcG9uZW50ID0gY2FydHJpZGdlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZihzdW1tYXJ5KSB7XHJcbiAgICAgICAgICAgIGRhdGEuc3VtbWFyeUNvbXBvbmVudCA9IHN1bW1hcnk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKGFjdGlvbnMpIHtcclxuICAgICAgICAgICAgZGF0YS5hY3Rpb25zID0gYWN0aW9ucztcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYoYmFyTGVmdCkge1xyXG4gICAgICAgICAgICBkYXRhLmJhckNvbnRlbnRMZWZ0Q29tcG9uZW50ID0gYmFyTGVmdDtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYoYmFyUmlnaHQpIHtcclxuICAgICAgICAgICAgZGF0YS5iYXJDb250ZW50UmlnaHRDb21wb25lbnQgPSBiYXJSaWdodDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGRpc3BhdGNoZXIuaGFuZGxlVmlld0FjdGlvbih7ZGF0YSwgdHlwZTogJ3VwZGF0ZSd9KTtcclxuICAgIH0sXHJcbiAgICAvKipcclxuICAgICAqIENsZWFyIHRoZSBhcHBsaWNhdGlvbidzIGhlYWRlci5cclxuICAgICAqIEByZXR1cm4ge1t0eXBlXX0gW2Rlc2NyaXB0aW9uXVxyXG4gICAgICovXHJcbiAgICBjbGVhckhlYWRlcigpe1xyXG4gICAgICAgIGRpc3BhdGNoZXIuaGFuZGxlVmlld0FjdGlvbih7XHJcbiAgICAgICAgICAgIGRhdGE6IHtcclxuICAgICAgICAgICAgICAgIGNhcnRyaWRnZUNvbXBvbmVudDoge2NvbXBvbmVudDogRW1wdHl9LFxyXG4gICAgICAgICAgICAgICAgYmFyQ29udGVudExlZnRDb21wb25lbnQ6IHtjb21wb25lbnQ6IEVtcHR5fSxcclxuICAgICAgICAgICAgICAgIHN1bW1hcnlDb21wb25lbnQ6IHtjb21wb25lbnQ6IEVtcHR5fSxcclxuICAgICAgICAgICAgICAgIGFjdGlvbnM6IHtwcmltYXJ5OiBbXSwgc2Vjb25kYXJ5OiBbXX1cclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgdHlwZTogJ3VwZGF0ZSdcclxuICAgICAgICB9KTtcclxuICAgIH0sXHJcbiAgICBjb25maXJtXHJcbn07XHJcbiJdfQ==