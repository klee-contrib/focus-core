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
    ###
      Process the collection metdatas.
    ###
    processMetadatas: ->
      this.metadatas = metadataBuilder.getMetadatas(_.pick(this, "modelName", "metadatas"))
      # Change the idAttribute depending on the metadatas.
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
      @processMetadatas()
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
      propertyPrefix = propertyPrefix or "coll"
      creates = "#{propertyPrefix}Creates"
      updates = "#{propertyPrefix}Updates"
      deletes = "#{propertyPrefix}Deletes"
      labels = {};
      labels[creates] = @changes.creates #_.map(@changes.creates, (value, key) -> return value);
      labels[updates] = @changes.updates #_.map(@changes.updates, (value, key) -> return value);
      labels[deletes] = @changes.deletes # _.map(@changes.deletes, (value, key) -> return value);
      return labels
    #Save the pervious collection values in order to restore it.
    savePrevious: ->
      @previousCollectionValues = @toJSON()
    # Restore the previous attributes in the model.
    restorePrevious: (options)->
      options = options or {}
      options.silent = options.isSilent or false
      @reset(@previousCollectionValues, options)
    # Tells if the previous model is different from the current.
    isDifferent: ->
      return not _.isEqual @previousCollectionValues, @toJSON()
    ###
      Set errors on a collection element.
    ###
    setErrors:(errors, options)->
      if _.isArray(errors)
        @setErrorsFromArray(errors, options) 
      else if _.isObject(errors)
        @setErrorsFromObject(errors, options) 
    # Set the errors on the collection from an array of model.
    setErrorsFromArray:(errors, options)->
      for error in errors
        console.warn('invalid error', error) if not error.index? and typeof error.index isnt "number" 
        console.warn('invalid error', error) if not error.errors? and typeof error.errors isnt "object"
        
        #For the model at the given position in the collection:
        # Set the error depending on its index.
        @at(error.index).set({
            errors: error.errors
        }, options)
    setErrorsFromObject:(errors, options)->
      for err of errors
        console.warn('invalid error', err) if not _.isString(err)
        @get(err).set({
            errors: errors[err]
        }, options)
    # Unset errors.
    unsetErrors: (options) ->
      @forEach((mdl)-> mdl.unsetErrors(options))
    jsonFromSaveJson:(saveJSON)->
      changes = []
      _.each(saveJSON.creates, (elt)->changes.push(elt))
      _.each(saveJSON.updates, (elt)->changes.push(elt))
      return changes;
      
  if isInBrowser
    NS.Models = NS.Models or {}
    NS.Models.Collection = Collection
  else
    module.exports = Collection
)(if typeof module is 'undefined' and typeof window isnt 'undefined' then window.Fmk else module.exports)