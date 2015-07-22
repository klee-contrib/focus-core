/*global jest, expect, describe, it*/
// __tests__/container-test.js
jest.dontMock('../container');
require('../../../test/dontMock');
var entityConfigurationMock = require('./entityConfigurationMock.json');

describe('### container', function() {
	it('getEntityConfiguration should be empty by default', function() {

		var entityContainer = require('../container');
		expect(entityContainer.getEntityConfiguration()).toEqual({});
	});
	it('getEntityConfiguration should sent back sent conf', function() {
		var entityContainer = require('../container');
		entityContainer.setEntityConfiguration(entityConfigurationMock);
		expect(entityContainer.getEntityConfiguration()).toEqual(
			entityConfigurationMock);
	});
	it('Get node should trigger a warning when the props does not exists', function() {
		var entityContainer = require('../container');
		entityContainer.setEntityConfiguration(entityConfigurationMock);
		expect(function(){
			return entityContainer.getEntityConfiguration('papa');
		}).toThrow(new Error('Wrong definition path given, see waning for more details'));
	});

});
