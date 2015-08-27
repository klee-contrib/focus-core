'use strict';

var React = require('react');
var dispatcher = require('../dispatcher');
//Empty compoennt.
var Empty = React.createClass({
    /** @inheritdoc */
    displayName: 'Empty',
    /** @inheritdoc */
    render: function render() {
        return React.createElement('div', null);
    }
});

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
    }
};