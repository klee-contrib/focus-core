/*global Promise,  _*/


/* Filename: helpers/reference_helper.js  */
//Dependency gestion depending on the fact that we are in the browser or in node.
import fetch from '../network/fetch';
import checkIsString from '../util/string/check';

//Container for the list and
import { getElement, getCacheDuration } from './config';

let cache = {};
const promiseWaiting = [];

function _deletePromiseWaiting(name) {
    const indexPrm = promiseWaiting.indexOf(name);
    if (indexPrm !== -1) {
        promiseWaiting.splice(indexPrm, 1);
    }
}

function _getTimeStamp() {
    return new Date().getTime();
}
/*
* Serve the data from the cache.
*/
function _cacheData(key, value) {
    cache[key] = { timeStamp: _getTimeStamp(), value: value };
    _deletePromiseWaiting(key);
    return value;
}

/**
* Load a list from its description
* @param {object} listDesc - Description of the list to load
* @returns {Promise} - A promise of the loading.
* @example - refHelper.loadList({url: "http://localhost:8080/api/list/1"}).then(console.log,console.error);
*/
function loadList(listDesc) {
    return fetch({ url: listDesc.url, method: 'GET' });
}

// Load a reference with its list name.
// It calls the service which must have been registered.
/**
* Load a list by name.
* @param {string} listName - The name of the list to load.
* @param {object} args     - Argument to provide to the function.
*/
function loadListByName(listName, args, skipCache = false) {
    checkIsString('listName', listName);
    const configurationElement = getElement(listName);
    if (typeof configurationElement !== 'function') {
        throw new Error(`You are trying to load the reference list: ${listName} which does not have a list configure.`);
    }
    let now = _getTimeStamp();
    if (cache[listName] && (now - cache[listName].timeStamp) < getCacheDuration() && !skipCache) {
        _deletePromiseWaiting(listName);
        //console.info('data served from cache', listName, cache[listName].value);
        return Promise.resolve(cache[listName].value);
    }
    //Call the service, the service must return a promise.
    return configurationElement(args)
        .then((data) => {
            return _cacheData(listName, data)
        });
}

//Load many lists by their names. `refHelper.loadMany(['list1', 'list2']).then(success, error)`
// Return an array of many promises for all the given lists.
// Be carefull, if there is a problem for one list, the error callback is called.
function loadMany(names, skipCache = false) {
    if (names === undefined) {
        return [];
    }
    if (!Array.isArray(names)) {
        throw new Error('LoadMany is expecting an array.');
    }
    return names.reduce((acc, name) => {
        if (promiseWaiting.indexOf(name) !== -1) {
            return acc;
        }
        promiseWaiting.push(name);
        return acc.concat([loadListByName(name, null, skipCache).then(dataList => ({ name, dataList: dataList }))]);
    }, []);
}
/**
* Get a function to trigger in autocomplete case.
* The function will trigger a promise.
* @param {string} listName - Name of the list.
*/
function getAutoCompleteServiceQuery(listName) {
    return (query) => {
        loadListByName(listName, query.term).then((results) => {
            query.callback(results);
        });
    };
}

export {
    loadListByName,
    loadList,
    loadMany,
    getAutoCompleteServiceQuery
};

export default {
    loadListByName,
    loadList,
    loadMany,
    getAutoCompleteServiceQuery
};
