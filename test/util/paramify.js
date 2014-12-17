/*global describe, it*/
require('../initialize-globals').load();
var paramify = require('../../lib/util/paramify');
describe('# paramify', function() {
    it('Should should convert an object into a string.', function() {
      var meta = {
        top: 10,
        skip: 23,
        sortFieldName: "colA",
        sortDesc: true
      };
      var param = paramify(meta);
      param.should.be.a.string;
      for(var m in meta){
       param.indexOf(m).should.not.be.equal(-1);
      }
  });
});