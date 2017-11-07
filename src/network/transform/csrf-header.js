import { registerPreFetchTransform } from '../api-driver';

const COOKIE_TOKEN_NAME = 'XSRF-TOKEN';
const HEADER_TOKEN_NAME = 'X-XSRF-TOKEN';

/**
 * Utility method to extract a cookie value by its name
 * 
 * @param {string} name the cookie name 
 * @returns {string} the value of the cookie
 */
const getCookieByName = (name) => {
    const cookies = document.cookie.split('; ').reduce((acc, curr) => {
        const cookie = curr.split('=');
        acc[cookie[0]] = cookie[1];
        return acc;
    }, {});

    return cookies[name];
};

/**
 * Build an object with CSRF token as a header if it exists
 * 
 * @returns {object} an object with headers to add in request.
 */
const buildXsrfHeader = () => {
    const token = getCookieByName(COOKIE_TOKEN_NAME);
    const headers = {};

    if (token) {
        headers[HEADER_TOKEN_NAME] = token;
    }
    return headers;
};

/**
 * Register CSRF token header addition from cookie. 
 * 
 */
const register = () => {
    registerPreFetchTransform(({ urlData, data, options }) => {
        options = options || {};
        options.headers = { ...buildXsrfHeader(), ...options.headers };
        return { urlData, data, options }
    })
};

export default register;
export {
    getCookieByName,
    buildXsrfHeader
};