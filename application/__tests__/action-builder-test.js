/*global jest, expect, it, describe*/
// __tests__/container-test.js
jest.dontMock('../action-builder');
jest.autoMockOff();
require('../../test/dontMock');
let actionBuilder = require('../action-builder');

describe('### action-builder', ()=>{
    it('Config must have a service', ()=>{
        expect(()=>actionBuilder({}))
        .toThrow('You need to provide a service to call');
    });
    it('Config must have a status', ()=>{
        expect(()=>actionBuilder({service: ()=>{}}))
        .toThrow('You need to provide a status to your action');
    });
    it('builded action should be a function', ()=>{
        let action = actionBuilder({status: 'test', service: ()=>{}});
        expect(typeof action).toEqual('function');
    });
});
