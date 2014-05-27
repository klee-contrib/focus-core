/*global _, window, i18n*/
(function (NS) {
    "use strict";
    /* Filename: helpers/error_helper.js */
    var isInBrowser = typeof module === 'undefined' && typeof window !== 'undefined';
    NS = NS || {};
    var BackboneNotification = isInBrowser ? NS.Helpers.backboneNotification : require('./backbone_notification');
    var UtilHelper = isInBrowser ? NS.Helpers.utilHelper : require('./util_helper');
    // transform errors send by API to application errors.
    function manageResponseErrors(response, options) {
        options = options || {};
        response = response || {};
        var responseErrors = response.responseJSON;
        if (responseErrors === undefined) {
            responseErrors = response.responseText;
        }

        //Container for global errors.
        var globalErrors = [];
        var fieldErrors = {};
        if (responseErrors !== undefined && responseErrors !== null) {
            // Case of an HTTP Error with a status code: (as an example 404).*/
            if (responseErrors.error !== undefined && responseErrors.error !== null) {
                //The response json should have the following structure : {statusCode: 404, error: "Not Found"}
                var message = responseErrors.statusCode ? responseErrors.statusCode + ' ' : '';
                globalErrors.push(message + i18n.t(responseErrors.error));
            } else if (_.isObject(responseErrors)) {
                if (responseErrors.globalErrors !== undefined && responseErrors.globalErrors !== null) {
                    responseErrors.globalErrors.forEach(function (error) {
                        globalErrors.push(error.message);
                    });
                }
                if (responseErrors.fieldErrors !== undefined && responseErrors.fieldErrors !== null) {
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
                fieldErrors: response.responseJSON.fieldErrors,
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
    function displayErrors(errors) {
        if (errors !== undefined && errors.globalErrors !== undefined) {
            var errorsGlobal = [];
            errors.globalErrors.forEach(function convertErrorsIntoNotification(element) {
                errorsGlobal.push({
                    type: "error",
                    message: element,
                    creationDate: Date.now()
                });
            });
            BackboneNotification.addNotification(errorsGlobal, true);
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
        for (var i = 0, l = errors.length; i < l; i++) {
            var error = errors[i];
            if (error.index === undefined || error.index === null || typeof error.index !== "number") {
                console.warn('invalid error', error);
                break;
            }
            if (error.errors === undefined || error.errors === null || typeof error.errors !== "object") {
                console.warn('invalid error', error);
                break;
            }
            //For the model at the given position in the collection:
            // Set the error depending on its index.
            collection.at(errors[i].index).set({
                errors: errors[i].errors
            }, options);
        }
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