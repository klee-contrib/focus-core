//Requirements

'use strict';

var keys = require('lodash/object/keys');

var _parseFacets = function _parseFacets(facets) {
    return keys(facets).reduce(function (formattedFacets, serverFacetKey) {
        var serverFacetData = facets[serverFacetKey];
        formattedFacets[serverFacetKey] = keys(serverFacetData).reduce(function (facetData, serverFacetItemKey) {
            var serverFacetItemValue = serverFacetData[serverFacetItemKey];
            facetData[serverFacetItemKey] = {
                label: serverFacetItemKey,
                count: serverFacetItemValue
            };
            return facetData;
        }, {});
        return formattedFacets;
    }, {});
};
var _parseUnscopedResponse = function _parseUnscopedResponse(data) {
    return {
        results: data.groups,
        facets: _parseFacets(data.facets),
        totalCount: data.totalCount
    };
};

var _parseScopedResponse = function _parseScopedResponse(data, context) {
    var _ref;

    //Scroll can only happen when there is an ungroupSearch
    if (context.isScroll) {
        var resultsKeys = keys(context.results);
        var key = resultsKeys[0];
        //Concat previous data with incoming data.
        data.list = [].concat(context.results[key], data.list);
    }
    return {
        results: data.groups || (_ref = {}, _ref[context.scope] = data.list, _ref),
        facets: _parseFacets(data.facets),
        totalCount: data.totalCount
    };
};
module.exports = {
    unscopedResponse: _parseUnscopedResponse,
    scopedResponse: _parseScopedResponse
};