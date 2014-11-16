/*global describe, it*/
require('../initialize-globals').load();
var Model = require('../../lib/models/model').extend({modelName: "Pierre"});
describe('default model', function() {
  var model = new Model({firstName: "Pierre", lastName: "Besson"});
  describe('#setErrors', function() {
    it('should set the errors property on the model', function() {
      model.setErrors({firstName: "It sould be seven letters minimum.", lastName: "It sould not start by B."});
      var modelErrors = model.get('errors');
      modelErrors.should.not.be.null;
      modelErrors.should.not.be.undefined;
      modelErrors.should.have.property('firstName', 'It sould be seven letters minimum.');
      modelErrors.should.have.property('lastName', 'It sould not start by B.');
    });
    it('should not set property error on the model if it is called without argument', function() {
      model.unset('errors', {silent: true});
      model.setErrors();
      model.has('errors').should.be.false;
    });
    it('should not set property error on the model if it is undefined', function() {
      model.unset('errors', {silent: true});
      model.setErrors(undefined);
      model.has('errors').should.be.false;
    });
    it('should not set property error on the model if it is null', function() {
      model.unset('errors', {silent: true});
      model.setErrors(null);
      model.has('errors').should.be.false;
    });
  });
  describe('#toJSON', function() {
    it('should have a metadatas property in addition to the other property', function() {
      var jsonModel = model.toJSON();
      //console.log(jsonModel);
      jsonModel.should.have.property('firstName', 'Pierre');
      jsonModel.should.have.property('lastName', 'Besson');
    });
    it('It should expose only the real model propertuies. And an id field with the read id.', function() {
      var Mdl = Model.extend({idAttribute: "_id", metadatas: {_id: {domain: "DO_KEY"}}});
      var model = new Mdl({_id: 123,firstName: "Pierre", lastName: "Besson"});
      var jsonModel = model.toJSON();
      //console.log(jsonModel);
      jsonModel.should.have.property('id', 123);
      jsonModel.should.have.property('_id', 123);
      jsonModel.should.have.property('firstName', 'Pierre');
      jsonModel.should.have.property('lastName', 'Besson');
      jsonModel.should.have.property('metadatas');
    });
  });
  describe('#toSaveJSON', function() {
    it('It should expose only the real model propertuies. And an id field with the read id.', function() {
      var Mdl = Model.extend({idAttribute: "_id", metadatas: {_id: {domain: "DO_KEY"}}});
      var model = new Mdl({_id: 123,firstName: "Pierre", lastName: "Besson"});
      var jsonModel = model.toSaveJSON();
      //console.log(jsonModel);
      jsonModel.should.have.property('id', 123);
      jsonModel.should.have.property('_id', 123);
      jsonModel.should.have.property('firstName', 'Pierre');
      jsonModel.should.have.property('lastName', 'Besson');
      jsonModel.should.not.have.property('metadatas');
    });
  });
  describe('#getId', function() {
    it('It should get the Id when there is no idAttribute', function() {
      var Mdl = Model;
      var model = new Mdl({_id: 123});
      (model.getId() === undefined).should.be.true;
      var m = new Mdl({id: 123});
      m.getId().should.be.equal(123);
    });
    it('It should get the Id from idAttribute when there is an idAttribute', function() {
      var Mdl = Model.extend({idAttribute: "_id"});
      var model = new Mdl({_id: 123});
      model.getId().should.be.equal(123);
      var m = new Mdl({id: 123});
      (m.getId() === undefined).should.be.true;
    });
  });
});