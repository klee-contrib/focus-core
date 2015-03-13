//Dependencies.
var CoreStore = require('../CoreStore');
var assign = require('object-assign');
var AppDispatcher = require('../../dispatcher');
var keys = require('lodash/object/keys');
var intersection = require('lodash/array/intersection');
/**
 * Default configuration of the search.
 * @type {Object}
 */
/*var defaultSearchConfig = {
  facet:"facet",
  list:"list",
  pageInfos: "pageInfos"
};*/

class SearchStore extends CoreStore {
  constructor(conf){
    var config = assign({}, {definitionPath: "search"}, conf);
    super(config);
  }
  get(){
    return this.data.toJS();
  }
  /**
   * Update all the data from the search.
   * @return {}
  */
  update(newData){
    var previousData = this.data.toJS();
    var processedData = assign(previousData,newData);
    if(previousData.searchContext.scope === newData.searchContext.scope
        && previousData.searchContext.query === newData.searchContext.query){
      processedData.list = previousData.list.concat(newData.list);
    }
    var data = {};
    for(var key in processedData){
      data[key] = Immutable[isArray(dataNode) ? "List" : "Map"](processedData[key]);
    }
    this.data = Immutable.Map(data);
    this.emit('search:change');
  }
  /**
   * Add a listener on the global change on the search store.
   * @param {Function} cb [description]
   */
  addSearchChangeListener(cb){
    this.addListener('search:change', cb);
  }
  /**
   * The store registrer itself on the dispatcher.
   */
  registerDispatcher(){
    var currentStore = this;
    this.dispatch = AppDispatcher.register(function(transferInfo) {
      var defKeys = keys(this.definition); //TODO: a sub part of the keys may be needed.
      var dataKeys = keys(transferInfo.data);
      var intersectKeys = intersection(defKeys, dataKeys);
      if(intersectKeys.length === defKeys.keys){
       this.update(transferInfo.data);
      }
    });
  }
}

module.exports = SearchStore;
