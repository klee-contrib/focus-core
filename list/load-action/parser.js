//Requirements

module.exports = (data, context) => {
    let {dataList, totalCount} = data;
    if(context.isScroll){
        dataList = [...context.dataList, ...data.dataList];
    }
    return ({
        dataList: dataList,
        totalCount: totalCount
    });
};
