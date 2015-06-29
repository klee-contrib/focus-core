//Requirements
let keys = require('lodash/object/keys');

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
let _parseUnscopedResponse = (data) => {
    return ({
        groups: data.groups,
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
        groups: data.groups || {[context.scope]: data.list},
        facets: _parseFacets(data.facets),
        totalCount: data.totalCount
    });
};
module.exports = {
  unscopedResponse: _parseUnscopedResponse,
  scopedResponse: _parseScopedResponse
};
