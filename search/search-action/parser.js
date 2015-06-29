let keys = require('lodash/object/keys');
let _parsePageInfos = (data, context) => {
    return {
        currentPage: context.page,
        perPage: 50,
        totalCount: data.totalCount
    };
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
let _parseUnscopedResponse = (data) => {
    return ({
        map: data.groups,
        facet: _parseFacets(data.facets)
    });
};

let _parseScopedResponse = (data, context) => {
    return ({
        map: data.groups || {[context.scope]: data.list},
        facet: _parseFacets(data.facets)
    });
};
module.exports = {
  unscopedResponse: _parseUnscopedResponse,
  scopedResponse: _parseScopedResponse
};
