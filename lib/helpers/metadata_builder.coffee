((NS)->
  NS = NS or {}
  isInBrowser = typeof module is 'undefined' and typeof window isnt 'undefined'
  # Exceptions
  ArgumentNullException = if isInBrowser then NS.Helpers.Exceptions.ArgumentNullException else require("./custom_exception").ArgumentNullException
  # Get the domains definition.
  class MetadataBuilder
    #Initialize the dependencies from the project: the domains and the metadatas.
    initialize: (options)->
      throw new ArgumentNullException('The metadata builder needs options with domains and metadatas.') if not options?
      throw new ArgumentNullException('The metadata builder needs domains in options.') if not options.domains?
      throw new ArgumentNullException('The metadata builder needs metadatas in options.') if not options.metadatas?
      @domains = options.domains
      @metadatas = options.metadatas
    # Proxy in order to have 
    proxyValidationContainer = {}
    # Get the validation attributes from the domain.
    getDomainsValidationAttrs: (model)->
      #console.log('called')
      return new ArgumentNullException('The model should exists and have a metadatas property.') if not model?
      #Get the metadatas from the model.
      metadatas = @getMetadatas(model)
      #Container for the validation rules of the domain of each property.
      valDomAttrs = {}
      # Lopping through all attributes of th model in order to build their validators.
      for attr of metadatas 
        # Construct the metadata object
        metadata = {}
        md = metadatas[attr] or {}
        if (md.isValidationOff? and md.isValidationOff is false) or (not md.isValidationOff?)
         ###_.extend(metadata, md.metadata) if md.metadata?
         (metadata.domain = md.domain) if md.domain?
         (metadata.required = md.required) if md.required?
         ###        
         #Container for the validators.
         validators = [];
         #If the required filed is set, add a validator
         validators.push({"type": "required","value": true}) if metadata.required
         # Extend the validators 
         (validators = _.union(validators, @domains[metadata.domain].validation)) if metadata.domain? and @domains[metadata.domain]?
         # Set the validators inide the container associated with the field.
         valDomAttrs[attr] = validators;
      return valDomAttrs
    getMetadatas: (model)->
      # Construct the metadatas obtained with the model name. 
      entityMetadatas = @constructEntityMetaDatas(model)
      metadatas = _.clone(entityMetadatas)
      # If the models has metadatas the metadatas given by its definitions will extend them. 
      if model.metadatas?
        for mdlMetadataAttr in model.metadatas
          entityAttrMetadata = entityMetadatas[mdlMetadataAttr] # Get the introspected metadatas.
          mdlMetadata = model.metadatas[mdlMetadataAttr] 
          metadata = {} # Create a container for the metadatas.
          _.extend(metadata,  entityAttrMetadata) # Inject into metadata the entitydefinitions metadata attributes.
          _.extend(metadata, _.omit(@domains[metadata.domain], 'validators')) #override the metadata with the metadata inside the domain style, validators,....
          if mdlMetadata?
            _.extend(metadata, mdlMetadata.metadata)  if mdlMetadata.metadata?
            # Extend the "overriden" metadatas
            # Property that can be overriden: required, label, domain, isValidationOff
            overridenProperties = {}
            if mdlMetadata.domain?
              _.extend(overridenProperties, {domain: mdlMetadata.domain}) # Change the domain.
              _.extend(overridenProperties, _.omit(@domains[mdlMetadata.domain], 'validators')) # Change the metadatas of the domain.
            _.extend(overridenProperties, {required: mdlMetadata.required}) if mdlMetadata.required?
            _.extend(overridenProperties, {label: mdlMetadata.label}) if mdlMetadata.label?
            _.extend(overridenProperties, {isValidationOff: mdlMetadata.isValidationOff}) if mdlMetadata.isValidationOff? #Turn off the model validations.
            _.extend(overridenProperties, {style: mdlMetadata.style}) if mdlMetadata.style?
            _.extend(overridenProperties, {decorator: mdlMetadata.decorator}) if mdlMetadata.decorator?
            # If at least one property has been defined.
            _.extend(metadata, overridenProperties) if _.isEmpty(overridenProperties)
          #Update the global metadatas<
          metadatas[mdlMetadataAttr] = metadata;
      return metadatas

    constructEntityMetaDatas: (model)->
      if model.modelName?
        if @metadatas[model.modelName]?
          return @metadatas[model.modelName]
        else
          console.warn("The metadatas does not have properties for this model name.")
          return {}                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       
      else
        throw new ArgumentNullException('The model sould have a model name in order to build its metadatas') 

    proxyDomainValidationAttrs: (model)->
      return getDomainsValidationAttrs(model)
      return proxyValidationContainer[model.modelName] if(model.modelName? and proxyValidationContainer[model.modelName]?)
      if model.modelName?
        return proxyValidationContainer[model.modelName] = getDomainsValidationAttrs(model)
      else
        return getDomainsValidationAttrs(model)
  if isInBrowser
    NS.Helpers = NS.Helpers or {}
    NS.Helpers.MetadataBuilder = MetadataBuilder
    NS.Helpers.metadataBuilder = new MetadataBuilder();
  else
    module.exports = {MetadataBuilder: MetadataBuilder, metadataBuilder: new MetadataBuilder()}
)(if typeof module is 'undefined' and typeof window isnt 'undefined' then window.Fmk else module.exports)