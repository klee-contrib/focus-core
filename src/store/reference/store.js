//Dependencies.
import CoreStore from '../CoreStore';
import buildDefinition from './definition';
/**
 * Class standing for the reference store.
 */
class ReferenceStore extends CoreStore {

    /**
     * Creates an instance of ReferenceStore.
     * @param {any} conf store configuration
     * @memberof ReferenceStore
     */
    constructor(conf) {
        conf = conf || {};
        conf.definition = conf.definition || buildDefinition();
        super(conf);
    }

    /**
     * Get the reference list by this names.
     *
     * @param {any} names the reference lists names
     * @returns {object} an object with a reference key, containing the lists
     * @memberof ReferenceStore
     */
    getReference(names) {
        const refs = names.reduce((acc, name) => {
            if (this.data.has(name)) {
                acc[name] = this.data.get(name);
            }
            return acc;
        }, {});
        return { references: refs };
    }

    /**
     * Get all the reference lists.
     *
     * @returns {Object} an object with a reference key, containing the lists
     * @memberof ReferenceStore
     */
    getAllReference() {
        return { references: this.data.toJS() };
    }

    /**
     * Get a reference list by its name.
     *
     * @param {any} name the reference list name
     * @returns {Array} the list
     * @memberof ReferenceStore
     */
    getReferenceList(name) {
        return this.data.get(name, []);
    }

}

export default ReferenceStore;
