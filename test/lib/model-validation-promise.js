/*global describe, it*/
require('../initialize-globals').load();
var Md = require('../../lib/models/model');
var ModelValidator = require('../../lib/helpers/model_validation_promise');
var domains = require('../../example/domains');
var metadatas = {
  contact: {
    firstName: {
      domain: "DO_TEXTE_30",
      required: true
    },
    lastName: {
      domain: "DO_TEXTE_30",
      required: false
    },
    email: {
      domain: "DO_EMAIL"
    }
  }
};
ModelValidator.initialize({domains: domains, metadatas:metadatas});

describe('#model-validation-promise', function() {
  describe('##validation on metadatas', function() {
    var Model = Md.extend({
      modelName: "contact",
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
      ModelValidator.validate(new Model()).
      catch (done());
    });
  });
  describe('##validation on model', function() {
    var Model = Md.extend({
      modelName: "",
      metadatas: {}, //Turning off the metadatas in order to be focus on the validation attribute.
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
    it.skip('The validation shoul be ko', function(done) {
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