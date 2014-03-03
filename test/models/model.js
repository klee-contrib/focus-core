/*global describe, it*/
require('../initialize-globals').load();
var Model = require('../../app/models/model');
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
      jsonModel.should.have.property('papa', 'singe');
      jsonModel.should.have.property('firstName', 'Pierre');
      jsonModel.should.have.property('lastName', 'Besson');
      jsonModel.should.have.property('metadatas');
    });
  });
});