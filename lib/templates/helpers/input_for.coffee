metadaBuilder = Fmk.Helpers.metadataBuilder# require('./metadata_builder').metadataBuilder
domains_definition = Fmk.Helpers.metadataBuilder.getDomains()
logger = new Logger()

Handlebars.registerHelper "input_for", (property, options) ->
  options = options or {}
  #Initialize the variables which are options
  html = undefined
  translationRoot = undefined
  dataType = undefined
  #Read all the options if they exists
  opt = options.hash or {}
  modelName = this.modelName or opt.modelName or undefined
  container = _.extend(this, {modelName: modelName})
  metadata = Fmk.Helpers.metadataBuilder.getMetadataForAttribute(container,property)
  #console.log "metadata",metadata
  domain = Fmk.Helpers.metadataBuilder.getDomains()[metadata.domain] or {}
  #console.log "domain", domain
  minimalHtml = if opt.minimalHtml? then opt.minimalHtml else false
  noGrid = if opt.noGrid then opt.noGrid else false
  dataFields = (context)->
    subHTML = ""
    if opt.dataFields
      fieldNames = opt.dataFields.split(',')
      fieldNames.forEach((fieldName)->
        if context[fieldName]
          subHTML = subHTML + "data-#{fieldName}='#{context[fieldName]}'"
      )        
    return subHTML
  isDisplayRequired = false
  isRequired = ()=>
    isDisplayRequired = false
    if opt.isRequired?
      isDisplayRequired = opt.isRequired
    else if metadata.required?
      isDisplayRequired = metadata.required
    return if isDisplayRequired then "<span class='input-group-addon'>*</span>" else ""
  symbol = ()=>
    isSymbol = false
    #console.log(metadata, isSymbol)
    if opt.symbol?
      isSymbol = opt.symbol
    else if metadata.symbol?
      isSymbol = metadata.symbol

    return if isSymbol then "<span class='input-group-addon'>#{isSymbol}</span>" else ""
  #isRequired = if !opt.isRequired? or !opt.isRequired then "" else "<span class='input-group-addon'>*</span>"
  translationRoot = opt.translationRoot or undefined
  dataType = opt.dataType or domain.type or "text"
  (dataType = "checkbox") if dataType is "boolean"
  readonly = opt.readonly or false
  readonly = if readonly then "readonly" else ""
  disabled = opt.disabled or false
  disabled = if disabled then "disabled" else ""
  inputAttributes= this[opt.inputAttributes] or opt.inputAttributes or ""
  cidAttr = if opt.cidSelection = true then "cid='#{@cid}'" else ""
  #Add bootstrap-switch css to checkbox input.
  containerAttribs = opt.containerAttribs or ""
  containerCss = opt.containerCss or ""
  labelSizeValue = if opt.isNoLabel then 0 else if opt.labelSize then opt.labelSize else 4
  labelSize = "col-sm-#{labelSizeValue} col-md-#{labelSizeValue} col-lg-#{labelSizeValue}"
  col = if opt.col? then Handlebars.helpers.col.call(this, opt.col) else ""
  #Deal with the inputSize
  inputSize = ()=>
    #When it's a checkbox from BootstrapSwitch the input size is equal to zero.
    if noGrid or opt.containerCss
      inputSize = ""
    else
      inputSizeValue = 12 - labelSizeValue
      inputSize = opt.inputSize or "col-sm-#{inputSizeValue} col-md-#{inputSizeValue} col-lg-#{inputSizeValue}"
  # Define all the case where there is an input addon.
  # todo:pbn maybe remove the isAddOnInput because there if ther is a mix of symbol and no symbol the input size is different.
  isAddOnInput = true or opt.icon? or ((opt.isRequired || metadata.required)) is true or ((opt.symbol || metadata.symbol))?
  #Get the value of the property
  propertyValue =  ()=>
    if this[property]?
      propValue = this[property]
      if metadata.format? and metadata.format.value?
        #console.log("format", metadata.format(), "value", propValue)
        propValue =  metadata.format.value(propValue, metadata.format.options)
      if dataType is "checkbox"
        if propValue then return 'checked'
      if dataType is "date" and propValue isnt ""
        return "value='" + propValue + "'"
      if dataType is "number"
        return "value='" + numeral(propValue).value() + "'" 
      else return "value='#{_.escape(propValue)}'"
    ""
  #Get the value of the translated label.
  translationKey =()=>
    translation = opt.translationKey or metadata.label or ("#{this['modelName']}.#{property}" if this['modelName']?) or ""
    if translationRoot?
      translation = ((if (translationRoot?) and typeof translationRoot is "string" then translationRoot + "." else "")) + property
    
    return if(translation is "") then "" else i18n.t(translation)
   
  #Deal with the icon case
  icon = ()=>  
    #<span class='glyphicon glyphicon-#{opt.icon}'></span>
    if opt.icon? then "<span class='input-group-addon'><i class='fa fa-#{opt.icon}  fa-fw'></i> </span>" else ""
  #Deal with the label
  label = ()=>
    if opt.isNoLabel?
      return ""
    else
      return "<label class='control-label #{labelSize}' for='#{property}'>#{translationKey()}</label>"
    #if not opt.isNoLabel? then "<label class='control-label #{labelSize}' for='#{property}'> #{translationKey} </label>" else ""
  #By default there is a placeholder or if the preperty is true.
  placeholder = if (!opt.placeholder? and opt.isNoLabel) or opt.placeholder then "placeholder='#{translationKey()}'" else ""
  #console.log "placeholder", placeholder, (!opt.isNoLabel? or !opt.isNolabel)
  
  decorator = ()=>
    if metadata.decorator?
      return "data-decorator='#{metadata.decorator}'"
    else
      return ''
  
  #Initialize the errors variables => Is there an error, if yes what is the message.
  error = ""
  error = "has-error" if @errors? and @errors[property]?
  errorValue = if @errors? and @errors[property]? then i18n.t(@errors[property]) else ""
  errorSize = ()=>
    errorLength = 12 - labelSizeValue
    offsetError = labelSizeValue
    return "col-sm-#{errorLength} col-md-#{errorLength} col-lg-#{errorLength} col-sm-offset-#{offsetError} col-md-offset-#{offsetError} col-lg-offset-#{offsetError}"
  #Deal with error
  errors = ()=>
    if error == "has-error" then "<span class='#{error} #{errorSize()} help-inline pull-left' style='color:#b94a48'> #{errorValue } </span>" else ""
  #Build the html tag.
  # <div class="form-group">
  #     <label for="exampleInputEmail">Email address</label>
  #     <input type="text" class="form-control" id="exampleInputEmail" placeholder="Enter email">
  #   </div>
  if minimalHtml 
      html = " <input id='#{property}' #{dataFields(@)} #{decorator()} class=''"
      html += "data-name='#{property}' type='#{dataType}' #{inputAttributes} #{cidAttr} #{placeholder} #{propertyValue()} #{readonly} #{disabled}/>"
  else
      html = "
              <div class='form-group #{error} #{col}'>
                #{label()}
                <div class='#{inputSize()} #{containerCss}' #{containerAttribs}>
                    <div class='#{if isAddOnInput then 'input-group' else ""}'>
                   #{icon()}
                  <input id='#{property}' #{decorator()} #{dataFields(@)} class='"
      if(dataType != "checkbox") then html +="form-control "
      html += "input-sm' data-name='#{property}' type='#{dataType}' #{inputAttributes} #{placeholder} #{propertyValue()} #{readonly} #{disabled}/>
                  #{symbol()}"
      if(dataType !="checkbox") then html +="              #{isRequired()}" else html+="              "
             
      html+="               </div> 
                        </div>
                #{errors()}
              </div>
            "
  new Handlebars.SafeString(html)
