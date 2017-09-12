//Requirements

export default (data, context) => {
    let { dataList, totalCount, ...otherProps } = data;
    if (context.isScroll) {
        dataList = [...context.dataList, ...data.dataList];
    }
    if ((dataList.length === 0) && (totalCount > 0)) {
        throw new Error('totalCount must be equal to zero when no data are returned!!');
    }
    return ({
        dataList: dataList,
        totalCount: totalCount,
        ...otherProps
    });
};
