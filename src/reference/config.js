import CloningMap from '../store/cloning-map';
import checkIsObject from '../util/object/check';
import checkIsString from '../util/string/check';

const config = new CloningMap();

let cacheDuration = 1000 * 60;

/**
 * Sets the cache duration (defaults to 1 min).
 *
 * @param {number} newDuration new cache duration
 */
function setCacheDuration(newDuration) {
    cacheDuration = newDuration;
}

/**
 * Gets the cache duration.
 *
 * @returns {number} the cache duration
 */
function getCacheDuration() {
    return cacheDuration;
}

/**
 * Set the reference configuration.
 * @param {object}  newConf         - The new configuration to set.
 * @param {Boolean} isClearPrevious - Does the config should be reset.
 */
function setConfig(newConf, isClearPrevious) {
    checkIsObject(newConf);
    if (isClearPrevious) {
        config.clear();
    }
    config.merge(newConf);
}

/**
 * Get a configuration copy.
 * @returns {object} - A copy of the configuration.
 */
function getConfig() {
    return config.toJS();
}

/**
 * Get an element from the configuration using its name.
 * @param {string} name - The key identifier of the configuration.
 * @returns {object} - The configuration of the list element.
 */
function getConfigElement(name) {
    checkIsString('name', name);
    return config.get(name);
}

export {
    getConfig as get,
    getConfigElement as getElement,
    setConfig as set,
    getCacheDuration,
    setCacheDuration
};

export default {
    get: getConfig,
    getElement: getConfigElement,
    set: setConfig,
    getCacheDuration,
    setCacheDuration

};
