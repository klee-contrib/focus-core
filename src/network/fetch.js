import { v4 as uuid } from 'uuid';
import merge from 'lodash/object/merge';

import dispatcher from '../dispatcher';
import { get as configGetter } from './config';
import ratelimiter from './rate-limiter';

let rateLimitedFetch = null;
/**
 * Proxy function for fetch
 * 
 * @param {any} url see fetch documentation
 * @param {any} reqOptions see fetch documentation
 * @returns {Promise} The promise of the execution of the HTTP request.
 */
function sendRequest(url, reqOptions) {
    return fetch(url, reqOptions);
}

/**
 * Get fetch function, with limited rate.
 * 
 * @returns {function} the rate limited function
 */
function getRateLimitedFetch() {
    if (!rateLimitedFetch) {
        const { rateLimiter: { burstNb, burstPeriod, cooldownNb, cooldownPeriod } } = configGetter();
        rateLimitedFetch = ratelimiter(sendRequest, burstNb, burstPeriod, cooldownNb, cooldownPeriod);
    }
    return rateLimitedFetch;
}

/**
* Update the request status.
* @param  {object} request - The request to treat.
* @return {object} - The request to dispatch.
*/
function updateRequestStatus(request) {
    if (!request || !request.id || !request.status) { return; }
    dispatcher.handleViewAction({
        data: { request: request },
        type: 'update'
    });
    return request;
}

/**
 * Extract the data from the response, and handle network or server errors or wrong data format.
 *
 * @param {Response} response the response to extract from
 * @param {string} dataType the datatype (can be 'arrayBuffer', 'blob', 'formData', 'json' or 'text')
 * @returns {Promise} a Promise containing response data, or error data
 */
function getResponseContent(response, dataType) {
    const { type, status, ok } = response;

    // Handling errors
    if (type === 'opaque') {
        console.error('You tried to make a Cross Domain Request with no-cors options');
        return Promise.reject({ status: status, globalErrors: ['error.noCorsOptsOnCors'] });
    }

    if (type === 'error') {
        console.error('An unknown network issue has happened');
        return Promise.reject({ status: status, globalErrors: ['error.unknownNetworkIssue'] });
    }

    if (!ok && dataType === 'json') {
        return response.json().catch(err => Promise.reject({ globalErrors: [err] })).then(data => Promise.reject({ status, ...data }));
    }

    if (!ok) {
        return response.text().then(text => Promise.reject({ status, globalErrors: [text] }));
    }

    // Handling success
    if (ok && status === '204') {
        return Promise.resolve(null);
    }
    return ['arrayBuffer', 'blob', 'formData', 'json'].includes(dataType) ? response[dataType]().catch(err => Promise.reject({ globalErrors: [err] })) : response.text();
}

/**
 *  Check if a special treatment is specify for a specific error code
 * 
 * @param {Object} response The fetch response
 * @param {Object} xhrErrors The specific treatment
 */
function checkErrors(response, xhrErrors) {
    let { status, ok } = response;
    if (!ok) {
        if (xhrErrors[status]) {
            xhrErrors[status](response);
        }
    }
}

/**
* Fetch function to ease http request.
* @param  {object} obj - method: http verb, url: http url, data:The json to save.
* @param  {object} optionsArg - The options object.
* @return {Promise} The promise of the execution of the HTTP request.
*/
function wrappingFetch({ url, method, data }, optionsArg) {
    let requestId = uuid();
    // Here we are using destruct to filter properties we do not want to give to fetch.
    // CORS and isCORS are useless legacy code, xhrErrors is used only in error parsing
    // eslint-disable-next-line no-unused-vars
    let { CORS, isCORS, xhrErrors, rateLimiter, ...config } = configGetter();
    const { noStringify, noRateLimiter, ...options } = optionsArg || {};
    const reqOptions = merge({ headers: {} }, config, options, { method, body: noStringify ? data : JSON.stringify(data) });
    //By default, add json content-type
    if (!reqOptions.noContentType && !reqOptions.headers['Content-Type']) {
        reqOptions.headers['Content-Type'] = 'application/json';
    }
    // Set the requesting as pending
    updateRequestStatus({ id: requestId, status: 'pending' });
    // Do the request
    const sendFunc = noRateLimiter || !rateLimiter.enableRateLimiter ? fetch : getRateLimitedFetch();

    return sendFunc(url, reqOptions)
        // Catch the possible TypeError from fetch
        .catch(error => {
            updateRequestStatus({ id: requestId, status: 'error' });
            return Promise.reject({ globalErrors: [error] });
        }).then(response => {
            updateRequestStatus({ id: requestId, status: response.ok ? 'success' : 'error' });
            const contentType = response.headers.get('content-type');
            return getResponseContent(response, reqOptions.dataType ? reqOptions.dataType : contentType && contentType.includes('application/json') ? 'json' : 'text');
        }).catch(data => {
            checkErrors(data, xhrErrors);
            return Promise.reject(data);
        });
}

export default wrappingFetch;
