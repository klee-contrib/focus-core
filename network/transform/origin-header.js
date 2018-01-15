import { registerPreFetchTransform } from '../api-driver';

/**
 * Register adding ORIGIN_URL_APP header, with url from the page the service was called from. 
 */
const register = () => {
    registerPreFetchTransform(({ urlData, data, options }) => {
        options = options || {};
        options.headers = { ORIGIN_URL_APP: location.href, ...options.headers };
        return { urlData, data, options }
    })
};

export default register;