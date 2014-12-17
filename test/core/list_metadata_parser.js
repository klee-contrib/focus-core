require('../initialize-globals').load();
var listMetadataParser = require('../../lib/core/list_metadata_parser');
describe('# list_metadata_parser', function() {
  describe("##createListMetadatasOptions", function() {
    it('GET', function() {
      var meta = {
        top: 10,
        skip: 23,
        sortFieldName: "colA",
        sortDesc: true
      };
      var param = listMetadataParser.createMetadataOptions(meta);
      param.should.be.a.string;
      for(m in meta){
       param.indexOf(m).should.not.be.equal(-1);        
      }
    
    });
  });
});