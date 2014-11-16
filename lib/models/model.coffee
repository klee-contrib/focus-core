((NS) ->
  "use strict"
  # Filename: models/model.coffee
  NS = NS or {}
  isInBrowser = typeof module is 'undefined' and typeof window isnt 'undefined'
  metadataBuilder = if isInBrowser then NS.Helpers.metadataBuilder else require("../helpers/metadata_builder").metadataBuilder
  # Base class for all models. Define all transverses methods on the model.
  class Model extends Backbone.Model
    defaultIfNew: undefined
    # Initialize method of the model.
    initialize: (options)->
      options = options or {}
      super options
      @modelName = options.modelName if options.modelName?
      @processMetadatas()
      if (this.has('id') and this.get('id') is 'new')
        this.unset('id', {silent: true})
        this.set('isNewModel', true, {silent: true})
      else
        this.set('isNewModel', false, {silent: true})
      @savePrevious()
      if(@isNew() and @defaultIfNew? )
        this.set(@defaultIfNew, { silent: true })
    # Process all the models metadatas, save theminto the model.
    processMetadatas: ->
      this.metadatas = metadataBuilder.getMetadatas(_.pick(this, "modelName", "metadatas"))
      # Change the idAttribute depending on the metadatas.
      if this.metadatas? and this.metadatas.idAttribute?
        this.idAttribute = metadatas.idAttribute # Set the id attribute depending ont the metadatas.
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
      if @idAttribute? and @id?
        jsonModel.id = @id
      jsonModel.metadatas =  @metadatas
      jsonModel.modelName =  @modelName or @get('modelName')
      return jsonModel
      
    # Return a json to Save.
    toSaveJSON: ->
      json = @toJSON()
      return _.omit(json, 'isNew', 'metadatas', 'cid', 'modelName')
    # Return true if the model is inside a collection.
    isInCollection: ->
      return @collection?
    # Save the previous attributes into the model.
    savePrevious: ->
      @perviousModelValues = @toSaveJSON()
    # Restore the previous attributes in the model.
    restorePrevious: (options)->
      options = options or {}
      options.silent = options.isSilent or false
      @clear({silent: true})
      @set(@perviousModelValues, options)
    isDifferent: ->
      return not _.isEqual @perviousModelValues, @toSaveJSON()
  if isInBrowser
    NS.Models = NS.Models or {}
    NS.Models.Model = Model
  else
    module.exports = Model
)(if typeof module is 'undefined' and typeof window isnt 'undefined' then window.Fmk else module.exports)
