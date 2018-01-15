//Dependencies.
import CoreStore from '../CoreStore';
import buildDefinition from './definition';
/**
 * Class standing for the user store.
 */
class UserStore extends CoreStore {
    constructor(conf) {
        conf = conf || {};
        conf.definition = conf.definition || buildDefinition();
        super(conf);
    }

}

export default UserStore;
