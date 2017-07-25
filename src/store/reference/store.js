//Dependencies.
import CoreStore from '../CoreStore';
import buildDefinition from './definition';
/**
 * Class standing for the reference store.
 */
class ReferenceStore extends CoreStore {

    constructor(conf) {
        conf = conf || {};
        conf.definition = conf.definition || buildDefinition();
        super(conf);
    }

    getReference(names) {
        const refs = names.reduce((acc, name) => {
            if (this.data.has(name)) {
                acc[name] = this.data.get(name);
            }
            return acc;
        }, {});
        return { references: refs };
    }

    getAllReference() {
        return { references: this.data.toJS() };
    }

    getReferenceList(name) {
        return this.data.get(name, []);
    }

    setReference() { }

}

export default ReferenceStore;
