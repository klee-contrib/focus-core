(function(/*! Brunch !*/) {
  'use strict';

  var globals = typeof window !== 'undefined' ? window : global;
  if (typeof globals.require === 'function') return;

  var modules = {};
  var cache = {};

  var has = function(object, name) {
    return ({}).hasOwnProperty.call(object, name);
  };

  var expand = function(root, name) {
    var results = [], parts, part;
    if (/^\.\.?(\/|$)/.test(name)) {
      parts = [root, name].join('/').split('/');
    } else {
      parts = name.split('/');
    }
    for (var i = 0, length = parts.length; i < length; i++) {
      part = parts[i];
      if (part === '..') {
        results.pop();
      } else if (part !== '.' && part !== '') {
        results.push(part);
      }
    }
    return results.join('/');
  };

  var dirname = function(path) {
    return path.split('/').slice(0, -1).join('/');
  };

  var localRequire = function(path) {
    return function(name) {
      var dir = dirname(path);
      var absolute = expand(dir, name);
      return globals.require(absolute, path);
    };
  };

  var initModule = function(name, definition) {
    var module = {id: name, exports: {}};
    cache[name] = module;
    definition(module.exports, localRequire(name), module);
    return module.exports;
  };

  var require = function(name, loaderPath) {
    var path = expand(name, '.');
    if (loaderPath == null) loaderPath = '/';

    if (has(cache, path)) return cache[path].exports;
    if (has(modules, path)) return initModule(path, modules[path]);

    var dirIndex = expand(path, './index');
    if (has(cache, dirIndex)) return cache[dirIndex].exports;
    if (has(modules, dirIndex)) return initModule(dirIndex, modules[dirIndex]);

    throw new Error('Cannot find module "' + name + '" from '+ '"' + loaderPath + '"');
  };

  var define = function(bundle, fn) {
    if (typeof bundle === 'object') {
      for (var key in bundle) {
        if (has(bundle, key)) {
          modules[key] = bundle[key];
        }
      }
    } else {
      modules[bundle] = fn;
    }
  };

  var list = function() {
    var result = [];
    for (var item in modules) {
      if (has(modules, item)) {
        result.push(item);
      }
    }
    return result;
  };

  globals.require = require;
  globals.require.define = define;
  globals.require.register = define;
  globals.require.list = list;
  globals.require.brunch = true;
})();
require.register("lib/config", function(exports, require, module) {

});

;require.register("lib/helpers/backbone_notification", function(exports, require, module) {
/*global $*/
var Notifications = require('../models/notifications');
var NotificationsView = require('../views/notifications-view');
//Container specific to the application in order to manipulate the notification the way we want.
var backboneNotification = {
  //Contain the a notifications viex in order to add notifications and render it.
  notificationsView: new NotificationsView({
    model: new Notifications()
  }),
  addNotification: function addNotification(jsonNotification, isRender) {
    isRender = isRender || false;
    this.notificationsView.model.add(jsonNotification);
    if (isRender) {
      this.renderNotifications();
    }
  },
  //Render all the notifications which are in the notifications collection and then clear this list.
  renderNotifications: function renderInApplication(selectorToRender, timeout) {
    var selector = selectorToRender || "div#summary";
    //We render all the messages.
    $(selector).html(this.notificationsView.render().el);
    //We empty the collection which contains all the notification messages.
    this.notificationsView.model.reset();
    $('button').button('reset');
    var that = this;
    //timeout = timeout || 5;
    /*Notifications are displayed only timeout seconds.*/
    if (timeout !== null && timeout !== undefined) {
      setTimeout(function() {
        that.clearNotifications(selector);
      }, timeout * 1000);
    }
  },
  //Clear all the notifications in the application on application screen but do not clear the collection.
  clearNotifications: function clearNotifications(selectorToRender) {
    var selector = selectorToRender || "div#summary";
    $(selector).html('');
    $('button').button('reset');
  },
  //Clear all error on page 
  clearErrors: function clearErrors(selectorToRender) {
    var selector = selectorToRender || "div.notifications div.alert-danger";
    $(selector).remove();
    $('button').button('reset');
  }
};
module.exports = backboneNotification;
//How to require it:
//window.Backbone.Notification = require('lib/backbone_notification');
});

;require.register("lib/helpers/custom_exception", function(exports, require, module) {
var ArgumentInvalidException, ArgumentNullException, CustomException, DependencyException, NotImplementedException,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

CustomException = (function() {
  function CustomException(name, message, options) {
    this.name = name;
    this.message = message;
    this.options = options;
  }

  CustomException.prototype.log = function() {
    return console.log("name", this.name, "message", this.message, "options", this.options);
  };

  return CustomException;

})();

NotImplementedException = (function(_super) {
  __extends(NotImplementedException, _super);

  function NotImplementedException(message, options) {
    NotImplementedException.__super__.constructor.call(this, "NotImplementedException", message, options);
  }

  return NotImplementedException;

})(CustomException);

ArgumentNullException = (function(_super) {
  __extends(ArgumentNullException, _super);

  function ArgumentNullException(message) {
    ArgumentNullException.__super__.constructor.call(this, "ArgumentNull", message);
  }

  return ArgumentNullException;

})(CustomException);

ArgumentInvalidException = (function(_super) {
  __extends(ArgumentInvalidException, _super);

  function ArgumentInvalidException(message, options) {
    ArgumentInvalidException.__super__.constructor.call(this, "ArgumentInvalidException", message, options);
  }

  return ArgumentInvalidException;

})(CustomException);

DependencyException = (function(_super) {
  __extends(DependencyException, _super);

  function DependencyException(message) {
    DependencyException.__super__.constructor.call(this, "DependencyException", message);
  }

  return DependencyException;

})(CustomException);

module.exports = {
  CustomException: CustomException,
  NotImplementedException: NotImplementedException,
  ArgumentNullException: ArgumentNullException,
  ArgumentInvalidException: ArgumentInvalidException
};
});

;require.register("lib/helpers/domains-definition", function(exports, require, module) {
module.exports = {
	"virtualMachine": {
		"name": {
			"domain": "DO_TEXTE_50",
			"required": true
		},
		"nbCpu": {
			"domain": "DO_ENTIER",
			"required": true
		},
		"osId": {
			"domain": "DO_ID",
			"required": true
		},
		"memory": {
			"domain": "DO_ENTIER",
			"required": true
		},
		"diskCapacity": {
			"domain": "DO_ENTIER",
			"required": true
		},
		"users": {
			"domain": "DO_LISTE",
			"required": true
		},
		"startDate": {
			"domain": "DO_DATE",
			"required": true
		},
		"endDate": {
			"domain": "DO_DATE"
		}
	},
	"virtualMachineSearch": {
		"name": {
			"domain": "DO_TEXTE_30",
			"required": true
		}
	},
	"reference": {
		"id": {
			"domain": "DO_ID",
			"required": true
		},
		"name": {
			"domain": "DO_TEXTE_30",
			"required": true
		},
		"translationKey": {
			"domain": "DO_TEXTE_30",
			"required": true
		}
	},
	"nantissement": {
		"critereRecherchePret": {
			"isTopListeRouge": {
			    "domain": "DO_BOOLEEN"
                
			},
			"isTopConvention": {
				"domain": "DO_BOOLEEN"
			},
			"isNanti": {
				"domain": "DO_BOOLEEN"
			},
			"identificationUESLPret": {
				"domain": "DO_TEXTE_30"
			},
			"identificationCILPret": {
				"domain": "DO_TEXTE_30"
			},
			"montantNominalMin": {
				"domain": "DO_DEVISE"
			},
			"montantNominalMax": {
				"domain": "DO_DEVISE"
			},
			"dateContratMin":{
				"domain": "DO_DATE"
			},
			"dateContratMax":{
				"domain": "DO_DATE"
			},
			"dateDerniereEcheanceMin":{
				"domain": "DO_DATE"
			},
			"dateDerniereEcheanceMax":{
				"domain": "DO_DATE"
			}
		}
	}

};
});

;require.register("lib/helpers/domains", function(exports, require, module) {
module.exports = {
	"DO_ENTIER": {
		"type": "number",
		"validation": [{
			"type": "number"
		}],
	},
	"DO_DATE": {
		"type": "date"
	},
	"DO_TEXTE_50": {
		"type": "text",
		"validation": [{
			"type": "string",
			"options": {
				"maxLength": 50
			}
		}],
		"style": [cssClassDomain1, cssClassDomain2]
	},
	"DO_LISTE": {
		"type": "number",
	},
	"DO_ID": {
		"type": "text"
	},
	"DO_TEXTE_30": {
		"type": "text",
		"validation": [{
			"type": "string",
			"options": {
				"maxLength": 30
			}
		}]
	},
	"DO_EMAIL": {
		"type": "email",
		"validation": [{
			"type": "email"
		}, {
			"type": "string",
			"options": {
				"minLength": 4
			}
		}]
	},
	"DO_BOOLEEN":{
		"type": "boolean"
	},
	"DO_DEVISE":{
		"type": "number",
		"validation":{
			"type": "number",
			"options":{"min": 0}
		},
		"formatter": "devise"
	}

};
});

;require.register("lib/helpers/error_helper", function(exports, require, module) {
/*global _*/
var BackboneNotification = require('./backbone_notification');
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
			globalErrors.push( '' + responseErrors.statusCode + ' ' + responseErrors.error);
		} else if (responseErrors.errors !== undefined) {
			// there errors in the response
			_.each(responseErrors.errors, function(error) {
				if (error.fieldName !== undefined && error.fieldName.length > 0) {
					fieldErrors[error.fieldName] = error.message;
				} else {
					globalErrors.push(error.message);
				}
			});
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
function setModelErrors(model, errors) {
	if (errors !== undefined && errors.fieldErrors !== undefined) {
		model.set({
			'errors': errors.fieldErrors
		});
	}
}
module.exports = {
	manageResponseErrors: manageResponseErrors,
	display: displayErrors,
	setModelErrors: setModelErrors
};
});

;require.register("lib/helpers/form_helper", function(exports, require, module) {
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
});

;require.register("lib/helpers/header_helper", function(exports, require, module) {
module.exports = {
  //Process all the data from the header.
  process: function processHeader(headersElements) {
    var headerData = [];
    for (var i = 0, l = headersElements.length; i < l; i++) {
      var active = i === 0 ? "active" : "";
      var name = headersElements[i].name;
      var jsonElement = {
        cssId: "nav-" + name,
        active: active,
        name: name,
        transalationKey: "header." + name
      };
      if(headersElements[i].url !== undefined){
        jsonElement.url = headersElements[i].url;
      }
      headerData.push(jsonElement);
    }
    return headerData;
  }
};
});

;require.register("lib/helpers/metadata_builder", function(exports, require, module) {
var ArgumentNullException, domains, getDomainsValidationAttrs, proxyDomainValidationAttrs, proxyValidationContainer;

ArgumentNullException = require("./custom_exception").ArgumentNullException;

proxyValidationContainer = {};

domains = require('./domains');

getDomainsValidationAttrs = function(model) {
  var attr, md, metadata, metadatas, valDomAttrs, validators;
  if (model == null) {
    return new ArgumentNullException('The model should exists and have a metadatas property.');
  }
  metadatas = model.metadatas;
  if (metadatas == null) {
    throw new ArgumentNullException('The model should have metadatas.');
  }
  if (metadatas == null) {
    metadatas = constructModelMetaDatas();
  }
  valDomAttrs = {};
  for (attr in metadatas) {
    metadata = {};
    md = metadatas[attr] || {};
    if (((md.isValidationOff != null) && md.isValidationOff === false) || (md.isValidationOff == null)) {
      if (md.metadata != null) {
        _.extend(metadata, md.metadata);
      }
      if (md.domain != null) {
        metadata.domain = md.domain;
      }
      if (md.required != null) {
        metadata.required = md.required;
      }
      validators = [];
      if (metadata.required) {
        validators.push({
          "type": "required",
          "value": true
        });
      }
      if ((metadata.domain != null) && (domains[metadata.domain] != null)) {
        validators = _.union(validators, domains[metadata.domain].validation);
      }
      valDomAttrs[attr] = validators;
    }
  }
  return valDomAttrs;
};

proxyDomainValidationAttrs = function(model) {
  return getDomainsValidationAttrs(model);
  if ((model.modelName != null) && (proxyValidationContainer[model.modelName] != null)) {
    return proxyValidationContainer[model.modelName];
  }
  if (model.modelName != null) {
    return proxyValidationContainer[model.modelName] = getDomainsValidationAttrs(model);
  } else {
    return getDomainsValidationAttrs(model);
  }
};

module.exports = {
  getDomainsValidationAttrs: getDomainsValidationAttrs,
  domainAttributes: proxyDomainValidationAttrs
};
});

;require.register("lib/helpers/model-validation-promise", function(exports, require, module) {
/*global Promise, _*/
var ArgumentNullException = require("./custom_exception").ArgumentNullException;
var metadataBuilder = require('./metadata_builder');
var validators = require('./validators');
exports.validate = function(model) {
  var errors = {};
  //Looping through each attributes.
  validateDomainAttributes(model, errors);
  validateCustomAttributes(model, errors);
  //Promisify the validations , if there is errors call the reject else call resolve with the model.
  return new Promise(function promiseValidation(resolve, reject) {
    //console.log("Errors", errors);
    if (_.isEmpty(errors)) {
      //console.log('resolve');
      resolve(model);
    } else {
      //console.log('reject');
      reject(errors);
    }
    return undefined;
  });
};

//Validate the model customs attributes.
var validateCustomAttributes = function validateCustomAttributes(model, errors) {
  if (!model) {
    throw new ArgumentNullException('The model should exist');
  }
  for (var attr in getValidatedAttrs(model)) {
    //console.log("Attr", attr);
    if (!model.isValid(attr)) {
      var domainMessage = errors[attr] !== null && errors[attr] !== undefined ? errors[attr] : '';
      errors[attr] = '' + domainMessage +''+  attr + " not valid."; // Todo: translate the message.
    }
  }
};

//Get the validation "standard" attributes.
var getValidatedAttrs = function(model) {
  return _.reduce(_.keys(_.result(model, 'validation') || {}), function(memo, key) {
    memo[key] = void 0;
    return memo;
  }, {});
};

//Validate the validation domains attributes.
var validateDomainAttributes = function validateDomainAttributes(model, errors) {
  var validatorsOfDomain = metadataBuilder.domainAttributes(model);
  //console.log("validators %j", validatorsOfDomain);
  for (var attr in validatorsOfDomain) {
    //Validate the model only of there is the attribute on the model.
    var valRes = validators.validate({
      name: attr,
      value: model.get(attr)
    }, validatorsOfDomain[attr]);
    //If there is no error dont set any errors. 
    if (valRes.errors !== undefined && valRes.errors.length > 0) {
      errors[attr] = valRes.errors.join(',');
    }
  }
};
});

;require.register("lib/helpers/odata_helper", function(exports, require, module) {
/*global _, $*/

// type of the request for odata
var paginator_core = {
    // the type of the request (GET by default)
    type: 'GET',

    // the type of reply (json by default)
    dataType: 'json',
};

function createOdataOptions(criteria, pagesInfo, options) {
    return compileOptions(criteria, pagesInfo, options);
}

// convert JSON criteria to odata
function criteriaToOdata(criteria) {
    var result = "";
    for (property in criteria) {
        if (criteria[property] !== undefined && criteria[property] !== null && criteria[property].length > 0) {
            result += property + " eq " + criteria[property] + ",";
        }
    }
    return result.substring(0, result.length - 1);
}

//generate orderBy parameters fo odata
function orderToOdata(sortFields) {
    var orderBy = "";
    sortFields.forEach(function (sortField) {
        orderBy += sortField.field + " " + sortField.order + ",";
    });
    return orderBy.substring(0, orderBy.length - 1);
}

//generate parameter for odata server API
function generateServerApi(criteria, pagesInfo) {
    var sortFields = [];
    if (pagesInfo.sortField) {
        sortFields.push(pagesInfo.sortField);
    }
    return {
        // the query field in the request
        '$filter': criteriaToOdata(criteria),
        // number of items to return per request/page
        '$top': pagesInfo.perPage,
        //records to bypass
        '$skip': pagesInfo.currentPage * pagesInfo.perPage,
        // field to sort by
        '$orderby': orderToOdata(sortFields),
        // what format would you like to request results in?
        '$format': 'json',
        // custom parameters
        '$inlinecount': 'allpages',
        //callback odata
        //'$callback': 'callback'
    };
}

//generate options fo an odata request 
function compileOptions(criteria, pagesInfo, options) {
    var self = pagesInfo;
    options = options || {};

    var server_api = generateServerApi(criteria, pagesInfo);
    // Some values could be functions, let's make sure
    // to change their scope too and run them
    var queryAttributes = {};
    _.each(server_api, function (value, key) {
        if (_.isFunction(value)) {
            value = _.bind(value, self);
            value = value();
        }
        if (value !== undefined && value !== null && value.toString().length > 0) {
            queryAttributes[key] = value;
        }
    });

    var queryOptions = _.clone(paginator_core);
    _.each(queryOptions, function (value, key) {
        if (_.isFunction(value)) {
            value = _.bind(value, self);
            value = value();
        }
        queryOptions[key] = value;
    });

    // Create default values if no others are specified
    queryOptions = _.defaults(queryOptions, {
        timeout: 25000,
        cache: false,
        type: 'GET',
        dataType: 'json'
    });

    // Allows the passing in of {data: {foo: 'bar'}} at request time to overwrite server_api defaults
    if (options.data) {
        options.data = decodeURIComponent($.param(_.extend(queryAttributes, options.data)));
    } else {
        options.data = decodeURIComponent($.param(queryAttributes));
    }

    queryOptions = _.extend(queryOptions, {
        data: decodeURIComponent($.param(queryAttributes)),
        processData: false,
        //url: _.result(queryOptions, 'url')
    }, options);

    return queryOptions;
}

// parse odata response and return values in format : {totalRecords:totalRecords, values: values}
function parseOdataResponse(response) {
    if (response === undefined || response === null || response["odata.count"] === undefined || response["odata.count"] === null) {
        throw new Error('Odata error : parsing result');
    }
    return {
        totalRecords: response["odata.count"],
        values: response.value
    };
}

module.exports = {
    createOdataOptions: createOdataOptions,
    parseOdataResponse: parseOdataResponse
};
});

;require.register("lib/helpers/promisify_helper", function(exports, require, module) {
/*global Backbone, Promise, _*/
// Backbone model with **promise** CRUD method instead of its own methods.
var PromiseModel = Backbone.Model.extend({
	//Ovverride the save method on the model in order to Return a promise.
	save: function saveModel() {
		var model = this;
		var method = this.isNew() ? 'create' : 'update';
		return new Promise(
			function(resolve, reject) {
				Backbone.sync(method, model, {
					success: resolve,
					error: reject
				});
			}
		);
	},
	//Replacing the classic destroy model with a promise.
	destroy: function promiseDestroyModel() {
		var model = this;
		return new Promise(
			function(resolve, reject) {
				Backbone.sync('delete', model, {
					success: resolve,
					error: reject
				});
			}
		);
	},
	//Replacing the classic backbone fetch with a promise, resolve and reject are givent as options.success, and options.error of the ajax.
	fetch: function promiseFetchModel(options) {
		options = options || {};
		var model = this;
		console.log('promiseFetchModel', model);
		return new Promise(function(resolve, reject) {
			/*Don't use underscore but could have because bacckbone has a dependency on it.*/
			options.success = resolve;
			options.error = reject;
			Backbone.sync('read', model, options);
		});
	}

});

// Backbone collection with **promise** CRUD method instead of its own methods.
var PromiseCollection = Backbone.Collection.extend({
	//Override the default collection fetch method, using and returning a promise.
	//Options is the options object which is sent to the jquery method.
	fetch: function promiseFetchCollection(options) {
		options = options || {};
		var collection = this;
		return new Promise(function(resolve, reject) {
			/*Don't use underscore but could have because bacckbone has a dependency on it.*/
			options.success = resolve;
			options.error = reject;
			Backbone.sync('read', collection, options);
		});
	}
});

//Convert an existing Backbone model to a _promise_ version of it.
var ConvertModel = function ConvertBackBoneModelToPromiseModel(model) {
	if (model.url === undefined || model.urlRoot === undefined) {
		throw new Error("ConvertBackBoneModelToPromiseModel: The model url cannot be undefined.");
	}
	var fields = {};
	if(model.has('id')){
		_.extend(fields, model.pick('id'));
	}
	var promiseModel = new PromiseModel(fields);
	var property = model.urlRoot !== undefined ? 'urlRoot' : 'url';
	promiseModel[property] = model[property];
	return promiseModel;
};

//Convert an existing Backbone collection to a _promise_ version of it.
var ConvertCollection = function ConvertBackboneCollectionToPromiseCollection(collection) {
	if (collection.url === undefined || collection.urlRoot === null) {
		throw new Error("The collection url cannot be undefined.");
	}
	var promiseCollection = new PromiseCollection();
	promiseCollection.url = collection.url;
	return promiseCollection;
};

module.exports = {
	Model: PromiseModel,
	Collection: PromiseCollection,
	Convert: {
		Model: ConvertModel,
		Collection: ConvertCollection
	}
};
});

;require.register("lib/helpers/reference_helper", function(exports, require, module) {
/*global Promise, $*/
// Container for all the references lists.
var references = {};


// Load a reference with its list name.
function loadListByName(listDesc) {
  return new Promise(function promiseLoadList(resolve, reject) {
    //console.log("Errors", errors);
    if (references[listDesc.name] !== undefined) {
      resolve(references[listDesc.name]);
    } else {
      $.ajax({
        url: listDesc.url,
        type: "GET",
        dataType: "json",
        crossDomain: true,
        success: function(data) {
          references[listDesc.name] = data;//In order to not reload the next time,  warning, as promises are asynchronous, when the promise is define, this could be false.
          resolve(data);
        },
        error: function(error) {
          reject(error);
        }
      });
    }
  });
}

// Return an array of many promises for all the given lists.
function loadMany(names){
  var promises = [];
  names.forEach(function(name){
    promises.push(loadListByName(name));
  });
  return promises;
}


module.exports = {
  loadListByName: loadListByName,
  loadMany: loadMany
};
});

;require.register("lib/helpers/router", function(exports, require, module) {
var AboutView, ContactView, FooterView, HomeView, Pret, PretSearchView, References, ReferencesView, Router, SigninView, VirtualMachine, VirtualMachineSaveTemplateView, VirtualMachineSaveView, VirtualMachineSearch, VirtualMachineSearchTemplateView, VirtualMachineSearchView, VirtualMachineTemplateView, VirtualMachineView, application,
  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

application = require('application');

FooterView = require('views/footer-view');

HomeView = require('views/home-view');

AboutView = require('views/about-view');

ContactView = require('views/contact-view');

SigninView = require('views/signin-view');

VirtualMachineSearch = require('models/virtualMachineSearch');

VirtualMachineSearchView = require('views/virtualMachine-search-view');

VirtualMachineSearchTemplateView = require('views/search-template-view');

VirtualMachine = require('models/virtualMachine');

VirtualMachineView = require('views/virtualMachine-view');

VirtualMachineTemplateView = require('views/detail-consult-template-view');

VirtualMachineSaveView = require('views/virtualMachine-save-view');

VirtualMachineSaveTemplateView = require('views/detail-edit-template-view');

References = require('../models/references');

ReferencesView = require('../views/references-view');

Pret = require('../models/nantissement/pret');

PretSearchView = require('../views/nantissement/pret-search-view');

module.exports = Router = (function(_super) {
  __extends(Router, _super);

  function Router() {
    this.edit = __bind(this.edit, this);
    this.show = __bind(this.show, this);
    this.list = __bind(this.list, this);
    this.create = __bind(this.create, this);
    this.search = __bind(this.search, this);
    this.reference = __bind(this.reference, this);
    this.updateVirtualMachine = __bind(this.updateVirtualMachine, this);
    this.newVirtualMachine = __bind(this.newVirtualMachine, this);
    this.virtualMachine = __bind(this.virtualMachine, this);
    this.searchVirtualMachine = __bind(this.searchVirtualMachine, this);
    this.signin = __bind(this.signin, this);
    this.contact = __bind(this.contact, this);
    this.about = __bind(this.about, this);
    this.home = __bind(this.home, this);
    this.searchPret = __bind(this.searchPret, this);
    return Router.__super__.constructor.apply(this, arguments);
  }

  Router.prototype.routes = {
    '': 'home',
    'about': 'about',
    'contact': 'contact',
    'signin': 'signin',
    'virtualMachine/search': 'searchVirtualMachine',
    'virtualMachine/create': 'newVirtualMachine',
    'virtualMachine/:id': 'virtualMachine',
    'virtualMachine/edit/:id': 'updateVirtualMachine',
    'reference': 'reference',
    'test/:modelName/search': 'search',
    'test/:modelName/create': 'create',
    'test/:modelName/:id': 'list',
    'test/:modelName/show/:id': 'show',
    'test/:modelName/edit/:id': 'edit',
    'nantissement/pret/search': 'searchPret'
  };

  Router.prototype.searchPret = function() {
    application.layout.setActiveMenu('nantissement');
    return application.layout.content.show(new PretSearchView({
      model: new Pret()
    }));
  };

  Router.prototype.home = function() {
    var view;
    view = new HomeView();
    application.layout.setActiveMenu('refinancement');
    application.layout.content.show(view);
    return application.layout.footer.show(new FooterView({
      model: new Backbone.Model({
        name: 'home',
        time: moment().format('MMMM Do YYYY, h:mm:ss a')
      })
    }));
  };

  Router.prototype.about = function() {
    var view;
    view = new AboutView();
    application.layout.content.show(view);
    return application.layout.footer.show(new FooterView({
      model: new Backbone.Model({
        name: 'about',
        time: moment().format('MMMM Do YYYY, h:mm:ss a')
      })
    }));
  };

  Router.prototype.contact = function() {
    var view;
    view = new ContactView();
    application.layout.content.show(view);
    return application.layout.footer.show(new FooterView({
      model: new Backbone.Model({
        name: 'contact',
        time: moment().format('MMMM Do YYYY, h:mm:ss a')
      })
    }));
  };

  Router.prototype.signin = function() {
    var view;
    view = new SigninView();
    application.layout.content.show(view);
    return application.layout.footer.show(new FooterView({
      model: new Backbone.Model({
        name: 'signin',
        time: moment().format('MMMM Do YYYY, h:mm:ss a')
      })
    }));
  };

  Router.prototype.searchVirtualMachine = function() {
    var model, view;
    model = new VirtualMachineSearch();
    view = new VirtualMachineSearchTemplateView({
      model: model
    });
    return application.layout.content.show(view);
  };

  Router.prototype.virtualMachine = function(id) {
    var model, view;
    model = new VirtualMachine({
      id: id
    });
    view = new VirtualMachineTemplateView({
      model: model
    });
    return application.layout.content.show(view);
  };

  Router.prototype.newVirtualMachine = function() {
    var model, view;
    model = new VirtualMachine({
      isEdit: true,
      isCreate: true
    });
    view = new VirtualMachineSaveTemplateView({
      model: model
    });
    return application.layout.content.show(view);
  };

  Router.prototype.updateVirtualMachine = function(id) {
    var model, view;
    model = new VirtualMachine({
      id: id,
      isEdit: true
    });
    view = new VirtualMachineSaveTemplateView({
      model: model
    });
    return application.layout.content.show(view);
  };

  Router.prototype.reference = function() {
    var model, view;
    model = new References();
    view = new ReferencesView({
      model: model
    });
    return application.layout.content.show(view);
  };

  Router.prototype.search = function(modelName) {

    /*Model = require("../models/#{modelName}")
     *View = #require("../models/#{modelName}-search")
    model = new Model()
    view =  new VirtualMachineSearchTemplateView({model: model}) 
     *view = new VirtualMachineSearchView({model: model})
    application.layout.content.show(view)
     */
    return console.log("search", modelName);
  };

  Router.prototype.create = function(modelName) {
    return console.log("create", modelName);
  };

  Router.prototype.list = function(modelName, id) {
    return console.log("list", modelName);
  };

  Router.prototype.show = function(modelName, id) {
    return console.log("show", modelName);
  };

  Router.prototype.edit = function(modelName, id) {
    return console.log("edit", modelName);
  };

  return Router;

})(Backbone.Router);
});

;require.register("lib/helpers/site_description", function(exports, require, module) {
module.exports = {
  header: [{
    name: "accueil",

    subHeader: {}
  }, {
    name: "nantissement",
    url:"#nantissement/pret/search",
    subHeader: [
    ]
  }, {
    name: "refinancement",
    subHeader: {}
  }, {
    name: "paiementEcheance",
    subHeader: {}
  }, {
    name: "reporting",
    subHeader:{}
  }, {
    name: "administration",
    subHeader:{}
  }]
};
});

;require.register("lib/helpers/url_helper", function(exports, require, module) {
/* global $, _ 
*/
//*This helper has a dependency on underscore and jQuery.*/
var urlHelper = {};
// Generate an url with all the parameters
urlHelper.generateUrl = function generateUrl(route, params) {
	var url = '',
		SEP = '/',
		PARAM = '?',
		ET = '&';
	for (var i = 0, routeLength = route.length; i < routeLength; i++) {
		url += (route[i] + SEP);
	}
	if (typeof params !== "undefined" && params !== null && !_.isEmpty(params)) {
		url += PARAM;
		for (var propt in params) {
			url += (propt + '=' + params[propt] + ET);
		}
	}
	return url.slice(0, -1); //Remove the last ET.
};

//Parse the parameters of the url.
urlHelper.parseParam = function parseParam(params) {
	var result = {};
	var paramsLength = params.length;
	//If the string params are not in the chain wich starts with a ?
	if (paramsLength === 0 || '?' !== params[0]) {
		throw "parseParam : the params is not well formated : " + params;
	}
	var namedParams = params.slice(1).split('&');
	//For each name param (param=value) we put it in an object, we get pack the parameter we have given in the url.
	$.each(namedParams, function(index, value) {
		if (value) {
			/**/
			var param = value.split('=');
			if (param[1] === 'true') {
				param[1] = true;
			} else if (param[1] === 'false') {
				param[1] = false;
			}
			result[param[0]] = param[1];
		}
	});
	return result;
};

module.exports = urlHelper;
});

;require.register("lib/helpers/validators", function(exports, require, module) {
/*global i18n*/
var DependencyException = require('./custom_exception').DependencyException;
var regex = {
	email: /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
	number: /^-?\d+(?:\.d*)?(?:e[+\-]?\d+)?$/i
};

//Function to test an email.
function emailValidation(emailToValidate, options) {
	options = options || options;
	return regex.email.test(emailToValidate);
}

//Function to test the length of a string.
function stringLength(stringToTest, options) {
	if ('string' !== typeof stringToTest) {
		return false;
	}
	options = options || {};
	//console.log(options);
	var isMinLength = options.minLength ? stringToTest.length > options.minLength : true;
	var isMaxLength = options.maxLength ? stringToTest.length < options.maxLength : true;
	return isMinLength && isMaxLength;
}
//Function to  validate that an input is a number.
function numberValidation(numberToValidate, options) {
	options = options || options;
	numberToValidate = '' + numberToValidate; //Cast it into a number.
	return regex.number.test(numberToValidate);
}

//Validate a property, a property shoul be as follow: `{name: "field_name",value: "field_value", validators: [{...}] }`
var validate = function(property, validators) {
	//console.log("validate", property, validators);
	var errors, res, validator, _i, _len;
	errors = [];
	if (validators) {
		for (_i = 0, _len = validators.length; _i < _len; _i++) {
			validator = validators[_i];
			res = validateProperty(property, validator);
			if (res != null) {
				errors.push(res);
			}
		}
	}
	return {
		name: property.name,
		value: property.value,
		isValid: errors.length === 0,
		errors: errors
	};
};

var validateProperty = function(property, validator) {
	var isValid;
	if (validator == null) {
		return void 0;
	}
	if (property == null) {
		return void 0;
	}
	isValid = (function() {
		switch (validator.type) {
			case "required":
				var prevalidString = property.value === "" ? false : true;
				var prevalidDate = true;
				return validator.value === true ? (property.value != null && prevalidString && prevalidDate) : true;
			case "regex":
				return validator.value.test(property.value);
			case "email":
				return emailValidation(property.value, validator.options);
			case "number":
				return numberValidation(property.value, validator.options);
			case "string":
				return stringLength(property.value, validator.options);
			case "function":
				return validator.value(property.value, validator.options);
			default:
				return void 0;
		}
	})();
	if(isValid === undefined || isValid === null){
		console.warn('The validator of type: ' + validator.type + ' is not defined');//Todo: call the logger.
	}
	else if (isValid === false) {

		//Add the name of the property.
		return getErrorLalel(validator.type, property.name ,validator.options);//"The property " + property.name + " is invalid.";
	}
};

function getErrorLalel(type, fieldName, options) {
	options = options || {};
	if(!i18n){throw new DependencyException("Dependency not resolved: i18n.js");}
	var translationKey = options.translationKey ? options.translationKey : "domain.validation."+ type;
	return i18n.translate(translationKey, {fieldName: fieldName, options : options});
	/*var message = (function() {
		switch (type) {
			case "required":
				return i18n.translate();
			case "regex":
				return validator.value.test(property.value);
			case "email":
				return emailValidation(property.value, validator.options);
			case "number":
				return numberValidation(property.value, validator.options);
			case "string":
				return stringLength(property.value, validator.options);
			case "function":
				return validator.value(property.value, validator.options);
			default:
				return void 0;
		}
	})();*/
}

// Validations functions.
module.exports = {
	email: emailValidation,
	stringLength: stringLength,
	number: numberValidation,
	validate: validate
};
});

;require.register("lib/helpers/view_helper", function(exports, require, module) {
var S4, domains_definition, getMetadataFor, guid;

domains_definition = require('./domains');

Handlebars.registerHelper('pick', function(val, options) {
  return options.hash[val];
});

Handlebars.registerHelper("t", function(i18n_key, options) {
  var maxLength, opt, result;
  opt = options.hash || {};
  maxLength = opt.max;
  result = i18n.t(i18n_key);
  if ((maxLength != null) && maxLength < result.length) {
    result = "" + (result.slice(0, +maxLength)) + "...";
  }
  return new Handlebars.SafeString(result);
});

Handlebars.registerHelper("display_for", function(property, options) {
  var maxLength, opt, reduce, res, result, str, _i, _len, _ref;
  opt = options.hash || {};
  maxLength = opt.max;
  if (this[property] != null) {
    result = this[property];
  } else {
    return "";
  }
  reduce = function(s, max) {
    if (s.length > max) {
      return "" + (s.slice(0, +maxLength)) + "... ";
    } else {
      return "" + s + " ";
    }
  };
  if ((maxLength != null) && (result != null)) {
    str = "";
    _ref = result.split(' ');
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      res = _ref[_i];
      str += reduce(res, maxLength);
    }
    return new Handlebars.SafeString(str);
  }
  return new Handlebars.SafeString(result);
});

Handlebars.registerHelper("debug", function(optionalValue) {
  console.log("Current Context");
  console.log("====================");
  console.log(this);
  if (optionalValue) {
    console.log("Value");
    console.log("====================");
    return console.log(optionalValue);
  }
});

getMetadataFor = function(property, context) {
  var domainOfModel, md, metadata;
  metadata = {};
  if (context != null) {
    if (context['metadatas'] != null) {
      md = context['metadatas'][property];
    }
    if ((md == null) && (domains_definition != null)) {
      domainOfModel = domains_definition[context['modelName']];
      if (domainOfModel != null) {
        md = {
          metadata: domainOfModel[property]
        };
      }
    }
    if (md != null) {
      if (md.metadata != null) {
        _.extend(metadata, md.metadata);
      }
      if (md.required != null) {
        _.extend(metadata, {
          required: md.required
        });
      }
      if (md.label != null) {
        _.extend(metadata, {
          label: md.label
        });
      }
      if (md.domain != null) {
        _.extend(metadata, {
          domain: md.domain
        });
      }
    }
  }
  return metadata;
};


/*------------------------------------------- FORM FOR THE INPUTS ------------------------------------------- */

Handlebars.registerHelper("input_for", function(property, options) {
  var containerAttribs, containerCss, dataType, disabled, domain, error, errorSize, errorValue, errors, html, icon, inputAttributes, inputSize, isAddOnInput, isDisplayRequired, isRequired, label, labelSize, labelSizeValue, metadata, opt, placeholder, propertyValue, readonly, translationKey, translationRoot;
  html = void 0;
  translationRoot = void 0;
  dataType = void 0;
  opt = options.hash || {};
  metadata = getMetadataFor(property, this);
  domain = domains_definition[metadata.domain] || {};
  isDisplayRequired = false;
  isRequired = (function(_this) {
    return function() {
      isDisplayRequired = false;
      if (opt.isRequired != null) {
        isDisplayRequired = opt.isRequired;
      } else if (metadata.required != null) {
        isDisplayRequired = metadata.required;
      }
      if (isDisplayRequired) {
        return "<span class='input-group-addon'>*</span>";
      } else {
        return "";
      }
    };
  })(this);
  translationRoot = opt.translationRoot || void 0;
  dataType = opt.dataType || domain.type || "text";
  if (dataType === "boolean") {
    dataType = "checkbox";
  }
  readonly = opt.readonly || false;
  readonly = readonly ? "readonly" : "";
  disabled = opt.disabled || false;
  disabled = disabled ? "disabled" : "";
  inputAttributes = opt.inputAttributes || "";
  containerAttribs = opt.containerAttribs || "";
  containerCss = opt.containerCss || "";
  labelSizeValue = opt.isNoLabel ? 0 : opt.labelSize ? opt.labelSize : 4;
  labelSize = "col-sm-" + labelSizeValue + " col-md-" + labelSizeValue + " col-lg-" + labelSizeValue;
  inputSize = (function(_this) {
    return function() {
      var inputSizeValue;
      if (opt.containerCss) {
        return inputSize = "";
      } else {
        inputSizeValue = 12 - labelSizeValue;
        return inputSize = opt.inputSize || ("col-sm-" + inputSizeValue + " col-md-" + inputSizeValue + " col-lg-" + inputSizeValue);
      }
    };
  })(this);
  isAddOnInput = (opt.icon != null) || (opt.isRequired || metadata.required) === true;
  propertyValue = (function(_this) {
    return function() {
      var formatedDate;
      if (_this[property] != null) {
        if (dataType === "checkbox") {
          if (_this[property]) {
            return 'checked';
          }
        }
        if (dataType === "date" && _this[property] !== "") {
          formatedDate = moment(_this[property]).format("YYYY-MM-DD");
          return "value='" + formatedDate + "'";
        } else {
          return "value='" + (_.escape(_this[property])) + "'";
        }
      }
      return "";
    };
  })(this);
  translationKey = (function(_this) {
    return function() {
      var translation;
      translation = metadata.label || (_this['modelName'] != null ? "" + _this['modelName'] + "." + property : void 0) || "";
      if (translationRoot != null) {
        translation = ((translationRoot != null) && typeof translationRoot === "string" ? translationRoot + "." : "") + property;
      }
      if (translation === "") {
        return "";
      } else {
        return i18n.t(translation);
      }
    };
  })(this);
  icon = (function(_this) {
    return function() {
      if (opt.icon != null) {
        return "<span class='input-group-addon'><i class='fa fa-" + opt.icon + "  fa-fw'></i> </span>";
      } else {
        return "";
      }
    };
  })(this);
  label = (function(_this) {
    return function() {
      if (opt.isNoLabel != null) {
        return "";
      } else {
        return "<label class='control-label " + labelSize + "' for='" + property + "'>" + (translationKey()) + "</label>";
      }
    };
  })(this);
  placeholder = (opt.placeholder == null) || opt.placeholder ? "placeholder='" + (translationKey()) + "'" : "";
  error = "";
  if ((this.errors != null) && (this.errors[property] != null)) {
    error = "has-error";
  }
  errorValue = (this.errors != null) && (this.errors[property] != null) ? this.errors[property] : "";
  errorSize = (function(_this) {
    return function() {
      var errorLength, offsetError;
      errorLength = 12 - labelSizeValue;
      offsetError = labelSizeValue;
      return "col-sm-" + errorLength + " col-md-" + errorLength + " col-lg-" + errorLength + " col-sm-offset-" + offsetError + " col-md-offset-" + offsetError + " col-lg-offset-" + offsetError;
    };
  })(this);
  errors = (function(_this) {
    return function() {
      if (error === "has-error") {
        return "<span class='" + error + " " + (errorSize()) + " help-inline pull-left' style='color:#b94a48'> " + errorValue + " </span>";
      } else {
        return "";
      }
    };
  })(this);
  html = "<div class='form-group " + error + "'> " + (label()) + " <div class='" + (isAddOnInput ? 'input-group' : "") + " " + (inputSize()) + " " + containerCss + "' " + containerAttribs + "> " + (icon()) + " <input id='" + property + "' class='form-control input-sm' data-name='" + property + "' type='" + dataType + "' " + inputAttributes + " " + placeholder + " " + (propertyValue()) + " " + readonly + " " + disabled + "/> " + (isRequired()) + " </div> " + (errors()) + " </div>";
  return new Handlebars.SafeString(html);
});

Handlebars.registerHelper("options_selected", function(property, options) {
  var addOption, dataMapping, domain, elt, error, errorValue, errors, html, icon, inputSize, inputSizeValue, isAddOnInput, isAtLine, isRequired, jsonGiven, label, labelSize, labelSizeValue, list, metadata, opt, optMapping, optName, optToTriggerListKey, optToTriggerName, readonly, selected, translationKey, translationRoot, _i, _len;
  opt = options.hash || {};
  optName = opt.optName != null ? "data-name='" + opt.optName + "'" : "";
  optToTriggerName = opt.optToTriggerName != null ? "data-opttotrigger-name='" + opt.optToTriggerName + "'" : "";
  optToTriggerListKey = opt.optToTriggerListKey != null ? "data-opttotrigger-listkey='" + opt.optToTriggerListKey + "'" : "";
  optMapping = opt.optMapping != null ? this[opt.optMapping] : null;
  dataMapping = optMapping != null ? "data-mapping=" + optMapping : "";
  list = this[opt.listKey] || [];
  selected = this[property] || opt.selected || void 0;
  if (opt.addDefault) {
    list = [
      {
        id: void 0,
        label: ''
      }
    ].concat(list);
  }
  metadata = getMetadataFor(property, this);
  domain = domains_definition[metadata.domain] || {};
  isRequired = (function(_this) {
    return function() {
      var isDisplayRequired;
      isDisplayRequired = false;
      if (opt.isRequired != null) {
        isDisplayRequired = opt.isRequired;
      } else if (metadata.required != null) {
        isDisplayRequired = metadata.required;
      }
      if (isDisplayRequired) {
        return "<span class='input-group-addon'>*</span>";
      } else {
        return "";
      }
    };
  })(this);
  translationRoot = opt.translationRoot || void 0;
  isAtLine = opt.isAtLine || false;
  readonly = opt.readonly || false;
  readonly = readonly ? "disabled" : "";
  labelSizeValue = opt.isNoLabel ? 0 : opt.labelSize ? opt.labelSize : 4;
  labelSize = "col-sm-" + labelSizeValue + " col-md-" + labelSizeValue + " col-lg-" + labelSizeValue;
  inputSizeValue = 12 - labelSizeValue;
  inputSize = opt.inputSize || ("col-sm-" + inputSizeValue + " col-md-" + inputSizeValue + " col-lg-" + inputSizeValue);
  translationKey = (function(_this) {
    return function() {
      var translation;
      translation = metadata.label || (_this['modelName'] != null ? "" + _this['modelName'] + "." + property : void 0) || "";
      if (translationRoot != null) {
        translation = ((translationRoot != null) && typeof translationRoot === "string" ? translationRoot + "." : "") + property;
      }
      if (translation === "") {
        return "";
      } else {
        return i18n.t(translation);
      }
    };
  })(this);
  icon = (function(_this) {
    return function() {
      if (opt.icon != null) {
        return "<span class='input-group-addon'><i class='fa fa-" + opt.icon + " fa-fw'></i> </span>";
      } else {
        return "";
      }
    };
  })(this);
  isAddOnInput = (opt.icon != null) || (opt.isRequired || metadata.required) === true;
  label = (function(_this) {
    return function() {
      if (opt.isNoLabel == null) {
        if (isAtLine) {
          return "<div class='row'><label class='control-label for='" + property + "'> " + (translationKey()) + " </label></div>";
        } else {
          return "<label class='control-label " + labelSize + "' for='" + property + "'> " + (translationKey()) + " </label>";
        }
      } else {
        return "";
      }
    };
  })(this);
  error = "";
  if ((this.errors != null) && (this.errors[property] != null)) {
    error = "has-error";
  }
  errorValue = (this.errors != null) && (this.errors[property] != null) ? this.errors[property] : "";
  errors = (function(_this) {
    return function() {
      if (error === "has-error") {
        return "<span class='" + error + " help-inline pull-left' style='color:#b94a48'> " + errorValue + " </span>";
      } else {
        return "";
      }
    };
  })(this);
  jsonGiven = this;
  addOption = function(elt) {
    var id, isSelected, prop;
    id = elt.id;
    prop = elt.label;
    isSelected = (selected != null) && (id != null) && id.toString() === selected.toString() ? "selected" : "";
    html += "<option value= '" + id + "' data-name='" + property + "' " + isSelected + ">" + prop + "</option>";
    return void 0;
  };
  html = "<div class='form-group " + error + "'> " + (label()) + " <div class='controls " + inputSize + "'> <div class='input-group'> " + (icon()) + " <select id='" + property + "' " + readonly + " " + optName + " " + optToTriggerName + " " + optToTriggerListKey + " " + dataMapping + " class='form-control input-sm'>";
  for (_i = 0, _len = list.length; _i < _len; _i++) {
    elt = list[_i];
    addOption(elt);
  }
  html += "</select>" + (isRequired()) + " </div> " + (errors()) + " </div> </div>";
  return new Handlebars.SafeString(html);
});

Handlebars.registerHelper("dateFormat", function(_date, options) {
  var format, formatedDate, opt;
  formatedDate = '';
  if (_date) {
    opt = options.hash || {};
    format = opt.format || require('../config').dateFormat;
    formatedDate = moment(_date).format(format);
  }
  return new Handlebars.SafeString(formatedDate);
});

S4 = function() {
  return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
};

guid = function() {
  return S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4();
};

Handlebars.registerHelper("button", function(text_key, options) {
  var button, cssClass, cssId, icon, isScript, opt, script, type;
  opt = options.hash || {};
  isScript = typeof opt.isScript === "undefined" ? true : opt.isScript;
  cssClass = opt["class"] || "";
  cssId = opt.id || guid();
  type = opt.type || "button";
  script = function() {
    if (isScript && type === 'submit') {
      return "<script type='text/javascript'>$('#" + cssId + "').on('click', function(){$(this).button('loading');});</script>";
    } else {
      return "";
    }
  };
  icon = function() {
    if (opt.icon != null) {
      return "<i class='fa fa-fw fa-" + opt.icon + "'></i>";
    } else {
      return "";
    }
  };
  button = "<button type='" + type + "' class='btn " + cssClass + "' id='" + cssId + "' data-loading-text='" + (i18n.t('button.loading')) + "'>" + (icon()) + " " + (text_key !== '' ? i18n.t(text_key) : '') + "</button>" + (script());
  return new Handlebars.SafeString(button);
});

Handlebars.registerHelper("paginate", function(property, options) {
  var currentPage, endPage, firstPage, generateLeftArrow, generatePageNumber, generateRigthArrow;
  options = options || {};
  options = options.hash || {};
  currentPage = this.currentPage;
  firstPage = this.firstPage || 0;
  endPage = (this.totalPages || 0) + firstPage;
  generateLeftArrow = function() {
    var className;
    className = currentPage === firstPage ? "disabled" : "";
    return "<li class='" + className + "' data-page='" + firstPage + "'><a href='#' data-bypass>&laquo;</a></li>";
  };
  generatePageNumber = function() {
    var html, i, _i;
    html = "";
    for (i = _i = firstPage; firstPage <= endPage ? _i <= endPage : _i >= endPage; i = firstPage <= endPage ? ++_i : --_i) {
      html += "<li class='" + (i === currentPage ? 'active' : '') + "'><a href='#' data-bypass data-page='" + i + "'>" + i + "</a></li>";
    }
    return html;
  };
  generateRigthArrow = function() {
    var className;
    className = currentPage === endPage ? "disabled" : "";
    return "<li class='" + className + "' data-page='" + endPage + "'><a href='#' data-bypass>&raquo;</a></li>";
  };
  return new Handlebars.SafeString("<ul class='pagination'>" + (generateLeftArrow()) + (generatePageNumber()) + (generateRigthArrow()) + "</ul>");
});

Handlebars.registerHelper("sortColumn", function(property, options) {
  var generateSortPosition, order, sortField, translationKey;
  options = options.hash || {};
  sortField = this.sortField;
  order = this.order || "asc";
  translationKey = options.translationKey || void 0;
  generateSortPosition = function() {
    var icon;
    icon = "fa fa-sort";
    if (property === sortField) {
      icon += "-" + order;
    }
    return "<i class='" + icon + "' data-name='" + property + "'></i>";
  };
  return new Handlebars.SafeString("<a class='sortColumn' href='#' data-name='" + property + "' data-bypass>" + (i18n.t(translationKey)) + " " + (generateSortPosition()) + "</a>");
});


/*Handlebars.registerHelper "currency",(property, options) ->  
  currencySymbol = ''
  value = ''
  if (+this[property])? or +this[property] is 0
    value = +this[property]
  if typeof value is 'number'
    value = numeral(value).format(require('./configuration').getConfiguration().format.currency) if value isnt ''#value.toFixed('2') 
    new Lawnchair({name: 'products'}, $.noop).get('currency', (curr)-> currencySymbol = curr.currencySymbol)
  html = "<div class='currency'><div class='right'>#{value} #{currencySymbol}</div></div>"
  new Handlebars.SafeString(html)
 */
});

;require.register("lib/models/URL", function(exports, require, module) {
var root = require('../config').apiroot;

var urls = {
  //Deals with all the nantissement urls.
  nantissement:{
    pret: root + "/pret"
  },
	virtualMachine:               root + 'vm',
	reference: root + 'reference'
};
module.exports = urls;
});

;require.register("lib/models/model", function(exports, require, module) {
var Model,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

module.exports = Model = (function(_super) {
  __extends(Model, _super);

  function Model() {
    return Model.__super__.constructor.apply(this, arguments);
  }

  Model.prototype.unsetErrors = function() {
    return this.unset('errors', {
      silent: true
    });
  };

  Model.prototype.setErrors = function(errors) {
    if (errors != null) {
      return this.set({
        'errors': errors
      });
    }
  };

  Model.prototype.metadatas = {
    papa: {
      "domain": "DO_TEXTE_50",
      "required": true
    }
  };

  Model.prototype.modelName = void 0;

  Model.prototype.labels = {
    papa: "model.papa"
  };

  Model.prototype.toJSON = function() {
    var jsonModel;
    jsonModel = Model.__super__.toJSON.call(this);
    jsonModel.metadatas = this.metadatas;
    jsonModel.modelName = this.modelName;
    jsonModel.papa = 'singe';
    return jsonModel;
  };

  return Model;

})(Backbone.Model);
});

;require.register("lib/models/notification", function(exports, require, module) {
/*global Backbone*/
//Notification model
module.exports = Backbone.Model.extend({
	defaults: {
		type: undefined, //error/warning/success...
		message: undefined, // The message which have to be display.,
		creationDate: new Date()
	}
});
});

;require.register("lib/models/notifications", function(exports, require, module) {
/*global _, Backbone*/
//We get the model of the collection.
var Notification = require('./notification');
//This collection will contains all the message which will be display in the application.
module.exports = Backbone.Collection.extend({
	model: Notification,
	// Return a constructed object filtered by error type.
	getMessagesByType: function filterByTypeMessage() {
		var jsonCollection = this.toJSON();
		var messages = {};
		messages.errorMessages = _.where(jsonCollection, {
			'type': 'error'
		});
		messages.warningMessages = _.where(jsonCollection, {
			'type': 'warning'
		});
		messages.infoMessages = _.where(jsonCollection, {
			'type': 'info'
		});
		messages.successMessages = _.where(jsonCollection, {
			'type': 'success'
		});
		return messages;
	},
	//Create a comparatot method in order to be able to sort them on their type
	comparator: function comparator(notification) {
		return notification.get("creationDate");
	}
});
});

;require.register("lib/models/paginatedCollection", function(exports, require, module) {
/*global Backbone*/
var ArgumentInvalidException = require('../../lib/custom_exception').ArgumentInvalidException;

module.exports = Backbone.Collection.extend({
  //first number of page
  firstPage: 0,
  //the page loaded
  currentPage: 0,
  // number of records par page
  perPage: 3,
  // total number og pages. default initialization
  totalPages: 10,
  //sort fields
  sortField: {},

  pageInfo: function pageInfo(){
    var info = {
      // If parse() method is implemented and totalRecords is set to the length
      // of the records returned, make it available. Else, default it to 0
      totalRecords: this.totalRecords || 0,
      currentPage: this.currentPage,
      firstPage: this.firstPage,
      totalPages: Math.ceil(this.totalRecords / this.perPage),
      lastPage: this.totalPages, // should use totalPages in template
      perPage: this.perPage,
      previous: false,
      next: false,
      sortField: this.sortField
    };

    if (this.currentPage > 1) {
      info.previous = this.currentPage - 1;
    }

    if (this.currentPage < info.totalPages) {
      info.next = this.currentPage + 1;
    }

    // left around for backwards compatibility
    info.hasNext = info.next;
    info.hasPrevious = info.next;

    this.information = info;
    return info;
  },

  setPage: function setPage(page){
    page = page || 0;
    this.currentPage = page;
  },

  setNextPage: function setNextPage(){
    //TODO : controller si pas de page suivante
    this.currentPage++;
  },

  setPreviousPage: function setPreviousPage(){
    //TODO: controller si pas de page précedente
    this.currentPage--;
  },

  setSortField: function setSortField(field, order){
    order = order || "asc";
    if(field === undefined || (order !== "asc" && order !== "desc")){
      throw new ArgumentInvalidException("sort arguments invalid");
    }
    this.sortField = {
      field: field,
      order: order
    };

    this.currentPage = this.firstPage;
  },

  setTotalRecords: function setTotalRecords(totalRecords){
    this.totalRecords = totalRecords;
  }
});
});

;require.register("lib/views/collection-pagination-view", function(exports, require, module) {
/*global Backbone*/
//var template = require("../template/collection-pagination");

module.exports = Backbone.View.extend({
  Service: undefined,

  initialize: function initializePagination(){

  },

  events:{

  },

  goToPage: function goToPage(page){
    this.model.setPage(page);
  },

  nextPage: function nextPage(){
    this.model.setNextPage();
  },

  previousPage: function PreviousPage(){
    this.model.setPreviousPage();
  },

  render: function renderPagination(){
    if (this.model.length === 0) {
      this.$el.html("");
    }else{
      this.$el.html(this.template(this.model.pageInfo()));
    }
  }
});
});

;require.register("lib/views/detail-consult-view", function(exports, require, module) {
var NotImplementedException = require('../../lib/custom_exception').NotImplementedException;
var ErrorHelper = require('../../lib/error_helper');

module.exports = Backbone.View.extend({
	tagName: 'div',
	className: 'consultView',
	getModel: undefined,
	deleteModel: undefined,

	initialize: function initializeConsult() {
		//render view when the model is loaded
		this.model.on('change', this.render, this);
		if (this.model.has('id')) {
			var view = this;
			this.getModel(this.model.get('id'))
				.then(function success(jsonModel){
					view.model.set(jsonModel);
				})
				.catch(function error(error){
					console.log('erreur : ' + error);
				});
		}
	},

	events: {
		"click button#btnEdit": "edit",
		"click button#btnDelete": "delete"
	},

	//JSON data to attach to the template.
	getRenderData: function getRenderDataConsult() {
		throw new NotImplementedException('getRenderData');
	},

	//genarate navigation url.
	generateEditUrl: function generateEditUrl(){
		return this.model.modelName + "/edit/" + this.model.get('id');
	},

	edit: function editVm(event) {
		event.preventDefault();
		Backbone.history.navigate(this.generateEditUrl(), true);
	},

	delete: function deleteConsult(event) {
		event.preventDefault();
		var view = this;
		//call suppression service
		this.deleteModel()
			.then(function success(success) {
				view.deleteSuccess(success);
			}, function error(errorResponse) {
				view.deleteError(errorResponse);
			})
	},

	//Generate delete navigation url.
	generateDeleteUrl: function generateDeleteUrl(){
		return "/";
	},

	// Actions after a delete success.
	deleteSuccess: function deleteConsultSuccess(response) {
		//remove the view from the DOM
		this.remove();
		//navigate to next page
		Backbone.history.navigate(generateDeleteUrl(), true);
	},

	// Actions after a delete error. 
	deleteError: function deleteConsultError(errorResponse) {
		ErrorHelper.manageResponseErrors(errorResponse, {
			isDisplay: true
		});
	},

	render: function renderVirtualMachine() {
		var jsonModel = this.getRenderData();
		this.$el.html(this.template(jsonModel));
		return this;
	}
});
});

;require.register("lib/views/detail-edit-view", function(exports, require, module) {
/*global Backbone, _, $, i18n*/
var form_helper = require('../../lib/form_helper');
var _url = require('../../lib/url_helper');
var ErrorHelper = require('../../lib/error_helper');
var ModelValidator = require('../../lib/model-validation-promise');

//var VmSvc = require('../service/ServiceVirtualMachine');

module.exports = Backbone.View.extend({
	tagName: 'div',
	className: 'editView',
	saveModel: undefined, //VmSvc.save
	getModel: undefined, //VmSvc.get

	initialize: function initializeEdit() {
		this.model.on('change', this.render, this);
		this.listenTo(this.model, 'validated:valid', this.modelValid);
		this.listenTo(this.model, 'validated:invalid', this.modelInValid);
		if (this.model.has('id')) {
			var view = this;
			this.getModel(this.model.get('id'))
				.then(function success(jsonModel){
					view.model.set(jsonModel);
				});
		}
	},

	events: {
		"click button[type='submit']": "save",
		"click button#btnCancel": "cancelEdition",
	},

	//JSON data to attach to the template.
	getRenderData: function getRenderDataEdit() {
		throw new NotImplementedException('getRenderData');
	},

	save: function saveEdit(event) {
		event.preventDefault();
		form_helper.formModelBinder({
			inputs: $('input', this.$el)
		}, this.model);

		var currentView = this;
		ModelValidator.validate(currentView.model)
			.then(function() {
				currentView.model.unsetErrors();
				currentView.saveModel(currentView.model.toJSON())
					.then(function success(jsonModel){
						currentView.saveSuccess(jsonModel);
					})
					.catch (function error(responseError){
						currentView.saveError(responseError);
					});
			})
			.catch (function error(errors){
				currentView.model.setErrors(errors);
			});
	},

	//Actions on save success.
	saveSuccess: function saveSuccess(jsonModel) {
		Backbone.Notification.addNotification({
			type: 'success',
			message: i18n.t('virtualMachine.save.' + (jsonModel.isCreate ? 'create' : 'update') + 'success')
		});
		var url = this.generateNavigationUrl();
		Backbone.history.navigate(url, true);
	},

	//Actions on save error
	saveError: function saveError(errors) {
		ErrorHelper.manageResponseErrors(errors, {
			model: this.model
		});
	},

	generateNavigationUrl: function generateNavigationUrl(){
		if(this.model.get('id') === null || this.model.get('id') === undefined){
			return "/";
		}
		return _url.generateUrl(["virtualMachine", this.model.get("id")], {});
	}, 

	cancelEdition: function cancelEdition() {
		var url = this.generateNavigationUrl();
		Backbone.Notification.clearNotifications();
		Backbone.history.navigate(url, true);
	},

	render: function renderEdit() {
		var jsonModel = this.getRenderData();
		this.$el.html(this.template(jsonModel));
		return this;
	}
});
});

;require.register("lib/views/notifications-view", function(exports, require, module) {
/*global Backbone*/
var template = require('./templates/notifications');
module.exports = Backbone.View.extend({
	tagName: 'div',
	className: 'notifications',
	template: template,
	//Render each type of notification.
	render: function() {
		var messages = this.model.getMessagesByType();
		/*We have to add css property to the message in order  to use the same template.*/
		var messageToPrint = {};
		messageToPrint.errorMessages = {
			messages: messages.errorMessages,
			cssMessageType: 'danger'
		};
		messageToPrint.warningMessages = {
			messages: messages.warningMessages,
			cssMessageType: 'warning'
		};
		messageToPrint.successMessages = {
			messages: messages.successMessages,
			cssMessageType: 'success'
		};
		messageToPrint.infoMessages = {
			messages: messages.infoMessages,
			cssMessageType: 'info'
		};
		this.$el.html('');
		//In order to call the templat only if needed.
		function printMessageIfExists(messageContainerName, context) {
			if (messages[messageContainerName].length > 0) {
				context.$el.append(template(messageToPrint[messageContainerName]));
			}
		}
		printMessageIfExists('errorMessages',this);//The this is put into a closure in order to not lose it.
		printMessageIfExists('warningMessages',this);
		printMessageIfExists('infoMessages', this);
		printMessageIfExists('successMessages', this);
		return this;
	},
	initialize: function initialize() {
		//We bind the model changes to a render.
		this.model.on('change', function() {
			this.render();
		});
	}
});
});

;require.register("lib/views/search-results-view", function(exports, require, module) {
/*global Backbone, i18n, $*/
var NotImplementedException = require('../../lib/custom_exception').NotImplementedException;
var _url = require('../../lib/url_helper');
var templatePagination = require('../templates/collection-pagination');

module.exports = Backbone.View.extend({
	tagName: 'div',
	className: 'resultView',
	resultsPagination: 'div#pagination',
	templatePagination: templatePagination,
	initialize: function initializeSearchResult(options) {
		this.listenTo(this.model, "reset", function(){this.render({isSearchTriggered: true});}, this);
	},
	events: {
		'click tbody tr': 'lineSelection',
		'click .pagination li': 'goToPage',
		'click a.sortColumn': 'sortCollection'
	},

	sortCollection: function sortCollection(event){
		event.preventDefault();
		var collectionInfos = this.model.pageInfo();
		var sortField = event.target.getAttribute("data-name");
		var currentSort = collectionInfos.sortField;
		var order = "asc";
		if(currentSort !==undefined && sortField === currentSort.field && currentSort.order === "asc"){
			order = "desc";
		}
		this.model.setSortField(sortField,order);
		this.fetchDemand();
	},

	goToPage: function goToPage(event){
		event.preventDefault();
		var page = +event.target.getAttribute("data-page");
		this.model.setPage(page);
		this.fetchDemand();
	},

	nextPage: function nextPage(event){
		event.preventDefault();
		this.model.setNextPage();
		this.fetchDemand();
	},

	previousPage: function PreviousPage(event){
		event.preventDefault();
		this.model.setPreviousPage();
		this.fetchDemand();
	},

	fetchDemand: function fetchDemand(){
		this.trigger('results:fetchDemand');
	},

	lineSelection: function lineSelectionSearchResults(event){
		event.preventDefault();
		//throw new NotImplementedException('lineSelection');
		var id = +event.target.parentElement.getAttribute('id');
		//Navigate 
		var url = _url.generateUrl([this.model.model.prototype.modelName, id]);
		//Backbone.Notification.clearNotifications();
		Backbone.history.navigate(url, true);
	},

	render: function renderSearchResults(options) {
		options = options || {};
		//If the research was not launch triggered.
		if(!options.isSearchTriggered){return this;}
		//If there is no result.
		if (this.model.length === 0) {
			//Is recherche launched.
			this.$el.html("<p>No results...</p>");
			Backbone.Notification.addNotification({
					type: 'info',
					message: i18n.t('search.noResult')
				}, true);
		} else {
		    //the template must have named property to iterate over it
		    var infos = this.model.pageInfo();
			this.$el.html(this.template({
				collection: this.model.toJSON(),
				sortField: infos.sortField.field,
				order: infos.sortField.order
			}));

			//render pagination
			$(this.resultsPagination, this.$el).html(this.templatePagination(this.model.pageInfo()));//TODO : this.model.pageInfo() {currentPage: 0, firstPage: 0, totalPages: 10}
		}
		return this;
	}
});
});

;require.register("lib/views/search-view", function(exports, require, module) {
/*global Backbone, _, $, Promise*/
var NotImplementedException = require('../../lib/custom_exception').NotImplementedException;
var form_helper = require('../../lib/form_helper');
var ModelValidator = require('../../lib/model-validation-promise');
var ErrorHelper = require('../../lib/error_helper');
var RefHelper = require('../../lib/reference_helper');

module.exports = Backbone.View.extend({
	tagName: 'div',
	className: 'searchView',
	ResultsView: undefined,
	Results: undefined,
	search: undefined,
	resultsSelector: 'div#results',
	isMoreCriteria: false,
	referenceNames: undefined,
	initialize: function initializeSearch(options) {
		options = options || {};
		this.isSearchTriggered = options.isSearchTriggered || false;
		this.isReadOnly = options.isReadOnly || false;
		this.model.set({
			isCriteriaReadonly: false
		}, {silent: true});

		//init results collection
		this.searchResults = new this.Results();
		//handle the clear criteria action
		this.listenTo(this.model, 'change', this.render);
		//initialization of the result view 
		this.searchResultsView = new this.ResultsView({
			model: this.searchResults,
			criteria: this.model
		});
		this.listenTo(this.searchResultsView, 'results:fetchDemand', function(){this.runSearch(null,{isFormBinded:false});});
		if (this.isSearchTriggered) {
			this.runSearch(null, {
				isFormBinded: false
			});
		}
		//Load all the references lists which are defined in referenceNames.
		
		var currentView = this;
    Promise.all(RefHelper.loadMany(this.referenceNames)).then(function(results) {
      var res = {};//Container for all the results.
      for(var i =0, l= results.length;  i < l ; i++){
        res[currentView.referenceNames[i].name] = results[i];
        //The results are save into an object with a name for each reference list.
      }
      currentView.model.set(res); //This trigger a render due to model change.
      currentView.isReady = true; //Inform the view that we are ready to render well.
    }).catch(function(e) {
        console.error("error when getting your stuff", e);
    });
	},

	events: {
		"submit form": 'runSearch', // Launch the search.
		"click button#btnReset": 'clearSearchCriteria', // Reset all the criteria.
		"click button#btnEditCriteria": 'editCriteria', //Deal with the edit mode.
		"click button.toogleCriteria": 'toogleMoreCriteria'// Deal with the more / less criteria.
	},
	//Change the fact that the view is in the mode mode or less criteria.
	toogleMoreCriteria: function toogleMoreCriteria() {
		this.isMoreCriteria = !this.isMoreCriteria;
		form_helper.formModelBinder({
			inputs: $('input', this.$el)
		}, this.model);
		this.render();
	},
	//get the JSON to attach to the template
	getRenderData: function getRenderDataSearch() {
		throw new NotImplementedException('getRenderData');
	},

	editCriteria: function editCriteria() {
		this.model.set({
			isCriteriaReadonly: false
		});
	},

	searchSuccess: function searchSuccess(jsonResponse) {
		this.searchResults.setTotalRecords(jsonResponse.totalRecords);
    this.searchResults.reset(jsonResponse.values);
  },
	searchError: function searchError(response) {
		ErrorHelper.manageResponseErrors(response, {
			isDisplay: true
		});
	},

	runSearch: function runSearch(event, options) {
		if (event !== undefined && event !== null) {
			event.preventDefault();
		}
		options = options || {};
		var isFormBinded = options.isFormBinded || true;
		//bind form fields on model
		if (isFormBinded) {
			form_helper.formModelBinder({
				inputs: $('input', this.$el)
			}, this.model);
		}
		var currentView = this;
		ModelValidator
		  .validate(this.model)
			.then(function(model) {
				currentView.model.unsetErrors();
				currentView.search(currentView.model.toJSON(), currentView.searchResults.pageInfo())
									 .then(function success(jsonResponse) {
											return currentView.searchSuccess(jsonResponse);
										}).catch(function error(errorResponse) {
											currentView.searchError(errorResponse);
										});
				}).catch (function error(errors) {
					currentView.model.setErrors(errors);
				});
		if (this.isReadOnly) {
			this.model.set({
				isCriteriaReadonly: true
			});
		}
	},

	clearSearchCriteria: function clearSearchCriteria(event) {
		event.preventDefault();
		//Backbone.Notification.clearNotifications();
		this.model.clear();
		this.initialize(); //Call initialize again in order to refresh the view with criteria lists.
	},

	render: function renderSearch() {
		this.$el.html(this.template(_.extend({
			isMoreCriteria: this.isMoreCriteria
		}, this.getRenderData())));
		$(this.resultsSelector, this.$el).html(this.searchResultsView.render().el);
		return this;
	}
});

/*ModelValidator.validate(this.model)
			.catch (currentView.model.setErrors)
			.then(function(model) {
				currentView.model.unsetErrors();
				currentView.search(currentView.model.toJSON())
					//.then(currentView.searchSuccess.bind(currentView))
					.then(currentView.searchResults.reset.bind(currentView.searchResults))
					.catch (currentView.searchError.bind(currentView))
			});*/
});

;
//# sourceMappingURL=app.js.map