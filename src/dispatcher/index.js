import { Dispatcher } from 'flux';

/**
* Application dispatcher.
* @type {Object}
*/
const AppDispatcher = Object.assign(new Dispatcher(), {
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

export default AppDispatcher;
