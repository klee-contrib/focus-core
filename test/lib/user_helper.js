/*global describe, it, Promise*/
require('../initialize-globals').load();
var userHelper = require('../../lib/helpers/user_helper');
describe('# User helper ', function() {

  describe('## getUserInformations', function() {
    it('### should get the default user informations', function() {
      var userDefaultInfos = userHelper.getUserInformations();
      userDefaultInfos.should.be.an('object');
      userDefaultInfos.should.have.property('cultureCode', "en-US");
      userDefaultInfos.roles.should.be.an('array');
      userDefaultInfos.routes.should.be.an('array');
    });
  });

  describe('## configureUserInformations', function() {
    it('### configure the roles, routes and a new property', function() {
      var roles = ['CHIEF', 'MASTER'];
      var routes = ['#route1', "#route3"];
      var userInfos = userHelper.configureUserInformations({
        roles: roles,
        routes: routes,
        newProp: "testValue"
      });
      userInfos.should.be.an('object');
      userInfos.should.have.property('cultureCode', "en-US");
      userInfos.should.have.property('roles', roles).that.is.an('array');
      userInfos.should.have.property('routes', routes).that.is.an('array');
      userInfos.should.have.property('newProp', "testValue");
    });
  });
  describe('## loadUserInformations', function() {
    it('### static promise', function(done) {
      var promiseLoading = new Promise(function(resolve, fail) {
        resolve({
          cultureCode: "en-UK",
          routes: ['#route6', '#route7']
        });
      });
      userHelper.loadUserInformations(promiseLoading).then(function(success) {
        var userDefaultInfos = userHelper.getUserInformations();
        userDefaultInfos.should.be.an('object');
        userDefaultInfos.should.have.property('cultureCode', "en-UK");
        done();
      });
    });
  });
  describe('## roles', function() {

    it("### hasRole", function() {
      var roles = ['CHIEF', 'MASTER', 'PAPA'];
      userHelper.configureUserInformations({
        roles: roles
      });
      userHelper.hasRole('PAPA').should.be.true;
      userHelper.hasRole('MAMAN').should.be.false;
    });
    it("### hasOneRole", function() {
      var roles = ['CHIEF', 'MASTER', 'PAPA'];
      userHelper.configureUserInformations({
        roles: roles
      });
      userHelper.hasOneRole(['PAPA', 'MASTER']).should.be.true;
      userHelper.hasOneRole(['PAPA', 'MAMAN']).should.be.true;
      userHelper.hasOneRole(['ROI', 'MAMAN']).should.be.false;
    });
  });

});