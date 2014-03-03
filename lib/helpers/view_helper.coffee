# Put your handlebars.js helpers here.
# Globals variables.
# Get the domains definition as globals.
domains_definition = require('./domains')

Handlebars.registerHelper 'pick', (val, options) ->
	return options.hash[val]

#use in order to use the translation system in the view.
Handlebars.registerHelper "t", (i18n_key, options) ->
  opt = options.hash or {}
  maxLength = opt.max
  result = i18n.t(i18n_key)
  if maxLength? and maxLength < result.length then result = "#{result.slice(0,+maxLength)}..."
  new Handlebars.SafeString(result)

#Display the value of an element.
Handlebars.registerHelper "display_for", (property, options) ->
  opt = options.hash or {}
  maxLength = opt.max
  if this[property]? then result = this[property] else return ""
  #console.log 'displayFor', this, 'result ', result, 'max', maxLength
  
  #Reduce a string only if it exceed the max. And add .... .
  reduce = (s, max)->
    if s.length > max then "#{s.slice(0,+maxLength)}... " else "#{s} "
  if maxLength? and result?
    str = ""
    str += reduce(res, maxLength) for res in result.split(' ')
    return new Handlebars.SafeString(str)
  return new Handlebars.SafeString(result)


#use in order to debug a template.
Handlebars.registerHelper "debug", (optionalValue) ->
  console.log "Current Context"
  console.log "===================="
  console.log this
  if optionalValue
    console.log "Value"
    console.log "===================="
    console.log optionalValue
# Get the metadatad for a property.
getMetadataFor = (property, context)->
  metadata = {}
  if context?
    if context['metadatas']?
      md = context['metadatas'][property]
    if not md? and domains_definition?
      domainOfModel = domains_definition[context['modelName']];
      if domainOfModel?
        md = {metadata : domainOfModel[property]}
    if md?
      # First copy the "globals" metadata
      _.extend(metadata, md.metadata) if md.metadata?
      # Extend the "overriden" metadatas
      _.extend(metadata, {required: md.required}) if md.required?
      _.extend(metadata, {label: md.label}) if md.label?
      _.extend(metadata, {domain: md.domain}) if md.domain?
      #console.log "property", property,"metadata", metadata
  return metadata
   

###------------------------------------------- FORM FOR THE INPUTS -------------------------------------------###
Handlebars.registerHelper "input_for", (property, options) ->
  #Initialize the variables which are options
  html = undefined
  translationRoot = undefined
  dataType = undefined
  #Read all the options if they exists
  opt = options.hash or {}
  metadata = getMetadataFor(property, this)
  domain = domains_definition[metadata.domain] or {}
  #console.log "domain", domain
  isDisplayRequired = false
  isRequired = ()=>
    isDisplayRequired = false
    if opt.isRequired?
      isDisplayRequired = opt.isRequired
    else if metadata.required?
      isDisplayRequired = metadata.required
    return if isDisplayRequired then "<span class='input-group-addon'>*</span>" else ""
  #isRequired = if !opt.isRequired? or !opt.isRequired then "" else "<span class='input-group-addon'>*</span>"
  translationRoot = opt.translationRoot or undefined
  dataType = opt.dataType or domain.type or "text"
  (dataType = "checkbox") if dataType is "boolean"
  readonly = opt.readonly or false
  readonly = if readonly then "readonly" else ""
  disabled = opt.disabled or false
  disabled = if disabled then "disabled" else ""
  inputAttributes= opt.inputAttributes or ""
  #Add bootstrap-switch css to checkbox input.
  containerAttribs = opt.containerAttribs or ""
  containerCss = opt.containerCss or ""
  labelSizeValue = if opt.isNoLabel then 0 else if opt.labelSize then opt.labelSize else 4
  labelSize = "col-sm-#{labelSizeValue} col-md-#{labelSizeValue} col-lg-#{labelSizeValue}"
  #Deal with the inputSize
  inputSize = ()=>
    #When it's a checkbox from BootstrapSwitch the input size is equal to zero.
    if opt.containerCss
      inputSize = ""
    else
      inputSizeValue = 12 - labelSizeValue
      inputSize = opt.inputSize or "col-sm-#{inputSizeValue} col-md-#{inputSizeValue} col-lg-#{inputSizeValue}"

  isAddOnInput = opt.icon? or (opt.isRequired || metadata.required) is true
  #Get the value of the property
  propertyValue =  ()=>
    if this[property]?
      if dataType is "checkbox"
        if this[property] then return 'checked'
      if dataType is "date" and this[property] isnt ""
        formatedDate = moment(this[property]).format("YYYY-MM-DD")
        return "value='" + formatedDate + "'"
      else return "value='#{_.escape(this[property])}'"
    "" 
  #Get the value of the transalated label.
  translationKey =()=>
    translation = metadata.label or ("#{this['modelName']}.#{property}" if this['modelName']?) or ""
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
  placeholder = if !opt.placeholder? or opt.placeholder then "placeholder='#{translationKey()}'" else ""
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
  html = "
          <div class='form-group #{error}'>
            #{label()}
            <div class='#{if isAddOnInput then 'input-group' else ""} #{inputSize()} #{containerCss}' #{containerAttribs}>
               #{icon()}
              <input id='#{property}' class='form-control input-sm' data-name='#{property}' type='#{dataType}' #{inputAttributes} #{placeholder} #{propertyValue()} #{readonly} #{disabled}/>
              #{isRequired()}
            </div>
            #{errors()}
          </div>
        "
  new Handlebars.SafeString(html)

#Generate a optionset selector. https://developer.mozilla.org/en-US/docs/Web/API/HTMLSelectElement
Handlebars.registerHelper "options_selected", (property, options) ->
  opt = options.hash or {}
  optName = if opt.optName? then "data-name='#{opt.optName}'" else ""
  optToTriggerName = if opt.optToTriggerName? then "data-opttotrigger-name='#{opt.optToTriggerName}'" else ""
  optToTriggerListKey = if opt.optToTriggerListKey? then "data-opttotrigger-listkey='#{opt.optToTriggerListKey}'" else ""
  optMapping = if opt.optMapping? then this[opt.optMapping] else null
  dataMapping = if optMapping? then "data-mapping=#{optMapping}" else ""
  list = this[opt.listKey] or []
  selected = this[property] or opt.selected or undefined
  if(opt.addDefault)
    list =[{id: undefined, label: ''}].concat(list)
  metadata = getMetadataFor(property, this)
  domain = domains_definition[metadata.domain] or {}
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
  inputSizeValue = 12 -labelSizeValue
  inputSize = opt.inputSize or "col-sm-#{inputSizeValue} col-md-#{inputSizeValue} col-lg-#{inputSizeValue}"
  #Get the value of the transalated label.
  #Get the value of the transalated label.
  translationKey =()=>
    translation = metadata.label or ("#{this['modelName']}.#{property}" if this['modelName']?) or ""
    if translationRoot?
      translation = ((if (translationRoot?) and typeof translationRoot is "string" then translationRoot + "." else "")) + property
    
    return if(translation is "") then "" else i18n.t(translation)
  icon = ()=>  
  #<span class='glyphicon glyphicon-#{opt.icon}'></span>
    if opt.icon? then "<span class='input-group-addon'><i class='fa fa-#{opt.icon} fa-fw'></i> </span>" else ""
    #if opt.icon? then "<span class='input-group-addon'> <span class='glyphicon glyphicon-#{opt.icon}'></span></span>" else ""
  isAddOnInput = opt.icon? or (opt.isRequired || metadata.required) is true
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
    id = elt.id
    prop = elt.label
    isSelected = if selected? and id? and id.toString() is selected.toString() then "selected" else ""
    html+= "<option value= '#{id}' data-name='#{property}' #{isSelected}>#{prop}</option>"
    return undefined
  #Initialize the html  
  html = "<div class='form-group #{error}'>
            #{label()}
            <div class='controls #{inputSize}'>
              <div class='input-group'>
                #{icon()}                
                <select id='#{property}' #{readonly} #{optName} #{optToTriggerName} #{optToTriggerListKey} #{dataMapping} class='form-control input-sm'>"
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
  isScript = if typeof opt.isScript is "undefined" then true else opt.isScript
  cssClass = opt.class or ""
  cssId = opt.id or guid()
  type = opt.type or "button"
  script = ()->
    if isScript and type is 'submit' then "<script type='text/javascript'>$('##{cssId}').on('click', function(){$(this).button('loading');});</script>" else ""
  icon = ()->
     if opt.icon? then "<i class='fa fa-fw fa-#{opt.icon}'></i>" else ""
  button = "<button type='#{type}' class='btn #{cssClass}' id='#{cssId}' data-loading-text='#{i18n.t('button.loading')}'>#{icon()} #{if text_key isnt '' then i18n.t(text_key) else ''}</button>#{script()}"
  new Handlebars.SafeString(button)

# display pagination on table 
# consume an object in the this which is : 
# `{currentPage: currentPage, firstPage: firstPage, totalPages: totalPages}`
Handlebars.registerHelper "paginate", (property, options)->
  options = options or {}
  options = options.hash or {}
  currentPage = this.currentPage
  firstPage = this.firstPage or 0
  endPage = (this.totalPages or 0) + firstPage
  generateLeftArrow = ()->
    className = if currentPage is firstPage then "disabled" else ""
    return "<li class='#{className}' data-page='#{firstPage}'><a href='#' data-bypass>&laquo;</a></li>"
  generatePageNumber= ()->
    html = ""
    (html+= "<li class='#{if i is currentPage then 'active' else ''}'><a href='#' data-bypass data-page='#{i}'>#{i}</a></li>") for i in [firstPage..endPage]
    return html
  generateRigthArrow = ()->
    className = if currentPage is endPage then "disabled" else ""
    return "<li class='#{className}' data-page='#{endPage}'><a href='#' data-bypass>&raquo;</a></li>"
  return new Handlebars.SafeString("<ul class='pagination'>#{generateLeftArrow()}#{generatePageNumber()}#{generateRigthArrow()}</ul>")

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
  return new Handlebars.SafeString("<a class='sortColumn' href='#' data-name='#{property}' data-bypass>#{i18n.t(translationKey)} #{generateSortPosition()}</a>")

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