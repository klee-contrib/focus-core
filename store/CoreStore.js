//The store is an event emitter.
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var {isArray, isEmpty, isObject} = require('lodash/lang');
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
    this.dataError = Immutable.Map({});
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
        currentStore[`update${capitalizeDefinition}`] = function(def){
          return function (dataNode) {
            var immutableNode = Immutable.fromJS(dataNode);
            currentStore.data = currentStore.data.set(def,immutableNode);
            currentStore.emit(`${def}:change`);
        }}(definition);
        //Create a get method.
        currentStore[`get${capitalizeDefinition}`] = function(def){
          return function () {
            var hasData = currentStore.data.has(def);
            if(hasData){
              var rawData = currentStore.data.get(def);
              if (isObject(rawData)) {
                var data = rawData.toJS();
                if(!isEmpty(data)){
                  return data;
                }
              } else {
                return rawData;
              }
            }
            return undefined;
          };
        }(definition);



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
                  currentStore.dataError = currentStore.dataError.set(def,immutableNode);
                  currentStore.emit(`${def}:error`);
              }}(definition);
          //Create a get method.
          currentStore[`getError${capitalizeDefinition}`] = function(def){
              return function () {
                  var hasData = currentStore.dataError.has(def);
                  return hasData ? currentStore.dataError.get(def).toJS() : undefined;
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
      //Complete rewrie by the store.
      //todo: see if this has meaning instead of an override
      if(currentStore.globalCustomHandler){
        return currentStore.globalCustomHandler.call(currentStore, transferInfo);
      }
      var rawData = transferInfo.action.data;
      var type = transferInfo.action.type;
      for(var node in rawData){
        if(currentStore.definition[node]){
          //Call a custom handler if this exists.
          if(currentStore.customHandler && currentStore.customHandler[node] && currentStore.customHandler[node][type]){
            currentStore.customHandler[node][type].call(currentStore, rawData[node]);
          }else {
            //Update the data for the given node. and emit the change/.
            currentStore[`${type}${capitalize(node)}`](rawData[node]);
          }
        }
      }
      //console.log('dispatchHandler:action', transferInfo);
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
