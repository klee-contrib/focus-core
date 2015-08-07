'use strict';

var React = require('react');
var dispatcher = require('../dispatcher');
var Empty = React.createClass({
  displayName: 'Empty',

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
  changeMode: function changeMode(newMode, previousMode) {
    var mode = { newMode: newMode, previousMode: previousMode };
    dispatcher.handleViewAction({ data: { mode: mode }, type: 'update' });
  },
  changeRoute: function changeRoute(newRoute) {
    dispatcher.handleViewAction({ data: { route: newRoute }, type: 'update' });
  },
  clearCartridge: function clearCartridge() {
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