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
  buffer += "\r\n    <strong>";
  if (stack1 = helpers.message) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = (depth0 && depth0.message); stack1 = typeof stack1 === functionType ? stack1.call(depth0, {hash:{},data:data}) : stack1; }
  buffer += escapeExpression(stack1)
    + "</strong><br />\r\n  ";
  return buffer;
  }

  buffer += "<div class='alert alert-";
  if (stack1 = helpers.cssMessageType) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = (depth0 && depth0.cssMessageType); stack1 = typeof stack1 === functionType ? stack1.call(depth0, {hash:{},data:data}) : stack1; }
  buffer += escapeExpression(stack1)
    + "'>\r\n  <button type='button' class='close' data-dismiss='alert'>&times;</button>\r\n  ";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.messages), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\r\n</div>";
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

/*global i18n, window*/
"use strict";
(function(NS) {
	//Filename: helpers/validators.js
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
					return validator.value === true ? (property.value !== null && prevalidString && prevalidDate) : true;
				case "regex":
					return validator.value.test(property.value);
				case "email":
					return emailValidation(property.value, validator.options);
				case "number":
					return numberValidation(property.value, validator.options);
				case "string":
					var stringToValidate = property.value || "";
					return stringLength(stringToValidate, validator.options);
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
  "use strict";
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  (function(NS) {
    var Model, isInBrowser;
    NS = NS || {};
    isInBrowser = typeof module === 'undefined' && typeof window !== 'undefined';
    Model = (function(_super) {
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

      Model.prototype.modelName = void 0;

      Model.prototype.toJSON = function() {
        var jsonModel;
        jsonModel = Model.__super__.toJSON.call(this);
        jsonModel.metadatas = this.metadatas;
        jsonModel.modelName = this.modelName;
        return jsonModel;
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
		var Notification = isInBrowser ? NS.Models.Notification : require('/.notification');

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
/* global window, Backbone */
"use strict";
(function(NS) {
  // Filename: models/paginatedCollection.js
  NS = NS || {};
  var isInBrowser = typeof module === 'undefined' && typeof window !== 'undefined';
  var ArgumentInvalidException = isInBrowser ? NS.Helpers.Exceptions.ArgumentInvalidException : require("../helpers/custom_exception").ArgumentInvalidException;
  var PaginatedCollection = Backbone.Collection.extend({
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
	var template = NS.templates.notifications; //require('./templates/notifications'); //Todo: call a handlebars function.
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
/*global window*/
"use strict";
(function(NS) {
  // Filename: post_rendering_helper.js
  NS = NS || {};
  var isInBrowser = typeof module === 'undefined' && typeof window !== 'undefined';
  //Container for all the post renderings functions.
  var postRenderingHelpers = {};
  //Register a helper inside the application.
  var registerHelper = function registerHelper(helper) {
    postRenderingHelpers[helper.name] = {fn: helper.fn, options: helper.options};
  };
  //Options must have a selector property and a helperName one.
  var callHelper = function( config) {
    //If there is nothing selected.
    if(config.selector === undefined || config.selector.size() === 0){
      return;
    }
    //If the function  desn not exist on the selection.
    if(config.selector[postRenderingHelpers[config.helperName].fn] === undefined){
      return;
    }
    config.selector[postRenderingHelpers[config.helperName].fn](postRenderingHelpers[config.helperName].options);
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
/*global _, window, i18n*/
"use strict";
(function(NS) {
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
			    _.each(responseErrors.errors, function (error) {
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
	function setModelErrors(model, errors) {
		if (errors !== undefined && errors.fieldErrors !== undefined) {
			model.set({
				'errors': errors.fieldErrors
			});
		}
	}

	var errorHelper = {
		manageResponseErrors: manageResponseErrors,
		display: displayErrors,
		setModelErrors: setModelErrors
	};
	if (isInBrowser) {
		NS.Helpers = NS.Helpers || {};
		NS.Helpers.errorHelper = errorHelper;
	} else {
		module.exports = errorHelper;
	}
})(typeof module === 'undefined' && typeof window !== 'undefined' ? window.Fmk : module.exports);
/*global window*/
"use strict";
(function (NS) {
    //Filename: helpers/form_helper.js
    var isInBrowser = typeof module === 'undefined' && typeof window !== 'undefined';
    NS = NS || {};
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
                    currentvalue = +input.value;
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
    }

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
            var selectValue;
            //A multiple option will be define with select2
            if (this.hasAttribute('multiple')) {
                selectedValue = $(this).select2('val');
            } else {
                selectedValue = this.value;
            };
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
                    var subHeaderName = subHeaders[j].name;
                    subHeaderData.push({
                        cssId: "nav-" + subHeaderName,
                        active: "",
                        name: subHeaderName,
                        translationKey: "header.subHeaders." + subHeaderName,
                        url : subHeaders[j].url
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
              console.warn("The metadatas does not have properties for model '" + model.modelName + "'.");
              return {};
            }
          } else {
            if (this.metadatas[mdName[0]][mdName[1]] != null) {
              return this.metadatas[mdName[0]][mdName[1]];
            } else {
              console.warn("The metadatas does not have properties for model '" + model.modelName + "'.");
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

/*global Promise, _, window*/
"use strict";
(function(NS) {
  NS = NS || {};
  //Filename: helpers/model_validation_promise.js

  //Dependency gestion depending on the fact that we are in the browser or in node.
  var isInBrowser = typeof module === 'undefined' && typeof window !== 'undefined';
  var ArgumentNullException = isInBrowser ? NS.Helpers.Exceptions.ArgumentNullException : require("./custom_exception").ArgumentNullException;
  var metadataBuilder = isInBrowser ? NS.Helpers.metadataBuilder : require('./metadata_builder').metadataBuilder;
  var validators = isInBrowser ? NS.Helpers.validators : require('./validators');
  var validate = function validateModel(model) {
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

  // Initialize the domains and the metadatas.
  var initialize = function initializeModelValiationPromise(options) {
    metadataBuilder.initialize(options);
  };

  if (isInBrowser) {
    NS.Helpers = NS.Helpers || {};
    NS.Helpers.modelValidationPromise = {
      validate: validate,
      initialize: initialize
    };
  } else {
    module.exports = {
      validate: validate,
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
    // type of the request for odata
    var paginator_core = {
        // the type of the request (GET by default)
        type: 'GET',

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
                        result += property + " eq " +"["+ criteria[property].join(',')+"]" + " and "
                        break;
                        //Deal with the object.
                    case "object":
                        if (_.isArray(criteria[property])) {
                            result += property + " eq " + "[" + criteria[property].join(',') + "]" + " and "
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
        return {
            // the query field in the request
            '$filter': criteriaToOdata(criteria),
            // number of items to return per request/page
            '$top': pagesInfo.perPage,
            //records to bypass
            '$skip': (pagesInfo.currentPage-1) * pagesInfo.perPage,
            // field to sort by
            '$orderby': orderToOdata(sortFields),
            // what format would you like to request results in?
            '$format': 'json',
            // custom parameters
            '$inlinecount': 'allpages'
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
            processData: false
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

    var odataHelper = {
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
/* global window, $ */
"use strict";
(function(NS) {
  //Filename: post_rendering_builder.js
  NS = NS || {};
  var isInBrowser = typeof module === 'undefined' && typeof window !== 'undefined';
  var metadataBuilder = isInBrowser ? NS.Helpers.metadataBuilder : require('./metadata_builder').metadataBuilder;
  var postRenderingHelper = isInBrowser ? NS.Helpers.postRenderingHelper : require('./post_rendering_helper').metadataBuilder;
  //Options must contain a model and a viewSelecrot property.
  var postRenderingBuilder = function(options) {
    //Get all the metadatas of the model.
    var metadatas = metadataBuilder.getMetadatas(options.model);
    //Iterate through each attributes of the modoptions.modelel.
    for (var attr in metadatas) {
      var mdt = metadatas[attr];
      /*Check for any of the metadata.*/
      if (mdt !== undefined && mdt !== null) {
        if (mdt.decorator) {
          postRenderingHelper.callHelper({helperName: mdt.decorator, selector: $('[data-name=' + attr + ']', options.viewSelector)});
          //$('[data-name:'+attr+']', viewSelector)
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
"use strict";
(function(NS) {
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
		}
	});

	//Convert an existing Backbone model to a _promise_ version of it.
	var ConvertModel = function ConvertBackBoneModelToPromiseModel(model) {
		if (model.url === undefined || model.urlRoot === undefined) {
			throw new Error("ConvertBackBoneModelToPromiseModel: The url of the model: "+ model.modelName+ " cannot be undefined.");
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

  // Container for all the references lists.
  var references = {};

  //Container for the list and 
  var configuration = {};
  
  //Can be use to override a service, can be call with options = {"referenceName": serviceFunction} 
  //serviceFunction is obtain with a require. 
  function configureRefServices(options){
    _.extend(configuration, options);
  }

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
  function loadListByName(listName) {
      if (typeof configuration[listName] !== "function") {
          throw new Error("You are trying to load the reference list: "+ listName + " which does not have a list configure." )
      }
    //Call the service, the service must return a promise.
    return configuration[listName]();
  }

  // Return an array of many promises for all the given lists.
  function loadMany(names) {
      var promises = [];
      if (names !== undefined) {
          names.forEach(function (name) {
              promises.push(loadListByName(name));
          });
      }
    return promises;
  }


  var referenceHelper = {
    loadListByName: loadListByName,
    loadList: loadList,
    loadMany: loadMany,
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
/* global $, _ , window*/
"use strict";
(function(NS) {
  //Filename: helpers/url_helper.js
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
  if (isInBrowser) {
    NS.Helpers = NS.Helpers || {};
    NS.Helpers.urlHelper = urlHelper;
  } else {
    module.exports = urlHelper;
  }
})(typeof module === 'undefined' && typeof window !== 'undefined' ? window.Fmk : module.exports);
﻿/* global  _ , window */
"use strict";
(function(NS) {
    //Filename: helpers/util_helper.js
    var isInBrowser = typeof module === 'undefined' && typeof window !== 'undefined';
    NS = NS || {};
    var JSON = {};

    // Unflatten a json object.
    JSON.unflatten = function (data) {
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
    JSON.flatten = function (data) {
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
    //Combine two json.
    function combine(json1, json2) {
        var res = {};
        _.extend(
             res,
             JSON.flatten(json1),
             JSON.flatten(json2)
        );
        return JSON.unflatten(res);
    }
    //Util helper.
    var utilHelper = {
        flatten: JSON.flatten,
        unflatten: JSON.unflatten,
        combine: combine
    };
    if (isInBrowser) {
        NS.Helpers = NS.Helpers || {};
        NS.Helpers.utilHelper = utilHelper;
    } else {
        module.exports = utilHelper;
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
/*global Backbone, _, window */
"use strict";
(function(NS) {
  //Filename: views/core-view.js
  NS = NS || {};
  var isInBrowser = typeof module === 'undefined' && typeof window !== 'undefined';
  var postRenderingBuilder = isInBrowser ? NS.Helpers.postRenderingBuilder : require('../helpers/post_rendering_builder');
  //View which is the default view for each view.
  //This view is able to deal with errors and to render the default json moodel.
  var CoreView = Backbone.View.extend({
    toogleIsHidden: function(options) {
      this.isHidden = !this.isHidden;
      this.render(options);
    },
    initialize: function initializeCoreView() {
      this.on('toogleIsHidden', this.toogleIsHidden);
      /*Register after renger.*/
      _.bindAll(this, 'render', 'afterRender');
      var _this = this;
      this.render = _.wrap(this.render, function(render, options) {
        render(options);
        _this.afterRender();
        return _this;
      });
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
    hideCollapse: function hideCollapseCoreView () {
        $('.collapse', this.$el).collapse('hide');
    },
    toogleCollapse: function toogleCollapseCoreView(event) {
        $(".panel-collapse.in", event.target.parentNode.parentNode).collapse('hide');//todo: change the selector
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
      $('.collapse', this.$el).collapse({toogle: true});
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
/*global window, Backbone*/
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

	var DetailEditView = Backbone.View.extend({
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
﻿/*global Backbone, i18n, $, window*/
"use strict";
(function (NS) {
    // Filename: views/list-view.js
    NS = NS || {};
    var isInBrowser = typeof module === 'undefined' && typeof window !== 'undefined';
    //var NotImplementedException = isInBrowser ? NS.Helpers.Exceptions.NotImplementedException : require('../helpers/custom_exception').NotImplementedException;
    var _url = isInBrowser ? NS.Helpers.urlHelper : require('../helpers/url_helper');
    var templatePagination = function () { }; //Todo: call a handlebar herlper.//require('../templates/collection-pagination');
    var CoreView = isInBrowser ? NS.Views.CoreView : require('./core-view');
    
    var ListView = CoreView.extend({
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
        additionalData: function () { return undefined;},
        initialize: function initializeSearchResult(options) {
            options = options || {};
            CoreView.prototype.initialize.call(this);
           
            this.listenTo(this.model, "reset", function () {
                this.render({
                    isSearchTriggered: true
                });
            }, this);

            if (this.search !== undefined) {
                // Fusion des critères venant du rooter (options.searchCriteria) et de la vue (this.searchCriteria).
                var criteria = {};
                _.extend(criteria, this.searchCriteria, options.searchCriteria)

                var currentView = this;
                //Call the service and inject the result into the model.    
                this.search(criteria, this.model.pageInfo()).then(function success(jsonResponse) {
                    currentView.model.setTotalRecords(jsonResponse.totalRecords);
                    currentView.model.reset(jsonResponse.values);
                }).then(null, function error(errorResponse) {
                    Fmk.Helpers.errorHelper.manageResponseErrors(errorResponse, {
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
            "change .pageFilter" :"changePageFilter"
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
            $(this.resultsContainer, this.$el).html(new this.ResultSelectionView({ model: new this.ResultSelectionModel({ id: this.detailId }) }).render().el);
        },
        lineSelection: function lineSelectionSearchResults(event) {
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

        render: function renderSearchResults(options) {
            options = options || {};
            //If the research was not launch triggered.
            if (!options.isSearchTriggered) {
                return this;
            }
            //If there is no result.
            if (this.model.length === 0) {
                //Is recherche launched.
                this.$el.html("<p>No results...</p>");//todo: call a template
                Backbone.Notification.addNotification({
                    type: 'info',
                    message: i18n.t('search.noResult')
                }, true);
            } else {
                //the template must have named property to iterate over it
                var infos = this.model.pageInfo();
                this.$el.html(this.template(_.extend({
                    collection: this.getRenderData(),
                    sortField: infos.sortField.field,
                    order: infos.sortField.order,
                    currentPage: infos.currentPage,
                    perPage: infos.perPage,
                    firstPage: infos.firstPage,
                    totalPages: infos.totalPages,
                    totalRecords: this.model.totalRecords
                }, this.additionalData())));

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
            CoreView.prototype.afterRender.call(this);
            $('.collapse', this.$el).collapse('show');
        }
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
	var RefHelper = isInBrowser ? NS.Helpers.referenceHelper : require('../helpers/reference_helper');
	var CoreView = isInBrowser ? NS.Views.CoreView : require('../core-views');


	var SearchView = CoreView.extend({
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
            // Call the initialize function of the core view.
		    CoreView.prototype.initialize.call(this);
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
			//Load all the references lists which are defined in referenceNames.

			var currentView = this;
		    Promise.all(RefHelper.loadMany(this.referenceNames)).then(function (results) {
		        console.log('resultsreferenceNames', results);
				var res = {}; //Container for all the results.
				for (var i = 0, l = results.length; i < l; i++) {
					res[currentView.referenceNames[i]] = results[i];
					//The results are save into an object with a name for each reference list.
				}
				currentView.model.set(res); //This trigger a render due to model change.
				currentView.isReady = true; //Inform the view that we are ready to render well.
			}).then(null, function(error) {
			    ErrorHelper.manageResponseErrors(error, { isDisplay: true });
			});
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
					currentView.model.unsetErrors();
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