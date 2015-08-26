const userBuiltInStore = require('./built-in-store');
const isArray = require('lodash/lang/isArray');
const intersection = require('lodash/array/intersection');
const dispatcher = require('../dispatcher');
function _setUserNode(name, value){
    dispatcher.handleViewAction({data: {[name]: value}, type: 'update'});
}
module.exports = {
  builtInStore: userBuiltInStore,
  /**
   * Check if a user has the givent role or roles.
   * @param  {string | array}  role - Check if the user has one or many roles.
   * @return {Boolean} - True if the user has at least on of the givent roles.
   */
  hasRole(role){
    role = isArray(role) ? role : [role];
    return intersection(role, userBuiltInStore.getRoles()).length > 0;
  },
  /**
   * Set the user roles.
   * @param {array} roles - User role list.
   */
  setRoles(roles){
    _setUserNode('roles', roles);
  },
  /**
   * Get the user roles.
   * @return {array} - The user role list.
   */
  getRoles(){
    return userBuiltInStore.getRoles();
  },
  /**
   * Set the user profile.
   * @param {object} profile User profile.
   */
  setProfile(profile){
      _setUserNode('profile', profile);
  },
  /**
   * Get the user profile.
   * @return {object} profile User profile.
   */
  getProfile(){
      return userBuiltInStore.getProfile();
  },
  /**
   * Set user profile.
   * @param {object} login - user login.
   */
  setLogin(login){
      _setUserNode('login', login);
  },
  /**
   * Get the user login.
   * @return {object} - The user login.
   */
  getLogin(){
      return userBuiltInStore.getLogin();
  }
};
