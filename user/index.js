var userBuiltInStore = require('./built-in-store');
var userStoreInstance = userBuiltInStore();
var isArray = require('lodash/lang/isArray');
var intersection = require('lodash/array/intersection');
module.exports = {
  login: require('./login'),
  profile: require('./profile'),
  builtInStore: userBuiltInStore,
  hasRole(role){
    role = isArray(role) ? role : [role];
    return intersection(role, userStoreInstance.getRoles()).length > 0;
  }
};
