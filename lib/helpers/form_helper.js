// #Module de Helper pour l'ensemble des formulaires.
// formModelBinder permet de convertir l'ensemble des éléments d'un formulaire en model en fonction de leur attribut data-name.
// inputs must be a selector with inputs inside and model a BackBone model.
var _formModelBinder = function formModelBinder(data, model, options) {
  options = options || {};
  options.isSilent = options.isSilent || true;
  if (data.inputs !== null && data.inputs !== undefined) {
    this.formInputModelBinder(data.inputs, model);
  }
  if (data.options !== null && data.options !== undefined) {
    this.formOptionModelBinder(data.options, model);
  }
};

// inputs must be a selector with option:selected inside and model a BackBone model.
var _formInputModelBinder = function formInputModelBinder(inputs, model, options) {
  options = options || {};
  options.isSilent = options.isSilent || true;
  //parameters checkings
  if (typeof inputs === "undefined" || inputs === null) {
    throw ("inputs are not defined");
  }
  if (typeof model === "undefined" || model === null) {
    throw ("the model is not defined");
  }
  var modelContainer = {};
  inputs.each(function() {
    var input = this;
    //console.log('input', input);
    var currentvalue;
    //we switch on all html5 values
    switch (input.getAttribute('type')) {
      case "checkbox":
        currentvalue = input.checked;
        break;
      case "number":
        currentvalue = +input.value;
        break;
      default:
        currentvalue = input.value;
    }
    modelContainer[this.getAttribute('data-name')] = currentvalue;
  });
  model.set(modelContainer, {
    silent: options.isSilent
  });
};

// formOptionModelBinder permet de convertir l'ensemble des options set d'un formulaire en model en fonction de leur attribut data-name.
// options must be a option:select and model a BackBone model.
var _formOptionModelBinder = function formOptionModelBinder(optionsSets, model, options) {
  options = options || {};
  options.isSilent = options.isSilent || true;
  //parameters checkings
  if (typeof optionsSets === "undefined" || optionsSets === null) {
    throw ("options are not defined");
  }
  if (typeof model === "undefined" || model === null) {
    throw ("the model is not defined");
  }

  var selectedValue, modelContainer = {};
  //For each option we take the value selected. We had this value to the model, only if the user doesn't choose the empty string.
  optionsSets.each(function() {
    var attributeName = this.getAttribute('data-name');
    selectedValue = this.value;
    modelContainer[attributeName] = selectedValue === "undefined" ? undefined : selectedValue;
  });

  model.set(modelContainer, {
    silent: options.isSilent
  });
};

//#Generate a form from a model.
var _modelFormGenerator = function modelFormGenerator() {

};

module.exports = {
  formModelBinder: _formModelBinder,
  formInputModelBinder: _formInputModelBinder,
  formOptionModelBinder: _formOptionModelBinder,
  modelFormGenerator: _modelFormGenerator
};