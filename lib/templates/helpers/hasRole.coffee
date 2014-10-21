# Check if the user has a role.
### Example:
  {{#hasRole "ROLE_NON_EXISTANT"}}
    <div>HTML code</div>
  {{/hasRole}}
###
Handlebars.registerHelper "hasRole", (property, options)->
  if _.isString(property) and Fmk.Helpers.userHelper.hasRole(property)
    return options.fn(this)
