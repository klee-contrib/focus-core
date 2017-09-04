//Dependencies.
import assign from 'object-assign';
import isObject from 'lodash/lang/isObject';
import _builder from './builder';
import _parser from './parser';
import dispatcher from '../../dispatcher';
import { manageResponseErrors } from '../../network/error-parsing';
import isString from 'lodash/lang/isString';

const ALL = 'ALL';
const STAR = '*';

/**
* Search action generated from the config.
* @param  {object} config - Action configuration.
* @return {function} - The generated action from the congig.
*/
export default function searchActionBuilder(config) {
    /**
    * Dispatch the results on the search store
    * @param  {object} data - The data to dispatch.
    */
    const _dispatchResult = (data) => {
        dispatcher.handleServerAction({
            data,
            type: 'update',
            identifier: config.identifier
        });
    };
    const parser = config.parser && isObject(config.parser) ? { ..._parser, ...config.parser } : _parser;
    /**
    * Method call when there is an error.
    * @param  {object} config -  The action builder configuration.
    * @param  {object} err    - The error from the API call.
    * @return {object}     - The data from the manageResponseErrors function.
    */
    function _errorOnCall(err) {
        manageResponseErrors(err, config);
        //_dispatchGlobalError shoud be separated.
    }


    /**
    * Build search action.
    *
    * Expected server data format :
    * -----------------------------
    * {
    * 	"criteria": "*",
    *  	"facets": {FCT_MOVIE_TYPE: "Télefilm", FCT_MOVIE_TITLE: "g-m"}
    * }
    *
    * @param  {Boolean} isScroll - Is the action result from a scrolling.
    */
    return function searchAction(isScroll) {
        //Read search options from the accessor define in the config.
        let {
            scope, query, selectedFacets,
            groupingKey, sortBy, sortAsc,
            results, totalCount,
            ...otherProps
        } = config.getSearchOptions();

        //Number of element to search on each search.
        const nbSearchElement = config.nbSearchElement;
        //Process the query if empty.
        if (!query || '' === query) {
            query = STAR;
        }
        //Build URL data.
        const urlData = assign(
            _builder.pagination({ results, totalCount, isScroll, nbSearchElement }),
            _builder.orderAndSort({ sortBy, sortAsc })
        );
        //Build body data.
        const postData = {
            ...otherProps,
            criteria: { query, scope },
            facets: selectedFacets ? _builder.facets(selectedFacets) : {},
            group: groupingKey || ''
        };
        //Different call depending on the scope.
        if (isString(scope) && scope.toUpperCase() === ALL) {
            //Call the search action.
            config.service.unscoped({ urlData: urlData, data: postData })
                .then(parser.unscopedResponse)
                .then(_dispatchResult)
                .catch(_errorOnCall);
        } else {
            //The component which call the serice should be know if it has all the data.
            config.service.scoped({ urlData: urlData, data: postData })
                .then((response) => {
                    return parser.scopedResponse(
                        response,
                        { isScroll, scope, results }
                    );
                })
                .then(_dispatchResult)
                .catch(_errorOnCall);
        }
    };
}
