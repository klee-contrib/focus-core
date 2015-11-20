let keys = require('lodash/object/keys');
let _buildFacets = (facets) => {
    return keys(facets).map((selectedFacetKey) => {
        let selectedFacet = facets[selectedFacetKey];
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
let _buildOrderAndSort = (sortConf) => {
    return {
      sortFieldName: sortConf.sortBy,
      sortDesc: sortConf.sortAsc===undefined?false:!sortConf.sortAsc
    }
};



let _buildPagination = (opts) => {
    let resultsKeys = keys(opts.results);
    if(opts.isScroll && resultsKeys.length === 1){
      let key = resultsKeys[0];
      let previousRes = opts.results[key];
      if(previousRes.length < opts.totalCount){
        return {
          top: opts.nbSearchElement,
          skip: previousRes.length
        };
        //Else should not be called.
        console.warn('This should not happen.')
      };
    } else {
      return {
        skip: 0,
        top: opts.nbSearchElement || 0
      }
    }
};
module.exports = {
  pagination: _buildPagination,
  orderAndSort: _buildOrderAndSort,
  facets: _buildFacets
};
