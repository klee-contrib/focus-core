/*global expect, describe, it*/
// __tests__/container-test.js
import numberValidation from '../number';


describe('### validator number', () => {
    it('number should be valid', () => {
        expect(numberValidation(1)).toEqual(true);
    });
    it('null should be valid', () => {
        expect(numberValidation(null)).toEqual(true);
    });
    it('undefined should be valid', () => {
        expect(numberValidation(undefined)).toEqual(true);
    });
    it('string should be invalid', () => {
        expect(numberValidation('ABCD')).toEqual(false);
    });
    it('string should be invalid', () => {
        expect(numberValidation('ABCD')).toEqual(false);
    });
    it('number min should be false when number inferior to min', () => {
        expect(numberValidation('6', { min: 7 })).toEqual(false);
    });
    it('number min should be true when number superior to min', () => {
        expect(numberValidation('7', { min: 6 })).toEqual(true);
    });
    it('number max should be false when number superior to max', () => {
        expect(numberValidation('12', { max: 7 })).toEqual(false);
    });
    it('number max should be true when number inferior to max', () => {
        expect(numberValidation('7', { max: 7 })).toEqual(true);
    });
});
