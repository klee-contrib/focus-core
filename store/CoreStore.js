//The store is an event emitter.
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var {isArray, isEmpty, isObject, isFunction} = require('lodash/lang');
var {defer} = require('lodash/function');
var getEntityInformations = require('../definition/entity/builder').getEntityInformations;
var capitalize = require('lodash/string/capitalize');
var Immutable = require('immutable');
var AppDispatcher = require('../dispatcher');
/**
 * @class CoreStore
 */
class CoreStore extends EventEmitter {

  /**
   * Contructor of the store class.
   */
  constructor(config) {
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
      this.definition = this.config.definition || getEntityInformations(
        this.config.definitionPath,
        this.config.customDefinition
      );
      return this.definition;
  }
  /** Return the status of a definition.
   * @returns {string} - The status of a definition.
   */
  getStatus(def){
    if (this.status.has(def)){
      return this.status.get(def);
    }
    return undefined;
  }
  /**
   * Emit all events pending in the pendingEvents map.
   */
  emitPendingEvents(){
    this.pendingEvents.map((evtToEmit)=>{
      this.emit(evtToEmit.name, evtToEmit.data);
    });
  }

  /**
   * Replace the emit function with a willEmit in otder to store the changing event but send it afterwards.
   * @param eventName {string} - The event name.
   * @param  data {object} - The event's associated data.
   */
  willEmit(eventName, data){
    this.pendingEvents.push({name: eventName, data: data});
  }

  /**
   * Clear all pending events.
   */
  clearPendingEvents(){
    this.pendingEvents = [];
  }
  /**
  * Build a change listener for each property in the definition. (should be macro entities);
  */
  buildEachNodeChangeEventListener() {
    var currentStore = this;
      //Loop through each store properties.
      for (var definition in this.definition) {
        var capitalizeDefinition = capitalize(definition);
        //Creates the change listener
        currentStore[`add${capitalizeDefinition}ChangeListener`] = function(def){
          return function (cb) {
            currentStore.addListener(`${def}:change`, cb);
        }}(definition);
        //Remove the change listener
        currentStore[`remove${capitalizeDefinition}ChangeListener`] = function(def){
          return function (cb) {
            currentStore.removeListener(`${def}:change`, cb);
        }}(definition);
        //Create an update method.
        if(currentStore[`update${capitalizeDefinition}`] === undefined){
          currentStore[`update${capitalizeDefinition}`] = function(def){
            return function (dataNode, status) {
              var immutableNode = isFunction(dataNode) ? dataNode : Immutable.fromJS(dataNode);
              currentStore.data = currentStore.data.set(def, immutableNode);
              //Update the status on the data.
              currentStore.status = currentStore.status.set(def, status);
              currentStore.willEmit(`${def}:change`, {property: def, status: status});
          }}(definition);
        }

        //Create a get method.
        if(currentStore[`get${capitalizeDefinition}`] === undefined){
          currentStore[`get${capitalizeDefinition}`] = function(def){
            return function () {
              var hasData = currentStore.data.has(def);
              if(hasData){
                var rawData = currentStore.data.get(def);
                //If the store node isn't an object, immutable solution are non sens.  
                if(isFunction(rawData) || !isObject(rawData)){
                  return rawData;
                }
                else {
                  var data = rawData.toJS();
                  if(!isEmpty(data)){
                    return data;
                  }
                }
              }
              return undefined;
            };
          }(definition);
        }
        //Creates the error change listener
        currentStore[`add${capitalizeDefinition}ErrorListener`] = function(def){
            return function (cb) {
              currentStore.addListener(`${def}:error`, cb);
        }}(definition);
        //Remove the change listener
        currentStore[`remove${capitalizeDefinition}ErrorListener`] = function(def){
            return function (cb) {
              currentStore.removeListener(`${def}:error`, cb);
        }}(definition);
        //Create an update method.
        currentStore[`updateError${capitalizeDefinition}`] = function(def){
            return function (dataNode) {
              //CheckIsObject
              var immutableNode = Immutable[isArray(dataNode) ? "List" : "Map"](dataNode);
              currentStore.error = currentStore.error.set(def, immutableNode);
              currentStore.willEmit(`${def}:error`);
        }}(definition);
        //Create a get method.
        currentStore[`getError${capitalizeDefinition}`] = function(def){
            return function(){
              var hasData = currentStore.error.has(def);
              return hasData ? currentStore.error.get(def).toJS() : undefined;
            };
        }(definition);
      }
    }
  /**
   * The store registrer itself on the dispatcher.
   */
  registerDispatcher(){
    var currentStore = this;
    this.dispatch = AppDispatcher.register(function(transferInfo) {

      //currentStore.clearPendingEvents();
      if(currentStore.globalCustomHandler){
        return currentStore.globalCustomHandler.call(currentStore, transferInfo);
      }

      //Read data from the action transfer information.
      var rawData = transferInfo.action.data;
      var status = transferInfo.action.status || {};
      var type = transferInfo.action.type;

      //Call each node handler for the matching definition's node.
      for(var node in rawData){
        if(currentStore.definition[node]){
          //Call a custom handler if this exists.
          if(currentStore.customHandler && currentStore.customHandler[node] && currentStore.customHandler[node][type]){
            currentStore.customHandler[node][type].call(currentStore, rawData[node], status[node]);
          }else {
            //Update the data for the given node. and emit the change/.
            currentStore[`${type}${capitalize(node)}`](rawData[node], status[node]);
          }
        }
      }

      //Delay all the change emit by the store to be sure it is done after the internal store propagation and to go out of the dispatch function.
      defer(()=>{
        currentStore.emitPendingEvents();
        currentStore.clearPendingEvents();
      });

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
module.exports = CoreStore;
