const React = require('react');
const dispatcher = require('../dispatcher');
import {isUndefined} from 'lodash/lang';
import confirm from './confirm';
//Empty compoennt.
const Empty = props => <div data-focus='empty'></div>;
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
     * Set component to application's header.
     * @param {ReactComponent} cartridge     component injected in the cartridge
     * @param {ReactComponent} summary       component injected in the summary bar
     * @param {ReactComponent} actions       arrays of cartridge actions
     * @param {ReactComponent} barLeft       component injected in the left bar
     * @param {ReactComponent} canDeploy     indicates wether the cartridge can deploy or not
     * @param {ReactComponent} barRight      component injected in the right bar
     * @param {ReactComponent} EmptyComponent Empty component
     */
    setHeader({cartridge, summary, actions, barLeft, canDeploy, barRight, EmptyComponent = Empty}) {
        const data = {
            cartridgeComponent: cartridge || {component: EmptyComponent},
            summaryComponent: summary || {component: EmptyComponent},
            actions: actions || {primary: [], secondary: []},
            barContentLeftComponent: barLeft || {component: EmptyComponent},
            canDeploy: isUndefined(canDeploy) ? true : canDeploy
        };

        if (barRight) {
            data.barContentRightComponent = barRight;
        }

        dispatcher.handleViewAction({data, type: 'update'});
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
    const setPartialHeader = function setPartialHeader({cartridge, summary, actions, barLeft, barRight, canDeploy}) {
        const data = {
            canDeploy: isUndefined(canDeploy) ? true : canDeploy
        };
    
        if(cartridge) {
            data.cartridgeComponent = cartridge;
        }
        if(summary) {
            data.summaryComponent = summary;
        }
        if(actions) {
            data.actions = actions;
        }
        if(barLeft) {
            data.barContentLeftComponent = barLeft;
        }
        if(barRight) {
            data.barContentRightComponent = barRight;
        }
    
        dispatcher.handleViewAction({data, type: 'update'});
    }
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
    },
    confirm
};
