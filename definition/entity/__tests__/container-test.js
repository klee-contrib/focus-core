/*global jest, expect*/
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
		console.log(entityConfigurationMock);
		console.log(entityContainer.getEntityConfiguration());
		expect(entityContainer.getEntityConfiguration()).toEqual(
			entityConfigurationMock);
	});
});
