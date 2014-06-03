"use strict"
((NS) ->
  # Filename: helpers/formatter_helper.coffee
  NS = NS or {}
  isInBrowser = typeof module is 'undefined' and typeof window isnt 'undefined'
  
  # Default confifuration of the formaters.
  format =
    currency: '0,0.00'
    date: 'L'
    dateTime: 'LL'
    
  # Container for all the formaters.
  formaters = {}
  
  #Update the configuration or the formater with the configuration given in option.
  formaters.configure = (options) ->
    _.extend(format, options)

  #Format date
  formaters.date = (prop, options) ->
    options = options or {}
    dateFormat = options.dateFormat or format.date
    #Convert the isoString to a date without timezone.
    if prop is undefined
      return undefined
    prop = prop.slice(0,10)
    return moment(prop).format(dateFormat)
  
  #Format dateTime
  formaters.dateTime = (prop, options) ->
    options = options or {}
    dateTimeFormat = options.dateTimeFormat or format.dateTime
    return  moment(prop).format(dateTimeFormat)
  
  #Currency formatter
  formaters.currency = (prop, options) ->
    options = options or {}
    numeralFormat = options.numeralFormat or format.currency
    return numeral(prop).format(numeralFormat);
  
  if isInBrowser
    NS.Helpers = NS.Helpers or {}
    NS.Helpers.formaters  = formaters
  else
    module.exports = formaters
)(if typeof module is 'undefined' and typeof window isnt 'undefined' then window.Fmk else module.exports)