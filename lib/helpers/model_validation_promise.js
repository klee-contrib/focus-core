/*global Promise, _, window, Backbone*/
(function(NS) {
  "use strict";
  NS = NS || {};
  //Filename: helpers/model_validation_promise.js

  //Dependency gestion depending on the fact that we are in the browser or in node.
  var isInBrowser = typeof module === 'undefined' && typeof window !== 'undefined';
  var ArgumentNullException = isInBrowser ? NS.Helpers.Exceptions.ArgumentNullException : require("./custom_exception").ArgumentNullException;
  var ArgumentInvalidException = isInBrowser ? NS.Helpers.Exceptions.ArgumentInvalidException : require("./custom_exception").ArgumentInvalidException;
  var metadataBuilder = isInBrowser ? NS.Helpers.metadataBuilder : require('./metadata_builder').metadataBuilder;
  var validators = isInBrowser ? NS.Helpers.validators : require('./validators');
  
  //Validation function without promises.
  //This can  is use in promise validation function and in the collection validation.
  //In order to return only one promise well structured.
  var validateNoPromise = function validateModelWithoutPromise(model) {
    var errors = {};
    //Looping through each attributes.
    validateDomainAttributes(model, errors);
    validateCustomAttributes(model, errors);
    //Promisify the validations , if there is errors call the reject else call resolve with the model.
    if (_.isEmpty(errors)) {
      return {isValid: true, data: model};
    } else {
      return {isValid: false, data: errors};
    }
  };

  var validate = function validateModel(model) {
    var validationResult = validateNoPromise(model);
    return new Promise(function promiseValidation(resolve, reject) {
      //console.dir("Errors", errors);
      if (validationResult.isValid) {
        //console.log('resolve');
        resolve(validationResult.data);
      } else {
        //console.log('reject');
        reject(validationResult.data);
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

  //Get the validation "standard" attributes of a Backbone.model.
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
        value: model.get(attr),
        modelName: model.modelName,
      }, validatorsOfDomain[attr]);

      //If there is no error dont set any errors. 
      if (valRes.errors !== undefined && valRes.errors.length > 0) {
        errors[attr] = valRes.errors.join(',');
      }
    }
  };
  //Validate a Backbone.Collection, return a promises.
  var validateAll = function validateCollection(collection) {
    if (!collection instanceof Backbone.Collection) {
      throw new ArgumentInvalidException("Only a backbone collection can be validateAll", collection);
    }
    return new Promise(function(successCb, errorCb) {
      //Container for all errors.
      var errors = [];
      var modelIndex = 0;
      //Iterate over each collections.
      collection.forEach(function(model) {
        var validationResult = validateNoPromise(model);
        if (!validationResult.isValid) {
          errors.push({
            index: modelIndex,
            errors: validationResult.data
          });
        }
        modelIndex++;
      }, this);
      if (errors.length > 0) {
        //If the errors array is not empty, cb the promise errors.
        errorCb(errors);
      } else {
        // Else call success callback with the collection.
        successCb(collection);
      }
    });
  };

  // Initialize the domains and the metadatas.
  var initialize = function initializeModelValiationPromise(options) {
    metadataBuilder.initialize(options);
  };

  if (isInBrowser) {
    NS.Helpers = NS.Helpers || {};
    NS.Helpers.modelValidationPromise = {
      validate: validate,
      initialize: initialize,
      validateAll: validateAll,
      validateNoPromise:validateNoPromise
    };
  } else {
    module.exports = {
      validate: validate,
      validateAll: validateAll,
      initialize: initialize,
      validateNoPromise: validateNoPromise
    };
  }
})(typeof module === 'undefined' && typeof window !== 'undefined' ? window.Fmk : module.exports);