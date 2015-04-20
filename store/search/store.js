//Dependencies.
var CoreStore = require('../CoreStore');
var assign = require('object-assign');
var AppDispatcher = require('../../dispatcher');
var keys = require('lodash/object/keys');
var intersection = require('lodash/array/intersection');
var Immutable = require('immutable');
var isArray = require('lodash/lang/isArray');

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
  constructor(conf) {
    var config = assign({}, {definitionPath: 'search'}, conf);
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
    var processedData = assign({}, previousData, newData);

    if(isArray(newData.list)) {
        if (this._isSameSearchContext(previousData, newData)) {
            processedData.list = previousData.list.concat(newData.list);
        }

        //add calculated fields on data
        if (processedData.pageInfos.totalRecords && processedData.pageInfos.perPage && processedData.pageInfos.perPage != 0) {
            processedData.pageInfos.totalPages = Math.ceil(processedData.pageInfos.totalRecords / processedData.pageInfos.perPage);
        }
    }
    var data = {};
    for(var key in processedData){
      data[key] = Immutable[isArray(processedData[key]) ? 'List' : 'Map'](processedData[key]);
    }
    this.data = Immutable.Map(data);
    this.emit('search:change');
  }

  /**
   * Check if the search need to concat the nexData with the previous data (infinite scrol case).
   */
  _isSameSearchContext(previousData, newData) {
    if(newData.pageInfos) {
        return newData.pageInfos.currentPage != 1;
    }
    return false;
  }

  /**
   * Add a listener on the global change on the search store.
   * @param {Function} cb [description]
   */
  addSearchChangeListener(cb){
    this.addListener('search:change', cb);
  }

  /**
   * Remove listener on search change event.
   * @param cb callback
   */
  removeSearchChangeListener(cb){
    this.removeListener('search:change', cb);
  }
  /**
   * The store registrer itself on the dispatcher.
   */
  registerDispatcher(){
    var currentStore = this;
    this.dispatch = AppDispatcher.register(function(transferInfo) {
      var defKeys = keys(currentStore.definition); //TODO: a sub part of the keys may be needed.
      var dataKeys = keys(transferInfo.action.data);
      var intersectKeys = intersection(defKeys, dataKeys);
      if(intersectKeys.length === defKeys.length){
       currentStore.update(transferInfo.action.data);
      }
    });
  }
}

module.exports = SearchStore;
