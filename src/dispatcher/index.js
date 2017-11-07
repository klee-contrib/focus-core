import { Dispatcher } from 'flux';
import isObject from 'lodash/lang/isObject';

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

/**
 * Dispatch update data.
 */
export function dispatchData() {
    const firstArgIsObject = isObject(arguments[0]);

    if (firstArgIsObject) { // then form is : dispatchData({ node: data }, identifier);
        const payload = arguments[0];
        const identifier = arguments[1];

        AppDispatcher.handleViewAction({
            data: payload,
            type: 'update',
            identifier
        });
    } else { // then form is : dispatchData(node, data, identifier);
        const nodeName = arguments[0];
        const data = arguments[1];
        const identifier = arguments[2];

        AppDispatcher.handleViewAction({
            data: {
                [nodeName]: data
            },
            type: 'update',
            identifier
        });
    }
}

export default AppDispatcher;
