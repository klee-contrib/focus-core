let message = require('../message');
let dispatcher = require('../dispatcher');
let {isObject, isArray} = require('lodash/lang');
/**
 * Define all the error types of the exceptions which are defined.
 * @type {object}
 */
let errorTypes = {
    entity: 'entity',
    collection: 'collection',
    composite: 'composite'
};

/**
 * List of all the global messages to look after.
 * @type {Array}
 */
let globalMessages = [{
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
    if (isArray(options.globalMessages)) {
        globalMessages = options.globalMessages;
    }
    if (isObject(options.errorTypes)) {
        errorTypes = options.errorTypes;
    }
}

/**
 * Template an error message with parameters.
 * @param  {object} parameters - The parameters to format.
 * @return {object}            - The formated parameters.
 */
function _formatParameters(parameters) {
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


function _treatGlobalMessagesPerType(messages, type) {
    messages.forEach(function convertErrorsIntoNotification(element) {
        var options = {};
        if (isObject(element)) {
            options = _formatParameters(element.parameters);
            element = element.message;
        }
        message.addMessage({
            type: type,
            content: require('i18n').t(element, options),
            creationDate: Date.now()
        });
    });
}


/**
* Treat the global errors.
* @param  {object} responseJSON - Treat the global errors.
* @param {object} options - Options for error handling.{isDisplay:[true/false], globalMessages: [{type: "error", name: "propertyName"}]}
* @return {}
 */
function _treatGlobalErrors(responseJSON, options) {
    options = options || {};
    var allMessagesTypes = options.globalMessages || globalMessages;
    if (responseJSON !== undefined) {
        var messages = responseJSON;
        //Looping through all messages types.
        allMessagesTypes.forEach(function treatAllTypes(globalMessageConf) {
            //Treat all the gloabe
            var msgs = messages[globalMessageConf.name];
            if (msgs !== undefined) {
                _treatGlobalMessagesPerType(msgs, globalMessageConf.type);
            }
        });
    }
}

/**
 * Treat the response json of an error.
 * @param  {object} responseJSON The json response from the server.
 * @param  {object} options The options containing the model. {model: Backbone.Model}
 * @return {object} The constructed object from the error response.
 */
function _treatEntityExceptions(responseJSON, options) {
  dispatcher.handleServerAction({
    data: {[options.node]: responseJSON}, //maybe err[options.node]
    type: 'updateError',
    status: {[options.node]: {name: options.status, isLoading: false}}
  });
}

/**
 * Treat the collection exceptions.
 * @param  {object} responseJSON The JSON response from the server.
 * @param  {object} options Options for error handling. {isDisplay: boolean, model: Backbone.Model}
 * @return {object} The constructed object from the error response.
 */
function _treatCollectionExceptions(responseJSON, options) {
    console.error('Not yet implemented as collection are not savable.')
}

/**
 * Treat with all the custom exception
 * @param  {object} responseJSON - Response from the server.
 * @param  {object} options      - Options for the exceptions teratement such as the {model: modelVar}.
 * @return {object}              - The parsed error response.
 */
function _treatBadRequestExceptions(responseJSON = {}, options) {
    responseJSON.type = responseJSON.type || errorTypes.entity;
    if (responseJSON.type !== undefined) {
        switch (responseJSON.type) {
            case errorTypes.entity:
                return _treatEntityExceptions(responseJSON, options);
            case errorTypes.collection:
                return _treatCollectionExceptions(responseJSON, options);
            default:
                break;
        }
    }
}

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
    if (isObject(response) && response instanceof Error) {
        throw response;
    }
    //Parse the response.
    options = options || {};
    response = response || {};
    let responseErrors = response.responseJSON || response;
    if (responseErrors === undefined) {
        if (response.responseText !== undefined) {
            try {
                //The first try is to parse the response in JSON. Maybe the return mime type is not correct.
                responseErrors = JSON.parse(response.responseText);
            } catch (e) {
                //Construt an error with the text.
                responseErrors = {
                    status: response.status,
                    globalErrorMessages: [response.responseText]
                };
            }

        }else {
          responseErrors = {};
        }

    }
    responseErrors.status = responseErrors.status ||response.status;
    if (responseErrors.status) {
        _treatGlobalErrors(responseErrors);
        /*Deal with all the specific exceptions*/
        switch (responseErrors.status) {
            case 400:
                return _treatBadRequestExceptions(responseErrors, options);
                break;
            case 401:
                return _treatBadRequestExceptions(responseErrors, options);
                break;
            case 422:
                return _treatBadRequestExceptions(responseErrors, options);
                break;
            default:
                break;
        }
        return;
    }
}

module.exports = {
  configure: configure,
  manageResponseErrors: manageResponseErrors
};
