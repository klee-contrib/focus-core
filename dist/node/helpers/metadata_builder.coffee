((NS)->
  NS = NS or {}
  isInBrowser = if typeof module is 'undefined' and typeof window isnt 'undefined' then window.Fmk else module.exports
  # Exceptions
  ArgumentNullException = if isInBrowser then NS.Helpers.Exceptions.ArgumentNullException else require("./custom_exception").ArgumentNullException
  # Get the domains definition.
  class MetadataBuilder
    constructor: (@domains)->
      throw new ArgumentNullException('The metadata builder needs domains.') if not @domains?
    # Proxy in order to have 
    proxyValidationContainer = {}

    # Get the validation attributes from the domain.
    getDomainsValidationAttrs = (model)->
      #console.log('called')
      return new ArgumentNullException('The model should exists and have a metadatas property.') if not model?
      #Get the metadatas from the model.
      metadatas = model.metadatas
      throw new ArgumentNullException('The model should have metadatas.') if (not metadatas?) #or (not tryConstructModelMetaDatasFromModelName(model)?)
      if (not metadatas?)
        metadatas = constructModelMetaDatas()
      #Container for the validation rules of the domain of each property.
      valDomAttrs = {}
      # Lopping through all attributes of th model in order to build their validators.
      for attr of metadatas 
        # Construct the metadata object
        metadata = {}
        md = metadatas[attr] or {}
        if (md.isValidationOff? and md.isValidationOff is false) or (not md.isValidationOff?)
         _.extend(metadata, md.metadata) if md.metadata?
         (metadata.domain = md.domain) if md.domain?
         (metadata.required = md.required) if md.required?
        
         #Container for the validators.
         validators = [];
         #If the required filed is set, add a validator
         validators.push({"type": "required","value": true}) if metadata.required
         # Extend the validators 
         (validators = _.union(validators, @domains[metadata.domain].validation)) if metadata.domain? and @domains[metadata.domain]?
         # Set the validators inide the container associated with the field.
         valDomAttrs[attr] = validators;
      return valDomAttrs

      constructModelMetaDatas = (model)->
        return require(model.modelName)  if model.modelName?


      proxyDomainValidationAttrs = (model)->
        return getDomainsValidationAttrs(model)
        return proxyValidationContainer[model.modelName] if(model.modelName? and proxyValidationContainer[model.modelName]?)
        if model.modelName?
          return proxyValidationContainer[model.modelName] = getDomainsValidationAttrs(model)
        else
          return getDomainsValidationAttrs(model)
  if isInBrowser
    NS.Helpers = NS.Helpers or {}
    NS.Helpers.MetadataBuilder = MetadataBuilder
  else
    module.exports = MetadataBuilder
)(if typeof module is 'undefined' and typeof window isnt 'undefined' then window.Fmk else module.exports)