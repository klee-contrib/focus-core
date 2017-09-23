//Dependencies.
import CoreStore from '../CoreStore';
import buildDefinition from './definition';
/**
 * Class standing for the user store.
 */
class UserStore extends CoreStore {

    /**
     * Creates an instance of UserStore.
     * @param {any} conf store configuration
     * @memberof UserStore
     */
    constructor(conf) {
        conf = conf || {};
        conf.definition = conf.definition || buildDefinition();
        super(conf);
    }

}

export default UserStore;
