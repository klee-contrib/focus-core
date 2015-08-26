const Dispatcher = require('flux').Dispatcher;
const assign = require('object-assign');

/**
* Application dispatcher.
* @type {Object}
*/
const AppDispatcher = assign(new Dispatcher(), {
    /**
    * @param {object} action The details of the action, including the action's
    * type and additional data coming from the server.
    */
    handleServerAction(action) {
        const payload = {
            source: 'SERVER_ACTION',
            action: action
        };
        this.dispatch(payload);
    },
    /**
    * @param {object} action The details of the action, including the action's
    * type and additional data coming from the view.
    */
    handleViewAction(action) {
        const payload = {
            source: 'VIEW_ACTION',
            action: action
        };
        this.dispatch(payload);
    }
});

module.exports = AppDispatcher;
