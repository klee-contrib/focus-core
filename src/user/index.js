import userBuiltInStore from './built-in-store';
import isArray from 'lodash/lang/isArray';
import intersection from 'lodash/array/intersection';
import dispatcher from '../dispatcher';

/**
 * Set the a node in the store.
 * @param {string} name  node name
 * @param {string} value node value to be set
 */
function _setUserNode(name, value) {
    dispatcher.handleViewAction({ data: { [name]: value }, type: 'update' });
}
/**
* Check if a user has the givent role or roles.
* @param  {string | array}  role - Check if the user has one or many roles.
* @return {Boolean} - True if the user has at least on of the givent roles.
*/
function hasRole(role) {
    role = isArray(role) ? role : [role];
    return 0 < intersection(role, userBuiltInStore.getRoles()).length;
}
/**
    * Set the user roles.
    * @param {array} roles - User role list.
    */
function setRoles(roles) {
    _setUserNode('roles', roles);
}
/**
* Get the user roles.
* @return {array} - The user role list.
*/
function getRoles() {
    return userBuiltInStore.getRoles();
}
/**
* Set the user profile.
* @param {object} profile User profile.
*/
function setProfile(profile) {
    _setUserNode('profile', profile);
}
/**
* Get the user profile.
* @return {object} profile User profile.
*/
function getProfile() {
    return userBuiltInStore.getProfile();
}
/**
* Set user profile.
* @param {object} login - user login.
*/
function setLogin(login) {
    _setUserNode('login', login);
}
/**
* Get the user login.
* @return {object} - The user login.
*/
function getLogin() {
    return userBuiltInStore.getLogin();
}
export default {
    builtInStore: userBuiltInStore,
    hasRole,
    setRoles,
    getRoles,
    setProfile,
    getProfile,
    setLogin,
    getLogin
};

export {
    userBuiltInStore as builtInStore,
    hasRole,
    setRoles,
    getRoles,
    setProfile,
    getProfile,
    setLogin,
    getLogin
};
