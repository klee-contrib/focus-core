# Filename: lib/templates/view_helper/translate.coffee
#Use this helper in order to use the translation system in the view. It has a dependency on i18next.js.
#use in order to use the translation system in the view.
Handlebars.registerHelper "t", (i18n_key, options) ->
  opt = options.hash or {}
  suffix =  opt.suffix or ""
  prefix = opt.prefix or ""
  maxLength = opt.max
  (i18n_key = this[i18n_key]) if opt.keyInContext is true

  params = if opt.params? then opt.params.split(',') else undefined
  #console.log(opt.params, _.pick.apply(@, params));
  params = if params? then _.pick.apply(@, params) else undefined
  result = i18n.t("#{prefix}#{i18n_key}#{suffix}", params)
  if maxLength? and maxLength < result.length then result = "#{result.slice(0,+maxLength)}..."
  new Handlebars.SafeString(result)
###
Example call: (inside an hbs file)
	{{t "contact.firstName"}}
###