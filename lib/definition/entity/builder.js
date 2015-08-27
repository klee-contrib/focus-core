'use strict';

var Immutable = require('immutable');
var checkIsString = require('../../util/string/check');
var checkIsObject = require('../../util/object/check');
var checkIsNotNull = require('../../util/object/checkIsNotNull');
var SEPARATOR = '.';

/**
* Pointer to the domain contaier.
* @type {Object}
*/
var domainContainer = require('../domain/container');
var entityContainer = require('./container');
var computedEntityContainer = Immutable.Map({});

/*
binder
idAttribute
decoratorOptions
symbol
style
decorator
isValidationOff
label
required
domain
*/

/**
 * Build all entity information from entity name.
 * @param  {string} entityName - The entity name.
 */
function _buildEntityInformation(entityName) {
    var entityDomainInfos = entityContainer.getEntityConfiguration(entityName);
    checkIsNotNull('entityDomainInfos', entityDomainInfos);
    var container = {};
    //Populate the domain values i
    for (var key in entityDomainInfos) {
        container[key] = _buildFieldInformation('' + entityName + SEPARATOR + key);
    }
    //Update the computed information map.
    computedEntityContainer = computedEntityContainer.set(entityName, Immutable.Map(container));
}

/**
 * Build the field informations.
 * @param  {string} fieldPath - The field path.
 * @return {Immutable.Map} - The immutable field description.
 */
function _buildFieldInformation(fieldPath) {
    var fieldConf = entityContainer.getFieldConfiguration(fieldPath);
    var immutableFieldConf = Immutable.Map(fieldConf);
    //Maybe add a domain check existance
    var domain = fieldConf.domain;

    return domainContainer.get(domain).mergeDeep(immutableFieldConf);
}

/**
* Get the entity information from the entity name and given the extended informations.
* @param {string} entityName - The name of the entity.
* @param {object} complementaryInformation - Additional information on the entity.
* @return {object} - The entity informations from the entity  name.
*/
function getEntityInformations(entityName, complementaryInformation) {
    checkIsString('entityName', entityName);
    checkIsObject('complementaryInformation', complementaryInformation);
    var key = entityName.split(SEPARATOR);
    if (!computedEntityContainer.hasIn(key)) {
        _buildEntityInformation(entityName);
    }
    return computedEntityContainer.get(entityName).mergeDeep(complementaryInformation).toJS();
}

/**
* Get the field informations.
* @param {string} fieldName - name or path of the field.
* @param {object} complementaryInformation - Additional informations to extend the domain informations.
* @return {object} - The builded field informations.
*/
function getFieldInformations(fieldName, complementaryInformation) {
    checkIsString('fieldName', fieldName);
    checkIsObject('complementaryInformation', complementaryInformation);
    var fieldPath = fieldName.split(SEPARATOR);
    if (computedEntityContainer.hasIn(fieldPath)) {
        return computedEntityContainer.getIn(fieldPath).toJS();
    }
    return _buildFieldInformation(fieldPath).mergeDeep(complementaryInformation).toJS();
}

module.exports = {
    getEntityInformations: getEntityInformations,
    getFieldInformations: getFieldInformations
};