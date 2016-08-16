'use strict';

//Dependencies.
var Immutable = require('immutable');
var isObject = require('lodash/lang/isObject');
var isString = require('lodash/lang/isString');
var InvalidException = Error;
var checkIsString = require('../../util/string/check');
var checkIsObject = require('../../util/object/check');

/**
* Container for the application domains.
* @type {object}
*/
var domainsMap = Immutable.Map({});

/**
 * Get all domains in a js object.
 * @return {object} - All domains.
 */
function getDomains() {
    return domainsMap.toJS();
}

/**
* Set new domains.
* @param {object} newDomains - New domains to set.
* à
*/
function setDomains(newDomains) {
    if (!isObject(newDomains)) {
        throw new InvalidException('newDomains should be an object', newDomains);
    }
    domainsMap = domainsMap.merge(newDomains);
}

/**
* Set a domain.
* @param {object} domain - Object structure of the domain.
*/
function setDomain(domain) {
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
function getDomain(domainName) {
    if (!isString(domainName)) {
        throw new InvalidException('domaiName should extists and be a string', domainName);
    }
    if (!domainsMap.has(domainName)) {
        console.warn('You are trying to access a non existing domain: ' + domainName);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInByb2Nlc3Nvci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBO0FBQ0EsSUFBTSxZQUFZLFFBQVEsV0FBUixDQUFsQjtBQUNBLElBQU0sV0FBVyxRQUFRLHNCQUFSLENBQWpCO0FBQ0EsSUFBTSxXQUFXLFFBQVEsc0JBQVIsQ0FBakI7QUFDQSxJQUFNLG1CQUFtQixLQUF6QjtBQUNBLElBQU0sZ0JBQWdCLFFBQVEseUJBQVIsQ0FBdEI7QUFDQSxJQUFNLGdCQUFnQixRQUFRLHlCQUFSLENBQXRCOztBQUVBOzs7O0FBSUEsSUFBSSxhQUFhLFVBQVUsR0FBVixDQUFjLEVBQWQsQ0FBakI7O0FBRUE7Ozs7QUFJQSxTQUFTLFVBQVQsR0FBcUI7QUFDakIsV0FBTyxXQUFXLElBQVgsRUFBUDtBQUNIOztBQUVEOzs7OztBQUtBLFNBQVMsVUFBVCxDQUFvQixVQUFwQixFQUErQjtBQUMzQixRQUFHLENBQUMsU0FBUyxVQUFULENBQUosRUFBeUI7QUFDckIsY0FBTSxJQUFJLGdCQUFKLENBQXFCLGdDQUFyQixFQUF1RCxVQUF2RCxDQUFOO0FBQ0g7QUFDRCxpQkFBYSxXQUFXLEtBQVgsQ0FBaUIsVUFBakIsQ0FBYjtBQUNIOztBQUdEOzs7O0FBSUEsU0FBUyxTQUFULENBQW1CLE1BQW5CLEVBQTBCO0FBQ3RCLGtCQUFjLFFBQWQsRUFBd0IsTUFBeEI7QUFDQSxrQkFBYyxhQUFkLEVBQTZCLE9BQU8sSUFBcEM7QUFDQTtBQUNBLGlCQUFhLFdBQVcsR0FBWCxDQUFlLE9BQU8sSUFBdEIsRUFBNEIsTUFBNUIsQ0FBYjtBQUNIOztBQUVEOzs7OztBQUtBLFNBQVMsU0FBVCxDQUFtQixVQUFuQixFQUE4QjtBQUMxQixRQUFHLENBQUMsU0FBUyxVQUFULENBQUosRUFBeUI7QUFDckIsY0FBTSxJQUFJLGdCQUFKLENBQXFCLDBDQUFyQixFQUFpRSxVQUFqRSxDQUFOO0FBQ0g7QUFDRCxRQUFHLENBQUMsV0FBVyxHQUFYLENBQWUsVUFBZixDQUFKLEVBQStCO0FBQzNCLGdCQUFRLElBQVIsc0RBQWdFLFVBQWhFO0FBQ0EsZUFBTyxVQUFVLEdBQVYsQ0FBYyxFQUFkLENBQVA7QUFDSDtBQUNELFdBQU8sV0FBVyxHQUFYLENBQWUsVUFBZixDQUFQO0FBQ0g7O0FBRUQsT0FBTyxPQUFQLEdBQWlCO0FBQ2IsWUFBUSxVQURLO0FBRWIsWUFBUSxVQUZLO0FBR2IsU0FBSyxTQUhRO0FBSWIsU0FBSztBQUpRLENBQWpCIiwiZmlsZSI6InByb2Nlc3Nvci5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vRGVwZW5kZW5jaWVzLlxyXG5jb25zdCBJbW11dGFibGUgPSByZXF1aXJlKCdpbW11dGFibGUnKTtcclxuY29uc3QgaXNPYmplY3QgPSByZXF1aXJlKCdsb2Rhc2gvbGFuZy9pc09iamVjdCcpO1xyXG5jb25zdCBpc1N0cmluZyA9IHJlcXVpcmUoJ2xvZGFzaC9sYW5nL2lzU3RyaW5nJyk7XHJcbmNvbnN0IEludmFsaWRFeGNlcHRpb24gPSBFcnJvcjtcclxuY29uc3QgY2hlY2tJc1N0cmluZyA9IHJlcXVpcmUoJy4uLy4uL3V0aWwvc3RyaW5nL2NoZWNrJyk7XHJcbmNvbnN0IGNoZWNrSXNPYmplY3QgPSByZXF1aXJlKCcuLi8uLi91dGlsL29iamVjdC9jaGVjaycpO1xyXG5cclxuLyoqXHJcbiogQ29udGFpbmVyIGZvciB0aGUgYXBwbGljYXRpb24gZG9tYWlucy5cclxuKiBAdHlwZSB7b2JqZWN0fVxyXG4qL1xyXG5sZXQgZG9tYWluc01hcCA9IEltbXV0YWJsZS5NYXAoe30pO1xyXG5cclxuLyoqXHJcbiAqIEdldCBhbGwgZG9tYWlucyBpbiBhIGpzIG9iamVjdC5cclxuICogQHJldHVybiB7b2JqZWN0fSAtIEFsbCBkb21haW5zLlxyXG4gKi9cclxuZnVuY3Rpb24gZ2V0RG9tYWlucygpe1xyXG4gICAgcmV0dXJuIGRvbWFpbnNNYXAudG9KUygpO1xyXG59XHJcblxyXG4vKipcclxuKiBTZXQgbmV3IGRvbWFpbnMuXHJcbiogQHBhcmFtIHtvYmplY3R9IG5ld0RvbWFpbnMgLSBOZXcgZG9tYWlucyB0byBzZXQuXHJcbiogw6BcclxuKi9cclxuZnVuY3Rpb24gc2V0RG9tYWlucyhuZXdEb21haW5zKXtcclxuICAgIGlmKCFpc09iamVjdChuZXdEb21haW5zKSl7XHJcbiAgICAgICAgdGhyb3cgbmV3IEludmFsaWRFeGNlcHRpb24oJ25ld0RvbWFpbnMgc2hvdWxkIGJlIGFuIG9iamVjdCcsIG5ld0RvbWFpbnMpO1xyXG4gICAgfVxyXG4gICAgZG9tYWluc01hcCA9IGRvbWFpbnNNYXAubWVyZ2UobmV3RG9tYWlucyk7XHJcbn1cclxuXHJcblxyXG4vKipcclxuKiBTZXQgYSBkb21haW4uXHJcbiogQHBhcmFtIHtvYmplY3R9IGRvbWFpbiAtIE9iamVjdCBzdHJ1Y3R1cmUgb2YgdGhlIGRvbWFpbi5cclxuKi9cclxuZnVuY3Rpb24gc2V0RG9tYWluKGRvbWFpbil7XHJcbiAgICBjaGVja0lzT2JqZWN0KCdkb21haW4nLCBkb21haW4pO1xyXG4gICAgY2hlY2tJc1N0cmluZygnZG9hbWluLm5hbWUnLCBkb21haW4ubmFtZSk7XHJcbiAgICAvL3Rlc3QgZG9tYWluLCBkb21haW4ubmFtZVxyXG4gICAgZG9tYWluc01hcCA9IGRvbWFpbnNNYXAuc2V0KGRvbWFpbi5uYW1lLCBkb21haW4pO1xyXG59XHJcblxyXG4vKipcclxuKiBHZXQgYSBkb21haW4gZ2l2ZW4gYSBuYW1lLlxyXG4qIEBwYXJhbSB7c3RyaW5nfSBkb21haW5OYW1lIC0gbmFtZSBvZiB0aGUgZG9tYWluLlxyXG4qIEByZXR1cm4ge29iamVjdH0gLSBUaGUgZG9tYWluIG9iamVjdC5cclxuKi9cclxuZnVuY3Rpb24gZ2V0RG9tYWluKGRvbWFpbk5hbWUpe1xyXG4gICAgaWYoIWlzU3RyaW5nKGRvbWFpbk5hbWUpKXtcclxuICAgICAgICB0aHJvdyBuZXcgSW52YWxpZEV4Y2VwdGlvbignZG9tYWlOYW1lIHNob3VsZCBleHRpc3RzIGFuZCBiZSBhIHN0cmluZycsIGRvbWFpbk5hbWUpO1xyXG4gICAgfVxyXG4gICAgaWYoIWRvbWFpbnNNYXAuaGFzKGRvbWFpbk5hbWUpKXtcclxuICAgICAgICBjb25zb2xlLndhcm4oYFlvdSBhcmUgdHJ5aW5nIHRvIGFjY2VzcyBhIG5vbiBleGlzdGluZyBkb21haW46ICR7ZG9tYWluTmFtZX1gKTtcclxuICAgICAgICByZXR1cm4gSW1tdXRhYmxlLk1hcCh7fSk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gZG9tYWluc01hcC5nZXQoZG9tYWluTmFtZSk7XHJcbn1cclxuXHJcbm1vZHVsZS5leHBvcnRzID0ge1xyXG4gICAgZ2V0QWxsOiBnZXREb21haW5zLFxyXG4gICAgc2V0QWxsOiBzZXREb21haW5zLFxyXG4gICAgc2V0OiBzZXREb21haW4sXHJcbiAgICBnZXQ6IGdldERvbWFpblxyXG59O1xyXG4iXX0=