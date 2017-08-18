import keys from 'lodash/object/keys';

/**
* Parse server search result to build facet results.
* @param  {array[object]} facets server side facets results
* @return {object} object with facets as properties
*
* expected facet format :
* ------------------------
* "facets": [
*     {
*        "FCT_MOVIE_TYPE": [
*        	  {"Long-métrage": 10493},
*            {"Télefilm": 1368},
*            {"Court-métrage": 779},
*            {"Moyen-métrage": 98},
*            {"Sérials": 2},
*            {"Film à sketches": 1}
*        ]
*     },
*     {
*       "FCT_MOVIE_TITLE": [
*            {"#": 132},
*            {"a-f": 3205},
*            {"g-m": 5147},
*            {"n-s": 2133},
*            {"t-z": 2124}
*       ]
*     }
* ]
*
*
* Returned format :
* -----------------
* {
* 	  FCT_MOVIE_TYPE: [
* 	  	{
* 	  		label: 'Long-métrage',
*      		count: 52
* 	     }, {
*        	label: 'court-métrage',
* 	  	    count: 12
* 	     }
*    ],
*    FCT_MOVIE_YEAR: [
*    	 {
*    	 	label: '1990-2000',
*    	 	count: 8
*    	 }
*    ]
* }
*
*/
const _parseFacets = (serverFacets) => {
    return keys(serverFacets).reduce((formattedFacets, serverFacetKey) => {
        //read facet keys
        const serverFacet = serverFacets[serverFacetKey];
        const serverFacetPopertyNames = keys(serverFacet);
        const facetName = serverFacetPopertyNames[0];
        const serverFacetData = serverFacet[facetName];
        formattedFacets[facetName] = keys(serverFacetData).reduce((facetData, serverFacetItemKey) => {
            //read facet values
            const serverFacetItem = serverFacetData[serverFacetItemKey];
            const serverFacetItemPopertyNames = keys(serverFacetItem);
            const facetItemName = serverFacetItemPopertyNames[0];
            const facetItemValue = serverFacetItem[facetItemName];
            // The facet content is now an array instead of an object to preserve sorting.
            facetData.push({
                label: facetItemName,
                count: facetItemValue
            });
            return facetData;
        }, []);
        return formattedFacets;
    }, {});
};


const _parseUnscopedResponse = (data) => {
    return ({
        results: data.groups,
        facets: _parseFacets(data.facets),
        totalCount: data.totalCount
    });
};


const _parseScopedResponse = (data, context) => {
    //Scroll can only happen when there is an ungroupSearch
    if (context.isScroll) {
        let resultsKeys = keys(context.results);
        let key = resultsKeys[0];
        //Concat previous data with incoming data.
        data.list = [...context.results[key], ...data.list];
    }
    return ({
        results: data.groups || { [context.scope]: data.list },
        facets: _parseFacets(data.facets),
        totalCount: data.totalCount
    });
};

export default {
    unscopedResponse: _parseUnscopedResponse,
    scopedResponse: _parseScopedResponse
};

export {
    _parseUnscopedResponse as unscopedResponse,
    _parseScopedResponse as scopedResponse
};