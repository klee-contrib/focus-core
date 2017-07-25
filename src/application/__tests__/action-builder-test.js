/*global expect, it, describe*/
// __tests__/container-test.js

import actionBuilder from '../action-builder';
import CoreStore from '../../store/CoreStore';
import { init } from '../../translation';
init({
    resStore: {},
    lng: 'fr-FR'
}); // Initialise i18n

describe('### action-builder', () => {
    it('Config must have a service', () => {
        expect(() => actionBuilder({}))
            .to.throw('You need to provide a service to call');
    });
    it('Config must have a status', () => {
        expect(() => actionBuilder({ service: () => { } }))
            .to.throw('You need to provide a status to your action');
    });

    it('Config must have a node', () => {
        expect(() => actionBuilder({ service: () => { }, status: 'superStatus' }))
            .to.throw('You shoud specify the store node name impacted by the action');
    });
    it('Builded action should be a function', () => {
        const action = actionBuilder({ status: 'test', service: () => { }, node: 'test' });
        expect(action).to.be.a('function');
    });

    it('Builded action call should result to a store update', (done) => {
        const store = new CoreStore({
            definition: {
                name: 'name'
            }
        });

        //Creates a mock service.
        const service = () => {
            return Promise.resolve({ name: 'roberto' });
        };
        let nbCall = 0;
        store.addNameChangeListener((e) => {
            expect('lopeez' === e.callerId);
            nbCall++;
            if (1 === nbCall) {
                done();
            }
        });
        const actionConf = {
            service,
            preStatus: 'loading',
            status: 'saved',
            callerId: 'lopez',
            node: 'name'
        };
        const action = actionBuilder(actionConf).bind({ _identifier: 'champ' });
        action(actionConf);
    });
    it('Error service should trigger a store error update', (done) => {
        const store = new CoreStore({
            definition: {
                name: 'name'
            }
        });
        const lopezErrors = {
            lopezDavid: 'David is so powerfull...',
            lopezJoe: 'Jo is even more powerfull...'
        };
        //Creates a mock service.
        const service = () => {
            const mockErrorResponse = {
                status: 422,
                responseJSON: {
                    fieldErrors: lopezErrors
                }
            };
            return Promise.reject(mockErrorResponse);
        };
        store.addNameErrorListener(() => {
            expect(store.getErrorName()).to.eql(lopezErrors);
            done();
        });
        const actionConf = {
            service,
            preStatus: 'loading',
            status: 'saved',
            callerId: 'lopez',
            node: 'name'
        };
        const action = actionBuilder(actionConf).bind({ _identifier: 'champ' });
        action(actionConf);
    });
});
