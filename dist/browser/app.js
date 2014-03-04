window.Fmk = {
  Models: {},
  Views: {},
  Services: {},
  Helpers: {}
};
/*global $*/
(function(NS) {
  NS = NS || {};
  //Dependency gestion depending on the fact that we are in the browser or in node.
  var isInBrowser = typeof module === 'undefined' && typeof window !== 'undefined';
  var Notifications = isInBrowser ? NS.Models.Notifications : require('../models/notifications');
  var NotificationsView = isInBrowser ? NS.Views.NotificationsView : require('../views/notifications-view');
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
  // Differenciating export for node or browser.
  if(isInBrowser){
    NS.Helpers = NS.Helpers || {};
    NS.Helpers.backboneNotification = backboneNotification;
  }else {
    module.exports = backboneNotification;
  }
})(typeof module === 'undefined' && typeof window !== 'undefined' ? window.Fmk : module.exports);
(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  (function(NS) {
    var ArgumentInvalidException, ArgumentNullException, CustomException, DependencyException, NotImplementedException, isInBrowser, mod;
    NS = NS || {};
    isInBrowser = typeof module === 'undefined' && typeof window !== 'undefined' ? window.Fmk : module.exports;
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
    mod = {
      CustomException: CustomException,
      NotImplementedException: NotImplementedException,
      ArgumentNullException: ArgumentNullException,
      ArgumentInvalidException: ArgumentInvalidException
    };
    if (isInBrowser) {
      NS.Helpers = NS.Helpers || {};
      return NS.Helpers.Exceptions = mod;
    } else {
      return module.exports = mod;
    }
  })(typeof module === 'undefined' && typeof window !== 'undefined' ? window.Fmk : module.exports);

}).call(this);

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
/*global _*/
(function(NS) {
	var isInBrowser = typeof module === 'undefined' && typeof window !== 'undefined';

	var BackboneNotification = isInBrowser ? NS.Helpers.BackboneNotification : require('./backbone_notification');
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

	errorHelper = {
		manageResponseErrors: manageResponseErrors,
		display: displayErrors,
		setModelErrors: setModelErrors
	};
	if(isInBrowser){
		_.extend(NS.Helpers, errorHelper);
	}else{
		module.exports = errorHelper;
	}
})(typeof module === 'undefined' && typeof window !== 'undefined' ? window.Fmk : module.exports);
(function(NS) {
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

 var formHelper = {
    formModelBinder: _formModelBinder,
    formInputModelBinder: _formInputModelBinder,
    formOptionModelBinder: _formOptionModelBinder,
    modelFormGenerator: _modelFormGenerator
  };
  
  // Differentiate the export.
  if(isInBrowser){
    NS.Helpers = NS.Helpers || {};
    NS.Helpers.formHelper = formHelper;
  } else {
    module.exports = formHelper;
  }
})(typeof module === 'undefined' && typeof window !== 'undefined' ? window.Fmk : module.exports);
(function(NS) {
  NS = NS || {};
  //Dependency gestion depending on the fact that we are in the browser or in node.
  var isInBrowser = typeof module === 'undefined' && typeof window !== 'undefined';

  headerHelper = {
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
        if (headersElements[i].url !== undefined) {
          jsonElement.url = headersElements[i].url;
        }
        headerData.push(jsonElement);
      }
      return headerData;
    }
  };
  // Differenciating export for node or browser.
  if (isInBrowser) {
    NS.Helpers = NS.Helpers || {};
    NS.Helpers.headerHelper = headerHelper;
  } else {
    module.exports = headerHelper;
  }

})(typeof module === 'undefined' && typeof window !== 'undefined' ? window.Fmk : module.exports);
(function() {
  (function(NS) {
    var ArgumentNullException, MetadataBuilder, isInBrowser;
    NS = NS || {};
    isInBrowser = typeof module === 'undefined' && typeof window !== 'undefined' ? window.Fmk : module.exports;
    ArgumentNullException = isInBrowser ? NS.Helpers.Exceptions.ArgumentNullException : require("./custom_exception").ArgumentNullException;
    MetadataBuilder = (function() {
      var getDomainsValidationAttrs, proxyValidationContainer;

      function MetadataBuilder(domains) {
        this.domains = domains;
        if (this.domains == null) {
          throw new ArgumentNullException('The metadata builder needs domains.');
        }
      }

      proxyValidationContainer = {};

      getDomainsValidationAttrs = function(model) {
        var attr, constructModelMetaDatas, md, metadata, metadatas, proxyDomainValidationAttrs, valDomAttrs, validators;
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
            if ((metadata.domain != null) && (this.domains[metadata.domain] != null)) {
              validators = _.union(validators, this.domains[metadata.domain].validation);
            }
            valDomAttrs[attr] = validators;
          }
        }
        return valDomAttrs;
        constructModelMetaDatas = function(model) {
          if (model.modelName != null) {
            return require(model.modelName);
          }
        };
        return proxyDomainValidationAttrs = function(model) {
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
      };

      return MetadataBuilder;

    })();
    if (isInBrowser) {
      NS.Helpers = NS.Helpers || {};
      return NS.Helpers.MetadataBuilder = MetadataBuilder;
    } else {
      return module.exports = MetadataBuilder;
    }
  })(typeof module === 'undefined' && typeof window !== 'undefined' ? window.Fmk : module.exports);

}).call(this);

/*global Promise, _*/

(function(NS) {
  NS = NS || {};
  
  //Dependency gestion depending on the fact that we are in the browser or in node.
  var isInBrowser = typeof module === 'undefined' && typeof window !== 'undefined';
  var ArgumentNullException = isInBrowser ? NS.Helpers.Exceptions.ArgumentNullException : require("./custom_exception").ArgumentNullException;
  var metadataBuilder = isInBrowser ? NS.Helpers.metadataBuilder : require('./metadata_builder');
  var validators = isInBrowser ? NS.Helpers.validators : require('./validators');
  var validate = function validateModel (model) {
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
        errors[attr] = '' + domainMessage + '' + attr + " not valid."; // Todo: translate the message.
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

  if(isInBrowser){
    NS.Helpers = NS.Helpers || {};
    NS.Helpers.modelValidationPromise = validate;
  }else {
    module.exports = validate;
  }
})(typeof module === 'undefined' && typeof window !== 'undefined' ? window.Fmk : module.exports);
/*global _, $*/


(function(NS) {
    NS = NS || {};
    var isInBrowser = typeof module === 'undefined' && typeof window !== 'undefined';
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
        for (var property in criteria) {
            if (criteria[property] !== undefined && criteria[property] !== null && criteria[property].length > 0) {
                result += property + " eq " + criteria[property] + ",";
            }
        }
        return result.substring(0, result.length - 1);
    }

    //generate orderBy parameters fo odata
    function orderToOdata(sortFields) {
        var orderBy = "";
        sortFields.forEach(function(sortField) {
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
        _.each(server_api, function(value, key) {
            if (_.isFunction(value)) {
                value = _.bind(value, self);
                value = value();
            }
            if (value !== undefined && value !== null && value.toString().length > 0) {
                queryAttributes[key] = value;
            }
        });

        var queryOptions = _.clone(paginator_core);
        _.each(queryOptions, function(value, key) {
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

    odataHelper = {
        createOdataOptions: createOdataOptions,
        parseOdataResponse: parseOdataResponse
    };

    // Differenciating export for node or browser.
    if (isInBrowser) {
        NS.Helpers = NS.Helpers || {};
        NS.Helpers.odataHelper = odataHelper;
    } else {
        module.exports = odataHelper;
    }
})(typeof module === 'undefined' && typeof window !== 'undefined' ? window.Fmk : module.exports);
/*global Backbone, Promise, _*/

(function(NS) {
	NS = NS || {};
	var isInBrowser = typeof module === 'undefined' && typeof window !== 'undefined';
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
		if (model.has('id')) {
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

	var promisifyHelper = {
		Model: PromiseModel,
		Collection: PromiseCollection,
		Convert: {
			Model: ConvertModel,
			Collection: ConvertCollection
		}
	};

	// Differenciating export for node or browser.
	if (isInBrowser) {
		NS.Helpers = NS.Helpers || {};
		NS.Helpers.promisifyHelper = promisifyHelper;
	} else {
		module.exports = promisifyHelper;
	}
})(typeof module === 'undefined' && typeof window !== 'undefined' ? window.Fmk : module.exports);
/*global Promise, $*/

/*global $*/
(function(NS) {
  NS = NS || {};
  //Dependency gestion depending on the fact that we are in the browser or in node.
  var isInBrowser = typeof module === 'undefined' && typeof window !== 'undefined';

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
            references[listDesc.name] = data; //In order to not reload the next time,  warning, as promises are asynchronous, when the promise is define, this could be false.
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
  function loadMany(names) {
    var promises = [];
    names.forEach(function(name) {
      promises.push(loadListByName(name));
    });
    return promises;
  }


  referenceHelper = {
    loadListByName: loadListByName,
    loadMany: loadMany
  };

  // Differenciating export for node or browser.
  if (isInBrowser) {
    NS.Helpers = NS.Helpers || {};
    NS.Helpers.referenceHelper = referenceHelper;
  } else {
    module.exports = referenceHelper;
  }
})(typeof module === 'undefined' && typeof window !== 'undefined' ? window.Fmk : module.exports);
/* global $, _ */
(function(NS) {
  NS = NS || {};
  //Dependency gestion depending on the fact that we are in the browser or in node.
  var isInBrowser = typeof module === 'undefined' && typeof window !== 'undefined';

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

// Differenciating export for node or browser.
  if(isInBrowser){
    NS.Helpers = NS.Helpers || {};
    NS.Helpers.urlHelper = urlHelper;
  }else {
    module.exports = urlHelper;
  }
})(typeof module === 'undefined' && typeof window !== 'undefined' ? window.Fmk : module.exports);
/*global i18n*/

(function(NS) {
	NS = NS || {};
	//Dependency gestion depending on the fact that we are in the browser or in node.
	var isInBrowser = typeof module === 'undefined' && typeof window !== 'undefined';
	var DependencyException = isInBrowser ? NS.Helpers.Exceptions.DependencyException : require("./custom_exception").ArgumentNullException;
	//All regex use in the application.
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
				if (res !== null && res !== undefined) {
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
		if (validator === null) {
			return void 0;
		}
		if (property === null) {
			return void 0;
		}
		isValid = (function() {
			switch (validator.type) {
				case "required":
					var prevalidString = property.value === "" ? false : true;
					var prevalidDate = true;
					return validator.value === true ? (property.value !== null && prevalidString && prevalidDate) : true;
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
		if (isValid === undefined || isValid === null) {
			console.warn('The validator of type: ' + validator.type + ' is not defined'); //Todo: call the logger.
		} else if (isValid === false) {

			//Add the name of the property.
			return getErrorLalel(validator.type, property.name, validator.options); //"The property " + property.name + " is invalid.";
		}
	};

	function getErrorLalel(type, fieldName, options) {
		options = options || {};
		if (!i18n) {
			throw new DependencyException("Dependency not resolved: i18n.js");
		}
		var translationKey = options.translationKey ? options.translationKey : "domain.validation." + type;
		return i18n.translate(translationKey, {
			fieldName: fieldName,
			options: options
		});
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
	var validators = {
		email: emailValidation,
		stringLength: stringLength,
		number: numberValidation,
		validate: validate
	};

	// Differenciating export for node or browser.
	if (isInBrowser) {
		NS.Helpers = NS.Helpers || {};
		NS.Helpers.validators = validators;
	} else {
		module.exports = validators;
	}

})(typeof module === 'undefined' && typeof window !== 'undefined' ? window.Fmk : module.exports);