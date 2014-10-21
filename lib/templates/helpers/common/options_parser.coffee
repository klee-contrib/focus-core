###
 Parse the Handlebars options.
 This simple function is looking into the options and the options.hash
###
module.exports  = (options)->
  options = options or {}
  opt = options.hash or {}
  return opt