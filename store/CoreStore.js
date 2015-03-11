//The store is an event emitter.
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var getEntityInformations = require('../definition/entity/builder').getEntityInformations;
var capitalize = require('lodash/string/capitalize');
var Immutable = require('immutable');
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
    this.buildDefinition();
    this.buildEachNodeChangeEventListener();
    this.data = Immutable.Map({});
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
      this.definition = getEntityInformations(
        this.config.definitionPath,
        this.config.customDefinition
      );
      return this.definitions;
    }
  /**
  * Build a change listener for each property in the definition. (should be macro entities);
  */
  buildEachNodeChangeEventListener() {
      //Loop through each store properties.
      for (var definition in this.definition) {
        var capitalizeDefinition = capitalize(definition);
        //Creates the change listener
        this[`add${capitalizeDefinition}ChangeListener`] = function (cb) {
            this.addListener(`${definition}:change`, cb);
        };
        //Create an update method.
        this[`update${capitalizeDefinition}`] = function (dataNode) {
          //CheckIsObject
          this.data = this.data.set(definition,dataNode);
          this.emit(`${definition}:change`);
        };
        //Create a get method.
        this[`get${capitalizeDefinition}`] = function () {
          return this.data.get(definition).toJS();
        };
      }
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
