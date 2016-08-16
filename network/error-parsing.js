'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

var _message = require('../message');

var _message2 = _interopRequireDefault(_message);

var _lang = require('lodash/lang');

var _translation = require('../translation');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

/**
* Define all the error types of the exceptions which are defined.
* @type {object}
*/
var errorTypes = {
    entity: 'entity',
    collection: 'collection',
    composite: 'composite'
};

/**
* List of all the global messages to look after.
* @type {Array}
*/
var globalMessages = [{
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
    if ((0, _lang.isArray)(options.globalMessages)) {
        globalMessages = options.globalMessages;
    }
    if ((0, _lang.isObject)(options.errorTypes)) {
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
        formatter = void 0,
        value = void 0;
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
        if ((0, _lang.isObject)(element)) {
            options = _formatParameters(element.parameters);
            element = element.message;
        }
        _message2.default.addMessage({
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
    var allMessagesTypes = options.globalMessages || globalMessages;
    if (responseJSON !== undefined) {
        var _ret = function () {
            var globalMessagesContainer = [];
            var messages = responseJSON;
            //Looping through all messages types.
            allMessagesTypes.forEach(function (globalMessageConf) {
                //Treat all the gloabe
                var msgs = messages[globalMessageConf.name];
                if (msgs !== undefined) {
                    globalMessagesContainer = [].concat(_toConsumableArray(globalMessagesContainer), _toConsumableArray(msgs));
                    //To remove
                    _treatGlobalMessagesPerType(msgs, globalMessageConf.type);
                }
            });
            return {
                v: globalMessagesContainer
            };
        }();

        if ((typeof _ret === 'undefined' ? 'undefined' : _typeof(_ret)) === "object") return _ret.v;
    }
    return null;
}

/**
* Treat the response json of an error.
* @param  {object} responseJSON The json response from the server.
* @param  {object} options The options containing the model. {model: Backbone.Model}
* @return {object} The constructed object from the error response.
*/
function _treatEntityExceptions() {
    var responseJSON = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
    var options = arguments[1];
    var node = options.node;

    var fieldJSONError = responseJSON.fieldErrors || {};
    var fieldErrors = {};
    if ((0, _lang.isArray)(node)) {
        node.forEach(function (nd) {
            fieldErrors[nd] = fieldJSONError[nd] || null;
        });
    } else if ((0, _lang.isString)(node)) {
        fieldErrors = fieldJSONError;
    } else {
        fieldErrors = fieldJSONError;
    }

    return Object.keys(fieldErrors).reduce(function (res, field) {
        res[field] = (0, _translation.translate)(fieldErrors[field]);
        return res;
    }, {});
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
function _treatBadRequestExceptions() {
    var responseJSON = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
    var options = arguments[1];

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
    if ((0, _lang.isObject)(response) && response instanceof Error) {
        throw response;
    }
    //Parse the response.
    options = options || {};
    response = response || {};
    var responseErrors = response.responseJSON || response;
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
        } else {
            responseErrors = {};
        }
    }
    responseErrors.status = responseErrors.status || response.status;
    if (responseErrors.status) {
        return {
            globals: _treatGlobalErrors(responseErrors),
            fields: function (resErrors, opts) {
                switch (responseErrors.status) {
                    case 400:
                    case 401:
                    case 422:
                        return _treatBadRequestExceptions(resErrors, opts);
                    default:
                        return null;
                }
                return null;
            }(responseErrors, options)
        };
    }
    return null;
}

module.exports = {
    configure: configure,
    manageResponseErrors: manageResponseErrors
};
//# sourceMappingURL=data:application/json;base64,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O0FBQ1I7QUFDQSxpQ0FBaUI7QUFDYiw0QkFBUSxTQUFTLE1BREo7QUFFYix5Q0FBcUIsQ0FBQyxTQUFTLFlBQVY7QUFGUixpQkFBakI7QUFJSDtBQUNKLFNBWEQsTUFXTTtBQUNGLDZCQUFpQixFQUFqQjtBQUNIO0FBQ0o7QUFDRCxtQkFBZSxNQUFmLEdBQXdCLGVBQWUsTUFBZixJQUF5QixTQUFTLE1BQTFEO0FBQ0EsUUFBSSxlQUFlLE1BQW5CLEVBQTJCO0FBQ3ZCLGVBQU87QUFDSCxxQkFBUyxtQkFBbUIsY0FBbkIsQ0FETjtBQUVILG9CQUFTLFVBQUMsU0FBRCxFQUFZLElBQVosRUFBcUI7QUFDMUIsd0JBQVEsZUFBZSxNQUF2QjtBQUNJLHlCQUFLLEdBQUw7QUFDQSx5QkFBSyxHQUFMO0FBQ0EseUJBQUssR0FBTDtBQUNJLCtCQUFPLDJCQUEyQixTQUEzQixFQUFzQyxJQUF0QyxDQUFQO0FBQ0o7QUFDSSwrQkFBTyxJQUFQO0FBTlI7QUFRQSx1QkFBTyxJQUFQO0FBQ0gsYUFWTyxDQVVMLGNBVkssRUFVVyxPQVZYO0FBRkwsU0FBUDtBQWNIO0FBQ0QsV0FBTyxJQUFQO0FBQ0g7O0FBRUQsT0FBTyxPQUFQLEdBQWlCO0FBQ2IsZUFBVyxTQURFO0FBRWIsMEJBQXNCO0FBRlQsQ0FBakIiLCJmaWxlIjoicHJvY2Vzc29yLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IG1lc3NhZ2UgZnJvbSAnLi4vbWVzc2FnZSc7XHJcbmltcG9ydCB7aXNPYmplY3QsIGlzQXJyYXksIGlzU3RyaW5nfSBmcm9tICdsb2Rhc2gvbGFuZyc7XHJcbmltcG9ydCB7dHJhbnNsYXRlfSBmcm9tICcuLi90cmFuc2xhdGlvbic7XHJcbi8qKlxyXG4qIERlZmluZSBhbGwgdGhlIGVycm9yIHR5cGVzIG9mIHRoZSBleGNlcHRpb25zIHdoaWNoIGFyZSBkZWZpbmVkLlxyXG4qIEB0eXBlIHtvYmplY3R9XHJcbiovXHJcbmxldCBlcnJvclR5cGVzID0ge1xyXG4gICAgZW50aXR5OiAnZW50aXR5JyxcclxuICAgIGNvbGxlY3Rpb246ICdjb2xsZWN0aW9uJyxcclxuICAgIGNvbXBvc2l0ZTogJ2NvbXBvc2l0ZSdcclxufTtcclxuXHJcbi8qKlxyXG4qIExpc3Qgb2YgYWxsIHRoZSBnbG9iYWwgbWVzc2FnZXMgdG8gbG9vayBhZnRlci5cclxuKiBAdHlwZSB7QXJyYXl9XHJcbiovXHJcbmxldCBnbG9iYWxNZXNzYWdlcyA9IFt7XHJcbiAgICBuYW1lOiAnZ2xvYmFsRXJyb3JzJyxcclxuICAgIHR5cGU6ICdlcnJvcidcclxufSwge1xyXG4gICAgbmFtZTogJ2dsb2JhbFN1Y2Nlc3MnLFxyXG4gICAgdHlwZTogJ3N1Y2Nlc3MnXHJcbn0sIHtcclxuICAgIG5hbWU6ICdnbG9iYWxXYXJuaW5ncycsXHJcbiAgICB0eXBlOiAnd2FybmluZydcclxufSwge1xyXG4gICAgbmFtZTogJ2dsb2JhbEluZm9zJyxcclxuICAgIHR5cGU6ICdlcnJvcidcclxufSwge1xyXG4gICAgbmFtZTogJ2dsb2JhbEVycm9yTWVzc2FnZXMnLFxyXG4gICAgdHlwZTogJ2Vycm9yJ1xyXG59LCB7XHJcbiAgICBuYW1lOiAnZ2xvYmFsU3VjY2Vzc01lc3NhZ2VzJyxcclxuICAgIHR5cGU6ICdzdWNjZXNzJ1xyXG59LCB7XHJcbiAgICBuYW1lOiAnZ2xvYmFsV2FybmluZ01lc3NhZ2VzJyxcclxuICAgIHR5cGU6ICd3YXJuaW5nJ1xyXG59LCB7XHJcbiAgICBuYW1lOiAnZ2xvYmFsSW5mb01lc3NhZ2VzJyxcclxuICAgIHR5cGU6ICdlcnJvcidcclxufSwge1xyXG4gICAgbmFtZTogJ2Vycm9ycycsXHJcbiAgICB0eXBlOiAnZXJyb3InXHJcbn1dO1xyXG5cclxuZnVuY3Rpb24gY29uZmlndXJlKG9wdGlvbnMpIHtcclxuICAgIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xyXG4gICAgaWYgKGlzQXJyYXkob3B0aW9ucy5nbG9iYWxNZXNzYWdlcykpIHtcclxuICAgICAgICBnbG9iYWxNZXNzYWdlcyA9IG9wdGlvbnMuZ2xvYmFsTWVzc2FnZXM7XHJcbiAgICB9XHJcbiAgICBpZiAoaXNPYmplY3Qob3B0aW9ucy5lcnJvclR5cGVzKSkge1xyXG4gICAgICAgIGVycm9yVHlwZXMgPSBvcHRpb25zLmVycm9yVHlwZXM7XHJcbiAgICB9XHJcbn1cclxuXHJcbi8qKlxyXG4qIFRlbXBsYXRlIGFuIGVycm9yIG1lc3NhZ2Ugd2l0aCBwYXJhbWV0ZXJzLlxyXG4qIEBwYXJhbSAge29iamVjdH0gcGFyYW1ldGVycyAtIFRoZSBwYXJhbWV0ZXJzIHRvIGZvcm1hdC5cclxuKiBAcmV0dXJuIHtvYmplY3R9ICAgICAgICAgICAgLSBUaGUgZm9ybWF0ZWQgcGFyYW1ldGVycy5cclxuKi9cclxuZnVuY3Rpb24gX2Zvcm1hdFBhcmFtZXRlcnMocGFyYW1ldGVycykge1xyXG4gICAgbGV0IG9wdGlvbnMgPSB7fSxcclxuICAgIGZvcm1hdHRlciwgdmFsdWU7XHJcbiAgICBmb3IgKGxldCBwcm9wIGluIHBhcmFtZXRlcnMpIHtcclxuICAgICAgICBpZiAocGFyYW1ldGVycy5oYXNPd25Qcm9wZXJ0eShwcm9wKSkge1xyXG4gICAgICAgICAgICBpZiAocGFyYW1ldGVyc1twcm9wXS5kb21haW4pIHtcclxuICAgICAgICAgICAgICAgIGxldCBkb21haW4gPSBtZXRhZGF0YUJ1aWxkZXIuZ2V0RG9tYWlucygpW3BhcmFtZXRlcnNbcHJvcF0uZG9tYWluXTtcclxuICAgICAgICAgICAgICAgIGZvcm1hdHRlciA9IGRvbWFpbiA/IGRvbWFpbi5mb3JtYXQgOiB1bmRlZmluZWQ7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBmb3JtYXR0ZXIgPSB1bmRlZmluZWQ7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdmFsdWUgPSBmb3JtYXR0ZXIgJiYgZm9ybWF0dGVyLnZhbHVlID8gZm9ybWF0dGVyLnZhbHVlKHBhcmFtZXRlcnNbcHJvcF0udmFsdWUpIDogcGFyYW1ldGVyc1twcm9wXS52YWx1ZTtcclxuICAgICAgICAgICAgb3B0aW9uc1twcm9wXSA9IHZhbHVlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiBvcHRpb25zO1xyXG59XHJcblxyXG5cclxuZnVuY3Rpb24gX3RyZWF0R2xvYmFsTWVzc2FnZXNQZXJUeXBlKG1lc3NhZ2VzLCB0eXBlKSB7XHJcbiAgICBtZXNzYWdlcy5mb3JFYWNoKGZ1bmN0aW9uIGNvbnZlcnRFcnJvcnNJbnRvTm90aWZpY2F0aW9uKGVsZW1lbnQpIHtcclxuICAgICAgICBsZXQgb3B0aW9ucyA9IHt9O1xyXG4gICAgICAgIGlmIChpc09iamVjdChlbGVtZW50KSkge1xyXG4gICAgICAgICAgICBvcHRpb25zID0gX2Zvcm1hdFBhcmFtZXRlcnMoZWxlbWVudC5wYXJhbWV0ZXJzKTtcclxuICAgICAgICAgICAgZWxlbWVudCA9IGVsZW1lbnQubWVzc2FnZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgbWVzc2FnZS5hZGRNZXNzYWdlKHtcclxuICAgICAgICAgICAgdHlwZTogdHlwZSxcclxuICAgICAgICAgICAgY29udGVudDogcmVxdWlyZSgnaTE4bmV4dC1jbGllbnQnKS50KGVsZW1lbnQsIG9wdGlvbnMpLFxyXG4gICAgICAgICAgICBjcmVhdGlvbkRhdGU6IERhdGUubm93KClcclxuICAgICAgICB9KTtcclxuICAgIH0pO1xyXG59XHJcblxyXG5cclxuLyoqXHJcbiogVHJlYXQgdGhlIGdsb2JhbCBlcnJvcnMuXHJcbiogQHBhcmFtICB7b2JqZWN0fSByZXNwb25zZUpTT04gLSBUcmVhdCB0aGUgZ2xvYmFsIGVycm9ycy5cclxuKiBAcGFyYW0ge29iamVjdH0gb3B0aW9ucyAtIE9wdGlvbnMgZm9yIGVycm9yIGhhbmRsaW5nLntpc0Rpc3BsYXk6W3RydWUvZmFsc2VdLCBnbG9iYWxNZXNzYWdlczogW3t0eXBlOiBcImVycm9yXCIsIG5hbWU6IFwicHJvcGVydHlOYW1lXCJ9XX1cclxuKiBAcmV0dXJuIHt9XHJcbiovXHJcbmZ1bmN0aW9uIF90cmVhdEdsb2JhbEVycm9ycyhyZXNwb25zZUpTT04sIG9wdGlvbnMpIHtcclxuICAgIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xyXG4gICAgY29uc3QgYWxsTWVzc2FnZXNUeXBlcyA9IG9wdGlvbnMuZ2xvYmFsTWVzc2FnZXMgfHwgZ2xvYmFsTWVzc2FnZXM7XHJcbiAgICBpZiAocmVzcG9uc2VKU09OICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICBsZXQgZ2xvYmFsTWVzc2FnZXNDb250YWluZXIgPSBbXTtcclxuICAgICAgICBsZXQgbWVzc2FnZXMgPSByZXNwb25zZUpTT047XHJcbiAgICAgICAgLy9Mb29waW5nIHRocm91Z2ggYWxsIG1lc3NhZ2VzIHR5cGVzLlxyXG4gICAgICAgIGFsbE1lc3NhZ2VzVHlwZXMuZm9yRWFjaCgoZ2xvYmFsTWVzc2FnZUNvbmYpPT57XHJcbiAgICAgICAgICAgIC8vVHJlYXQgYWxsIHRoZSBnbG9hYmVcclxuICAgICAgICAgICAgbGV0IG1zZ3MgPSBtZXNzYWdlc1tnbG9iYWxNZXNzYWdlQ29uZi5uYW1lXTtcclxuICAgICAgICAgICAgaWYgKG1zZ3MgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgZ2xvYmFsTWVzc2FnZXNDb250YWluZXIgPSBbLi4uZ2xvYmFsTWVzc2FnZXNDb250YWluZXIsIC4uLm1zZ3NdO1xyXG4gICAgICAgICAgICAgICAgLy9UbyByZW1vdmVcclxuICAgICAgICAgICAgICAgIF90cmVhdEdsb2JhbE1lc3NhZ2VzUGVyVHlwZShtc2dzLCBnbG9iYWxNZXNzYWdlQ29uZi50eXBlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHJldHVybiBnbG9iYWxNZXNzYWdlc0NvbnRhaW5lcjtcclxuICAgIH1cclxuICAgIHJldHVybiBudWxsO1xyXG59XHJcblxyXG4vKipcclxuKiBUcmVhdCB0aGUgcmVzcG9uc2UganNvbiBvZiBhbiBlcnJvci5cclxuKiBAcGFyYW0gIHtvYmplY3R9IHJlc3BvbnNlSlNPTiBUaGUganNvbiByZXNwb25zZSBmcm9tIHRoZSBzZXJ2ZXIuXHJcbiogQHBhcmFtICB7b2JqZWN0fSBvcHRpb25zIFRoZSBvcHRpb25zIGNvbnRhaW5pbmcgdGhlIG1vZGVsLiB7bW9kZWw6IEJhY2tib25lLk1vZGVsfVxyXG4qIEByZXR1cm4ge29iamVjdH0gVGhlIGNvbnN0cnVjdGVkIG9iamVjdCBmcm9tIHRoZSBlcnJvciByZXNwb25zZS5cclxuKi9cclxuZnVuY3Rpb24gX3RyZWF0RW50aXR5RXhjZXB0aW9ucyhyZXNwb25zZUpTT04gPSB7fSwgb3B0aW9ucykge1xyXG4gICAgY29uc3Qge25vZGV9ID0gb3B0aW9ucztcclxuICAgIGNvbnN0IGZpZWxkSlNPTkVycm9yID0gcmVzcG9uc2VKU09OLmZpZWxkRXJyb3JzIHx8IHt9O1xyXG4gICAgbGV0IGZpZWxkRXJyb3JzID0ge307XHJcbiAgICBpZihpc0FycmF5KG5vZGUpKXtcclxuICAgICAgICBub2RlLmZvckVhY2goKG5kKT0+e2ZpZWxkRXJyb3JzW25kXSA9IGZpZWxkSlNPTkVycm9yW25kXSB8fCBudWxsOyB9KTtcclxuICAgIH1lbHNlIGlmKGlzU3RyaW5nKG5vZGUpKXtcclxuICAgICAgICBmaWVsZEVycm9ycyA9IGZpZWxkSlNPTkVycm9yO1xyXG4gICAgfWVsc2Uge1xyXG4gICAgICAgIGZpZWxkRXJyb3JzID0gZmllbGRKU09ORXJyb3I7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIE9iamVjdC5rZXlzKGZpZWxkRXJyb3JzKVxyXG4gICAgICAgIC5yZWR1Y2UoXHJcbiAgICAgICAgICAgIChyZXMsIGZpZWxkKSA9PiB7XHJcbiAgICAgICAgICAgICAgICByZXNbZmllbGRdID0gdHJhbnNsYXRlKGZpZWxkRXJyb3JzW2ZpZWxkXSk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICwge31cclxuICAgICAgICApO1xyXG59XHJcblxyXG4vKipcclxuKiBUcmVhdCB0aGUgY29sbGVjdGlvbiBleGNlcHRpb25zLlxyXG4qIEBwYXJhbSAge29iamVjdH0gcmVzcG9uc2VKU09OIFRoZSBKU09OIHJlc3BvbnNlIGZyb20gdGhlIHNlcnZlci5cclxuKiBAcGFyYW0gIHtvYmplY3R9IG9wdGlvbnMgT3B0aW9ucyBmb3IgZXJyb3IgaGFuZGxpbmcuIHtpc0Rpc3BsYXk6IGJvb2xlYW4sIG1vZGVsOiBCYWNrYm9uZS5Nb2RlbH1cclxuKiBAcmV0dXJuIHtvYmplY3R9IFRoZSBjb25zdHJ1Y3RlZCBvYmplY3QgZnJvbSB0aGUgZXJyb3IgcmVzcG9uc2UuXHJcbiovXHJcbmZ1bmN0aW9uIF90cmVhdENvbGxlY3Rpb25FeGNlcHRpb25zKHJlc3BvbnNlSlNPTiwgb3B0aW9ucykge1xyXG4gICAgY29uc29sZS5lcnJvcignTm90IHlldCBpbXBsZW1lbnRlZCBhcyBjb2xsZWN0aW9uIGFyZSBub3Qgc2F2YWJsZS4nLCByZXNwb25zZUpTT04sIG9wdGlvbnMpO1xyXG59XHJcblxyXG4vKipcclxuKiBUcmVhdCB3aXRoIGFsbCB0aGUgY3VzdG9tIGV4Y2VwdGlvblxyXG4qIEBwYXJhbSAge29iamVjdH0gcmVzcG9uc2VKU09OIC0gUmVzcG9uc2UgZnJvbSB0aGUgc2VydmVyLlxyXG4qIEBwYXJhbSAge29iamVjdH0gb3B0aW9ucyAgICAgIC0gT3B0aW9ucyBmb3IgdGhlIGV4Y2VwdGlvbnMgdGVyYXRlbWVudCBzdWNoIGFzIHRoZSB7bW9kZWw6IG1vZGVsVmFyfS5cclxuKiBAcmV0dXJuIHtvYmplY3R9ICAgICAgICAgICAgICAtIFRoZSBwYXJzZWQgZXJyb3IgcmVzcG9uc2UuXHJcbiovXHJcbmZ1bmN0aW9uIF90cmVhdEJhZFJlcXVlc3RFeGNlcHRpb25zKHJlc3BvbnNlSlNPTiA9IHt9LCBvcHRpb25zKSB7XHJcbiAgICByZXNwb25zZUpTT04udHlwZSA9IHJlc3BvbnNlSlNPTi50eXBlIHx8IGVycm9yVHlwZXMuZW50aXR5O1xyXG4gICAgaWYgKHJlc3BvbnNlSlNPTi50eXBlICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICBzd2l0Y2ggKHJlc3BvbnNlSlNPTi50eXBlKSB7XHJcbiAgICAgICAgICAgIGNhc2UgZXJyb3JUeXBlcy5lbnRpdHk6XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gX3RyZWF0RW50aXR5RXhjZXB0aW9ucyhyZXNwb25zZUpTT04sIG9wdGlvbnMpO1xyXG4gICAgICAgICAgICBjYXNlIGVycm9yVHlwZXMuY29sbGVjdGlvbjpcclxuICAgICAgICAgICAgICAgIHJldHVybiBfdHJlYXRDb2xsZWN0aW9uRXhjZXB0aW9ucyhyZXNwb25zZUpTT04sIG9wdGlvbnMpO1xyXG4gICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gbnVsbDtcclxufVxyXG5cclxuLyoqXHJcbiogVHJhbnNmb3JtIGVycm9ycyBzZW5kIGJ5IEFQSSB0byBhcHBsaWNhdGlvbiBlcnJvcnMuIERpc3BhdGNoIGRlcGVuZGluZyBvbiB0aGUgcmVzcG9uc2UgaHR0cCBjb2RlLlxyXG4qIEBwYXJhbSAge29iamVjdH0gcmVzcG9uc2UgLSBPYmplY3Qgd2hpY1xyXG4qIEBwYXJhbSAge29iamVjdH0gb3B0aW9ucyAgLSBPcHRpb25zIGZvciB0aGUgZXhjZXB0aW9ucyB0ZXJhdGVtZW50IHN1Y2ggYXMgdGhlIG1vZGVsLCB7bW9kZWw6IG1vZGVsVmFyfS5cclxuKiBAcmV0dXJuIHtvYmplY3R9ICAgICAgICAgIC0gVGhlIHBhcnNlZCBlcnJvciByZXNwb25zZS5cclxuKi9cclxuZnVuY3Rpb24gbWFuYWdlUmVzcG9uc2VFcnJvcnMocmVzcG9uc2UsIG9wdGlvbnMpIHtcclxuICAgIGlmICghcmVzcG9uc2UpIHtcclxuICAgICAgICBjb25zb2xlLndhcm4oJ1lvdSBhcmUgbm90IGRlYWxpbmcgd2l0aCBhbnkgcmVzcG9uc2UnKTtcclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcbiAgICAvL1JldGhyb3cgdGhlIGVycm9yIGlmIGl0IGlzIG9uZS5cclxuICAgIGlmIChpc09iamVjdChyZXNwb25zZSkgJiYgcmVzcG9uc2UgaW5zdGFuY2VvZiBFcnJvcikge1xyXG4gICAgICAgIHRocm93IHJlc3BvbnNlO1xyXG4gICAgfVxyXG4gICAgLy9QYXJzZSB0aGUgcmVzcG9uc2UuXHJcbiAgICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcclxuICAgIHJlc3BvbnNlID0gcmVzcG9uc2UgfHwge307XHJcbiAgICBsZXQgcmVzcG9uc2VFcnJvcnMgPSByZXNwb25zZS5yZXNwb25zZUpTT04gfHwgcmVzcG9uc2U7XHJcbiAgICBpZiAocmVzcG9uc2VFcnJvcnMgPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgIGlmIChyZXNwb25zZS5yZXNwb25zZVRleHQgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAgICAgLy9UaGUgZmlyc3QgdHJ5IGlzIHRvIHBhcnNlIHRoZSByZXNwb25zZSBpbiBKU09OLiBNYXliZSB0aGUgcmV0dXJuIG1pbWUgdHlwZSBpcyBub3QgY29ycmVjdC5cclxuICAgICAgICAgICAgICAgIHJlc3BvbnNlRXJyb3JzID0gSlNPTi5wYXJzZShyZXNwb25zZS5yZXNwb25zZVRleHQpO1xyXG4gICAgICAgICAgICB9IGNhdGNoIChlKSB7XHJcbiAgICAgICAgICAgICAgICAvL0NvbnN0cnV0IGFuIGVycm9yIHdpdGggdGhlIHRleHQuXHJcbiAgICAgICAgICAgICAgICByZXNwb25zZUVycm9ycyA9IHtcclxuICAgICAgICAgICAgICAgICAgICBzdGF0dXM6IHJlc3BvbnNlLnN0YXR1cyxcclxuICAgICAgICAgICAgICAgICAgICBnbG9iYWxFcnJvck1lc3NhZ2VzOiBbcmVzcG9uc2UucmVzcG9uc2VUZXh0XVxyXG4gICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1lbHNlIHtcclxuICAgICAgICAgICAgcmVzcG9uc2VFcnJvcnMgPSB7fTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICByZXNwb25zZUVycm9ycy5zdGF0dXMgPSByZXNwb25zZUVycm9ycy5zdGF0dXMgfHwgcmVzcG9uc2Uuc3RhdHVzO1xyXG4gICAgaWYgKHJlc3BvbnNlRXJyb3JzLnN0YXR1cykge1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIGdsb2JhbHM6IF90cmVhdEdsb2JhbEVycm9ycyhyZXNwb25zZUVycm9ycyksXHJcbiAgICAgICAgICAgIGZpZWxkczogKChyZXNFcnJvcnMsIG9wdHMpID0+IHtcclxuICAgICAgICAgICAgICAgIHN3aXRjaCAocmVzcG9uc2VFcnJvcnMuc3RhdHVzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSA0MDA6XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSA0MDE6XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSA0MjI6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBfdHJlYXRCYWRSZXF1ZXN0RXhjZXB0aW9ucyhyZXNFcnJvcnMsIG9wdHMpO1xyXG4gICAgICAgICAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgICAgIH0pKHJlc3BvbnNlRXJyb3JzLCBvcHRpb25zKVxyXG4gICAgICAgIH07XHJcbiAgICB9XHJcbiAgICByZXR1cm4gbnVsbDtcclxufVxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSB7XHJcbiAgICBjb25maWd1cmU6IGNvbmZpZ3VyZSxcclxuICAgIG1hbmFnZVJlc3BvbnNlRXJyb3JzOiBtYW5hZ2VSZXNwb25zZUVycm9yc1xyXG59O1xyXG4iXX0=