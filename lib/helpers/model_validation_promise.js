/*global Promise, _, window, Backbone*/
//Filename: helpers/model_validation_promise.js

var ArgumentNullException = require("./custom_exception").ArgumentNullException;
var ArgumentInvalidException = require("./custom_exception").ArgumentInvalidException;
var metadataBuilder = require('./metadata_builder').metadataBuilder;
var validators = require('./validators');

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
    return {
      isValid: true,
      data: model
    };
  } else {
    return {
      isValid: false,
      data: errors
    };
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
    /*
     if (!model.isValid(attr)) {
     var domainMessage = errors[attr] !== null && errors[attr] !== undefined ? errors[attr] : '';
     errors[attr] = '' + domainMessage + '' + attr + " not valid."; // Todo: translate the message.
     }
     */
    // Validation custom permettant de tester le multi champs :
    // on appelle directement la fonction de validation du model sans passer par le isValid Backbone
    // qui ne permet pas de remonter le message d'erreur.
    if (model.validation !== undefined && model.validation[attr] !== undefined) {
      var res = model.validation[attr](attr, model.attributes);
      if (res !== undefined && res !== null) {
        errors[attr] = i18n.t(res);
      }
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

module.exports = {
  validate: validate,
  validateAll: validateAll,
  initialize: initialize,
  validateNoPromise: validateNoPromise
};