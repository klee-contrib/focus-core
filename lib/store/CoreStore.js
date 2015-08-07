//The store is an event emitter.
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');

var _require = require('lodash/lang');

var isArray = _require.isArray;
var isEmpty = _require.isEmpty;
var isObject = _require.isObject;
var isFunction = _require.isFunction;

var _require2 = require('lodash/function');

var defer = _require2.defer;

var getEntityInformations = require('../definition/entity/builder').getEntityInformations;
var capitalize = require('lodash/string/capitalize');
var Immutable = require('immutable');
var AppDispatcher = require('../dispatcher');
/**
* @class CoreStore
*/

var CoreStore = (function (_EventEmitter) {
    _inherits(CoreStore, _EventEmitter);

    /**
    * Contructor of the store class.
    */

    function CoreStore(config) {
        _classCallCheck(this, CoreStore);

        _EventEmitter.call(this);
        assign(this, {
            config: config
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
    }

    /**
    * Initialize the store configuration.
    * @param {object} storeConfiguration - The store configuration for the initialization.
    */

    CoreStore.prototype.buildDefinition = function buildDefinition() {
        /**
        * Build the definitions for the entity (may be a subject.)
        * @type {object}
        */
        this.definition = this.config.definition || getEntityInformations(this.config.definitionPath, this.config.customDefinition);
        return this.definition;
    };

    /**
     * Get the whole value of the
     * @return {[type]} [description]
     */

    CoreStore.prototype.getValue = function getValue() {
        return this.data ? this.data.toJS() : {};
    };

    /**
    * Getter on the identifier property.
    * @return {string} - Store identifier.
    */

    /** Return the status of a definition.
    * @param {string} - The definition to load.
    * @returns {string} - The status of a definition.
    */

    CoreStore.prototype.getStatus = function getStatus(def) {
        if (this.status.has(def)) {
            return this.status.get(def);
        }
        return undefined;
    };

    /**
    * Emit all events pending in the pendingEvents map.
    */

    CoreStore.prototype.emitPendingEvents = function emitPendingEvents() {
        var _this = this;

        this.pendingEvents.map(function (evtToEmit) {
            var name = evtToEmit.name;
            var data = evtToEmit.data;

            _this.emit(name, data);
        });
    };

    /**
    * Replace the emit function with a willEmit in otder to store the changing event but send it afterwards.
    * @param eventName {string} - The event name.
    * @param  data {object} - The event's associated data.
    */

    CoreStore.prototype.willEmit = function willEmit(eventName, data) {
        this.pendingEvents.push({ name: eventName, data: data });
    };

    /**
    * Clear all pending events.
    */

    CoreStore.prototype.clearPendingEvents = function clearPendingEvents() {
        this.pendingEvents = [];
    };

    /**
    * Build a change listener for each property in the definition. (should be macro entities);
    */

    CoreStore.prototype.buildEachNodeChangeEventListener = function buildEachNodeChangeEventListener() {
        var currentStore = this;
        //Loop through each store properties.
        for (var definition in this.definition) {
            var capitalizeDefinition = capitalize(definition);
            //Creates the change listener
            currentStore['add' + capitalizeDefinition + 'ChangeListener'] = (function (def) {
                return function (cb) {
                    currentStore.addListener(def + ':change', cb);
                };
            })(definition);
            //Remove the change listener
            currentStore['remove' + capitalizeDefinition + 'ChangeListener'] = (function (def) {
                return function (cb) {
                    currentStore.removeListener(def + ':change', cb);
                };
            })(definition);
            //Create an update method.
            if (currentStore['update' + capitalizeDefinition] === undefined) {
                currentStore['update' + capitalizeDefinition] = (function (def) {
                    return function (dataNode, status, informations) {
                        var immutableNode = isFunction(dataNode) ? dataNode : Immutable.fromJS(dataNode);
                        currentStore.data = currentStore.data.set(def, immutableNode);
                        //Update the status on the data.
                        currentStore.status = currentStore.status.set(def, status);

                        currentStore.willEmit(def + ':change', { property: def, status: status, informations: informations });
                    };
                })(definition);
            }

            //Create a get method.
            if (currentStore['get' + capitalizeDefinition] === undefined) {
                currentStore['get' + capitalizeDefinition] = (function (def) {
                    return function () {
                        var hasData = currentStore.data.has(def);
                        if (hasData) {
                            var rawData = currentStore.data.get(def);
                            //If the store node isn't an object, immutable solution are non sens.
                            if (isFunction(rawData) || !isObject(rawData)) {
                                return rawData;
                            } else {
                                var data = rawData.toJS();
                                if (!isEmpty(data)) {
                                    return data;
                                }
                            }
                        }
                        return undefined;
                    };
                })(definition);
            }
            //Creates the error change listener
            currentStore['add' + capitalizeDefinition + 'ErrorListener'] = (function (def) {
                return function (cb) {
                    currentStore.addListener(def + ':error', cb);
                };
            })(definition);
            //Remove the change listener
            currentStore['remove' + capitalizeDefinition + 'ErrorListener'] = (function (def) {
                return function (cb) {
                    currentStore.removeListener(def + ':error', cb);
                };
            })(definition);
            //Create an update method.
            currentStore['updateError' + capitalizeDefinition] = (function (def) {
                return function (dataNode) {
                    //CheckIsObject
                    var immutableNode = Immutable[isArray(dataNode) ? "List" : "Map"](dataNode);
                    currentStore.error = currentStore.error.set(def, immutableNode);
                    currentStore.willEmit(def + ':error');
                };
            })(definition);
            //Create a get method.
            currentStore['getError' + capitalizeDefinition] = (function (def) {
                return function () {
                    var hasData = currentStore.error.has(def);
                    return hasData ? currentStore.error.get(def).toJS() : undefined;
                };
            })(definition);
        }
    };

    CoreStore.prototype.delayPendingEvents = function delayPendingEvents(context) {
        //Delay all the change emit by the store to be sure it is done after the internal store propagation and to go out of the dispatch function.
        defer(function () {
            context.emitPendingEvents();
            context.clearPendingEvents();
        });
    };

    CoreStore.prototype._buildInformations = function _buildInformations(incomingInfos) {
        return {
            callerId: incomingInfos.action.callerId
        };
    };

    /**
    * The store registrer itself on the dispatcher.
    */

    CoreStore.prototype.registerDispatcher = function registerDispatcher() {
        var currentStore = this;
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
            var rawData = transferInfo.action.data;
            var status = transferInfo.action.status || {};
            var type = transferInfo.action.type;
            var otherInformations = currentStore._buildInformations(transferInfo);

            //Call each node handler for the matching definition's node.
            for (var node in rawData) {
                if (currentStore.definition[node]) {
                    //Call a custom handler if this exists.
                    if (currentStore.customHandler && currentStore.customHandler[node] && currentStore.customHandler[node][type]) {
                        currentStore.customHandler[node][type].call(currentStore, rawData[node], status[node], otherInformations);
                    } else {
                        //Update the data for the given node. and emit the change/.
                        currentStore['' + type + capitalize(node)](rawData[node], status[node], otherInformations);
                    }
                }
            }
            currentStore.delayPendingEvents(currentStore);
        });
    };

    /**
    * Add a listener on a store event.
    * @param {string}   eventName - Event name.
    * @param {Function} cb - CallBack to call on the event change name.
    */

    CoreStore.prototype.addListener = function addListener(eventName, cb) {
        this.on(eventName, cb);
    };

    _createClass(CoreStore, [{
        key: 'identifier',
        get: function get() {
            return this.config && this.config.identifier ? this.config.identifier : undefined;
        }
    }]);

    return CoreStore;
})(EventEmitter);

module.exports = CoreStore;