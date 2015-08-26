//Dependencies.
const Immutable = require('immutable');
const isObject = require('lodash/lang/isObject');
const isString = require('lodash/lang/isString');
const InvalidException = Error;
const checkIsString = require('../../util/string/check');
const checkIsObject = require('../../util/object/check');

/**
* Container for the application domains.
* @type {object}
*/
let domainsMap = Immutable.Map({});

/**
 * Get all domains in a js object.
 * @return {object} - All domains.
 */
function getDomains(){
    return domainsMap.toJS();
}

/**
* Set new domains.
* @param {object} newDomains - New domains to set.
* à
*/
function setDomains(newDomains){
    if(!isObject(newDomains)){
        throw new InvalidException('newDomains should be an object', newDomains);
    }
    domainsMap = domainsMap.merge(newDomains);
}


/**
* Set a domain.
* @param {object} domain - Object structure of the domain.
*/
function setDomain(domain){
    checkIsObject('domain', domain);
    checkIsString('doamin.name', domain.name);
    //test domain, domain.name
    domainsMap = domainsMap.set(domain.name, domain);
}

/**
* Get a domain given a name.
* @param {string} domainName - name of the domain.
* @return {object} - The domain object.
*/
function getDomain(domainName){
    if(!isString(domainName)){
        throw new InvalidException('domaiName should extists and be a string', domainName);
    }
    if(!domainsMap.has(domainName)){
        console.warn(`You are trying to access a non existing domain: ${domainName}`);
        return Immutable.Map({});
    }
    return domainsMap.get(domainName);
}

module.exports = {
    getAll: getDomains,
    setAll: setDomains,
    set: setDomain,
    get: getDomain
};
