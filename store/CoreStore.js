'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }

//The store is an event emitter.
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');

var _require = require('lodash/lang');

var isArray = _require.isArray;
var isEmpty = _require.isEmpty;
var isObject = _require.isObject;
var isFunction = _require.isFunction;

var _require2 = require('lodash/function');

var defer = _require2.defer;

var capitalize = require('lodash/string/capitalize');
var Immutable = require('immutable');
var AppDispatcher = require('../dispatcher');
var _instances = [];

/**
* @class CoreStore
*/

var CoreStore = function (_EventEmitter) {
    _inherits(CoreStore, _EventEmitter);

    /**
    * Contructor of the store class.
    */
    function CoreStore(config) {
        _classCallCheck(this, CoreStore);

        var _this = _possibleConstructorReturn(this, _EventEmitter.call(this));

        assign(_this, {
            config: config
        });
        //Initialize the data as immutable map.
        _this.data = Immutable.Map({});
        _this.status = Immutable.Map({});
        _this.error = Immutable.Map({});
        _this.pendingEvents = [];
        _this.customHandler = assign({}, config.customHandler);
        //Register all gernerated methods.
        _this.buildDefinition();
        _this.buildEachNodeChangeEventListener();
        _this.registerDispatcher();
        if (!!__DEV__) {
            _this._registerDevTools();
        }
        return _this;
    }
    // Get all the instances of core store.


    // register the instances saving
    CoreStore.prototype._registerDevTools = function _registerDevTools() {
        _instances.push(this);
    };
    /**
    * Initialize the store configuration.
    * @param {object} storeConfiguration - The store configuration for the initialization.
    */


    CoreStore.prototype.buildDefinition = function buildDefinition() {
        /**
        * Build the definitions for the entity (may be a subject.)
        * @type {object}
        */
        if (!this.config.definition) {
            throw new Error('Core Store: missing definition', this.config);
        }
        this.definition = this.config.definition;
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
        var _this2 = this;

        this.pendingEvents.map(function (evtToEmit) {
            var name = evtToEmit.name;
            var data = evtToEmit.data;

            _this2.emit(name, data);
        });
    };

    /**
    * Replace the emit function with a willEmit in otder to store the changing event but send it afterwards.
    * @param eventName {string} - The event name.
    * @param  data {object} - The event's associated data.
    */


    CoreStore.prototype.willEmit = function willEmit(eventName, data) {
        this.pendingEvents = this.pendingEvents.reduce(function (result, current) {
            if (current.name !== eventName) {
                result.push(current);
            }
            return result;
        }, [{ name: eventName, data: data }]);
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
            currentStore['add' + capitalizeDefinition + 'ChangeListener'] = function (def) {
                return function (cb) {
                    currentStore.addListener(def + ':change', cb);
                };
            }(definition);
            //Remove the change listener
            currentStore['remove' + capitalizeDefinition + 'ChangeListener'] = function (def) {
                return function (cb) {
                    currentStore.removeListener(def + ':change', cb);
                };
            }(definition);
            //Create an update method.
            //Should be named updateData to be more explicit
            if (currentStore['update' + capitalizeDefinition] === undefined) {
                currentStore['update' + capitalizeDefinition] = function (def) {
                    return function (dataNode, status, informations) {
                        var immutableNode = isFunction(dataNode) ? dataNode : Immutable.fromJS(dataNode);
                        currentStore.data = currentStore.data.set(def, immutableNode);
                        //Update the status on the data.
                        currentStore.status = currentStore.status.set(def, status);

                        currentStore.willEmit(def + ':change', { property: def, status: status, informations: informations });
                    };
                }(definition);
            }

            //Create a get method.
            if (currentStore['get' + capitalizeDefinition] === undefined) {
                currentStore['get' + capitalizeDefinition] = function (def) {
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
                }(definition);
            }
            //Creates the error change listener
            currentStore['add' + capitalizeDefinition + 'ErrorListener'] = function (def) {
                return function (cb) {
                    currentStore.addListener(def + ':error', cb);
                };
            }(definition);
            //Remove the change listener
            currentStore['remove' + capitalizeDefinition + 'ErrorListener'] = function (def) {
                return function (cb) {
                    currentStore.removeListener(def + ':error', cb);
                };
            }(definition);
            //Create an update method.
            currentStore['updateError' + capitalizeDefinition] = function (def) {
                return function (dataNode, status, informations) {
                    //CheckIsObject
                    var immutableNode = Immutable[isArray(dataNode) ? "List" : "Map"](dataNode);
                    currentStore.error = currentStore.error.set(def, immutableNode);
                    currentStore.status = currentStore.status.set(def, status);
                    currentStore.willEmit(def + ':error', { property: def, status: status, informations: informations });
                };
            }(definition);
            //Create a get method.
            currentStore['getError' + capitalizeDefinition] = function (def) {
                return function () {
                    var hasData = currentStore.error.has(def);
                    return hasData ? currentStore.error.get(def).toJS() : undefined;
                };
            }(definition);

            // status
            currentStore['add' + capitalizeDefinition + 'StatusListener'] = function (def) {
                return function (cb) {
                    currentStore.addListener(def + ':status', cb);
                };
            }(definition);
            //Remove the change listener
            currentStore['remove' + capitalizeDefinition + 'StatusListener'] = function (def) {
                return function (cb) {
                    currentStore.removeListener(def + ':status', cb);
                };
            }(definition);
            //Create an update method.
            currentStore['updateStatus' + capitalizeDefinition] = function (def) {
                return function updateStatus(dataNode, status, informations) {
                    //CheckIsObject
                    //console.log(`status  ${JSON.stringify(status)}`);
                    var statusNode = status; //Immutable.fromJS(status); // mMaybe it is a part of the status only.
                    currentStore.status = currentStore.status.set(def, statusNode);
                    currentStore.willEmit(def + ':status', { property: def, status: status, informations: informations });
                };
            }(definition);
            //Create a get method.
            currentStore['getStatus' + capitalizeDefinition] = function (def) {
                return function getStatus() {
                    var hasData = currentStore.status.has(def);
                    return hasData ? currentStore.status.get(def).toJS() : undefined;
                };
            }(definition);
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
                        if (!isFunction(currentStore['' + type + capitalize(node)])) {
                            throw new Error('The listener you try to call is unavailable : ' + type + capitalize(node));
                        }
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
        key: '_instances',
        get: function get() {
            return [].concat(_instances);
        }
    }, {
        key: 'identifier',
        get: function get() {
            return this.config && this.config.identifier ? this.config.identifier : undefined;
        }
    }]);

    return CoreStore;
}(EventEmitter);

module.exports = CoreStore;
//# sourceMappingURL=data:application/json;base64,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UixDQUExRCxFQUF5RSxPQUFPLElBQVAsQ0FBekUsRUFBdUYsaUJBQXZGO0FBQ0gscUJBRkQsTUFFTTtBQUNGO0FBQ0EsNEJBQUcsQ0FBQyxXQUFXLGtCQUFnQixJQUFoQixHQUF1QixXQUFXLElBQVgsQ0FBdkIsQ0FBWCxDQUFKLEVBQTJEO0FBQ3ZELGtDQUFNLElBQUksS0FBSixvREFBMkQsSUFBM0QsR0FBa0UsV0FBVyxJQUFYLENBQWxFLENBQU47QUFDSDtBQUNELDBDQUFnQixJQUFoQixHQUF1QixXQUFXLElBQVgsQ0FBdkIsRUFBMkMsUUFBUSxJQUFSLENBQTNDLEVBQTBELE9BQU8sSUFBUCxDQUExRCxFQUF3RSxpQkFBeEU7QUFDSDtBQUNKO0FBQ0o7QUFDRCx5QkFBYSxrQkFBYixDQUFnQyxZQUFoQztBQUNILFNBbkNlLENBQWhCO0FBb0NILEs7QUFDRDs7Ozs7Ozt3QkFLQSxXLHdCQUFZLFMsRUFBVyxFLEVBQUk7QUFDdkIsYUFBSyxFQUFMLENBQVEsU0FBUixFQUFtQixFQUFuQjtBQUNILEs7Ozs7NEJBalFlO0FBQ2QsNkJBQVcsVUFBWDtBQUNEOzs7NEJBK0JlO0FBQ1osbUJBQU8sS0FBSyxNQUFMLElBQWUsS0FBSyxNQUFMLENBQVksVUFBM0IsR0FBd0MsS0FBSyxNQUFMLENBQVksVUFBcEQsR0FBaUUsU0FBeEU7QUFDSDs7OztFQTVEbUIsWTs7QUE0UnhCLE9BQU8sT0FBUCxHQUFpQixTQUFqQiIsImZpbGUiOiJwcm9jZXNzb3IuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvL1RoZSBzdG9yZSBpcyBhbiBldmVudCBlbWl0dGVyLlxyXG5jb25zdCBFdmVudEVtaXR0ZXIgPSByZXF1aXJlKCdldmVudHMnKS5FdmVudEVtaXR0ZXI7XHJcbmNvbnN0IGFzc2lnbiA9IHJlcXVpcmUoJ29iamVjdC1hc3NpZ24nKTtcclxuY29uc3Qge2lzQXJyYXksIGlzRW1wdHksIGlzT2JqZWN0LCBpc0Z1bmN0aW9ufSA9IHJlcXVpcmUoJ2xvZGFzaC9sYW5nJyk7XHJcbmNvbnN0IHtkZWZlcn0gPSByZXF1aXJlKCdsb2Rhc2gvZnVuY3Rpb24nKTtcclxuY29uc3QgY2FwaXRhbGl6ZSA9IHJlcXVpcmUoJ2xvZGFzaC9zdHJpbmcvY2FwaXRhbGl6ZScpO1xyXG5jb25zdCBJbW11dGFibGUgPSByZXF1aXJlKCdpbW11dGFibGUnKTtcclxuY29uc3QgQXBwRGlzcGF0Y2hlciA9IHJlcXVpcmUoJy4uL2Rpc3BhdGNoZXInKTtcclxuY29uc3QgX2luc3RhbmNlcyA9IFtdO1xyXG5cclxuLyoqXHJcbiogQGNsYXNzIENvcmVTdG9yZVxyXG4qL1xyXG5jbGFzcyBDb3JlU3RvcmUgZXh0ZW5kcyBFdmVudEVtaXR0ZXIge1xyXG5cclxuICAgIC8qKlxyXG4gICAgKiBDb250cnVjdG9yIG9mIHRoZSBzdG9yZSBjbGFzcy5cclxuICAgICovXHJcbiAgICBjb25zdHJ1Y3Rvcihjb25maWcpIHtcclxuICAgICAgICBzdXBlcigpO1xyXG4gICAgICAgIGFzc2lnbih0aGlzLCB7XHJcbiAgICAgICAgICAgIGNvbmZpZ1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIC8vSW5pdGlhbGl6ZSB0aGUgZGF0YSBhcyBpbW11dGFibGUgbWFwLlxyXG4gICAgICAgIHRoaXMuZGF0YSA9IEltbXV0YWJsZS5NYXAoe30pO1xyXG4gICAgICAgIHRoaXMuc3RhdHVzID0gSW1tdXRhYmxlLk1hcCh7fSk7XHJcbiAgICAgICAgdGhpcy5lcnJvciA9IEltbXV0YWJsZS5NYXAoe30pO1xyXG4gICAgICAgIHRoaXMucGVuZGluZ0V2ZW50cyA9IFtdO1xyXG4gICAgICAgIHRoaXMuY3VzdG9tSGFuZGxlciA9IGFzc2lnbih7fSwgY29uZmlnLmN1c3RvbUhhbmRsZXIpO1xyXG4gICAgICAgIC8vUmVnaXN0ZXIgYWxsIGdlcm5lcmF0ZWQgbWV0aG9kcy5cclxuICAgICAgICB0aGlzLmJ1aWxkRGVmaW5pdGlvbigpO1xyXG4gICAgICAgIHRoaXMuYnVpbGRFYWNoTm9kZUNoYW5nZUV2ZW50TGlzdGVuZXIoKTtcclxuICAgICAgICB0aGlzLnJlZ2lzdGVyRGlzcGF0Y2hlcigpO1xyXG4gICAgICAgIGlmKCEhX19ERVZfXyl7XHJcbiAgICAgICAgICB0aGlzLl9yZWdpc3RlckRldlRvb2xzKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgLy8gR2V0IGFsbCB0aGUgaW5zdGFuY2VzIG9mIGNvcmUgc3RvcmUuXHJcbiAgICBnZXQgX2luc3RhbmNlcygpe1xyXG4gICAgICByZXR1cm4gWy4uLl9pbnN0YW5jZXNdO1xyXG4gICAgfVxyXG4gICAgLy8gcmVnaXN0ZXIgdGhlIGluc3RhbmNlcyBzYXZpbmdcclxuICAgIF9yZWdpc3RlckRldlRvb2xzKCl7XHJcbiAgICAgICAgX2luc3RhbmNlcy5wdXNoKHRoaXMpO1xyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAqIEluaXRpYWxpemUgdGhlIHN0b3JlIGNvbmZpZ3VyYXRpb24uXHJcbiAgICAqIEBwYXJhbSB7b2JqZWN0fSBzdG9yZUNvbmZpZ3VyYXRpb24gLSBUaGUgc3RvcmUgY29uZmlndXJhdGlvbiBmb3IgdGhlIGluaXRpYWxpemF0aW9uLlxyXG4gICAgKi9cclxuICAgIGJ1aWxkRGVmaW5pdGlvbigpIHtcclxuICAgICAgICAvKipcclxuICAgICAgICAqIEJ1aWxkIHRoZSBkZWZpbml0aW9ucyBmb3IgdGhlIGVudGl0eSAobWF5IGJlIGEgc3ViamVjdC4pXHJcbiAgICAgICAgKiBAdHlwZSB7b2JqZWN0fVxyXG4gICAgICAgICovXHJcbiAgICAgICAgaWYoIXRoaXMuY29uZmlnLmRlZmluaXRpb24pe1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0NvcmUgU3RvcmU6IG1pc3NpbmcgZGVmaW5pdGlvbicsIHRoaXMuY29uZmlnKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5kZWZpbml0aW9uID0gdGhpcy5jb25maWcuZGVmaW5pdGlvbjtcclxuICAgICAgICByZXR1cm4gdGhpcy5kZWZpbml0aW9uO1xyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAqIEdldCB0aGUgd2hvbGUgdmFsdWUgb2YgdGhlXHJcbiAgICAqIEByZXR1cm4ge1t0eXBlXX0gW2Rlc2NyaXB0aW9uXVxyXG4gICAgKi9cclxuICAgIGdldFZhbHVlKCl7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZGF0YSA/IHRoaXMuZGF0YS50b0pTKCkgOiB7fTtcclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgKiBHZXR0ZXIgb24gdGhlIGlkZW50aWZpZXIgcHJvcGVydHkuXHJcbiAgICAqIEByZXR1cm4ge3N0cmluZ30gLSBTdG9yZSBpZGVudGlmaWVyLlxyXG4gICAgKi9cclxuICAgIGdldCBpZGVudGlmaWVyKCl7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuY29uZmlnICYmIHRoaXMuY29uZmlnLmlkZW50aWZpZXIgPyB0aGlzLmNvbmZpZy5pZGVudGlmaWVyIDogdW5kZWZpbmVkO1xyXG4gICAgfVxyXG4gICAgLyoqIFJldHVybiB0aGUgc3RhdHVzIG9mIGEgZGVmaW5pdGlvbi5cclxuICAgICogQHBhcmFtIHtzdHJpbmd9IC0gVGhlIGRlZmluaXRpb24gdG8gbG9hZC5cclxuICAgICogQHJldHVybnMge3N0cmluZ30gLSBUaGUgc3RhdHVzIG9mIGEgZGVmaW5pdGlvbi5cclxuICAgICovXHJcbiAgICBnZXRTdGF0dXMoZGVmKXtcclxuICAgICAgICBpZiAodGhpcy5zdGF0dXMuaGFzKGRlZikpe1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5zdGF0dXMuZ2V0KGRlZik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB1bmRlZmluZWQ7XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICogRW1pdCBhbGwgZXZlbnRzIHBlbmRpbmcgaW4gdGhlIHBlbmRpbmdFdmVudHMgbWFwLlxyXG4gICAgKi9cclxuICAgIGVtaXRQZW5kaW5nRXZlbnRzKCl7XHJcbiAgICAgICAgdGhpcy5wZW5kaW5nRXZlbnRzLm1hcCgoZXZ0VG9FbWl0KT0+e1xyXG4gICAgICAgICAgICBsZXQge25hbWUsIGRhdGF9ID0gZXZ0VG9FbWl0O1xyXG4gICAgICAgICAgICB0aGlzLmVtaXQobmFtZSwgZGF0YSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAqIFJlcGxhY2UgdGhlIGVtaXQgZnVuY3Rpb24gd2l0aCBhIHdpbGxFbWl0IGluIG90ZGVyIHRvIHN0b3JlIHRoZSBjaGFuZ2luZyBldmVudCBidXQgc2VuZCBpdCBhZnRlcndhcmRzLlxyXG4gICAgKiBAcGFyYW0gZXZlbnROYW1lIHtzdHJpbmd9IC0gVGhlIGV2ZW50IG5hbWUuXHJcbiAgICAqIEBwYXJhbSAgZGF0YSB7b2JqZWN0fSAtIFRoZSBldmVudCdzIGFzc29jaWF0ZWQgZGF0YS5cclxuICAgICovXHJcbiAgICB3aWxsRW1pdChldmVudE5hbWUsIGRhdGEpe1xyXG4gICAgICAgIHRoaXMucGVuZGluZ0V2ZW50cyA9IHRoaXMucGVuZGluZ0V2ZW50cy5yZWR1Y2UoKHJlc3VsdCwgY3VycmVudCk9PntcclxuICAgICAgICAgICAgaWYoY3VycmVudC5uYW1lICE9PSBldmVudE5hbWUpe1xyXG4gICAgICAgICAgICAgICAgcmVzdWx0LnB1c2goY3VycmVudCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcclxuICAgICAgICB9LCBbe25hbWU6IGV2ZW50TmFtZSwgZGF0YTogZGF0YX1dKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICogQ2xlYXIgYWxsIHBlbmRpbmcgZXZlbnRzLlxyXG4gICAgKi9cclxuICAgIGNsZWFyUGVuZGluZ0V2ZW50cygpe1xyXG4gICAgICAgIHRoaXMucGVuZGluZ0V2ZW50cyA9IFtdO1xyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAqIEJ1aWxkIGEgY2hhbmdlIGxpc3RlbmVyIGZvciBlYWNoIHByb3BlcnR5IGluIHRoZSBkZWZpbml0aW9uLiAoc2hvdWxkIGJlIG1hY3JvIGVudGl0aWVzKTtcclxuICAgICovXHJcbiAgICBidWlsZEVhY2hOb2RlQ2hhbmdlRXZlbnRMaXN0ZW5lcigpIHtcclxuICAgICAgICBjb25zdCBjdXJyZW50U3RvcmUgPSB0aGlzO1xyXG4gICAgICAgIC8vTG9vcCB0aHJvdWdoIGVhY2ggc3RvcmUgcHJvcGVydGllcy5cclxuICAgICAgICBmb3IgKGxldCBkZWZpbml0aW9uIGluIHRoaXMuZGVmaW5pdGlvbikge1xyXG4gICAgICAgICAgICBjb25zdCBjYXBpdGFsaXplRGVmaW5pdGlvbiA9IGNhcGl0YWxpemUoZGVmaW5pdGlvbik7XHJcbiAgICAgICAgICAgIC8vQ3JlYXRlcyB0aGUgY2hhbmdlIGxpc3RlbmVyXHJcbiAgICAgICAgICAgIGN1cnJlbnRTdG9yZVtgYWRkJHtjYXBpdGFsaXplRGVmaW5pdGlvbn1DaGFuZ2VMaXN0ZW5lcmBdID0gZnVuY3Rpb24oZGVmKXtcclxuICAgICAgICAgICAgICAgIHJldHVybiBmdW5jdGlvbiAoY2IpIHtcclxuICAgICAgICAgICAgICAgICAgICBjdXJyZW50U3RvcmUuYWRkTGlzdGVuZXIoYCR7ZGVmfTpjaGFuZ2VgLCBjYik7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0oZGVmaW5pdGlvbik7XHJcbiAgICAgICAgICAgIC8vUmVtb3ZlIHRoZSBjaGFuZ2UgbGlzdGVuZXJcclxuICAgICAgICAgICAgY3VycmVudFN0b3JlW2ByZW1vdmUke2NhcGl0YWxpemVEZWZpbml0aW9ufUNoYW5nZUxpc3RlbmVyYF0gPSBmdW5jdGlvbihkZWYpe1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZ1bmN0aW9uIChjYikge1xyXG4gICAgICAgICAgICAgICAgICAgIGN1cnJlbnRTdG9yZS5yZW1vdmVMaXN0ZW5lcihgJHtkZWZ9OmNoYW5nZWAsIGNiKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfShkZWZpbml0aW9uKTtcclxuICAgICAgICAgICAgLy9DcmVhdGUgYW4gdXBkYXRlIG1ldGhvZC5cclxuICAgICAgICAgICAgLy9TaG91bGQgYmUgbmFtZWQgdXBkYXRlRGF0YSB0byBiZSBtb3JlIGV4cGxpY2l0XHJcbiAgICAgICAgICAgIGlmKGN1cnJlbnRTdG9yZVtgdXBkYXRlJHtjYXBpdGFsaXplRGVmaW5pdGlvbn1gXSA9PT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgICAgIGN1cnJlbnRTdG9yZVtgdXBkYXRlJHtjYXBpdGFsaXplRGVmaW5pdGlvbn1gXSA9IGZ1bmN0aW9uKGRlZil7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZ1bmN0aW9uIChkYXRhTm9kZSwgc3RhdHVzLCBpbmZvcm1hdGlvbnMpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgaW1tdXRhYmxlTm9kZSA9IGlzRnVuY3Rpb24oZGF0YU5vZGUpID8gZGF0YU5vZGUgOiBJbW11dGFibGUuZnJvbUpTKGRhdGFOb2RlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY3VycmVudFN0b3JlLmRhdGEgPSBjdXJyZW50U3RvcmUuZGF0YS5zZXQoZGVmLCBpbW11dGFibGVOb2RlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy9VcGRhdGUgdGhlIHN0YXR1cyBvbiB0aGUgZGF0YS5cclxuICAgICAgICAgICAgICAgICAgICAgICAgY3VycmVudFN0b3JlLnN0YXR1cyA9IGN1cnJlbnRTdG9yZS5zdGF0dXMuc2V0KGRlZiwgc3RhdHVzKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGN1cnJlbnRTdG9yZS53aWxsRW1pdChgJHtkZWZ9OmNoYW5nZWAsIHtwcm9wZXJ0eTogZGVmLCBzdGF0dXM6IHN0YXR1cywgaW5mb3JtYXRpb25zOiBpbmZvcm1hdGlvbnN9KTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KGRlZmluaXRpb24pO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvL0NyZWF0ZSBhIGdldCBtZXRob2QuXHJcbiAgICAgICAgICAgIGlmKGN1cnJlbnRTdG9yZVtgZ2V0JHtjYXBpdGFsaXplRGVmaW5pdGlvbn1gXSA9PT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgICAgIGN1cnJlbnRTdG9yZVtgZ2V0JHtjYXBpdGFsaXplRGVmaW5pdGlvbn1gXSA9IGZ1bmN0aW9uKGRlZil7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgaGFzRGF0YSA9IGN1cnJlbnRTdG9yZS5kYXRhLmhhcyhkZWYpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZihoYXNEYXRhKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHJhd0RhdGEgPSBjdXJyZW50U3RvcmUuZGF0YS5nZXQoZGVmKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vSWYgdGhlIHN0b3JlIG5vZGUgaXNuJ3QgYW4gb2JqZWN0LCBpbW11dGFibGUgc29sdXRpb24gYXJlIG5vbiBzZW5zLlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYoaXNGdW5jdGlvbihyYXdEYXRhKSB8fCAhaXNPYmplY3QocmF3RGF0YSkpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiByYXdEYXRhO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgZGF0YSA9IHJhd0RhdGEudG9KUygpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKCFpc0VtcHR5KGRhdGEpKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGRhdGE7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB1bmRlZmluZWQ7XHJcbiAgICAgICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgIH0oZGVmaW5pdGlvbik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy9DcmVhdGVzIHRoZSBlcnJvciBjaGFuZ2UgbGlzdGVuZXJcclxuICAgICAgICAgICAgY3VycmVudFN0b3JlW2BhZGQke2NhcGl0YWxpemVEZWZpbml0aW9ufUVycm9yTGlzdGVuZXJgXSA9IGZ1bmN0aW9uKGRlZil7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZnVuY3Rpb24gKGNiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY3VycmVudFN0b3JlLmFkZExpc3RlbmVyKGAke2RlZn06ZXJyb3JgLCBjYik7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0oZGVmaW5pdGlvbik7XHJcbiAgICAgICAgICAgIC8vUmVtb3ZlIHRoZSBjaGFuZ2UgbGlzdGVuZXJcclxuICAgICAgICAgICAgY3VycmVudFN0b3JlW2ByZW1vdmUke2NhcGl0YWxpemVEZWZpbml0aW9ufUVycm9yTGlzdGVuZXJgXSA9IGZ1bmN0aW9uKGRlZil7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZnVuY3Rpb24gKGNiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY3VycmVudFN0b3JlLnJlbW92ZUxpc3RlbmVyKGAke2RlZn06ZXJyb3JgLCBjYik7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0oZGVmaW5pdGlvbik7XHJcbiAgICAgICAgICAgIC8vQ3JlYXRlIGFuIHVwZGF0ZSBtZXRob2QuXHJcbiAgICAgICAgICAgIGN1cnJlbnRTdG9yZVtgdXBkYXRlRXJyb3Ike2NhcGl0YWxpemVEZWZpbml0aW9ufWBdID0gZnVuY3Rpb24oZGVmKXtcclxuICAgICAgICAgICAgICAgIHJldHVybiBmdW5jdGlvbiAoZGF0YU5vZGUsIHN0YXR1cywgaW5mb3JtYXRpb25zKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy9DaGVja0lzT2JqZWN0XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgaW1tdXRhYmxlTm9kZSA9IEltbXV0YWJsZVtpc0FycmF5KGRhdGFOb2RlKSA/IFwiTGlzdFwiIDogXCJNYXBcIl0oZGF0YU5vZGUpO1xyXG4gICAgICAgICAgICAgICAgICAgIGN1cnJlbnRTdG9yZS5lcnJvciA9IGN1cnJlbnRTdG9yZS5lcnJvci5zZXQoZGVmLCBpbW11dGFibGVOb2RlKTtcclxuICAgICAgICAgICAgICAgICAgICBjdXJyZW50U3RvcmUuc3RhdHVzID0gY3VycmVudFN0b3JlLnN0YXR1cy5zZXQoZGVmLCBzdGF0dXMpO1xyXG4gICAgICAgICAgICAgICAgICAgIGN1cnJlbnRTdG9yZS53aWxsRW1pdChgJHtkZWZ9OmVycm9yYCwge3Byb3BlcnR5OiBkZWYsIHN0YXR1czogc3RhdHVzLCBpbmZvcm1hdGlvbnM6IGluZm9ybWF0aW9uc30pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KGRlZmluaXRpb24pO1xyXG4gICAgICAgICAgICAvL0NyZWF0ZSBhIGdldCBtZXRob2QuXHJcbiAgICAgICAgICAgIGN1cnJlbnRTdG9yZVtgZ2V0RXJyb3Ike2NhcGl0YWxpemVEZWZpbml0aW9ufWBdID0gZnVuY3Rpb24oZGVmKXtcclxuICAgICAgICAgICAgICAgIHJldHVybiBmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGhhc0RhdGEgPSBjdXJyZW50U3RvcmUuZXJyb3IuaGFzKGRlZik7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGhhc0RhdGEgPyBjdXJyZW50U3RvcmUuZXJyb3IuZ2V0KGRlZikudG9KUygpIDogdW5kZWZpbmVkO1xyXG4gICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgfShkZWZpbml0aW9uKTtcclxuXHJcblxyXG4gICAgICAgICAgICAvLyBzdGF0dXNcclxuICAgICAgICAgICAgY3VycmVudFN0b3JlW2BhZGQke2NhcGl0YWxpemVEZWZpbml0aW9ufVN0YXR1c0xpc3RlbmVyYF0gPSBmdW5jdGlvbihkZWYpe1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZ1bmN0aW9uIChjYikge1xyXG4gICAgICAgICAgICAgICAgICAgIGN1cnJlbnRTdG9yZS5hZGRMaXN0ZW5lcihgJHtkZWZ9OnN0YXR1c2AsIGNiKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfShkZWZpbml0aW9uKTtcclxuICAgICAgICAgICAgLy9SZW1vdmUgdGhlIGNoYW5nZSBsaXN0ZW5lclxyXG4gICAgICAgICAgICBjdXJyZW50U3RvcmVbYHJlbW92ZSR7Y2FwaXRhbGl6ZURlZmluaXRpb259U3RhdHVzTGlzdGVuZXJgXSA9IGZ1bmN0aW9uKGRlZil7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZnVuY3Rpb24gKGNiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY3VycmVudFN0b3JlLnJlbW92ZUxpc3RlbmVyKGAke2RlZn06c3RhdHVzYCwgY2IpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KGRlZmluaXRpb24pO1xyXG4gICAgICAgICAgICAvL0NyZWF0ZSBhbiB1cGRhdGUgbWV0aG9kLlxyXG4gICAgICAgICAgICBjdXJyZW50U3RvcmVbYHVwZGF0ZVN0YXR1cyR7Y2FwaXRhbGl6ZURlZmluaXRpb259YF0gPSBmdW5jdGlvbihkZWYpe1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZ1bmN0aW9uIHVwZGF0ZVN0YXR1cyhkYXRhTm9kZSwgc3RhdHVzLCBpbmZvcm1hdGlvbnMpIHtcclxuICAgICAgICAgICAgICAgICAgICAvL0NoZWNrSXNPYmplY3RcclxuICAgICAgICAgICAgICAgICAgICAvL2NvbnNvbGUubG9nKGBzdGF0dXMgICR7SlNPTi5zdHJpbmdpZnkoc3RhdHVzKX1gKTtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBzdGF0dXNOb2RlID0gc3RhdHVzOy8vSW1tdXRhYmxlLmZyb21KUyhzdGF0dXMpOyAvLyBtTWF5YmUgaXQgaXMgYSBwYXJ0IG9mIHRoZSBzdGF0dXMgb25seS5cclxuICAgICAgICAgICAgICAgICAgICBjdXJyZW50U3RvcmUuc3RhdHVzID0gY3VycmVudFN0b3JlLnN0YXR1cy5zZXQoZGVmLCBzdGF0dXNOb2RlKTtcclxuICAgICAgICAgICAgICAgICAgICBjdXJyZW50U3RvcmUud2lsbEVtaXQoYCR7ZGVmfTpzdGF0dXNgLCB7cHJvcGVydHk6IGRlZiwgc3RhdHVzOiBzdGF0dXMsIGluZm9ybWF0aW9uczogaW5mb3JtYXRpb25zfSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0oZGVmaW5pdGlvbik7XHJcbiAgICAgICAgICAgIC8vQ3JlYXRlIGEgZ2V0IG1ldGhvZC5cclxuICAgICAgICAgICAgY3VycmVudFN0b3JlW2BnZXRTdGF0dXMke2NhcGl0YWxpemVEZWZpbml0aW9ufWBdID0gZnVuY3Rpb24oZGVmKXtcclxuICAgICAgICAgICAgICAgIHJldHVybiBmdW5jdGlvbiBnZXRTdGF0dXMoKXtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBoYXNEYXRhID0gY3VycmVudFN0b3JlLnN0YXR1cy5oYXMoZGVmKTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gaGFzRGF0YSA/IGN1cnJlbnRTdG9yZS5zdGF0dXMuZ2V0KGRlZikudG9KUygpIDogdW5kZWZpbmVkO1xyXG4gICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgfShkZWZpbml0aW9uKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZGVsYXlQZW5kaW5nRXZlbnRzKGNvbnRleHQpe1xyXG4gICAgICAgIC8vRGVsYXkgYWxsIHRoZSBjaGFuZ2UgZW1pdCBieSB0aGUgc3RvcmUgdG8gYmUgc3VyZSBpdCBpcyBkb25lIGFmdGVyIHRoZSBpbnRlcm5hbCBzdG9yZSBwcm9wYWdhdGlvbiBhbmQgdG8gZ28gb3V0IG9mIHRoZSBkaXNwYXRjaCBmdW5jdGlvbi5cclxuICAgICAgICBkZWZlcigoKT0+e1xyXG4gICAgICAgICAgICBjb250ZXh0LmVtaXRQZW5kaW5nRXZlbnRzKCk7XHJcbiAgICAgICAgICAgIGNvbnRleHQuY2xlYXJQZW5kaW5nRXZlbnRzKCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICBfYnVpbGRJbmZvcm1hdGlvbnMoaW5jb21pbmdJbmZvcyl7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgY2FsbGVySWQ6IGluY29taW5nSW5mb3MuYWN0aW9uLmNhbGxlcklkXHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgKiBUaGUgc3RvcmUgcmVnaXN0cmVyIGl0c2VsZiBvbiB0aGUgZGlzcGF0Y2hlci5cclxuICAgICovXHJcbiAgICByZWdpc3RlckRpc3BhdGNoZXIoKXtcclxuICAgICAgICBjb25zdCBjdXJyZW50U3RvcmUgPSB0aGlzO1xyXG4gICAgICAgIHRoaXMuZGlzcGF0Y2ggPSBBcHBEaXNwYXRjaGVyLnJlZ2lzdGVyKGZ1bmN0aW9uKHRyYW5zZmVySW5mbykge1xyXG4gICAgICAgICAgICAvL0NoZWNrIGlmIGFuIGlkZW50aWZpZXIgY2hlY2sgaXMgbmVjZXNzYXJ5LlxyXG4gICAgICAgICAgICBpZihjdXJyZW50U3RvcmUuaWRlbnRpZmllcil7XHJcbiAgICAgICAgICAgICAgICAvL0lmIGFuIGlkZW50aWZpZXIgaXMgbmVlZGVkIGEgY2hlY2sgaXMgdHJpZ2dlcmVkLlxyXG4gICAgICAgICAgICAgICAgaWYoIXRyYW5zZmVySW5mbyB8fCAhdHJhbnNmZXJJbmZvLmFjdGlvbiB8fCAhdHJhbnNmZXJJbmZvLmFjdGlvbi5pZGVudGlmaWVyIHx8IHRyYW5zZmVySW5mby5hY3Rpb24uaWRlbnRpZmllciAhPT0gY3VycmVudFN0b3JlLmlkZW50aWZpZXIpe1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAvL2N1cnJlbnRTdG9yZS5jbGVhclBlbmRpbmdFdmVudHMoKTtcclxuICAgICAgICAgICAgaWYoY3VycmVudFN0b3JlLmdsb2JhbEN1c3RvbUhhbmRsZXIpe1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGN1cnJlbnRTdG9yZS5nbG9iYWxDdXN0b21IYW5kbGVyLmNhbGwoY3VycmVudFN0b3JlLCB0cmFuc2ZlckluZm8pO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvL1JlYWQgZGF0YSBmcm9tIHRoZSBhY3Rpb24gdHJhbnNmZXIgaW5mb3JtYXRpb24uXHJcbiAgICAgICAgICAgIGNvbnN0IHJhd0RhdGEgPSB0cmFuc2ZlckluZm8uYWN0aW9uLmRhdGE7XHJcbiAgICAgICAgICAgIGNvbnN0IHN0YXR1cyA9IHRyYW5zZmVySW5mby5hY3Rpb24uc3RhdHVzIHx8IHt9O1xyXG4gICAgICAgICAgICBjb25zdCB0eXBlID0gdHJhbnNmZXJJbmZvLmFjdGlvbi50eXBlO1xyXG4gICAgICAgICAgICBjb25zdCBvdGhlckluZm9ybWF0aW9ucyA9IGN1cnJlbnRTdG9yZS5fYnVpbGRJbmZvcm1hdGlvbnModHJhbnNmZXJJbmZvKTtcclxuXHJcbiAgICAgICAgICAgIC8vQ2FsbCBlYWNoIG5vZGUgaGFuZGxlciBmb3IgdGhlIG1hdGNoaW5nIGRlZmluaXRpb24ncyBub2RlLlxyXG4gICAgICAgICAgICBmb3IobGV0IG5vZGUgaW4gcmF3RGF0YSl7XHJcbiAgICAgICAgICAgICAgICBpZihjdXJyZW50U3RvcmUuZGVmaW5pdGlvbltub2RlXSl7XHJcbiAgICAgICAgICAgICAgICAgICAgLy9DYWxsIGEgY3VzdG9tIGhhbmRsZXIgaWYgdGhpcyBleGlzdHMuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYoY3VycmVudFN0b3JlLmN1c3RvbUhhbmRsZXIgJiYgY3VycmVudFN0b3JlLmN1c3RvbUhhbmRsZXJbbm9kZV0gJiYgY3VycmVudFN0b3JlLmN1c3RvbUhhbmRsZXJbbm9kZV1bdHlwZV0pe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjdXJyZW50U3RvcmUuY3VzdG9tSGFuZGxlcltub2RlXVt0eXBlXS5jYWxsKGN1cnJlbnRTdG9yZSwgcmF3RGF0YVtub2RlXSwgc3RhdHVzW25vZGVdLCBvdGhlckluZm9ybWF0aW9ucyk7XHJcbiAgICAgICAgICAgICAgICAgICAgfWVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL1VwZGF0ZSB0aGUgZGF0YSBmb3IgdGhlIGdpdmVuIG5vZGUuIGFuZCBlbWl0IHRoZSBjaGFuZ2UvLlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZighaXNGdW5jdGlvbihjdXJyZW50U3RvcmVbYCR7dHlwZX0ke2NhcGl0YWxpemUobm9kZSl9YF0pKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgVGhlIGxpc3RlbmVyIHlvdSB0cnkgdG8gY2FsbCBpcyB1bmF2YWlsYWJsZSA6ICR7dHlwZX0ke2NhcGl0YWxpemUobm9kZSl9YCApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGN1cnJlbnRTdG9yZVtgJHt0eXBlfSR7Y2FwaXRhbGl6ZShub2RlKX1gXShyYXdEYXRhW25vZGVdLCBzdGF0dXNbbm9kZV0sIG90aGVySW5mb3JtYXRpb25zKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY3VycmVudFN0b3JlLmRlbGF5UGVuZGluZ0V2ZW50cyhjdXJyZW50U3RvcmUpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAqIEFkZCBhIGxpc3RlbmVyIG9uIGEgc3RvcmUgZXZlbnQuXHJcbiAgICAqIEBwYXJhbSB7c3RyaW5nfSAgIGV2ZW50TmFtZSAtIEV2ZW50IG5hbWUuXHJcbiAgICAqIEBwYXJhbSB7RnVuY3Rpb259IGNiIC0gQ2FsbEJhY2sgdG8gY2FsbCBvbiB0aGUgZXZlbnQgY2hhbmdlIG5hbWUuXHJcbiAgICAqL1xyXG4gICAgYWRkTGlzdGVuZXIoZXZlbnROYW1lLCBjYikge1xyXG4gICAgICAgIHRoaXMub24oZXZlbnROYW1lLCBjYik7XHJcbiAgICB9XHJcbn1cclxubW9kdWxlLmV4cG9ydHMgPSBDb3JlU3RvcmU7XHJcbiJdfQ==