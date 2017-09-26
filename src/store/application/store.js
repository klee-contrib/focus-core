import CoreStore from '../CoreStore';
import getDefinition from './definition';
/**
 * Class standing for the cartridge store.
 */
class ApplicationStore extends CoreStore {

    /**
     * Creates an instance of ApplicationStore.
     * @param {any} conf store configuration
     * @memberof ApplicationStore
     */
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
        const modeData = this.data.get('mode') || {};
        modeData[dataNode.newMode] = 1;
        modeData[dataNode.previousMode] = 0;
        this.data.set('mode', modeData);
        this.willEmit('mode:change');
    }
}

export default ApplicationStore;