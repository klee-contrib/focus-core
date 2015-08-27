'use strict';

var Dispatcher = require('flux').Dispatcher;
var assign = require('object-assign');

/**
* Application dispatcher.
* @type {Object}
*/
var AppDispatcher = assign(new Dispatcher(), {
    /**
    * @param {object} action The details of the action, including the action's
    * type and additional data coming from the server.
    */
    handleServerAction: function handleServerAction(action) {
        var payload = {
            source: 'SERVER_ACTION',
            action: action
        };
        this.dispatch(payload);
    },
    /**
    * @param {object} action The details of the action, including the action's
    * type and additional data coming from the view.
    */
    handleViewAction: function handleViewAction(action) {
        var payload = {
            source: 'VIEW_ACTION',
            action: action
        };
        this.dispatch(payload);
    }
});

module.exports = AppDispatcher;