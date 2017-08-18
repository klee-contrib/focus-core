import isArray from 'lodash/lang/isArray';
/**
 * Build sort infotmation.
 * @param  {object} sortConf - The sort configuration.
 * @return {object} - The builded sort configuration.
 */
function orderAndSort(sortConf) {
    return {
        sortFieldName: sortConf.sortBy,
        sortDesc: sortConf.sortAsc === undefined ? false : !sortConf.sortAsc
    };
}

/**
 * Build the pagination configuration given the options.
 * @param  {object} opts - The pagination options should be :
 *   isScroll (:bool) - Are we in a scroll context.
 *   totalCount (:number) - The total number of element. (intresting only in the scroll case)
 *   nbSearchElement (:number) - The number of elements you want to get back from the search.
 * @return {object} - An object with {top, skip}.
 */
function pagination(opts) {
    let { isScroll, dataList, totalCount, nbElement } = opts;
    if (isScroll) {
        if (!isArray(dataList)) {
            throw new Error('The data list options sould exist and be an array')
        }
        if (dataList.length < totalCount) {
            return { top: nbElement, skip: dataList.length };
        }
    }
    return {
        top: nbElement,
        skip: 0
    }
}

export {
    pagination,
    orderAndSort
};
export default {
    pagination,
    orderAndSort
};