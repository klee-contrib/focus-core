//Dependencies.
var CoreStore = require('../CoreStore');
var assign = require('object-assign');
var AppDispatcher = require('../../dispatcher');
var keys = require('lodash/object/keys');
var intersection = require('lodash/array/intersection');
var Immutable = require('immutable');
var isArray = require('lodash/lang/isArray');
var isEqual = require('lodash/lang/isEqual');
var merge = require('lodash/object/merge');

/**
 * Default configuration of the search.
 * @type {Object}
 */

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

        if (keys(newData.map).length === 1) { // Only one type of result, compute the total pages to trigger the infinite scroll behaviour
            if (this._isSameSearchContext(previousData, newData)) {
                var key = keys(previousData.map)[0];
                processedData.map[key] = previousData.map[key].concat(newData.map[key]);
            }

            //add calculated fields on data
            if (processedData.pageInfos.totalRecords && processedData.pageInfos.perPage && processedData.pageInfos.perPage != 0) {
                processedData.pageInfos.totalPages = Math.ceil(processedData.pageInfos.totalRecords / processedData.pageInfos.perPage);
                // Check if the last page has been fetched, if yes, send an info to the console
                if (processedData.pageInfos.totalPages === processedData.pageInfos.currentPage) {
                    console.info(`Search store reached last page (page ${processedData.pageInfos.currentPage}) for a total of ${processedData.pageInfos.totalRecords} records.`);
                }
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
            return newData.pageInfos.currentPage != 1 && isEqual(keys(previousData.map), keys(newData.map));
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
            if (intersectKeys.length > 0) {
                if(intersectKeys.length === defKeys.length){
                    currentStore.update(transferInfo.action.data);
                } else {
                    console.warn(`Incomplete search store update received. Got [${dataKeys.join(',')}], expected [${defKeys.join(',')}].`);
                }
            }

        });
    }
}

module.exports = SearchStore;
