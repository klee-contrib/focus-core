((NS) ->
  "use strict"
  # Filename: models/model.coffee
  NS = NS or {}
  isInBrowser = typeof module is 'undefined' and typeof window isnt 'undefined'
  # Base class for all models. Define all transverses methods on the model.
  class Model extends Backbone.Model

    # Initialize method of the model.
    initialize: (options)->
      options = options or {}
      super options
      @modelName = options.modelName if options.modelName?
    #Define a method in order to be able to quickly remove errors form the model.
    unsetErrors:(options) ->
      options = options or {}
      silent = options.silent or false
      @unset('errors', {silent: silent})
    #Define a setErrors method in order to quickly be able to set Errors.
    setErrors:(errors) ->
      @set({'errors': errors}) if errors?
    # The model name can be define.
    modelName: undefined
    toJSON: ->
      jsonModel = super()
      jsonModel.cid = @cid
      jsonModel.metadatas =  @metadatas
      jsonModel.modelName =  @modelName or @get('modelName')
      return jsonModel
      
    # Return a json to Save.
    toSaveJSON: ->
      Backbone.Model.prototype.toJSON.call(@)
  if isInBrowser
    NS.Models = NS.Models or {}
    NS.Models.Model = Model
  else
    module.exports = Model
)(if typeof module is 'undefined' and typeof window isnt 'undefined' then window.Fmk else module.exports)
