/*global Promise, _*/

(function(NS) {
  NS = NS || {};
  
  //Dependency gestion depending on the fact that we are in the browser or in node.
  var isInBrowser = typeof module === 'undefined' && typeof window !== 'undefined';
  var ArgumentNullException = isInBrowser ? NS.Helpers.Exceptions.ArgumentNullException : require("./custom_exception").ArgumentNullException;
  var metadataBuilder = isInBrowser ? NS.Helpers.metadataBuilder : require('./metadata_builder');
  var validators = isInBrowser ? NS.Helpers.validators : require('./validators');
  var validate = function validateModel (model) {
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
    for (var attr in getValidatedAttrs(model)) {
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
    var validatorsOfDomain = metadataBuilder.domainAttributes(model);
    //console.log("validators %j", validatorsOfDomain);
    for (var attr in validatorsOfDomain) {
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

  if(isInBrowser){
    NS.Helpers = NS.Helpers || {};
    NS.Helpers.modelValidationPromise = validate;
  }else {
    module.exports = validate;
  }
})(typeof module === 'undefined' && typeof window !== 'undefined' ? window.Fmk : module.exports);