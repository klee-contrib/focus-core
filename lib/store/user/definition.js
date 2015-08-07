/**
 * Build the user store definition from the login and profile.
 * @return {[type]} [description]
 */
'use strict';

module.exports = function () {
  return {
    login: require('../../user/login/definition'),
    profile: require('../../user/profile/definition'),
    roles: 'roles'
  };
};