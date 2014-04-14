/*global _, window, i18n*/
(function(NS) {
	"use strict";
	/* Filename: helpers/error_helper.js */
	var isInBrowser = typeof module === 'undefined' && typeof window !== 'undefined';
	NS = NS || {};
	var BackboneNotification = isInBrowser ? NS.Helpers.backboneNotification : require('./backbone_notification');
	// transform errors send by API to application errors.
	function manageResponseErrors(response, options) {
		options = options || {};
		var responseErrors = response.responseJSON;
		/**/
		var globalErrors = [];
		var fieldErrors = {};
		if (responseErrors !== undefined && responseErrors !== null) {
			/*Case of an HTTP Error (as an example 404).*/
			if (responseErrors.error !== undefined && responseErrors !== null) {
				//The response json should have the following structure : {statusCode: 404, error: "Not Found"}
				globalErrors.push('' + responseErrors.statusCode + ' ' + responseErrors.error);
			} else if (responseErrors.errors !== undefined) {
				// there errors in the response
				_.each(responseErrors.errors, function(error) {
					if (error.fieldName !== undefined && error.fieldName.length > 0) {
						fieldErrors[error.fieldName] = error.message;
					} else {
						globalErrors.push(error.message);
					}
				});
			} else {
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
				setModelErrors(options.model, errors);
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