/*global window, $, Backbone*/
"use strict";
(function(NS) {
    //Filename: helpers/form_helper.js
    var isInBrowser = typeof module === 'undefined' && typeof window !== 'undefined';
    NS = NS || {};
    var postRenderingHelper = isInBrowser ? NS.Helpers.postRenderingHelper : require("./post_rendering_helper");
    // ## Helper pour l'ensemble des formulaires.
    //
    var _formCollectionBinder = function forCollectionBinder(selector, collection, options) {
        options = options || {};
        options.isSilent = options.isSilent !== undefined ? options.isSilent : true;
        if (selector !== undefined && selector !== null && collection instanceof Backbone.Collection) {
            //collection.reset(null, {silent: true}); // The collection is cleared.
            var index = 0;
            Array.prototype.forEach.call(selector, function(modelLineSelector) {
                //var model = new collection.model();
                this.formModelBinder({
                        inputs: $('input', modelLineSelector),
                        options: $('select', modelLineSelector)
                    },
                    collection.at(index), //Model to populate.
                    options
                );
                //collection.add(model,options);
                index++;
            }, this);
        } else {
            console.warn("The selector is not an object", selector);
        }
    };

    // #Module de Helper pour l'ensemble des formulaires.
    // formModelBinder permet de convertir l'ensemble des éléments d'un formulaire en model en fonction de leur attribut data-name.
    // inputs must be a selector with inputs inside and model a BackBone model.
    var _formModelBinder = function formModelBinder(data, model, options) {
        options = options || {};
        options.isSilent = options.isSilent !== undefined ? options.isSilent : true;
        if (data.inputs !== null && data.inputs !== undefined) {
            this.formInputModelBinder(data.inputs, model, options);
        }
        if (data.options !== null && data.options !== undefined) {
            this.formOptionModelBinder(data.options, model, options);
        }
    };

    // inputs must be a selector with option:selected inside and model a BackBone model.
    var _formInputModelBinder = function formInputModelBinder(inputs, model, options) {
        options = options || {};
        options.isSilent = options.isSilent !== undefined ? options.isSilent : true;
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
            var decorator = input.getAttribute('data-decorator');
            if (decorator) {
                currentvalue = postRenderingHelper.callParser({
                    selector: $(input),
                    helperName: decorator
                });

            } else {
                switch (input.getAttribute('type')) {
                    case "checkbox":
                        currentvalue = input.multiple ? input.value : input.checked;
                        break;
                    case "number":
                        var inputValue = input.value === "" ? undefined : input.value;
                        currentvalue = (inputValue !== undefined && inputValue !== null) ? +inputValue : undefined;
                        break;
                    case "radio":
                        if (input.checked) {
                            currentvalue = _parseRadioValue(input.value);
                        } else {
                            currentvalue = modelContainer[this.getAttribute('data-name')];
                        }
                        break;
                    default:
                        currentvalue = input.value === "" ? undefined : input.value;
                }

            }


            if (input.multiple) {
                if (input.checked) {
                    if (modelContainer[this.getAttribute('data-name')] === undefined) {
                        modelContainer[this.getAttribute('data-name')] = [currentvalue];
                    } else {
                        modelContainer[this.getAttribute('data-name')].push(currentvalue);
                    }
                }
            } else {
                modelContainer[this.getAttribute('data-name')] = currentvalue;
            }
        });
        model.set(modelContainer, {
            silent: options.isSilent
        });
    };

    var _parseRadioValue = function parseRadioValue(radioValue) {
        switch (radioValue) {
            case "null":
                return undefined;
            case "true":
                return true;
            case "false":
                return false;
            default:
                return radioValue;
        }
    };

    // formOptionModelBinder permet de convertir l'ensemble des options set d'un formulaire en model en fonction de leur attribut data-name.
    // options must be a option:select and model a BackBone model.
    var _formOptionModelBinder = function formOptionModelBinder(optionsSets, model, options) {
        options = options || {};
        options.isSilent = options.isSilent !== undefined ? options.isSilent : true;
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
            //A multiple option will be define with select2
            var select = this;
            var decorator = select.getAttribute('data-decorator');
            if (decorator) {
                selectedValue = postRenderingHelper.callParser({
                    selector: $(select),
                    helperName: decorator
                });
            } else {
                if (this.hasAttribute('multiple')) {
                    selectedValue = $(this).val() || []; // TODO : RGE si select2, il faut utiliser $(this).select2('val')
                } else {
                    selectedValue = this.value;
                }

            }
            modelContainer[attributeName] = selectedValue === "undefined" ? undefined : selectedValue;
        });

        model.set(modelContainer, {
            silent: options.isSilent
        });
    };

    //#Generate a form from a model.
    var _modelFormGenerator = function modelFormGenerator() {

    };

    var formHelper = {
        formModelBinder: _formModelBinder,
        formInputModelBinder: _formInputModelBinder,
        formOptionModelBinder: _formOptionModelBinder,
        modelFormGenerator: _modelFormGenerator,
        formCollectionBinder: _formCollectionBinder
    };

    // Differentiate the export.
    if (isInBrowser) {
        NS.Helpers = NS.Helpers || {};
        NS.Helpers.formHelper = formHelper;
    } else {
        module.exports = formHelper;
    }
})(typeof module === 'undefined' && typeof window !== 'undefined' ? window.Fmk : module.exports);