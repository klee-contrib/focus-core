import { isObject, clone, merge } from 'lodash';

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