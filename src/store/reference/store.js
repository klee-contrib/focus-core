//Dependencies.
import CoreStore from '../CoreStore'
import buildDefinition from './definition'

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
        let refs = {};
        names.map((name) => {
            if(this.data.has(name)) {
                refs[name] = this.data.get(name);
            }
        });
        return {references: this.data.toJS()};
    }
    setReference() {}

}
export default ReferenceStore;
