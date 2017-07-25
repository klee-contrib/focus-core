import { loadMany as loadManyReferenceList } from './builder';
import dispatcher from '../dispatcher';

/**
 * Focus reference action.
 * @param {array} referenceNames - An array which contains the name of all the references to load.
 * @returns {Promise} - The promise of loading all the references.
 */
function builtInReferenceAction(referenceNames, skipCache = false) {
    return () => {
        if (!referenceNames) {
            return undefined;
        }
        return Promise.all(loadManyReferenceList(referenceNames, skipCache))
            .then(function successReferenceLoading(data) {
                //Rebuilt a constructed information from the map.
                const reconstructedData = data.reduce((acc, item) => { acc[item.name] = item.dataList; return acc; }, {})
                dispatcher.handleViewAction({ data: reconstructedData, type: 'update', subject: 'reference' });
            }, function errorReferenceLoading(err) {
                dispatcher.handleViewAction({ data: err, type: 'error' });
            });
    };
}

export default builtInReferenceAction;
