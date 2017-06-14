/*global expect, describe, it*/
// __tests__/container-test.js
import numberValidation from '../number';


describe('### validator number', () => {
    it('number should be valid', () => {
        expect(numberValidation(1)).to.equal(true);
    });
    it('null should be valid', () => {
        expect(numberValidation(null)).to.equal(true);
    });
    it('undefined should be valid', () => {
        expect(numberValidation(undefined)).to.equal(true);
    });
    it('string should be invalid', () => {
        expect(numberValidation('ABCD')).to.equal(false);
    });
    it('string should be invalid', () => {
        expect(numberValidation('ABCD')).to.equal(false);
    });
    it('number min should be false when number inferior to min', () => {
        expect(numberValidation('6', { min: 7 })).to.equal(false);
    });
    it('number min should be true when number superior to min', () => {
        expect(numberValidation('7', { min: 6 })).to.equal(true);
    });
    it('number max should be false when number superior to max', () => {
        expect(numberValidation('12', { max: 7 })).to.equal(false);
    });
    it('number max should be true when number inferior to max', () => {
        expect(numberValidation('7', { max: 7 })).to.equal(true);
    });
});
