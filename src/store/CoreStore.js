/* eslint-disable filenames/match-regex */
import { EventEmitter } from 'events';
import assign from 'object-assign';

import isArray from 'lodash/lang/isArray';
import isFunction from 'lodash/lang/isFunction';

import defer from 'lodash/function/defer';

import intersection from 'lodash/array/intersection';
import capitalize from 'lodash/string/capitalize';
import Immutable from 'immutable';
import AppDispatcher from '../dispatcher';

const reservedNames = ['Error', 'Status'];

const _instances = [];

/**
* @class CoreStore
*/
class CoreStore extends EventEmitter {

    /**
    * Contructor of the store class.
    */
    constructor(config) {
        super();
        assign(this, {
            config
        });
        //Initialize the data as immutable map.
        this.data = Immutable.Map({});
        this.status = Immutable.Map({});
        this.error = Immutable.Map({});
        this.pendingEvents = [];
        this.customHandler = assign({}, config.customHandler);
        //Register all gernerated methods.
        this.buildDefinition();
        this.buildEachNodeChangeEventListener();
        this.registerDispatcher();
        if (__DEV__) {
            this._registerDevTools();
        }
    }
    // Get all the instances of core store.
    get _instances() {
        return [..._instances];
    }
    // register the instances saving
    _registerDevTools() {
        _instances.push(this);
    }
    /**
    * Initialize the store configuration.
    * @param {object} storeConfiguration - The store configuration for the initialization.
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
    * @param {string} - The definition to load.
    * @returns {string} - The status of a definition.
    */
    getStatus(def) {
        if (this.status.has(def)) {
            return this.status.get(def);
        }
        return undefined;
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
    * @param eventName {string} - The event name.
    * @param  data {object} - The event's associated data.
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
        const currentStore = this;
        //Loop through each store properties.
        for (let definition in this.definition) {
            const capitalizeDefinition = capitalize(definition);
            //Creates the change listener
            currentStore[`add${capitalizeDefinition}ChangeListener`] = (function (def) {
                return function (cb) {
                    currentStore.addListener(`${def}:change`, cb);
                }
            }(definition));
            //Remove the change listener
            currentStore[`remove${capitalizeDefinition}ChangeListener`] = (function (def) {
                return function (cb) {
                    currentStore.removeListener(`${def}:change`, cb);
                }
            }(definition));
            //Create an update method.
            //Should be named updateData to be more explicit
            if (currentStore[`update${capitalizeDefinition}`] === undefined) {
                currentStore[`update${capitalizeDefinition}`] = (function (def) {
                    return function (dataNode, status, informations) {
                        const immutableNode = isFunction(dataNode) ? dataNode : Immutable.fromJS(dataNode);
                        currentStore.data = currentStore.data.set(def, immutableNode);
                        //Update the status on the data.
                        currentStore.status = currentStore.status.set(def, status);

                        currentStore.willEmit(`${def}:change`, { property: def, status: status, informations: informations });
                    }
                }(definition));
            }

            //Create a get method.
            if (currentStore[`get${capitalizeDefinition}`] === undefined) {
                currentStore[`get${capitalizeDefinition}`] = (function (def) {
                    return function () {
                        const hasData = currentStore.data.has(def);
                        if (hasData) {
                            const rawData = currentStore.data.get(def);
                            if (rawData && rawData.toJS) {
                                const data = rawData.toJS();
                                return data;
                            }
                            return rawData;
                        }
                        return undefined;
                    };
                }(definition));
            }
            //Creates the error change listener
            currentStore[`add${capitalizeDefinition}ErrorListener`] = (function (def) {
                return function (cb) {
                    currentStore.addListener(`${def}:error`, cb);
                }
            }(definition));
            //Remove the change listener
            currentStore[`remove${capitalizeDefinition}ErrorListener`] = (function (def) {
                return function (cb) {
                    currentStore.removeListener(`${def}:error`, cb);
                }
            }(definition));
            //Create an update method.
            currentStore[`updateError${capitalizeDefinition}`] = (function (def) {
                return function (dataNode, status, informations) {
                    //CheckIsObject
                    const immutableNode = Immutable[isArray(dataNode) ? 'List' : 'Map'](dataNode);
                    currentStore.error = currentStore.error.set(def, immutableNode);
                    currentStore.status = currentStore.status.set(def, status);
                    currentStore.willEmit(`${def}:error`, { property: def, status: status, informations: informations });
                }
            }(definition));
            //Create a get method.
            currentStore[`getError${capitalizeDefinition}`] = (function (def) {
                return function () {
                    const hasData = currentStore.error.has(def);
                    return hasData ? currentStore.error.get(def).toJS() : undefined;
                };
            }(definition));


            // status
            currentStore[`add${capitalizeDefinition}StatusListener`] = (function (def) {
                return function (cb) {
                    currentStore.addListener(`${def}:status`, cb);
                }
            }(definition));
            //Remove the change listener
            currentStore[`remove${capitalizeDefinition}StatusListener`] = (function (def) {
                return function (cb) {
                    currentStore.removeListener(`${def}:status`, cb);
                }
            }(definition));
            //Create an update method.
            currentStore[`updateStatus${capitalizeDefinition}`] = (function (def) {
                return function updateStatus(dataNode, status, informations) {
                    //CheckIsObject
                    //console.log(`status  ${JSON.stringify(status) }`);
                    const statusNode = status;//Immutable.fromJS(status); // mMaybe it is a part of the status only.
                    currentStore.status = currentStore.status.set(def, statusNode);
                    currentStore.willEmit(`${def}:status`, { property: def, status: status, informations: informations });
                }
            }(definition));
            //Create a get method.
            currentStore[`getStatus${capitalizeDefinition}`] = (function (def) {
                return function getStatus() {
                    const hasData = currentStore.status.has(def);
                    const data = hasData ? currentStore.status.get(def) : undefined;
                    return data.toJS ? data.toJS() : data;
                };
            }(definition));
        }
    }

    delayPendingEvents(context) {
        //Delay all the change emit by the store to be sure it is done after the internal store propagation and to go out of the dispatch function.
        defer(() => {
            context.emitPendingEvents();
            context.clearPendingEvents();
        });
    }
    _buildInformations(incomingInfos) {
        return {
            callerId: incomingInfos.action.callerId
        };
    }
    /**
    * The store registrer itself on the dispatcher.
    */
    registerDispatcher() {
        const currentStore = this;
        this.dispatch = AppDispatcher.register(function (transferInfo) {
            //Check if an identifier check is necessary.
            if (currentStore.identifier) {
                //If an identifier is needed a check is triggered.
                if (!transferInfo || !transferInfo.action || !transferInfo.action.identifier || transferInfo.action.identifier !== currentStore.identifier) {
                    return;
                }
            }
            //currentStore.clearPendingEvents();
            if (currentStore.globalCustomHandler) {
                return currentStore.globalCustomHandler.call(currentStore, transferInfo);
            }

            //Read data from the action transfer information.
            const rawData = transferInfo.action.data;
            const status = transferInfo.action.status || {};
            const type = transferInfo.action.type;
            const otherInformations = currentStore._buildInformations(transferInfo);

            //Call each node handler for the matching definition's node.
            for (let node in rawData) {
                if (currentStore.definition[node]) {
                    //Call a custom handler if this exists.
                    if (currentStore.customHandler && currentStore.customHandler[node] && currentStore.customHandler[node][type]) {
                        currentStore.customHandler[node][type].call(currentStore, rawData[node], status[node], otherInformations);
                    } else {
                        //Update the data for the given node. and emit the change/.
                        if (!isFunction(currentStore[`${type}${capitalize(node)}`])) {
                            throw new Error(`The listener you try to call is unavailable : ${type} ${capitalize(node)} `);
                        }
                        currentStore[`${type}${capitalize(node)}`](rawData[node], status[node], otherInformations);
                    }
                }
            }
            currentStore.delayPendingEvents(currentStore);
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
