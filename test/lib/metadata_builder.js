/*global describe, it, beforeEach, afterEach, sinon, _*/
require('../initialize-globals').load();
//Require the module to test.
var MetadataBuilder = require('../../app/lib/metadata_builder');
//Require the basic model and extend it.
var Mdl = require('../../app/models/model');
var Model = Mdl.extend({
	metadatas: {
		id: {
			metadata: {
				"domain": "DO_ID",
				"required": true
			}
		},
		name: {
			metadata: {
				"domain": "DO_ID",
				"required": false
			}
		},
		age: {
			metadata: {
				domain: "DO_ENTIER",
				required: false
			},
			required: true,
			isValidationOff: false
			//domain: ''
		},
		attrNoVal: {
			metadata: "DO_ID",
			isValidationOff: true
		}
	}
});


describe('# MetadataBuilder', function() {
	describe('## getDomainsValidationAttrs', function() {
		//Initialisation
		var model = new Model();
		var validators = MetadataBuilder.getDomainsValidationAttrs(model);
		it('Should have validators for each property', function() {
			validators.should.have.property('id');
			validators.should.have.property('name');
			validators.should.have.property('age');
		});
		it('Should have a required override on the validators.', function() {
			validators.should.have.property('age').be.an("Array").of.length(2);
			validators.age[0].should.have.a.property('type', "required");
			validators.age[0].should.have.a.property('value', true);
		});
		it('should override the domain validators with others.');
		it('should return no validation when isValidationOff:true is pass', function() {
			validators.should.not.have.a.property('attrNoVal');
		});
		it('should behave normally when isValidationOff:false', function() {
			validators.should.have.property('age').be.an("Array").of.length(2);
		});
	});
	describe.skip('## domainAttributes', function() {
		var ModelWithName = Model.extend({
			modelName: "fatherModel"
		});
		var mb = _.clone(MetadataBuilder);
		var spy;
		//Register the spy before each test.
		beforeEach(function() {

			spy = sinon.spy(mb, "getDomainsValidationAttrs");
		});

		//Unregister the spy after each test.
		afterEach(function() {
			mb.getDomainsValidationAttrs.restore();
		});
		it("should call the getDomainsValidationAttr each time without name.", function() {
			mb.domainAttributes(new Model());
			//console.log("val", val);
			spy.should.have.callCount(1);
			mb.domainAttributes(new Model());
			spy.should.have.callCount(2);
		});
		it("should call the getDomainsValidationAttr once with a name.", function() {
			mb.domainAttributes(new ModelWithName());
			spy.should.have.callCount(1);
			mb.domainAttributes(new ModelWithName());
			spy.should.have.callCount(1);
		});

	});
});