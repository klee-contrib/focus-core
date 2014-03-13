((NS)->
  NS = NS or {}
  isInBrowser = typeof module is 'undefined' and typeof window isnt 'undefined'
  
  # Default confifuration of the formaters.
  format =
    date: 'DD/MM/YYYY' 
    currency: '0 0.00' 
    dateTime: 'DD/MM/YYYY HH:mm:ss'
    
  # Container for all the formaters.
  formaters = {}
  
  #Update the configuration or the formater with the configuration given in option.
  formaters.configure = (options)->
    _.extend(format, options)

  #Format date
  formaters.date = (prop, options)->
    options = options or {}
    dateFormat = options.dateFormat or format.date
    return moment(prop).format(dateFormat)
  
  #Format dateTime
  formaters.dateTime = (prop, options)->
    options = options or {}
    dateTimeFormat = options.dateTimeFormat
    return  moment(prop).format(dateTimeFormat)
  
  #Currency formatter
  formaters.currency = (prop, options)->
    options = options or {}
    return prop
  
  if isInBrowser
    NS.Helpers = NS.Helpers or {}
    NS.Helpers.formaters  = formaters
  else
    module.exports = formaters
)(if typeof module is 'undefined' and typeof window isnt 'undefined' then window.Fmk else module.exports)