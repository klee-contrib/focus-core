var dispatcher = require('../dispatcher');
module.exports = {
  render: require('./render'),
  builtInStore: require('./built-in-store'),
  actionBuilder: require('./action-builder'),
  clear: require('./clear'),
  mountedComponents: require('./mounted-components'),
  changeMode(newMode, previousMode){
    var mode = {newMode: newMode, previousMode: previousMode};
    dispatcher.handleViewAction({data: {mode: mode}, type: 'update'});
  },
  changeRoute(newRoute){
    dispatcher.handleViewAction({data: {route: newRoute}, type: 'update'});
  }
};
