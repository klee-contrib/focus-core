//Dependencies.
import assign from 'object-assign';
import _builder from './builder';
import _parser from './parser';
import dispatcher from '../../dispatcher';
import { manageResponseErrors } from '../../network/error-parsing';


/**
* Search action generated from the config.
* @param  {object} config - Action configuration.
* @return {function} - The generated action from the congig.
*/
export default function loadActionFn(config) {
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
    * @param  {Boolean} isScroll - Is the action result from a scrolling.
    */
    return function listLoader(isScroll) {
        //Read search options from the accessor define in the config.
        // TODO: see if results should be named results.
        const {
            criteria,
            groupingKey, sortBy, sortAsc,
            dataList, totalCount
        } = config.getListOptions();

        //Number of element to search on each search.
        const nbElement = config.nbElement;
        //Process the query if empty.

        //Build URL data.
        const urlData = assign(
            _builder.pagination({ dataList, totalCount, isScroll, nbElement }),
            _builder.orderAndSort({ sortBy, sortAsc })
        );
        //Build body data.
        const postData = {
            criteria: criteria,
            group: groupingKey || ''
        };
        config.service({ urlData: urlData, data: postData })
            .then((response) => {
                return _parser(
                    response,
                    { isScroll, dataList }
                );
            })
            .then(_dispatchResult)
            .catch(_errorOnCall);
    };
};
