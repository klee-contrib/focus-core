'use strict';

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

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
    dispatcher.handleViewAction({ data: _defineProperty({}, name, value), type: 'update' });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInByb2Nlc3Nvci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsSUFBTSxtQkFBbUIsUUFBUSxrQkFBUixDQUF6QjtBQUNBLElBQU0sVUFBVSxRQUFRLHFCQUFSLENBQWhCO0FBQ0EsSUFBTSxlQUFlLFFBQVEsMkJBQVIsQ0FBckI7QUFDQSxJQUFNLGFBQWEsUUFBUSxlQUFSLENBQW5COztBQUVBOzs7OztBQUtBLFNBQVMsWUFBVCxDQUFzQixJQUF0QixFQUE0QixLQUE1QixFQUFrQztBQUM5QixlQUFXLGdCQUFYLENBQTRCLEVBQUMsMEJBQVEsSUFBUixFQUFlLEtBQWYsQ0FBRCxFQUF3QixNQUFNLFFBQTlCLEVBQTVCO0FBQ0g7QUFDRCxPQUFPLE9BQVAsR0FBaUI7QUFDYixrQkFBYyxnQkFERDtBQUViOzs7OztBQUtBLFdBUGEsbUJBT0wsSUFQSyxFQU9BO0FBQ1QsZUFBTyxRQUFRLElBQVIsSUFBZ0IsSUFBaEIsR0FBdUIsQ0FBQyxJQUFELENBQTlCO0FBQ0EsZUFBTyxJQUFJLGFBQWEsSUFBYixFQUFtQixpQkFBaUIsUUFBakIsRUFBbkIsRUFBZ0QsTUFBM0Q7QUFDSCxLQVZZOztBQVdiOzs7O0FBSUEsWUFmYSxvQkFlSixLQWZJLEVBZUU7QUFDWCxxQkFBYSxPQUFiLEVBQXNCLEtBQXRCO0FBQ0gsS0FqQlk7O0FBa0JiOzs7O0FBSUEsWUF0QmEsc0JBc0JIO0FBQ04sZUFBTyxpQkFBaUIsUUFBakIsRUFBUDtBQUNILEtBeEJZOztBQXlCYjs7OztBQUlBLGNBN0JhLHNCQTZCRixPQTdCRSxFQTZCTTtBQUNmLHFCQUFhLFNBQWIsRUFBd0IsT0FBeEI7QUFDSCxLQS9CWTs7QUFnQ2I7Ozs7QUFJQSxjQXBDYSx3QkFvQ0Q7QUFDUixlQUFPLGlCQUFpQixVQUFqQixFQUFQO0FBQ0gsS0F0Q1k7O0FBdUNiOzs7O0FBSUEsWUEzQ2Esb0JBMkNKLEtBM0NJLEVBMkNFO0FBQ1gscUJBQWEsT0FBYixFQUFzQixLQUF0QjtBQUNILEtBN0NZOztBQThDYjs7OztBQUlBLFlBbERhLHNCQWtESDtBQUNOLGVBQU8saUJBQWlCLFFBQWpCLEVBQVA7QUFDSDtBQXBEWSxDQUFqQiIsImZpbGUiOiJwcm9jZXNzb3IuanMiLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCB1c2VyQnVpbHRJblN0b3JlID0gcmVxdWlyZSgnLi9idWlsdC1pbi1zdG9yZScpO1xyXG5jb25zdCBpc0FycmF5ID0gcmVxdWlyZSgnbG9kYXNoL2xhbmcvaXNBcnJheScpO1xyXG5jb25zdCBpbnRlcnNlY3Rpb24gPSByZXF1aXJlKCdsb2Rhc2gvYXJyYXkvaW50ZXJzZWN0aW9uJyk7XHJcbmNvbnN0IGRpc3BhdGNoZXIgPSByZXF1aXJlKCcuLi9kaXNwYXRjaGVyJyk7XHJcblxyXG4vKipcclxuICogU2V0IHRoZSBhIG5vZGUgaW4gdGhlIHN0b3JlLlxyXG4gKiBAcGFyYW0ge3N0cmluZ30gbmFtZSAgbm9kZSBuYW1lXHJcbiAqIEBwYXJhbSB7c3RyaW5nfSB2YWx1ZSBub2RlIHZhbHVlIHRvIGJlIHNldFxyXG4gKi9cclxuZnVuY3Rpb24gX3NldFVzZXJOb2RlKG5hbWUsIHZhbHVlKXtcclxuICAgIGRpc3BhdGNoZXIuaGFuZGxlVmlld0FjdGlvbih7ZGF0YToge1tuYW1lXTogdmFsdWV9LCB0eXBlOiAndXBkYXRlJ30pO1xyXG59XHJcbm1vZHVsZS5leHBvcnRzID0ge1xyXG4gICAgYnVpbHRJblN0b3JlOiB1c2VyQnVpbHRJblN0b3JlLFxyXG4gICAgLyoqXHJcbiAgICAqIENoZWNrIGlmIGEgdXNlciBoYXMgdGhlIGdpdmVudCByb2xlIG9yIHJvbGVzLlxyXG4gICAgKiBAcGFyYW0gIHtzdHJpbmcgfCBhcnJheX0gIHJvbGUgLSBDaGVjayBpZiB0aGUgdXNlciBoYXMgb25lIG9yIG1hbnkgcm9sZXMuXHJcbiAgICAqIEByZXR1cm4ge0Jvb2xlYW59IC0gVHJ1ZSBpZiB0aGUgdXNlciBoYXMgYXQgbGVhc3Qgb24gb2YgdGhlIGdpdmVudCByb2xlcy5cclxuICAgICovXHJcbiAgICBoYXNSb2xlKHJvbGUpe1xyXG4gICAgICAgIHJvbGUgPSBpc0FycmF5KHJvbGUpID8gcm9sZSA6IFtyb2xlXTtcclxuICAgICAgICByZXR1cm4gMCA8IGludGVyc2VjdGlvbihyb2xlLCB1c2VyQnVpbHRJblN0b3JlLmdldFJvbGVzKCkpLmxlbmd0aDtcclxuICAgIH0sXHJcbiAgICAvKipcclxuICAgICogU2V0IHRoZSB1c2VyIHJvbGVzLlxyXG4gICAgKiBAcGFyYW0ge2FycmF5fSByb2xlcyAtIFVzZXIgcm9sZSBsaXN0LlxyXG4gICAgKi9cclxuICAgIHNldFJvbGVzKHJvbGVzKXtcclxuICAgICAgICBfc2V0VXNlck5vZGUoJ3JvbGVzJywgcm9sZXMpO1xyXG4gICAgfSxcclxuICAgIC8qKlxyXG4gICAgKiBHZXQgdGhlIHVzZXIgcm9sZXMuXHJcbiAgICAqIEByZXR1cm4ge2FycmF5fSAtIFRoZSB1c2VyIHJvbGUgbGlzdC5cclxuICAgICovXHJcbiAgICBnZXRSb2xlcygpe1xyXG4gICAgICAgIHJldHVybiB1c2VyQnVpbHRJblN0b3JlLmdldFJvbGVzKCk7XHJcbiAgICB9LFxyXG4gICAgLyoqXHJcbiAgICAqIFNldCB0aGUgdXNlciBwcm9maWxlLlxyXG4gICAgKiBAcGFyYW0ge29iamVjdH0gcHJvZmlsZSBVc2VyIHByb2ZpbGUuXHJcbiAgICAqL1xyXG4gICAgc2V0UHJvZmlsZShwcm9maWxlKXtcclxuICAgICAgICBfc2V0VXNlck5vZGUoJ3Byb2ZpbGUnLCBwcm9maWxlKTtcclxuICAgIH0sXHJcbiAgICAvKipcclxuICAgICogR2V0IHRoZSB1c2VyIHByb2ZpbGUuXHJcbiAgICAqIEByZXR1cm4ge29iamVjdH0gcHJvZmlsZSBVc2VyIHByb2ZpbGUuXHJcbiAgICAqL1xyXG4gICAgZ2V0UHJvZmlsZSgpe1xyXG4gICAgICAgIHJldHVybiB1c2VyQnVpbHRJblN0b3JlLmdldFByb2ZpbGUoKTtcclxuICAgIH0sXHJcbiAgICAvKipcclxuICAgICogU2V0IHVzZXIgcHJvZmlsZS5cclxuICAgICogQHBhcmFtIHtvYmplY3R9IGxvZ2luIC0gdXNlciBsb2dpbi5cclxuICAgICovXHJcbiAgICBzZXRMb2dpbihsb2dpbil7XHJcbiAgICAgICAgX3NldFVzZXJOb2RlKCdsb2dpbicsIGxvZ2luKTtcclxuICAgIH0sXHJcbiAgICAvKipcclxuICAgICogR2V0IHRoZSB1c2VyIGxvZ2luLlxyXG4gICAgKiBAcmV0dXJuIHtvYmplY3R9IC0gVGhlIHVzZXIgbG9naW4uXHJcbiAgICAqL1xyXG4gICAgZ2V0TG9naW4oKXtcclxuICAgICAgICByZXR1cm4gdXNlckJ1aWx0SW5TdG9yZS5nZXRMb2dpbigpO1xyXG4gICAgfVxyXG59O1xyXG4iXX0=