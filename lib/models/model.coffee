# Base class for all models. Define all transverses methods on the model.
module.exports = class Model extends Backbone.Model
  #Define a method in order to be able to quickly remove errors form the model.
  unsetErrors: ()->
    @unset('errors', {silent: true})
  #Define a setErrors method in order to quickly be able to set Errors.
  setErrors:(errors)->
    @set({'errors': errors}) if errors?
  metadatas:
    papa:
      "domain": "DO_TEXTE_50"
      "required": true
  # The model name can be define.
  modelName: undefined
  labels:
    papa: "model.papa"
  toJSON: ()->
    jsonModel = super()
    jsonModel.metadatas =  @metadatas
    jsonModel.modelName = @modelName
    jsonModel.papa = 'singe'
    return jsonModel

