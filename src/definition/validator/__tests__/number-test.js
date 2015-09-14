/*global expect, describe, it*/
// __tests__/container-test.js


describe('### validator number', ()=>{
    it('number should be valid', ()=>{
        const numberValidation = require('../number');
        expect(numberValidation(1)).to.equal(true);
    });
    it('null should be valid', ()=>{
        const numberValidation = require('../number');
        expect(numberValidation(null)).to.equal(true);
    });
    it('undefined should be valid', ()=>{
        const numberValidation = require('../number');
        expect(numberValidation(undefined)).to.equal(true);
    });
    it('string should be invalid', ()=>{
        const numberValidation = require('../number');
        expect(numberValidation('ABCD')).to.equal(false);
    });
    it('string should be invalid', ()=>{
        const numberValidation = require('../number');
        expect(numberValidation('ABCD')).to.equal(false);
    });
    it('number min should be false when number inferior to min', ()=>{
        const numberValidation = require('../number');
        expect(numberValidation('6', {min: 7})).to.equal(false);
    });
    it('number min should be true when number superior to min', ()=>{
        const numberValidation = require('../number');
        expect(numberValidation('7', {min: 6})).to.equal(true);
    });
    it('number max should be false when number superior to max', ()=>{
        const numberValidation = require('../number');
        expect(numberValidation('12', {max: 7})).to.equal(false);
    });
    it('number max should be true when number inferior to max', ()=>{
        const numberValidation = require('../number');
        expect(numberValidation('7', {max: 7})).to.equal(true);
    });
});
