/*global _, i18n*/

/**
 * @module helpers/error_helper
 * @description Error handling around the application.
 * @see file helpers/error_helper.js
 */
"use strict";
var BackboneNotification = require('./backbone_notification');
var UtilHelper = require('./util_helper');
var metadataBuilder = require('./metadata_builder').metadataBuilder;

/**
 * Define all the error types of the exceptions which are defined.
 * @type {object}
 */
var errorTypes = {
    entity: "entity",
    collection: "collection",
    composite: "composite"
};

/**
 * List of all the global messages to look after.
 * @type {Array}
 */
var globalMessages = [{
    name: "globalErrors",
    type: "error"
}, {
    name: "globalSuccess",
    type: "success"
}, {
    name: "globalWarnings",
    type: "warning"
}, {
    name: "globalInfos",
    type: "error"
}, {
    name: "globalErrorMessages",
    type: "error"
}, {
    name: "globalSuccessMessages",
    type: "success"
}, {
    name: "globalWarningMessages",
    type: "warning"
}, {
    name: "globalInfoMessages",
    type: "error"
}, {
    name: "errors",
    type: "error"
}];

function configure(options) {
    options = options || {};
    if (_.isArray(options.globalMessages)) {
        globalMessages = options.globalMessages;
    }
    if (_.isObject(options.errorTypes)) {
        errorTypes = options.errorTypes;
    }
}

/**
 * Treat the response json of an error.
 * @param  {object} responseJSON The json response from the server.
 * @param  {object} options The options containing the model. {model: Backbone.Model}
 * @return {object} The constructed object from the error response.
 */
function treatEntityExceptions(responseJSON, options) {
    var errors = responseJSON.errors;
    /*if (options.isDisplay || options.model) {
        displayErrors(errors, options);
    }*/
    if (options.model) {
        setModelErrors(options.model, errors);
    }
    return errors;
}

/**
 * Treat the collection exceptions.
 * @param  {object} responseJSON The JSON response from the server.
 * @param  {object} options Options for error handling. {isDisplay: boolean, model: Backbone.Model}
 * @return {object} The constructed object from the error response.
 */
function treatCollectionExceptions(responseJSON, options) {
    var errors = responseJSON.errors;
    /* if (options.isDisplay || options.model) {
        displayErrors(errors, options);
    }*/
    if (options.model) {
        setCollectionErrors(options.model, errors);
    }
    return errors;

}

function treatGlobalMessagesPerType(messages, type) {
    var messagesGlobal = [];
    messages.forEach(function convertErrorsIntoNotification(element) {
        var options = {};
        if (_.isObject(element)) {
            options = formatParameters(element.parameters);
            element = element.message;
        }
        messagesGlobal.push({
            type: type,
            message: i18n.t(element, options),
            creationDate: Date.now()
        });

    });
    BackboneNotification.addNotification(messagesGlobal);
}

/**
 * Treat the global errors.
 * @param  {object} responseJSON - Treat the global errors.
 * @param {object} options - Options for error handling.{isDisplay:[true/false], globalMessages: [{type: "error", name: "propertyName"}]}
 * @return {}
 */
function treatGlobalErrors(responseJSON, options) {
    options = options || {};
    var isDisplay = options.isDisplay || true;
    var allMessagesTypes = options.globalMessages || globalMessages;
    if (responseJSON !== undefined) {
        var messages = responseJSON;
        //Looping through all messages types.
        allMessagesTypes.forEach(function treatAllTypes(globalMessageConf) {
            //Treat all the gloabe
            var msgs = messages[globalMessageConf.name];
            if (msgs !== undefined) {
                treatGlobalMessagesPerType(msgs, globalMessageConf.type);
            }
        });
        if (isDisplay) {
            BackboneNotification.renderNotifications();
        }

    }



}

/**
 * Treat with all the custom exception
 * @param  {object} responseJSON - Response from the server.
 * @param  {object} options      - Options for the exceptions teratement such as the {model: modelVar}.
 * @return {object}              - The parsed error response.
 */
function treatBadRequestExceptions(responseJSON, options) {

    if (responseJSON.type !== undefined) {
        switch (responseJSON.type) {
            case errorTypes.entity:
                treatEntityExceptions(responseJSON, options);
                break;
            case errorTypes.collection:
                treatCollectionExceptions(responseJSON, options);
                break;
            default:
                break;
        }
    }

}

// .
/**
 * Transform errors send by API to application errors. Dispatch depending on the response http code.
 * @param  {object} response - Object whic
 * @param  {object} options  - Options for the exceptions teratement such as the model, {model: modelVar}.
 * @return {object}          - The parsed error response.
 */
function manageResponseErrors(response, options) {
    if (!response) {
        console.warn('You are not dealing with any response');
        return false;
    }
    //Rethrow the error if it is one.
    if (_.isObject(response) && response instanceof Error) {
        throw response;
    }
    //Parse the response.
    options = options || {};
    response = response || {};
    var responseErrors = response.responseJSON;
    if (responseErrors === undefined) {
        if (response.responseText !== undefined) {
            try {
                //The first try is to parse the response in JSON. Maybe the return mime type is not correct.
                responseErrors = JSON.parse(response.responseText);
            } catch (e) {
                //Construt an error with the text.
                responseErrors = {
                    statusCode: response.status,
                    globalErrorMessages: [response.responseText]
                };
            }

        }

    }
    responseErrors.statusCode = responseErrors.statusCode || response.status;
    if (responseErrors.statusCode) {
        treatGlobalErrors(responseErrors);
        /*Deal with all the specific exceptions*/
        switch (responseErrors.statusCode || response.status) {
            case 400:
                treatBadRequestExceptions(responseErrors, options);
                break;
            case 401:
                treatBadRequestExceptions(responseErrors, options);
                break;
            case 422:
                treatBadRequestExceptions(responseErrors, options);
                break;
            default:
                break;
        }
        return;
    }


    //Container for global errors.
    var globalErrors = [];
    var fieldErrors = {};

    if (responseErrors !== undefined && responseErrors !== null) {
        // Case of an HTTP Error with a status code: (as an example 404).*/
        if (responseErrors.error !== undefined && responseErrors.error !== null) {
            //The response json should have the following structure : {statusCode: 404, error: "Not Found"}
            var message = responseErrors.statusCode ? responseErrors.statusCode + ' ' : '';
            var parameters = responseErrors.parameters || {};
            globalErrors.push({
                message: message + i18n.t(responseErrors.error),
                parameters: parameters
            });
        } else if (_.isObject(responseErrors)) {
            if (responseErrors.globalErrors !== undefined && responseErrors.globalErrors !== null) {
                responseErrors.globalErrors.forEach(function(error) {
                    globalErrors.push(error.message);
                });
            }
            if (responseErrors.fieldErrors !== undefined && responseErrors.fieldErrors !== null) {
                responseErrors.fieldErrors = _.object(_.map(responseErrors.fieldErrors, function(value, key) {
                    return [key, i18n.t(value)];
                }));
                fieldErrors = responseErrors.fieldErrors;
            }
        } else if (responseErrors.exceptionType !== undefined) {
            //If the error is not catch by the errorHelper, in dev, display the type and the message if exists.
            globalErrors.push(i18n.t('error.' + responseErrors.exceptionType));
            if (responseErrors.exceptionMessage !== undefined) {
                globalErrors.push(responseErrors.statusCode + " " + responseErrors.exceptionMessage);
            }
        } else {
            //In the case the error is completly unanticipated.
            console.log(i18n.t('error.unanticipated'), responseErrors);
            globalErrors.push(i18n.t('error.unanticipated'));
        }
    }
    //If there is no errors, do nothing.
    if ((_.isEmpty(fieldErrors) && _.isEmpty(globalErrors))) {
        return null;
    } else {

        var errors = {
            fieldErrors: fieldErrors,
            globalErrors: globalErrors
        };
        //If the display options is passed in argument, we display the options.
        if (options.isDisplay || options.model) {
            displayErrors(errors);
        }
        if (options.model) {
            UtilHelper.isBackboneCollection(options.model) ? setCollectionErrors(options.model, errors) : setModelErrors(options.model, errors);
        }
        return errors;
    }
}

/**
 * Display errors which are defined into the errors.global.
 * @param  {array} errors   - An array containing the globam errors.
 * @param  {object} options - An object which contains the method options such as isDisplay to tell if the errors has to be immediatly displayed.
 * @return {undefined}
 */
function displayErrors(errors, options) {
    options = options || {};
    var isDisplay = options.isDisplay || true;
    if (errors !== undefined && errors.globalErrors !== undefined) {
        var errorsGlobal = [];
        errors.globalErrors.forEach(function convertErrorsIntoNotification(element) {
            var options = {};
            if (_.isObject(element)) {
                options = formatParameters(element.parameters);
                element = element.message;
            }
            errorsGlobal.push({
                type: "error",
                message: i18n.t(element, options),
                creationDate: Date.now()
            });

        });
        BackboneNotification.addNotification(errorsGlobal, isDisplay);
    }
}

/**
 * Set the *model* errors in the fieldErrors.
 * @param {Model} model    - A backbone model.
 * @param {object} errors  - An object which represents the errros. There should be the follwing structure : `{fieldErrors: {property: "Error Message."}}`.
 * @param {object} options - Options defined when setting the errors to the model.
 */
function setModelErrors(model, errors, options) {
    if (errors !== undefined && errors.fieldErrors !== undefined) {
        model.set({
            'errors': errors.fieldErrors
        }, options);
    }
}

/**
 * Set the *model* errors in the fieldErrors.
 * @param {Model} model    - A backbone model.
 * @param {object} errors  - An object which represents the errros. There should be the follwing structure : `{fieldErrors: {property: "Error Message."}}`.
 * @param {object} options - Options defined when setting the errors to the model.
 */
function setCollectionErrors(collection, errors, options) {
    collection.setErrors(errors, options);
}

/**
 * Template an error message with parameters.
 * @param  {object} parameters - The parameters to format.
 * @return {object}            - The formated parameters.
 */
function formatParameters(parameters) {
    var options = {},
        formatter, value;
    for (var prop in parameters) {
        if (parameters.hasOwnProperty(prop)) {
            if (parameters[prop].domain) {
                var domain = metadataBuilder.getDomains()[parameters[prop].domain];
                formatter = domain ? domain.format : undefined;
            } else {
                formatter = undefined;
            }
            value = formatter && formatter.value ? formatter.value(parameters[prop].value) : parameters[prop].value;
            options[prop] = value;
        }
    }
    return options;
}

/**
 * Exposed property of the module.
 * @type {Object}
 */
var errorHelper = {
    manageResponseErrors: manageResponseErrors,
    display: displayErrors,
    setModelErrors: setModelErrors,
    setCollectionErrors: setCollectionErrors,
    configure: configure,
    treatGlobalErrors: treatGlobalErrors
};
module.exports = errorHelper;