/*global jest, expect, it, describe*/
// __tests__/container-test.js
'use strict';

jest.dontMock('../action-builder');
jest.autoMockOff();
require('../../test/dontMock');
var actionBuilder = require('../action-builder');
describe('### action-builder', function () {
    it('Config must have a service', function () {
        expect(function () {
            return actionBuilder({});
        }).toThrow('You need to provide a service to call');
    });
    it('Config must have a status', function () {
        expect(function () {
            return actionBuilder({ service: function service() {} });
        }).toThrow('You need to provide a status to your action');
    });

    it('Config must have a node', function () {
        expect(function () {
            return actionBuilder({ service: function service() {}, status: 'superStatus' });
        }).toThrow('You shoud specify the store node name impacted by the action');
    });
    it('builded action should be a function', function () {
        var action = actionBuilder({ status: 'test', service: function service() {}, node: 'test' });
        expect(typeof action).toEqual('function');
    });
    it('Builded action call should result to a store update', function (done) {
        var CoreStore = require('../../store/CoreStore');
        var store = new CoreStore({
            definition: {
                name: 'name'
            } });

        //Creates a mock service.
        var service = function service() {
            return Promise.resolve({ name: 'roberto' });
        };
        var nbCall = 0;
        store.addNameChangeListener(function (e) {
            console.warn('EVT CHANGE', e.callerId);
            expect('lopeez' === e.callerId);
            nbCall++;
            if (2 === nbCall) {
                done();
            }
        });
        var actionConf = {
            service: service,
            preStatus: 'loading',
            status: 'saved',
            callerId: 'lopez',
            node: 'name'
        };
        var action = actionBuilder(actionConf);
        action(actionConf);
    });
});