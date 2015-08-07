//Requirements

"use strict";

module.exports = function (data, context) {
    var dataList = data.dataList;
    var totalCount = data.totalCount;

    if (context.isScroll) {
        dataList = [].concat(context.dataList, data.dataList);
    }
    return {
        dataList: dataList,
        totalCount: totalCount
    };
};