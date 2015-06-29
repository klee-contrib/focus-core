//Dependencies.
let assign = require('object-assign');
let _builder = require('./builder');
let _parser = require('./parser');
const ALL = 'ALL';




let _dispatchResult = (data) => {
    Focus.dispatcher.handleServerAction({
        data,
        type: 'update'
    });
};

module.exports = function(config){
  /**
   * Builded search action.
   * @param  {object} options - The options used to build the service, it should have the following structure:
   * ```javascript
   * {
   * 	criteria:{
   * 		query: 'The query typed by the user'
   * 		scope: 'The selected scope'
   * 	},
   * 	pageInfos: { //All this informations will be use to transform the data given the query, this will be passed into the URL.
   * 		page: 'The wanted page',
   * 		skip: 'Number of results to skip',
   * 		sortBy: 'The information on wich the data is sorted', // This is **OPTIONAL**
   * 		sortAsc: 'Is the sort ascending or descending, boolean'
   * 	},
   * 	group: 'On which FACET should we group' // This is **OPTIONAL**
   * 	selectedFacets: 'An object with the selected facets', // This is **OPTIONAL**
   * 	previousData: 'An object chich contains the previous data' // This is **OPTIONAL**.
   * 							It will be used only when the action is triggered by a pagination action such as a scroll or a pagination.
   * 	service:{
   * 		scope: "function which launch the scope search"
   * 		unScope: "function whoch launch the unscoped search"
   * 	}
   * }
   * ```
   * @return {function} - The builded search action.
   */
  return function searchAction(isScroll){
    let {
      scope,
      query,
      selectedFacets,
      groupingKey,
      sortBy,
      sortAsc,
      results,
      totalCount
      } = config.getSearchOptions();
    let nbSearchElement = config.nbSearchElement;
    if(query === ''){
      query = '*';
    }
    let urlData = assign(
      _builder.pagination({results, totalCount, isScroll, nbSearchElement}),
      _builder.orderAndSort({sortBy, sortAsc})
    );
    let postData = {
      criteria: {scope, query},
      facets: selectedFacets ? _builder.facets(selectedFacets) : [],
      group: groupingKey
    };
    if(scope === ALL){
      //Call the search action.
      config.service.unscope({urlData: urlData, data: postData})
                    .then(_parser.unscopedResponse)
                    .then(_dispatchResult);
    }else{
      //The component which call the serice should be know if it has all the data.
        config.service.scope({urlData: urlData, data: postData})
                      .then((response)=>{
                          return _parser.scopedResponse(response, {isScroll, scope, results});
                      }).then(_dispatchResult);
    }
  };
};
