//Dependencies.
let assign = require('object-assign');
let _builder = require('./builder');
let _parser = require('./parser');
const dispatcher = require('../../dispatcher');
/**
* Search action generated from the config.
* @param  {object} config - Action configuration.
* @return {function} - The generated action from the congig.
*/
module.exports = function loadActionFn(config){
    /**
    * Dispatch the results on the search store
    * @param  {object} data - The data to dispatch.
    */
    let _dispatchResult = (data) => {
        dispatcher.handleServerAction({
            data,
            type: 'update',
            identifier: config.identifier
        });
    };

    /**
    * Build search action.
    * @param  {Boolean} isScroll - Is the action result from a scrolling.
    */
    return function listLoader(isScroll){
        //Read search options from the accessor define in the config.
        // TODO: see if results should be named results.
        let {
            criteria,
            groupingKey, sortBy, sortAsc,
            dataList, totalCount
        } = config.getListOptions();

        //Number of element to search on each search.
        let nbElement = config.nbElement;
        //Process the query if empty.

        //Build URL data.
        let urlData = assign(
            _builder.pagination({dataList, totalCount, isScroll, nbElement}),
            _builder.orderAndSort({sortBy, sortAsc})
        );
        //Build body data.
        let postData = {
            criteria: criteria,
            group: groupingKey || ''
        };
        config.service({urlData: urlData, data: postData})
        .then((response)=>{
            return _parser(
                    response,
                    {isScroll, dataList}
                );
        })
        .then(_dispatchResult);
    };
};
