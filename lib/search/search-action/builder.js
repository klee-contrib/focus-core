'use strict';

var keys = require('lodash/object/keys');
var _buildFacets = function _buildFacets(facets) {
  return keys(facets).map(function (selectedFacetKey) {
    var selectedFacet = facets[selectedFacetKey];
    return {
      key: selectedFacetKey,
      value: selectedFacet.key
    };
  });
};

/**
 * Build sort infotmation.
 * @param  {object} sortConf - The sort configuration.
 * @return {object} - The builded sort configuration.
 */
var _buildOrderAndSort = function _buildOrderAndSort(sortConf) {
  return {
    sortFieldName: sortConf.sortBy,
    sortDesc: !sortConf.sortAsc
  };
};

var _buildPagination = function _buildPagination(opts) {
  var resultsKeys = keys(opts.results);
  if (opts.isScroll && resultsKeys.length === 1) {
    var key = resultsKeys[0];
    var previousRes = opts.results[key];
    if (previousRes.length < opts.totalCount) {
      return {
        top: opts.nbSearchElement,
        skip: previousRes.length
      };
      //Else should not be called.
      console.warn('This should not happen.');
    };
  } else {
    return {
      skip: 0,
      top: opts.nbSearchElement || 0
    };
  }
};
module.exports = {
  pagination: _buildPagination,
  orderAndSort: _buildOrderAndSort,
  facets: _buildFacets
};