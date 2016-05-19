import {Action} from '../application';

declare class Dispatcher extends Flux.Dispatcher<any> {

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