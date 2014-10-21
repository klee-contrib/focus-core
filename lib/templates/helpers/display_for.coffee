metadaBuilder = Fmk.Helpers.metadataBuilder# require('./metadata_builder').metadataBuilder
domains_definition = Fmk.Helpers.metadataBuilder.getDomains()
logger = new Logger()

Handlebars.registerHelper "display_for", (property, options) ->
  options = options or {}
  opt = options.hash or {}
  modelName = this.modelName or opt.modelName or {}
  container = _.extend(this, {modelName: modelName})
  metadata = if container.metadatas? and container.metadatas[property]? then container.metadatas[property] else {}#metadaBuilder.getMetadataForAttribute(container,property)
  if not metadata.domain? then logger.warn("There is no domain for your field named : #{property}", container)
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
