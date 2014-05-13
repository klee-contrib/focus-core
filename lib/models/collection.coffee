((NS) ->
  "use strict"
  # Filename: models/model.coffee
  NS = NS or {}
  isInBrowser = typeof module is 'undefined' and typeof window isnt 'undefined'
  # Base class for all models. Define all transverses methods on the model.
  class Collection extends Backbone.Collection
    # The model name can be define.
    modelName: undefined

    # Changes inside the collection.
    changes:
      creates: {}
      updates: {}
      deletes: {}
    addModel: (model)->
      if model.isNew()
        @changes.creates[model.cid] = model.toSaveJSON()
      else @updateModel(model)  
    updateModel: (model)->
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

    initialize: ->
      # Bind models events on order to track changes.
      @on('add',(model)=> @addModel(model))
      @on('remove', (model)=> @deleteModel(model))
      @on('change', (model)=> @addModel(model))
      @on('reset', (models)=> @resetModels(models))
    # To json function.
    toJSON: ->
      jsonModel = super()
      jsonModel.modelName =  @modelName or this.get('modelName')
      return jsonModel
      
    # Return a json to Save constructed with the changes object.
    toSaveJSON:(propertyPrefix) ->
      propertyPrefix = propertyPrefix or ""
      creates = "#{propertyPrefix}create"
      updates = "#{propertyPrefix}update"
      deletes = "#{propertyPrefix}delete"
      return {
        creates : _.map(@changes.creates, (value, key) -> return value),
        updates: _.map(@changes.updates, (value, key) -> return value),
        deletes: _.map(@changes.deletes, (value, key) -> return value)
      }
  if isInBrowser
    NS.Models = NS.Models or {}
    NS.Models.Collection = Collection
  else
    module.exports = Collection
)(if typeof module is 'undefined' and typeof window isnt 'undefined' then window.Fmk else module.exports)



