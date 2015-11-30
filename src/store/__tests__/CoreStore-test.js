/*global expect, it, describe*/
// __tests__/container-test.js

import CoreStore from '../CoreStore';
import {handleViewAction as dispatch} from '../../dispatcher'
describe('# The core store', ()=>{
    describe('listeners ', () => {
        const testStore = new CoreStore({definition: {person: 'person', address: 'address'}});
        describe(' should create listeners functions', ()=>{
            it('should add  onChange listeners', () => {
                expect(testStore.addPersonChangeListener).to.be.a.function;
                expect(testStore.addAddressnChangeListener).to.be.a.function;
            });
            it('should add Error listeners', ()=>{
                expect(testStore.addPersonErrorListener).to.be.a.function;
                expect(testStore.addAddressErrorListener).to.be.a.function;
            });
            it('should add status change listeners', ()=>{
                expect(testStore.addPersonStatusListener).to.be.a.function;
                expect(testStore.addAddressStatusListener).to.be.a.function;
            });
        });
        describe(' should create remove listeners functions', ()=>{
            it('should add  onChange listeners', () => {
                expect(testStore.removePersonChangeListener).to.be.a.function;
                expect(testStore.removeAddressChangeListener).to.be.a.function;
            });
            it('should add Error listeners', ()=>{
                expect(testStore.removePersonErrorListener).to.be.a.function;
                expect(testStore.removeAddressErrorListener).to.be.a.function;
            });
            it('should add status change listeners', ()=>{
                expect(testStore.removePersonStatusListener).to.be.a.function;
                expect(testStore.removeAddressStatusListener).to.be.a.function;
            });
        });
        describe('onChange should call handler', () => {
            it('sould call on change listener on dispatch', (done) => {
                const PERSON = {nom: 'david'}
                const onChange = d => {
                   expect(testStore.getPerson()).be.deep.equal(PERSON);
                   testStore.removePersonChangeListener(onChange);
                   done();
                }
                 testStore.addPersonChangeListener(onChange);
                 dispatch({
                     data: {person: PERSON},
                     type: 'update'
                 })
            });
            it('sould call on error listener on dispatch', (done) => {
                const PERSON_ERROR = {nom: 'error'}
                const onChange = d => {
                   expect(testStore.getErrorPerson()).be.deep.equal(PERSON_ERROR);
                   testStore.removePersonErrorListener(onChange);
                   done();
                }
                 testStore.addPersonErrorListener(onChange);
                 dispatch({
                     data: {person: PERSON_ERROR},
                     type: 'updateError'
                 })
            });
            it('sould call on status listener on dispatch', (done) => {
                const PERSON_STATUS = {nom: 'status'}
                const onChange = d => {
                   expect(testStore.getErrorPerson()).be.deep.equal(PERSON_STATUS);
                   testStore.removePersonErrorListener(onChange);
                   done();
                }
                 testStore.addPersonErrorListener(onChange);
                 dispatch({
                     data: {person: PERSON_STATUS},
                     type: 'updateStatus'
                 })
            });

        });

    });
});
