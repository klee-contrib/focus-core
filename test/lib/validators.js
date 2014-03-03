/*global describe, it*/
require('../initialize-globals').load();
var validator = require('../../app/lib/validators');
describe('Validator', function() {
  var validate = validator.validate;
  describe('#validate', function() {
    describe('##required', function() {
      var property = {
        name: "papa",
        value: undefined
      },
        validator = {
          type: "required",
          value: undefined,
          options: {}
        };
      it("property undefined required false", function() {
        property.value = undefined;
        validator.value = false;
        var validationResult = validate(property, [validator]);
        validationResult.should.be.an('object');
        validationResult.should.have.property('name', property.name);
        validationResult.should.not.have.property('value');
        validationResult.should.have.property('isValid', true);
        validationResult.should.have.property('errors', undefined);
      });
      it("property undefined required true", function() {
        property.value = undefined;
        validator.value = true;
        var validationResult = validate(property, [validator]);
        validationResult.should.be.an('object');
        validationResult.should.have.property('name', property.name);
        validationResult.should.not.have.property('value');
        validationResult.should.have.property('isValid', false);
        validationResult.should.have.property('errors').be.an('Array');
        //console.log('Validation results: %j', validationResult);
      });
      it("property '' required true", function() {
        property.value = '';
        validator.value = true;
        var validationResult = validate(property, [validator]);
        console.log(validationResult);
        validationResult.should.be.an('object');
        validationResult.should.have.property('name', property.name);
        validationResult.should.have.property('value');
        validationResult.should.have.property('isValid', false);
        validationResult.should.have.property('errors').be.an('Array');
        //console.log('Validation results: %j', validationResult);
      });
      it("property defined required false", function() {
        property.value = "singe";
        validator.value = false;
        var validationResult = validate(property, [validator]);
        validationResult.should.be.an('object');
        validationResult.should.have.property('name', property.name);
        validationResult.should.have.property('value', property.value);
        validationResult.should.have.property('isValid', true);
        validationResult.should.have.property('errors', undefined);
      });
      it("property defined required false", function() {
        property.value = "singe";
        validator.value = true;
        var validationResult = validate(property, [validator]);
        validationResult.should.be.an('object');
        validationResult.should.have.property('name', property.name);
        validationResult.should.have.property('value', property.value);
        validationResult.should.have.property('isValid', true);
        validationResult.should.have.property('errors', undefined);
      });

    });
    describe('##string', function() {
      var property = {
        name: "firstName",
        value: "pierre"
      },
        validator = {
          type: "string",
          options: {}
        };
      it('The minLength shoul be ok with a minLength 1', function() {
        validator.options.minLength = 1;
        var validationResult = validate(property, [validator]);
        validationResult.should.be.an('object');
        validationResult.should.have.property('name', property.name);
        validationResult.should.have.property('value', property.value);
        validationResult.should.have.property('isValid', true);
        validationResult.should.have.property('errors', undefined);
      });
      it('The minLength shoul be ko with a stringLength of 7', function() {
        validator.options.minLength = 7;
        var validationResult = validate(property, [validator]);
        validationResult.should.be.an('object');
        validationResult.should.have.property('name', property.name);
        validationResult.should.have.property('value', property.value);
        validationResult.should.have.property('isValid', false);
        validationResult.should.have.property('errors');
        //console.log('Validation results: %j', validationResult);
      });
      it('The maxLength should be ok with a stringLength of 7', function() {
        validator.options.minLength = 0;
        validator.options.maxLength = 7;
        var validationResult = validate(property, [validator]);
        validationResult.should.be.an('object');
        validationResult.should.have.property('name', property.name);
        validationResult.should.have.property('value', property.value);
        validationResult.should.have.property('isValid', true);
        validationResult.should.have.property('errors', undefined);
        //console.log(validationResult);
      });
      it('The maxLength  be ko with a stringLength of 1', function() {
        validator.options.maxLength = 1;
        var validationResult = validate(property, [validator]);
        validationResult.should.be.an('object');
        validationResult.should.have.property('name', property.name);
        validationResult.should.have.property('value', property.value);
        validationResult.should.have.property('isValid', false);
        validationResult.should.have.property('errors');

      });
    });
    describe('##regex', function() {
      var property = {
        name: "email",
        value: "pierre@pierr.com"
      },
        validator = {
          type: "regex",
          options: {}
        };
      it("should validate with a regex", function() {
        validator.value = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        var validationResult = validate(property, [validator]);
        validationResult.should.be.an('object');
        validationResult.should.have.property('name', property.name);
        validationResult.should.have.property('value', property.value);
        validationResult.should.have.property('isValid', true);
        validationResult.should.have.property('errors', undefined);
      });
      it("should invalidate with a regex", function() {
        property.value = "sjhbcbdjbvjhds";
        validator.value = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        var validationResult = validate(property, [validator]);
        //console.log(validationResult);
        validationResult.should.be.an('object');
        validationResult.should.have.property('name', property.name);
        validationResult.should.have.property('value', property.value);
        validationResult.should.have.property('isValid', false);
        validationResult.should.have.property('errors').to.be.an('Array');
        //console.log('Validation results: %j', validationResult);
      });
    });
    describe('##function', function() {
      var property = {
        name: "bool"
      },
        validator = {
          type: "function",
          options: {}
        };
      it("Simple function should test its a bool true.", function() {
        property.value = true;
        validator.value = function(prop, opt) {
          opt = opt || {};
          return prop === true;
        };
        var validationResult = validate(property, [validator]);
        validationResult.should.be.an('object');
        validationResult.should.have.property('name', property.name);
        validationResult.should.have.property('value');
        validationResult.should.have.property('isValid', true);
        validationResult.should.have.property('errors', undefined);
      });
      it("Simple function should test its a bool false.", function() {
        property.value = false;
        validator.value = function(prop, opt) {
          opt = opt || {};
          return prop === true;
        };
        var validationResult = validate(property, [validator]);
        validationResult.should.be.an('object');
        validationResult.should.have.property('name', property.name);
        validationResult.should.have.property('value');
        validationResult.should.have.property('isValid', false);
        validationResult.should.have.property('errors').be.an("Array");
        //console.log('Validation results: %j', validationResult);
      });
    });
    describe('##two validator', function() {
      var property = {
        name: "bool"
      },
        validator = {
          type: "function",
          options: {}
        }, validator2 = {
          type: "function",
          options: {}
        };
      it("Two validators, two ok.", function() {
        property.value = true;
        validator.value = function(prop, opt) {
          opt = opt || {};
          return prop === true;
        };
        var validationResult = validate(property, [validator, validator]);
        validationResult.should.be.an('object');
        validationResult.should.have.property('name', property.name);
        validationResult.should.have.property('value');
        validationResult.should.have.property('isValid', true);
        validationResult.should.have.property('errors', undefined).empty;
      });
      it("Two validators, one ok, one wrong", function() {
        property.value = false;
        validator.value = function(prop, opt) {
          return prop === true;
        };
        validator2.value = function(prop, opt) {
          return prop === false;
        };
        var validationResult = validate(property, [validator, validator2]);
        validationResult.should.be.an('object');
        validationResult.should.have.property('name', property.name);
        validationResult.should.have.property('value');
        validationResult.should.have.property('isValid', false);
        validationResult.should.have.property('errors').be.an("Array").and.have.length(1);
      });
      it("Two validators, two wrong", function() {
        property.value = true;
        validator.value = function(prop, opt) {
          return prop === false;
        };
        validator2.value = function(prop, opt) {
          return prop === false;
        };
        var validationResult = validate(property, [validator, validator2]);
        validationResult.should.be.an('object');
        validationResult.should.have.property('name', property.name);
        validationResult.should.have.property('value');
        validationResult.should.have.property('isValid', false);
        validationResult.should.have.property('errors').be.an("Array").and.have.length(2);
      });
    });
describe('##No validator', function() {
      var property = {
        name: "bool"
      },
        validator = {
          type: "function",
          options: {}
        }, validator2 = {
          type: "function",
          options: {}
        };
      it("No validators should be ok.", function() {
        property.value = true;
        var validationResult = validate(property);
        validationResult.should.be.an('object');
        validationResult.should.have.property('name', property.name);
        validationResult.should.have.property('value');
        validationResult.should.have.property('isValid', true);
        validationResult.should.have.property('errors', undefined);
      });
      it("An empty array of validators should be ok.", function() {
        property.value = true;
        var validationResult = validate(property, []);
        validationResult.should.be.an('object');
        validationResult.should.have.property('name', property.name);
        validationResult.should.have.property('value');
        validationResult.should.have.property('isValid', true);
        validationResult.should.have.property('errors', undefined);
      });
    });
  });
});