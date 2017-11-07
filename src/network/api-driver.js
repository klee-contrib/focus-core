import entries from 'lodash/object/pairs';
import isArray from 'lodash/lang/isArray';
import isObject from 'lodash/lang/isObject';

import fetch from './fetch';
import urlBuilder from '../util/url/builder';
import rename from '../util/function/rename';

const defaultMethod = 'GET';

const preFetchActions = [];
const postFetchActions = [];


/**
 * Utility function, to build a query string from an object
 * 
 * @param {object} obj the object to serialize in a query string
 * @param {string} [prefix=''] the name of the object in the query string
 * @returns {string} the built query string
 */
const buildQueryString = (obj, prefix = '') => {
    let queryString = '';
    if (isObject(obj)) {
        queryString = entries(obj).reduce((acc, [key, value]) => {
            return acc + (acc && acc !== '' && !acc.endsWith('&') ? '&' : '') + buildQueryString(value, prefix !== '' ? prefix + '.' + key : key);
        }, '');
    } else if (prefix && prefix !== '') {
        queryString = prefix + '=' + encodeURIComponent(obj);
    }
    return queryString;
};

/**
 * Utility method that ensure that data passed in the url is properly encoded
 * 
 * @param {any} urlData the data to pass in the url
 * @returns {any} the data properly encoded
 */
const urlDataObjectBuilder = (urlData) => {
    let escapedUrlData = {};
    let propData = {};
    for (let prop in urlData) {
        propData = urlData[prop];

        if (isArray(propData)) {
            escapedUrlData[prop] = propData.map(urlDataObjectBuilder);
        } else if (isObject(propData)) {
            escapedUrlData[prop] = urlDataObjectBuilder(propData);
        } else {
            escapedUrlData[prop] = encodeURIComponent(propData);
        }
    }

    return escapedUrlData;
};

/**
 * Register a function to transform data before giving it to. It can be to add headers, etc.
 * The function must take one argument, an object {urlData, data, options} and return an object of the same format.
 * All registered functions are called sequentially on data.    
 *
 * @param {function} action a function to transform an object to another object of the same format
 */
const registerPreFetchTransform = (action) => {
    if (!action || typeof (action) !== 'function') {
        throw new Error('A transform action must be a function');
    }
    preFetchActions.push(action);
};

/**
 * Register a function to transform data after the fetch return.
 * The function must take one argument, an object {data, options} and return an object of the same format.
 * All registered functions are called sequentially on data.    
 *
 * @param {function} action a function to transform an object to another object of the same format
 */
const registerPostFetchTransform = (action) => {
    if (!action || typeof (action) !== 'function') {
        throw new Error('A transform action must be a function');
    }
    postFetchActions.push(action);
};

/**
 * Private function, to simplify call to fetch.
 *
 * @param {function} urlFunc the result of the call to urlBuilder.
 * @param {object} urlData data to provide in the url
 * @param {object} bodyData data to provide in the body of the request
 * @param {object} options options for fetch
 * @returns {any} the result of the fetch call
 */
const fetchCall = (urlFunc, urlData, bodyData, options) => (
    fetch(
        urlFunc({
            urlData: urlDataObjectBuilder(urlData || {}),
            data: bodyData
        }), options
    )
);
/* eslint-disable valid-jsdoc */
/**
 * Build api driver method, from url, method and function name.
 *
 * @param {object} { url, method = defaultMethod } object containing url and method
 * @param {string} funcName name to give to the function
 * @returns {function} the built function
 */
const buildApiDriverMethod = ({ url, method = defaultMethod }, funcName) => {
    /* eslint-disable require-jsdoc */
    const toRename = (urlData, data, optionsArg) => {
        const options = optionsArg || {};
        const transformed = preFetchActions.reduce((data, func) => (func(data)), { urlData, data, options });
        return fetchCall(
            urlBuilder(url + (options.queryObj ? '?' + buildQueryString(options.queryObj) : ''), method),
            transformed.urlData,
            transformed.data,
            transformed.options
        ).then((dataResult) => {
            return postFetchActions.reduce((data, func) => {
                return func(data, options);
            }, dataResult)
        });
    }
    rename(toRename, funcName);
    return toRename;
};
/* eslint-enable */

/**
 * Function, to build API driver, so easy call can be made in service.
 *
 * @param {object} urls an object containing for each key an url and a method, like { getById : { url: 'api/test/action/', method: 'GET' } }
 * @returns {object} an object, with properties named as the config given, like a DAO or DAL (myDriver.loadMyObject({id:myId}), or myDriver.saveMyObject(null, toSave)).
 */
const apiDriverBuilder = (urls) => {
    if (!urls || typeof urls !== 'object') {
        throw new Error('The config given to api driver must be an object, like { getById : { url: \'api/test/action/\', method: \'GET\' } }, instead got :' + urls);
    }
    return entries(urls)
        .map(([prop, url]) => {
            if (!url || !url.url || typeof url.url !== 'string') {
                throw new Error(`${prop} does not contain an url for property url, instead got : ` + url);
            }
            return [prop, url];
        })
        .reduce((apiDriver, [prop, url]) => {
            apiDriver[prop] = buildApiDriverMethod(url, prop);
            return apiDriver;
        }, {});
}

export default apiDriverBuilder;
export { registerPreFetchTransform, registerPostFetchTransform };