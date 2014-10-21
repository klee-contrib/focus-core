Handlebars.registerHelper "radio_for", (property, options) ->
  options = options or {}
  #Initialize the variables which are options
  html = undefined
  translationRoot = undefined
  dataType = undefined
  #Read all the options if they exists
  opt = options.hash or {}
  metadata = Fmk.Helpers.metadataBuilder.getMetadataForAttribute(this,property)
  #console.log "metadata",metadata
  domain = Fmk.Helpers.metadataBuilder.getDomains()[metadata.domain] or {}
  #possible values for the radio group
  possibleValues = [] ;
  isDisplayRequired = false
  isRequired = ()=> 
    isDisplayRequired = false
    if opt.isRequired?
      isDisplayRequired = opt.isRequired
    else if metadata.required?
      isDisplayRequired = metadata.required
    return if isDisplayRequired then "" else generateRadioButton(i18n.t('search.labels.all'), "null", defaultValue == "")

  translationRoot = opt.translationRoot or undefined
  dataType = opt.dataType or domain.type or "text"
  #generate possible values or return classic input_for
  switch dataType
    when "boolean" then possibleValues = [true, false]
    else return "Type " + dataType + " not supported by helper radio_for"
  defaultValue = if opt.defaultValue != undefined then opt.defaultValue else ""
  readonly = opt.readonly or false
  readonly = if readonly then "readonly" else ""
  disabled = opt.disabled or false
  disabled = if disabled then "disabled" else ""
  inputAttributes= opt.inputAttributes or ""
  #Add bootstrap-switch css to checkbox input.
  containerAttribs = opt.containerAttribs or ""
  containerCss = opt.containerCss or ""
  labelSizeValue = if opt.isNoLabel then 0 else if opt.labelSize then opt.labelSize else 3
  labelSize = "col-sm-#{labelSizeValue} col-md-#{labelSizeValue} col-lg-#{labelSizeValue}"
  col = if opt.col? then Handlebars.helpers.col.call(this, opt.col) else ""
  radioSizeValue = opt.radioSize or 4
  radioSize = "col-sm-#{radioSizeValue} col-md-#{radioSizeValue} col-lg-#{radioSizeValue}"
  #Deal with the inputSize
  inputSize = ()=>
      inputSizeValue = 12 - labelSizeValue
      inputSize = opt.inputSize or "col-sm-#{inputSizeValue} col-md-#{inputSizeValue} col-lg-#{inputSizeValue}"
  #Deal with the label
  label = ()=>
    if opt.isNoLabel?
      return ""
    else
      return "<label class='control-label #{labelSize}' for='#{property}'>#{translationKey()}</label>"
  #Get the value of the transalated label.
  translationKey =()=>
    translation = opt.translationKey or   metadata.label or ("#{this['modelName']}.#{property}" if this['modelName']?) or ""
    if translationRoot?
      translation = ((if (translationRoot?) and typeof translationRoot is "string" then translationRoot + "." else "")) + property
    
    return if(translation is "") then "" else i18n.t(translation)
   
    #if not opt.isNoLabel? then "<label class='control-label #{labelSize}' for='#{property}'> #{translationKey} </label>" else ""
  #By default there is a placeholder or if the preperty is true.
  placeholder = if (!opt.placeholder? and opt.isNoLabel) or opt.placeholder then "placeholder='#{translationKey()}'" else ""
  #console.log "placeholder", placeholder, (!opt.isNoLabel? or !opt.isNolabel)
  
  #Checked by default
  checked = (value, isDefault) => 
    isChecked =  this[property] is value or ((not this[property]?) and isDefault) or false
    return if isChecked then "checked='checked'" else ""
  
  #Basic layout for radio button
  generateRadioButton = (label, value, isDefault) => 
    return "
    <div class='#{radioSize}'>
         <div class='input-group'>
             <span class='input-group-addon'>
                <input id='#{property + value}' name='#{property}' data-name='#{property}' type=radio value='#{value}' #{checked(value,isDefault)} #{inputAttributes} #{placeholder} #{readonly} #{disabled}/>      
             </span>
             <label for='#{property + value}' class='form-control'>
               #{label}
             </label>
          </div>
      </div>"
  
  #Deal with error
  #Initialize the errors variables => Is there an error, if yes what is the message.
  error = ""
  error = "has-error" if @errors? and @errors[property]?
  errorValue = if @errors? and @errors[property]? then i18n.t(@errors[property]) else ""
  errorSize = ()=>
    errorLength = 12 - labelSizeValue
    offsetError = labelSizeValue
    return "col-sm-#{errorLength} col-md-#{errorLength} col-lg-#{errorLength} col-sm-offset-#{offsetError} col-md-offset-#{offsetError} col-lg-offset-#{offsetError}"
  #create the radios
  radios = isRequired()
  radios += generateRadioButton(i18n.t('search.labels.'+value), value, value == defaultValue) for value in possibleValues
  
  errors = ()=>
    if error == "has-error" then "<span class='#{error} #{errorSize()} help-inline pull-left' style='color:#b94a48'> #{errorValue } </span>" else ""
  html = "
          <div class='form-group #{error} #{col}'>
            #{label()}
            <div class='#{inputSize()} #{containerCss}' #{containerAttribs}>
              #{radios}
              </div>
            #{errors()}
          </div>
        "
  new Handlebars.SafeString(html)