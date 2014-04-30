/*global window*/
(function initialization(container) {
  container.Fmk = {
    Models: {},
    Views: {},
    Services: {},
    Helpers: {},
    initialize: function initialize(options){
      this.Helpers.metadataBuilder.initialize(options);
      this.Helpers.modelValidationPromise.initialize(options);
    }
  };
})(typeof module === 'undefined' && typeof window !== 'undefined' ? window : exports);
this["Fmk"] = this["Fmk"] || {};
this["Fmk"]["templates"] = this["Fmk"]["templates"] || {};
this["Fmk"]["templates"]["notifications"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n    <strong>";
  if (stack1 = helpers.message) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = (depth0 && depth0.message); stack1 = typeof stack1 === functionType ? stack1.call(depth0, {hash:{},data:data}) : stack1; }
  buffer += escapeExpression(stack1)
    + "</strong><br />\n  ";
  return buffer;
  }

  buffer += "<div class='alert alert-";
  if (stack1 = helpers.cssMessageType) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = (depth0 && depth0.cssMessageType); stack1 = typeof stack1 === functionType ? stack1.call(depth0, {hash:{},data:data}) : stack1; }
  buffer += escapeExpression(stack1)
    + "'>\n  <button type='button' class='close' data-dismiss='alert'>&times;</button>\n  ";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.messages), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n</div>";
  return buffer;
  });;
(function() {
  "use strict";
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  (function(NS) {
    var ArgumentInvalidException, ArgumentNullException, CustomException, DependencyException, NotImplementedException, isInBrowser, mod;
    NS = NS || {};
    isInBrowser = typeof module === 'undefined' && typeof window !== 'undefined';
    CustomException = (function() {
      function CustomException(name, message, options) {
        this.name = name;
        this.message = message;
        this.options = options;
        this.log();
      }

      CustomException.prototype.log = function() {
        return console.error("name", this.name, "message", this.message, "options", this.options);
      };

      CustomException.prototype.toJSON = function() {
        return {
          "name": this.name,
          "message": this.message,
          "options": this.options
        };
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

      function DependencyException(message, options) {
        DependencyException.__super__.constructor.call(this, "DependencyException", message, options);
      }

      return DependencyException;

    })(CustomException);
    mod = {
      CustomException: CustomException,
      NotImplementedException: NotImplementedException,
      ArgumentNullException: ArgumentNullException,
      ArgumentInvalidException: ArgumentInvalidException,
      DependencyException: DependencyException
    };
    if (isInBrowser) {
      NS.Helpers = NS.Helpers || {};
      return NS.Helpers.Exceptions = mod;
    } else {
      return module.exports = mod;
    }
  })(typeof module === 'undefined' && typeof window !== 'undefined' ? window.Fmk : module.exports);

}).call(this);

/*global i18n, _, window*/
(function(NS) {
  "use strict";
  //Filename: helpers/user_helper.js
  var isInBrowser = typeof module === 'undefined' && typeof window !== 'undefined';
  var t = i18n.t || function(s){return s;};
  var ArgumentInvalidException = isInBrowser ? NS.Helpers.Exceptions.ArgumentInvalidException : require("./custom_exception").ArgumentInvalidException;
  //var siteDescriptionHelper = isInBrowser ? NS.Helpers.siteDescriptionHelper : require("./site_description_helper");
  //Setting the default user configuration.
  var userConfiguration = {
    cultureCode: "en-US", //Culture code.
    name: t('default.name'), //User default name.
    timeZone: "us",  //TimeZoneName
    roles: [], //User role lists.,
    routes: []
  };

  //State variable in order to know if it has been loaded once.
  var isLoadedOnce = false;

  //Call this method in order to get a clone of the user informations.
  var getUserInformations = function getConfiguration() {
    return _.clone(userConfiguration);
  };

  //Call this method in order to extend the default user configuration.
  // Only the defined elements will be overriden.
  //Example `configureUserInformations({cultureCode: "fr-FR", timeZone: "uk"})`
  // Result `{{  cultureCode: "fr-FR",  name: default.name,  timeZone: "uk"}`
  var configureUserInformations = function configureUserInformations(configurationElements) {
    _.extend(userConfiguration, configurationElements);
    //If the roles are redefine
    if(configurationElements !== undefined && _.isArray(configurationElements.roles)){
      console.warn('The roles have change, the site description should be reload.');
      //Attention si les roles sont redéfinis il faut rafraîchir le plan du site.
      //siteDescriptionHelper.regenerateRoutes();
    }
    isLoadedOnce = true;
    return getUserInformations();
  };

  // Load the users informations from a promise which is given in arguments.
  var loadUserInformations = function loadUserInformations(promiseOfLoading) {
    return promiseOfLoading.then(function successLoading(loadedConfiguration) {
      configureUserInformations(loadedConfiguration);
    });
  };

  //Test it the user has the given role in parameter.
  var hasRole = function hasRole(role){
    return _.contains(userConfiguration.roles, role);
  };

  //Test if the user has one of the role given in argument.
  //_roles_ should be an array.
  var hasOneRole = function hasOneRole(roles){
    if(!_.isArray(roles)){
      throw new ArgumentInvalidException("The roles should be an array", roles);
    }
    return _.intersection(userConfiguration.roles, roles).length > 0;
  };

  var userHelper = {
    loadUserInformations: loadUserInformations,
    getUserInformations: getUserInformations,
    configureUserInformations: configureUserInformations,
    hasRole: hasRole,
    hasOneRole: hasOneRole
  };
  // Differenciating export for node or browser.
  if (isInBrowser) {
    NS.Helpers = NS.Helpers || {};
    NS.Helpers.userHelper = userHelper;
  } else {
    module.exports = userHelper;
  }
})(typeof module === 'undefined' && typeof window !== 'undefined' ? window.Fmk : module.exports);
/* global window, _*/
(function(NS) {
  "use strict";
  //Filename: helpers/routes_helper.js
  NS = NS || {};
  //Dependency gestion depending on the fact that we are in the browser or in node.
  var isInBrowser = typeof module === 'undefined' && typeof window !== 'undefined';
  var ArgumentNullException = isInBrowser ? NS.Helpers.Exceptions.ArgumentNullException : require("./custom_exception").ArgumentNullException;
 var ArgumentInvalidException = isInBrowser ? NS.Helpers.Exceptions.ArgumentInvalidException : require("./custom_exception").ArgumentInvalidException;
  //Module page.
  var siteDescriptionStructure,
    siteDescriptionParams,
    isProcess = false;
  //Define the application site description.
  //The siteDescription must be a function which return an object with the following structure: 
  // `{headers: [{name: "NameOfTheModule", url: "#nameOftheModule/:param, roles:['CHIEF', 'MASTER']", headers: [[{name: "NameOfTheModule", url: "#nameOftheModule/:param, roles:['CHIEF', 'MASTER']", headers: []}]]}]}`
  var defineSite = function defineSite(siteDescription) {
    if (typeof siteDescription !== "object") {
      throw new ArgumentNullException('SiteDescription must be an object', siteDescription);
    }
    if (typeof siteDescription.params !== "object") {
      throw new ArgumentNullException('SiteDescription.params must be an object', siteDescription);
    }
    if (typeof siteDescription.value !== "function") {
      throw new ArgumentNullException('SiteDescription.value must be a function', siteDescription);
    }
    siteDescriptionParams = siteDescription.params || {};
    siteDescriptionStructure = siteDescription.value;
    return getSite();
  };

  //param must be a {name: 'paramName', value: 'paramValue'} object.
  var defineParam = function(param) {
    if(param === undefined){
      throw new ArgumentNullException('You cannot set an undefined param.', param);
    }
    //console.log("Debug", param.name, siteDescriptionParams,siteDescriptionParams['codePays']);
    if(siteDescriptionParams[param.name] === undefined){
      throw new ArgumentNullException('The parameter you try to define has not been anticipated by the siteDescription', {param: param, siteParams: siteDescriptionParams});
    }
    if (siteDescriptionParams[param.name].value === param.value) {
      console.warn('No changes on param', param);
      return false;
    }
    siteDescriptionParams[param.name] = {
      value: param.value,
      isDefine: true
    };
    isProcess = false;
    return true;
  };

  //Get the site process 
  var getSite = function getSite() {
    isProcess = true;
    return siteDescriptionStructure(siteDescriptionParams);
  };

  //Check if the params is define in the params list.
  var checkParams = function checkParams(paramsArray) {
    if(typeof paramsArray === "undefined"){
      return true;
    }
    if (!_.isArray(paramsArray)) {
      throw new ArgumentInvalidException("The paramsArray must be an array");
    }
    if(_.intersection(_.keys(siteDescriptionParams), paramsArray).length !== paramsArray.length){
      return false;
    }
    for (var prop in siteDescriptionParams) {
      if ( _.contains(paramsArray, prop) && !siteDescriptionParams[prop].isDefine) {
        return false;
      }
    }
    return true;
  };

  var siteDescriptionHelper = {
    defineSite: defineSite,
    defineParam: defineParam,
    getSite: getSite,
    getParams: function(){return _.clone(siteDescriptionParams);},
    checkParams: checkParams,
    isProcessed: function isProcessed() {
      return isProcess;
    }
  };

  // Differenciating export for node or browser.
  if (isInBrowser) {
    NS.Helpers = NS.Helpers || {};
    NS.Helpers.siteDescriptionHelper = siteDescriptionHelper;
  } else {
    module.exports = siteDescriptionHelper;
  }
})(typeof module === 'undefined' && typeof window !== 'undefined' ? window.Fmk : module.exports);
/*global i18n, window*/
"use strict";
(function(NS) {
	//Filename: helpers/validators.js
	NS = NS || {};
	//Dependency gestion depending on the fact that we are in the browser or in node.
	var isInBrowser = typeof module === 'undefined' && typeof window !== 'undefined';
	var DependencyException = isInBrowser ? NS.Helpers.Exceptions.DependencyException : require("./custom_exception").DependencyException;
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
    //Function to validate a date.
	function dateValidation(dateToValidate, options) {
	    return moment(dateToValidate).isValid();
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
	var validate = function validate(property, validators) {
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

	var validateProperty = function validateProperty(property, validator) {
		var isValid;
		if (!validator) {
			return void 0;
		}
		if (!property) {
			return void 0;
		}
		isValid = (function() {
			switch (validator.type) {
				case "required":
					var prevalidString = property.value === "" ? false : true;
					var prevalidDate = true;
					return validator.value === true ? (property.value !== null && property.value !== undefined && prevalidString && prevalidDate) : true;
				case "regex":
					return validator.value.test(property.value);
				case "email":
					return emailValidation(property.value, validator.options);
				case "number":
					return numberValidation(property.value, validator.options);
				case "string":
					var stringToValidate = property.value || "";
					return stringLength(stringToValidate, validator.options);
			    case "date":
			        return dateValidation(property.value, validator.options);
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
(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  (function(NS) {
    "use strict";
    var Collection, isInBrowser;
    NS = NS || {};
    isInBrowser = typeof module === 'undefined' && typeof window !== 'undefined';
    Collection = (function(_super) {
      __extends(Collection, _super);

      function Collection() {
        return Collection.__super__.constructor.apply(this, arguments);
      }

      Collection.prototype.modelName = void 0;

      Collection.prototype.changes = {
        creates: {},
        updates: {},
        deletes: {}
      };

      Collection.prototype.addModel = function(model) {
        if (model.isNew()) {
          return this.changes.creates[model.cid] = model.toSaveJSON();
        } else {
          return this.updateModel(model);
        }
      };

      Collection.prototype.updateModel = function(model) {
        return this.changes.updates[model.cid] = model.toSaveJSON();
      };

      Collection.prototype.deleteModel = function(model) {
        if (this.changes.add[model.cid] != null) {
          delete this.changes.add[model.cid];
        }
        if (this.changes.updates[model.cid] != null) {
          this.changes.deletes[model.cid] = model.toSaveJSON();
          return delete this.changes.updates[model.cid];
        }
      };

      Collection.prototype.resetModels = function(models) {
        this.changes = {
          creates: {},
          updates: {},
          deletes: {}
        };
        return models.forEach(this.addModel, this);
      };

      Collection.prototype.initialize = function() {
        this.on('add', (function(_this) {
          return function(model) {
            return _this.addModel(model);
          };
        })(this));
        this.on('remove', (function(_this) {
          return function(model) {
            return _this.deleteModel(model);
          };
        })(this));
        this.on('change', (function(_this) {
          return function(model) {
            return _this.updateModel(model);
          };
        })(this));
        return this.on('reset', (function(_this) {
          return function(models) {
            return _this.resetModels(models);
          };
        })(this));
      };

      Collection.prototype.toJSON = function() {
        var jsonModel;
        jsonModel = Collection.__super__.toJSON.call(this);
        jsonModel.modelName = this.modelName || this.get('modelName');
        return jsonModel;
      };

      Collection.prototype.toSaveJSON = function(propertyPrefix) {
        var creates, deletes, updates;
        propertyPrefix = propertyPrefix || "";
        creates = "" + propertyPrefix + "create";
        updates = "" + propertyPrefix + "update";
        deletes = "" + propertyPrefix + "delete";
        return {
          creates: _.map(this.changes.creates, function(value, key) {
            return value;
          }),
          updates: _.map(this.changes.updates, function(value, key) {
            return value;
          }),
          deletes: _.map(this.changes.deletes, function(value, key) {
            return value;
          })
        };
      };

      return Collection;

    })(Backbone.Collection);
    if (isInBrowser) {
      NS.Models = NS.Models || {};
      return NS.Models.Collection = Collection;
    } else {
      return module.exports = Collection;
    }
  })(typeof module === 'undefined' && typeof window !== 'undefined' ? window.Fmk : module.exports);

}).call(this);

(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  (function(NS) {
    "use strict";
    var Model, isInBrowser;
    NS = NS || {};
    isInBrowser = typeof module === 'undefined' && typeof window !== 'undefined';
    Model = (function(_super) {
      __extends(Model, _super);

      function Model() {
        return Model.__super__.constructor.apply(this, arguments);
      }

      Model.prototype.initialize = function(options) {
        options = options || {};
        Model.__super__.initialize.call(this, options);
        if (options.modelName != null) {
          return this.modelName = options.modelName;
        }
      };

      Model.prototype.unsetErrors = function(options) {
        var silent;
        options = options || {};
        silent = options.silent || false;
        return this.unset('errors', {
          silent: silent
        });
      };

      Model.prototype.setErrors = function(errors) {
        if (errors != null) {
          return this.set({
            'errors': errors
          });
        }
      };

      Model.prototype.modelName = void 0;

      Model.prototype.toJSON = function() {
        var jsonModel;
        jsonModel = Model.__super__.toJSON.call(this);
        jsonModel.metadatas = this.metadatas;
        jsonModel.modelName = this.modelName || this.get('modelName');
        return jsonModel;
      };

      Model.prototype.toSaveJSON = function() {
        return Backbone.Model.prototype.toJSON.call(this);
      };

      return Model;

    })(Backbone.Model);
    if (isInBrowser) {
      NS.Models = NS.Models || {};
      return NS.Models.Model = Model;
    } else {
      return module.exports = Model;
    }
  })(typeof module === 'undefined' && typeof window !== 'undefined' ? window.Fmk : module.exports);

}).call(this);

/*global Backbone, window, module*/
"use strict";
(function(NS) {
  //Filename: models/notification.js
  NS = NS || {};
  //Dependency gestion depending on the fact that we are in the browser or in node.
  var isInBrowser = typeof module === 'undefined' && typeof window !== 'undefined';

  //Notification model
  var Notification = Backbone.Model.extend({
    defaults: {
      type: undefined, //error/warning/success...
      message: undefined // The message which have to be display.
    },
    initialize: function initializeNotification() {
      this.set({
        creationDate: new Date()
      }, {
        silent: true
      });
    }
  });

  // Differenciating export for node or browser.
  if (isInBrowser) {
    NS.Models = NS.Models || {};
    NS.Models.Notification = Notification;
  } else {
    module.exports = Notification;
  }
})(typeof module === 'undefined' && typeof window !== 'undefined' ? window.Fmk : module.exports);
	/*global _, Backbone, window*/
  "use strict";
	(function(NS) {
		// Filename: models/notifications.js
		NS = NS || {};
		//Dependency gestion depending on the fact that we are in the browser or in node.
		var isInBrowser = typeof module === 'undefined' && typeof window !== 'undefined';
		var Notification = isInBrowser ? NS.Models.Notification : require('./notification');

		//This collection will contains all the message which will be display in the application.
		var Notifications = Backbone.Collection.extend({
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

		// Differenciating export for node or browser.
		if (isInBrowser) {
			NS.Models = NS.Models || {};
			NS.Models.Notifications = Notifications;
		} else {
			module.exports = Notifications;
		}
	})(typeof module === 'undefined' && typeof window !== 'undefined' ? window.Fmk : module.exports);
/* global window */
(function(NS) {
 "use strict";
  // Filename: models/paginatedCollection.js
  NS = NS || {};
  var isInBrowser = typeof module === 'undefined' && typeof window !== 'undefined';
  var ArgumentInvalidException = isInBrowser ? NS.Helpers.Exceptions.ArgumentInvalidException : require("../helpers/custom_exception").ArgumentInvalidException;
  var Collection = isInBrowser ? NS.Models.Collection : require('./collection');

 // Paginated collection.
  var PaginatedCollection = Collection.extend({
      //first number of page
      firstPage: 1,
      //the page loaded
      currentPage: 1,
      // number of records par page
      perPage: 10,
      // total number og pages. default initialization
      totalPages: 10,
      //sort fields
      sortField: {},

      pageInfo: function pageInfo() {
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

      setPage: function setPage(page) {
          page = page || 1;
          this.currentPage = page;
      },

      setPerPage: function setPerPage(perPage) {
          perPage = perPage || 10;
          this.perPage = perPage;
      },

      setNextPage: function setNextPage() {
          //TODO : controller si pas de page suivante
          this.currentPage++;
      },

      setPreviousPage: function setPreviousPage() {
          //TODO: controller si pas de page précedente
          this.currentPage--;
      },

      setSortField: function setSortField(field, order) {
          order = order || "asc";
          if (field === undefined || (order !== "asc" && order !== "desc")) {
              throw new ArgumentInvalidException("sort arguments invalid");
          }
          this.sortField = {
              field: field,
              order: order
          };

          this.currentPage = this.firstPage;
      },

      setTotalRecords: function setTotalRecords(totalRecords) {
          this.totalRecords = totalRecords;
      }
  });
  // Differenciating export for node or browser.
  if (isInBrowser) {
    NS.Models = NS.Models || {};
    NS.Models.PaginatedCollection = PaginatedCollection;
  } else {
    module.exports = PaginatedCollection;
  }
})(typeof module === 'undefined' && typeof window !== 'undefined' ? window.Fmk : module.exports);
/*global Backbone, window*/
"use strict";
(function(NS) {
	//Filename: views/notifications-view.js
	NS = NS || {};
	var isInBrowser = typeof module === 'undefined' && typeof window !== 'undefined';
	var template = isInBrowser ? NS.templates.notifications : ""; //require('./templates/notifications'); //Todo: call a handlebars function.
	var NotificationsView = Backbone.View.extend({
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
			printMessageIfExists('errorMessages', this); //The this is put into a closure in order to not lose it.
			printMessageIfExists('warningMessages', this);
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


	if (isInBrowser) {
		NS.Views = NS.Views || {};
		NS.Views.NotificationsView = NotificationsView;
	} else {
		module.exports = NotificationsView;
	}
})(typeof module === 'undefined' && typeof window !== 'undefined' ? window.Fmk : module.exports);
/*global window, _,  $*/
"use strict";
(function(NS) {
  // Filename: post_rendering_helper.js
  NS = NS || {};
  var isInBrowser = typeof module === 'undefined' && typeof window !== 'undefined';
  var ArgumentInvalidException = isInBrowser ? NS.Helpers.Exceptions.ArgumentInvalidException : require("./custom_exception").ArgumentInvalidException;
  var ArgumentNullException = isInBrowser ? NS.Helpers.Exceptions.ArgumentNullException : require("./custom_exception").ArgumentNullException;
  var DependencyException = isInBrowser ? NS.Helpers.Exceptions.DependencyException : require("./custom_exception").DependencyException;
  //Container for all the post renderings functions.
  var postRenderingHelpers = {};
  //Register a helper inside the application.
  //Example call: `Fmk.postRenderingHelper.registerHelper({name: "hlpName", fn: fct})`
  var registerHelper = function registerHelper(helper) {
      if (helper === undefined || helper === null || _.isEmpty(helper)) {
          throw new ArgumentNullException("registerHelper, helper argument cannot be null or undefined ");
      }
      if (helper.name === null || helper.name === undefined) {
          throw new ArgumentNullException("registerHelper, helper.name cannot be null or undefined");
      }
      if (typeof helper.name !== "string") {
          throw new ArgumentInvalidException("registerHelper, helper.name must be a string.", helper);
      }
      if (helper.fn === null || helper.fn === undefined) {
          throw new ArgumentNullException("registerHelper, helper.fn cannot be null or undefined");
      }
      if (typeof helper.fn !== "string") {
          throw new ArgumentInvalidException("registerHelper, helper.fn must be a function name: a string.", helper);
      }
      if (!$.fn[helper.fn]) {
          throw new DependencyException("registerHelper, helper.fn: "+ helper.fn +" must be a registered JQuery plugin in $.fn");
      }
      postRenderingHelpers[helper.name] = {fn: helper.fn, options: helper.options};
  };
  //Options must have a selector property and a helperName one.
  var callHelper = function callHelper(config) {
      
    //If there is nothing selected.
    if(config.selector === undefined || config.selector.size() === 0){
      return;
    }
    if (typeof config.helperName !== "string") {
        throw new ArgumentInvalidException("callHelper, config.helperName must be a string, check your in your domain file any the decorator property", config);
    }
    //If the function  desn not exist on the selection.
    if(config.selector[postRenderingHelpers[config.helperName].fn] === undefined){
      return;
    }
    var postRenderingOptions = postRenderingHelpers[config.helperName].options;
    if (config.decoratorOptions) {
        //Extend the post rendering options defined in the helper definition with options define in the model (optionnaly)
        // For each property: `Model.extend({metadatas:{propertyName: {decoratorOptions: {opt1: 1, opt2: 2}}}})`
        _.extend(postRenderingOptions, config.decoratorOptions);
    }
    config.selector[postRenderingHelpers[config.helperName].fn](postRenderingOptions);
    //config.selector[config.helperName](options);
  };
  var mdl = {
    registerHelper: registerHelper,
    callHelper: callHelper
  };
    // Differenciating export for node or browser.
  if (isInBrowser) {
    NS.Helpers = NS.Helpers || {};
    NS.Helpers.postRenderingHelper = mdl;
  } else {
    module.exports = mdl;
  }

})(typeof module === 'undefined' && typeof window !== 'undefined' ? window.Fmk : module.exports);
﻿/* global  _ , window */
(function(NS) {
    "use strict";
    //Filename: helpers/util_helper.js
    var isInBrowser = typeof module === 'undefined' && typeof window !== 'undefined';
    NS = NS || {};
    var JSON = {};

    // Unflatten a json object.
    // from an object `{"contact.nom": "Nom", "contact.prenom": "Prenom"}`
    // Gives a `{contact: {nom: "nom", prenom: "prenom"}}`
    JSON.unflatten = function(data) {
        if (Object(data) !== data || Array.isArray(data))
            return data;
        if ("" in data)
            return data[""];
        var result = {}, cur, prop, idx, last, temp;
        for (var p in data) {
            cur = result;
            prop = "";
            last = 0;
            do {
                idx = p.indexOf(".", last);
                temp = p.substring(last, idx !== -1 ? idx : undefined);
                cur = cur[prop] || (cur[prop] = (!isNaN(parseInt(temp)) ? [] : {}));
                prop = temp;
                last = idx + 1;
            } while (idx >= 0);
            cur[prop] = data[p];
        }
        return result[""];
    };

    //Flatten a json object.
    // from an object`{contact: {nom: "nom", prenom: "prenom"}}` 
    // Gives a one level object:  `{"contact.nom": "Nom", "contact.prenom": "Prenom"}`
    JSON.flatten = function(data) {
        var result = {};

        function recurse(cur, prop) {
            if (Object(cur) !== cur) {
                result[prop] = cur;
            } else if (Array.isArray(cur)) {
                for (var i = 0, l = cur.length; i < l; i++)
                    recurse(cur[i], prop ? prop + "." + i : "" + i);
                if (l === 0)
                    result[prop] = [];
            } else {
                var isEmpty = true;
                for (var p in cur) {
                    isEmpty = false;
                    recurse(cur[p], prop ? prop + "." + p : p);
                }
                if (isEmpty)
                    result[prop] = {};
            }
        }
        recurse(data, "");
        return result;
    };
    //Deeply combine two json.
    function combine(json1, json2) {
        var res = {};
        _.extend(
            res,
            JSON.flatten(json1),
            JSON.flatten(json2)
        );
        return JSON.unflatten(res);
    }
    //Generate four random hex digits.

    function S4() {
        return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    }
    //Generate a pseudo-GUID by concatenating random hexadecimal.
    function guid() {
        return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
    }

    //This method allows the user to load a data (objet or list) in a promise
    // Exampl call: refHelper.loadLocalData([{id: 1, label: "nom 1"}, {id: 1, label: "nom 2"}])
    var loadLocalData = function loadLocalData(data) {
        return new Promise(function promiseLoadLocalList(resolve, reject) {
            resolve(data);
        });
    };

    //Generate fake datas.
    var generateFake = {
        //Generate an aleafied object
        object: function generateFalseData(obj) {
            var objAla = {};
            for (var prop in obj) {
                //todo: differenciate the treatement swithcing on type.
                objAla[prop] = '' + obj[prop] + S4();
            }
            return objAla;
        },
        //Generate a fake collection from a single object, adding, nb is th array size.
        collection: function geenerateFalseCollection(obj, nb) {
            var res = [];
            for (var i = 0; i < nb; i++) {
                res.push(this.object(obj));
            }
            return res;
        }

    };
    //Method to call in order to know if a model is a collection
    var isBackboneModel = function isBackboneModel(model) {
        return model !== undefined && model !== null && typeof model.has === "function";
    };

    // Method to call 
    var isBackboneCollection = function isBackboneCollection(collection) {
        return collection !== undefined && collection !== null && typeof collection.add === "function";
    };

    //Method to call in order to know of an object is a view.
    var isBackboneView = function isBackboneView(view) {
        return view !== undefined && view !== null && typeof view.render === "function";
    };

    //Util helper.
    var utilHelper = {
        flatten: JSON.flatten,
        unflatten: JSON.unflatten,
        combine: combine,
        loadLocalData: loadLocalData,
        guid: guid,
        generateFake: generateFake,
        isBackboneModel: isBackboneModel,
        isBackboneCollection: isBackboneCollection,
        isBackboneView: isBackboneView
    };
    if (isInBrowser) {
        NS.Helpers = NS.Helpers || {};
        NS.Helpers.utilHelper = utilHelper;
    } else {
        module.exports = utilHelper;
    }
})(typeof module === 'undefined' && typeof window !== 'undefined' ? window.Fmk : module.exports);
/*global $,window*/
"use strict";
(function(NS) {
  // Filename: helpers/backbone_notifications.js
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
    //Add a notification in the stack. Is isRender is define and is true, the notifications are displayed.
    // Example call 
    //```javascript
    // Fmk.helpers.backboneNotifications.addNotification({type: "error", message: "Message"}, true);
    // //Render the notifications in the page.
    // ```
    addNotification: function addNotification(jsonNotification, isRender) {
      isRender = isRender || false;
      this.notificationsView.model.add(jsonNotification);
      if (isRender) {
        this.renderNotifications();
      }
    },
    // Render all the notifications which are in the notifications collection and then clear this list.
    // The selector can be overriden.
    // If a timeout is define, the notification is hidden after _timeout_ seconds.
    // Once the notifications have been rendered, the messages stack is cleared.
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
				globalErrors.push('' + responseErrors.statusCode + ' ' + responseErrors.error);
			} else if (responseErrors.errors !== undefined) {
				// there errors in the response
				_.each(responseErrors.errors, function(error) {
					//If there is field errors inside the response, add it to the current object errors.
					if (error.fieldName !== undefined && error.fieldName.length > 0) {
						fieldErrors[error.fieldName] = error.message;
					} else {
						//If there is no fieldname, the error is global.
						globalErrors.push(error.message);
					}
				});
			} else if (responseErrors.exceptionType !== undefined) {
				//If the error is not catch by the errorHelper, in dev, display the type and the message if exists.
				globalErrors.push(i18n.t('error.' + responseErrors.exceptionType));
				if (responseErrors.exceptionMessage !== undefined) {
					globalErrors.push(responseErrors.exceptionMessage);
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
/*global window, $, Backbone*/
"use strict";
(function (NS) {
    //Filename: helpers/form_helper.js
    var isInBrowser = typeof module === 'undefined' && typeof window !== 'undefined';
    NS = NS || {};
    
    // ## Helper pour l'ensemble des formulaires.
    //
    var _formCollectionBinder = function forCollectionBinder(selector, collection, options){
        options = options || {};
        options.isSilent = options.isSilent || true;
        if(selector !== undefined && selector !== null  && collection instanceof Backbone.Collection){
            //collection.reset(null, {silent: true}); // The collection is cleared.
            var index = 0;
            Array.prototype.forEach.call(selector , function(modelLineSelector){
                //var model = new collection.model();
                this.formModelBinder(
                        {inputs: $('input', modelLineSelector), options:$('select', modelLineSelector)} ,
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
        inputs.each(function () {
            var input = this;
            //console.log('input', input);
            var currentvalue;
            //we switch on all html5 values
            switch (input.getAttribute('type')) {
                case "checkbox":
                    currentvalue = input.checked;
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
            modelContainer[this.getAttribute('data-name')] = currentvalue ;
        });
        model.set(modelContainer, {
            silent: options.isSilent
        });
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
        optionsSets.each(function () {
            var attributeName = this.getAttribute('data-name');
            //A multiple option will be define with select2
            if (this.hasAttribute('multiple')) {
                selectedValue = $(this).select2('val');
            } else {
                selectedValue = this.value;
            }
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
        modelFormGenerator: _modelFormGenerator,
        formCollectionBinder: _formCollectionBinder
    };

    // Differentiate the export.
    if (isInBrowser) {
        NS.Helpers = NS.Helpers || {};
        NS.Helpers.formHelper = formHelper;
    } else {
        module.exports = formHelper;
    }
})(typeof module === 'undefined' && typeof window !== 'undefined' ? window.Fmk : module.exports);
(function() {
  "use strict";
  (function(NS) {
    var format, formaters, isInBrowser;
    NS = NS || {};
    isInBrowser = typeof module === 'undefined' && typeof window !== 'undefined';
    format = {
      currency: '0,0.00',
      date: 'DD/MM/YYYY',
      dateTime: 'DD/MM/YYYY HH:mm:ss'
    };
    formaters = {};
    formaters.configure = function(options) {
      return _.extend(format, options);
    };
    formaters.date = function(prop, options) {
      var dateFormat;
      options = options || {};
      dateFormat = options.dateFormat || format.date;
      return moment(prop).format(dateFormat);
    };
    formaters.dateTime = function(prop, options) {
      var dateTimeFormat;
      options = options || {};
      dateTimeFormat = options.dateTimeFormat || format.dateTime;
      return moment(prop).format(dateTimeFormat);
    };
    formaters.currency = function(prop, options) {
      var numeralFormat;
      options = options || {};
      numeralFormat = options.numeralFormat || format.currency;
      return numeral(prop).format(numeralFormat);
    };
    if (isInBrowser) {
      NS.Helpers = NS.Helpers || {};
      return NS.Helpers.formaters = formaters;
    } else {
      return module.exports = formaters;
    }
  })(typeof module === 'undefined' && typeof window !== 'undefined' ? window.Fmk : module.exports);

}).call(this);

"use strict";
/*global window*/
(function (NS) {
    // Filename: helpers/metadata_builder.coffee
    NS = NS || {};
    //Dependency gestion depending on the fact that we are in the browser or in node.
    var isInBrowser = typeof module === 'undefined' && typeof window !== 'undefined';

    var headerHelper = {
        //Process all the data from the header.
        process: function processHeader(headersElements) {
            var headerData = [];
            for (var i = 0, l = headersElements.length; i < l; i++) {
                var active = i === 0 ? "active" : "";
                var subHeaders = headersElements[i].subHeader;
                var subHeaderData = [];
                for (var j = 0 ; j < subHeaders.length ; j++) {
                    var sub2HeaderData = [];
                    if (subHeaders[j].sub2Header !== undefined) {
                        var sub2Headers = subHeaders[j].sub2Header;
                        for (var k = 0 ; k < sub2Headers.length ; k++) {
                            var sub2HeaderName = sub2Headers[k].name;
                            var sub2Header = {
                                cssId: "nav-" + sub2HeaderName,
                                active: "",
                                name: sub2HeaderName,
                                translationKey: "header.subHeaders.sub2Headers." + sub2HeaderName,
                                url: sub2Headers[k].url
                            };
                            sub2HeaderData.push(sub2Header);
                        }
                    }

                    var subHeaderName = subHeaders[j].name;
                    subHeaderData.push({
                        cssId: "nav-" + subHeaderName,
                        active: "",
                        name: subHeaderName,
                        translationKey: "header.subHeaders." + subHeaderName,
                        url: subHeaders[j].url,
                        sub2Headers: sub2HeaderData
                    });
                }
                var name = headersElements[i].name;
                var jsonElement = {
                    cssId: "nav-" + name,
                    active: active,
                    name: name,
                    translationKey: "header." + name,
                    subHeaders: subHeaderData
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
  "use strict";
  (function(NS) {
    var ArgumentNullException, MetadataBuilder, isInBrowser, proxyValidationContainer;
    NS = NS || {};
    isInBrowser = typeof module === 'undefined' && typeof window !== 'undefined';
    ArgumentNullException = isInBrowser ? NS.Helpers.Exceptions.ArgumentNullException : require("./custom_exception").ArgumentNullException;
    proxyValidationContainer = {};
    MetadataBuilder = (function() {
      function MetadataBuilder() {}

      MetadataBuilder.prototype.initialize = function(options, cb) {
        if (options == null) {
          throw new ArgumentNullException('The metadata builder needs options with domains and metadatas.');
        }
        if (options.domains == null) {
          throw new ArgumentNullException('The metadata builder needs domains in options.');
        }
        if (options.metadatas == null) {
          throw new ArgumentNullException('The metadata builder needs metadatas in options.');
        }
        this.domains = options.domains;
        this.metadatas = options.metadatas;
        this.isLog = options.isLog;
        if (cb != null) {
          return cb(this.domains, this.metadatas);
        }
      };

      MetadataBuilder.prototype.getDomainsValidationAttrs = function(model) {
        var attr, md, metadatas, valDomAttrs, validators;
        if (model == null) {
          return new ArgumentNullException('The model should exists and have a metadatas property.');
        }
        metadatas = this.getMetadatas(model);
        valDomAttrs = {};
        for (attr in metadatas) {
          md = metadatas[attr] || {};
          if (((md.isValidationOff != null) && md.isValidationOff === false) || (md.isValidationOff == null)) {

            /*_.extend(metadata, md.metadata) if md.metadata?
            (metadata.domain = md.domain) if md.domain?
            (metadata.required = md.required) if md.required?
             */
            validators = [];
            if (md.required === true) {
              validators.push({
                "type": "required",
                "value": true
              });
            }
            if ((md.domain != null) && (this.domains[md.domain] != null)) {
              validators = _.union(validators, this.domains[md.domain].validation);
            }
            valDomAttrs[attr] = validators;
          }
        }
        return valDomAttrs;
      };

      MetadataBuilder.prototype.getMetadatas = function(model) {
        var entityAttrMetadata, entityMetadatas, mdlMetadata, mdlMetadataAttr, metadata, metadatas, metadatasAttrs, overridenProperties, _i, _len;
        if (model == null) {
          throw new ArgumentNullException("In order to get metadatas , you must provide a model.");
        }
        entityMetadatas = this.constructEntityMetaDatas(model);
        metadatas = _.clone(entityMetadatas);
        metadatasAttrs = _.keys(metadatas);
        if (model.metadatas != null) {
          metadatasAttrs = _.union(metadatasAttrs, _.keys(model.metadatas));
        }
        for (_i = 0, _len = metadatasAttrs.length; _i < _len; _i++) {
          mdlMetadataAttr = metadatasAttrs[_i];
          entityAttrMetadata = entityMetadatas[mdlMetadataAttr];
          mdlMetadata = (model.metadatas != null) && (model.metadatas[mdlMetadataAttr] != null) ? model.metadatas[mdlMetadataAttr] : void 0;
          metadata = {};
          _.extend(metadata, entityAttrMetadata);
          _.extend(metadata, _.omit(this.domains[metadata.domain], 'validation'));
          if (mdlMetadata != null) {
            if (mdlMetadata.metadata != null) {
              _.extend(metadata, mdlMetadata.metadata);
            }
            _.extend(metadata, _.omit(this.domains[metadata.domain], 'validation'));
            overridenProperties = {};
            if (mdlMetadata.domain != null) {
              _.extend(overridenProperties, {
                domain: mdlMetadata.domain
              });
              _.extend(overridenProperties, _.omit(this.domains[mdlMetadata.domain], 'validation'));
            }
            if (mdlMetadata.required != null) {
              _.extend(overridenProperties, {
                required: mdlMetadata.required
              });
            }
            if (mdlMetadata.label != null) {
              _.extend(overridenProperties, {
                label: mdlMetadata.label
              });
            }
            if (mdlMetadata.isValidationOff != null) {
              _.extend(overridenProperties, {
                isValidationOff: mdlMetadata.isValidationOff
              });
            }
            if (mdlMetadata.style != null) {
              _.extend(overridenProperties, {
                style: mdlMetadata.style
              });
            }
            if (mdlMetadata.decorator != null) {
              _.extend(overridenProperties, {
                decorator: mdlMetadata.decorator
              });
            }
            if (mdlMetadata.symbol != null) {
              _.extend(overridenProperties, {
                symbol: mdlMetadata.symbol
              });
            }
            if (mdlMetadata.decoratorOptions != null) {
              _.extend(overridenProperties, {
                decoratorOptions: mdlMetadata.decoratorOptions
              });
            }
            if (!_.isEmpty(overridenProperties)) {
              _.extend(metadata, overridenProperties);
            }
          }
          metadatas[mdlMetadataAttr] = metadata;
        }
        return metadatas;
      };

      MetadataBuilder.prototype.getMetadataForAttribute = function(model, attribute) {
        var entityAttrMetadata, mdlMetadata, metadata, overridenProperties;
        if (model == null) {
          throw new ArgumentNullException("In order to get metadatas for an attribute of a model , you must provide a model.");
        }
        if (attribute == null) {
          throw new ArgumentNullException("In order to get metadatas for an attribute of a model , you must provide an attribute.");
        }
        entityAttrMetadata = this.constructEntityMetaDatas(model)[attribute];
        mdlMetadata = (model.metadatas != null) && (model.metadatas[attribute] != null) ? model.metadatas[attribute] : void 0;
        metadata = {};
        _.extend(metadata, entityAttrMetadata);
        _.extend(metadata, _.omit(this.domains[metadata.domain], 'validation'));
        if (mdlMetadata != null) {
          if (mdlMetadata.metadata != null) {
            _.extend(metadata, mdlMetadata.metadata);
          }
          _.extend(metadata, _.omit(this.domains[metadata.domain], 'validation'));
          overridenProperties = {};
          if (mdlMetadata.domain != null) {
            _.extend(overridenProperties, {
              domain: mdlMetadata.domain
            });
            _.extend(overridenProperties, _.omit(this.domains[mdlMetadata.domain], 'validation'));
          }
          if (mdlMetadata.required != null) {
            _.extend(overridenProperties, {
              required: mdlMetadata.required
            });
          }
          if (mdlMetadata.label != null) {
            _.extend(overridenProperties, {
              label: mdlMetadata.label
            });
          }
          if (mdlMetadata.isValidationOff != null) {
            _.extend(overridenProperties, {
              isValidationOff: mdlMetadata.isValidationOff
            });
          }
          if (mdlMetadata.style != null) {
            _.extend(overridenProperties, {
              style: mdlMetadata.style
            });
          }
          if (mdlMetadata.decorator != null) {
            _.extend(overridenProperties, {
              decorator: mdlMetadata.decorator
            });
          }
          if (mdlMetadata.symbol != null) {
            _.extend(overridenProperties, {
              symbol: mdlMetadata.symbol
            });
          }
          if (mdlMetadata.decoratorOptions != null) {
            _.extend(overridenProperties, {
              decoratorOptions: mdlMetadata.decoratorOptions
            });
          }
          if (!_.isEmpty(overridenProperties)) {
            _.extend(metadata, overridenProperties);
          }
        }
        return metadata;
      };

      MetadataBuilder.prototype.constructEntityMetaDatas = function(model) {
        var mdName;
        if (model.modelName != null) {
          mdName = model.modelName.split('.');
          if (mdName.length === 1) {
            if (this.metadatas[model.modelName] != null) {
              return this.metadatas[model.modelName];
            } else {
              if (this.isLog) {
                console.warn("The metadatas does not have properties for model '" + model.modelName + "'.");
              }
              return {};
            }
          } else {
            if (this.metadatas[mdName[0]][mdName[1]] != null) {
              return this.metadatas[mdName[0]][mdName[1]];
            } else {
              if (this.isLog) {
                console.warn("The metadatas does not have properties for model '" + model.modelName + "'.");
              }
              return {};
            }
          }
        } else {
          throw new ArgumentNullException('The model should have a model name in order to build its metadatas');
        }
      };

      MetadataBuilder.prototype.proxyDomainValidationAttrs = function(model) {
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

      return MetadataBuilder;

    })();
    if (isInBrowser) {
      NS.Helpers = NS.Helpers || {};
      NS.Helpers.MetadataBuilder = MetadataBuilder;
      return NS.Helpers.metadataBuilder = new MetadataBuilder();
    } else {
      return module.exports = {
        MetadataBuilder: MetadataBuilder,
        metadataBuilder: new MetadataBuilder()
      };
    }
  })(typeof module === 'undefined' && typeof window !== 'undefined' ? window.Fmk : module.exports);

}).call(this);

/*global Promise, _, window, Backbone*/
(function(NS) {
  "use strict";
  NS = NS || {};
  //Filename: helpers/model_validation_promise.js

  //Dependency gestion depending on the fact that we are in the browser or in node.
  var isInBrowser = typeof module === 'undefined' && typeof window !== 'undefined';
  var ArgumentNullException = isInBrowser ? NS.Helpers.Exceptions.ArgumentNullException : require("./custom_exception").ArgumentNullException;
  var ArgumentInvalidException = isInBrowser ? NS.Helpers.Exceptions.ArgumentInvalidException : require("./custom_exception").ArgumentInvalidException;
  var metadataBuilder = isInBrowser ? NS.Helpers.metadataBuilder : require('./metadata_builder').metadataBuilder;
  var validators = isInBrowser ? NS.Helpers.validators : require('./validators');
  
  //Validation function without promises.
  //This can  is use in promise validation function and in the collection validation.
  //In order to return only one promise well structured.
  var validateNoPromise = function validateModelWithoutPromise(model) {
    var errors = {};
    //Looping through each attributes.
    validateDomainAttributes(model, errors);
    validateCustomAttributes(model, errors);
    //Promisify the validations , if there is errors call the reject else call resolve with the model.
    if (_.isEmpty(errors)) {
      return {isValid: true, data: model};
    } else {
      return {isValid: false, data: errors};
    }
  };

  var validate = function validateModel(model) {
    var validationResult = validateNoPromise(model);
    return new Promise(function promiseValidation(resolve, reject) {
      //console.dir("Errors", errors);
      if (validationResult.isValid) {
        //console.log('resolve');
        resolve(validationResult.data);
      } else {
        //console.log('reject');
        reject(validationResult.data);
      }
      return undefined;
    });
  };

  //Validate the model customs attributes.
  var validateCustomAttributes = function validateCustomAttributes(model, errors) {
    if (!model) {
      throw new ArgumentNullException('The model should exist');
    }
    //Validating only the model at
    for (var attr in model.attributes) {
      //console.log("Attr", attr);
      if (!model.isValid(attr)) {
        var domainMessage = errors[attr] !== null && errors[attr] !== undefined ? errors[attr] : '';
        errors[attr] = '' + domainMessage + '' + attr + " not valid."; // Todo: translate the message.
      }
    }
  };

  //Get the validation "standard" attributes of a Backbone.model.
  var getValidatedAttrs = function(model) {
    return _.reduce(_.keys(_.result(model, 'validation') || {}), function(memo, key) {
      memo[key] = void 0;
      return memo;
    }, {});
  };

  //Validate the validation domains attributes.
  var validateDomainAttributes = function validateDomainAttributes(model, errors) {
    var validatorsOfDomain = metadataBuilder.getDomainsValidationAttrs(model);
    //console.log("validators %j", validatorsOfDomain);
    //Validate only the attributes of the model not all the validators int he metdadaga of the model.
    for (var attr in model.attributes) {
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
  //Validate a Backbone.Collection, return a promises.
  var validateAll = function validateCollection(collection) {
    if (!collection instanceof Backbone.Collection) {
      throw new ArgumentInvalidException("Only a backbone collection can be validateAll", collection);
    }
    return new Promise(function(successCb, errorCb) {
      //Container for all errors.
      var errors = [];
      var modelIndex = 0;
      //Iterate over each collections.
      collection.forEach(function(model) {
        var validationResult = validateNoPromise(model);
        if (!validationResult.isValid) {
          errors.push({
            index: modelIndex,
            errors: validationResult.data
          });
        }
        modelIndex++;
      }, this);
      if (errors.length > 0) {
        //If the errors array is not empty, cb the promise errors.
        errorCb(errors);
      } else {
        // Else call success callback with the collection.
        successCb(collection);
      }
    });
  };

  // Initialize the domains and the metadatas.
  var initialize = function initializeModelValiationPromise(options) {
    metadataBuilder.initialize(options);
  };

  if (isInBrowser) {
    NS.Helpers = NS.Helpers || {};
    NS.Helpers.modelValidationPromise = {
      validate: validate,
      initialize: initialize,
      validateAll: validateAll
    };
  } else {
    module.exports = {
      validate: validate,
      validateAll: validateAll,
      initialize: initialize
    };
  }
})(typeof module === 'undefined' && typeof window !== 'undefined' ? window.Fmk : module.exports);
/*global _, $, window*/
"use strict";
(function(NS) {
    NS = NS || {};
    //Filename: helpers/odata_helper.js
    var isInBrowser = typeof module === 'undefined' && typeof window !== 'undefined';
    var utilHelper = isInBrowser ? NS.Helpers.utilHelper : require('./utilHelper');
    
    var odataOptions = {
        filter: '$filter',
        top: '$top',
        skip: '$skip',
        orderby: '$orderby',
        format:  '$format',
        inlinecount: '$inlinecount',
        requestType: 'GET'
    };
    var configure = function configure(options) { 
        _.extend(odataOptions, options);
    };

    // type of the request for odata
    var paginator_core = {
        // the type of the request (GET by default)
        type: odataOptions.requestType,

        // the type of reply (json by default)
        dataType: 'json'
    };

    function createOdataOptions(criteria, pagesInfo, options) {
        return compileOptions(criteria, pagesInfo, options);
    }

    // convert JSON criteria to odata
    //http://docs.oasis-open.org/odata/odata/v4.0/os/part2-url-conventions/odata-v4.0-os-part2-url-conventions.html#_Toc372793793
    function criteriaToOdata(criteria) {
        //console.log("Criteria OData");
        //Url to build
        var result = "";
        for (var property in criteria) {
            //The treatement of the filter is done only.
            if (property !== undefined && property !== null && criteria[property] !== undefined && criteria[property] !== null && criteria[property] !== "") {
                var type = typeof criteria[property];
                console.log("Type of the property", type);
                switch (type) {
                    //Deal with the string parameter.
                    case "string":
                        result += property + " eq " + criteria[property] + " and ";
                        break;
                        //Deal with array parameters
                    case "number":
                        result += property + " eq " + criteria[property] + " and ";
                        break;
                    case "boolean":
                        result += property + " eq " + criteria[property] + " and ";
                        break;
                    case "array":
                        //result += property + " eq " +"["+ criteria[property].join(',')+"]" + " and ";
                        result += property + " eq " + "['" + criteria[property].join("','") + "']" + " and ";
                        break;
                        //Deal with the object.
                    case "object":
                        if (_.isArray(criteria[property])) {
                            result += property + " eq " + "['" + criteria[property].join("','") + "']" + " and ";
                            //result += property + " eq " + "[" + criteria[property].join(',') + "]" + " and "
                        }
                        //If there is an array.
                        break;
                    default:
                        break;

                }
            }
        }
        return result.length > 0 ? result.slice(0, -5) : "";//Todo: corriger la cr�ation de crit�re. //result.substring(0, result.length - 1);
    }

    //generate orderBy parameters fo odata
    function orderToOdata(sortFields) {
        var orderBy = "";
        sortFields.forEach(function (sortField) {
            //TODO : cette condition n'est pas satisfaisante. Si ces champs ne sont pas d�finis ils ne devraient pas �tre dans la liste.
            if (sortField.field !== undefined && sortField.order !== undefined) {
                orderBy += sortField.field + " " + sortField.order + ",";
            }
        });
        return orderBy.substring(0, orderBy.length - 1);
    }

    //generate parameter for odata server API
    function generateServerApi(criteria, pagesInfo) {
        var sortFields = [];
        if (pagesInfo.sortField) {
            sortFields.push(pagesInfo.sortField);
        }

        var val = {};
        val[odataOptions.filter] = criteria;// criteriaToOdata(criteria);
        val[odataOptions.top] = pagesInfo.perPage;
        val[odataOptions.skip] = (pagesInfo.currentPage - 1) * pagesInfo.perPage;
        val[odataOptions.orderby] = orderToOdata(sortFields);
        val[odataOptions.format] = 'json';
        val[odataOptions.inlinecount] = 'allpages';
        return val;
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
            type: odataOptions.requestType,
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
            processData: false
            //url: _.result(queryOptions, 'url')
        }, options);

        return queryOptions;
    }

    // parse odata response and return values in format : {totalRecords:totalRecords, values: values}
    function parseOdataResponse(response) {
        if (response === undefined || response === null) {
            throw new Error('Odata error : parsing result');
        }
        // To be comaptible with C# ODataController
        _.extend(response, utilHelper.flatten({odata: response.odata}));
        delete response.odata;
        if(response["odata.count"] === undefined || response["odata.count"] === null) {
            throw new Error('Odata error : parsing result');
        }
        return {
            totalRecords: response["odata.count"],
            values: response.value
        };
    }

    var odataHelper = {
        createOdataOptions: createOdataOptions,
        parseOdataResponse: parseOdataResponse,
        configure: configure
    };

    // Differenciating export for node or browser.
    if (isInBrowser) {
        NS.Helpers = NS.Helpers || {};
        NS.Helpers.odataHelper = odataHelper;
    } else {
        module.exports = odataHelper;
    }
})(typeof module === 'undefined' && typeof window !== 'undefined' ? window.Fmk : module.exports);
/* global window, $ */
(function(NS) {
  "use strict";
  //Filename: post_rendering_builder.js
  NS = NS || {};
  var isInBrowser = typeof module === 'undefined' && typeof window !== 'undefined';
  var metadataBuilder = isInBrowser ? NS.Helpers.metadataBuilder : require('./metadata_builder').metadataBuilder;
  var postRenderingHelper = isInBrowser ? NS.Helpers.postRenderingHelper : require('./post_rendering_helper').metadataBuilder;
  //Options must contain a model and a viewSelecrot property.
  var postRenderingBuilder = function(options) {
    //When there is no model inide the view, do nothing.
    if (options === undefined || options === null || !options.model) {
      return;
    }
    //Get all the metadatas of the model.
    var metadatas = metadataBuilder.getMetadatas(options.model);
    //Iterate through each attributes of the modoptions.modelel.
    for (var attr in metadatas) {
      var mdt = metadatas[attr];
      /*Check for any of the metadata.*/
      if (mdt !== undefined && mdt !== null) {
        if (mdt.decorator) {
          //Call a registered helper. See post_rendering_helper_file to see how to register a helper.
          postRenderingHelper.callHelper({
            helperName: mdt.decorator, //Get the post rendering helper to call from the metdata, this helper must have been register before.
            selector: $('[data-name=' + attr + ']', options.viewSelector), //Create a selector on each attribute in the view with its .
            decoratorOptions: mdt.decoratorOptions //Inject decorator options define on the model.
          });
        }
      }
    }
  };
  if (isInBrowser) {
    NS.Helpers = NS.Helpers || {};
    NS.Helpers.postRenderingBuilder = postRenderingBuilder;
  } else {
    module.exports = postRenderingBuilder;
  }

})(typeof module === 'undefined' && typeof window !== 'undefined' ? window.Fmk : module.exports);
/* global Backbone, Promise, _, window */
(function (NS) {
    "use strict";
	//Filename: promisify_helper.js
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
		},
		save: function saveCollection() {
		    var model = this;
		    var method =  'create';
		    return new Promise(
				function (resolve, reject) {
				    Backbone.sync(method, model, {
				        success: resolve,
				        error: reject
				    });
				}
			);
		}
	});

	//Convert an existing Backbone model to a _promise_ version of it.
	var ConvertModel = function ConvertBackBoneModelToPromiseModel(model) {
		if (model.url === undefined || model.urlRoot === undefined) {
			throw new Error("ConvertBackBoneModelToPromiseModel: The url of the model: " + model.modelName + " cannot be undefined.");
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
			throw new Error("ConvertCollection: The  url of the collection " + collection.modelName + " cannot be undefined.");
		}
		var promiseCollection = new PromiseCollection();
		promiseCollection.url = collection.url;
		return promiseCollection;
	};

	//Todo: see if it is necessary to expose Model and collection promisified.
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
/*global Promise, $, _, window*/
"use strict";
(function(NS) {
  NS = NS || {};
  /* Filename: helpers/reference_helper.js  */
  //Dependency gestion depending on the fact that we are in the browser or in node.
  var isInBrowser = typeof module === 'undefined' && typeof window !== 'undefined';


  //Container for the list and 
  var configuration = {};
  
  //Can be use to override a service, can be call with options = {"referenceName": serviceFunction} 
  //serviceFunction is obtain with a require. 
  function configureRefServices(options){
    _.extend(configuration, options);
  }

  // This method perform an ajax request within a promise.
  // Example call : refHelper.loadList({url: "http://localhost:8080/api/list/1"}).then(console.log,console.error);
  var loadList = function loadList(listDesc){
    return new Promise(function promiseLoadList(resolve, reject) {
      //console.log("Errors", errors);
      $.ajax({
          url: listDesc.url,
          type: "GET",
          dataType: "json",
          crossDomain: true,
          success: function(data) {
            //references[listDesc.name] = data; //In order to not reload the next time,  warning, as promises are asynchronous, when the promise is define, this could be false.
            resolve(data);
          },
          error: function(error) {
            reject(error);
          }
        });
    });
  };

  // Load a reference with its list name.
  // It calls the service which must have been registered.
  function loadListByName(listName) {
      return getService(listName);
  }
  
    //Load a service by name.
  function getService(listName, args) {
      if (typeof configuration[listName] !== "function") {
          throw new Error("You are trying to load the reference list: "+ listName + " which does not have a list configure." );
      }
      //Call the service, the service must return a promise.
      return configuration[listName](args);
  }

    
  //Load many lists by their names. `refHelper.loadMany(['list1', 'list2']).then(success, error)`
  // Return an array of many promises for all the given lists.
  // Be carefull, if there is a problem for one list, the error callback is called.
  function loadMany(names) {
      var promises = [];
      //todo: add a _.isArray tests and throw an rxception.
      if (names !== undefined) {
          names.forEach(function (name) {
              promises.push(loadListByName(name));
          });
      }
    return promises;
  }

  function getAutoCompleteServiceQuery(listName) {
      return function (query) {
          getService(listName)(query.term).then(function (results) {
              query.callback(results);
          });
      };
  }

  var referenceHelper = {
    loadListByName: loadListByName,
    loadList: loadList,
    loadMany: loadMany,
    getAutoCompleteServiceQuery: getAutoCompleteServiceQuery,
    configure: configureRefServices
  };

  // Differenciating export for node or browser.
  if (isInBrowser) {
    NS.Helpers = NS.Helpers || {};
    NS.Helpers.referenceHelper = referenceHelper;
  } else {
    module.exports = referenceHelper;
  }
})(typeof module === 'undefined' && typeof window !== 'undefined' ? window.Fmk : module.exports);
/* global window, Promise*/
(function(NS) {
  "use strict";
  //Filename: helpers/router.js
  NS = NS || {};
  //Dependency gestion depending on the fact that we are in the browser or in node.
  var isInBrowser = typeof module === 'undefined' && typeof window !== 'undefined';
  var middleWares = [];
  var middlewarePromise = function middlewarePromise(middleWareFunction){
    return new Promise(function(resolve, reject){
      if(middleWareFunction(arguments)){
        resolve(arguments);
      }else{
        reject(arguments);
      }
    });
  };

  var registerMiddleWare = function registerMiddleWare(middleWareFunction){
    middleWares.push(middleWareFunction);
  }
  var router = {};

  // Differenciating export for node or browser.
  if (isInBrowser) {
    NS.Helpers = NS.Helpers || {};
    NS.Helpers.router = router;
  } else {
    module.exports = router;
  }
})(typeof module === 'undefined' && typeof window !== 'undefined' ? window.Fmk : module.exports);
/* global window, _*/
(function(NS) {
  "use strict";
  //Filename: helpers/routes_helper.js
  NS = NS || {};
  //Dependency gestion depending on the fact that we are in the browser or in node.
  var isInBrowser = typeof module === 'undefined' && typeof window !== 'undefined';
  var userHelper = isInBrowser ? NS.Helpers.userHelper : require("./user_helper");
  var siteDescriptionHelper = isInBrowser ? NS.Helpers.siteDescriptionHelper : require("./site_description_helper");
  var ArgumentNullException = isInBrowser ? NS.Helpers.Exceptions.ArgumentNullException : require("./custom_exception").ArgumentNullException;
  //Container for the site description and routes.
  var siteDescription, routes = {}, siteStructure = {};

  //Process the siteDescription if necessary.
  var processSiteDescription = function(options){
    options = options || {};
    if(!siteDescriptionHelper.isProcessed() || options.isForceProcess){
      siteDescription = siteDescriptionHelper.getSite();
      regenerateRoutes();
      return siteDescription;
    }return false;
  };

  //Regenerate the application routes.
  var regenerateRoutes = function regenerateRoutes() {
    generateRoutes(siteDescription);
  };

  //Process the name of 
  var processName = function(pfx, eltDescName) {
    if (pfx === undefined || pfx === null) {
      pfx = "";
    }
    if (eltDescName === undefined || eltDescName === null) {
      return pfx;
    }
    if (pfx === "") {
      return eltDescName;
    }
    return pfx + '.' + eltDescName;
  };

  
  var processElement = function(siteDescElt, prefix, options) {
    options = options || {};
    if (!siteDescElt) {
      console.warn('The siteDescription does not exists', siteDescElt);
      return;
    }
    var pfx = processName(prefix, siteDescElt.name);
    if(siteDescriptionHelper.checkParams(siteDescElt.requiredParams)){
     processHeaders(siteDescElt, pfx);
    }
    processPages(siteDescElt, pfx);
    processRoute(siteDescElt, pfx, options);
  };

  //Process the deaders element of the site description element.
  var processHeaders = function(siteDesc, prefix) {

    if (!siteDesc.headers) {
      return;
    }
    //console.log('headers', siteDesc.headers, 'prefix', prefix);
    var headers = siteDesc.headers;
    for (var i in headers) {
      processElement(headers[i], prefix, {isInSiteStructure: true});
    }
  };

  //Process the pages element of the site description.
  var processPages = function(siteDesc, prefix) {
    if (siteDesc.pages !== undefined && siteDesc.pages !== null) {
      //console.log('pages', siteDesc.pages, 'prefix', prefix);

      for (var i in siteDesc.pages) {
        processElement(siteDesc.pages[i], prefix);
      }
    }
  };

 
  //Process the route part of the site description element.
  var processRoute = function(siteDesc, prefix, options) {
    options = options || {};
    if (siteDesc.roles !== undefined && siteDesc.url !== undefined)
    //console.log('route', siteDesc.url, 'prefix', prefix);

      if (userHelper.hasOneRole(siteDesc.roles)) {
        var route = {
          roles: siteDesc.roles,
          name: prefix,
          route: siteDesc.url,
          regex: routeToRegExp(siteDesc.url)
        };
        //Call the Backbone.history.handlers....

        routes[route.regex.toString()] = route;
        if(options.isInSiteStructure){
          siteStructure[prefix] = route;
        }
      }
  };

//Find a route with its name.
 var findRouteName = function(routeToTest) {
    var handlers = Backbone.history.handlers;
    return _.any(handlers, function(handler) {
      if (handler.route.test(routeToTest)) {
        return  handler.route.toString();
      }
    });
  };
  

    //Convert a route to regexp
  var optionalParam = /\((.*?)\)/g;
  var namedParam    = /(\(\?)?:\w+/g;
  var splatParam    = /\*\w+/g;
  var escapeRegExp  = /[\-{}\[\]+?.,\\\^$|#\s]/g;
  var routeToRegExp=  function routeToRegExp(route) {
      route = route.replace(escapeRegExp, '\\$&')
                   .replace(optionalParam, '(?:$1)?')
                   .replace(namedParam, function(match, optional) {
                     return optional ? match : '([^/?]+)';
                   })
                   .replace(splatParam, '([^?]*?)');
      return new RegExp('^' + route + '(?:\\?([\\s\\S]*))?$');
    };




  //Generate the routes fromSiteDescription.
  var generateRoutes = function generateRoutes(elementDesc, prefix) {
    if (!elementDesc) {
      console.warn('The siteDescription does not exists', elementDesc);
      return;
    }

    return processElement(elementDesc, prefix);

    var pfx = processName(prefix, elementDesc.name);

    //process headers routes.
    var headers = elementDesc.header;
    for (var siteDescIdx in headers) {
      var siteDesc = headers[siteDescIdx];
      var prefixsiteDesc = processName(pfx, siteDesc.name);
      console.log('prefix', prefix, ' prefixsiteDesc', prefixsiteDesc);
      if (siteDesc.header) {
        generateRoutes(siteDesc, prefixsiteDesc);
      } else {
        addRouteForUser(siteDesc, prefixsiteDesc);
      }
    }
    addRouteForUser(elementDesc, pfx);

  };

  //Add a route for a user.

  var addRouteForUser = function addRouteForUser(element, prefix) {
    console.log('addRouteForUser', 'prefix', prefix);
    if (!element) {
      return;
      //throw new ArgumentNullException("The element to add a route should not be undefined.", element);
    }
    if (prefix === undefined || prefix === null || prefix === "") {
      prefix = "";
      //throw new ArgumentNullException("The prefix to add a route should not be undefined.", prefix);
    }
    //Add the route only if the user has one of the required role.
    if (element.roles !== undefined && element.url !== undefined)
      if (userHelper.hasOneRole(element.roles)) {
        var route = {
          roles: element.roles,
          name: prefix,
          route: element.url
        };
        routes[element.url] = route;
        siteStructure[prefix] = route;
      }
      //process the site not in the menus  
    if (element.pages !== undefined && element.pages !== null) {
      for (var rtIdx in element.pages) {
        addRouteForUser(element.pages[rtIdx], prefix);
      }
    }

  };


  //Get the siteDescription.
  var getSiteDescription = function getSiteDescription() {
    return _.clone(siteDescription);
  };

  //Get all the application routes from the siteDescription.
  var getRoute = function getRoutes(routeName) {
    return _.clone(routes[routeName]);
  };

  var getRoutes = function getRoutes() {
    return _.clone(routes);
  };

  var getSiteStructure = function getSiteStructure() {
    return _.clone(siteStructure);
  };

  var siteDescriptionBuilder = {
    getRoute: getRoute,
    getRoutes: getRoutes,
    getSiteDescription: getSiteDescription,
    regenerateRoutes: regenerateRoutes,
    getSiteStructure: getSiteStructure,
    processSiteDescription: processSiteDescription
  };

  // Differenciating export for node or browser.
  if (isInBrowser) {
    NS.Helpers = NS.Helpers || {};
    NS.Helpers.siteDescriptionBuilder = siteDescriptionBuilder;
  } else {
    module.exports = siteDescriptionBuilder;
  }
})(typeof module === 'undefined' && typeof window !== 'undefined' ? window.Fmk : module.exports);
/* global $, _ , window*/
"use strict";
(function(NS) {
  //Filename: helpers/url_helper.js
  NS = NS || {};
  //Dependency gestion depending on the fact that we are in the browser or in node.
  var isInBrowser = typeof module === 'undefined' && typeof window !== 'undefined';

  //*This helper has a dependency on underscore and jQuery.*/
  var urlHelper = {};
  // ### generateUrl
  //  Generate an url with all the parameters
  //  This function is use in order to build url from a tootname and a object you want to pass into the url as params.
  //  ```javascript
  //  var urlHelper = require('../lib/url_helper');
  //  var url = urlHelper.generateUrl('rootName', {param1: "nom", param2: "nom2"}); 
  //  //url = '#rootName/?param1=nom&param2=nom2'
  //  ```
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
  if (isInBrowser) {
    NS.Helpers = NS.Helpers || {};
    NS.Helpers.urlHelper = urlHelper;
  } else {
    module.exports = urlHelper;
  }
})(typeof module === 'undefined' && typeof window !== 'undefined' ? window.Fmk : module.exports);
/*global Backbone, _, window, Promise, $ */
"use strict";
(function(NS) {
  //Filename: views/core-view.js
  NS = NS || {};
  var isInBrowser = typeof module === 'undefined' && typeof window !== 'undefined';
  var postRenderingBuilder = isInBrowser ? NS.Helpers.postRenderingBuilder : require('../helpers/post_rendering_builder');
  var ErrorHelper = isInBrowser ? NS.Helpers.errorHelper : require('../helpers/error_helper');
  var RefHelper = isInBrowser ? NS.Helpers.referenceHelper : require('../helpers/reference_helper');
  var ArgumentNullException = isInBrowser ? NS.Helpers.Exceptions.ArgumentNullException : require("../helpers/custom_exception").ArgumentNullException;
  var Model =  isInBrowser ? NS.Models.Model : require("../models/model");
  //View which is the default view for each view.
  //This view is able to deal with errors and to render the default json moodel.
  var CoreView = Backbone.View.extend({
    toogleIsHidden: function(options) {
      this.isHidden = !this.isHidden;
      this.render(options);
    },
    //Reference lists names. 
    //These _names_, must have been registered inside the the application to be used.
    referenceNames: undefined,

    //Options define by default for the view.
    defaultOptions: {
      isElementRedefinition: false //This options is use in order to not have a tag container generated by Backbone arround the view.
    },
    //Options overriden By the instanciate view.
    customOptions: {},

    //This property is use in order to create a new Model if no model are define in the view.
    modelName: undefined,

    //Initialization of the coreview.
    initialize: function initializeCoreView(options) {
      options = options || {};
      //Define default options foreach _core_ view, and override these options for each _project view_.
        //Then each view will have access to options in any methods.
      this.opts = _.extend({},this.defaultOptions, this.customOptions, options);

      this.on('toogleIsHidden', this.toogleIsHidden);

      this.initializeModel();

      /*Register after renger.*/
      _.bindAll(this, 'render', 'afterRender');
      var _this = this;
      this.render = _.wrap(this.render, function(render, options) {
        render(options);
        _this.afterRender();
        return _this;
      });

      //Load all the references lists which are defined in referenceNames.
      var currentView = this;
      Promise.all(RefHelper.loadMany(this.referenceNames)).then(function(results) {
        //console.log('resultsreferenceNames', results);
        var res = {}; //Container for all the results.
        for (var i = 0, l = results.length; i < l; i++) {
          res[currentView.referenceNames[i]] = results[i];
          //The results are save into an object with a name for each reference list.
        }
        currentView.model.set(res); //This trigger a render due to model change.
        currentView.isReady = true; //Inform the view that we are ready to render well.
      }).then(null, function(error) {
        ErrorHelper.manageResponseErrors(error, {
          isDisplay: true
        });
      });
    },

    //Initialize the model of the view.
    //In order to be able to be initialize, a view must have a _model_ or a _modelName_.
    initializeModel: function initializeModelCoreView() {
      if (this.model) {
        return;
      } else if (this.opts.modelName) {
          this.model = new Model();
          this.model.modelName = this.opts.modelName;
      } else {
        throw new ArgumentNullException("The view must have a model or a model name.", this);
      }
    },
    //The handlebars template has to be defined here.
    template: function emptyTemplate(json) {
      console.log("templateData", json);
      return "<p>Your template has to be implemented.</p>";
    }, // Example: require('./templates/coreView')
    //Defaults events.
    events: {
      "focus input": "inputFocus", //Deal with the focus in the field.
      "blur input": "inputBlur", //Deal with the focus out of the field.
      "click .panel-collapse.in": "hideCollapse",
      "click .panel-collapse:not('.in')": "showCollapse"
    },
    //Input focus event.
    inputFocus: function coreViewInputFocus(event) {
      if (!this.model.has('errors')) {
        return;
      }
      //Remove the input hidden attribute.
      return event.target.parentElement.parentElement.childNodes[5].removeAttribute('hidden');
    },
    //Input blur event gestion
    inputBlur: function coreViewInputBlur(event) {
      if (!this.model.has('errors')) {
        return;
      }
      //If there is an error add the hidden attribute into it in odere to hide the errors.
      return event.target.parentElement.parentElement.childNodes[5].setAttribute("hidden", "hidden");
    },
    //This method is use in order to inject json data to the template. By default, the this.model.toJSON() is called.
    getRenderData: function getCoreViewRenderData() {
      return this.model.toJSON();
    },
    showCollapse: function showCollapseCoreView() {
      $('.collapse', this.$el).collapse('show');
    },
    hideCollapse: function hideCollapseCoreView() {
      $('.collapse', this.$el).collapse('hide');
    },
    toogleCollapse: function toogleCollapseCoreView(event) {
      $(".panel-collapse.in", event.target.parentNode.parentNode).collapse('hide'); //todo: change the selector
      $(".panel-collapse:not('.in')", event.target.parentNode.parentNode).collapse('show');
    },
    //Render function  by default call the getRenderData and inject it into the view dom element.
    render: function renderCoreView() {
      this.$el.html(this.template(this.getRenderData()));
      //_.defer(this.afterRender, this);
      return this;
    },
    afterRender: function afterRenderCoreView() {
      //Eventually pass the currentview as argument for this binding.
      postRenderingBuilder({
        model: this.model,
        viewSelector: this.$el
      });
      $('.collapse', this.$el).collapse({
        toogle: true
      });
    }
  });

  // Differenciating export for node or browser.
  if (isInBrowser) {
    NS.Views = NS.Views || {};
    NS.Views.CoreView = CoreView;
  } else {
    module.exports = CoreView;
  }
})(typeof module === 'undefined' && typeof window !== 'undefined' ? window.Fmk : module.exports);
// ## Example calll:
// ```javascript
// var CoreView = require('./views/core-view');
// new CoreView({model: new Model({firstName: "first name", lastName: "last name"}).render().el //Get the dom element of the view.
//```
﻿/*global window, Backbone, $, i18n*/
(function(NS) {
    "use strict";
    //Filename: views/detail-consult-view.js
    NS = NS || {};
    var isInBrowser = typeof module === 'undefined' && typeof window !== 'undefined';
    //var NotImplementedException = isInBrowser ? NS.Helpers.Exceptions.NotImplementedException : require('../helpers/custom_exception').NotImplementedException;
    var ErrorHelper = isInBrowser ? NS.Helpers.errorHelper : require('../helpers/error_helper');
    var CoreView = isInBrowser ? NS.Views.CoreView : require('./core-view');
    var form_helper = isInBrowser ? NS.Helpers.formHelper : require('../helpers/form_helper');
    var urlHelper = isInBrowser ? NS.Helpers.urlHelper : require('../helpers/url_helper');
    var utilHelper = isInBrowser ? NS.Helpers.utilHelper : require('../helpers/utilHelper');
    var ModelValidator = isInBrowser ? NS.Helpers.modelValidationPromise : require('../helpers/modelValidationPromise');
    var errorHelper = isInBrowser ? NS.Helpers.errorHelper : require('../helpers/error_helper');
    //Backbone view which can be use in order to create consultation view and edition view.
    var ConsultEditView = CoreView.extend({

        //The default tag for this view is a div.
        tagName: 'div',

        //The default class for this view.
        className: 'consultEditView',

        //Service to get the model.
        getModelSvc: undefined,

        //Service to delete the model.
        deleteModelSvc: undefined,

        //Service to save a model wether it is a model or a collection.
        saveModelSvc: undefined,

        //Template for the edit mode.
        templateEdit: undefined,

        //Template for the consultation mode.
        templateConsult: undefined,


        //Default options for the view.
        defaultOptions: {
            isModelToLoad: true, //By default the model is loaded.
            isEditMode: true,
            isNavigationOnSave: true,
            isNavigationOnDelete: true,
            isSaveOnServer: true,
            collectionSelector: "tbody tr"
        },

        //Initialize function
        initialize: function initializeConsultEdit(options) {
            options = options || {};
            CoreView.prototype.initialize.call(this, options);
            //By default the view is in consultationmode and if edit mode is active and isEdit has been activated in th options. 
            this.isEdit = (this.opts.isEditMode && this.opts.isEdit) || false;
            if (this.model) {
                //render view when the model is loaded
                this.model.on('change', this.render, this);
            }
            // In order to be loaded a model has to have an id and the options must be activated.
            if (this.opts.isModelToLoad && typeof this.model.has === "function" && this.model.has('id')) {
                //Try to load the model from a service which have to return a promise.
                var view = this;
                this.getModelSvc(this.model.get('id'))
                    .then(function success(jsonModel) {
                        view.model.set(jsonModel);
                    }).then(null, function error(errorResponse) {
                        ErrorHelper.manageResponseErrors(errorResponse, {
                            model: this.model
                        });
                    });
            }
        },

        //Events handle by the view with user interaction
        events: {
            "click button.btnEdit": "edit",
            "click button.btnDelete": "deleteItem",
            "click .panel-heading": "toogleCollapse",
            "click button[type='submit']": "save",
            "click button.btnCancel": "cancelEdition"
        },

        //JSON data to attach to the template.
        getRenderData: function getRenderDataConsultEdit() {
            return this.model.toJSON();
        },

        //genarate navigation url usefull if the edit mode is not on the same page.
        generateEditUrl: function generateEditUrl() {
            return this.model.modelName + "/edit/" + this.model.get('id');
        },

        //Change the edit mode.
        toggleEditMode: function toogleEditMode(event) {
            if (event) {
                event.preventDefault();
            }
            this.isEdit = !this.isEdit;
            this.render({
                isSearchTriggered: true
            }); //todo: fix this to have no options.
        },

        //Deal with the edit button click wether there is an edit mode or not.
        edit: function editConsultEditView(event) {
            event.preventDefault();
            if (this.opts.isEditMode) {
                this.toggleEditMode();
            } else {
                Backbone.history.navigate(this.generateEditUrl(), true);
            }
        },
        //Get the json data to be save by the view.
        getDataToSave: function getDataToSaveDetailEdit() {
            return this.model.toJSON();
        },
        //Deal with the save event on the page.
        save: function saveConsultEdit(event) {
            event.preventDefault();
            //Call a different method depending on the fact that the model is a collection or a model.
            if (utilHelper.isBackboneModel(this.model)) {
                this.saveModel();
            } else if (utilHelper.isBackboneCollection(this.model)) {
                this.saveCollection();
            }

        },
        //Save a backbone collection.
        saveCollection: function saveBackboneCollection() {
            //Call the form helper in order to rebuild the collection from the form.
            form_helper.formCollectionBinder(
                $(this.opts.collectionSelector, this.$el),
                this.model
            );
            //Bind the this to the current view for the
            var currentView = this;
            ModelValidator.validateAll(currentView.model)
                .then(function successValidation() {
                    //When the model is valid, unset errors.
                    currentView.model.forEach(function(mdl) {
                        mdl.unsetErrors();
                    }, currentView);
                    if (currentView.opts.isSaveOnServer) {
                        //Call the service in order to save the model.                   
                        currentView.saveModelSvc(currentView.getDataToSave())
                            .then(function success(jsonModel) {
                                currentView.saveSuccess(jsonModel); //.bind(currentView);
                            }, function error(responseError) {
                                currentView.saveError(responseError); //.bind(currentView);
                            });
                    } else {
                        currentView.saveSuccess(currentView.model.toJSON());
                    }

                }, function errorValidation(errors) {
                    //todo: see how to set errors.
                    errorHelper.setCollectionErrors(currentView.model, errors);
                    currentView.resetSaveButton();
                });
        },
        resetSaveButton: function resetSaveButton() {
            $('button[type="submit"]', this.$el).button('reset');
        },
        //Save method in case of a model.
        saveModel: function saveBackboneModel() {
            //Call the form helper in order to rebuild the model from the form.
            form_helper.formModelBinder({
                inputs: $('input', this.$el),
                options: $('select', this.$el)
            }, this.model);

            //Bind the this to the current view for the
            var currentView = this;
            //Todo: Add a method in util in order to know if an object is a collectio or a model.
            //Add it into the initialize too.
            ModelValidator.validate(currentView.model)
                .then(function successValidation() {
                    //When the model is valid, unset errors.
                    currentView.model.unsetErrors();
                    if (currentView.opts.isSaveOnServer) {
                        //Call the service in order to save the model.                   
                        currentView.saveModelSvc(currentView.getDataToSave())
                            .then(function success(jsonModel) {
                                currentView.saveSuccess(jsonModel); //.bind(currentView);
                            }, function error(responseError) {
                                currentView.saveError(responseError); //.bind(currentView);
                            });
                    } else {
                        currentView.saveSuccess(currentView.model.toJSON());
                    }

                }, function errorValidation(errors) {
                    currentView.model.setErrors(errors);
                });
        },

        //Actions on save error
        saveError: function saveErrorConsultEdit(errors) {
            ErrorHelper.manageResponseErrors(errors, {
                model: this.model
            });
        },
        //Actions on save success.
        saveSuccess: function saveSuccessConsultEdit(jsonModel) {
            Backbone.Notification.addNotification({
                type: 'success',
                message: i18n.t('save.' + (jsonModel.id ? 'create' : 'update') + 'success')
            });
            // If the navigation on save is activated, navigate to the page.
            if (this.opts.isNavigationOnSave) {
                Backbone.history.navigate(this.generateNavigationUrl(), true);
            } else {
                // If there is no navigation on save, trigger a change event.
                this.model[utilHelper.isBackboneModel(this.model) ? 'set' : 'reset'](jsonModel, {
                    silent: true
                });
                this.toggleEditMode();
            }
        },

        generateNavigationUrl: function generateNavigationUrl() {
            if (this.model.get('id') === null || this.model.get('id') === undefined) {
                return "/";
            }
            return urlHelper.generateUrl([this.model.modelName, this.model.get("id")], {});
        },

        //Code to delete an item.
        deleteItem: function deleteConsult(event) {
            event.preventDefault();
            var view = this;
            //call delete service
            this.deleteModelSvc()
                .then(function success(successResponse) {
                    view.deleteSuccess(successResponse);
                }, function error(errorResponse) {
                    view.deleteError(errorResponse);
                });
        },

        //Generate delete navigation url.
        generateDeleteUrl: function generateDeleteUrl() {
            return "/";
        },

        // Actions after a delete success.
        deleteSuccess: function deleteConsultEditSuccess(response) {
            //remove the view from the DOM
            this.remove();
            if (this.opts.isNavigationOnDelete) {
                //navigate to next page
                Backbone.history.navigate(this.generateDeleteUrl(), true);
            }

        },

        // Actions after a delete error. 
        deleteError: function deleteConsultEditError(errorResponse) {
            ErrorHelper.manageResponseErrors(errorResponse, {
                isDisplay: true
            });
        },
        //Render function.
        render: function renderConsultEditView() {
            //todo: see if a getRenderData different from each mode is necessary or it coul be deal inside the getRenderDatatFunction if needed.
            var templateName = this.isEdit ? 'templateEdit' : 'templateConsult';
            if (this.opts.isElementRedefinition) {
                this.setElement(this[templateName](this.getRenderData()));
            } else {
                this.$el.html(this[templateName](this.getRenderData()));
            }

            //if (this.isEdit) {
            //    this.$el.html(this.templateEdit(this.getRenderData()));
            //} else {
            //    this.$el.html(this.templateConsult(this.getRenderData()));
            //}

            return this;
        },

        //Function which is called after the render, usally necessary for jQuery plugins.
        afterRender: function postRenderDetailView() {
            CoreView.prototype.afterRender.call(this);
            $('.collapse', this.$el).collapse('show');
        }
    });


    // Differenciating export for node or browser.
    if (isInBrowser) {
        NS.Views = NS.Views || {};
        NS.Views.ConsultEditView = ConsultEditView;
    } else {
        module.exports = ConsultEditView;
    }
})(typeof module === 'undefined' && typeof window !== 'undefined' ? window.Fmk : module.exports);
/*global Backbone, window*/
"use strict";
//var template = require("../template/collection-pagination");
(function(NS) {
  //Filename: views/collection-pagination-view.js
  NS = NS || {};
  var isInBrowser = typeof module === 'undefined' && typeof window !== 'undefined';
  var CollectionPaginationView = Backbone.View.extend({
    Service: undefined,
    initialize: function initializePagination() {

    },
    events: {},
    goToPage: function goToPage(page) {
      this.model.setPage(page);
    },
    nextPage: function nextPage() {
      this.model.setNextPage();
    },
    previousPage: function PreviousPage() {
      this.model.setPreviousPage();
    },
    render: function renderPagination() {
      if (this.model.length === 0) {
        this.$el.html("");
      } else {
        this.$el.html(this.template(this.model.pageInfo()));
      }
    }
  });

  // Differenciating export for node or browser.
  if (isInBrowser) {
    NS.Views = NS.Views || {};
    NS.Views.CollectionPaginationView = CollectionPaginationView;
  } else {
    module.exports = CollectionPaginationView;
  }
})(typeof module === 'undefined' && typeof window !== 'undefined' ? window.Fmk : module.exports);
﻿/*global  $, window, _, Promise*/
(function(NS) {
    "use strict";
    // Filename: views/list-view.js
    NS = NS || {};
    var isInBrowser = typeof module === 'undefined' && typeof window !== 'undefined';
    //var NotImplementedException = isInBrowser ? NS.Helpers.Exceptions.NotImplementedException : require('../helpers/custom_exception').NotImplementedException;
    var ConsultEditView = isInBrowser ? NS.Views.ConsultEditView : require('./consult-edit-view');
    var errorHelper = isInBrowser ? NS.Helpers.errorHelper : require('../helpers/error_helper');
    var formHelper = isInBrowser ? NS.Helpers.formHelper : require('../helpers/form_helper');
    var utilHelper = isInBrowser ? NS.Helpers.utilHelper : require('../helpers/util_helper');
    var ArgumentNullException = isInBrowser ? NS.Helpers.Exceptions.ArgumentNullException : require("../helpers/custom_exception").ArgumentNullException;
    var ArgumentInvalidException = isInBrowser ? NS.Helpers.Exceptions.ArgumentInvalidException : require("../helpers/custom_exception").ArgumentInvalidException;
    var ModelValidator = isInBrowser ? NS.Helpers.modelValidationPromise : require('../helpers/modelValidationPromise');


    // Core view to design _composite view_. These wiews are composition of model and collection with associated views.
    var CompositeView = ConsultEditView.extend({

        //The default the surronding tag of the view .
        tagName: 'div',

        //The default the css class of the view.
        className: 'compositeView',

        //Default options of the composite view.
        defaultOptions: {},

        //Service to save a model wether it is a model or a collection.
        saveModelSvc: undefined,

        //Container for all the views which are registered.
        //viewsConfiguration: [],

        //Initialize function of the composite view.
        initialize: function initializeCompositeView(options) {
            options = options || {};
            ConsultEditView.prototype.initialize.call(this, options);
            this.viewsConfiguration = [];
            //Call efor each view you want to register the register view method.

        },

        //Method to call in order to register a new view inside the composite view.
        //Be carefull, a view must be inside the composite view before being registered.
        // Example: this.registerView({ selector: "div#zone1", name: "contactView", type: "model", modelProperty: "property"});
        //The `modelProperty` is the name of the property of the object which will be constructed.
        registerView: function registerView(viewConfiguration) {

            //Check the configuration before adding the view.
            if (viewConfiguration === undefined || viewConfiguration === null) {
                throw new ArgumentNullException("viewConfiguration");
            }
            if (typeof viewConfiguration.selector !== "string") {
                throw new ArgumentInvalidException("viewconfiguration.selector must be a string.", viewConfiguration);
            }
            //Should a test on the selector be addedin order to know if it's in the dom? 

            if (typeof viewConfiguration.name !== "string") {
                throw new ArgumentInvalidException("viewconfiguration.name must be a string.", viewConfiguration);
            }
            var registeredView = this[viewConfiguration.name];
            if (registeredView === undefined || registeredView === null) {
                throw new ArgumentNullException("The view you are trying to register: " + viewConfiguration.name + " does not exists inside the composite view.");
            }
            if (!utilHelper.isBackboneView(registeredView)) {
                throw new ArgumentInvalidException("The view you are trying to register: " + viewConfiguration.name + " is not a Backbone view.", viewConfiguration);
            }
            var type = viewConfiguration.type;
            if (typeof type !== "string") {
                throw new ArgumentInvalidException("viewconfiguration.type must be a string.", viewConfiguration);
            }
            if (type !== "model" && type !== "collection") {
                throw new ArgumentInvalidException("viewconfiguration.type must be a model or a collection.", viewConfiguration);
            }
            if (typeof viewConfiguration.modelProperty !== "string") {
                throw new ArgumentInvalidException("viewconfiguration.modelProperty must be a string.", viewConfiguration);
            }
            this.viewsConfiguration.push(viewConfiguration);
            //this["render"+viewConfiguration.name] = function(){ this[viewConfiguration.name].render();} //Maybe register a render method per view
        },

        //Register many views by calling each time the registerViews.
        registerViews: function(viewsConfigurations) {
            //If the view is not an array.
            if (!_.isArray(viewsConfigurations)) {
                throw new ArgumentInvalidException("viewconfigurations must be an array.", viewsConfigurations);
            }
            for (var i = 0, l = viewsConfigurations.length; i < l; i++) {
                this.registerView(viewsConfigurations[i]);
            }
        },

        //Remove the view inside the viewsconfiguration by its name.
        removeView: function removeView(viewName) {

            if (viewName !== undefined && viewName !== null && utilHelper.isBackboneView(this[viewName])) {
                //Remove the view from both the dom.
                this[viewName].remove();

                //Delete it from the view context.
                delete this[viewName];

                //Delete oit from the configuration.
                this.viewsConfiguration = _.reject(this.viewsConfiguration, function(viewConf) {
                    return viewConf.name === viewName;
                });
            }
        },

        //Events handle by the view.
        events: {
            "click .panel-heading": "toogleCollapse",
            //Edition events
            "click button.btnEdit": "toggleEditMode",
            "click button[type='submit']": "save",
            "click button.btnCancel": "cancelEdition"
        },
        // Get the data to give to the template.
        getRenderData: function getRenderDataCompositeView() {
            return {};
        },

        //Render function of the coposite view.
        render: function renderCompositeView(options) {
            options = options || {};
            //Render the template which should contains all the subview selectors.
            this.$el.html(this.template(this.getRenderData()));

            //Render each view inside the configuration.
            for (var i = 0, l = this.viewsConfiguration.length; i < l; i++) {
                var vConf = this.viewsConfiguration[i];
                //Render each view inside its selector.
                $(vConf.selector, this.$el).html(this[vConf.name].render().el);
            }

            //this.delegateEvents();
            return this;
        },
        toggleEditMode: function toggleEditModeCompositeView() {
            //Render each view inside the configuration.
            for (var i = 0, l = this.viewsConfiguration.length; i < l; i++) {
                var vConf = this.viewsConfiguration[i];
                //Render each view inside its selector.
                this[vConf.name].toggleEditMode();
            }
        },
        //Submit the compoosite view.
        save: function saveCompositeView(event) {
            event.preventDefault();
            var compoView = this;

            var promisesContainer = [];

            for (var i = 0, l = compoView.viewsConfiguration.length; i < l; i++) {
                var vConf = compoView.viewsConfiguration[i];
                if (vConf.type === "model") {
                    //Bind the model.
                    formHelper.formModelBinder({
                        inputs: $('input', compoView[vConf.name].$el),
                        options: $('select', compoView[vConf.name].model.$el)
                    }, compoView[vConf.name].model);
                    promisesContainer.push(
                        //A promise is created in order to be resolve by the promise.all.
                        //Otherwise, the promise returned by the validation is already resolve when the promise.all is treated.
                        new Promise(function(resolve, failure) {
                            ModelValidator.validate(compoView[vConf.name].model).then(
                                function(success){
                                    resolve(success);
                                },
                                function(errors) {
                                    errorHelper.setModelErrors(compoView[vConf.name].model, errors);
                                    failure(errors);
                                }
                            );
                        })
                    );

                } else {
                    //The view of the collection must have a collectionSelectot to be able to work.
                    //Bind the collection.
                    formHelper.formCollectionBinder(
                        $(compoView[vConf.name].opts.collectionSelector, compoView[vConf.name].$el),
                        compoView[vConf.name].model
                    );

                    //Push promises inside the container.
                    promisesContainer.push(
                        //Same reason as for the model.
                        new Promise(function(resolve, failure) {
                            ModelValidator.validateAll(compoView[vConf.name].model).then(
                                function(success) {
                                    resolve(success);
                                },
                                function(errors) {
                                    errorHelper.setCollectionErrors(compoView[vConf.name].model, errors);
                                    failure(errors);
                                }
                            );
                        })
                    );
                }
            }
            //Resolve all validation promise inside the page.
            Promise.all(promisesContainer).then(function(success) {
                compoView.saveModelSvc(compoView.buildJSONToSave()).then(
                    function successSaveCompostiteView(success) {
                        compoView.saveSuccess(success);
                    },
                    function errorSaveCompositeView(responseError) {
                        compoView.saveError(responseError);
                    });
            }, function(error) {
                console.error(error);
            });


        },
        //After the loadin of the global model datas, dispatch it into the model and collections of each view.
        //todo: Test.
        setViewsModels: function setViewsModels(successResponse) {
            for (var i = 0, l = this.viewsConfiguration.length; i < l; i++) {
                var vConf = this.viewsConfiguration[i];
                if (successResponse[vConf.modelProperty]) {
                    var method = vConf.type === "model" ? 'set' : 'reset';
                    this[vConf.name].model[method](successResponse[vConf.modelProperty]);
                }

            }
        },
        //Build the json from differents models.
        buildJSONToSave: function() {
            var json = {};
            for (var i = 0, l = this.viewsConfiguration.length; i < l; i++) {
                var vConf = this.viewsConfiguration[i];
                json[vConf.modelProperty] = this[vConf.name].model.toSaveJSON();
            }
            return json;
        },
        //Call after render specifically to the composite view.
        afterRender: function postRenderListView() {
            ConsultEditView.prototype.afterRender.call(this);
            $('.collapse', this.$el).collapse('show');
        }
    });
    // Differenciating export for node or browser.
    if (isInBrowser) {
        NS.Views = NS.Views || {};
        NS.Views.CompositeView = CompositeView;
    } else {
        module.exports = CompositeView;
    }
})(typeof module === 'undefined' && typeof window !== 'undefined' ? window.Fmk : module.exports);
/*global window, Backbone, $*/
"use strict";
(function(NS) {
	//Filename: views/detail-consult-view.js
	NS = NS || {};
	var isInBrowser = typeof module === 'undefined' && typeof window !== 'undefined';
	var NotImplementedException = isInBrowser ? NS.Helpers.Exceptions.NotImplementedException : require('../helpers/custom_exception').NotImplementedException;
	var ErrorHelper = isInBrowser ? NS.Helpers.errorHelper : require('../helpers/error_helper');
	var CoreView = isInBrowser ? NS.Views.CoreView : require('./core-view');
	var DetailConsultView = CoreView.extend({
		tagName: 'div',
		className: 'consultView',
		getModel: undefined,
		deleteModel: undefined,

		initialize: function initializeConsult() {
			console.warn('######## THIS VIEW  is deprecated.#####');
			console.warn('######## Use consult-edit view.#####');
			CoreView.prototype.initialize.call(this);
			//render view when the model is loaded
			this.model.on('change', this.render, this);
			if (this.model.has('id')) {
				var view = this;
				this.getModel(this.model.get('id'))
					.then(function success(jsonModel) {
						view.model.set(jsonModel);
					}).then(null, function error(errorResponse) {
						//todo: call the error_helper.
						console.log('Detail consult view initialize : ' + errorResponse);
					});
			}
		},

		events: {
			"click button#btnEdit": "edit",
			"click button#btnDelete": "deleteItem",
			"click .panel-heading": "toogleCollapse"
		},

		//JSON data to attach to the template.
		getRenderData: function getRenderDataConsult() {
			throw new NotImplementedException('getRenderData');
		},

		//genarate navigation url.
		generateEditUrl: function generateEditUrl() {
			return this.model.modelName + "/edit/" + this.model.get('id');
		},

		edit: function editVm(event) {
			event.preventDefault();
			Backbone.history.navigate(this.generateEditUrl(), true);
		},

		deleteItem: function deleteConsult(event) {
			event.preventDefault();
			var view = this;
			//call suppression service
			this.deleteModel()
				.then(function success(successResponse) {
					view.deleteSuccess(successResponse);
				}, function error(errorResponse) {
					view.deleteError(errorResponse);
				});
		},

		//Generate delete navigation url.
		generateDeleteUrl: function generateDeleteUrl() {
			return "/";
		},

		// Actions after a delete success.
		deleteSuccess: function deleteConsultSuccess(response) {
			//remove the view from the DOM
			this.remove();
			//navigate to next page
			Backbone.history.navigate(this.generateDeleteUrl(), true);
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
		},
		afterRender: function postRenderDetailView() {
			CoreView.prototype.afterRender.call(this);
			$('.collapse', this.$el).collapse('show');
		}
	});


	// Differenciating export for node or browser.
	if (isInBrowser) {
		NS.Views = NS.Views || {};
		NS.Views.DetailConsultView = DetailConsultView;
	} else {
		module.exports = DetailConsultView;
	}
})(typeof module === 'undefined' && typeof window !== 'undefined' ? window.Fmk : module.exports);
/*global Backbone, $, i18n, window*/
(function(NS) {
	//Filename: views/detail-edit-view.js
	NS = NS || {};
	var isInBrowser = typeof module === 'undefined' && typeof window !== 'undefined';
	var ErrorHelper = isInBrowser ? NS.Helpers.errorHelper : require('../helpers/error_helper');
	var form_helper = isInBrowser ? NS.Helpers.formHelper : require('../helpers/form_helper');
	var _url = isInBrowser ? NS.Helpers.urlHelper : require('../helpers/url_helper');
	var ModelValidator = isInBrowser ? NS.Helpers.modelValidationPromise : require('../helpers/modelValidationPromise');
	var NotImplementedException = isInBrowser ? NS.Helpers.Exceptions.NotImplementedException : require("../helpers/custom_exception").NotImplementedException;
	var CoreView = isInBrowser ? NS.Views.CoreView : require('./core-view');

	var DetailEditView = CoreView.extend({
		tagName: 'div',
		className: 'editView',
		saveModel: undefined, //VmSvc.save
		getModel: undefined, //VmSvc.get

		initialize: function initializeEdit(options) {
			console.warn('######## THIS VIEW  is deprecated.#####');
			options = options || {};
			CoreView.prototype.initialize.call(this, options);
			this.model.on('change', this.render, this);
			this.listenTo(this.model, 'validated:valid', this.modelValid);
			this.listenTo(this.model, 'validated:invalid', this.modelInValid);
			if (this.model.has('id')) {
				var view = this;
				this.getModel(this.model.get('id'))
					.then(function success(jsonModel) {
						view.model.set(jsonModel);
					});
			}
		},

		events: {
			"click button[type='submit']": "save",
			"click button#btnCancel": "cancelEdition"
		},

		//JSON data to attach to the template.
		getRenderData: function getRenderDataEdit() {
			throw new NotImplementedException('getRenderData');
		},

		//Get the json data to be save by the view.
		getDataToSave: function getDataToSaveDetailEdit() {
			return this.model.toJSON();
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
					currentView.saveModel(currentView.getDataToSave())
						.then(function success(jsonModel) {
							currentView.saveSuccess(jsonModel);
						}).then(null, function error(responseError) {
							currentView.saveError(responseError);
						});
				}).then(null, function error(errors) {
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

		generateNavigationUrl: function generateNavigationUrl() {
			if (this.model.get('id') === null || this.model.get('id') === undefined) {
				return "/";
			}
			return _url.generateUrl([this.model.modelName, this.model.get("id")], {});
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

	if (isInBrowser) {
		NS.Views = NS.Views || {};
		NS.Views.DetailEditView = DetailEditView;
	} else {
		module.exports = DetailEditView;
	}
})(typeof module === 'undefined' && typeof window !== 'undefined' ? window.Fmk : module.exports);
﻿/*global Backbone, i18n, $, window, _*/
"use strict";
(function(NS) {
    // Filename: views/list-view.js
    NS = NS || {};
    var isInBrowser = typeof module === 'undefined' && typeof window !== 'undefined';
    //var NotImplementedException = isInBrowser ? NS.Helpers.Exceptions.NotImplementedException : require('../helpers/custom_exception').NotImplementedException;
    var _url = isInBrowser ? NS.Helpers.urlHelper : require('../helpers/url_helper');
    var templatePagination = function() {}; //Todo: call a handlebar herlper.//require('../templates/collection-pagination');
    var ConsultEditView = isInBrowser ? NS.Views.ConsultEditView : require('./consult-edit-view');
    var errorHelper = isInBrowser ? NS.Helpers.errorHelper : require('../helpers/error_helper');

    var ListView = ConsultEditView.extend({
        tagName: 'div',
        className: 'resultView',
        resultsPagination: 'div#pagination',
        templatePagination: templatePagination,
        search: undefined,
        searchCriteria: {},
        //Parameters for rendering the detail inside.
        isShowDetailInside: false,
        ResultSelectionView: undefined,
        ResultSelectionModel: undefined,
        resultsContainer: 'div#lineSelectionContainer',
        additionalData: function() {
            return undefined;
        },
        //View foreach line in the collection view.
        viewForEachLineConfiguration: {
            isActive: false, //True or false will make the rendering different.
            LineView: undefined, //View to create for each line.
            //ModelLineView: undefined, //Model for the view initialize with collection data. It is not use but could be if we would want to initialize another model.
            parentContainer: "table tbody" //selector into which the view .
        },

        initialize: function initializeSearchResult(options) {
            options = options || {};
            ConsultEditView.prototype.initialize.call(this, options);

            this.listenTo(this.model, "reset", function() {
                this.render({
                    isSearchTriggered: true
                });
            }, this);
            //Listen to the model add event.
            this.listenTo(this.model, "add", this.addOne, this);

            if (this.search !== undefined) {
                // Fusion des critères venant du rooter (options.searchCriteria) et de la vue (this.searchCriteria).
                var criteria = {};
                _.extend(criteria, this.searchCriteria, options.searchCriteria);

                var currentView = this;
                //Call the service and inject the result into the model.
                this.search(criteria, this.model.pageInfo()).then(function success(jsonResponse) {
                    currentView.model.setTotalRecords(jsonResponse.totalRecords);
                    currentView.model.reset(jsonResponse.values);
                }).then(null, function error(errorResponse) {
                    errorHelper.manageResponseErrors(errorResponse, {
                        isDisplay: true
                    });
                });
            }
        },
        events: {
            'click tbody td[data-selection]': 'lineSelection',
            'click .pagination li': 'goToPage',
            'click a.sortColumn': 'sortCollection',
            "click .panel-heading": "toogleCollapse",
            'click #btnBack': 'navigateBack',
            "change .pageFilter": "changePageFilter",
            //Edition events
            "click button.btnEdit": "edit",
            "click button[type='submit']": "save",
            "click button.btnCancel": "cancelEdition"
        },
        changePageFilter: function changePageFilterListView(event) {
            this.model.perPage = +event.target.value;
            this.model.currentPage = this.model.firstPage;
            this.fetchDemand();
        },
        sortCollection: function sortCollection(event) {
            event.preventDefault();
            var collectionInfos = this.model.pageInfo();
            var sortField = event.target.getAttribute("data-name");
            var currentSort = collectionInfos.sortField;
            var order = "asc";
            if (currentSort !== undefined && sortField === currentSort.field && currentSort.order === "asc") {
                order = "desc";
            }
            this.model.setSortField(sortField, order);
            this.fetchDemand();
        },

        goToPage: function goToPage(event) {
            event.preventDefault();
            var page = +event.target.getAttribute("data-page");
            this.model.setPage(page);
            this.fetchDemand();
        },

        nextPage: function nextPage(event) {
            event.preventDefault();
            this.model.setNextPage();
            this.fetchDemand();
        },

        previousPage: function PreviousPage(event) {
            event.preventDefault();
            this.model.setPreviousPage();
            this.fetchDemand();
        },

        fetchDemand: function fetchDemand() {
            this.trigger('results:fetchDemand');
        },

        generateNavigationUrl: function generateNavigationUrl(id) {
            return _url.generateUrl([this.model.model.prototype.modelName.replace('.', '/'), 'show', id]);
        },
        renderDetail: function renderDetail() {
            $(this.resultsContainer, this.$el).html(new this.ResultSelectionView({
                model: new this.ResultSelectionModel({
                    id: this.detailId
                })
            }).render().el);
        },
        lineSelection: function lineSelectionSearchResults(event) {
            //todo: should the be unactivated if there is aview per line and delegate to the line. , this.viewForEachLineConfiguration.isActive
            event.preventDefault();
            var id = +$(event.target).parents("td[data-selection]:first").attr('data-selection');
            if (this.isShowDetailInside) {
                this.detailId = id;
                $('.collapse', this.$el).collapse('hide');
                this.trigger('listview:lineSelected', id);
                this.renderDetail();
                // Trigger

            } else {
                // Navigate
                var url = this.generateNavigationUrl(id);
                Backbone.history.navigate(url, true);
            }
        },

        navigateBack: function navigateBack() {
            Backbone.history.history.back();
        },
        //Add one line view from the model.
        addOne: function addOneLineView(model) {
            //console.log("modelNameAddone", model, model.modelName, this);
            var opt = {isEdit: false};
            if (this.isEdit) {
                opt.isEdit = this.isEdit;
            }
            $(this.viewForEachLineConfiguration.parentContainer, this.$el).append(
                new this.viewForEachLineConfiguration.LineView(_.extend({
                    model: model
                }, opt)).render().el
            );
        },
        render: function renderListView(options) {
            options = options || {};
            //If the research was not launch triggered.
            if (!options.isSearchTriggered) {
                return this;
            }
            //If there is no result.
            if (this.model.length === 0) {
                //Is recherche launched.
                this.$el.html(i18n.t('search.noResult')); //todo: call a template
                Backbone.Notification.addNotification({
                    type: 'info',
                    message: i18n.t('search.noResult')
                }, true);
            } else {
                //the template must have named property to iterate over it
                var infos = this.model.pageInfo();
                this.$el.html(this.template(_.extend({
                    //Get the model datas only if view foreach line is active.
                    collection: this.viewForEachLineConfiguration.isActive ? undefined : this.getRenderData(),
                    sortField: infos.sortField.field,
                    order: infos.sortField.order,
                    currentPage: infos.currentPage,
                    perPage: infos.perPage,
                    firstPage: infos.firstPage,
                    totalPages: infos.totalPages,
                    totalRecords: this.model.totalRecords,
                    isViewForLine: this.viewForEachLineConfiguration.isActive
                }, this.additionalData())));

                //Conditionnal code for rendering a line foreachView
                if (this.viewForEachLineConfiguration.isActive) {
                    this.model.forEach(this.addOne, this);
                }

                //render pagination
                $(this.resultsPagination, this.$el).html(this.templatePagination(this.model.pageInfo())); //TODO : this.model.pageInfo() {currentPage: 0, firstPage: 0, totalPages: 10}

                //If there is a detail id set in the view, render it inside.
                if (this.detailId) {
                    this.renderDetail();
                }
            }

            this.delegateEvents();
            return this;
        },
        afterRender: function postRenderListView() {
            ConsultEditView.prototype.afterRender.call(this);
            $('.collapse', this.$el).collapse('show');
        }
        //,
        //triggerSaveModels: function triggerSaveModels() {
        //    this.model.forEach(function(model){
        //        model.trigger("model:end-edit");
        //    }, this);
        //}

    });
    // Differenciating export for node or browser.
    if (isInBrowser) {
        NS.Views = NS.Views || {};
        NS.Views.ListView = ListView;
    } else {
        module.exports = ListView;
    }
})(typeof module === 'undefined' && typeof window !== 'undefined' ? window.Fmk : module.exports);

/*global Backbone, i18n, $, window*/
"use strict";
(function(NS) {
	// Filename: views/search-results-view.js
	NS = NS || {};
	var isInBrowser = typeof module === 'undefined' && typeof window !== 'undefined';
	var ListView = isInBrowser ? NS.Views.ListView : require('./list-view');

	var SearchResultsView = ListView.extend({
	    
	});

	// Differenciating export for node or browser.
	if (isInBrowser) {
		NS.Views = NS.Views || {};
		NS.Views.SearchResultsView = SearchResultsView;
	} else {
		module.exports = SearchResultsView;
	}
})(typeof module === 'undefined' && typeof window !== 'undefined' ? window.Fmk : module.exports);
/*global Backbone, _, $, Promise, window*/
"use strict";
(function(NS) {
	// Filename: views/search-view.js
	NS = NS || {};
	var isInBrowser = typeof module === 'undefined' && typeof window !== 'undefined';
	var NotImplementedException = isInBrowser ? NS.Helpers.Exceptions.NotImplementedException : require('../helpers/custom_exception').NotImplementedException;
	var ErrorHelper = isInBrowser ? NS.Helpers.errorHelper : require('../helpers/error_helper');
	var form_helper = isInBrowser ? NS.Helpers.formHelper : require('../helpers/form_helper');
	var ModelValidator = isInBrowser ? NS.Helpers.modelValidationPromise : require('../helpers/modelValidationPromise');
	var CoreView = isInBrowser ? NS.Views.CoreView : require('./core-view');

	var SearchView = CoreView.extend({
		tagName: 'div',
		className: 'searchView',
		ResultsView: undefined,
		Results: undefined,
		search: undefined,
		resultsSelector: 'div#results',
		isMoreCriteria: false,
		initialize: function initializeSearch(options) {
		    options = options || {};
            // Call the initialize function of the core view.
		    CoreView.prototype.initialize.call(this, options);
			this.isSearchTriggered = options.isSearchTriggered || false;
			this.isReadOnly = options.isReadOnly || false;
			this.model.set({
				isCriteriaReadonly: false
			}, {
				silent: true
			});

			//init results collection
			this.searchResults = new this.Results();
			//handle the clear criteria action
			this.listenTo(this.model, 'change', this.render);
			//initialization of the result view 
			this.searchResultsView = new this.ResultsView({
				model: this.searchResults,
				criteria: this.model
			});
			this.listenTo(this.searchResultsView, 'results:fetchDemand', function() {
				this.runSearch(null, {
					isFormBinded: false
				});
			});
			this.listenTo(this.searchResultsView, 'listview:lineSelected', function () {
			    $('.collapse', this.$el).collapse('hide');
			});
			if (this.isSearchTriggered) {
				this.runSearch(null, {
					isFormBinded: false
				});
			}
		},

		events: {
			"submit form": 'runSearch', // Launch the search.
			"click button#btnReset": 'clearSearchCriteria', // Reset all the criteria.
			"click button#btnEditCriteria": 'editCriteria', //Deal with the edit mode.
			"click button.toogleCriteria": 'toogleMoreCriteria', // Deal with the more / less criteria.
			"click .panel-heading": "toogleCollapse"
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
		    return this.model.toJSON();
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

		runSearch: function runSearchSearchView(event, options) {
		    var searchButton;
			if (event !== undefined && event !== null) {
			    event.preventDefault();
			    searchButton = $("button[type=submit]", event.target); // retrieving the button that triggered the search
			}
			options = options || {};
			var isFormBinded = options.isFormBinded || true;
			//bind form fields on model
			if (isFormBinded) {
				form_helper.formModelBinder({
				    inputs: $('input', this.$el),
                    options: $('select', this.$el)
				}, this.model);
			}
			var currentView = this;
			ModelValidator
				.validate(this.model)
				.then(function(model) {
					currentView.model.unsetErrors({silent: false});
					currentView.search(_.clone(_.omit(currentView.model.attributes, currentView.referenceNames)), currentView.searchResults.pageInfo())
						.then(function success(jsonResponse) {
							return currentView.searchSuccess(jsonResponse);
						}).then(null, function error(errorResponse) {
							currentView.searchError(errorResponse);
						}).then(function resetButton() {
						    if (searchButton) {
						        searchButton.button('reset');
						    }
						});
				}).then(null, function error(errors) {
				    currentView.model.setErrors(errors);
				    if (searchButton) {
				        searchButton.button('reset');
				    }
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
		},
		afterRender: function postRenderSearchView() {
		    CoreView.prototype.afterRender.call(this);
		    $('.collapse', this.$el).collapse('show');
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

	// Differenciating export for node or browser.
	if (isInBrowser) {
		NS.Views = NS.Views || {};
		NS.Views.SearchView = SearchView;
	} else {
		module.exports = SearchView;
	}
})(typeof module === 'undefined' && typeof window !== 'undefined' ? window.Fmk : module.exports);