/*global Promise, _*/
/* Filename: helpers/model_validation_promise.js */
(function(NS) {
  NS = NS || {};

  //Dependency gestion depending on the fact that we are in the browser or in node.
  var isInBrowser = typeof module === 'undefined' && typeof window !== 'undefined';
  var ArgumentNullException = isInBrowser ? NS.Helpers.Exceptions.ArgumentNullException : require("./custom_exception").ArgumentNullException;
  var metadataBuilder = isInBrowser ? NS.Helpers.metadataBuilder : require('./metadata_builder').metadataBuilder;
  var validators = isInBrowser ? NS.Helpers.validators : require('./validators');
  var validate = function validateModel(model) {
    var errors = {};
    //Looping through each attributes.
    validateDomainAttributes(model, errors);
    validateCustomAttributes(model, errors);
    //Promisify the validations , if there is errors call the reject else call resolve with the model.
    return new Promise(function promiseValidation(resolve, reject) {
      //console.log("Errors", errors);
      if (_.isEmpty(errors)) {
        //console.log('resolve');
        resolve(model);
      } else {
        //console.log('reject');
        reject(errors);
      }
      return undefined;
    });
  };

  //Validate the model customs attributes.
  var validateCustomAttributes = function validateCustomAttributes(model, errors) {
    if (!model) {
      throw new ArgumentNullException('The model should exist');
    }
    //Validating only the model at
    for (var attr in model.attributes) {
      //console.log("Attr", attr);
      if (!model.isValid(attr)) {
        var domainMessage = errors[attr] !== null && errors[attr] !== undefined ? errors[attr] : '';
        errors[attr] = '' + domainMessage + '' + attr + " not valid."; // Todo: translate the message.
      }
    }
  };

  //Get the validation "standard" attributes.
  var getValidatedAttrs = function(model) {
    return _.reduce(_.keys(_.result(model, 'validation') || {}), function(memo, key) {
      memo[key] = void 0;
      return memo;
    }, {});
  };

  //Validate the validation domains attributes.
  var validateDomainAttributes = function validateDomainAttributes(model, errors) {
    var validatorsOfDomain = metadataBuilder.getDomainsValidationAttrs(model);
    //console.log("validators %j", validatorsOfDomain);
    //Validate only the attributes of the model not all the validators int he metdadaga of the model.
    for (var attr in model.attributes) {
      //Validate the model only of there is the attribute on the model.
      var valRes = validators.validate({
        name: attr,
        value: model.get(attr)
      }, validatorsOfDomain[attr]);
      //If there is no error dont set any errors. 
      if (valRes.errors !== undefined && valRes.errors.length > 0) {
        errors[attr] = valRes.errors.join(',');
      }
    }
  };

  // Initialize the domains and the metadatas.
  var initialize = function initializeModelValiationPromise(options) {
    metadataBuilder.initialize(options);
  };

  if (isInBrowser) {
    NS.Helpers = NS.Helpers || {};
    NS.Helpers.modelValidationPromise = {
      validate: validate,
      initialize: initialize
    };
  } else {
    module.exports = {
      validate: validate,
      initialize: initialize
    };
  }
})(typeof module === 'undefined' && typeof window !== 'undefined' ? window.Fmk : module.exports);