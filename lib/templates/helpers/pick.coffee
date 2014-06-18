# Filename: lib/templates/view_helper/pick.coffee
# Pick a data.
Handlebars.registerHelper 'pick', (val, options) ->
  return options.hash[val]