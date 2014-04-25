/*global describe, it, Promise*/
require('../initialize-globals').load();
require('../../lib/helpers/user_helper').configureUserInformations({
  roles: ['TEST']
});
var stDescHelper = require('../../lib/helpers/site_description_helper');
describe.only('# Site description helper ', function() {
  var siteDescription = require('../datas/siteDescription');
  it('## defineSiteDescription', function() {
    stDescHelper.defineSiteDescription(siteDescription);
    var stDesc = stDescHelper.getSiteDescription();
    stDesc.should.be.an('object');
    stDesc.should.be.deep.equal(siteDescription);
  });
  it('## getRoutes', function() {
    stDescHelper.defineSiteDescription(siteDescription);
    var routes = stDescHelper.getRoutes();
    routes.should.be.an('object');
  });
  it('## getRoutes', function() {
    stDescHelper.defineSiteDescription(siteDescription);
    var routes = stDescHelper.getRoutes();
    routes.should.be.an('object');
    console.log('siteDesc', siteDescription);
    console.log('routes', routes);
  });
  it('## getRoute', function() {
    stDescHelper.defineSiteDescription(siteDescription);
    var route = stDescHelper.getRoute('#route1');
    route.should.be.an('object');
  });
  it('## getSiteStructure', function() {
    stDescHelper.defineSiteDescription(siteDescription);
    var siteStructure = stDescHelper.getSiteStructure();
    siteStructure.should.be.an('object');
    console.log(siteStructure);
  });
});