import CoreStore from '../CoreStore';
/**
 * Store definition.
 * @type {Object}
 */
const DEFINITION = {
    criteria: 'criteria',
    groupingKey: 'groupingKey',
    sortBy: 'sortBy',
    sortAsc: 'sortAsc',
    dataList: 'dataList',
    totalCount: 'totalCount'
};

/**
 * Class standing for all list information.
 * The list has almost the same data as the search store but instead of the facets, it can have a .
 */
class ListStore extends CoreStore {
    constructor(conf) {
        conf = conf || {};
        if (!conf.identifier) {
            throw new Error(
                `
            The identifier is necessary, maybe it should be the name of the entity which is in the List.
            Your code should look like let myListStore = new ListStore({identifier: 'myEntityList'}) or something like that.
           `
            );
        }
        conf.definition = DEFINITION;
        super(conf);
    }
}
export default ListStore;
