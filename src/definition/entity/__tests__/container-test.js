/*global  expect, describe, it*/
// __tests__/container-test.js

import entityConfigurationMock from './entityConfigurationMock.json';

describe('### entity container', () => {
    it('getEntityConfiguration should be empty by default', () => {
        const entityContainer = require('../container');
        expect(entityContainer.getEntityConfiguration()).toEqual({});
    });
    it('getEntityConfiguration should sent back sent conf', () => {
        const entityContainer = require('../container');
        entityContainer.setEntityConfiguration(entityConfigurationMock);
        expect(entityContainer.getEntityConfiguration()).toEqual(
            entityConfigurationMock);
    });
    it('Get node should trigger a warning when the props does not exists', () => {
        const entityContainer = require('../container');
        entityContainer.setEntityConfiguration(entityConfigurationMock);
        expect(() => {
            return entityContainer.getEntityConfiguration('papa');
        }).toThrow(Error, 'Wrong definition path given, see waning for more details');
    });
});
