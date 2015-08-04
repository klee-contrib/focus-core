/*global jest, expect, it*/
// __tests__/container-test.js
jest.dontMock('../container');
require('../../../test/dontMock');
var ArgumentInvalidException = require('../../../exception/ArgumentInvalidException');


describe('### container', function() {
    it('domain set should add a domain', function() {
     var domainContainer = require('../container');
     var doText = {name: "DO_TEXT", type: "string"};
     domainContainer.set(doText);
     expect(domainContainer.getAll().DO_TEXT).toEqual(doText);
    });
    /*it('wrong domain set should throw an exception', function() {
     var domainContainer = require('../container');
     var doText = 'Roberto';
     expect( function(){ domainContainer.set(doText);}).toThrow(new Error('domain.name should extists and be a string'));
 });*/
    it('domain should be empty by default', function() {
      var domainContainer = require('../container');
      expect(domainContainer.getAll()).toEqual({});
    });

});
