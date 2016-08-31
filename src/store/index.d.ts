import {EventEmitter} from 'events';

/**
 *  Class standing for the cartridge store.
 */
export class ApplicationStore extends CoreStore<{route: string, mode: string, canDeploy: boolean}> {

    /**
     * Constructor of the store class.
     * @param config The store config.
     */
    constructor(config: {definition: {}})

    /**
     * Update the mode value.
     * @param dataNode The value of the data.
     */
    updateMode(dataNode: {}): void
}

/**
 * Base class for all stores
 */
export class CoreStore<T> extends EventEmitter {

    /**
     * Getter on the definition property.
     */
    definition: T;

    /**
     * Getter on the identifier property.
     */
    identifier: string;

    /**
     * Constructor of the store class.
     * @param config The store config.
     */
    constructor(config: {definition: T});

    /**
     * Add a listener on a store event.
     * @param eventName Event name.
     * @param cb        CallBack to call on the event change name.
     */
    addListener(eventName: string, cb: Function): this

    /**
     * Initialize the store configuration.
     */
    buildDefinition(): {}

    /**
     * Build a change listener for each property in the definition. (should be macro entities).
     */
    buildEachNodeChangeEventListener(): void

    /**
     * Clear all pending events.
     */
    clearPendingEvents(): void

    /**
     * Delay all the change emit by the store to be sure it is done after the internal store propagation and to go out of the dispatch function.
     */
    delayPendingEvents(context: CoreStore<T>): void

    /**
     * Emit all events pending in the pendingEvents map.
     */
    emitPendingEvents(): void

    /**
     * Returns the status of a definition.
     * @param The definition to load.
     */
    getStatus(def: string): {isLoading: boolean}

    /**
     * Get the whole value of the store
     */
    getValue(): {}

    /**
     * Registers the store on the dispatcher
     */
    registerDispatcher(): void

    /**
     * Replace the emit function with a willEmit in order to store the changing event but send it afterwards.
     * @param eventName The event name.
     * @param data      The event's associated data.
     */
    willEmit(eventName: string, data: {}): void
}

/**
 * Class standing for all list information.
 * The list has almost the same data as the search store but instead of the facets, it can have a ...
 */
export class ListStore extends CoreStore<{identifier: string}> {

    /**
     * Constructor of the store class.
     * @param config The store config.
     */
    constructor(config: {identifier: string})
}

/**
 * Class standing for the message store
 */
export class MessageStore extends CoreStore<{}> {

    /**
     * Add a listener on the global change on the search store.
     * @param conf The configuration of the message store.
     */
    constructor(conf: {})

    /**
     * Add a listener on the global clear change on the search store.
     * @param cb - The callback to call when a message is cleared.
     */
    addClearMessagesListener(cb: Function): void

    /**
     * Add a listener on the global push change on the search store.
     * @param cb The callback to call when a message is pushed.
     */
    addPushedMessageListener(cb: Function): void

    /**
     * Clear all messages in the stack.
     */
    clearMessages(): void

    /**
     * Delete a message given its id.
     * @param messageId The message identifier.
     */
    deleteMessage(messageId: number): void

    /**
     * Get a message from its identifier.
     * @param messageId The message identifier.
     */
    getMessage(messageId: string): {}

    /**
     * Add a listener on the global change on the search store.
     * @param message The message to add.
     */
    pushMessage(message: {}): void

    /**
     * Registers the store on the dispatcher
     */
    registerDispatcher(): void

    /**
     * Remove a listener on the global clear change on the search store.
     * @param {function} cb - The callback to remove
     */
    removeClearMessagesListener(cb: Function): void

    /**
     * Remove a listener on the global push change on the search store.
     * @param cb - The callback to remove
     */
    removePushedMessageListener(cb: Function): void
}

/**
 * Class standing for the reference store.
 */
export class ReferenceStore extends CoreStore<{}> {

    /**
     * Add a listener on the global change on the search store.
     * @param conf The configuration of the reference store.
     */
    constructor(conf: {})

    /**
     * Gets the list of references of the store
     * @param names The list of references to get
     */
    getReference(names: string[]): {references: {}}

    /**
     * Not implemented
     */
    setReference(): void
}

/**
 * Class standing for the request store
 */
export class RequestStore extends CoreStore<{}> {

    /**
     * Adds a listener on the global change on the request store.
     * @param {{}} conf - The configuration of the request store.
     */
    constructor(conf: {})

    /**
     * Adds a listener on the global clear change on the request store.
     * @param cb The callback to call on change
     */
    addClearRequestsListener(cb: Function): void

    /**
     * Adds a listener on the global update change on the request store.
     * @param cb The callback to call on change
     */
    addUpdateRequestListener(cb: Function): void

    /**
     * Clears all requests in the stack.
     */
    clearRequests(): void

    /**
     * Gets a request from its identifier.
     * @param requestId The request identifier.
     */
    getRequest(requestId: string): {}

    /**
     * Gets the requests by type
     */
    getRequests(): {
        pending: number
        cancelled: number
        success: number
        error: number
        total: number
    }

    /**
     * Removes a listener on the global clear change on the request store.
     * @param cb The callback to call on change
     */
    removeClearRequestsListener(cb: Function): void

    /**
     * Removes a listener on the global update change on the request store.
     * @param cb The callback to call on change
     */
    removeUpdateRequestListener(cb: Function): void

    /**
     * Registers the store on the dispatcher
     */
    registerDispatcher(): void

    /**
     * Updates a request
     * @param request The request to update.
     */
    updateRequest(request: {}): void
}

/**
 * Class standing for the user store
 */
export class UserStore extends CoreStore<{}> {

    /**
     * Adds a listener on the global change on the request store.
     * @param conf - The configuration of the request store.
     */
    constructor(conf: {})
}