import keys from 'lodash/object/keys';
import mapValues from 'lodash/object/mapValues';

/**
 * Build facets for server expected format.
 *
 * Expected format :
 * -----------------
 * {
 * 	  "criteria": "*",
 *   "facets": {FCT_MOVIE_TYPE: "Télefilm", FCT_MOVIE_TITLE: "g-m"}
 * }
 *
 *
 * @param  {[type]} facets [description]
 * @return {[type]}        [description]
 */
const _buildFacets = facets => {
    return mapValues(facets, facetData => {
        return facetData.key;
    });
};

/**
 * Build sort infotmation.
 * @param  {object} sortConf - The sort configuration.
 * @return {object} - The builded sort configuration.
 */
const _buildOrderAndSort = sortConf => {
    return {
        sortFieldName: sortConf.sortBy,
        sortDesc: sortConf.sortAsc === undefined ? false : !sortConf.sortAsc
    }
};


const _buildPagination = opts => {
    const resultsKeys = keys(opts.results);
    if (opts.isScroll && resultsKeys.length === 1) {
        const key = resultsKeys[0];
        const previousRes = opts.results[key];
        if (previousRes.length < opts.totalCount) {
            return {
                top: opts.nbSearchElement,
                skip: previousRes.length
            };
        } else {
            //Else should not be called.
            console.warn('This should not happen.')
        }
    } else {
        return {
            skip: 0,
            top: opts.nbSearchElement || 0
        }
    }
};

export {
    _buildPagination as pagination,
    _buildOrderAndSort as orderAndSort,
    _buildFacets as facets
};

export default {
    pagination: _buildPagination,
    orderAndSort: _buildOrderAndSort,
    facets: _buildFacets
};