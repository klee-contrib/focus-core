//Requirements

const keys = require('lodash/object/keys');
const isObject = require('lodash/lang/isObject');

let _parseFacets = (facets) => {
    return keys(facets).reduce((formattedFacets, serverFacetKey) => {
        let serverFacetData = facets[serverFacetKey];
        formattedFacets[serverFacetKey] = keys(serverFacetData).reduce((facetData, serverFacetItemKey) => {
            let serverFacetItemValue = serverFacetData[serverFacetItemKey];
            
            /* Case {key: count}*/
            let key = serverFacetItemKey;
            let label = serverFacetItemKey;
            let count = serverFacetItemValue;
            if(isObject(serverFacetItemValue) && serverFacetItemValue.hasOwnProperty('label')){
                /* Case {key: {label: label, count: count}}*/
                ({label, count} = serverFacetItemValue);
            }			
            facetData[key] = {
                label,
                count
            };
            return facetData;
        }, {});
        return formattedFacets;
    }, {});
};
let _parseUnscopedResponse = (data) => {
    return ({
        results: data.groups,
        facets: _parseFacets(data.facets),
        totalCount: data.totalCount
    });
};

let _parseScopedResponse = (data, context) => {
    //Scroll can only happen when there is an ungroupSearch
    if(context.isScroll){
      let resultsKeys = keys(context.results);
      let key = resultsKeys[0];
      //Concat previous data with incoming data.
      data.list = [...context.results[key], ...data.list];
    }
    return ({
        results: data.groups || {[context.scope]: data.list},
        facets: _parseFacets(data.facets),
        totalCount: data.totalCount
    });
};
module.exports = {
  unscopedResponse: _parseUnscopedResponse,
  scopedResponse: _parseScopedResponse
};
