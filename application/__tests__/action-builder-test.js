/*global jest, expect, it*/
// __tests__/container-test.js
jest.dontMock('../action-builder');
jest.autoMockOff();
require('../../test/dontMock');
var actionBuilder = require('../action-builder');

describe('### action-builder', function() {
    it('Config must have a service', function() {
      expect(function(){
          actionBuilder({});
      }).toThrow('You need to provide a service to call');
    });
    it('Config must have a status', function() {
      expect(function(){
          actionBuilder({service: function fakeService(){return Promise.resolve('Data')}});
      }).toThrow('You need to provide a status to your action');
    });

});
