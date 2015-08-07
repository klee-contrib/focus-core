/*global jest, expect*/
// __tests__/container-test.js
'use strict';

jest.dontMock('../check.js');
require('../../../test/dontMock');
var ArgumentInvalidException = require('../../../exception/ArgumentInvalidException');

describe('### object check test', function () {
  it('The domain', function () {
    var checkObject = require('../check');
    //console.log('checkObjet', checkObject);
    //expect(function(){checkObject('papa', 'aaaaa');}).toThrow(new ArgumentInvalidException('papa should be an object'));
    //expect(function(){ domainContainer.set(doText);}).toThrow(new Error('domain.name should extists and be a string'));
    expect(checkObject('papa', {})).toEqual(undefined);
  });
});