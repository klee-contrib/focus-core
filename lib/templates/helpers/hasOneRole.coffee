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
