/*global expect, it, describe*/
// __tests__/container-test.js

import CoreStore from '../CoreStore';
import dispatcher from '../../dispatcher';

const dispatch = (data) => dispatcher.handleViewAction(data);

describe('# The core store', () => {
    describe('listeners ', () => {
        let testStore;
        beforeEach(() => {
            testStore = new CoreStore({ definition: { person: 'person', address: 'address' } });
        });
        describe(' should create listeners functions', () => {
            it('should add  onChange listeners', () => {
                expect(testStore.addPersonChangeListener).toBeInstanceOf(Function);
                expect(testStore.addAddressChangeListener).toBeInstanceOf(Function);
            });
            it('should add Error listeners', () => {
                expect(testStore.addPersonErrorListener).toBeInstanceOf(Function);
                expect(testStore.addAddressErrorListener).toBeInstanceOf(Function);
            });
            it('should add status change listeners', () => {
                expect(testStore.addPersonStatusListener).toBeInstanceOf(Function);
                expect(testStore.addAddressStatusListener).toBeInstanceOf(Function);
            });
        });
        describe(' should create remove listeners functions', () => {
            it('should add  onChange listeners', () => {
                expect(testStore.removePersonChangeListener).toBeInstanceOf(Function);
                expect(testStore.removeAddressChangeListener).toBeInstanceOf(Function);
            });
            it('should add Error listeners', () => {
                expect(testStore.removePersonErrorListener).toBeInstanceOf(Function);
                expect(testStore.removeAddressErrorListener).toBeInstanceOf(Function);
            });
            it('should add status change listeners', () => {
                expect(testStore.removePersonStatusListener).toBeInstanceOf(Function);
                expect(testStore.removeAddressStatusListener).toBeInstanceOf(Function);
            });
        });
        describe('Handlers should be called on dispatch', () => {
            it('should call on change listener on dispatch', (done) => {
                const PERSON = { nom: 'david' }
                const onChange = d => {
                    expect(testStore.getPerson()).toEqual(PERSON);
                    testStore.removePersonChangeListener(onChange);
                    done();
                }
                testStore.addPersonChangeListener(onChange);
                dispatch({
                    data: { person: PERSON },
                    type: 'update'
                })
            });
            it('should call on error listener on dispatch', (done) => {
                const PERSON_ERROR = { nom: 'error' }
                const onChange = d => {
                    expect(testStore.getErrorPerson()).toEqual(PERSON_ERROR);
                    testStore.removePersonErrorListener(onChange);
                    done();
                }
                testStore.addPersonErrorListener(onChange);
                dispatch({
                    data: { person: PERSON_ERROR },
                    type: 'updateError'
                })
            });
            it('should call on status listener on dispatch', (done) => {
                const PERSON_STATUS = { nom: 'status' }
                const onChange = d => {
                    expect(testStore.getStatusPerson()).toEqual(PERSON_STATUS);
                    testStore.removePersonStatusListener(onChange);
                    done();
                }
                testStore.addPersonStatusListener(onChange);
                dispatch({
                    data: { person: PERSON_STATUS },
                    type: 'updateStatus',
                    status: { person: PERSON_STATUS }
                })
            });

        });

    });
    describe('getters setters', () => {
        const testStore = new CoreStore({ definition: { person: 'person', address: 'address' } });
        describe('should create getters functions', () => {
            it('should add  getData function', () => {
                expect(testStore.getPerson).toBeInstanceOf(Function);
                expect(testStore.getAddress).toBeInstanceOf(Function);
            });
            it('should add getError function', () => {
                expect(testStore.getErrorPerson).toBeInstanceOf(Function);
                expect(testStore.getErrorAddress).toBeInstanceOf(Function);
            });
            it('should add getStatus function', () => {
                expect(testStore.getStatusPerson).toBeInstanceOf(Function);
                expect(testStore.getStatusAddress).toBeInstanceOf(Function);
            });
        });
        describe('should create setters functions', () => {

        });
    });
});
