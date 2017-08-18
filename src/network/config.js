import merge from 'lodash/object/merge';
import isObject from 'lodash/lang/isObject';
import clone from 'lodash/lang/clone';

/**
 * Configuration object.
 * @type {{CORS: boolean}}
 */
let configuration = {
    CORS: true,
    xhrErrors: {}
};

/**
 * Function which overrides the configuration.
 * @param conf
 */
function configure(conf) {
    if (isObject(conf)) {
        merge(configuration, conf);
    }

}


module.exports = {
    configure: configure,
    get() {
        return clone(configuration);
    }
};
