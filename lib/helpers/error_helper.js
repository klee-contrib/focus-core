/*global _, window, i18n*/
(function(NS) {
    "use strict";
    /* Filename: helpers/error_helper.js */
    var isInBrowser = typeof module === 'undefined' && typeof window !== 'undefined';
    NS = NS || {};
    var BackboneNotification = isInBrowser ? NS.Helpers.backboneNotification : require('./backbone_notification');
    var UtilHelper = isInBrowser ? NS.Helpers.utilHelper : require('./util_helper');
    var metadataBuilder = isInBrowser ? NS.Helpers.metadataBuilder : require('./metadata_builder').metadataBuilder;

    var errorTypes = {
        entity: "entity",
        collection: "collection",
        composite: "composite"
    };

    /**
     * Treat the response json of an error.
     * @param  {object} responseJSON The json response from the server.
     * @param  {object} options The options containing the model.
     * @return {object} The constructed object from the error response.
     */
    function treatEntityExceptions(responseJSON, options) {
        var errors = responseJSON.errors;
        if (options.isDisplay || options.model) {
            displayErrors(errors, options);
        }
        if (options.model) {
            setModelErrors(options.model, errors);
        }
        return errors;
    }

    /**
     * Treat the collection exceptions.
     * @param  {object} responseJSON The JSON response from the server.
     * @param  {object} options Options for error handling.
     * @return {object} The constructed object from the error response.
     */
    function treatCollectionExceptions(responseJSON, options) {
        var errors = responseJSON.errors;
        if (options.isDisplay || options.model) {
            displayErrors(errors, options);
        }
        if (options.model) {
            setCollectionErrors(options.model, errors);
        }
        return errors;

    }

    /**
     * @description Treat with all the custom exceptions.
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

    // transform errors send by API to application errors.
    function manageResponseErrors(response, options) {
        options = options || {};
        response = response || {};
        var responseErrors = response.responseJSON;
        if (responseErrors === undefined) {
            responseErrors = response.responseText;
        } else {
            switch (responseErrors.statusCode) {
                case 400:
                    treatBadRequestExceptions(responseErrors, options);
                    break;
                case 401:
                    treatBadRequestExceptions(responseErrors, options);
                    break;
                default:
                    break;
            }
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

    //Display errors which are defined into the errors.global
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

    //Set the *model* errors in the fieldErrors.
    function setModelErrors(model, errors, options) {
        if (errors !== undefined && errors.fieldErrors !== undefined) {
            model.set({
                'errors': errors.fieldErrors
            }, options);
        }
    }

    //Set errors on a collection.
    function setCollectionErrors(collection, errors, options) {
        collection.setErrors(errors, options);
    }

    // termplates an error message with parameters.
    function formatParameters(parameters) {
        var options = {};
        var formatter;
        var value;
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

    //Content of the errorHelper published by the module.
    var errorHelper = {
        manageResponseErrors: manageResponseErrors,
        display: displayErrors,
        setModelErrors: setModelErrors,
        setCollectionErrors: setCollectionErrors
    };

    if (isInBrowser) {
        NS.Helpers = NS.Helpers || {};
        NS.Helpers.errorHelper = errorHelper;
    } else {
        module.exports = errorHelper;
    }
})(typeof module === 'undefined' && typeof window !== 'undefined' ? window.Fmk : module.exports);