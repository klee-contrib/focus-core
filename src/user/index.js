var userBuiltInStore = require('./built-in-store');

var isArray = require('lodash/lang/isArray');
var intersection = require('lodash/array/intersection');
var dispatcher = require('../dispatcher');
module.exports = {
  login: require('./login'),
  profile: require('./profile'),
  builtInStore: userBuiltInStore,
  hasRole(role){
    role = isArray(role) ? role : [role];
    return intersection(role, userBuiltInStore.getRoles()).length > 0;
  },
  setRoles(roles){
    dispatcher.handleViewAction({data: {roles: roles}, type: 'update'});
  },
  getRoles(){
    return userBuiltInStore.getRoles();
  }
};
