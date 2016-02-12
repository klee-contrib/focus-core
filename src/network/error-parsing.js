import message from '../message';
import {isObject, isArray, isString} from 'lodash/lang';
import {translate} from '../translation';
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
    name: 'globalErrors',
    type: 'error'
}, {
    name: 'globalSuccess',
    type: 'success'
}, {
    name: 'globalWarnings',
    type: 'warning'
}, {
    name: 'globalInfos',
    type: 'error'
}, {
    name: 'globalErrorMessages',
    type: 'error'
}, {
    name: 'globalSuccessMessages',
    type: 'success'
}, {
    name: 'globalWarningMessages',
    type: 'warning'
}, {
    name: 'globalInfoMessages',
    type: 'error'
}, {
    name: 'errors',
    type: 'error'
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
    let options = {},
    formatter, value;
    for (let prop in parameters) {
        if (parameters.hasOwnProperty(prop)) {
            if (parameters[prop].domain) {
                let domain = metadataBuilder.getDomains()[parameters[prop].domain];
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
        let options = {};
        if (isObject(element)) {
            options = _formatParameters(element.parameters);
            element = element.message;
        }
        message.addMessage({
            type: type,
            content: require('i18next-client').t(element, options),
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
    const allMessagesTypes = options.globalMessages || globalMessages;
    if (responseJSON !== undefined) {
        let globalMessagesContainer = [];
        let messages = responseJSON;
        //Looping through all messages types.
        allMessagesTypes.forEach((globalMessageConf)=>{
            //Treat all the gloabe
            let msgs = messages[globalMessageConf.name];
            if (msgs !== undefined) {
                globalMessagesContainer = [...globalMessagesContainer, ...msgs];
                //To remove
                _treatGlobalMessagesPerType(msgs, globalMessageConf.type);
            }
        });
        return globalMessagesContainer;
    }
    return null;
}

/**
* Treat the response json of an error.
* @param  {object} responseJSON The json response from the server.
* @param  {object} options The options containing the model. {model: Backbone.Model}
* @return {object} The constructed object from the error response.
*/
function _treatEntityExceptions(responseJSON = {}, options) {
    const {node} = options;
    const fieldJSONError = responseJSON.fieldErrors || {};
    let fieldErrors = {};
    if(isArray(node)){
        node.forEach((nd)=>{fieldErrors[nd] = fieldJSONError[nd] || null; });
    }else if(isString(node)){
        fieldErrors = fieldJSONError;
    }else {
        fieldErrors = fieldJSONError;
    }

    return Object.keys(fieldErrors)
        .reduce(
            (res, field) => {
                res[field] = translate(fieldErrors[field]);
                return res;
            }
            , {}
        );
}

/**
* Treat the collection exceptions.
* @param  {object} responseJSON The JSON response from the server.
* @param  {object} options Options for error handling. {isDisplay: boolean, model: Backbone.Model}
* @return {object} The constructed object from the error response.
*/
function _treatCollectionExceptions(responseJSON, options) {
    console.error('Not yet implemented as collection are not savable.', responseJSON, options);
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
    return null;
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
    responseErrors.status = responseErrors.status || response.status;
    if (responseErrors.status) {
        return {
            globals: _treatGlobalErrors(responseErrors),
            fields: ((resErrors, opts) => {
                switch (responseErrors.status) {
                    case 400:
                    case 401:
                    case 422:
                        return _treatBadRequestExceptions(resErrors, opts);
                    default:
                        return null;
                }
                return null;
            })(responseErrors, options)
        };
    }
    return null;
}

module.exports = {
    configure: configure,
    manageResponseErrors: manageResponseErrors
};
