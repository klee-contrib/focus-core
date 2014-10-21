###
**edit_for** creates a field in edition based on its metdatas.
*Filename: lib/templates/view_helper/edit_for.coffee
###

# Dependencies
optionsParser = require './common/options_parser'

class EditFor
  initialize: (@context, options) ->
    @opt = optionsParser(options)

# Pick a data.
Handlebars.registerHelper 'edit_for', (val, options) ->
  # Initialization of the helper
  context = this
  opt = optionsParser(options)
  metadats = context.metdatas
