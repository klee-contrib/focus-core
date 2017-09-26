import { v4 as uuid } from 'uuid';

import CoreStore from '../CoreStore';
import getDefinition from './definition';
import AppDispatcher from '../../dispatcher';
import CloningMap from '../cloning-map';

const CLEAR = 'clear';
const UPDATE = 'update';


/**
 * Class standing for the cartridge store.
 */
class RequestStore extends CoreStore {
    /**
   * Add a listener on the global change on the search store.
   * @param {object} conf - The configuration of the request store.
   */
    constructor(conf) {
        conf = conf || {};
        conf.definition = conf.definition || getDefinition();
        super(conf);
        this.pending = new CloningMap();
        this.success = new CloningMap();
        this.error = new CloningMap();
        this.cancelled = new CloningMap();
    }

    /**
   * Get a request from its identifier.
   * @param {string} requestId The request identifier.
   * @returns {object} The request.
   */
    getRequest(requestId) {
        if (!this.data.has(requestId)) {
            return undefined;
        }
        return this.data.get(requestId);
    }

    /**
   * Get the requests by type
   * @return {object} An object with the total of request by type.
   */
    getRequests() {
        return {
            pending: this.pending.size,
            cancelled: this.cancelled.size,
            success: this.success.size,
            error: this.error.size,
            total: this.pending.size + this.cancelled.size + this.success.size + this.error.size
        };
    }

    /**
    * Add a listener on the global change on the search store.
    * @param {object} request The message to add.
    */
    updateRequest(request) {
        request.id = request.id || uuid();
        //If the status is supported
        if (this.definition[request.status]) {
            //Update the associated collection
            this[request.status] = this[request.status].set(request.id, request);
            //Remove the associated request from pending
            if (request.status !== 'pending' && this.pending.has(request.id)) {
                this.pending = this.pending.delete(request.id);
            }
        }
        this.emit(UPDATE, request.id);
    }

    /**
   * Clear all messages in the stack.
   */
    clearRequests() {
        this.data.clear();
        this.emit(CLEAR);
    }

    /**
   * Add a listener on the global change on the search store.
   * @param {function} cb - The callback to call when a message is pushed.
   */
    addUpdateRequestListener(cb) {
        this.addListener(UPDATE, cb);
    }

    /**
   * Remove a listener on the global change on the search store.
   * @param {function} cb - The callback to called when a message is pushed.
   */
    removeUpdateRequestListener(cb) {
        this.removeListener(UPDATE, cb);
    }

    /**
   * Add a listener on the global change on the search store.
   * @param {function} cb - The callback to call when a message is pushed.
   */
    addClearRequestsListener(cb) {
        this.addListener(CLEAR, cb);
    }

    /**
   * Remove a listener on the global change on the search store.
   * @param {function} cb - The callback to called when a message is pushed.
   */
    removeClearRequestsListener(cb) {
        this.removeListener(CLEAR, cb);
    }

    /**
     * The store register itself on the dispatcher.
     *
     * @memberof RequestStore
     */
    registerDispatcher() {
        this.dispatch = AppDispatcher.register(({ action: { data: rawData, type } }) => {
            if (!rawData || !rawData.request) {
                return;
            }
            switch (type) {
                case 'update':
                    this.updateRequest(rawData.request);
                    break;
                case 'clear':
                    this.clearRequests();
                    break;
                default:
                // Ignore the other events
            }
        });
    }
}

export default RequestStore;
