#global $, _
((NS) ->
  # Filename: helpers/culture_helper.coffee
  "use strict"
  NS = NS or {}
  isInBrowser = typeof module is 'undefined' and typeof window isnt 'undefined'
  ArgumentNullException = if isInBrowser then NS.Helpers.Exceptions.ArgumentNullException else require("./custom_exception").ArgumentNullException
  ArgumentInvalidException= if isInBrowser then NS.Helpers.Exceptions.ArgumentInvalidException else require("./custom_exception").ArgumentInvalidException
  languagesOptions = {
    'fr-FR':{},
    'en-GB':{}
  }
  
  #Define or extend a language in the application.
  defineLanguage =(cultureCode, languageOptions, options) ->
    options = options or {}
    isExtend = options.isExtend or false
    if not cultureCode?
      throw new ArgumentNullException("cultureCode", cultureCode)
    if not _.isString(cultureCode)?
      throw new ArgumentInvalidException("cultureCode should be a string.", cultureCode)
    if not languageOptions?
      throw new ArgumentNullException("cultureCode", languageOptions)
    if not _.isObject(languageOptions)?
      throw new ArgumentInvalidException("languageOptions should be an object.", languageOptions)
    if(not isExtend or not languageOptions[cultureCode]?)
      languagesOptions[cultureCode] =  languageOptions
    else
      _.extend(languagesOptions[cultureCode], languageOptions)

  #Define many languages in the application.
  defineLanguages = (languages, options)->
    if not _.isArray(languages)
      throw new ArgumentInvalidException("Languages should be an array", languages)
    defineLanguage(language.culture, language.options) for language in languages
  
  # Get an array with all the application languages defined.
  getCultures = ->
    return _.keys(languagesOptions)
  
  # Get the language information.
  getLanguage = (cultureCode)->
    if languagesOptions[cultureCode]?
      return languagesOptions[cultureCode]
    return undefined

  mod = {
    "getCultures": getCultures,
    "defineLanguage": defineLanguage,
    "defineLanguages": defineLanguages,
    "getLanguage":getLanguage
  }
  if isInBrowser
    NS.Helpers = NS.Helpers or {}
    NS.Helpers.languageHelper = mod
  else
    module.exports = mod
)(if typeof module is 'undefined' and typeof window isnt 'undefined' then window.Fmk else module.exports)