/*global window, $, Backbone, _*/

/**
 * @module helpers/form_helper
 * @description Helper for _form binding_, deals with models, collections, input, select, jQuery plugins.
 * @see file helpers/form_helper.js
 */

"use strict";

var postRenderingHelper = require("./post_rendering_helper");

/**
 * Helper to bond collections on list dom.
 * @param  {object} jQuery selector         - A selector which should contains the list of element which dom list element.
 * @param  {Backbone.Collection} collection - The collection where the reconstructed elements will be injected.
 * @param  {object} options                 - {isSilent: boolean}
 * @return {undefined}
 */
var _formCollectionBinder = function forCollectionBinder(selector, collection, options) {
    options = options || {};
    options.isSilent = options.isSilent !== undefined ? options.isSilent : true;
    if (selector !== undefined && selector !== null && collection instanceof Backbone.Collection) {
        //collection.reset(null, {silent: true}); // The collection is cleared.
        var index = 0;
        //@todo: Check if there is a problem on collection save, the selector could have been change, do a clone.
        Array.prototype.forEach.call(selector, function(modelLineSelector) {
            //var model = new collection.model();
            this.formModelBinder({
                    inputs: $('input, textarea', modelLineSelector),
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

/**
 * Model binder. Takes the data from the dom element and fill the model. Each dom element should have a _data-name_ property.
 * @param  {object} data          - An object withe the structure {inputs: jQuerySelector, options: jQuerySelector} w<here jQuery Selector which contains the dom element of a model. inputs for inputs, options for selects.
 * @param  {Backbone.Model} model - a Backbone.Model where the dom data will be injected to populate the fields.
 * @param  {object} options       - The default options are: {isSilent: true}
 * @return {undefined}
 */
var _formModelBinder = function formModelBinder(data, model, options) {
    options = options || {};
    options.isSilent = options.isSilent !== undefined ? options.isSilent : true;
    var modelContainer = {};
    if (data.inputs !== null && data.inputs !== undefined) {
        modelContainer = _.extend(modelContainer, this.formInputModelBinder(data.inputs, model, options));
    }
    if (data.options !== null && data.options !== undefined) {
        modelContainer = _.extend(modelContainer, this.formOptionModelBinder(data.options, model, options));
    }
    model.set(modelContainer, {
        silent: options.isSilent
    });
};

// inputs must be a selector with option:selected inside and model a BackBone model.
/**
 * Bind the model. If the model has a decorator (ie) a jQuery plugin, the data-decorator is use in order to
 * @param  {object} inputs           - Selector containing all the inputs.
 * @param  {Backbone.Model} model    - The model on which there is .
 * @param  {object} options          - The default options are: {isSilent: true, isForceModelBinding: false}.
 * @return {[type]}         [description]
 */
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
        //If a decorator is define, it should be use in order to get back the value.
        var decorator = input.getAttribute('data-decorator');
        if (decorator) {
            currentvalue = postRenderingHelper.callParser({
                selector: $(input),
                helperName: decorator
            });

        } else if (input.tagName === "TEXTAREA") {
            currentvalue = input.value;
        } else { //See if an if on currentValue is nececessary.
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
    if (options.isForceModelSet) {
        model.set(modelContainer, {
            silent: options.isSilent
        });
    }
    return modelContainer;
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
    if (options.isForceModelSet) {
        model.set(modelContainer, {
            silent: options.isSilent
        });
    }
    return modelContainer;

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
module.exports = formHelper;