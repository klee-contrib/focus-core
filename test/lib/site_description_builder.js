/*global describe, it,  _*/
require('../initialize-globals').load();
require('../../lib/helpers/user_helper').configureUserInformations({
  roles: ['TEST']
});

//Unit test site description
var siteDescription = require('../datas/siteDescription');

//Initialize the site description.
require('../../lib/helpers/site_description_helper').defineSite({
  value: siteDescription,
  params: {}
});
var siteDescriptionBuilder = require('../../lib/helpers/site_description_builder');
//Force the build of the site description. Normally a parameter should be redefine.
siteDescriptionBuilder.processSiteDescription({isForceProcess: true});

describe('# Site description builder ', function() {
  it('## processSiteDescription', function() {
    siteDescriptionBuilder.processSiteDescription();
    var stDesc = siteDescriptionBuilder.getSiteDescription();
    stDesc.should.be.an('object');
    stDesc.should.be.deep.equal(siteDescription());
  });
  it.skip('## getRoutes', function() {
    siteDescriptionBuilder.processSiteDescription();
    var routes = siteDescriptionBuilder.getRoutes();
    routes.should.be.an('object');
    _.keys(routes).should.have.length.of(8);
    //console.log('siteDesc', siteDescription);
    //console.log('routes', routes);
  });
  it('## getRoute', function() {
    siteDescriptionBuilder.processSiteDescription();
    var route = siteDescriptionBuilder.getRoute('#route1');
    (route === undefined).should.be.true;
  });
  it('## getSiteStructure', function() {
    siteDescriptionBuilder.processSiteDescription();
    var siteStructure = siteDescriptionBuilder.getSiteStructure();
    siteStructure.should.be.an('object');
    _.keys(siteStructure).should.have.length.of(4);
    //console.log(siteStructure);
  });
});