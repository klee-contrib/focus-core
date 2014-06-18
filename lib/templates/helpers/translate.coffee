# Filename: lib/templates/view_helper/translate.coffee
#Use this helper in order to use the translation system in the view. It has a dependency on i18next.js.
Handlebars.registerHelper "t", (i18n_key, options) ->
  opt = options.hash or {}
  maxLength = opt.max
  result = i18n.t(i18n_key)
  if maxLength? and maxLength < result.length then result = "#{result.slice(0,+maxLength)}..."
  new Handlebars.SafeString(result)
###
Example call: (inside an hbs file)
	{{t "contact.firstName"}}
###