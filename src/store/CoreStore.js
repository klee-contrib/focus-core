/* eslint-disable filenames/match-regex */
import { EventEmitter } from 'events';
import isFunction from 'lodash/lang/isFunction';
import defer from 'lodash/function/defer';
import intersection from 'lodash/array/intersection';
import capitalize from 'lodash/string/capitalize';

import AppDispatcher from '../dispatcher';
import CloningMap from './cloning-map';

const reservedNames = ['Error', 'Status'];

const _instances = [];

/**
* @class CoreStore
*/
class CoreStore extends EventEmitter {

    /**
     * Creates an instance of CoreStore.
     * @param {any} config the config of the store
     * @memberof CoreStore
     */
    constructor(config) {
        super();
        this.config = config;
        //Initialize the data as immutable map.
        this.data = new CloningMap();
        this.status = new CloningMap();
        this.error = new CloningMap();
        this.pendingEvents = [];
        this.customHandler = config.customHandler;
        //Register all generated methods.
        this.buildDefinition();
        this.buildEachNodeChangeEventListener();
        this.registerDispatcher();
        if (__DEV__) {
            this._registerDevTools();
        }
    }

    /**
     *  Get all the instances of core store.
     *
     * @readonly
     * @memberof CoreStore
     */
    get _instances() {
        return [..._instances];
    }

    /**
     * Register the instance for the DevTools
     *
     * @memberof CoreStore
     */
    _registerDevTools() {
        _instances.push(this);
    }

    /**
    * Initialize the store configuration.
     *
     * @returns {object} the built definition
     * @memberof CoreStore
     */
    buildDefinition() {
        /**
        * Build the definitions for the entity (may be a subject.)
        * @type {object}
        */
        if (!this.config.definition) {
            throw new Error('Core Store: missing definition', this.config);
        }
        this.definition = this.config.definition;

        const properties = Object.keys(this.definition).map(elt => capitalize(elt));
        const reservedProperties = properties.reduce((acc, elt) => acc.concat(reservedNames.map(w => w + elt)), []);
        if (intersection(properties, reservedProperties).length > 0) {
            throw new Error(`You have a name collision into this store : you cannot use a node named Blabla and anoter named ErrorBlabla, or StatusBlabla : ${intersection(properties, reservedProperties).join(' ')} `);
        }
        return this.definition;
    }

    /**
    * Get the whole value of the
    * @return {[type]} [description]
    */
    getValue() {
        return this.data ? this.data.toJS() : {};
    }

    /**
    * Getter on the identifier property.
    * @return {string} - Store identifier.
    */
    get identifier() {
        return this.config && this.config.identifier ? this.config.identifier : undefined;
    }

    /** Return the status of a definition.
    * @param {string} def The definition to load.
    * @returns {string} The status of a definition.
    */
    getStatus(def) {
        return this.status.get(def);
    }

    /**
    * Emit all events pending in the pendingEvents map.
    */
    emitPendingEvents() {
        this.pendingEvents.map((evtToEmit) => {
            let { name, data } = evtToEmit;
            this.emit(name, data);
        });
    }

    /**
    * Replace the emit function with a willEmit in otder to store the changing event but send it afterwards.
    * @param {string} eventName The event name.
    * @param {object} data The event's associated data.
    */
    willEmit(eventName, data) {
        this.pendingEvents = this.pendingEvents.reduce((result, current) => {
            if (current.name !== eventName) {
                result.push(current);
            }
            return result;
        }, [{ name: eventName, data: data }]);
    }

    /**
    * Clear all pending events.
    */
    clearPendingEvents() {
        this.pendingEvents = [];
    }

    /**
    * Build a change listener for each property in the definition. (should be macro entities);
    */
    buildEachNodeChangeEventListener() {
        //Loop through each store properties.
        for (let def in this.definition) {
            const capitalizeDefinition = capitalize(def);

            // Create functions to add and remove listener to change, status and error event
            ['add', 'remove'].forEach((action) => {
                ['change', 'status', 'error'].forEach((elt) => {
                    this[`${action}${capitalizeDefinition}${capitalize(elt)}Listener`] = (cb) => {
                        this[`${action}Listener`](`${def}:${elt}`, cb);
                    }
                })
            });

            //Create an update method.
            //Should be named updateData to be more explicit
            if (this[`update${capitalizeDefinition}`] === undefined) {
                this[`update${capitalizeDefinition}`] = (dataNode, status, informations) => {
                    this.data.set(def, dataNode);
                    //Update the status on the data.
                    this.status.set(def, status);
                    this.willEmit(`${def}:change`, { property: def, status: status, informations: informations });
                }
            }

            //Create a get method.
            if (this[`get${capitalizeDefinition}`] === undefined) {
                this[`get${capitalizeDefinition}`] = () => {
                    return this.data.get(def);
                }
            }

            //Create an update method.
            this[`updateError${capitalizeDefinition}`] = (dataNode, status, informations) => {
                this.error.set(def, dataNode);
                this.status.set(def, status);
                this.willEmit(`${def}:error`, { property: def, status: status, informations: informations });
            }

            //Create a get method.
            this[`getError${capitalizeDefinition}`] = () => {
                return this.error.get(def);
            };

            //Create an update method.
            this[`updateStatus${capitalizeDefinition}`] = (dataNode, status, informations) => {
                this.status.set(def, status);
                this.willEmit(`${def}:status`, { property: def, status: status, informations: informations });
            }

            //Create a get method.
            this[`getStatus${capitalizeDefinition}`] = () => {
                return this.status.get(def)
            };
        }
    }

    /**
     * Emit all pending events, after a delay.
     *
     * @memberof CoreStore
     */
    delayPendingEvents() {
        //Delay all the change emit by the store to be sure it is done after the internal store propagation and to go out of the dispatch function.
        defer(() => {
            this.emitPendingEvents();
            this.clearPendingEvents();
        });
    }

    /**
     * Build informations based on infos.
     *
     * @param {any} incomingInfos the infos given
     * @returns {object} an object with the callerId
     * @memberof CoreStore
     */
    _buildInformations(incomingInfos) {
        return {
            callerId: incomingInfos.action.callerId
        };
    }

    /**
    * The store register itself on the dispatcher.
    */
    registerDispatcher() {
        this.dispatch = AppDispatcher.register((transferInfo) => {
            let { action: { data: rawData, status, type, identifier } } = transferInfo;
            status = status || {};
            //Check if an identifier check is necessary.
            //If an identifier is needed a check is triggered.
            if (this.identifier && identifier !== this.identifier) {
                return;
            }

            //currentStore.clearPendingEvents();
            if (this.globalCustomHandler) {
                return this.globalCustomHandler.call(this, transferInfo);
            }

            //Read data from the action transfer information.
            const otherInformations = this._buildInformations(transferInfo);

            //Call each node handler for the matching definition's node.
            for (let node in rawData) {
                if (this.definition[node]) {
                    //Call a custom handler if this exists.
                    if (this.customHandler && this.customHandler[node] && this.customHandler[node][type]) {
                        this.customHandler[node][type].call(this, rawData[node], status[node], otherInformations);
                    } else {
                        //Update the data for the given node. and emit the change/.
                        if (!isFunction(this[`${type}${capitalize(node)}`])) {
                            throw new Error(`The listener you try to call is unavailable : ${type} ${capitalize(node)} `);
                        }
                        this[`${type}${capitalize(node)}`](rawData[node], status[node], otherInformations);
                    }
                }
            }
            this.delayPendingEvents(this);
        });
    }

    /**
    * Add a listener on a store event.
    * @param {string}   eventName - Event name.
    * @param {Function} cb - CallBack to call on the event change name.
    */
    addListener(eventName, cb) {
        this.on(eventName, cb);
    }
}
export default CoreStore;
