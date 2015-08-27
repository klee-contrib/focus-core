const React = require('react');
const dispatcher = require('../dispatcher');
//Empty compoennt.
const Empty = React.createClass({
    /** @inheritdoc */
    displayName: 'Empty',
    /** @inheritdoc */
    render() {
        return <div></div>;
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
    changeMode(newMode, previousMode){
        const mode = {newMode: newMode, previousMode: previousMode};
        dispatcher.handleViewAction({data: {mode: mode}, type: 'update'});
    },
    /**
     * Change application route (maybe not the wole route but a route's group.)
     * @param  {string} newRoute - new route name.
     */
    changeRoute(newRoute){
        dispatcher.handleViewAction({data: {route: newRoute}, type: 'update'});
    },
    /**
     * Clear the application's header.
     * @return {[type]} [description]
     */
    clearHeader(){
        dispatcher.handleViewAction({
            data: {
                cartridgeComponent: {component: Empty},
                barContentLeftComponent: {component: Empty},
                summaryComponent: {component: Empty},
                actions: {primary: [], secondary: []}
            },
            type: 'update'
        });
    }
};
