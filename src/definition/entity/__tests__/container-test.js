/*global  expect, describe, it*/
// __tests__/container-test.js

const entityConfigurationMock = require('./entityConfigurationMock.json');

describe('### entity container', ()=>{
	it('getEntityConfiguration should be empty by default', ()=>{
		const entityContainer = require('../container');
		expect(entityContainer.getEntityConfiguration()).to.deep.equal({});
	});
	it('getEntityConfiguration should sent back sent conf', ()=> {
		const entityContainer = require('../container');
		entityContainer.setEntityConfiguration(entityConfigurationMock);
		expect(entityContainer.getEntityConfiguration()).to.deep.equal(
			entityConfigurationMock);
		});
	it('Get node should trigger a warning when the props does not exists', ()=> {
			const entityContainer = require('../container');
			entityContainer.setEntityConfiguration(entityConfigurationMock);
			expect(()=>{
				return entityContainer.getEntityConfiguration('papa');
			}).to.throw(Error, 'Wrong definition path given, see waning for more details');
	});
});
