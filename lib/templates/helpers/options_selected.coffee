metadaBuilder = Fmk.Helpers.metadataBuilder# require('./metadata_builder').metadataBuilder
domains_definition = Fmk.Helpers.metadataBuilder.getDomains()
logger = new Logger()

#Generate a optionset selector. https://developer.mozilla.org/en-US/docs/Web/API/HTMLSelectElement
Handlebars.registerHelper "options_selected", (property, options) ->
  options = options or {}
  opt = options.hash or {}
  cssClass = if opt.cssClass? then opt.cssClass else ""
  optName = if opt.optName? then "data-name='#{opt.optName}'" else ""
  optToTriggerName = if opt.optToTriggerName? then "data-opttotrigger-name='#{opt.optToTriggerName}'" else ""
  optToTriggerListKey = if opt.optToTriggerListKey? then "data-opttotrigger-listkey='#{opt.optToTriggerListKey}'" else ""
  optMapping = if opt.optMapping? then this[opt.optMapping] else null
  dataMapping = if optMapping? then "data-mapping=#{optMapping}" else ""
  list = this[opt.listKey] or []
  selected = this[property] or opt.selected or undefined
  if(opt.addDefault)
    list =[{id: undefined, label: ''}].concat(list)
  metadata = Fmk.Helpers.metadataBuilder.getMetadataForAttribute(this,property)
  domain = Fmk.Helpers.metadataBuilder.getDomains()[metadata.domain] or {}
  #console.log "domain", domain
  isRequired = ()=>
    isDisplayRequired = false
    if opt.isRequired?
      isDisplayRequired = opt.isRequired
    else if metadata.required?
      isDisplayRequired = metadata.required
    return if isDisplayRequired then "<span class='input-group-addon'>*</span>" else ""
  translationRoot = opt.translationRoot or undefined
  isAtLine = opt.isAtLine or false
  readonly = opt.readonly or false
  readonly = if readonly then "disabled" else ""
  labelSizeValue = if opt.isNoLabel then 0 else if opt.labelSize then opt.labelSize else 4
  labelSize = "col-sm-#{labelSizeValue} col-md-#{labelSizeValue} col-lg-#{labelSizeValue}"
  col = if opt.col? then Handlebars.helpers.col.call(this, opt.col) else ""
  
  inputSize = ()=>
    #When it's a checkbox from BootstrapSwitch the input size is equal to zero.
    if opt.containerCss
      inputSize = ""
    else
      inputSizeValue = 12 - labelSizeValue
      inputSize = opt.inputSize or "col-sm-#{inputSizeValue} col-md-#{inputSizeValue} col-lg-#{inputSizeValue}"
  #Get the value of the transalated label.
  #Get the value of the transalated label.
  translationKey =()=>
    translation = opt.translationKey or metadata.label or ("#{this['modelName']}.#{property}" if this['modelName']?) or ""
    if translationRoot?
      translation = ((if (translationRoot?) and typeof translationRoot is "string" then translationRoot + "." else "")) + property
    
    return if(translation is "") then "" else i18n.t(translation)
  icon = ()=>  
  #<span class='glyphicon glyphicon-#{opt.icon}'></span>
    if opt.icon? then "<span class='input-group-addon'><i class='fa fa-#{opt.icon} fa-fw'></i> </span>" else ""
    #if opt.icon? then "<span class='input-group-addon'> <span class='glyphicon glyphicon-#{opt.icon}'></span></span>" else ""
  isAddOnInput = true or opt.icon? or (opt.isRequired || metadata.required) is true
   #Deal with the label
  label = ()=>
    if not opt.isNoLabel?
      if isAtLine
        "<div class='row'><label class='control-label for='#{property}'> #{translationKey()} </label></div>"
      else
        "<label class='control-label #{labelSize}' for='#{property}'> #{translationKey()} </label>" 
    else ""
  #Initialize the errors variables => Is there an error, if yes what is the message.
  error = ""
  error = "has-error" if @errors? and @errors[property]?
  errorValue = if @errors? and @errors[property]? then i18n.t(@errors[property]) else ""
  #Deal with error
  errors = ()=>
    if error == "has-error" then "<span class='#{error} help-inline pull-left' style='color:#b94a48'> #{errorValue } </span>" else ""
  jsonGiven = this
  #We define a small addOption function in order to add an option to the select.
  addOption = (elt) ->
    id = elt.id or elt.code
    prop = if opt.labelProperty then elt[opt.labelProperty] else elt.label
    isSelected = if selected? and id? and ((!_.isArray(selected) and id.toString() is selected.toString()) or (_.isArray(selected) and selected.indexOf(id.toString()) > -1)) then "selected" else ""
    html+= "<option value= '#{id}'  #{isSelected}>#{prop}</option>"
    return undefined
  multiple = if opt.isMultiple then "multiple style='width:'resolve';'" else ""
  # Define 
  emptyOption = ->
    #
    isRequiredWithValue = selected? and ( isRequired() isnt "")
    if((opt.isEmpty is true) or ((opt.isMultiple is true) or (isRequiredWithValue is true)) and (not opt.isNotEmpty))
      return ""
    return "<option></option>"
    # Save the following information=> Edit mode with a value and display required => No empty option.
    #return "<option></option>" if ((not isEditAndRequired) and (not opt.isNotEmpty)) and (not opt.isMultiple)
  #Initialize the html  
  html = "<div class='form-group #{error} #{col}'>
            #{label()}
            <div class='controls #{inputSize()}'>
              <div class='input-group '>
                #{icon()}                
                <select id='#{property}' data-name='#{property}' #{multiple} #{readonly} #{optName} #{optToTriggerName} #{optToTriggerListKey} #{dataMapping} class='form-control input-sm #{cssClass}'>#{emptyOption()}"
  #add options foreach options in the list
  addOption(elt) for elt in list
  html +=      "</select>#{isRequired()} 
              </div>
              #{errors()}
            </div>
          </div>"  
  new Handlebars.SafeString(html)
