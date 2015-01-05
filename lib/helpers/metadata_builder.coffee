"use strict"
# Exceptions
ArgumentNullException = require("./custom_exception").ArgumentNullException
proxyValidationContainer = {}
# Get the domains definition.
class MetadataBuilder
  
  #Initialize the dependencies from the project: the domains and the metadatas.
  initialize: (options, cb) ->
    throw new ArgumentNullException('The metadata builder needs options with domains and metadatas.') if not options?
    throw new ArgumentNullException('The metadata builder needs domains in options.') if not options.domains?
    throw new ArgumentNullException('The metadata builder needs metadatas in options.') if not options.metadatas?
    @domains = options.domains
    @metadatas = options.metadatas
    @isLog = options.isLog #Define if there is warn or not for metadata properties.
    cb(@domains, @metadatas) if cb?
    
  # Get the domains as they were initialized in the builder (if initialized).
  getDomains: ->
    return _.clone(@domains)
    
  # Get the validation attributes from the domain.
  getDomainsValidationAttrs: (model) ->
    #console.log('called')
    return new ArgumentNullException('The model should exists and have a metadatas property.') if not model?
    #Get the metadatas from the model.
    metadatas = @getMetadatas(model)
    #Container for the validation rules of the domain of each property.
    valDomAttrs = {}
    # Lopping through all attributes of th model in order to build their validators.
    for attr of metadatas
      # Construct the metadata object
      md = metadatas[attr] or {}
      if (md.isValidationOff? and md.isValidationOff is false) or (not md.isValidationOff?)
        ###_.extend(metadata, md.metadata) if md.metadata?
        (metadata.domain = md.domain) if md.domain?
        (metadata.required = md.required) if md.required?
        ###
        #Container for the validators.
        validators = []
        #If the required filed is set, add a validator
        validators.push({"type": "required","value": true}) if md.required is true
        # Extend the validators
        (validators = _.union(validators, @domains[md.domain].validation)) if md.domain? and @domains[md.domain]?
        # Set the validators inide the container associated with the field.
        valDomAttrs[attr] = validators
    return valDomAttrs
  # Get all the metadatas from the model.
  getMetadatas: (model) ->
    throw new ArgumentNullException("In order to get metadatas , you must provide a model.") if not model?
    # Construct the metadatas obtained with the model name.
    entityMetadatas = @constructEntityMetaDatas(model)
    metadatas = _.clone(entityMetadatas)
    # If the models has metadatas the metadatas given by its definitions will extend them.
    metadatasAttrs = _.keys(metadatas)
    if model.metadatas?
      metadatasAttrs = _.union(metadatasAttrs, _.keys(model.metadatas))
    for mdlMetadataAttr in metadatasAttrs
      entityAttrMetadata = entityMetadatas[mdlMetadataAttr] # Get the introspected metadatas.
      mdlMetadata = if model.metadatas? and model.metadatas[mdlMetadataAttr]? then model.metadatas[mdlMetadataAttr] else undefined
      metadata = {} # Create a container for the metadatas.
      _.extend(metadata,  entityAttrMetadata) # Inject validationinto metadata the entitydefinitions metadata attributes.
      #console.log("metadata",metadata,  metadata.domain, "domains", _.omit(@domains[metadata.domain]))
      _.extend(metadata, _.omit(@domains[metadata.domain], 'validation')) #override the metadata with the metadata inside the domain style, validators,....
      if mdlMetadata?
        _.extend(metadata, mdlMetadata.metadata)  if mdlMetadata.metadata?
        _.extend(metadata, _.omit(@domains[metadata.domain], 'validation')) #override the metadata with the metadata inside the domain style, validators,....
        # Extend the "overriden" metadatas
        # Property that can be overriden: required, label, domain, isValidationOff
        overridenProperties = {}
        #console.log 'mdlMetadatamdlMetadata', mdlMetadata
        if mdlMetadata.domain?
          _.extend(overridenProperties, {domain: mdlMetadata.domain}) # Change the domain.
          _.extend(overridenProperties, _.omit(@domains[mdlMetadata.domain], 'validation')) # Change the metadatas of the domain.
        _.extend(overridenProperties, {required: mdlMetadata.required}) if mdlMetadata.required?
        _.extend(overridenProperties, {label: mdlMetadata.label}) if mdlMetadata.label?
        _.extend(overridenProperties, {isValidationOff: mdlMetadata.isValidationOff}) if mdlMetadata.isValidationOff? #Turn off the model validations.
        _.extend(overridenProperties, {style: mdlMetadata.style}) if mdlMetadata.style?
        _.extend(overridenProperties, {decorator: mdlMetadata.decorator}) if mdlMetadata.decorator?
        _.extend(overridenProperties, {symbol: mdlMetadata.symbol}) if mdlMetadata.symbol?
        _.extend(overridenProperties, {decoratorOptions: mdlMetadata.decoratorOptions}) if mdlMetadata.decoratorOptions?
        _.extend(overridenProperties, {idAttribute: mdlMetadata.idAttribute}) if mdlMetadata.idAttribute?
        # If at least one property has been defined.
        _.extend(metadata, overridenProperties) if not _.isEmpty(overridenProperties)
      #Update the global metadatas<
      #console.log "metadata", metadata
      metadatas[mdlMetadataAttr] = metadata
    return metadatas
  
  #Get the attributes for one property of a metadata.
  getMetadataForAttribute: (model, attribute) ->
    throw new ArgumentNullException("In order to get metadatas for an attribute of a model , you must provide a model.") if not model?
    throw new ArgumentNullException("In order to get metadatas for an attribute of a model , you must provide an attribute.") if not attribute?
    entityAttrMetadata = @constructEntityMetaDatas(model)[attribute]
    mdlMetadata = if model.metadatas? and model.metadatas[attribute]? then model.metadatas[attribute] else undefined
    metadata = {} # Create a container for the metadatas.
    _.extend(metadata,  entityAttrMetadata) # Inject validationinto metadata the entitydefinitions metadata attributes.
    #console.log("metadata",metadata,  metadata.domain, "domains", _.omit(@domains[metadata.domain]))
    _.extend(metadata, _.omit(@domains[metadata.domain], 'validation')) #override the metadata with the metadata inside the domain style, validators,....
    if mdlMetadata?
      _.extend(metadata, mdlMetadata.metadata)  if mdlMetadata.metadata?
      _.extend(metadata, _.omit(@domains[metadata.domain], 'validation')) #override the metadata with the metadata inside the domain style, validators,....
      # Extend the "overriden" metadatas
      # Property that can be overriden: required, label, domain, isValidationOff
      overridenProperties = {}
      #console.log 'mdlMetadatamdlMetadata', mdlMetadata
      if mdlMetadata.domain?
        _.extend(overridenProperties, {domain: mdlMetadata.domain}) # Change the domain.
        _.extend(overridenProperties, _.omit(@domains[mdlMetadata.domain], 'validation')) # Change the metadatas of the domain.
      _.extend(overridenProperties, {required: mdlMetadata.required}) if mdlMetadata.required?
      _.extend(overridenProperties, {label: mdlMetadata.label}) if mdlMetadata.label?
      _.extend(overridenProperties, {isValidationOff: mdlMetadata.isValidationOff}) if mdlMetadata.isValidationOff? #Turn off the model validations.
      _.extend(overridenProperties, {style: mdlMetadata.style}) if mdlMetadata.style?
      _.extend(overridenProperties, {decorator: mdlMetadata.decorator}) if mdlMetadata.decorator?
      _.extend(overridenProperties, {symbol: mdlMetadata.symbol}) if mdlMetadata.symbol?
      _.extend(overridenProperties, {decoratorOptions: mdlMetadata.decoratorOptions}) if mdlMetadata.decoratorOptions?
      # If at least one property has been defined.
      _.extend(metadata, overridenProperties) if not _.isEmpty(overridenProperties)
    return metadata
  constructEntityMetaDatas: (model) ->
    @metadatas = @metadatas || {} # If no metadatas have been defined.
    # TODO: pbn => Use a flatten function in order to flatten @metadatas and be ablt to access it without any problem.
    if model.modelName?
      mdName = model.modelName.split('.')
      if mdName.length is 1
        if @metadatas[model.modelName]?
          return @metadatas[model.modelName]
        else
          if @isLog
            console.warn("The metadatas does not have properties for model '#{model.modelName}'.")
          return {}
      else
        if @metadatas[mdName[0]]? and @metadatas[mdName[0]][mdName[1]]?
          return @metadatas[mdName[0]][mdName[1]]
        else
          if @isLog
            console.warn("The metadatas does not have properties for model '#{model.modelName}'.")
          return {}
    else
      throw new ArgumentNullException('The model should have a model name in order to build its metadatas')

  proxyDomainValidationAttrs: (model) ->
    return getDomainsValidationAttrs(model)
    return proxyValidationContainer[model.modelName] if(model.modelName? and proxyValidationContainer[model.modelName]?)
    if model.modelName?
      return proxyValidationContainer[model.modelName] = getDomainsValidationAttrs(model)
    else
      return getDomainsValidationAttrs(model)
module.exports = {MetadataBuilder: MetadataBuilder, metadataBuilder: new MetadataBuilder()}