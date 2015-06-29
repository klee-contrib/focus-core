let keys = require('lodash/object/keys');
let _parsePageInfos = (data, context) => {
    return {
        currentPage: context.page,
        perPage: 50,
        totalRecords: data.totalCount
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
module.exports = {
  parseUnscopedResponse: _parseUnscopedResponse,
  parseScopedResponse: _parseScopedResponse
};
