//Dependencies.
let assign = require('object-assign');
let keys = require('lodash/object/keys');
let {clone, isEqual} = require('lodash/lang');

const ALL = 'ALL';

let _buildPagination = (pageInfos) => {
    return {
        page: pageInfos.page || 0,
        skip: pageInfos.skip || 0
    }
};
let _buildOrderAndSort = (pageInfos) => {
    if (pageInfos.order) {
        let result = {};
        result.sortFieldName = pageInfos.order.key;
        if (pageInfos.order.order) {
            result.sortDesc = pageInfos.order.order.toLowerCase() === 'desc';
        }
        return result;
    } else {
        return {
            sortFieldName: '',
            sortDesc: false
        }
    }
};
let _buildFacets = (facets) => {
    return keys(facets).map((selectedFacetKey) => {
        let selectedFacet = facets[selectedFacetKey];
        return {
            key: selectedFacetKey,
            value: selectedFacet.key
        };
    });
};
let _parseUnscopedResponse = (data, context) => {
    return ({
        map: data.groups,
        facet: _parseFacets(data.facets),
        pageInfos: _parsePageInfos(data, context)
    });
};

let _parseScopedResponse = (data, context) => {
    return ({
        map: data.groups || {[context.scope]: data.list},
        facet: _parseFacets(data.facets),
        pageInfos: _parsePageInfos(data, context)
    });
};
let _parseFacets = (facets) => {
    return keys(facets).reduce((formattedFacets, serverFacetKey) => {
        let serverFacetData = facets[serverFacetKey];
        formattedFacets[serverFacetKey] = keys(serverFacetData).reduce((facetData, serverFacetItemKey) => {
            let serverFacetItemValue = serverFacetData[serverFacetItemKey];
            facetData[serverFacetItemKey] = {
                label: serverFacetItemKey,
                count: serverFacetItemValue
            };
            return facetData;
        }, {});
        return formattedFacets;
    }, {});
};

let _dispatchResult = (data) => {
    Focus.dispatcher.handleServerAction({
        data,
        type: 'update'
    });
};


let _parsePageInfos = (data, context) => {
    return {
        currentPage: context.page,
        perPage: 50,
        totalRecords: data.totalCount
    }
};

module.exports = function(config){
  /**
   * Builded search action.
   * @param  {object} options - The options used to build the service, it should have the following structure:
   * ```javascript
   * {
   * 	criteria:{
   * 		query: 'The query typed by the user'
   * 		scope: 'The selected scope'
   * 	},
   * 	pageInfos: { //All this informations will be use to transform the data given the query, this will be passed into the URL.
   * 		page: 'The wanted page',
   * 		skip: 'Number of results to skip',
   * 		sortBy: 'The information on wich the data is sorted', // This is **OPTIONAL**
   * 		sortAsc: 'Is the sort ascending or descending, boolean'
   * 	},
   * 	group: 'On which FACET should we group' // This is **OPTIONAL**
   * 	selectedFacets: 'An object with the selected facets', // This is **OPTIONAL**
   * 	previousData: 'An object chich contains the previous data' // This is **OPTIONAL**.
   * 							It will be used only when the action is triggered by a pagination action such as a scroll or a pagination.
   * 	service:{
   * 		scope: "function which launch the scope search"
   * 		unScope: "function whoch launch the unscoped search"
   * 	}
   * }
   * ```
   * @return {function} - The builded search action.
   */
  return function searchAction(options){
    options = options || {};

    ///////// COMMENT //////////
    // Could be nice to read all the info from the stores, so that no complex option needs to be passed to mutliple functions....

    let {scope, query} = options.criteria; //Cannot be read from the store ?
    if(scope === ALL){
      //Call the search action.
      options.service.scope(options);
    }else{
      //The component which call the serice should be know if it has all the data.
      if(options.previousData){ //Maybe rename pagination or something like that.
        config.service.unScope(options).then((response)=>{
            // Read the previous data from options.previous;
            return response;
        });
        //Read the totalCount

      }
      //The search is unscoped.


    }
  };
};
