//Dependencies.
import Immutable from 'immutable';
import CoreStore from '../CoreStore';
import getDefinition from './definition';
import { v4 as uuid } from 'uuid';
const CLEAR = 'clear';
const UPDATE = 'update';
import AppDispatcher from '../../dispatcher';

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
        this.pending = Immutable.Map({});
        this.success = Immutable.Map({});
        this.error = Immutable.Map({});
        this.cancelled = Immutable.Map({});
    }
    /**
   * Get a message from its identifier.
   * @param {string} messageId - The message identifier.
   * @returns {object} - The requested message.
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
   * @param {object} message - The message to add.
   */
    updateRequest(request) {
        request.id = request.id || `${uuid()}`;
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
        this.data = this.data.clear();
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
    registerDispatcher() {
        let currentStore = this;
        this.dispatch = AppDispatcher.register(function (transferInfo) {
            let rawData = transferInfo.action.data;
            let type = transferInfo.action.type;
            if (!rawData || !rawData.request) { return; }
            switch (type) {
                case 'update':
                    if (rawData.request) {
                        currentStore.updateRequest(rawData.request);
                    }
                    break;
                case 'clear':
                    if (rawData.request) {
                        currentStore.clearRequests();
                    }
                    break;
            }
        });
    }
}

export default RequestStore;
