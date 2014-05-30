((NS) ->
  "use strict"
  # Filename: models/model.coffee
  NS = NS or {}
  isInBrowser = typeof module is 'undefined' and typeof window isnt 'undefined'
  # Base class for all models. Define all transverses methods on the model.
  class Collection extends Backbone.Collection
    # The model name can be define.
    modelName: undefined

    
    addModel: (model)->
      if model.isNew()
        @changes.creates[model.cid] = model.toSaveJSON()
      else @updateModel(model)  
    updateModel: (model)->
      (delete @changes.deletes[model.cid]) if @changes.deletes[model.cid]?
      @changes.updates[model.cid] = model.toSaveJSON()
    deleteModel:(model) ->
      if @changes.creates[model.cid]?
        delete @changes.creates[model.cid]
      if @changes.updates[model.cid]?
        @changes.deletes[model.cid] = model.toSaveJSON()
        delete @changes.updates[model.cid]
    resetModels:(models) ->
      #Reset the changes.
      @changes = {
        # The newly created models.
        creates: {}
        # The updated models.
        updates: {}
        # The deleted models.
        deletes: {}
      }
      # Call add model foreach model.
      models.forEach(@addModel, @)

    initialize: (options)->
      options = options or {}
      # Changes inside the collection.
      @changes = {
        # The newly created models.
        creates: {}
        # The updated models.
        updates: {}
        # The deleted models.
        deletes: {}
      }
      # Bind models events on order to track changes.
      @on('add',(model)=> @addModel(model))
      @on('remove', (model)=> @deleteModel(model))
      @on('change', (model)=> @addModel(model))
      @on('reset', (models)=> @resetModels(models))
      # Add the collection elements if they are .
      # @resetModels(options) if _.isArray(options)
    # To json function.
    toJSON: ->
      jsonModel = super()
      jsonModel.modelName =  @modelName or this.get('modelName')
      return jsonModel
      
    # Return a json to Save constructed with the changes object.
    toSaveJSON:(propertyPrefix) ->
      propertyPrefix = propertyPrefix or ""
      creates = "#{propertyPrefix}creates"
      updates = "#{propertyPrefix}updates"
      deletes = "#{propertyPrefix}deletes"
      labels = {};
      labels[creates] = _.map(@changes.creates, (value, key) -> return value);
      labels[updates] = _.map(@changes.updates, (value, key) -> return value);
      labels[deletes] = _.map(@changes.deletes, (value, key) -> return value);
      return labels;
  if isInBrowser
    NS.Models = NS.Models or {}
    NS.Models.Collection = Collection
  else
    module.exports = Collection
)(if typeof module is 'undefined' and typeof window isnt 'undefined' then window.Fmk else module.exports)