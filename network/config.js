import merge from 'lodash/object/merge';
import isObject from 'lodash/lang/isObject';
import clone from 'lodash/lang/cloneDeep';

/**
 * Configuration object. Except for xhrErrors, see https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/fetch
 */
let configuration = {
    xhrErrors: {},
    mode: 'cors', //cors, no-cors, same-origin
    credentials: 'same-origin', //omit, same-origin, include
    cache: 'no-cache', //default, no-store, reload, no-cache, force-cache, ou only-if-cached.
    redirect: 'follow' // follow, manual, error
};

/**
 * Function which overrides the configuration.
 * @param {object} conf configuration to merge with existing conf
 */
function configure(conf) {
    if (!isObject(conf)) {
        throw new Error('Network configuration should be an object')
    }
    merge(configuration, conf);
}

/**
 * Getter on the configuration, returning a clone of the configuration.
 *
 * @returns {object} a copy of the current configuration
 */
function get() {
    return clone(configuration);
}

export {
    configure,
    get
};

export default {
    configure,
    get
};
