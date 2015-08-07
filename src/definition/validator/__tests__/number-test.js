/*global jest, expect*/
// __tests__/container-test.js
jest.dontMock('../number');
require('../../../test/dontMock');

describe('### validator number', function() {
  it('number should be valid', function() {
    var numberValidation = require('../number');
    expect(numberValidation(1)).toEqual(true);
  });
  it('null should be valid', function() {
    var numberValidation = require('../number');
    expect(numberValidation(null)).toEqual(true);
  });
  it('undefined should be valid', function() {
    var numberValidation = require('../number');
    expect(numberValidation(undefined)).toEqual(true);
  });
  it('string should be invalid', function() {
    var numberValidation = require('../number');
    expect(numberValidation('ABCD')).toEqual(false);
  });
  it('string should be invalid', function() {
    var numberValidation = require('../number');
    expect(numberValidation('ABCD')).toEqual(false);
  });
  it('number min should be false when number inferior to min', function() {
    var numberValidation = require('../number');
    expect(numberValidation('6', {min: 7})).toEqual(false);
  });
  it('number min should be true when number superior to min', function() {
    var numberValidation = require('../number');
    expect(numberValidation('7', {min: 6})).toEqual(true);
  });
  it('number max should be false when number superior to max', function() {
    var numberValidation = require('../number');
    expect(numberValidation('12', {max: 7})).toEqual(false);
  });
  it('number max should be true when number inferior to max', function() {
    var numberValidation = require('../number');
    expect(numberValidation('7', {max: 7})).toEqual(true);
  });
});
