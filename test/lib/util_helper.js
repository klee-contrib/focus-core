/*global describe, it*/
require('../initialize-globals').load();
var utilHelper = require('../../lib/helpers/util_helper');
describe('# Util helper ', function() {
  it('## groupBySplitChar', function() {
    var data = {
      "a": 1,
      "a.a": 11,
      "a.a.a": 111,
      "b": 2,
      "bb": 22,
      "c": 3
    };
    var gpDatas = utilHelper.groupBySplitChar(data);
    console.log('gpDatas', gpDatas);
    gpDatas.should.be.an('object');
    gpDatas.should.have.property('1');
    gpDatas.should.have.property('2');
    gpDatas.should.have.property('3');
    gpDatas.should.not.have.property('0');
    gpDatas.should.not.have.property('4');
  });
});