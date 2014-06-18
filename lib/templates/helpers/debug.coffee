#use in order to debug a template.
Handlebars.registerHelper "debug", (optionalValue) ->
  console.log "Current Context"
  console.log "===================="
  console.log this
  if optionalValue
    console.log "Value"
    console.log "===================="
    console.log optionalValue
###
Example call:
	- debug the current this
	```{{debug}}```
	- debug a value ant the this
	```{{debug option1="test" option2="test2"```
###