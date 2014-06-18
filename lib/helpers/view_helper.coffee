# Put your handlebars.js helpers here.
# Globals variables.
# Get the domains definition as globals.

metadaBuilder = Fmk.Helpers.metadataBuilder# require('./metadata_builder').metadataBuilder
domains_definition = Fmk.Helpers.metadataBuilder.getDomains()

Handlebars.registerHelper 'pick', (val, options) ->
  return options.hash[val]

#use in order to use the translation system in the view.
Handlebars.registerHelper "t", (i18n_key, options) ->
  opt = options.hash or {}
  suffix =  opt.suffix or ""
  prefix = opt.prefix or ""
  maxLength = opt.max
  (i18n_key = this[i18n_key]) if opt.keyInContext is true
  result = i18n.t("#{prefix}#{i18n_key}#{suffix}")
  if maxLength? and maxLength < result.length then result = "#{result.slice(0,+maxLength)}..."
  new Handlebars.SafeString(result)

#use in order to debug a template.
Handlebars.registerHelper "debug", (optionalValue) ->
  console.log "Current Context"
  console.log "===================="
  console.log this
  if optionalValue
    console.log "Value"
    console.log "===================="
    console.log optionalValue   

###------------------------------------------- FORM FOR THE INPUTS -------------------------------------------###
Handlebars.registerHelper "display_for", (property, options) ->
  options = options or {}
  opt = options.hash or {}
  modelName = this.modelName or opt.modelName or undefined
  container = _.extend(this, {modelName: modelName})
  metadata = metadaBuilder.getMetadataForAttribute(container,property)
  domain =  Fmk.Helpers.metadataBuilder.getDomains()[metadata.domain] or {}
  translationRoot = opt.translationRoot or undefined
  dataType = opt.dataType or domain.type or "text"
  (dataType = "checkbox") if dataType is "boolean"
  containerAttribs = opt.containerAttribs or ""
  containerCss = opt.containerCss or ""
  labelSizeValue = if opt.isNoLabel then 0 else if opt.labelSize then opt.labelSize else 4
  labelSize = "col-sm-#{labelSizeValue} col-md-#{labelSizeValue} col-lg-#{labelSizeValue}"
  col = if opt.col? then Handlebars.helpers.col.call(this, opt.col) else ""
  noHtml = if opt.noHtml? then opt.noHtml else false
  noGrid = if opt.noGrid? then opt.noGrid else false
  htmlId = if opt.htmlId? then "id='#{opt.htmlId}'" else ""
  linkTo = if opt.linkTo? then opt.linkTo else ""
  #Generate link
  linkOpen = () => 
    if linkTo then return "<a href='#{linkTo}' data-bypass>" else return ""
  linkClose = () =>
    if linkTo then return "</a>" else return ""
  #Deal with the inputSize
  inputSize = ()=>
    #When it's a checkbox from BootstrapSwitch the input size is equal to zero.
    if noGrid or opt.containerCss
      inputSize = ""
    else
      inputSizeValue = 12 - labelSizeValue
      inputSize = opt.inputSize or "col-sm-#{inputSizeValue} col-md-#{inputSizeValue} col-lg-#{inputSizeValue}"
  
  #Get the value of the transalated label.
  translationKey =()=>
    translation = opt.translationKey or metadata.label or ("#{this['modelName']}.#{property}" if this['modelName']?) or ""
    if translationRoot?
      translation = ((if (translationRoot?) and typeof translationRoot is "string" then translationRoot + "." else "")) + property
    return if(translation is "") then "" else i18n.t(translation)
  #compute the label
  label = ()=>
    if opt.isNoLabel?
      return ""
    else if noHtml
      return "#{translationKey()}"
    else
      return "<label class='control-label #{labelSize}' for='#{property}'>#{translationKey()}</label>" 
  #Get the value of the property
  propertyValue =  ()=>
    metadataClass = if metadata.style? then metadata.style else ""
    #console.log "metadataClass", metadataClass
    if this[property]?
      propValue = this[property]
      if opt.listKey?
        key = this[property]
        value = _.findWhere(_this[opt.listKey], {code:_this[property]})
        if not value?
           value = _.findWhere(_this[opt.listKey], {id:_this[property]})
        if value?
          propValue = if opt.labelProperty then value[opt.labelProperty] else value.label
        else
          propValue = undefined
      if noHtml
        return "#{_.escape(propValue)}"
      if metadata.format? and  metadata.format.value?
        #console.log("format", metadata.format(), "value", propValue)
        propValue =  metadata.format.value(propValue, metadata.format.options)
      if metadata.symbol?
        propValue = propValue + " " + i18n.t(metadata.symbol)
      if dataType is "checkbox"
         propValue = if this[property] then i18n.t("search.labels.true") else i18n.t("search.labels.false")
      if dataType is "date" and this[property] isnt ""
        return "<div #{htmlId} class='#{metadataClass}'>#{propValue}</div>"
      else return "<div #{htmlId} class='#{metadataClass}'>#{linkOpen()}#{_.escape(propValue)}#{linkClose()}</div>"
    return ""
  if noHtml then return new Handlebars.SafeString("#{label()} #{propertyValue()}")
  html = "<div class='form-group #{col}'>
            #{label()}
            <div class='#{inputSize()} #{containerCss}' #{containerAttribs}>
              <div class='form-control-static'>#{propertyValue()}</div>
            </div>
          </div> "
  return new Handlebars.SafeString(html)
  
Handlebars.registerHelper "returns_if_contains", (property, options) =>
  opt = options.hash or {}
  value=opt.value
  if _.contains(property, value) 
    return opt.return
  return ''

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
  errorValue = if @errors? and @errors[property]? then @errors[property] else ""
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
      html = " <input id='#{property}' #{decorator()} class=''"
      html += "data-name='#{property}' type='#{dataType}' #{inputAttributes} #{placeholder} #{propertyValue()} #{readonly} #{disabled}/>"
  else
      html = "
              <div class='form-group #{error} #{col}'>
                #{label()}
                <div class='#{inputSize()} #{containerCss}' #{containerAttribs}>
                    <div class='#{if isAddOnInput then 'input-group' else ""}'>
                   #{icon()}
                  <input id='#{property}' #{decorator()} class='"
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
  errorValue = if @errors? and @errors[property]? then @errors[property] else ""
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
  errorValue = if @errors? and @errors[property]? then @errors[property] else ""
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

# Format a date using moment.js.
Handlebars.registerHelper "dateFormat",(_date, options) ->
  formatedDate = ''
  if _date
    opt = options.hash or {}
    format = opt.format or require('../config').dateFormat# Todo: reenable or require('./configuration').getConfiguration().format.date
    formatedDate = moment(_date).format(format)
  new Handlebars.SafeString(formatedDate)

#S4  
S4 = ->
  (((1 + Math.random()) * 0x10000) | 0).toString(16).substring 1

#Generate a pseudo-GUID by concatenating random hexadecimal.
guid = ->
  S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4()

# Example => button "transalationKey", icon="heart" id="12" class="btn-danger" type="submit"
Handlebars.registerHelper "button",(text_key, options) ->
  #console.log "button", i18n.t(text_key)
  opt = options.hash or {}
  if opt.role  isnt undefined and !Fmk.Helpers.userHelper.hasRole(opt.role)
    return ""
  isLoading =  opt.isLoading
  cssClass = opt.class or ""
  cssId = opt.id or guid()
  dataAttributes = opt.dataAttributes or "" 
  type = opt.type or "button"
  loading = ->
    if isLoading or type is 'submit'
      return "data-loading data-loading-text='#{opt.loadingText or i18n.t('button.loading')}'"
    return ""
  icon = ()->
     if opt.icon? then "<i class='fa fa-fw fa-#{opt.icon}'></i>" else ""
  button = "<button type='#{type}' #{dataAttributes} class='btn #{cssClass}' id='#{cssId}' #{loading()}>#{icon()} #{if text_key isnt '' then i18n.t(text_key) else ''}</button>"
  new Handlebars.SafeString(button)

# display pagination on table 
# consume an object in the this which is : 
# `{currentPage: currentPage, firstPage: firstPage, totalPages: totalPages, perPage: perPage, totalRecords: totalRecords}`
Handlebars.registerHelper "paginate", (property, options)->
  options = options or {}
  options = options.hash or {}
  return "" if not @collection?
  return "" if @collection? and @collection.length is 0
  currentPage = this.currentPage
  firstPage = this.firstPage or 1
  endPage = (this.totalPages or 0)
  perPage = this.perPage or 10
  totalRecords = this.totalRecords
  generateLeftArrow = ()->
    className = if currentPage is firstPage then "disabled" else ""
    return "<li class='#{className}'><a href='#' data-bypass data-page='#{firstPage}'>&laquo;</a></li>"
  generatePageNumber= ()->
    html = ""
    (html+= "<li class='#{if i is currentPage then 'active' else ''}'><a href='#' data-bypass data-page='#{i}'>#{i}</a></li>") for i in [firstPage..endPage]
    return html
  generateRigthArrow = ()->
    className = if currentPage is endPage then "disabled" else ""
    return "<li class='#{className}'><a href='#' data-bypass  data-page='#{endPage}'>&raquo;</a></li>"
  generatePagination = ->
    return "" if totalRecords <= perPage
    return "#{generateLeftArrow()}#{generatePageNumber()}#{generateRigthArrow()}"
  generatePageFilter = ()->
    pageString = i18n.t("application.pages")
    generateOptions = ()->
      html = ""
      for i in [1..4]
        html += "<option value='#{5*i}' #{if 5*i is perPage then 'selected'}>#{5*i} #{pageString}</option>"
      return html
      
    return "<select class='form-control pageFilter'>
              #{generateOptions()} 
            </select>"
  generateTotal = ()->
    resultString = i18n.t('search.result')
    return if options.showResultNumber then "<div class='badgeResult'>#{resultString} <span class='badge'>#{totalRecords}</span></div>" else ""
    
  html = "<div class='col-md-8'>
            <ul class='pagination'>#{generatePagination()}</ul>
          </div>
          <div class='col-md-2 pagination'>
            #{generateTotal()}
          </div>
          <div class='col-md-2 pagination'>
            #{generatePageFilter()}
          </div>"
  return new Handlebars.SafeString(html)

# `{totalRecords: totalRecords}`
Handlebars.registerHelper "tableHeaderAction", (options)->
  options = options or {}
  options = options.hash or {}
  totalRecords = this.totalRecords or 0
  resultString = i18n.t(options.resultLabel or 'search.result')
  exportButton = ->
    if options.exportUrl?
      return "
        <div class='pull-right export'>
          <button   data-bypass class='btn btnExport'><i class='fa fa-table'></i>#{i18n.t('search.export')}</button>
          <a href='#{options.exportUrl}' data-bypass class='btn hidden btnExport'><i class='fa fa-table'></i> #{i18n.t('search.export')}</a>
        </div>
        "
    return ""
  generateTotal = ()->
    return "<span class='badge'>#{totalRecords}</span> #{resultString}"
  html = "<div class='tableAction'>
            <div class='pull-left'>
                #{generateTotal()}
            </div>
            #{exportButton()}
          </div>"
  return new Handlebars.SafeString(html)

# display sort icon on table column
# `{sortField: sortField, order: order, modelName: modelName}`
Handlebars.registerHelper "sortColumn", (property, options)->
  options = options.hash or {}
  sortField = this.sortField
  order = this.order || "asc"
  translationKey = options.translationKey or undefined
  generateSortPosition= ()->
    icon = "fa fa-sort"
    if property is sortField
      icon+= "-" + order
    return "<i class='#{icon}' data-name='#{property}'></i>"
  if this.isEdit
    return new Handlebars.SafeString("<span class='sortColumn'>#{i18n.t(translationKey)}</span>")
  new Handlebars.SafeString("<a class='sortColumn'  href='#' data-name='#{property}' data-bypass>#{i18n.t(translationKey)} #{if this.isEdit then '' else generateSortPosition()}</a>")

Handlebars.registerHelper "statusIcon", (property, options)->
  if typeof(this[property] == "boolean")
    if this[property] then icon = "fa fa-check" else icon = "fa fa-exclamation"
  else switch this[property]
    when 0 then icon = "fa fa-ban";
    when 1 then icon = "fa fa-exclamation";
    when 2 then icon = "fa fa-clock-o";
    when 3 then icon = "fa fa-check";
    else icon = ""
  return new Handlebars.SafeString("<i class='#{icon}'><i>");

# Helper in order to display a progress bar.
Handlebars.registerHelper "progress", (property, options)->
  #Add each element of the property
  addElements = (elements)->
    html = ""
    sum = 0
    elements.forEach((elt)->
      if(not _.isEmpty(elt))
        sum+= elt.value 
    )
    elements.forEach((elt)->
      if(not _.isEmpty(elt))
        html += "<div class='progress-bar progress-bar-#{elt.type}' style='width: #{Math.floor(elt.value*100/sum)}%'>
          #{elt.label}
        </div>"
    )
    #console.log "progress", html
    return html
  return new Handlebars.SafeString("<div class='progress'>#{addElements(@[property])}</div>")

# Check if the user has one role.
### Example:
  {{#hasOneRole "ROLE1,ROLE2"}}
    <div>HTML code</div>
  {{/hasOneRole}}
###
Handlebars.registerHelper "hasOneRole", (property, options)->
  if _.isString(property)
    roles = property.split(',')
    if Fmk.Helpers.userHelper.hasOneRole(roles)
      return options.fn(this)

# Check if the user has a role.
### Example:
  {{#hasRole "ROLE_NON_EXISTANT"}}
    <div>HTML code</div>
  {{/hasRole}}
###
Handlebars.registerHelper "hasRole", (property, options)->
  if _.isString(property) and Fmk.Helpers.userHelper.hasRole(property)
    return options.fn(this)
    
# Generate the bootstrap css classes for the grid.
### Example
  {{col "6"}}
###
Handlebars.registerHelper "col", (property)->
  return "col-xs-#{property} col-sm-#{property} col-md-#{property} col-lg-#{property}"


# Redefinition of the each. Add an option in order to extend the context of the element inside the each loop.
# parentKeys
### Example
    {{each collectionProperty}}
    {{each collectionProperty parentKeys="prop1,prop2"}}

    {{each object}}
        {{this.key}} : {{this.value}}
    {{/each}}
###
Handlebars.registerHelper "each", (context, options)->
  options = options or {}
  opt = options.hash or {}
  ret = "";
  parentProperties = undefined
  if opt.parentKeys?
    parentProperties = _.pick(this, opt.parentKeys.split(','))
    #console.log(opt.parentKeys, parentProperties)
  context = context or []
  if _.isArray(context)
      for elem in (context or [])
        ctx = _.extend(elem, parentProperties)
        ret = ret + options.fn(ctx)
  else if _.isObject(context)
    for elem of (context or {})
        ctx = {key: elem, value :_.extend(context[elem], parentProperties)}
        ret = ret + options.fn(ctx)
  return ret

Handlebars.registerHelper "introspect", (property, options) ->
  options = options or {}
  opt = options.hash or {}
  isDisplay = if opt.isDisplay? then opt.isDisplay else true
  helperName = if isDisplay then "display_for" else "input_for"
  modelName = this.modelName or property or opt.modelName or undefined
  container = _.extend(this, {modelName: modelName})
  metadatas = Fmk.Helpers.metadataBuilder.getMetadatas(container) or {}
  html = ""
  for prop of metadatas
    if container[prop]?
      html =  html + Handlebars.helpers[helperName].call(container, prop, {hash: {col: 12}})
  return new Handlebars.SafeString(html)


# Currency helper in order to have a vizualization for the currency.
## Todo: reenable when number format is needed..
###Handlebars.registerHelper "currency",(property, options) ->  
  currencySymbol = ''
  value = ''
  if (+this[property])? or +this[property] is 0
    value = +this[property]
  if typeof value is 'number'
    value = numeral(value).format(require('./configuration').getConfiguration().format.currency) if value isnt ''#value.toFixed('2') 
    new Lawnchair({name: 'products'}, $.noop).get('currency', (curr)-> currencySymbol = curr.currencySymbol)
  html = "<div class='currency'><div class='right'>#{value} #{currencySymbol}</div></div>"
  new Handlebars.SafeString(html)###