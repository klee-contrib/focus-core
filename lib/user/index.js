'use strict';

var userBuiltInStore = require('./built-in-store');
var isArray = require('lodash/lang/isArray');
var intersection = require('lodash/array/intersection');
var dispatcher = require('../dispatcher');

/**
 * Set the a node in the store.
 * @param {string} name  node name
 * @param {string} value node value to be set
 */
function _setUserNode(name, value) {
    var _data;

    dispatcher.handleViewAction({ data: (_data = {}, _data[name] = value, _data), type: 'update' });
}
module.exports = {
    builtInStore: userBuiltInStore,
    /**
    * Check if a user has the givent role or roles.
    * @param  {string | array}  role - Check if the user has one or many roles.
    * @return {Boolean} - True if the user has at least on of the givent roles.
    */
    hasRole: function hasRole(role) {
        role = isArray(role) ? role : [role];
        return 0 < intersection(role, userBuiltInStore.getRoles()).length;
    },
    /**
    * Set the user roles.
    * @param {array} roles - User role list.
    */
    setRoles: function setRoles(roles) {
        _setUserNode('roles', roles);
    },
    /**
    * Get the user roles.
    * @return {array} - The user role list.
    */
    getRoles: function getRoles() {
        return userBuiltInStore.getRoles();
    },
    /**
    * Set the user profile.
    * @param {object} profile User profile.
    */
    setProfile: function setProfile(profile) {
        _setUserNode('profile', profile);
    },
    /**
    * Get the user profile.
    * @return {object} profile User profile.
    */
    getProfile: function getProfile() {
        return userBuiltInStore.getProfile();
    },
    /**
    * Set user profile.
    * @param {object} login - user login.
    */
    setLogin: function setLogin(login) {
        _setUserNode('login', login);
    },
    /**
    * Get the user login.
    * @return {object} - The user login.
    */
    getLogin: function getLogin() {
        return userBuiltInStore.getLogin();
    }
};