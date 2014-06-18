#global $, _
"use strict"
((NS) ->
  # Filename: lib/templates/view_helper/template_helper.coffee */
  NS = NS or {}
  isInBrowser = typeof module is 'undefined' and typeof window isnt 'undefined'
  
  # Other module dependencies.
  metadataBuilder = if isInBrowser then NS.Helpers.metadataBuilder else require('../../helpers/metadata_builder').metadataBuilder
  
  # Dependency on the configuration.
  domains_definition = undefined
  
  # Default options
  isDateHTML5 = true
  gridSize = 12
  defaultLabelSize = 3
  defaultInputSize =  8

  #initialize the template helper.
  configure: (options)->
    domains_definition = options.domains
    isDateHTML5 = options.isDateHTML5 or isDateHTML5
    gridSize = options.gridSize or gridSize
    defaultLabelSize = options.labelSize
    defaultInputSize = options.inputSize or defaultInputSize

  #S4  
  S4 = ->
    (((1 + Math.random()) * 0x10000) | 0).toString(16).substring 1

  #Generate a pseudo-GUID by concatenating random hexadecimal.  
  guid = ->
    S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4()
  
  #Container for all the fields helpers. display_for, input_for, option_selected
  fieldHelpers = {}
  fieldHelpers.process = (property,options, context)->
    options = options or {}
    result = {}
    fieldHelpers.processMetadatas(property,options, result, context)
    fieldHelpers.processDomain(property,options, result, context)
    fieldHelpers.processOptions(property,options, result, context)


    
  # Process all options which are givent to the field helper.
  fieldHelpers.processOption = (property,options, result, context)->
    opt = options
    metadata = result.metadata
    result.options = optionsHelpers.process(opt, metadata)
    return result.options
  # Process all options which are givent to the field helper.
  fieldHelpers.processMetadatas = (property,options, result, context)->
    result.metadata = metadataBuilder.getMetadataForAttribute(context,property)
    return result.metadata

  # Process all options which are givent to the field helper.
  fieldHelpers.processDomain = (property,options, result, context)->
    result.domain = domains_definition[result.metadata.domain] or {}
    return result.domain
  fieldHelpers.processInputPropertyValue = (property,options, result, context)->
     if context[property]?
      propValue = context[property]
      metadata = result.metadata
      if metadata.format?
        propValue =  metadata.format(propValue)
      if dataType is "checkbox"
        if propValue then return 'checked'
      if dataType is "date" and propValue isnt ""
        return "value='" + propValue + "'"
      else return "value='#{_.escape(propValue)}'"
    return ""
  # Process the label translation.
  fieldHelpers.processTranslation = (property, options, result, context)->
    throw new Error('i18n is not defined') if not i18n? 
    metadata = result.metadata
    translationRoot = result.options.translationRoot
    translation = metadata.label or ("#{context['modelName']}.#{property}" if context['modelName']?) or ""
    if translationRoot?
      translation = ((if (translationRoot?) and typeof translationRoot is "string" then translationRoot + "." else "")) + property
    result.translation =  if(translation is "") then "" else i18n.t(translation)
    return result.translation
  htmlHelpers = {}
  #Deal with the icon case
  htmlHelpers.processIcon =(property, options, result, context)->
    #<span class='glyphicon glyphicon-#{opt.icon}'></span>
    return if result.params.icon? then "<span class='input-group-addon'><i class='fa fa-#{result.params.icon}  fa-fw'></i> </span>" else ""

  #Process the labels.
  htmlHelpers.processLabel =(property, options, result, context)->
    opt = result.params
    if opt.isNoLabel?
      return ""
    else
      return "<label class='control-label #{opt.labelSize}' for='#{property}'>#{result.translation}</label>"
  
  #Todo:
  htmlHelpers.processErrors =(property, options, result, context)->
    #tofdo: move into form size calculation.
    error = ""
    error = "has-error" if @errors? and @errors[property]?
    errorValue = if @errors? and @errors[property]? then @errors[property] else ""
    errorSize = ()=>
      errorLength = gridSize - labelSizeValue
      offsetError = labelSizeValue
      return "col-sm-#{errorLength} col-md-#{errorLength} col-lg-#{errorLength} col-sm-offset-#{offsetError} col-md-offset-#{offsetError} col-lg-offset-#{offsetError}"
    #Deal with error
    errors = ()=>
      if error == "has-error" then "<span class='#{error} #{errorSize()} help-inline pull-left' style='color:#b94a48'> #{errorValue } </span>" else ""
    return errors()
  
  #Container for the options helper.
  optionsHelpers = {}

  #Process all options helpers.
  optionsHelpers.process = (opt, metadata)->
    options = {
      required: optionsHelpers.required(opt, metadata),
      symbol: optionsHelpers.symbol(opt, metadata),
      dataType: optionsHelpers.dataType(opt, metadata),
      readonly: optionsHelpers.readonly(opt, metadata),
      formSize: optionsHelpers.formSize(opt, metadata),
      isNoLabel: opt.isNoLabel,
      isAddOnInput: optionsHelpers.isAddOnInput(opt, metadata)
      translationRoot: opt.translationRoot or undefined
      icon: opt.icon
    }
    return options

  #If a field is required by its metadata or with the view helper definition, a * is return.
  optionsHelpers.required = (opt, metadata)->
    required = undefined
    if opt.isRequired?
      required = if opt.isRequired then "*" else undefined
    else if metadata.required?
      required = if opt.isRequired then "*" else undefined
    return required
  
  # If a symbol is define in the metadata or in the view helper, it will be display.
  optionsHelpers.symbol = (opt, metadata)->
    symbol = undefined
    if opt.symbol?
      symbol = opt.symbol
    else if metadata.symbol?
      symbol = metadata.symbol
    return symbol
  
  #Process the datatype, mainly use into html5 fields.
  optionsHelpers.dataType = (opt, metadata)->
    dataType = opt.dataType or domain.type or "text"
    if dataType is "boolean"
      dataType = "checkbox"
    else if dataType is "date"  
      (dataType = "text") if not isDateHTML5
    return dataType

  # Process the readonly attribute
  optionsHelpers.readonly = (opt, metadata)->
    readonly = opt.readonly or false
    readonly = if readonly then "readonly" else ""
  
  # Check if a field is disable or not. 
  optionsHelpers.disabled = (opt, metadata)->
    disabled = opt.disabled or false
    disabled = if disabled then "disabled" else ""
  
  #Formsize processing: label, input.
  optionsHelpers.formSize = (opt, metadata)->
    size = {}
    # Process the label size.
    size.label = if opt.isNoLabel then 0 else if opt.labelSize then opt.labelSize else defaultLabelSize
    # Process the input size.
    if opt.containerCss
      size.input = ""
    else
      size.input  = gridSize - size.label
    return size
  #Define if an input needs a addon.
  optionsHelpers.isAddOnInput = (opt, metadata)->
    return true or opt.icon? or ((opt.isRequired || metadata.required)) is true or ((opt.symbol || metadata.symbol))?


    return size
  
  # All methods which has to be displayed to the module.
  mod = {
    guid: guid,
    processField: process
  }
  if isInBrowser
    NS.Helpers = NS.Helpers or {}
    NS.Templates.helpers = mod
  else
    module.exports = mod
)(if typeof module is 'undefined' and typeof window isnt 'undefined' then window.Fmk else module.exports)