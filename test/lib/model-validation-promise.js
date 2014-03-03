/*global describe, it*/
require('../initialize-globals').load();
var Md = require('../../app/models/model');
var ModelValidator = require('../../app/lib/model-validation-promise');

describe('#model-validation-promise', function() {
  describe('##validation on metadatas', function() {
    var Model = Md.extend({
      metadatas: {
        firstName: {
          domain: "DO_TEXTE_30",
          required: false
        },
        lastName: {
          domain: "DO_TEXTE_30",
          required: true
        },
        email: {
          domain: "DO_EMAIL"
        }
      }
    });
    it('should validate the metadatas', function(done) {
      var model = new Model({
        firstName: "Pierre",
        lastName: "Besson",
        email: "pierre.besson@ppp.com"
      });
      ModelValidator.validate(model).then(function() {
        done();
      });

    });
    if ('shoud be invalidated with the metadatas', function(done) {
      ModelValidator.validate(new Model()).catch(done());
    });
  });
  describe('##validation on model', function() {
    var Model = Md.extend({
      metadatas:{},//Turning off the metadatas in order to be focus on the validation attribute.
      validation: {
        firstName: {
          required: true
        }
      }
    });
    var model = new Model({
      firstName: "Pierre",
      lastName: "Besson"
    });
    it('The validation shoul be ok', function(done) {
      ModelValidator.validate(model).then(function(modelSuccess) {
        modelSuccess.toJSON().should.have.property('firstName', 'Pierre');
        done();
      });
    });
    it('The validation shoul be ko', function(done) {
      model.unset('firstName', {
        silent: true
      });
      ModelValidator.validate(model).
      catch (function(error) {
        error.should.have.property('firstName').with.length.above(2);
        done();
      });

    });
  });

});