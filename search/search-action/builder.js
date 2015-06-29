let _buildFacets = (facets) => {
    return keys(facets).map((selectedFacetKey) => {
        let selectedFacet = facets[selectedFacetKey];
        return {
            key: selectedFacetKey,
            value: selectedFacet.key
        };
    });
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

let _buildPagination = (pageInfos) => {
    return {
        page: pageInfos.page || 0,
        skip: pageInfos.skip || 0
    };
};
module.exports = {
  pagination: _buildPagination,
  orderAndSort: _buildOrderAndSort
};
