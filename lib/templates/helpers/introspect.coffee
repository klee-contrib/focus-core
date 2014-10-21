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
    #if container[prop]?
    html =  html + Handlebars.helpers[helperName].call(container, prop, {hash: {col: 12}})
  return new Handlebars.SafeString(html)