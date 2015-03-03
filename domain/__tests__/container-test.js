/*global jest, expect*/
// __tests__/container-test.js
/*jest.dontMock('immutable');
jest.dontMock('lodash/lang/isObject');
jest.dontMock('lodash/lang/isString');*/
jest.dontMock('../container');

describe('### container', function() {


  it('domain should be empty by default', function() {
    var domainContainer = require('../container');
    expect(domainContainer.getAll()).toEqual({});
  });

 it('domain set should add a domain', function() {
   var domainContainer = require('../container');
   var doText = {name: "DO_TEXT", type: "string"};
   domainContainer.set(doText);
   expect(domainContainer.getAll().DO_TEXT).toEqual(doText);
 });

 it('wrong domain set should throw an exception', function() {
   var domainContainer = require('../container');
   var doText = {namea: "DO_TEXT", type: "string"};
   expect( function(){ domainContainer.set(doText);}).toThrow(new Error('domain.name should extists and be a string'));
 });



});
