# Generate the bootstrap css classes for the grid.
### Example
  {{col "6"}}
###
Handlebars.registerHelper "col", (property)->
  return "col-xs-#{property} col-sm-#{property} col-md-#{property} col-lg-#{property}"
