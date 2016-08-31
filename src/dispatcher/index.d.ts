import {Action} from '../application';
import {Dispatcher as FluxDispatcher} from 'flux';

declare class Dispatcher extends FluxDispatcher<any> {

    // Constructor override to hide the default doc
    constructor()

    /**
     * Dispatch an action coming from the server.
     * @param action The action to dispatch
     */
    handleServerAction(action: Action): void

    /**
     * Dispatch an action coming from a view.
     * @param action The action to dispatch
     */
    handleViewAction(action: Action): void
}

/**
 * Application dispatcher
 */
declare let dispatcher: Dispatcher;

export = dispatcher