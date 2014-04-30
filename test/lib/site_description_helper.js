/*global describe, it,  _*/
require('../initialize-globals').load();
require('../../lib/helpers/user_helper').configureUserInformations({
  roles: ['TEST']
});
var ArgumentNullException = require("../../lib/helpers/custom_exception").ArgumentNullException;
var ArgumentInvalidException = require("../../lib/helpers/custom_exception").ArgumentInvalidException;
var siteDescHelper = require('../../lib/helpers/site_description_helper');
//Unit test site description
var siteDescriptionFn = require('../datas/siteDescription');
describe('# Site description helper ', function() {
  it('## defineSite', function() {
    var siteDescriptionProcessDefault = siteDescriptionFn();
    //Initialize the site description.
    var siteDescription = siteDescHelper.defineSite({
      value: siteDescriptionFn,
      params: {}
    });
    siteDescription.should.be.deep.equal(siteDescriptionProcessDefault);
    //console.log('siteDescription', siteDescription);
  });
  it('## defineParam: no params define except defaults', function() {
    //Initialize the site description.
    siteDescHelper.defineSite({
      value: siteDescriptionFn,
      params: {}
    });
    (function() { siteDescHelper.defineParam();}).should.throw(ArgumentNullException);
    (function() { siteDescHelper.defineParam({name:'toto', value:'toto'});}).should.throw(ArgumentNullException);
  });
  it('## defineParam: params define',function(){
     siteDescHelper.defineSite({
      value: siteDescriptionFn,
      params: {paysCode: {name: 'paysCode', value:":codePays"}}
    });
     siteDescHelper.defineParam({name: 'paysCode', value: 'pays'}).should.be.true;
     siteDescHelper.defineParam({name: 'paysCode', value: 'pays'}).should.be.false;
  });
  it('## checkParams: params define',function(){
    siteDescHelper.defineSite({
      value: siteDescriptionFn,
      params: {paysCode: {name: 'paysCode', value:":papa"}}
    });

    siteDescHelper.checkParams().should.be.true;
    siteDescHelper.checkParams([]).should.be.true;
    siteDescHelper.checkParams(['paysCode']).should.be.false;
    siteDescHelper.defineParam({name: 'paysCode', value: 'pays'}).should.be.true;
    siteDescHelper.checkParams(['paysCode']).should.be.true;
    siteDescHelper.checkParams(['papa']).should.be.false;
  });
});