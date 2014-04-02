/*global describe, it, beforeEach, afterEach, sinon, _*/
require('../initialize-globals').load();
//Require the module to test.
var domains = {};//require('../../example/domains');
var modelMetadatas = {
	coreModel: {
		id: {
			metadata: {
				"domain": "DO_ID",
				"required": false
			}
		},
		name: {
			metadata: {
				"domain": "DO_ID",
				"required": true
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
			domain: "DO_ID",
			isValidationOff: true,
			decorator: "rien",
			style: 'beauty'
		}
	}
};
var metadatas = {
	coreModel: {
		id: {
			"domain": "DO_ID",
			"required": true
		},
		name: {
			"domain": "DO_ID",
			"required": false
		},
		age: {
			domain: "DO_ENTIER",
			required: false
		}
	}
};
var MetadataBuilder = require('../../lib/helpers/metadata_builder').MetadataBuilder;
//Metadata builder needs domains, metadatas.
var metadataBuilder = new MetadataBuilder()
metadataBuilder.initialize({
	domains: domains,
	metadatas: metadatas
});
//Require the basic model and extend it.
var Mdl = require('../../lib/models/model');
var ArgumentNullException = require('../../lib/helpers/custom_exception').ArgumentNullException;

var Model = Mdl.extend({
	modelName: "coreModel",
	metadatas: modelMetadatas.coreModel
});

describe('# MetadataBuilder', function() {
	describe("##new instance", function() {
		it('The constructor shoud not define any domins and metadata', function() {
			//new MetadataBuilder().should.throw(ArgumentNullException);

		});
	});
	describe("##initialize", function() {
		it('The initilization should work with domains and metadatas', function() {
			var mb = new MetadataBuilder();
			mb.initialize({
				domains: domains,
				metadatas: metadatas
			});
			mb.should.have.a.property('domains');
			mb.should.have.a.property('metadatas');
		});

	});
	describe("##getMetadatas", function() {
		it('shoud return empty object when a false model model name and no metadatas', function() {
			var model = new Mdl();
			model.modelName = "nothing"
			var mdlMetadatas = metadataBuilder.getMetadatas(model);
			mdlMetadatas.should.be.deep.equal({});
		});
		it('should return the metadatas content when only the right modle name is set', function() {
			var model = new Mdl();
			model.modelName = 'coreModel';
			var mdlMetadatas = metadataBuilder.getMetadatas(model);
			//console.log('metadatas', mdlMetadatas);
			mdlMetadatas.should.have.property('id').not.undefined;
			mdlMetadatas.should.have.property('name').not.undefined;
			mdlMetadatas.should.have.property('age').not.undefined;
			//console.log('mdts', mdlMetadatas);
		});
		it('should return the metadatas content when only the right modle name is set', function() {
			var model = new Model();
			var mdlMetadatas = metadataBuilder.getMetadatas(model);
			//console.log('metadatas', mdlMetadatas);
			mdlMetadatas.should.have.property('id').not.undefined;
			mdlMetadatas.should.have.property('name').not.undefined;
			mdlMetadatas.should.have.property('age').not.undefined;
			//console.log('mdtsMdl', mdlMetadatas);
		});

	});

	describe('## getDomainsValidationAttrs', function() {
		//Initialisation
		var model = new Model();
		var validators = metadataBuilder.getDomainsValidationAttrs(model);
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
		it('should have metadata ', function() {

		});
	});

});