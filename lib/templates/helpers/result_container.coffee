###
  Create the default container for search results.
  Example:
    {{result_container}}
###
Handlebars.registerHelper "result_container", (i18n_key, options)->
  options = options or {}
  opt = options.hash or {} 
  #Default width
  width = opt.width or 12
  html = "<div id='results' class='#{Handlebars.helpers.col.call(this, width)}}'></div>"
  return new Handlebars.SafeString(html)