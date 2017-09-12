//Dependencies.
import CoreStore from '../CoreStore';
import getDefinition from './definition';
import Immutable from 'immutable';
/**
 * Class standing for the cartridge store.
 */
class ApplicationStore extends CoreStore {
    constructor(conf) {
        conf = conf || {};
        conf.definition = conf.definition || getDefinition();
        super(conf);
    }
    /**
     * Update the mode value.
     * @param  {object} dataNode - The value of the data.
     */
    updateMode(dataNode) {
        const modeData = (this.data.has('mode') ? this.data.get('mode') : Immutable.fromJS({}))
            .set(dataNode.newMode, 1)
            .set(dataNode.previousMode, 0);
        this.data = this.data.set('mode', modeData);
        this.willEmit('mode:change');
    }
}

export default ApplicationStore;