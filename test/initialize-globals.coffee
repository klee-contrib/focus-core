isInitialize = false
exports.load = (options)->
  options = options or {}
  if isInitialize is false
    chai = require('chai')
    global.sinon = require("sinon")
    sinonChai = require('sinon-chai')
    chai.use(sinonChai)
    global.chai = chai
    global.should = chai.should()
    global.Backbone = require 'backbone'
    global._ = require 'underscore'
    global.Promise = require 'bluebird'
    global.Backbone.Validation = require 'backbone-validation'
    global.config = require '../app/config'
    global.i18n = require('i18next')
    #Initialization of the translations.
    i18n.init({resStore: require('../app/internationalization/all'), lng: config.lang}, (content)-> console.log('Translation correctly initialized.'))

    # Autorize the model validation. 
    _.extend(Backbone.Model.prototype, Backbone.Validation.mixin)
    if options.log?
   	  console.log("# Globals loaded: should, _ , Backbone, Promise, sinon-chai, i18n, config")
    isInitialize = true
    return true
  else
    console.log('Globals already loaded') if options.log?
    return false