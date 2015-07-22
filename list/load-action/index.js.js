//Dependencies.
let assign = require('object-assign');
let _builder = require('./builder');
let _parser = require('./parser');
const ALL = 'ALL';
const STAR = '*';


/**
* Search action generated from the config.
* @param  {object} config - Action configuration.
* @return {function} - The generated action from the congig.
*/
module.exports = function(config){
    /**
    * Dispatch the results on the search store
    * @param  {object} data - The data to dispatch.
    */
    let _dispatchResult = (data) => {
        Focus.dispatcher.handleServerAction({
            data,
            type: 'update',
            identifier: config.identifier
        });
    };

    /**
    * Build search action.
    * @param  {Boolean} isScroll - Is the action result from a scrolling.
    */
    return function searchAction(isScroll){
        //Read search options from the accessor define in the config.
        // TODO: see if results should be named results.
        let {
            criteria,
            groupingKey, sortBy, sortAsc,
            results, totalCount
        } = config.getSearchOptions();

        //Number of element to search on each search.
        let nbSearchElement = config.nbSearchElement;
        //Process the query if empty.
        if(!query || query === ''){
            query = STAR;
        }
        //Build URL data.
        let urlData = assign(
            _builder.pagination({results, totalCount, isScroll, nbSearchElement}),
            _builder.orderAndSort({sortBy, sortAsc})
        );
        //Build body data.
        let postData = {
            criteria: {scope, query},
            facets: selectedFacets ? _builder.facets(selectedFacets) : [],
            group: groupingKey || ''
        };
        //Different call depending on the scope.
        if(scope === ALL){
            //Call the search action.
            config.service.unscoped({urlData: urlData, data: postData})
            .then(_parser.unscopedResponse)
            .then(_dispatchResult);
        }else{
            //The component which call the serice should be know if it has all the data.
            config.service.scoped({urlData: urlData, data: postData})
            .then((response)=>{
                return _parser.scopedResponse(
                    response,
                    {isScroll, scope, results}
                );
            }).then(_dispatchResult);
        }
    };
};
