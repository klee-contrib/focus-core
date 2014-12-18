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

      var ajaxOptions = listMetadataParser.load({
        criteria: {
          name: "pierre",
          age: 27
        },
        metadata: meta
      }, {
        url: "http://test.com"
      });

      console.log("ajaxOptions", ajaxOptions);
      ajaxOptions.url.should.be.a.string;
      for (var m in meta) {
        ajaxOptions.url.indexOf(m).should.not.be.equal(-1);
      }
    });
  });
});