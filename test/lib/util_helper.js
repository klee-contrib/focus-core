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
      "b.b": 22,
      "c": 3
    };
    var gpDatas = utilHelper.groupBySplitChar(data);
    //console.log('gpDatas', gpDatas);
    gpDatas.should.be.an('object');
    gpDatas.should.have.property('1');
    gpDatas.should.have.property('2');
    gpDatas.should.have.property('3');
    gpDatas.should.not.have.property('0');
    gpDatas.should.not.have.property('4');
  });
  it('## splitLevel', function(){
    var data = "a.b.c.d";
    var splitLevel = utilHelper.splitLevel;
    //splitLevel(data, {splitChar: '.', depth: 0}).should.be.equal('');
    splitLevel(data, {splitChar: '.', depth: 1}).should.be.equal('a');
    splitLevel(data, {splitChar: '.', depth: 2}).should.be.equal('a.b');
    splitLevel(data, {splitChar: '.', depth: 3}).should.be.equal('a.b.c');
    splitLevel(data, {splitChar: '.', depth: 4}).should.be.equal('a.b.c.d');
  });
});