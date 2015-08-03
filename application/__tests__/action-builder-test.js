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

    it('Config must have a node', ()=>{
        expect(()=>actionBuilder({service: ()=>{}, status: 'superStatus'}))
        .toThrow('You shoud specify the store node name impacted by the action');
    });
    it('builded action should be a function', ()=>{
        let action = actionBuilder({status: 'test', service: ()=>{}, node: 'test'});
        expect(typeof action).toEqual('function');
    });
    it('Builded action call should result to a store update', (done)=>{
        let CoreStore = require('../../store/CoreStore');
        let store = new CoreStore({
            definition: {
            name: 'name'
        }});

        //Creates a mock service.
        let service = ()=>{
            return Promise.resolve({name: 'roberto'});
        };
        let nbCall = 0;
        store.addNameChangeListener((e)=>{
            console.warn('EVT CHANGE', e.callerId);
            expect('lopeez' === e.callerId);
            nbCall++;
            if(2 === nbCall){
                done();
            }
        });
        let actionConf = {
            service,
            preStatus: 'loading',
            status: 'saved',
            callerId: 'lopez',
            node: 'name'
        };
        let action = actionBuilder(actionConf);
        action(actionConf);
    });
});
