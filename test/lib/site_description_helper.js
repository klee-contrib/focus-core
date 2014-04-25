/*global describe, it, Promise*/
require('../initialize-globals').load();
require('../../lib/helpers/user_helper').configureUserInformations({roles: ['TEST']});
var stDescHelper = require('../../lib/helpers/site_description_helper');
describe.only('# Site description helper ', function() {
  var siteDescription = require('../datas/siteDescription');
  it('## defineSiteDescription', function(){
    stDescHelper.defineSiteDescription(siteDescription);
    var stDesc = stDescHelper.getSiteDescription();
    stDesc.should.be.an('object');
    stDesc.should.be.deep.equal(siteDescription);
  });
  it('## getRoutes', function(){
    stDescHelper.defineSiteDescription(siteDescription);

  });
});
