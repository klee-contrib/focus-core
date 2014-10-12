/* name: focus , version: 0.1.5 description: Simple framework for backbone applications.*/ 
 (function initialization(container) {var fmk = container.Fmk || {};fmk.name = 'focus';fmk.version = '0.1.5';container.Fmk = fmk;})(typeof module === 'undefined' && typeof window !== 'undefined' ? window : exports);
/*global window, _*/
(function initialization(container) {
  var fmk = container.Fmk || {};
  _.extend(fmk, {
    Models: {},
    Views: {},
    Services: {},
    Helpers: {},
    initialize: function initialize(options) {
      this.Helpers.metadataBuilder.initialize(options);
      this.Helpers.modelValidationPromise.initialize(options);
      //this.Helpers.messageHelper.initialize();
    }
  });
  container.Fmk = fmk;
})(typeof module === 'undefined' && typeof window !== 'undefined' ? window : exports);
this["Fmk"] = this["Fmk"] || {};
this["Fmk"]["templates"] = this["Fmk"]["templates"] || {};
this["Fmk"]["templates"]["header"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<div class=\"navbar-static-top header\">\n  \n</div>\n<div>\n  <i class=\"fa fa-spinner fa-spin hidden\" id='ajaxIndicator'></i>\n</div>";
  });;
this["Fmk"] = this["Fmk"] || {};
this["Fmk"]["templates"] = this["Fmk"]["templates"] || {};
this["Fmk"]["templates"]["headerItems"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression, self=this, helperMissing=helpers.helperMissing;

function program1(depth0,data) {
  
  var buffer = "", stack1, helper, options;
  buffer += "\n             <li id='";
  if (helper = helpers.cssId) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.cssId); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "' class=\"";
  if (helper = helpers.cssClass) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.cssClass); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + " ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.isActive), {hash:{},inverse:self.noop,fn:self.program(2, program2, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\" ";
  if (helper = helpers.dataAttributes) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.dataAttributes); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + " >\n                <a href=\"";
  if (helper = helpers.route) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.route); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\">"
    + escapeExpression((helper = helpers.t || (depth0 && depth0.t),options={hash:{
    'prefix': ("header."),
    'suffix': (".title")
  },data:data},helper ? helper.call(depth0, (depth0 && depth0.name), options) : helperMissing.call(depth0, "t", (depth0 && depth0.name), options)))
    + "</a>\n             </li>\n          ";
  return buffer;
  }
function program2(depth0,data) {
  
  
  return "active";
  }

  buffer += "<div class=\"navbar-default\">\n    <div class=\"container\">\n      <div class=\"navbar-header\">\n        <button type=\"button\" class=\"navbar-toggle\" data-toggle=\"collapse\" data-target=\".navbar-collapse\">\n          <span class=\"icon-bar\"></span>\n          <span class=\"icon-bar\"></span>\n          <span class=\"icon-bar\"></span>\n        </button>\n        <a class=\"navbar-brand\" href=\"#\"></a>\n      </div>\n      <div class=\"navbar-collapse collapse\" >\n        <ul class=\"nav navbar-nav\">\n          ";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.headerItems), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n    </ul>\n  </div>\n</div>";
  return buffer;
  });;
this["Fmk"] = this["Fmk"] || {};
this["Fmk"]["templates"] = this["Fmk"]["templates"] || {};
this["Fmk"]["templates"]["modalSkeleton"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", helper, options, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;


  buffer += "<!-- Modal -->\n<div class=\"modal fade\" data-modal  datatabindex=\"-1\" role=\"dialog\" aria-labelledby=\"myModalLabel\" aria-hidden=\"true\">\n  <div class=\"modal-dialog\">\n    <div class=\"modal-content\">\n      <div class=\"modal-header\">\n        <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-hidden=\"true\">&times;</button>\n        <h4 class=\"modal-title\" id=\"myModalLabel\">"
    + escapeExpression((helper = helpers.t || (depth0 && depth0.t),options={hash:{
    'keyInContext': (true)
  },data:data},helper ? helper.call(depth0, "title", options) : helperMissing.call(depth0, "t", "title", options)))
    + "</h4>\n      </div>\n      <div class=\"modal-body\" data-modal-content>\n      \n      </div>\n      <div class=\"modal-footer\">\n        <button type=\"button\" class=\"btn btn-default\" data-dismiss=\"modal\">"
    + escapeExpression((helper = helpers.t || (depth0 && depth0.t),options={hash:{},data:data},helper ? helper.call(depth0, "button.modalClose", options) : helperMissing.call(depth0, "t", "button.modalClose", options)))
    + "</button>\n        <button type=\"button\" class=\"btn btn-primary\" data-close=\"modal\">"
    + escapeExpression((helper = helpers.t || (depth0 && depth0.t),options={hash:{},data:data},helper ? helper.call(depth0, "button.modalSave", options) : helperMissing.call(depth0, "t", "button.modalSave", options)))
    + "</button>\n      </div>\n    </div>\n  </div>\n</div>";
  return buffer;
  });;
this["Fmk"] = this["Fmk"] || {};
this["Fmk"]["templates"] = this["Fmk"]["templates"] || {};
this["Fmk"]["templates"]["noResults"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, helper, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<div class=\"noResults\">";
  if (helper = helpers.message) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.message); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</div>";
  return buffer;
  });;
this["Fmk"] = this["Fmk"] || {};
this["Fmk"]["templates"] = this["Fmk"]["templates"] || {};
this["Fmk"]["templates"]["notifications"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, helper, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1, helper;
  buffer += "\n    <strong>";
  if (helper = helpers.message) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.message); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</strong><br />\n  ";
  return buffer;
  }

  buffer += "<div class='alert alert-";
  if (helper = helpers.cssMessageType) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.cssMessageType); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "'>\n  <button type='button' class='close' data-dismiss='alert'>&times;</button>\n  ";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.messages), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n</div>";
  return buffer;
  });;
this["Fmk"] = this["Fmk"] || {};
this["Fmk"]["templates"] = this["Fmk"]["templates"] || {};
this["Fmk"]["templates"]["spinner"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", helper, options, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;


  buffer += "<div class='spinner-container'>\n       <div class='spinner'>\n          <div class=\"three-quarters\">\n            "
    + escapeExpression((helper = helpers.t || (depth0 && depth0.t),options={hash:{},data:data},helper ? helper.call(depth0, "application.loading", options) : helperMissing.call(depth0, "t", "application.loading", options)))
    + "\n          </div>\n       </div>\n   </div>";
  return buffer;
  });;
(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  (function(NS) {
    "use strict";
    var ArgumentInvalidException, ArgumentNullException, CustomException, DependencyException, NotImplementedException, isInBrowser, mod;
    NS = NS || {};
    isInBrowser = typeof module === 'undefined' && typeof window !== 'undefined';

    /*
     * Creates a new CustomException.
     * @class Exception class.
     */
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

/*global _, window*/

/**
 * @module core/http_response_parser
 * @description Global notifications mecanism around the whole application.
 * @see file helpers/backbone_notifications.js
 * @author pbesson
 */

/*
  Jquery ajax error and success [documentation](http://api.jquery.com/jquery.ajax/).
  error
    Type: Function( jqXHR jqXHR, String textStatus, String errorThrown )
    A function to be called if the request fails. The function receives three arguments: The jqXHR (in jQuery 1.4.x, XMLHttpRequest) object, a string describing the type of error that occurred and an optional exception object, if one occurred. Possible values for the second argument (besides null) are "timeout", "error", "abort", and "parsererror". When an HTTP error occurs, errorThrown receives the textual portion of the HTTP status, such as "Not Found" or "Internal Server Error." As of jQuery 1.5, the error setting can accept an array of functions. Each function will be called in turn. Note: This handler is not called for cross-domain script and cross-domain JSONP requests. This is an Ajax Event.
  success: 
    Type: Function( PlainObject data, String textStatus, jqXHR jqXHR )
    A function to be called if the request succeeds. The function gets passed three arguments: The data returned from the server, formatted according to the dataType parameter; a string describing the status; and the jqXHR (in jQuery 1.4.x, XMLHttpRequest) object. As of jQuery 1.5, the success setting can accept an array of functions. Each function will be called in turn. This is an Ajax Event.
 */


(function(NS) {
  "use strict";
  NS = NS || {};

  //Dependencies.
  //Dependency gestion depending on the fact that we are in the browser or in node.
  var isInBrowser = typeof module === 'undefined' && typeof window !== 'undefined';
  var ArgumentNullException = isInBrowser ? NS.Helpers.Exceptions.ArgumentNullException : require("./custom_exception").ArgumentNullException;
  var httpHelper = isInBrowser ? NS.Helpers.httpHelper : require("../helpers/http_helper");
  /**
   * Default configuration.
   * @type {Object}
   */
  var config = {
    totalCountKey: "odata.count",
    valuesKey: "values"
  };

  /**
   * Configure the response parser.
   * @param  {object} extendConf - the property you want to configure in the configuration.
   * @return {[type]}            [description]
   */
  var configure = function configureHttpResponseParser(extendConf) {
    if (!_.isObject(extendConf)) {
      return;
    }
    _.extend(config, extendConf);
  };

  /**
   * All the headers.
   * @type {Object}
   */
  var HEADERS_KEYS = {
    CONTENT_TYPE: "Content-Type",
    TOTAL_COUNT: "X-Total-Count",
    ACCESS_TOKEN: "x-access-token"
  };
  /**
   * All the content types.
   * @type {Object}
   */
  var CONTENT_TYPES = {
    LIST: "application/json+list",
    LIST_META: "application/json+list+meta",
    ENTITY_DESC: "applicatin/json+",
    ENTITY: "application/json"
  };

  /**
   * Get the object name from the content type.
   * @param  {string} contentType - The content type.
   * @return {string} The name of the object.
   */
  var getObjectName = function getObjectNameFromContentType(contentType) {
    var splitContent = contentType.split('+');
    if (splitContent !== undefined && splitContent.length > 1) {
      return splitContent[1].split(';')[0];

    }
    return undefined;
  };
  /**
   * Parse an entity http response.
   * @param  {jqXHR} response   - jQuery XmlHttpRequest.
   * @param {object} contentType -  Object name in the contentType.
   * @return {object}           - The parse response.
   */
  var entityParser = function entityParser(response, contentType) {
    var entity = response.responseJSON;
    //Set an object name if it is given as argument.
    if (contentType) {
      entity._objectName = getObjectName(contentType);
    }
    return entity;
  };

  /**
   * Collection response parser.
   * {jqXHR} response - jQuery XmlHttpRequest.
   * @return {object}         - The parse response.
   */
  var collectionParser = function collectionParser(response, isMetaInHeader) {

    var totalCount, values;
    var jsonResponse = response.responseJSON;

    if (isMetaInHeader) {
      totalCount = +(response.getResponseHeader(HEADERS_KEYS.TOTAL_COUNT));
      values = jsonResponse;
      if (!_.isArray(values)) {
        throw new ArgumentNullException("response.jsonResponse." + config.valuesKey + " should be an array.", response);
      }
    } else {

      totalCount = jsonResponse[config.totalCountKey] || jsonResponse.length;
      values = jsonResponse[config.valuesKey];
      if (!_.isArray(values)) {
        throw new ArgumentNullException("response.jsonResponse should be an array.", response);
      }
    }

    return {
      totalCount: totalCount,
      values: values
    };

  };

  /**
   * @param  {[type]} response [description]
   * @return {[type]}          [description]
   */
  var parseAccessToken = function parseAccessToken(response) {
    var accessToken = response.getResponseHeader(HEADERS_KEYS.ACCESS_TOKEN);
    if (accessToken) {
      httpHelper.setAccessToken(accessToken, true);
    }
  };

  /**
   * Polyfill for the string contains method.
   * @param  {string} string  - The string to test.
   * @param  {string} pattern - The pattern to identify.
   * @return {boolean}         true or false.
   */
  var contains = function stringContains(string, pattern) {
    if (!_.isString(string)) {
      return false;
    }
    return string.indexOf(pattern) !== -1;
  };

  /**
   * Parse HttpResponse.
   * @param  {jqXHR} response - jQuery XmlHttpRequest.
   * @return {object}         - The parse response.
   */
  var parseResponse = function parseResponse(response) {
    var contentType = response.getResponseHeader(HEADERS_KEYS.CONTENT_TYPE);
    parseAccessToken(response);
    if (contains(contentType, CONTENT_TYPES.LIST_META)) {
      return collectionParser(response, false);
    } else if (contains(contentType, CONTENT_TYPES.LIST)) {
      return collectionParser(response, true);
    } else if (contains(contentType, CONTENT_TYPES.ENTITY_DESC)) {
      return entityParser(response, contentType);
    } else if (contains(contentType, CONTENT_TYPES.ENTITY)) {
      return entityParser(response);
    } else {
      return response.responseJSON;
    }
  };
  /**
   * Container for the export.
   * @type {Object}
   */
  var httpResponseParser = {
    entity: entityParser,
    collection: collectionParser,
    parse: parseResponse,
    configure: configure
  };
  // Differenciating export for node or browser.
  if (isInBrowser) {
    NS.Core = NS.Core || {};
    NS.Core.httpResponseParser = httpResponseParser;
  } else {
    module.exports = httpResponseParser;
  }
})(typeof module === 'undefined' && typeof window !== 'undefined' ? window.Fmk : module.exports);
//Session helper. Min browser: IE8, FF 3.5, Safari 4, Chrome 4, Opera 10.5. See [CanIUSE](http://caniuse.com/#feat=namevalue-storage)
/* global window, Promise, Backbone, i18n*/
(function(NS) {
  "use strict";
  //Filename: helpers/router.js
  NS = NS || {};
  //Dependency gestion depending on the fact that we are in the browser or in node.
  var isInBrowser = typeof module === 'undefined' && typeof window !== 'undefined';
  var ArgumentInvalidException = isInBrowser ? NS.Helpers.Exceptions.ArgumentInvalidException : require("./custom_exception").ArgumentInvalidException;
  
  //Config of the storage.
  var config = {
    description: 'Session storage of the user.',
    name: 'Session helper.',
    // Default DB size is _JUST UNDER_ 5MB, as it's the highest size
    // we can use without a prompt.
    size: 4980736,
    storeName: 'userSession',
    version: 1.0
  };

  //Container for the storage.
  var storage;
  try {
    // Initialize storage with session storage and create a variable to use it.
    storage = window.sessionStorage;
  } catch (e) {
    throw new Error("Your browser does not seem to have session storage.");
  }

  //Serialize the data to be save.
  function _serialize(data) {
    if (data !== null && data !== undefined) {
      return JSON.stringify(data);
    }
    return undefined;
  }

  //Deserialize the data.
  function _deserialize(data) {
    if (typeof data !== "string") {
      throw new ArgumentInvalidException('The data to deserialize must be a string.', data);
    }
    return JSON.parse(data);
  }

  //Dave the data into the storage and return a promise.
  // The Promise is fullfilled only if there is data to save.
  function saveItem(key, data) {
    return new Promise(function(resolve, reject) {
      if (data === null || data === undefined) {
        reject(new ArgumentInvalidException('The data to save must be define.', data));
      } else {
        storage.setItem(key, _serialize(data));
        resolve({
          key: key,
          data: data
        });
      }
    });
  }

  //Get data with a promise.
  // The Promise is fullfilled only if the item exists.
  function getItem(key) {
    return new Promise(function(resolve, reject) {
      if (typeof key !== "string") {
        reject(new ArgumentInvalidException("The key must be a string", key));
      }
      var stringData = storage.getItem(key);
      if (stringData === null || stringData === undefined) {
        resolve(null);
      } else {
        resolve(_deserialize(stringData));
      }
    });
  }

  //Remove an item from the session and return a promise.
  // The Promise is fullfilled only if the item exists.
  function removeItem(key) {
    return new Promise(function(resolve, reject) {
      if (typeof key !== "string") {
        reject(new ArgumentInvalidException("The key must be a string", key));
      }
      var stringData = storage.getItem(key);
      if (stringData === null || stringData === undefined) {
        reject(null);
      }else {
        storage.removeItem(key);
        resolve(key);
      }
    });
  }

  //Promise of clearing the storage.
  //Promise is fullfilled only if it works.
  function clear() {
    return new Promise(function(resolve, reject) {
      try {
        storage.clear();
        resolve();
      } catch (e) {
        reject(e);
      }
    });
  }

  var sessionHelper = {
    clear: clear,
    saveItem: saveItem,
    getItem: getItem,
    removeItem: removeItem
  };

  // Differenciating export for node or browser.
  if (isInBrowser) {
    NS.Helpers = NS.Helpers || {};
    NS.Helpers.sessionHelper = sessionHelper;
  } else {
    module.exports = sessionHelper;
  }
})(typeof module === 'undefined' && typeof window !== 'undefined' ? window.Fmk : module.exports);
/*global i18n, _, window*/
(function(NS) {
  "use strict";
  //Filename: helpers/user_helper.js
  var isInBrowser = typeof module === 'undefined' && typeof window !== 'undefined';
  var t = i18n.t || function(s){return s;};
  var ArgumentInvalidException = isInBrowser ? NS.Helpers.Exceptions.ArgumentInvalidException : require("./custom_exception").ArgumentInvalidException;
  var sessionHelper = isInBrowser ? NS.Helpers.sessionHelper : require("./session_helper");
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
      console.info('The roles have change, the site description should be reload.');
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

  //Change the culture informations.
  var changeCultureInfos = function changeCultureInfos(cultureInfos) {
      sessionHelper.getItem('cultureInformations').then(function (cultureInformations) {
          if (cultureInformations === null || cultureInformations === undefined || cultureInformations.cultureCode !== cultureInfos.cultureCode) {
              sessionHelper.saveItem('cultureInformations', _.extend(cultureInformations !== null && cultureInformations !== undefined ? cultureInformations : {}, cultureInfos)).then(function (success) {
                  window.location.reload();
              });
          }
      }).then(null, function (err) { console.error(err) });
  };

  var userHelper = {
    loadUserInformations: loadUserInformations,
    getUserInformations: getUserInformations,
    configureUserInformations: configureUserInformations,
    hasRole: hasRole,
    hasOneRole: hasOneRole,
    changeCultureInfos: changeCultureInfos
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
  var defineParam = function defineParamSiteDescriptionHelper(param) {
    if(param === undefined){
      throw new ArgumentNullException('You cannot set an undefined param.', param);
    }
    //console.log("Debug", param.name, siteDescriptionParams,siteDescriptionParams['codePays']);
    if(siteDescriptionParams[param.name] === undefined){
      throw new ArgumentNullException('The parameter you try to define has not been anticipated by the siteDescription', {param: param, siteParams: siteDescriptionParams});
    }
    if (siteDescriptionParams[param.name].value === param.value && _.isEqual(siteDescriptionParams[param.name].title, param.title)) {
      console.info('No changes on param', param);
      return false;
    }
    siteDescriptionParams[param.name] = {
      value: param.value,
      title: param.title,
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
/* global window, _, Backbone*/
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
    }
    return false;
  };

  //Regenerate the application routes.
  var regenerateRoutes = function regenerateRoutes() {
    processElement(siteDescription);
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
    //if(siteDescriptionHelper.checkParams(siteDescElt.requiredParams)){
     processHeaders(siteDescElt, pfx);
    //}
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
    var isInSiteStructure = false;
    if(siteDescriptionHelper.checkParams(siteDesc.requiredParams)){
      isInSiteStructure = true;
    }
    for (var i in headers) {
      processElement(headers[i], prefix, {isInSiteStructure: isInSiteStructure});
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
          regex: routeToRegExp(siteDesc.url),
          requiredParams: siteDesc.requiredParams
        };
        //Call the Backbone.history.handlers....
        //console.log('*****************');
        //console.log('ROute name: ',route.route);
        //console.log('Route handler name : ',  findRouteName(route.route.substring(1)));
        routes[findRouteName(route.route.substring(1))] = route;
        if(options.isInSiteStructure){
          siteStructure[prefix] = route;
        }
      }
  };

//Find a route with its name.
// _routeToTest_ : Route to test.
// *return* : The handler route name. 
 var findRouteName = function(routeToTest) {
    var handlers = Backbone.history.handlers;
    //console.log('handlers', )
    var h = _.find(handlers, function(handler){
      return handler.route.test(routeToTest);
    });
    if(h !== undefined){
      return  h.route.toString();
    }
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
    processSiteDescription: processSiteDescription,
    findRouteName: findRouteName,
    routeToRegExp:routeToRegExp
  };

  // Differenciating export for node or browser.
  if (isInBrowser) {
    NS.Helpers = NS.Helpers || {};
    NS.Helpers.siteDescriptionBuilder = siteDescriptionBuilder;
  } else {
    module.exports = siteDescriptionBuilder;
  }
})(typeof module === 'undefined' && typeof window !== 'undefined' ? window.Fmk : module.exports);
/*global i18n, window, moment*/
(function(NS) {
	"use strict";
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
		options.minLength = options.minLength || 0;
		var isMinLength = options.minLength !== undefined ? stringToTest.length >= options.minLength : true;
		var isMaxLength = options.maxLength !== undefined ? stringToTest.length <= options.maxLength : true;
		return isMinLength && isMaxLength;
	}
	//Function to  validate that an input is a number.
	function numberValidation(numberToValidate, options) {
		options = options || options;
		if (!numberToValidate) {
			return true;
		}
		if (isNaN(numberToValidate)) {
			return false;
		}
		numberToValidate = +numberToValidate; //Cast it into a number.
		var isMin = options.min !== undefined ? numberToValidate >= options.min : true;
		var isMax = options.max !== undefined ? numberToValidate <= options.max : true;
		return isMin && isMax;
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
					if (property.value === undefined || property.value === null) {
						return true;
					}
					return validator.value.test(property.value);
				case "email":
					if (property.value === undefined || property.value === null) {
						return true;
					}
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

      Collection.prototype.addModel = function(model) {
        if (model.isNew()) {
          return this.changes.creates[model.cid] = model.toSaveJSON();
        } else {
          return this.updateModel(model);
        }
      };

      Collection.prototype.updateModel = function(model) {
        if (this.changes.deletes[model.cid] != null) {
          delete this.changes.deletes[model.cid];
        }
        return this.changes.updates[model.cid] = model.toSaveJSON();
      };

      Collection.prototype.deleteModel = function(model) {
        if (this.changes.creates[model.cid] != null) {
          delete this.changes.creates[model.cid];
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

      Collection.prototype.initialize = function(options) {
        options = options || {};
        this.changes = {
          creates: {},
          updates: {},
          deletes: {}
        };
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
            return _this.addModel(model);
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
        var creates, deletes, labels, updates;
        propertyPrefix = propertyPrefix || "coll";
        creates = "" + propertyPrefix + "Creates";
        updates = "" + propertyPrefix + "Updates";
        deletes = "" + propertyPrefix + "Deletes";
        labels = {};
        labels[creates] = this.changes.creates;
        labels[updates] = this.changes.updates;
        labels[deletes] = this.changes.deletes;
        return labels;
      };

      Collection.prototype.savePrevious = function() {
        return this.previousCollectionValues = this.toJSON();
      };

      Collection.prototype.restorePrevious = function(options) {
        options = options || {};
        options.silent = options.isSilent || false;
        return this.reset(this.previousCollectionValues, options);
      };

      Collection.prototype.isDifferent = function() {
        return !_.isEqual(this.previousCollectionValues, this.toJSON());
      };


      /*
        Set errors on a collection element.
       */

      Collection.prototype.setErrors = function(errors, options) {
        if (_.isArray(errors)) {
          return this.setErrorsFromArray(errors, options);
        } else if (_.isObject(errors)) {
          return this.setErrorsFromObject(errors, options);
        }
      };

      Collection.prototype.setErrorsFromArray = function(errors, options) {
        var error, _i, _len, _results;
        _results = [];
        for (_i = 0, _len = errors.length; _i < _len; _i++) {
          error = errors[_i];
          if ((error.index == null) && typeof error.index !== "number") {
            console.warn('invalid error', error);
          }
          if ((error.errors == null) && typeof error.errors !== "object") {
            console.warn('invalid error', error);
          }
          _results.push(this.at(error.index).set({
            errors: error.errors
          }, options));
        }
        return _results;
      };

      Collection.prototype.setErrorsFromObject = function(errors, options) {
        var err, _results;
        _results = [];
        for (err in errors) {
          if (!_.isString(err)) {
            console.warn('invalid error', err);
          }
          _results.push(this.get(err).set({
            errors: errors[err]
          }, options));
        }
        return _results;
      };

      Collection.prototype.unsetErrors = function(options) {
        return this.forEach(function(mdl) {
          return mdl.unsetErrors(options);
        });
      };

      Collection.prototype.jsonFromSaveJson = function(saveJSON) {
        var changes;
        changes = [];
        _.each(saveJSON.creates, function(elt) {
          return changes.push(elt);
        });
        _.each(saveJSON.updates, function(elt) {
          return changes.push(elt);
        });
        return changes;
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

/*global Backbone, window, module*/
(function(NS) {
  "use strict";
  //Filename: models/headerItems.js
  NS = NS || {};
  //Dependency gestion depending on the fact that we are in the browser or in node.
  var isInBrowser = typeof module === 'undefined' && typeof window !== 'undefined';

  //Menu item model
  var HeaderItem = Backbone.Model.extend({
    defaults: {
      cssId: "",
      cssClass: "",
      dataAttributes: "",
      isActive: false,
      name: undefined,
      transalationKey: "",
      url: "#nav"
    },
    initialize: function initializeMenuItem(options) {
      options = options || {};
      /*if(this.has('route')){
        this.set({url: this.get('route')}, {silent: true});
      }*/
    },
    //Change the active mode.
    toggleActive: function toggleActive() {
      this.set('isActive', !this.get('isActive'));
    }
  });


  // Differenciating export for node or browser.
  if (isInBrowser) {
    NS.Models = NS.Models || {};
    NS.Models.HeaderItem = HeaderItem;
  } else {
    module.exports = HeaderItem;
  }
})(typeof module === 'undefined' && typeof window !== 'undefined' ? window.Fmk : module.exports);
/*global Backbone, window, module, _*/
(function(NS) {
  "use strict";
  //Filename: models/menuItems.js
  NS = NS || {};
  //Dependency gestion depending on the fact that we are in the browser or in node.
  var isInBrowser = typeof module === 'undefined' && typeof window !== 'undefined';
  var HeaderItem = isInBrowser ? NS.Models.HeaderItem : require('header-item');

  //Notification model
  var HeaderItems = Backbone.Collection.extend({
    model: HeaderItem,
    //Change the active mode.
    changeActive: function changeActive(nodeName, options) {
      if (nodeName === undefined || nodeName === this.currentActiveName) {
        return;
      }
      //Get the current and the new active item.
      var current = this.findWhere({
        isActive: true
      });
      var newActive = this.findWhere({
        name: nodeName
      });

      //Check if there is a change
      if (current && newActive) {
        current.set({
          isActive: false
        }, {silent: true});
      }
      if (newActive) {
        newActive.set({
          isActive: true
        }, {silent: true});
        this.currentActiveName = newActive.get('name');
        this.parentName = this.processParentName();
      }
      this.trigger("change");//Notify a change.
    },
    processParentName: function(){
        if (this.currentActiveName === undefined) { return; }
        var splitName = this.currentActiveName.split('.');
        var res = '';
        for(var i = 0, l = splitName.length -1 ; i < l ; i++ ){
            res = res + splitName[i] + '.';
        }if(res !== ''){
            res = res.slice(0,-1);
        }
        return res;
    },
    //Define which part of the json is active.
    toActiveJSON: function toActiveJSON(){
      if(this.currentActiveName === undefined){return;}
      var splitName = this.currentActiveName.split('.');
      var res = '';
      for(var i = 0, l = splitName.length -1 ; i < l ; i++ ){
        res = res + splitName[i] + '.';
      }if(res !== ''){
        res = res.slice(0,-1);
      }
      return _.filter(this.toJSON(),function(element){return element.name.indexOf(res) === 0;});
    }
  });


  // Differenciating export for node or browser.
  if (isInBrowser) {
    NS.Models = NS.Models || {};
    NS.Models.HeaderItems = HeaderItems;
  } else {
    module.exports = HeaderItems;
  }
})(typeof module === 'undefined' && typeof window !== 'undefined' ? window.Fmk : module.exports);
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

      Model.prototype.defaultIfNew = void 0;

      Model.prototype.initialize = function(options) {
        options = options || {};
        Model.__super__.initialize.call(this, options);
        if (options.modelName != null) {
          this.modelName = options.modelName;
        }
        if (this.has('id') && this.get('id') === 'new') {
          this.unset('id', {
            silent: true
          });
          this.set('isNewModel', true, {
            silent: true
          });
        } else {
          this.set('isNewModel', false, {
            silent: true
          });
        }
        this.savePrevious();
        if (this.isNew() && (this.defaultIfNew != null)) {
          return this.set(this.defaultIfNew, {
            silent: true
          });
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
        jsonModel.cid = this.cid;
        jsonModel.metadatas = this.metadatas;
        jsonModel.modelName = this.modelName || this.get('modelName');
        return jsonModel;
      };

      Model.prototype.toSaveJSON = function() {
        var json;
        json = Backbone.Model.prototype.toJSON.call(this);
        return _.omit(json, 'isNew', 'metadatas', 'cid');
      };

      Model.prototype.isInCollection = function() {
        return this.collection != null;
      };

      Model.prototype.savePrevious = function() {
        return this.perviousModelValues = this.toSaveJSON();
      };

      Model.prototype.restorePrevious = function(options) {
        options = options || {};
        options.silent = options.isSilent || false;
        this.clear({
          silent: true
        });
        return this.set(this.perviousModelValues, options);
      };

      Model.prototype.isDifferent = function() {
        return !_.isEqual(this.perviousModelValues, this.toSaveJSON());
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
  /**
   * [initialize description]
   * @param  {[type]} )  {                 this.set({                   creationDate: new Date()                       } [description]
   * @param  {[type]} {                                silent: true      });                      }  } [description]
   * @return {[type]}    [description]
   */
  var Notification = Backbone.Model.extend({
    defaults: {
      /**
       * [type description]
       * @type {[type]}
       */
      type: undefined, //error/warning/success...
      message: undefined, // The message which have to be display.
      creationDate: undefined
    },
    /**
     * Initialize the date of the notification.
     * @return {undefined}
     */
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
      // export column labels
      exportColumnLabels: {},
      initialize: function initializePagiatedCollection(options) {
          Collection.prototype.initialize.call(this, options);
          if (this.sortField !== undefined && this.sortField.field !== undefined) {
              this.setSortField(this.sortField.field, this.sortField.order);
          }
      },
      setPageInfo: function setPageInfo(pageInfos){
        this.totalRecords = pageInfos.totalRecords;
        this.currentPage = pageInfos.currentPage;
        this.firstPage = pageInfos.firstPage;
        this.lastPage = pageInfos.lastPage;
        this.perPage = pageInfos.perPage;
        this.sortField = pageInfos.sortField;
      },
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
	var template = isInBrowser ? NS.templates.notifications : function(){}; //require('./templates/notifications'); //Todo: call a handlebars function.
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
      if (typeof helper.parseFunction !== "string") {
          throw new ArgumentInvalidException("registerHelper, helper.fn must be a function name: a string.", helper);
      }
      if (!$.fn[helper.parseFunction]) {
          throw new DependencyException("registerHelper, helper.fn: "+ helper.parseFunction +" must be a registered JQuery plugin in $.fn");
      }
      postRenderingHelpers[helper.name] = {fn: helper.fn, options: helper.options, parseArgument: helper.parseArgument, parseFunction: helper.parseFunction};
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

  //Call the parser plugin
  var callParser = function callParser(config){
    //If there is nothing selected.
    if(config.selector === undefined || config.selector.size() === 0){
      return;
    }
    if (typeof config.helperName !== "string") {
        throw new ArgumentInvalidException("callHelper, config.helperName must be a string, check your in your domain file any the decorator property", config);
    }
    //If the function  desn not exist on the selection.
    if(config.selector[postRenderingHelpers[config.helperName].parseFunction] === undefined){
      return;
    }
    var helper = postRenderingHelpers[config.helperName];
    return config.selector[helper.parseFunction](helper.parseArgument);
  };
  var mdl = {
    registerHelper: registerHelper,
    callHelper: callHelper,
    callParser:callParser
  };
    // Differenciating export for node or browser.
  if (isInBrowser) {
    NS.Helpers = NS.Helpers || {};
    NS.Helpers.postRenderingHelper = mdl;
  } else {
    module.exports = mdl;
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

      MetadataBuilder.prototype.getDomains = function() {
        return _.clone(this.domains);
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
            if ((this.metadatas[mdName[0]] != null) && (this.metadatas[mdName[0]][mdName[1]] != null)) {
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

/* global  _ , window, Promise */
(function(NS) {
    "use strict";
    //Filename: helpers/util_helper.js
    var isInBrowser = typeof module === 'undefined' && typeof window !== 'undefined';
    var ArgumentInvalidException = isInBrowser ? NS.Helpers.Exceptions.ArgumentInvalidException : require("./custom_exception").ArgumentInvalidException;
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
        var result = {},
            cur, prop, idx, last, temp;
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
    //Deeply combine an arbitrary number of JS objects.
    function combine() {
        var res = {};
        var args = _.map(arguments, function(item) {
            return item && !_.isEmpty(item) ? JSON.flatten(item) : {};
        });
        args.unshift(res);
        _.extend.apply(this, args);
        return JSON.unflatten(res);
    }
    //Deeply combine two json.
    function combineTwo(json1, json2) {
        var res = {};
        _.extend(
            res,
            JSON.flatten(json1),
            JSON.flatten(json2)
        );
        return JSON.unflatten(res);
    }
    //Group datas by split char.
    function groupBySplitChar(data, options) {
        options = options || {};
        if (!_.isObject(data)) {
            throw new ArgumentInvalidException('Data must be an object', data);
        }
        var splitKey = options.splitKey || '.';
        var resutContainer = {};
        for (var prop in data) {
            var l = prop.split(splitKey).length;
            if (!_.isObject(resutContainer[l])) {
                resutContainer[l] = {};
            }
            resutContainer[l][prop] = data[prop];
        }
        return resutContainer;
    }
    //Generate four random hex digits.
    function splitLevel(source, options) {
        options = options || {};
        var splitChar = options.splitChar || '.';
        var depth = options.depth || source.length;
        //if(depth === 0){return source;}
        return _.reduce(source.split(splitChar, depth), function(memo, val) {
            return memo + val + splitChar;
        }, '').slice(0, -1);
    }

    function S4() {
        return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    }
   
    /**
     * Generate a pseudo-GUID by concatenating random hexadecimal
     * @return {string} A guid.
     */
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
    /**
     * Sort an object by its keys.
     * @param  {object} object - The object to sort.
     * @return {object}        - The sorted object.
     */
    var sortObject = function sortObject(object) {
        if(!_.isObject(object)){
            throw new ArgumentInvalidException("object");
        }
        var tmp = {};
        var sortedKeys = _.sortBy(_.keys(object), function(d) {
            return d;
        });
        for (var i = 0; i < sortedKeys.length; i++) {
            tmp[sortedKeys[i]] = object[sortedKeys[i]];
        }
        return tmp;
    };

    //Method to call in order to know if a model is a model.
    var isBackboneModel = function isBackboneModel(model) {
        return model !== undefined && model !== null && typeof model.has === "function";
    };

    // Method to call in order to know if a model is a collection.
    var isBackboneCollection = function isBackboneCollection(collection) {
        return collection !== undefined && collection !== null && typeof collection.add === "function";
    };

    //Method to call in order to know of an object is a view.
    var isBackboneView = function isBackboneView(view) {
        return view !== undefined && view !== null && typeof view.render === "function";
    };

    // This method perform an ajax request within a promise.
    // Example call : utilHelper.promiseAjax({url: "http://localhost:8080/api/list/1", type: "GET"}).then(console.log,console.error);
    var promiseAjax = function promiseAjax(ajaxSettings) {
        ajaxSettings = ajaxSettings || {};
        return new Promise(function promiseLoadList(resolve, reject) {
            //console.log("Errors", errors);
            $.ajax({
                url: ajaxSettings.url,
                type: ajaxSettings.type,
                data: ajaxSettings.data,
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

    // Returns a promise that is automatically rejected with an error message.
    var promiseRejectWithMessage = function promiseRejectWithMessage(messageKey) {
        return new Promise(function(resolve, reject) {
            reject({
                responseJSON: {
                    "error": messageKey
                }
            });
        });
    };

    //Util helper.
    var utilHelper = {
        flatten: JSON.flatten,
        unflatten: JSON.unflatten,
        combine: combine,
        groupBySplitChar: groupBySplitChar,
        splitLevel: splitLevel,
        loadLocalData: loadLocalData,
        guid: guid,
        generateFake: generateFake,
        isBackboneModel: isBackboneModel,
        isBackboneCollection: isBackboneCollection,
        isBackboneView: isBackboneView,
        promiseAjax: promiseAjax,
        promiseRejectWithMessage: promiseRejectWithMessage,
        sortObject: sortObject
    };
    if (isInBrowser) {
        NS.Helpers = NS.Helpers || {};
        NS.Helpers.utilHelper = utilHelper;
    } else {
        module.exports = utilHelper;
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
/*global $,window*/

/**
 * @module helpers/backbone_notifications
 * @description Global notifications mecanism around the whole application.
 * @see file helpers/backbone_notifications.js
 * @author  pbesson
 */

(function(NS) {
  "use strict";
  NS = NS || {};
  
  //Dependencies.
  //Dependency gestion depending on the fact that we are in the browser or in node.
  var isInBrowser = typeof module === 'undefined' && typeof window !== 'undefined';
  var Notifications = isInBrowser ? NS.Models.Notifications : require('../models/notifications');
  var NotificationsView = isInBrowser ? NS.Views.NotificationsView : require('../views/notifications-view');
 
  /**
   * Container specific to the application in order to manipulate the notification the way we want.
   * @type {Object}
   */
  var backboneNotification = {
    
    /**
     * An instance of the notifications view in order to deal with the notifications.
     * Which has a Notifications Model. This view is able to manipulate notifications and to render them.
     * @type {NotificationsView}
     */
    notificationsView: new NotificationsView({
      model: new Notifications()
    }),
    
    /**
     * Add a notification in the stack. Is isRender is define and is true, the notifications are displayed.
     * @param {object}  jsonNotification - A json object representing the notification. Types: warning, error, success.
     * @param {Boolean} isRender         - Is isRender is define and is true, the notifications are displayed immediately.
     * @example `Fmk.helpers.backboneNotifications.addNotification({type: "error", message: "Message"}, true);`
     *   
     */
    addNotification: function addNotification(jsonNotification, isRender) {
      isRender = isRender || false;
      this.notificationsView.model.add(jsonNotification);
      if (isRender) {
        this.renderNotifications();
      }
    },
 
    /**
     * Render all the notifications which are in the notifications collection and then clear this list.
     * Once the notifications have been rendered, the messages stack is cleared
     * @param  {string} selectorToRender - A css selector twhich define where the notifications are redered. Default us "div#summary"
     * @param  {integer} timeout         - If a timeout is define, the notification is hidden after _timeout_ seconds.
     * @return {undefined}
     */
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
    
    /**
     * Clear all the displayed notifications.
     * @param  {string} selectorToRender The css selector describing where the notifications are rendered. Default is "div#summary".
     * @return @return {undefined}
     */
    clearNotifications: function clearNotifications(selectorToRender) {
      var selector = selectorToRender || "div#summary";
      $(selector).html('');
      $('button').button('reset');
    },
    
    /**
     * Clear only the errors in the display of the screen.
     * @param  {string} selectorToRender The css selector describing where the notifications are rendered. Default is "div.notifications div.alert-danger".
     * @return {[type]}                  [description]
     */
    clearErrors: function clearErrors(selectorToRender) {
      var selector = selectorToRender || "div.notifications div.alert-danger";
      $(selector).html('');
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
          var nameAttribute = "data-name='" + attr + "'";

          postRenderingHelper.callHelper({
            helperName: mdt.decorator, //Get the post rendering helper to call from the metdata, this helper must have been register before.
            selector: $("input[" + nameAttribute + "],select[" + nameAttribute + "],div[" + nameAttribute + "]", options.viewSelector), //Create a selector on each attribute in the view with its .
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
/*global _, window, i18n*/

/**
 * @module helpers/error_helper
 * @description Error handling around the application.
 * @see file helpers/error_helper.js
 */

(function(NS) {
    "use strict";
    var isInBrowser = typeof module === 'undefined' && typeof window !== 'undefined';
    NS = NS || {};
    var BackboneNotification = isInBrowser ? NS.Helpers.backboneNotification : require('./backbone_notification');
    var UtilHelper = isInBrowser ? NS.Helpers.utilHelper : require('./util_helper');
    var metadataBuilder = isInBrowser ? NS.Helpers.metadataBuilder : require('./metadata_builder').metadataBuilder;

    /**
     * Define all the error types of the exceptions which are defined.
     * @type {object}
     */
    var errorTypes = {
        entity: "entity",
        collection: "collection",
        composite: "composite"
    };

    /**
     * List of all the global messages to look after.
     * @type {Array}
     */
    var globalMessages = [{
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
        if (_.isArray(options.globalMessages)) {
            globalMessages = options.globalMessages;
        }
        if (_.isObject(options.errorTypes)) {
            errorTypes = options.errorTypes;
        }
    }

    /**
     * Treat the response json of an error.
     * @param  {object} responseJSON The json response from the server.
     * @param  {object} options The options containing the model. {model: Backbone.Model}
     * @return {object} The constructed object from the error response.
     */
    function treatEntityExceptions(responseJSON, options) {
        var errors = responseJSON.errors;
        /*if (options.isDisplay || options.model) {
            displayErrors(errors, options);
        }*/
        if (options.model) {
            setModelErrors(options.model, errors);
        }
        return errors;
    }

    /**
     * Treat the collection exceptions.
     * @param  {object} responseJSON The JSON response from the server.
     * @param  {object} options Options for error handling. {isDisplay: boolean, model: Backbone.Model}
     * @return {object} The constructed object from the error response.
     */
    function treatCollectionExceptions(responseJSON, options) {
        var errors = responseJSON.errors;
        /* if (options.isDisplay || options.model) {
            displayErrors(errors, options);
        }*/
        if (options.model) {
            setCollectionErrors(options.model, errors);
        }
        return errors;

    }

    function treatGlobalMessagesPerType(messages, type) {
        var messagesGlobal = [];
        messages.forEach(function convertErrorsIntoNotification(element) {
            var options = {};
            if (_.isObject(element)) {
                options = formatParameters(element.parameters);
                element = element.message;
            }
            messagesGlobal.push({
                type: type,
                message: i18n.t(element, options),
                creationDate: Date.now()
            });

        });
        BackboneNotification.addNotification(messagesGlobal);
    }

    /**
     * Treat the global errors.
     * @param  {object} responseJSON - Treat the global errors.
     * @param {object} options - Options for error handling.{isDisplay:[true/false], globalMessages: [{type: "error", name: "propertyName"}]}
     * @return {}
     */
    function treatGlobalErrors(responseJSON, options) {
        options = options || {};
        var isDisplay = options.isDisplay || true;
        var allMessagesTypes = options.globalMessages || globalMessages;
        if (responseJSON !== undefined) {
            var messages = responseJSON;
            //Looping through all messages types.
            allMessagesTypes.forEach(function treatAllTypes(globalMessageConf) {
                //Treat all the gloabe
                var msgs = messages[globalMessageConf.name];
                if (msgs !== undefined) {
                    treatGlobalMessagesPerType(msgs, globalMessageConf.type);
                }
            });
            if (isDisplay) {
                BackboneNotification.renderNotifications();
            }

        }



    }

    /**
     * Treat with all the custom exception
     * @param  {object} responseJSON - Response from the server.
     * @param  {object} options      - Options for the exceptions teratement such as the {model: modelVar}.
     * @return {object}              - The parsed error response.
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

    // .
    /**
     * Transform errors send by API to application errors. Dispatch depending on the response http code.
     * @param  {object} response - Object whic
     * @param  {object} options  - Options for the exceptions teratement such as the model, {model: modelVar}.
     * @return {object}          - The parsed error response.
     */
    function manageResponseErrors(response, options) {
        options = options || {};
        response = response || {};
        var responseErrors = response.responseJSON;
        if (responseErrors === undefined) {
            if (response.responseText !== undefined) {
                try {
                    //The first try is to parse the response in JSON. Maybe the return mime type is not correct.
                    responseErrors = JSON.parse(response.responseText);
                } catch (e) {
                    //Construt an error with the text.
                    responseErrors = {
                        statusCode: response.status,
                        globalErrorMessages: [response.responseText]
                    };
                }

            }

        }
        responseErrors.statusCode = responseErrors.statusCode || response.status;
        if (responseErrors.statusCode) {
            treatGlobalErrors(responseErrors);
            /*Deal with all the specific exceptions*/
            switch (responseErrors.statusCode || response.status) {
                case 400:
                    treatBadRequestExceptions(responseErrors, options);
                    break;
                case 401:
                    treatBadRequestExceptions(responseErrors, options);
                    break;
                case 422:
                    treatBadRequestExceptions(responseErrors, options);
                    break;
                default:
                    break;
            }
            return;
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

    /**
     * Display errors which are defined into the errors.global.
     * @param  {array} errors   - An array containing the globam errors.
     * @param  {object} options - An object which contains the method options such as isDisplay to tell if the errors has to be immediatly displayed.
     * @return {undefined}
     */
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

    /**
     * Set the *model* errors in the fieldErrors.
     * @param {Model} model    - A backbone model.
     * @param {object} errors  - An object which represents the errros. There should be the follwing structure : `{fieldErrors: {property: "Error Message."}}`.
     * @param {object} options - Options defined when setting the errors to the model.
     */
    function setModelErrors(model, errors, options) {
        if (errors !== undefined && errors.fieldErrors !== undefined) {
            model.set({
                'errors': errors.fieldErrors
            }, options);
        }
    }

    /**
     * Set the *model* errors in the fieldErrors.
     * @param {Model} model    - A backbone model.
     * @param {object} errors  - An object which represents the errros. There should be the follwing structure : `{fieldErrors: {property: "Error Message."}}`.
     * @param {object} options - Options defined when setting the errors to the model.
     */
    function setCollectionErrors(collection, errors, options) {
        collection.setErrors(errors, options);
    }

    /**
     * Template an error message with parameters.
     * @param  {object} parameters - The parameters to format.
     * @return {object}            - The formated parameters.
     */
    function formatParameters(parameters) {
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

    /**
     * Exposed property of the module.
     * @type {Object}
     */
    var errorHelper = {
        manageResponseErrors: manageResponseErrors,
        display: displayErrors,
        setModelErrors: setModelErrors,
        setCollectionErrors: setCollectionErrors,
        configure: configure,
        treatGlobalErrors: treatGlobalErrors
    };

    if (isInBrowser) {
        NS.Helpers = NS.Helpers || {};
        NS.Helpers.errorHelper = errorHelper;
    } else {
        module.exports = errorHelper;
    }
})(typeof module === 'undefined' && typeof window !== 'undefined' ? window.Fmk : module.exports);
/*global Promise, $, _, window*/
"use strict";
(function(NS) {
  NS = NS || {};
  /* Filename: helpers/reference_helper.js  */
  //Dependency gestion depending on the fact that we are in the browser or in node.
  var isInBrowser = typeof module === 'undefined' && typeof window !== 'undefined';
  var userHelper = isInBrowser ? NS.Helpers.utilHelper : require("./util_helper");

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
      return userHelper.promiseAjax({ url: listDesc.url, type: 'GET' });
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
          getService(listName, query.term).then(function (results) {
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
/*global window, $, Backbone, _*/

/**
 * @module helpers/form_helper
 * @description Helper for _form binding_, deals with models, collections, input, select, jQuery plugins.
 * @see file helpers/form_helper.js
 */

(function(NS) {
    "use strict";

    //Dependencies
    var isInBrowser = typeof module === 'undefined' && typeof window !== 'undefined';
    NS = NS || {};
    var postRenderingHelper = isInBrowser ? NS.Helpers.postRenderingHelper : require("./post_rendering_helper");

    /**
     * Helper to bond collections on list dom.
     * @param  {object} jQuery selector         - A selector which should contains the list of element which dom list element.
     * @param  {Backbone.Collection} collection - The collection where the reconstructed elements will be injected.
     * @param  {object} options                 - {isSilent: boolean}
     * @return {undefined}
     */
    var _formCollectionBinder = function forCollectionBinder(selector, collection, options) {
        options = options || {};
        options.isSilent = options.isSilent !== undefined ? options.isSilent : true;
        if (selector !== undefined && selector !== null && collection instanceof Backbone.Collection) {
            //collection.reset(null, {silent: true}); // The collection is cleared.
            var index = 0;
            //@todo: Check if there is a problem on collection save, the selector could have been change, do a clone.
            Array.prototype.forEach.call(selector, function(modelLineSelector) {
                //var model = new collection.model();
                this.formModelBinder({
                        inputs: $('input, textarea', modelLineSelector),
                        options: $('select', modelLineSelector)
                    },
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

    /**
     * Model binder. Takes the data from the dom element and fill the model. Each dom element should have a _data-name_ property.
     * @param  {object} data          - An object withe the structure {inputs: jQuerySelector, options: jQuerySelector} w<here jQuery Selector which contains the dom element of a model. inputs for inputs, options for selects.
     * @param  {Backbone.Model} model - a Backbone.Model where the dom data will be injected to populate the fields.
     * @param  {object} options       - The default options are: {isSilent: true}
     * @return {undefined}
     */
    var _formModelBinder = function formModelBinder(data, model, options) {
        options = options || {};
        options.isSilent = options.isSilent !== undefined ? options.isSilent : true;
        var modelContainer = {};
        if (data.inputs !== null && data.inputs !== undefined) {
            modelContainer = _.extend(modelContainer, this.formInputModelBinder(data.inputs, model, options));
        }
        if (data.options !== null && data.options !== undefined) {
            modelContainer = _.extend(modelContainer, this.formOptionModelBinder(data.options, model, options));
        }
        model.set(modelContainer, {
            silent: options.isSilent
        });
    };

    // inputs must be a selector with option:selected inside and model a BackBone model.
    /**
     * Bind the model. If the model has a decorator (ie) a jQuery plugin, the data-decorator is use in order to
     * @param  {object} inputs           - Selector containing all the inputs.
     * @param  {Backbone.Model} model    - The model on which there is .
     * @param  {object} options          - The default options are: {isSilent: true, isForceModelBinding: false}.
     * @return {[type]}         [description]
     */
    var _formInputModelBinder = function formInputModelBinder(inputs, model, options) {
        options = options || {};
        options.isSilent = options.isSilent !== undefined ? options.isSilent : true;
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
            //If a decorator is define, it should be use in order to get back the value.
            var decorator = input.getAttribute('data-decorator');
            if (decorator) {
                currentvalue = postRenderingHelper.callParser({
                    selector: $(input),
                    helperName: decorator
                });

            } else if (input.tagName === "TEXTAREA") {
                currentvalue = input.value;
            } else { //See if an if on currentValue is nececessary.
                switch (input.getAttribute('type')) {
                    case "checkbox":
                        currentvalue = input.multiple ? input.value : input.checked;
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

            }


            if (input.multiple) {
                if (input.checked) {
                    if (modelContainer[this.getAttribute('data-name')] === undefined) {
                        modelContainer[this.getAttribute('data-name')] = [currentvalue];
                    } else {
                        modelContainer[this.getAttribute('data-name')].push(currentvalue);
                    }
                }
            } else {
                modelContainer[this.getAttribute('data-name')] = currentvalue;
            }
        });
        if (options.isForceModelSet) {
            model.set(modelContainer, {
                silent: options.isSilent
            });
        }
        return modelContainer;
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
        options.isSilent = options.isSilent !== undefined ? options.isSilent : true;
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
            //A multiple option will be define with select2
            var select = this;
            var decorator = select.getAttribute('data-decorator');
            if (decorator) {
                selectedValue = postRenderingHelper.callParser({
                    selector: $(select),
                    helperName: decorator
                });
            } else {
                if (this.hasAttribute('multiple')) {
                    selectedValue = $(this).val() || []; // TODO : RGE si select2, il faut utiliser $(this).select2('val')
                } else {
                    selectedValue = this.value;
                }

            }
            modelContainer[attributeName] = selectedValue === "undefined" ? undefined : selectedValue;
        });
        if (options.isForceModelSet) {
            model.set(modelContainer, {
                silent: options.isSilent
            });
        }
        return modelContainer;

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
/* global window, Promise, Backbone, i18n*/
(function(NS) {
  "use strict";
  //Filename: helpers/router.js
  NS = NS || {};
  //Dependency gestion depending on the fact that we are in the browser or in node.
  var isInBrowser = typeof module === 'undefined' && typeof window !== 'undefined';
  var userHelper = isInBrowser ? NS.Helpers.userHelper : require("./user_helper");
  var siteDescriptionBuilder = isInBrowser ? NS.Helpers.siteDescriptionBuilder : require("./site_description_builder");
  var backboneNotification = isInBrowser ? NS.Helpers.backboneNotification : require("./backbone_notification");
  var ArgumentNullException = isInBrowser ? NS.Helpers.Exceptions.ArgumentNullException : require("./custom_exception").ArgumentNullException;
  var middleWares = [];
  var middlewarePromise = function middlewarePromise(middleWareFunction) {
    return new Promise(function(resolve, reject) {
      if (middleWareFunction(arguments)) {
        resolve(arguments);
      } else {
        reject(arguments);
      }
    });
  };

  var registerMiddleWare = function registerMiddleWare(middleWareFunction) {
    middleWares.push(middleWareFunction);
  };
  //Extend the backbone router.
  var Router = Backbone.Router.extend({
    route: function(route, name, callback) {
      var router = this;
      if (!callback){
        callback = this[name];
      }
      if(callback === undefined || callback === null){
        throw new ArgumentNullException("The route callback seems to be undefined, please check your router file for your route: ", name);
      }
      var f = function() {
          //console.log('route before', route);
        //Treat the home case.
        if(route === ""){route = "home";}
        var n = siteDescriptionBuilder.findRouteName(route);
        var rt = siteDescriptionBuilder.getRoute(n);
        //If the route does not exists, or the user does not have any right on the route display an error.
        if((rt === undefined && route!== '') || !userHelper.hasOneRole(rt.roles)){
          backboneNotification.addNotification({type: "error", message: i18n.t('application.noRights')}, true);
          return Backbone.history.navigate('', true);
        }else {
          //Rendre all the notifications in the stack.
          backboneNotification.renderNotifications();
        }
        //console.log('routeObject', siteDescriptionBuilder.getRoute(n));
        callback.apply(router, arguments);
      };
      return Backbone.Router.prototype.route.call(this, route, name, f);
    }
  });

  // Differenciating export for node or browser.
  if (isInBrowser) {
    NS.Helpers = NS.Helpers || {};
    NS.Helpers.Router = Router;
  } else {
    module.exports = Router;
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
      date: 'L',
      dateTime: 'LLL'
    };
    formaters = {};
    formaters.configure = function(options) {
      return _.extend(format, options);
    };
    formaters.date = function(prop, options) {
      var dateFormat;
      options = options || {};
      dateFormat = options.dateFormat || format.date;
      if (prop === void 0) {
        return void 0;
      }
      prop = prop.slice(0, 10);
      return moment(prop).format(dateFormat);
    };
    formaters.dateTime = function(prop, options) {
      var dateTimeFormat;
      options = options || {};
      dateTimeFormat = options.dateTimeFormat || format.dateTime;
      return moment(prop).format(dateTimeFormat);
    };
    formaters.number = function(prop, options) {
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

/*global window*/
(function(NS) {
    "use strict";

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
                for (var j = 0; j < subHeaders.length; j++) {
                    var sub2HeaderData = [];
                    if (subHeaders[j].sub2Header !== undefined) {
                        var sub2Headers = subHeaders[j].sub2Header;
                        for (var k = 0; k < sub2Headers.length; k++) {
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
  (function(NS) {
    "use strict";
    var ArgumentInvalidException, ArgumentNullException, defineLanguage, defineLanguages, getCultures, getLanguage, isInBrowser, languagesOptions, mod;
    NS = NS || {};
    isInBrowser = typeof module === 'undefined' && typeof window !== 'undefined';
    ArgumentNullException = isInBrowser ? NS.Helpers.Exceptions.ArgumentNullException : require("./custom_exception").ArgumentNullException;
    ArgumentInvalidException = isInBrowser ? NS.Helpers.Exceptions.ArgumentInvalidException : require("./custom_exception").ArgumentInvalidException;
    languagesOptions = {
      'fr-FR': {},
      'en-GB': {}
    };
    defineLanguage = function(cultureCode, languageOptions, options) {
      var isExtend;
      options = options || {};
      isExtend = options.isExtend || false;
      if (cultureCode == null) {
        throw new ArgumentNullException("cultureCode", cultureCode);
      }
      if (_.isString(cultureCode) == null) {
        throw new ArgumentInvalidException("cultureCode should be a string.", cultureCode);
      }
      if (languageOptions == null) {
        throw new ArgumentNullException("cultureCode", languageOptions);
      }
      if (_.isObject(languageOptions) == null) {
        throw new ArgumentInvalidException("languageOptions should be an object.", languageOptions);
      }
      if (!isExtend || (languageOptions[cultureCode] == null)) {
        return languagesOptions[cultureCode] = languageOptions;
      } else {
        return _.extend(languagesOptions[cultureCode], languageOptions);
      }
    };
    defineLanguages = function(languages, options) {
      var language, _i, _len, _results;
      if (!_.isArray(languages)) {
        throw new ArgumentInvalidException("Languages should be an array", languages);
      }
      _results = [];
      for (_i = 0, _len = languages.length; _i < _len; _i++) {
        language = languages[_i];
        _results.push(defineLanguage(language.culture, language.options));
      }
      return _results;
    };
    getCultures = function() {
      return _.keys(languagesOptions);
    };
    getLanguage = function(cultureCode) {
      if (languagesOptions[cultureCode] != null) {
        return languagesOptions[cultureCode];
      }
      return void 0;
    };
    mod = {
      "getCultures": getCultures,
      "defineLanguage": defineLanguage,
      "defineLanguages": defineLanguages,
      "getLanguage": getLanguage
    };
    if (isInBrowser) {
      NS.Helpers = NS.Helpers || {};
      return NS.Helpers.languageHelper = mod;
    } else {
      return module.exports = mod;
    }
  })(typeof module === 'undefined' && typeof window !== 'undefined' ? window.Fmk : module.exports);

}).call(this);

/*global _, $, window*/
"use strict";
(function(NS) {
    NS = NS || {};
    //Filename: helpers/odata_helper.js
    var isInBrowser = typeof module === 'undefined' && typeof window !== 'undefined';
    var utilHelper = isInBrowser ? NS.Helpers.utilHelper : require('./utilHelper');
    var urlHelper = isInBrowser ? NS.Helpers.urlHelper : require('./url_helper');

    var odataOptions = {
        filter: '$filter',
        top: '$top',
        skip: '$skip',
        orderby: '$orderby',
        format: '$format',
        inlinecount: '$inlinecount',
        exportColumnLabels: 'exportColumnLabels',
        requestType: 'GET'
    };
    var configure = function configure(options) {
        _.extend(odataOptions, options);
    };

    // type of the request for odata
    var paginator_core = function paginator_core() {
        return {
            // the type of the request (GET by default)
            type: odataOptions.requestType,

            // the type of reply (json by default)
            dataType: 'json'
        };
    };

    function createOdataOptions(criteria, pagesInfo, options) {
        //Compile the odata options.
        var odataOpts = compileOdataOptions(criteria, pagesInfo, options);
        return addOtherOptions(pagesInfo, odataOpts);
    }

    //Compile options which are not define by odata metadatas.
    function addOtherOptions(pagesInfo, odataOptions) {
        odataOptions = odataOptions || {};
        //If necessary, add the export id to the criteria.
        if (pagesInfo.exportId !== undefined) {
            odataOptions.data = odataOptions.data + '&exportId=' + pagesInfo.exportId;
        }
        return odataOptions;
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
        return result.length > 0 ? result.slice(0, -5) : ""; //Todo: corriger la cr�ation de crit�re. //result.substring(0, result.length - 1);
    }

    //generate orderBy parameters fo odata
    function orderToOdata(sortFields) {
        var orderBy = "";
        sortFields.forEach(function(sortField) {
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
        val[odataOptions.filter] = criteria; // criteriaToOdata(criteria);
        val[odataOptions.top] = pagesInfo.perPage;
        val[odataOptions.skip] = (pagesInfo.currentPage - 1) * pagesInfo.perPage;
        val[odataOptions.orderby] = orderToOdata(sortFields);
        val[odataOptions.format] = 'json';
        val[odataOptions.inlinecount] = 'allpages';
        var exportColumnLabels = [];
        if(pagesInfo.exportColumnLabels){
            for(var property in pagesInfo.exportColumnLabels){
                if(pagesInfo.exportColumnLabels.hasOwnProperty(property)){
                    exportColumnLabels.push({propertyName: property, propertyLabel: i18n.t(pagesInfo.exportColumnLabels[property])});
                }
            }
        }
        val[odataOptions.exportColumnLabels] = exportColumnLabels;
        return val;
    }

    //generate options fo an odata request 
    function compileOdataOptions(criteria, pagesInfo, options) {
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

        var queryOptions = _.clone(paginator_core());
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
        _.extend(response, utilHelper.flatten({
            odata: response.odata
        }));
        delete response.odata;
        if (response["odata.count"] === undefined || response["odata.count"] === null) {
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
/* global Backbone, Promise, _, window */
(function(NS) {
	"use strict";
	//Filename: promisify_helper.js
	NS = NS || {};
	var isInBrowser = typeof module === 'undefined' && typeof window !== 'undefined';
	var odataHelper = isInBrowser ? NS.Helpers.odataHelper : require("./odata_helper");
	var httpResponseParser = isInBrowser ? NS.Core.httpResponseParser : require('../core/http_response_parser');
	var ArgumentNullException = isInBrowser ? NS.Helpers.Exceptions.ArgumentNullException : require("./custom_exception").ArgumentNullException;
	var ArgumentInvalidException = isInBrowser ? NS.Helpers.Exceptions.ArgumentInvalidException : require("./custom_exception").ArgumentInvalidException;



	// Backbone model with **promise** CRUD method instead of its own methods.
	var PromiseModel = Backbone.Model.extend({
		/**
		 * Set the data for a promise model.
		 * @param  {object} json to set in the model.
		 * @param  {object} options on the save function such as the url.
		 * @return {undefined}
		 */
		setData: function setDataPromiseModel(json, options) {
			options = options || {};
			if (_.isString(options.url)) {
				this.urlRoot = options.url;
			}
			this.clear({
				silent: true
			});
			this.set(json, {
				silent: true
			});
		},
		/**
		 * Save the data for a promise model.
		 * @param  {object} json to save in the model.
		 * @param  {object} options on the save function such as the url.
		 * @return {objet} a promise of save.
		 */
		saveData: function setDataPromiseModel(json, options) {
			this.setData(json, options);
			return this.save();
		},
		/**
		 * Fetch the model.
		 * @param  {object} json to set to the model before loading.
		 * @param  {object} options on the save function such as the url.
		 * @return {objet} a promise of fetch.
		 */
		fetchData: function fetchDataPromiseModel(json, options) {
			this.setData(json, options);
			return this.fetch();
		},
		//Ovverride the save method on the model in order to Return a promise.
		save: function saveModel(options) {
			var model = this;
			var method = this.isNew() ? 'create' : 'update';
			return new Promise(
				function(resolve, reject) {
					var opts = _.extend({
						success: function(data, textStatus, jqXHR) {
							resolve(httpResponseParser.parse(jqXHR));
						},
						error: reject
					}, options);
					Backbone.sync(method, model, opts);
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
			//console.log('promiseFetchModel', model);
			return new Promise(function(resolve, reject) {
				/*Don't use underscore but could have because bacckbone has a dependency on it.*/
				options.success = function(data, textStatus, jqXHR) {
					resolve(httpResponseParser.parse(jqXHR));
				};
				options.error = reject;
				Backbone.sync('read', model, options);
			});
		}

	});

	// Backbone collection with **promise** CRUD method instead of its own methods.
	var PromiseCollection = Backbone.Collection.extend({
		/**
		 * Fetch the collection datas, clean the share collection and parse.
		 * @param  {object} this object should have the following structure: {criteria: {key: "val"}, pagesInfos: {}}.
		 * @param  {object} options can contain a url.
		 * @return {object} the promise of the fetch and the parse with the Odata.
		 */
		fetchData: function fetchDataPromiseCollection(params, options) {
			options = options || {};
			params = params || {};
			if (!_.isObject(params)) {
				throw new ArgumentNullException('fetchDataPromiseCollection: params should be an object, check your service');
			}
			if (!_.isObject(params.pagesInfos)) {
				throw new ArgumentInvalidException('fetchDataPromiseCollection: params should have a pagesInfos property, check your service', params);
			}
			//Clean the shared collection.
			this.reset(null, {
				silent: true
			});
			//If the url wants to be changed it can be done.
			if (options.url) {
				this.url = options.url;
			}

			//Automatically call the odataHelper to create the options.
			return this.fetch(odataHelper.createOdataOptions(params.criteria, params.pagesInfos))
				.then(odataHelper.parseOdataResponse);
		},
		//Override the default collection fetch method, using and returning a promise.
		//Options is the options object which is sent to the jquery method.
		fetch: function promiseFetchCollection(options) {
			options = options || {};
			var collection = this;
			return new Promise(function(resolve, reject) {
				/*Don't use underscore but could have because bacckbone has a dependency on it.*/
				options.success = function(data, textStatus, jqXHR) {
					resolve(httpResponseParser.parse(jqXHR));
				};
				options.error = reject;
				Backbone.sync('read', collection, options);
			});
		},
		save: function saveCollection() {
			var model = this;
			var method = 'create';
			return new Promise(
				function(resolve, reject) {
					Backbone.sync(method, model, {
						success: function(data, textStatus, jqXHR) {
							resolve(httpResponseParser.parse(jqXHR));
						},
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

	// Convert an existing Backbone collection to a promise version of its changes 
	// (when calling save, the { creates: [], deletes: [], updates: [] } object will be posted to collection.url)
	var ConvertCollectionChanges = function ConvertBackboneCollectionToPromiseCollectionChanges(collection, changes) {
		if (collection.url === undefined || collection.urlRoot === null) {
			throw new Error("ConvertCollection: The  url of the collection " + collection.modelName + " cannot be undefined.");
		}
		var promiseCollectionChanges = new PromiseModel(new Backbone.Model(changes));
		promiseCollectionChanges.urlRoot = collection.url;
		return promiseCollectionChanges;
	};

	/**
	 * Generate a modle from  a json object and a url.
	 * @param  {string} url  - The server api url.
	 * @param  {object} json - JSON object representing the model properties.
	 * @return {PromiseModel}      - A backbone model promisified with the good url.
	 */
	var generateModel = function generateModel(url, json) {
		if (json !== undefined && json !== null && !_.isObject(json)) {
			throw new ArgumentInvalidException(json);
		}
		if (!_.isString(url)) {
			throw new ArgumentInvalidException(url);
		}
		var Model = PromiseModel.extend({
			urlRoot: url
		});
		return new Model(json);
	};

	/**
	 * Generate a collection from an url , json and metadatas.
	 * @param  {[type]} url       [description]
	 * @param  {[type]} json      [description]
	 * @param  {[type]} metadatas [description]
	 * @return {[type]}           [description]
	 */
	var generateCollection = function generateCollection(url, json) {
		if (json !== undefined && !_.isArray(json)) {
			throw new ArgumentInvalidException(json);
		}
		if (!_.isString(url)) {
			throw new ArgumentInvalidException(url);
		}
		var Collection = PromiseCollection.extend({
			url: url
		});
		return new Collection(json);
	};

	//Todo: see if it is necessary to expose Model and collection promisified.
	var promisifyHelper = {
		Model: PromiseModel,
		Collection: PromiseCollection,
		Convert: {
			Model: ConvertModel,
			Collection: ConvertCollection,
			CollectionChanges: ConvertCollectionChanges
		},
		model: generateModel,
		collection: generateCollection
	};

	// Differenciating export for node or browser.
	if (isInBrowser) {
		NS.Helpers = NS.Helpers || {};
		NS.Helpers.promisifyHelper = promisifyHelper;
	} else {
		module.exports = promisifyHelper;
	}
})(typeof module === 'undefined' && typeof window !== 'undefined' ? window.Fmk : module.exports);
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
(function() {
  var S4, domains_definition, guid, metadaBuilder;

  metadaBuilder = Fmk.Helpers.metadataBuilder;

  domains_definition = Fmk.Helpers.metadataBuilder.getDomains();

  Handlebars.registerHelper('pick', function(val, options) {
    return options.hash[val];
  });

  Handlebars.registerHelper("t", function(i18n_key, options) {
    var maxLength, opt, params, prefix, result, suffix;
    opt = options.hash || {};
    suffix = opt.suffix || "";
    prefix = opt.prefix || "";
    maxLength = opt.max;
    if (opt.keyInContext === true) {
      i18n_key = this[i18n_key];
    }
    params = opt.params != null ? opt.params.split(',') : void 0;
    console.log(opt.params, _.pick.apply(this, params));
    params = params != null ? _.pick.apply(this, params) : void 0;
    result = i18n.t("" + prefix + i18n_key + suffix, params);
    if ((maxLength != null) && maxLength < result.length) {
      result = "" + (result.slice(0, +maxLength)) + "...";
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


  /*------------------------------------------- FORM FOR THE INPUTS ------------------------------------------- */

  Handlebars.registerHelper("display_for", function(property, options) {
    var col, container, containerAttribs, containerCss, dataType, domain, html, htmlId, inputSize, label, labelSize, labelSizeValue, linkClose, linkOpen, linkTo, metadata, modelName, noGrid, noHtml, opt, propertyValue, translationKey, translationRoot;
    options = options || {};
    opt = options.hash || {};
    modelName = this.modelName || opt.modelName || void 0;
    container = _.extend(this, {
      modelName: modelName
    });
    metadata = metadaBuilder.getMetadataForAttribute(container, property);
    domain = Fmk.Helpers.metadataBuilder.getDomains()[metadata.domain] || {};
    translationRoot = opt.translationRoot || void 0;
    dataType = opt.dataType || domain.type || "text";
    if (dataType === "boolean") {
      dataType = "checkbox";
    }
    containerAttribs = opt.containerAttribs || "";
    containerCss = opt.containerCss || "";
    labelSizeValue = opt.isNoLabel ? 0 : opt.labelSize ? opt.labelSize : 4;
    labelSize = "col-sm-" + labelSizeValue + " col-md-" + labelSizeValue + " col-lg-" + labelSizeValue;
    col = opt.col != null ? Handlebars.helpers.col.call(this, opt.col) : "";
    noHtml = opt.noHtml != null ? opt.noHtml : false;
    noGrid = opt.noGrid != null ? opt.noGrid : false;
    htmlId = opt.htmlId != null ? "id='" + opt.htmlId + "'" : "";
    linkTo = opt.linkTo != null ? opt.linkTo : "";
    linkOpen = (function(_this) {
      return function() {
        if (linkTo) {
          return "<a href='" + linkTo + "' data-bypass>";
        } else {
          return "";
        }
      };
    })(this);
    linkClose = (function(_this) {
      return function() {
        if (linkTo) {
          return "</a>";
        } else {
          return "";
        }
      };
    })(this);
    inputSize = (function(_this) {
      return function() {
        var inputSizeValue;
        if (noGrid || opt.containerCss) {
          return inputSize = "";
        } else {
          inputSizeValue = 12 - labelSizeValue;
          return inputSize = opt.inputSize || ("col-sm-" + inputSizeValue + " col-md-" + inputSizeValue + " col-lg-" + inputSizeValue);
        }
      };
    })(this);
    translationKey = (function(_this) {
      return function() {
        var translation;
        translation = opt.translationKey || metadata.label || (_this['modelName'] != null ? "" + _this['modelName'] + "." + property : void 0) || "";
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
    label = (function(_this) {
      return function() {
        if (opt.isNoLabel != null) {
          return "";
        } else if (noHtml) {
          return "" + (translationKey());
        } else {
          return "<label class='control-label " + labelSize + "' for='" + property + "'>" + (translationKey()) + "</label>";
        }
      };
    })(this);
    propertyValue = (function(_this) {
      return function() {
        var key, metadataClass, propValue, value;
        metadataClass = metadata.style != null ? metadata.style : "";
        if (_this[property] != null) {
          propValue = _this[property];
          if (opt.listKey != null) {
            key = _this[property];
            value = _.findWhere(_this[opt.listKey], {
              code: _this[property]
            });
            if (value == null) {
              value = _.findWhere(_this[opt.listKey], {
                id: _this[property]
              });
            }
            if (value != null) {
              propValue = opt.labelProperty ? value[opt.labelProperty] : value.label;
            } else {
              propValue = void 0;
            }
          }
          if (noHtml) {
            return "" + (_.escape(propValue));
          }
          if ((metadata.format != null) && (metadata.format.value != null)) {
            propValue = metadata.format.value(propValue, metadata.format.options);
          }
          if (metadata.symbol != null) {
            propValue = propValue + " " + i18n.t(metadata.symbol);
          }
          if (dataType === "checkbox") {
            propValue = _this[property] ? i18n.t("search.labels.true") : i18n.t("search.labels.false");
          }
          if (dataType === "date" && _this[property] !== "") {
            return "<div " + htmlId + " class='" + metadataClass + "'>" + propValue + "</div>";
          } else {
            return "<div " + htmlId + " class='" + metadataClass + "'>" + (linkOpen()) + (_.escape(propValue)) + (linkClose()) + "</div>";
          }
        }
        return "";
      };
    })(this);
    if (noHtml) {
      return new Handlebars.SafeString("" + (label()) + " " + (propertyValue()));
    }
    html = "<div class='form-group " + col + "'> " + (label()) + " <div class='" + (inputSize()) + " " + containerCss + "' " + containerAttribs + "> <div class='form-control-static'>" + (propertyValue()) + "</div> </div> </div> ";
    return new Handlebars.SafeString(html);
  });

  Handlebars.registerHelper("returns_if_contains", (function(_this) {
    return function(property, options) {
      var opt, value;
      opt = options.hash || {};
      value = opt.value;
      if (_.contains(property, value)) {
        return opt["return"];
      }
      return '';
    };
  })(this));

  Handlebars.registerHelper("input_for", function(property, options) {
    var cidAttr, col, container, containerAttribs, containerCss, dataFields, dataType, decorator, disabled, domain, error, errorSize, errorValue, errors, html, icon, inputAttributes, inputSize, isAddOnInput, isDisplayRequired, isRequired, label, labelSize, labelSizeValue, metadata, minimalHtml, modelName, noGrid, opt, placeholder, propertyValue, readonly, symbol, translationKey, translationRoot;
    options = options || {};
    html = void 0;
    translationRoot = void 0;
    dataType = void 0;
    opt = options.hash || {};
    modelName = this.modelName || opt.modelName || void 0;
    container = _.extend(this, {
      modelName: modelName
    });
    metadata = Fmk.Helpers.metadataBuilder.getMetadataForAttribute(container, property);
    domain = Fmk.Helpers.metadataBuilder.getDomains()[metadata.domain] || {};
    minimalHtml = opt.minimalHtml != null ? opt.minimalHtml : false;
    noGrid = opt.noGrid ? opt.noGrid : false;
    dataFields = function(context) {
      var fieldNames, subHTML;
      subHTML = "";
      if (opt.dataFields) {
        fieldNames = opt.dataFields.split(',');
        fieldNames.forEach(function(fieldName) {
          if (context[fieldName]) {
            return subHTML = subHTML + ("data-" + fieldName + "='" + context[fieldName] + "'");
          }
        });
      }
      return subHTML;
    };
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
    symbol = (function(_this) {
      return function() {
        var isSymbol;
        isSymbol = false;
        if (opt.symbol != null) {
          isSymbol = opt.symbol;
        } else if (metadata.symbol != null) {
          isSymbol = metadata.symbol;
        }
        if (isSymbol) {
          return "<span class='input-group-addon'>" + isSymbol + "</span>";
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
    inputAttributes = this[opt.inputAttributes] || opt.inputAttributes || "";
    cidAttr = (opt.cidSelection = true) ? "cid='" + this.cid + "'" : "";
    containerAttribs = opt.containerAttribs || "";
    containerCss = opt.containerCss || "";
    labelSizeValue = opt.isNoLabel ? 0 : opt.labelSize ? opt.labelSize : 4;
    labelSize = "col-sm-" + labelSizeValue + " col-md-" + labelSizeValue + " col-lg-" + labelSizeValue;
    col = opt.col != null ? Handlebars.helpers.col.call(this, opt.col) : "";
    inputSize = (function(_this) {
      return function() {
        var inputSizeValue;
        if (noGrid || opt.containerCss) {
          return inputSize = "";
        } else {
          inputSizeValue = 12 - labelSizeValue;
          return inputSize = opt.inputSize || ("col-sm-" + inputSizeValue + " col-md-" + inputSizeValue + " col-lg-" + inputSizeValue);
        }
      };
    })(this);
    isAddOnInput = true || (opt.icon != null) || (opt.isRequired || metadata.required) === true || ((opt.symbol || metadata.symbol) != null);
    propertyValue = (function(_this) {
      return function() {
        var propValue;
        if (_this[property] != null) {
          propValue = _this[property];
          if ((metadata.format != null) && (metadata.format.value != null)) {
            propValue = metadata.format.value(propValue, metadata.format.options);
          }
          if (dataType === "checkbox") {
            if (propValue) {
              return 'checked';
            }
          }
          if (dataType === "date" && propValue !== "") {
            return "value='" + propValue + "'";
          }
          if (dataType === "number") {
            return "value='" + numeral(propValue).value() + "'";
          } else {
            return "value='" + (_.escape(propValue)) + "'";
          }
        }
        return "";
      };
    })(this);
    translationKey = (function(_this) {
      return function() {
        var translation;
        translation = opt.translationKey || metadata.label || (_this['modelName'] != null ? "" + _this['modelName'] + "." + property : void 0) || "";
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
    placeholder = ((opt.placeholder == null) && opt.isNoLabel) || opt.placeholder ? "placeholder='" + (translationKey()) + "'" : "";
    decorator = (function(_this) {
      return function() {
        if (metadata.decorator != null) {
          return "data-decorator='" + metadata.decorator + "'";
        } else {
          return '';
        }
      };
    })(this);
    error = "";
    if ((this.errors != null) && (this.errors[property] != null)) {
      error = "has-error";
    }
    errorValue = (this.errors != null) && (this.errors[property] != null) ? i18n.t(this.errors[property]) : "";
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
    if (minimalHtml) {
      html = " <input id='" + property + "' " + (dataFields(this)) + " " + (decorator()) + " class=''";
      html += "data-name='" + property + "' type='" + dataType + "' " + inputAttributes + " " + cidAttr + " " + placeholder + " " + (propertyValue()) + " " + readonly + " " + disabled + "/>";
    } else {
      html = "<div class='form-group " + error + " " + col + "'> " + (label()) + " <div class='" + (inputSize()) + " " + containerCss + "' " + containerAttribs + "> <div class='" + (isAddOnInput ? 'input-group' : "") + "'> " + (icon()) + " <input id='" + property + "' " + (decorator()) + " " + (dataFields(this)) + " class='";
      if (dataType !== "checkbox") {
        html += "form-control ";
      }
      html += "input-sm' data-name='" + property + "' type='" + dataType + "' " + inputAttributes + " " + placeholder + " " + (propertyValue()) + " " + readonly + " " + disabled + "/> " + (symbol());
      if (dataType !== "checkbox") {
        html += "              " + (isRequired());
      } else {
        html += "              ";
      }
      html += "               </div> </div> " + (errors()) + " </div>";
    }
    return new Handlebars.SafeString(html);
  });

  Handlebars.registerHelper("radio_for", function(property, options) {
    var checked, col, containerAttribs, containerCss, dataType, defaultValue, disabled, domain, error, errorSize, errorValue, errors, generateRadioButton, html, inputAttributes, inputSize, isDisplayRequired, isRequired, label, labelSize, labelSizeValue, metadata, opt, placeholder, possibleValues, radioSize, radioSizeValue, radios, readonly, translationKey, translationRoot, value, _i, _len;
    options = options || {};
    html = void 0;
    translationRoot = void 0;
    dataType = void 0;
    opt = options.hash || {};
    metadata = Fmk.Helpers.metadataBuilder.getMetadataForAttribute(this, property);
    domain = Fmk.Helpers.metadataBuilder.getDomains()[metadata.domain] || {};
    possibleValues = [];
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
          return "";
        } else {
          return generateRadioButton(i18n.t('search.labels.all'), "null", defaultValue === "");
        }
      };
    })(this);
    translationRoot = opt.translationRoot || void 0;
    dataType = opt.dataType || domain.type || "text";
    switch (dataType) {
      case "boolean":
        possibleValues = [true, false];
        break;
      default:
        return "Type " + dataType + " not supported by helper radio_for";
    }
    defaultValue = opt.defaultValue !== void 0 ? opt.defaultValue : "";
    readonly = opt.readonly || false;
    readonly = readonly ? "readonly" : "";
    disabled = opt.disabled || false;
    disabled = disabled ? "disabled" : "";
    inputAttributes = opt.inputAttributes || "";
    containerAttribs = opt.containerAttribs || "";
    containerCss = opt.containerCss || "";
    labelSizeValue = opt.isNoLabel ? 0 : opt.labelSize ? opt.labelSize : 3;
    labelSize = "col-sm-" + labelSizeValue + " col-md-" + labelSizeValue + " col-lg-" + labelSizeValue;
    col = opt.col != null ? Handlebars.helpers.col.call(this, opt.col) : "";
    radioSizeValue = opt.radioSize || 4;
    radioSize = "col-sm-" + radioSizeValue + " col-md-" + radioSizeValue + " col-lg-" + radioSizeValue;
    inputSize = (function(_this) {
      return function() {
        var inputSizeValue;
        inputSizeValue = 12 - labelSizeValue;
        return inputSize = opt.inputSize || ("col-sm-" + inputSizeValue + " col-md-" + inputSizeValue + " col-lg-" + inputSizeValue);
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
    translationKey = (function(_this) {
      return function() {
        var translation;
        translation = opt.translationKey || metadata.label || (_this['modelName'] != null ? "" + _this['modelName'] + "." + property : void 0) || "";
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
    placeholder = ((opt.placeholder == null) && opt.isNoLabel) || opt.placeholder ? "placeholder='" + (translationKey()) + "'" : "";
    checked = (function(_this) {
      return function(value, isDefault) {
        var isChecked;
        isChecked = _this[property] === value || ((_this[property] == null) && isDefault) || false;
        if (isChecked) {
          return "checked='checked'";
        } else {
          return "";
        }
      };
    })(this);
    generateRadioButton = (function(_this) {
      return function(label, value, isDefault) {
        return "<div class='" + radioSize + "'> <div class='input-group'> <span class='input-group-addon'> <input id='" + (property + value) + "' name='" + property + "' data-name='" + property + "' type=radio value='" + value + "' " + (checked(value, isDefault)) + " " + inputAttributes + " " + placeholder + " " + readonly + " " + disabled + "/> </span> <label for='" + (property + value) + "' class='form-control'> " + label + " </label> </div> </div>";
      };
    })(this);
    error = "";
    if ((this.errors != null) && (this.errors[property] != null)) {
      error = "has-error";
    }
    errorValue = (this.errors != null) && (this.errors[property] != null) ? i18n.t(this.errors[property]) : "";
    errorSize = (function(_this) {
      return function() {
        var errorLength, offsetError;
        errorLength = 12 - labelSizeValue;
        offsetError = labelSizeValue;
        return "col-sm-" + errorLength + " col-md-" + errorLength + " col-lg-" + errorLength + " col-sm-offset-" + offsetError + " col-md-offset-" + offsetError + " col-lg-offset-" + offsetError;
      };
    })(this);
    radios = isRequired();
    for (_i = 0, _len = possibleValues.length; _i < _len; _i++) {
      value = possibleValues[_i];
      radios += generateRadioButton(i18n.t('search.labels.' + value), value, value === defaultValue);
    }
    errors = (function(_this) {
      return function() {
        if (error === "has-error") {
          return "<span class='" + error + " " + (errorSize()) + " help-inline pull-left' style='color:#b94a48'> " + errorValue + " </span>";
        } else {
          return "";
        }
      };
    })(this);
    html = "<div class='form-group " + error + " " + col + "'> " + (label()) + " <div class='" + (inputSize()) + " " + containerCss + "' " + containerAttribs + "> " + radios + " </div> " + (errors()) + " </div>";
    return new Handlebars.SafeString(html);
  });

  Handlebars.registerHelper("options_selected", function(property, options) {
    var addOption, col, cssClass, dataMapping, domain, elt, emptyOption, error, errorValue, errors, html, icon, inputSize, isAddOnInput, isAtLine, isRequired, jsonGiven, label, labelSize, labelSizeValue, list, metadata, multiple, opt, optMapping, optName, optToTriggerListKey, optToTriggerName, readonly, selected, translationKey, translationRoot, _i, _len;
    options = options || {};
    opt = options.hash || {};
    cssClass = opt.cssClass != null ? opt.cssClass : "";
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
    metadata = Fmk.Helpers.metadataBuilder.getMetadataForAttribute(this, property);
    domain = Fmk.Helpers.metadataBuilder.getDomains()[metadata.domain] || {};
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
    col = opt.col != null ? Handlebars.helpers.col.call(this, opt.col) : "";
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
    translationKey = (function(_this) {
      return function() {
        var translation;
        translation = opt.translationKey || metadata.label || (_this['modelName'] != null ? "" + _this['modelName'] + "." + property : void 0) || "";
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
    isAddOnInput = true || (opt.icon != null) || (opt.isRequired || metadata.required) === true;
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
    errorValue = (this.errors != null) && (this.errors[property] != null) ? i18n.t(this.errors[property]) : "";
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
      id = elt.id || elt.code;
      prop = opt.labelProperty ? elt[opt.labelProperty] : elt.label;
      isSelected = (selected != null) && (id != null) && ((!_.isArray(selected) && id.toString() === selected.toString()) || (_.isArray(selected) && selected.indexOf(id.toString()) > -1)) ? "selected" : "";
      html += "<option value= '" + id + "'  " + isSelected + ">" + prop + "</option>";
      return void 0;
    };
    multiple = opt.isMultiple ? "multiple style='width:'resolve';'" : "";
    emptyOption = function() {
      var isRequiredWithValue;
      isRequiredWithValue = (selected != null) && (isRequired() !== "");
      if ((opt.isEmpty === true) || ((opt.isMultiple === true) || (isRequiredWithValue === true)) && (!opt.isNotEmpty)) {
        return "";
      }
      return "<option></option>";
    };
    html = "<div class='form-group " + error + " " + col + "'> " + (label()) + " <div class='controls " + (inputSize()) + "'> <div class='input-group '> " + (icon()) + " <select id='" + property + "' data-name='" + property + "' " + multiple + " " + readonly + " " + optName + " " + optToTriggerName + " " + optToTriggerListKey + " " + dataMapping + " class='form-control input-sm " + cssClass + "'>" + (emptyOption());
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
    var action, button, cssClass, cssId, dataAttributes, icon, isLoading, loading, opt, type;
    opt = options.hash || {};
    if (opt.role !== void 0 && !Fmk.Helpers.userHelper.hasRole(opt.role)) {
      return "";
    }
    isLoading = opt.isLoading;
    cssClass = opt["class"] || "";
    cssId = opt.id || guid();
    dataAttributes = opt.dataAttributes || "";
    type = opt.type || "button";
    action = opt.action != null ? "data-action=" + action : "";
    loading = function() {
      if (isLoading || type === 'submit') {
        return "data-loading data-loading-text='" + (opt.loadingText || i18n.t('button.loading')) + "'";
      }
      return "";
    };
    icon = function() {
      if (opt.icon != null) {
        return "<i class='fa fa-fw fa-" + opt.icon + "'></i>";
      } else {
        return "";
      }
    };
    button = "<button type='" + type + "' " + action + "  " + dataAttributes + " class='btn " + cssClass + "' id='" + cssId + "' " + (loading()) + ">" + (icon()) + " " + (text_key !== '' ? i18n.t(text_key) : '') + "</button>";
    return new Handlebars.SafeString(button);
  });

  Handlebars.registerHelper("paginate", function(property, options) {
    var currentPage, endPage, firstPage, firstPagePrint, generateLeftArrow, generatePageFilter, generatePageNumber, generatePagination, generateRigthArrow, generateTotal, html, lastPagePrint, nbPagePrint, nbPrint, perPage, totalRecords;
    options = options || {};
    options = options.hash || {};
    if (this.collection == null) {
      return "";
    }
    if ((this.collection != null) && this.collection.length === 0) {
      return "";
    }
    currentPage = this.currentPage;
    firstPage = this.firstPage || 1;
    endPage = this.totalPages || 0;
    nbPrint = 4;
    firstPagePrint = Math.max(firstPage, currentPage - nbPrint);
    lastPagePrint = Math.min(endPage, currentPage + nbPrint);
    nbPagePrint = lastPagePrint - firstPagePrint;
    if (nbPagePrint < nbPrint * 2) {
      if (endPage - lastPagePrint > nbPrint) {
        lastPagePrint += nbPrint * 2 - nbPagePrint;
      } else {
        firstPagePrint -= nbPrint * 2 - nbPagePrint;
      }
    }
    firstPagePrint = Math.max(firstPagePrint, 1);
    perPage = this.perPage || 10;
    totalRecords = this.totalRecords;
    generateLeftArrow = function() {
      var className;
      className = currentPage === firstPage ? "disabled" : "";
      return "<li class='" + className + "'><a href='#' data-bypass data-page='" + firstPage + "'>&laquo;</a></li>";
    };
    generatePageNumber = function() {
      var html, i, _i;
      html = "";
      for (i = _i = firstPagePrint; firstPagePrint <= lastPagePrint ? _i <= lastPagePrint : _i >= lastPagePrint; i = firstPagePrint <= lastPagePrint ? ++_i : --_i) {
        html += "<li class='" + (i === currentPage ? 'active' : '') + "'><a href='#' data-bypass data-page='" + i + "'>" + i + "</a></li>";
      }
      return html;
    };
    generateRigthArrow = function() {
      var className;
      className = currentPage === endPage ? "disabled" : "";
      return "<li class='" + className + "'><a href='#' data-bypass  data-page='" + endPage + "'>&raquo;</a></li>";
    };
    generatePagination = function() {
      if (totalRecords <= perPage) {
        return "";
      }
      return "" + (generateLeftArrow()) + (generatePageNumber()) + (generateRigthArrow());
    };
    generatePageFilter = function() {
      var generateOptions, pageString;
      pageString = i18n.t("application.pages");
      generateOptions = function() {
        var html, i, _i;
        html = "";
        for (i = _i = 1; _i <= 4; i = ++_i) {
          html += "<option value='" + (5 * i) + "' " + (5 * i === perPage ? 'selected' : void 0) + ">" + (5 * i) + " " + pageString + "</option>";
        }
        return html;
      };
      return "<select class='form-control pageFilter'> " + (generateOptions()) + " </select>";
    };
    generateTotal = function() {
      var resultString;
      resultString = i18n.t('search.result');
      if (options.showResultNumber) {
        return "<div class='badgeResult'>" + resultString + " <span class='badge'>" + totalRecords + "</span></div>";
      } else {
        return "";
      }
    };
    html = "<div class='col-md-8'> <ul class='pagination'>" + (generatePagination()) + "</ul> </div> <div class='col-md-2 pagination'> " + (generateTotal()) + " </div> <div class='col-md-2 pagination'> " + (generatePageFilter()) + " </div>";
    return new Handlebars.SafeString(html);
  });

  Handlebars.registerHelper("tableHeaderAction", function(options) {
    var exportButton, generateTotal, html, resultString, totalRecords;
    options = options || {};
    options = options.hash || {};
    totalRecords = this.totalRecords || 0;
    resultString = i18n.t(options.resultLabel || 'search.result');
    exportButton = function() {
      if ((options.exportUrl != null) && totalRecords > 0) {
        return "<div class='pull-right export'> <button   data-bypass class='btn btnExport'><i class='fa fa-table'></i>" + (i18n.t('search.export')) + "</button> <a href='" + options.exportUrl + "' data-bypass class='btn hidden btnExport'><i class='fa fa-table'></i> " + (i18n.t('search.export')) + "</a> </div>";
      }
      return "";
    };
    generateTotal = function() {
      return "<span class='badge'>" + totalRecords + "</span> " + resultString;
    };
    html = "<div class='tableAction'> <div class='pull-left'> " + (generateTotal()) + " </div> " + (exportButton()) + " </div>";
    return new Handlebars.SafeString(html);
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
    if (this.isEdit) {
      return new Handlebars.SafeString("<span class='sortColumn'>" + (i18n.t(translationKey)) + "</span>");
    }
    return new Handlebars.SafeString("<a class='sortColumn'  href='#' data-name='" + property + "' data-bypass>" + (i18n.t(translationKey)) + " " + (this.isEdit ? '' : generateSortPosition()) + "</a>");
  });

  Handlebars.registerHelper("statusIcon", function(property, options) {
    var icon;
    if (typeof (this[property] === "boolean")) {
      if (this[property]) {
        icon = "fa fa-check";
      } else {
        icon = "fa fa-exclamation";
      }
    } else {
      switch (this[property]) {
        case 0:
          icon = "fa fa-ban";
          break;
        case 1:
          icon = "fa fa-exclamation";
          break;
        case 2:
          icon = "fa fa-clock-o";
          break;
        case 3:
          icon = "fa fa-check";
          break;
        default:
          icon = "";
      }
    }
    return new Handlebars.SafeString("<i class='" + icon + "'><i>");
  });

  Handlebars.registerHelper("progress", function(property, options) {
    var addElements;
    addElements = function(elements) {
      var html, sum;
      html = "";
      sum = 0;
      elements.forEach(function(elt) {
        if (!_.isEmpty(elt)) {
          return sum += elt.value;
        }
      });
      elements.forEach(function(elt) {
        if (!_.isEmpty(elt)) {
          return html += "<div class='progress-bar progress-bar-" + elt.type + "' style='width: " + (Math.floor(elt.value * 100 / sum)) + "%'> " + elt.label + " </div>";
        }
      });
      return html;
    };
    return new Handlebars.SafeString("<div class='progress'>" + (addElements(this[property])) + "</div>");
  });


  /* Example:
    {{#hasOneRole "ROLE1,ROLE2"}}
      <div>HTML code</div>
    {{/hasOneRole}}
   */

  Handlebars.registerHelper("hasOneRole", function(property, options) {
    var roles;
    if (_.isString(property)) {
      roles = property.split(',');
      if (Fmk.Helpers.userHelper.hasOneRole(roles)) {
        return options.fn(this);
      }
    }
  });


  /* Example:
    {{#hasRole "ROLE_NON_EXISTANT"}}
      <div>HTML code</div>
    {{/hasRole}}
   */

  Handlebars.registerHelper("hasRole", function(property, options) {
    if (_.isString(property) && Fmk.Helpers.userHelper.hasRole(property)) {
      return options.fn(this);
    }
  });


  /* Example
    {{col "6"}}
   */

  Handlebars.registerHelper("col", function(property) {
    return "col-xs-" + property + " col-sm-" + property + " col-md-" + property + " col-lg-" + property;
  });


  /* Example
      {{each collectionProperty}}
      {{each collectionProperty parentKeys="prop1,prop2"}}
  
      {{each object}}
          {{this.key}} : {{this.value}}
      {{/each}}
   */

  Handlebars.registerHelper("each", function(context, options) {
    var ctx, elem, opt, parentProperties, ret, _i, _len, _ref;
    options = options || {};
    opt = options.hash || {};
    ret = "";
    parentProperties = void 0;
    if (opt.parentKeys != null) {
      parentProperties = _.pick(this, opt.parentKeys.split(','));
    }
    context = context || [];
    if (_.isArray(context)) {
      _ref = context || [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        elem = _ref[_i];
        ctx = _.extend(elem, parentProperties);
        ret = ret + options.fn(ctx);
      }
    } else if (_.isObject(context)) {
      for (elem in context || {}) {
        ctx = {
          key: elem,
          value: _.extend(context[elem], parentProperties)
        };
        ret = ret + options.fn(ctx);
      }
    }
    return ret;
  });

  Handlebars.registerHelper("introspect", function(property, options) {
    var container, helperName, html, isDisplay, metadatas, modelName, opt, prop;
    options = options || {};
    opt = options.hash || {};
    isDisplay = opt.isDisplay != null ? opt.isDisplay : true;
    helperName = isDisplay ? "display_for" : "input_for";
    modelName = this.modelName || property || opt.modelName || void 0;
    container = _.extend(this, {
      modelName: modelName
    });
    metadatas = Fmk.Helpers.metadataBuilder.getMetadatas(container) || {};
    html = "";
    for (prop in metadatas) {
      html = html + Handlebars.helpers[helperName].call(container, prop, {
        hash: {
          col: 12
        }
      });
    }
    return new Handlebars.SafeString(html);
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


  /*
    Helper pour uniformiser l'utilisation des formulaires.
    Exemple: {{#form}} {{input_for "firstName"}} {{/form}}
   */

  Handlebars.registerHelper('form', function(options) {
    return "<form novalidate class='form-horizontal' role='form'>" + (options.fn(this)) + "</form>";
  });


  /*
    Helper pour uniformiser l'utilisation des formulaires.
    Exemple: {{#form}} {{input_for "firstName"}} {{/form}}
   */

  Handlebars.registerHelper('display', function(options) {
    return "<form novalidate class='form-horizontal' role='form'>" + (options.fn(this)) + "</form>";
  });


  /*
    Helper pour uniformiser l'utilisation des formulaires.
    Exemple: {{#button_toolbar}} {{{button_cancel}} {{button_save}} {{/button_toolbar}}
   */

  Handlebars.registerHelper('btn_toolbar', function(options) {
    return "<div class='btn-toolbar'><div class='btn-group'>" + (options.fn(this)) + "</div></div>";
  });


  /*
    Helper pour uniformiser l'utilisation des panel.
    Exemple: {{#panel}} {{{#form}} {{/form}} {{/panel}}
    Exemple: {{#panel "titlekey"}} {{{#form}} {{/form}} {{/panel}}
   */

  Handlebars.registerHelper('panel', function(title, options) {
    var cancelButton, editButton, html, opt, saveButton;
    opt = (options || {}).hash || {};
    if (_.isObject(title)) {
      options = title;
      title = void 0;
    }
    editButton = function() {
      if (opt.edit) {
        return Handlebars.helpers.button_edit.call(this, {
          hash: {
            icon: "pencil"
          }
        });
      } else {
        return "";
      }
    };
    saveButton = function() {
      if (opt.save) {
        return Handlebars.helpers.button_save.call(this, void 0, {
          hash: {
            icon: "save"
          }
        });
      } else {
        return "";
      }
    };
    cancelButton = function() {
      if (opt.save) {
        return Handlebars.helpers.button_cancel.call(this, {
          hash: {
            icon: "undo"
          }
        });
      } else {
        return "";
      }
    };
    title = title == null ? "" : i18n.t(title);
    html = "<div class='panel panel-default'> <div class='panel-heading'>" + title + " " + (editButton()) + " " + (saveButton()) + " " + (cancelButton()) + "</div> <div class='panel-body'>" + (options.fn(this)) + "</div> </div>";
    return html;
  });


  /*
    Helper pour uniformiser l'utilisation des formulaires.
    Exemple: {{#page "page.title" panelTitle="page.panel.title"}} {{input_for "firstName"}} {{/page}}
   */

  Handlebars.registerHelper('page', function(title, options) {
    var html, opt;
    options = options || {};
    opt = options.hash || {};
    if (!_.isString(title)) {
      console.error("noTitleInYourTemplate");
    }
    html = "<h1>" + (i18n.t(title)) + "</h1> <div class='page-content'> " + (options.fn(this)) + " </div>";
    return html;
  });


  /*
    Helper pour uniformiser l'utilisation des formulaires.
    Exemple: {{#criteria}}{{#form}} {{input_for "firstName"}} {{/form}}{{/criteria}}
   */

  Handlebars.registerHelper('criteria', function(title, options) {
    var html;
    options = options || {};
    if (_.isObject(title)) {
      options = title;
      title = void 0;
    }
    title = title == null ? "" : i18n.t(title);
    html = "<div class='criteria'> <h2>" + title + "</h2> " + (options.fn(this)) + " </div>";
    return html;
  });

  Handlebars.registerHelper("result", function(options) {
    var cssClass, elementTagName, html, isTable, listTagName, opt, paginate, resultLabel, striped, tableHeaderActions;
    options = options || {};
    opt = options.hash || {};
    isTable = opt.isTable != null ? opt.isTable : true;
    resultLabel = opt.resultLabel ? i18n.t(opt.resultLabel) : void 0;
    listTagName = isTable ? "table" : "ul";
    elementTagName = isTable ? "tr" : "li";
    striped = opt.striped != null ? opt.stripped : true;
    cssClass = isTable ? "table table-condensed" : "list-group";
    if (opt.cssClass != null) {
      cssClass = "" + cssClass + " opt.cssClass";
    }
    if (striped) {
      cssClass = cssClass + "  table-striped";
    }
    tableHeaderActions = (function(_this) {
      return function() {
        var showHeaderActions;
        showHeaderActions = opt.showHeaderActions != null ? opt.showHeaderActions : true;
        if (showHeaderActions) {
          return "" + (Handlebars.helpers.tableHeaderAction.call(_this, {
            hash: {
              resultLabel: '',
              exportUrl: _this.exportUrl,
              resultLabel: resultLabel
            }
          })) + " <hr />";
        } else {
          return "";
        }
      };
    })(this);
    paginate = (function(_this) {
      return function() {
        var isPaginate;
        isPaginate = opt.isPaginate != null ? opt.isPaginate : true;
        if (isPaginate) {
          return Handlebars.helpers.paginate.call(_this, {
            hash: {
              showResultNumber: false
            }
          });
        } else {
          return "";
        }
      };
    })(this);
    html = " " + (tableHeaderActions()) + " <" + listTagName + " class='" + cssClass + "'> " + (options.fn(this)) + " </" + listTagName + "> " + (paginate()) + " <div id='lineSelectionContainer'></div>";
    return new Handlebars.SafeString(html);
  });

  Handlebars.registerHelper("result_container", function(i18n_key, options) {
    var html, opt, width;
    options = options || {};
    opt = options.hash || {};
    width = opt.width || 12;
    html = "<div id='results' class='" + (Handlebars.helpers.col.call(this, width)) + "}'></div>";
    return new Handlebars.SafeString(html);
  });

}).call(this);

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
    var Model = isInBrowser ? NS.Models.Model : require("../models/model");
    var PaginatedCollection = isInBrowser ? NS.Models.PaginatedCollection : require("../models/paginatedCollection");
    var UtilHelper = isInBrowser ? NS.Helpers.utilHelper : require('../helpers/util_helper');
    var sessionHelper = isInBrowser ? NS.Helpers.sessionHelper : require('../helpers/session_helper');
    var templateSpinner = isInBrowser ? NS.templates.spinner : function() {
        return "Template spinner to define...";
    };
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
            isElementRedefinition: false, //This options is use in order to not have a tag container generated by Backbone arround the view.
            isReadyReferences: true
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
            this.opts = _.extend({}, this.defaultOptions, this.customOptions, options);

            this.on('toogleIsHidden', this.toogleIsHidden);
            this.initializeModel();

            /*Register after renger.*/
            _.bindAll(this, 'render', 'afterRender');
            var _this = this;
            this.render = _.wrap(this.render, function(render, options) {
                //If the view is ready perform the standard render.
                if (_this.isReady()) {
                    render(options);
                    _this.afterRender();
                } else {
                    //Else render the spinner.
                    this.renderSpinner();
                }
                return _this;
            });

            //Listen to the reference list loading.
            this.listenTo(this.model, "references:loaded", this.render, this);

            //Load all the references lists which are defined in referenceNames.
            var currentView = this;
            if (_.isArray(this.referenceNames) && this.referenceNames.length > 0) {
                this.opts.isReadyReferences = false;
                Promise.all(RefHelper.loadMany(this.referenceNames)).then(function(results) {
                    currentView.opts.isReadyReferences = true;
                    //console.log('resultsreferenceNames', results);
                    var res = {}; //Container for all the results.
                    for (var i = 0, l = results.length; i < l; i++) {
                        res[currentView.referenceNames[i]] = results[i];
                        //The results are save into an object with a name for each reference list.
                    }
                    //Add the reference lists as model properties.
                    _.extend(currentView.model, res);
                    currentView.model.trigger('references:loaded');
                    //Inform the view that we are ready to render well.
                }).then(null, function(error) {
                    currentView.opts.isReadyReferences = true;
                    currentView.render();
                    ErrorHelper.manageResponseErrors(error, {
                        isDisplay: true
                    });
                });
            }

        },

        //Initialize the model of the view.
        //In order to be able to be initialize, a view must have a _model_ or a _modelName_.
        initializeModel: function initializeModelCoreView() {
            if (this.model) {
                return;
            } else if (this.opts.modelName) {
                //Création d'une collection et d'un model
                var ModelCreated = Model.extend({
                    modelName: this.opts.modelName
                });
                //Case of a collection.
                if (this.opts.modelType !== undefined && this.opts.modelType === "collection") {
                    var CollectionCreated = PaginatedCollection.extend({
                        modelName: this.opts.modelName,
                        model: ModelCreated
                    });
                    this.model = new CollectionCreated();
                } else {
                    //Case of a model.
                    this.model = new ModelCreated();

                }
            } else {
                throw new ArgumentNullException("The view must have a model or a model name.", this);
            }
        },
        //The handlebars template has to be defined here.
        template: function emptyTemplate(json) {
            console.log("templateData", json);
            return "<p>Your template has to be implemented.</p>";
        }, // Example: require('./templates/coreView'),
        templateSpinner: templateSpinner,
        //Defaults events.
        events: {
            "focus input": "inputFocus", //Deal with the focus in the field.
            "blur input": "inputBlur", //Deal with the focus out of the field.
            "click .panel-collapse.in": "hideCollapse",
            "click .panel-collapse:not('.in')": "showCollapse",
            "click button[data-loading]": "loadingButton"
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
            //If the view is not ready.
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
        },
        //Get the criteria from the session storage if exists.
        getSessionCriteria: function getCriteria() {
            return sessionHelper.getItem(this.getCriteriaId());
        },
        //Save the criteria in the session storage.
        saveSessionCriteria: function saveSessionCriteria(criteria) {
            return sessionHelper.saveItem(this.getCriteriaId(), criteria);
        },
        // Get the id of the criteria.
        getCriteriaId: function getCriteriaId() {
            var hash = window.location.hash;
            if (this.model.modelName !== undefined) {
                hash += this.model.modelName;
            }
            if (this.opts.criteriaId !== undefined) {
                hash += this.opts.criteriaId;
            }
            return hash;
        },
        //Call the history back.
        back: function back() {
            Backbone.history.history.back();
        },
        //Function which tells if the view is ready to be display.
        isReady: function isReady() {
            return this.opts.isReadyReferences === true;
        },
        //renderSpinner
        renderSpinner: function renderSpinner() {
            this.$el.html(this.templateSpinner(this.getRenderData()));
            return this;
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
/*global window, Backbone, $, i18n, _*/
(function(NS) {
    "use strict";
    //Filename: views/consult-edit-view.js
    NS = NS || {};

    //Dependencies.
    var isInBrowser = typeof module === 'undefined' && typeof window !== 'undefined';
    var ErrorHelper = isInBrowser ? NS.Helpers.errorHelper : require('../helpers/error_helper');
    var CoreView = isInBrowser ? NS.Views.CoreView : require('./core-view');
    var form_helper = isInBrowser ? NS.Helpers.formHelper : require('../helpers/form_helper');
    var urlHelper = isInBrowser ? NS.Helpers.urlHelper : require('../helpers/url_helper');
    var utilHelper = isInBrowser ? NS.Helpers.utilHelper : require('../helpers/utilHelper');
    var ModelValidator = isInBrowser ? NS.Helpers.modelValidationPromise : require('../helpers/modelValidationPromise');
    var errorHelper = isInBrowser ? NS.Helpers.errorHelper : require('../helpers/error_helper');
    var backboneNotification = isInBrowser ? NS.Helpers.backboneNotification : require("../helpers/backbone_notification");
    var NotImplementedException = isInBrowser ? NS.Helpers.Exceptions.NotImplementedException : require("../helpers/custom_exception").NotImplementedException;
    var ArgumentNullException = isInBrowser ? NS.Helpers.Exceptions.ArgumentNullException : require("../helpers/custom_exception").ArgumentNullException;

    //Backbone view which can be use in order to create consultation view and edition view.
    var ConsultEditView = CoreView.extend({

        //The default tag for this view is a div.
        tagName: 'div',

        //The default class for this view.
        className: 'consultEditView',

        // Service to initialize the model
        getNewModelSvc: undefined,

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

        //Additional data to pass to the template.
        additionalData: function() {
            return undefined;
        },
        /**
         * Default options of the view. These options can be overriden by using customOptions property of the view.
         * In order to access this options, the view has a property called `this.opts`.
         * @type {[type]}
         */
        defaultOptions: _.extend({}, CoreView.prototype.defaultOptions, {
            /**
             * Does the view has to load the model from the service define in `getModelSvc`.
             * @type {Boolean}
             */
            isModelToLoad: true, //By default the model is loaded.
            /**
             * If true, there is  an edit mode in the view.
             * @type {Boolean}
             */
            isEditMode: true,
            /**
             * If there is an edit mode and this property is true, the view can start in edit mode. The templateEdit will be rendered.
             * @type {Boolean}
             */
            isEdit: true,
            /**
             * If true, the view will navigate to the `generateNavigationUrl` url.
             * @type {Boolean}
             */
            isNavigationOnSave: true,
            /**
             * If true, the view will navigate to the `generateDeleteUrl` url.
             * @type {Boolean}
             */
            isNavigationOnDelete: true,
            /**
             * If true, the view will attempt to call the `saveModelSvc` in the `saveAction` when there is a submit.
             * If you have a composite or a list view, maybe you want the parent view to deal with the save.
             * @type {Boolean}
             */
            isSaveOnServer: true,
            /**
             * When the view is a list view, this selector is use to identify the view of each line.
             * It could be `ul li`.
             * @type {String}
             */
            collectionSelector: "tbody tr",
            /**
             * If there is no navigatio on save, and dhis parameter is true, the view attempt to reload the page (using Backbone not the naigator refresh).
             * @type {Boolean}
             */
            isForceReload: false,
            /**
             * This parameter is use in order to know if the view is ready to be displayed.
             * If not, the spinner is render (see isReady function).
             * @type {Boolean}
             */
            isReadyModelData: true,
            /**
             * This parameter can be use in order to have a back to the list button.
             * @type {string}
             */
            listUrl: undefined,
            /**
             * If true, the view will listen to the `model:change` event.
             * @type {Boolean}
             */
            isListeningToModelChange: true,
            /**
             * If you need to specify a selector in which the input, select, textarea are searched.
             * @type {string}
             */
            formSelector: undefined, //In whitch selector you have to search the form datas (inputs, select,...).,
            /**
             * Define if the type of model of the view is a model or a collection.
             * @type {String}
             */
            modelType: "model"
        }),

        /**
         * Initialize the consult edit view.
         * @param  {object} options - All options you need to pass to the view.
         * These will extend the defaultOptions and customOptions of the view.
         * All options will be in the `opts` property of the view.
         * @return {undefined}
         */
        initialize: function initializeConsultEdit(options) {
            options = options || {};
            //Call the parent initialize.
            CoreView.prototype.initialize.call(this, options);

            //By default the view is in consultationmode and if edit mode is active and isEdit has been activated in th options. 
            this.isEdit = (this.opts.isEditMode && this.opts.isEdit) || false;

            //Transform the listUrl
            if (this.opts.listUrl) {
                var currentView = this;
                this.opts.listUrl = this.opts.listUrl.replace(/\:(\w+)/g, function(match) {
                    return currentView.opts[match.replace(":", "")];
                });
            }

            if (this.model) {
                if (this.isCreateMode(options)) {
                    this.isEdit = true;
                    this.opts.isModelToLoad = false;
                    this.loadGetNewModelData();
                }

                //render view when the model is loaded
                if (this.opts.isListeningToModelChange) {
                    this.model.on('change', this.render, this);
                }

                // In order to be loaded a model has to have an id and the options must be activated.
                if (this.opts.isModelToLoad && utilHelper.isBackboneModel(this.model)) {
                    this.opts.isReadyModelData = false;
                    //Try to load the model from a service which have to return a promise.
                    this.loadModelData();
                }
            }
        },
        // returns true if the view should be rendered in creation mode.
        /**
         * Function wich process the fact that the view is in create.
         * @param  {object}  options [description]
         * @return {Boolean}  - true if the view is in create mode.
         */
        isCreateMode: function isCreateModeConsultEdit(options) {
            var isBackboneModel = utilHelper.isBackboneModel(this.model);
            return this.opts.isCreateMode || (isBackboneModel && this.opts.isModelToLoad && this.model.get('isNewModel'));
        },
        //This function is use in order to retrieve the data from the api using a service.
        /**
         * Load the model from the gerModelSvc function which should be a Promise.
         * @param  {string} id - model identifier.
         * @return {undefined}
         */
        loadModelData: function loadModelData(id) {
            var view = this;
            var idValue = id || this.model.get('id');
            if (!this.getModelSvc) {
                throw new ArgumentNullException('The getModelSvc should be a service which returns a promise, it is undefined here.', this);
            }
            this.getModelSvc(idValue)
                .then(function success(jsonModel) {
                    view.opts.isReadyModelData = true;
                    if (jsonModel === undefined) {
                        //manually trigger the change event in the case of empty object returned.
                        view.model.trigger('change');
                    } else {
                        view.model.set(jsonModel);//change and change:property
                    }

                }).then(null, function error(errorResponse) {
                    ErrorHelper.manageResponseErrors(errorResponse, {
                        model: view.model
                    });
                });
        },

        //This function is use in order to retrieve the data from the api using a service.
        loadGetNewModelData: function loadGetNewModelData() {
            if (this.getNewModelSvc !== undefined) {
                var view = this;
                this.getNewModelSvc()
                    .then(function success(jsonModel) {
                        view.opts.isReadyModelData = true;
                        view.model.set(jsonModel);
                        //view.model.savePrevious();
                    }).then(null, function error(errorResponse) {
                        ErrorHelper.manageResponseErrors(errorResponse, {
                            model: view.model
                        });
                    });
            }
        },

        //Events handle by the view with user interaction
        events: {
            // Deals with the edit button click.
            "click button.btnEdit": "edit",
            // Deals with the delete button.
            "click button.btnDelete": "deleteItem",
            // Deals with the panel collapse event.
            "click .panel-heading": "toogleCollapse",
            // Deals with the submit button.
            "click button[type='submit']": "save",
            // Deals withe the candel button.
            "click button.btnCancel": "cancelEdition",
            // Deals with the button back.
            "click button.btnBack": "back",
            // Deals with the data-loading button event.
            "click button[data-loading]": "loadLoadingButton"
        },

        //JSON data to attach to the template.
        getRenderData: function getRenderDataConsultEdit() {
            var jsonToRender = this.model.toJSON();
            //Add the reference lists names to the json.
            if(this.referenceNames){
                _.extend(jsonToRender, _.pick(this.model, this.referenceNames));
            }
            if (this.opts.listUrl){
                jsonToRender.listUrl = this.opts.listUrl;
            }
            return jsonToRender;
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
            if (this.isEdit) {
                backboneNotification.clearNotifications();
                this.model.savePrevious();
            }
            this.render();
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
            return this.model.toSaveJSON();
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
            this.bindToModel();
            //Bind the this to the current view for the
            var currentView = this;
            ModelValidator.validateAll(currentView.model)
                .then(function successValidation() {
                    //When the model is valid, unset errors.
                    currentView.model.forEach(function(mdl) {
                        mdl.unsetErrors();
                    }, currentView);
                    if (currentView.opts.isSaveOnServer) {
                        currentView.saveAction();
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
        resetLoadingButton: function resetLoadingButton() {
            $('button[data-loading]', this.$el).button('reset');
        },
        loadLoadingButton: function loadLoadingButton(event) {
            $(event.target).closest('button[data-loading]').button('loading');
        },
        bindToModel: function bindToModelConsultEdit() {
            var formSelector = this.opts.formSelector || "";
            if (utilHelper.isBackboneModel(this.model)) {
                this.model.unsetErrors({
                    silent: true
                });
                var inputSelector = formSelector + " " + "input, " + formSelector + " " + "textarea";
                var selectSelector = formSelector + " " + "select";
                form_helper.formModelBinder({
                    inputs: $(inputSelector, this.$el),
                    options: $(selectSelector, this.$el)
                }, this.model);
            } else if (utilHelper.isBackboneCollection(this.model)) {
                this.model.unsetErrors({
                    silent: true
                });
                var collectionSelector = formSelector + " " + this.opts.collectionSelector;
                form_helper.formCollectionBinder(
                    $(collectionSelector, this.$el),
                    this.model, {
                        isSilent: false
                    }
                );
            }
        },
        //Save method in case of a model.
        saveModel: function saveBackboneModel() {
            this.bindToModel();

            //Bind the this to the current view for the
            var currentView = this;
            //Todo: Add a method in util in order to know if an object is a collectio or a model.
            //Add it into the initialize too.
            ModelValidator.validate(currentView.model)
                .then(function successValidation() {
                    //When the model is valid, unset errors.
                    currentView.model.unsetErrors();
                    if (currentView.opts.isSaveOnServer) {
                        currentView.saveAction();
                    } else {
                        currentView.saveSuccess(currentView.model.toJSON());
                    }

                }, function errorValidation(errors) {
                    currentView.model.setErrors(errors);
                    currentView.resetSaveButton();
                });
        },
        //Save action call the save Svc.
        saveAction: function saveActionConsultEdit() {
            var currentView = this;
            //Add a control on the property saveModelSvc.
            if (!currentView.saveModelSvc) {
                throw new ArgumentNullException("'The saveModeSvc should be a service which returns a promise, it is undefined here.");
            }
            //Call the service in order to save the model.                   
            return currentView.saveModelSvc(currentView.getDataToSave())
                .then(function success(jsonModel) {
                    currentView.saveSuccess(jsonModel);
                }, function error(responseError) {
                    currentView.saveError(responseError);
                })
                .then(currentView.resetSaveButton.bind(currentView));
        },
        //Actions on save error
        saveError: function saveErrorConsultEdit(errors) {

            ErrorHelper.manageResponseErrors(errors, {
                model: this.model
            });
        },
        //Actions on save success.
        saveSuccess: function saveSuccessConsultEdit(jsonModel) {
            this.opts.isNewModel = false;
            //Add a notification which will be displayed wether by the router or by the same view.
            backboneNotification.addNotification({
                type: 'success',
                message: i18n.t('save.' + (jsonModel && jsonModel.id ? 'create' : 'update') + 'success')
            });
            // If the navigation on save is activated, navigate to the page.
            if (this.opts.isNavigationOnSave) {
                Backbone.history.navigate(this.generateNavigationUrl(), true);
            } else {
                // If there is no navigation on save, trigger a change event.
                if (this.opts.isForceReload === true) {
                    var thisUrl = this.generateReloadUrl(jsonModel);
                    if (!Backbone.history.navigate(thisUrl, true)) {
                        Backbone.history.loadUrl(thisUrl);
                    }
                } else if (jsonModel instanceof Object) {
                    //Render the success notification.
                    backboneNotification.renderNotifications();
                    //Reset the model or the collection.
                    this.model[utilHelper.isBackboneModel(this.model) ? 'set' : 'reset'](jsonModel, {
                        silent: false
                    });
                    this.toggleEditMode();
                } else if (utilHelper.isBackboneModel(this.model) && this.model.isNew()) {
                    Backbone.history.navigate(Backbone.history.fragment.replace('new', jsonModel), true);
                } else {
                    backboneNotification.renderNotifications();
                    //Reload the model from the service.
                    this.loadModelData();
                    this.toggleEditMode();
                }

            }
        },
        //Contains all the business validation promises.
        businessValidationPromises: function() {
            //Return an array of  promises
            return [];
        },
        //Cancel the edition.
        cancelEdition: function cancelEditionConsultEditView() {
            backboneNotification.clearNotifications();
            if (this.model.isNew()) {
                Backbone.history.navigate(this.opts.listUrl, true);
            } else {
                this.model.restorePrevious();
                this.toggleEditMode();
            }
        },
        //Url to generate when you want to reload the page, if the option isForceReload is activated.
        generateReloadUrl: function generateReloadUrl(param) {
            throw new NotImplementedException('generateReloadUrl', this);
        },
        //Url for the newt page after success if the option isNavigateOnSave is activated.
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
            if (!this.deleteModelSvc) {
                throw new ArgumentNullException('The deleteModelSvc should be a service which returns a promise, it is undefined here.', this);
            }
            this.deleteModelSvc(this.model)
                .then(function success(successResponse) {
                    view.deleteSuccess(successResponse);
                }, function error(errorResponse) {
                    view.deleteError(errorResponse);
                });
        },

        //Generate delete navigation url.
        generateDeleteUrl: function generateDeleteUrl() {
            return this.opts.listUrl;
        },

        // Actions after a delete success.
        deleteSuccess: function deleteConsultEditSuccess(response) {
            //remove the view from the DOM
            if (this.model.isInCollection()) {
                this.model.collection.remove(this.model);
            } else {
                delete this.model;
            }
            this.remove();
            this.resetLoadingButton();
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
            this.resetLoadingButton();
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
        //Inform if the view is ready to be displayed.
        isReady: function isReadyConsultEditView() {
            return this.opts.isReadyModelData === true && CoreView.prototype.isReady.call(this) === true;
        },
        //Function which is called after the render, usally necessary for jQuery plugins.
        afterRender: function postRenderDetailView() {
            CoreView.prototype.afterRender.call(this);
            $('.collapse', this.$el).collapse('show');
            //Button loading:
            $('button[data-loading]').button();

            var errorField = $('input', 'div.form-group.has-error', this.$el)[0];
            if (errorField === undefined) {
                errorField = $('select', 'div.form-group.has-error', this.$el)[0];
            }
            if (errorField !== undefined) {
                errorField.focus();
            }
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
//var template = require("../template/collection-pagination");
(function(NS) {
  //Filename: views/collection-pagination-view.js
  "use strict";
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
/*global  $, window, _, Promise*/
(function (NS) {
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
        defaultOptions: _.extend({}, ConsultEditView.prototype.defaultOptions, {
            isForceReload: true,
            isNavigationOnSave: false,
            isModelToLoad: false,
            isListeningToModelChange: false
        }),

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
        registerViews: function (viewsConfigurations) {
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
                this.viewsConfiguration = _.reject(this.viewsConfiguration, function (viewConf) {
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
            "click button.btnCancel": "cancelEdition",
            "click button[data-loading]": "loadLoadingButton"
        },
        // Get the data to give to the template.
        getRenderData: function getRenderDataCompositeView() {
            return _.extend({}, { listUrl: this.opts.listUrl }, this.additionalData());
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
                $(vConf.selector, this.$el).html(this[vConf.name].render(options).el);
                this[vConf.name].delegateEvents();
            }

            //this.delegateEvents();
            return this;
        },
        toggleEditMode: function toggleEditModeCompositeView() {
            ConsultEditView.prototype.toggleEditMode.apply(this);
            //Render each view inside the configuration.
            for (var i = 0, l = this.viewsConfiguration.length; i < l; i++) {
                var vConf = this.viewsConfiguration[i];
                //Render each view inside its selector.
                this[vConf.name].toggleEditMode();
            }
        },
        bindToModel: function(){
            var compoView = this;
            for (var i = 0, l = compoView.viewsConfiguration.length; i < l; i++) {
                var viewConf = compoView.viewsConfiguration[i];
                compoView[viewConf.name].bindToModel();
            }
            this.model.set(this.buildJSONToSave());
        },
        //Submit the compoosite view.
        save: function saveCompositeView(event) {
            event.preventDefault();
            var compoView = this;

            var promisesValidationContainer = [];
            //Function  to build promises from view configuration.
            function buildPromisesFromViewConfiguration(vConf) {
                if (vConf.type === "model") {
                    //Bind the model.
                    compoView[vConf.name].bindToModel();
                    promisesValidationContainer.push(
                        //A promise is created in order to be resolve by the promise.all.
                        //Otherwise, the promise returned by the validation is already resolve when the promise.all is treated.
                        new Promise(function (resolve, failure) {
                            ModelValidator.validate(compoView[vConf.name].model).then(
                                function (success) {
                                    resolve(success);
                                },
                                function (errors) {
                                    errorHelper.setModelErrors(compoView[vConf.name].model, { fieldErrors: errors });
                                    failure(errors);
                                }
                            );
                        })
                    );

                } else {
                    //The view of the collection must have a collectionSelectot to be able to work.
                    //Bind the collection.
                    compoView[vConf.name].bindToModel();

                    //Push promises inside the container.
                    promisesValidationContainer.push(
                        //Same reason as for the model.
                        new Promise(function (resolve, failure) {
                            ModelValidator.validateAll(compoView[vConf.name].model).then(
                                function (success) {
                                    resolve(success);
                                },
                                function (errors) {
                                    errorHelper.setCollectionErrors(compoView[vConf.name].model, errors);
                                    failure(errors);
                                }
                            );
                        })
                    );
                }
            }
            //Go through the whole conf.
            for (var i = 0, l = compoView.viewsConfiguration.length; i < l; i++) {
                var viewConf = compoView.viewsConfiguration[i];
                buildPromisesFromViewConfiguration(viewConf);
            }
            var promisesContainer = _.union(promisesValidationContainer, compoView.businessValidationPromises())
            //Resolve all validation promise inside the page.
            Promise.all(promisesContainer).then(function (success) {
                compoView.saveAction();
            }, function (error) {
                //console.error(error);
                compoView.resetSaveButton();
            });
        },
        //Method called when the validation is done and ok.
        saveAction: function saveActionCompositeView() {
            var currentView = this;
            this.saveModelSvc(this.buildJSONToSave()).then(
            function successSaveCompostiteView(success) {
                currentView.saveSuccess(success);
            },
            function errorSaveCompositeView(responseError) {
                currentView.saveError(responseError);
            }).then(this.resetSaveButton.bind(this));
        },
        //Cancel the edition.
        cancelEdition: function cancelEditionCompositeView() {
            // cancelEdit on composite = ToggleEdit on compositeView only + cancelEdit on each child view.

            if (this.isCreateMode()) {
                ConsultEditView.prototype.cancelEdition.call(this);
            }
            else {
                ConsultEditView.prototype.toggleEditMode.apply(this);

                //Render each view inside the configuration.
                for (var i = 0, l = this.viewsConfiguration.length; i < l; i++) {
                    var vConf = this.viewsConfiguration[i];
                    //Render each view inside its selector.
                    this[vConf.name].cancelEdition();
                }
            }
            
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
        buildJSONToSave: function () {
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
/* global Backbone, window*/
(function(NS) {
  "use strict";
  //Filename: views/header-items-view.js
  NS = NS || {};
  var isInBrowser = typeof module === 'undefined' && typeof window !== 'undefined';
  
  //Template for the header items.
  var template = isInBrowser ? NS.templates.headerItems : function(){};
  
  //View for the header items.
  var headerItemsView = Backbone.View.extend({
    
    //Default template.
      template: template,
    //Options for the param.
    paramOptions: {
        selector: "div#titleContainer",
        template: function(){console.warn('no template define for your param....')}
    },
    //Initialize the header view.
    initialize: function initializeHeaderItemsView(options) {
      options = options || {};
      //Define the level params.
      if (options.levelParams !== undefined) {
          this.levelParams = options.levelParams;
      }
      this.listenTo(this.model, 'change', this.render);
    },
    ////Define the param for the Level.
    //defineParam: function defineHeaderItemsViewParam(param) {
    //    if (param === undefined || param === null) {
    //        this.param = undefined;
    //    }
    //    this.param = param;
    //},
    //Render all the headers items.
    render: function renderHeaderItems(){
        var parentName = this.model.processParentName();
        this.$el.html(this.template({ headerItems: this.model.toActiveJSON(), parentName: parentName }));

        if (this.levelParams !== undefined && parentName!== undefined && this.levelParams[parentName] !== undefined) {
            $(this.paramOptions.selector, this.$el).html(this.paramOptions.template(this.levelParams[parentName]));
        }
        return this;
    },

    //Hide the view.
    hide: function hide(){
      this.model.currentActiveName = undefined;
      this.$el.html(null);
    }
  });


  // Differenciating export for node or browser.
  if (isInBrowser) {
    NS.Views = NS.Views || {};
    NS.Views.HeaderItemsView = headerItemsView;
  } else {
    module.exports = headerItemsView;
  }
})(typeof module === 'undefined' && typeof window !== 'undefined' ? window.Fmk : module.exports);
/* global Backbone, window, _, $*/
(function(NS) {
  "use strict";
  //Filename: views/header-view.js
  NS = NS || {};
  var isInBrowser = typeof module === 'undefined' && typeof window !== 'undefined';
  var util = isInBrowser ? NS.Helpers.utilHelper : require('../helpers/util_helper');
  var HeaderItems = isInBrowser ? NS.Models.HeaderItems : require('../models/header-items');
  var HeaderItemsView = isInBrowser ? NS.Views.HeaderItemsView : require('./header-items-view');
  var siteDescriptionHelper =  isInBrowser ? NS.Helpers.siteDescriptionHelper : require('../helpers/site_description_helper');
  var template = isInBrowser ? NS.templates.header : function(){};
  var headerView = Backbone.View.extend({

    //Name of the level layer.
    levelName: "level_",
    template: template,
    //Default name of the container for the header.
    defaultContainerName: ".header",
    //Example of definition of a different view for a header level:
    // Inside the ViewForLevel => Add a property with levelName_[index] and a reference to the view you want.
    //Warning, this is insife the prototype, only one headerview per application.  
    ViewForLevel:{
      "level_0": undefined,
      "level_1": undefined,
      "level_2": undefined,
      "level_3": undefined
    },
    HeaderItemsView: HeaderItemsView,
    //Initialize the header view.
    initialize: function initializeHeaderView(options) {
      options = options || {};
      this.opts = _.extend({containerName: this.defaultContainerName},options);
      if (options.site) {
        this.processSite(options.site);
      }
      if (options.active) {
        this.processActive(options.active);
      }
      //Contains all the params for the levels.
      this.levelParams = {};

    },

    //Process the active menu item.
    processActive: function processActive(activeNode) {
      if (this.active === activeNode) {
        return;
      }
      var split = activeNode.split('.');
      this.level = split.length; //+1?

      for (var i = 0; i < this.maxLevel; i++) {
        //If the view is in the level.
        if (i < this.level) {
          //Test the depth.
          this[this.levelName + i].model.changeActive(util.splitLevel(activeNode, {depth: i+1}));
        } else {
          this[this.levelName + i].hide();
        }
      }
    },

    //Process the site map.
    processSite: function processSiteHeaderView(site) {
      var grouped = util.groupBySplitChar(site);
      //Erase previous view.
      for (var i = 0; i < this.maxLevel; i++) {
        this[this.levelName + i].remove();
        //Remove the level.
        delete this[this.levelName + i];//See if it is necessary.
        //Remove the param inside the object.
        delete this.levelParams[levelName];
      }
      var allParams = siteDescriptionHelper.getParams();
      //Create new views
      var index = 0;
      for (var prop in grouped) {
         var levelName = this.levelName + index;
         var menuItms = _.values(grouped[prop]);
        this.processLevelParams(menuItms, index, allParams);
         //this.levelParams = this.processLevelParams(menuItms, index, allParams);
        //Wich view for the view level.
        var HeaderItemsViewOfLevel = this.ViewForLevel[levelName] || this.HeaderItemsView;
        this[levelName] = new HeaderItemsViewOfLevel({
            model: new HeaderItems(menuItms),
            levelParams: this.levelParams[levelName]
        });
        index++;
      }
      //define the max profoundness level.
      this.maxLevel = index;
      this.render();
    },
    //Process the level params for the next level.
    processLevelParams: function (menuItemsArray, indexLevel, params) {
        var itemsWithParams = _.filter(menuItemsArray, function (element) { return element.requiredParams !== undefined; });
        //If there is no element 
        if (!_.isArray(itemsWithParams)) { return undefined; }

        var processParams = {};
        for (var i = 0, l = itemsWithParams.length; i < l; i++) {
            var itemWithParams = itemsWithParams[i];
            if (itemWithParams !== undefined && itemWithParams.name !== undefined && itemWithParams.requiredParams !== undefined && _.isArray(itemWithParams.requiredParams)) {
                var paramsOfItem = {};
                //Build a param object for each param
                for (var j = 0, ln = itemWithParams.requiredParams.length; j < ln; j++) {
                    var paramName = itemWithParams.requiredParams[j];
                    paramsOfItem[paramName] = params[paramName];
                }
                processParams[itemWithParams.name] = paramsOfItem;
            }
        }
        //Register a nexlevel params only if necessary.
        if (!_.isEmpty(processParams)) {
            var nextLevelName = this.levelName + (indexLevel + 1);
            this.levelParams[nextLevelName] = processParams;
        }

    },

    //Render all the headers items.
    render: function renderHeaders() {
      this.$el.html(this.template());
      for (var i = 0; i < this.maxLevel; i++) {
        $(this.opts.containerName,this.$el).append( this[this.levelName + i].render().el);
      }
      return this;
    }

  });


  // Differenciating export for node or browser.
  if (isInBrowser) {
    NS.Views = NS.Views || {};
    NS.Views.HeaderView = headerView;
  } else {
    module.exports = headerView;
  }
})(typeof module === 'undefined' && typeof window !== 'undefined' ? window.Fmk : module.exports);
/*global Backbone, i18n, $, window, _*/
(function (NS) {
    "use strict";
    // Filename: views/list-view.js
    NS = NS || {};
    var isInBrowser = typeof module === 'undefined' && typeof window !== 'undefined';
    //var NotImplementedException = isInBrowser ? NS.Helpers.Exceptions.NotImplementedException : require('../helpers/custom_exception').NotImplementedException;
    var _url = isInBrowser ? NS.Helpers.urlHelper : require('../helpers/url_helper');
    var templatePagination = function () { }; //Todo: call a handlebar herlper.//require('../templates/collection-pagination');
    var ConsultEditView = isInBrowser ? NS.Views.ConsultEditView : require('./consult-edit-view');
    var errorHelper = isInBrowser ? NS.Helpers.errorHelper : require('../helpers/error_helper');
    var utilHelper = isInBrowser ? NS.Helpers.utilHelper : require('../helpers/utilHelper');
    var ArgumentInvalidException = isInBrowser ? NS.Helpers.Exceptions.ArgumentInvalidException : require("../helpers/custom_exception").ArgumentInvalidException;
    var ListView = ConsultEditView.extend({
        tagName: 'div',
        className: 'resultView',
        resultsPagination: 'div#pagination',
        templatePagination: templatePagination,
        search: undefined,
        //By default the search criteria is empty.
        searchCriteria: {},
        //Get the 
        getCriteria: function getCriteria() {
            return _.extend({}, this.searchCriteria, this.opts.searchCriteria);
        },
        //Default options of the list view.
        defaultOptions: _.extend({}, ConsultEditView.prototype.defaultOptions, {
            exportUrl: './Export/Index', //Change it if necessary.,
            isReadyModelData: true,
            isListeningToModelChange: false,
            modelType: "collection"
        }),
        //Dervice to define in order to launch the export.
        exportSvc: undefined,
        //Url for the export.
        export: function exportCollection(event) {
            if (typeof this.opts.exportUrl === 'string' && typeof this.exportSvc === 'function') {
                var currentView = this;
                this.exportSvc(this.getCriteria(), _.extend(this.model.pageInfo(), {
                    exportId: this.exportId,
                    exportColumnLabels: this.model.exportColumnLabels
                })).then(function (success) {
                    window.open($('a.btnExport', currentView.$el).attr('href'), '_blank');
                    //$('a.btnExport', this.$el).trigger('click');
                }).then(null, function error(errorResponse) {
                    event.preventDefault();
                    errorHelper.manageResponseErrors(errorResponse, {
                        isDisplay: true
                    });
                });
            } else {
                throw new ArgumentInvalidException('The export conf must be set in order to have an export button, see Fmk.Views.listView, exportSvc to override.', this.exportConf);
            }

        },
        //Parameters for rendering the detail inside.
        isShowDetailInside: false,
        ResultSelectionView: undefined,
        ResultSelectionModel: undefined,
        resultsContainer: 'div#lineSelectionContainer',
        //List of the model in memory in case of cancel.
        storedModels: [],
        //View foreach line in the collection view.
        viewForEachLineConfiguration: {
            isActive: false, //True or false will make the rendering different.
            LineView: undefined, //View to create for each line.
            //ModelLineView: undefined, //Model for the view initialize with collection data. It is not use but could be if we would want to initialize another model.
            parentContainer: "table tbody" //selector into which the view .
        },

        initialize: function initializeListView(options) {
            options = options || {};
            //Container for the views of each line in case it is usefull.
            this.lineViewsContainer = {};
            ConsultEditView.prototype.initialize.call(this, options);
            this.isSearchTriggered = options.isSearchTriggered || false;
            this.listenTo(this.model, "reset", this.render, this);
            // Listen to the model add event.
            this.listenTo(this.model, "add", this.addOne, this);
            var currentView = this;
            if (this.opts.isModelToLoad) {
                this.opts.isReadyModelData = false;
                this.getSessionCriteria().then(function (crit) {
                    //Restore the criteria if save into the session.
                    if (crit !== undefined && crit !== null && crit.pageInfo !== undefined && crit.pageInfo !== null) {
                        currentView.model.setPageInfo(crit.pageInfo);
                    }
                    currentView.loadModelData(options);
                }, function (error) {
                    errorHelper.manageResponseErrors(error);
                });

            }
            //Set an exportId
            if (this.exportSvc !== undefined && this.opts.exportUrl !== undefined) {
                this.exportId = utilHelper.guid();
            }
        },
        loadModelData: function loadModelData(options) {
            options = options || {};
            if (this.search !== undefined) {
                // Fusion des critères venant du rooter (options.searchCriteria) et de la vue (this.getCriteria()).
                var criteria = {};
                _.extend(criteria, this.getCriteria(), options.searchCriteria);
                this.opts.isReadyModelData = false;
                var currentView = this;
                //Call the service and inject the result into the model.
                this.search(criteria, this.model.pageInfo()).then(function success(jsonResponse) {
                    currentView.opts.isReadyModelData = true;
                    currentView.model.setTotalRecords(jsonResponse.totalRecords);
                    currentView.model.reset(jsonResponse.values);
                    //Save the criteria and the pagInfo info the session.
                    currentView.saveCriteria.call(currentView, criteria, currentView.model.pageInfo());
                }).then(null, function error(errorResponse) {
                    currentView.opts.isReadyModelData = true;
                    currentView.render();
                    errorHelper.manageResponseErrors(errorResponse, {
                        isDisplay: true
                    });
                });
            }
        },
        events: {
            'click tbody td[data-selection]': 'lineSelection',
            'click ul li [data-selection]': 'lineSelection',
            'click .pagination li': 'goToPage',
            'click a.sortColumn': 'sortCollection',
            "click .panel-heading": "toogleCollapse",
            'click #btnBack': 'navigateBack',
            "change .pageFilter": "changePageFilter",
            //Edition events
            "click button.btnEdit": "edit",
            "click button.btnCreate": "create",
            "click button[type='submit']": "save",
            "click button.btnCancel": "cancelEdition",
            "click button.btnExport": 'export',
            "click button.btnBack": "back",
            "click button[data-loading]": "loadLoadingButton"
        },
        changePageFilter: function changePageFilterListView(event) {
            this.model.perPage = +event.target.value;
            this.model.currentPage = this.model.firstPage;
            this.fetchDemand();
        },
        create: function createNavigate() {
            var createUrl = this.generateNavigationUrl("new");
            Backbone.history.navigate(createUrl, true);
        },
        sortCollection: function sortCollection(event) {
            event.preventDefault();
            if (this.isEdit) {
                return;
            }
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

        fetchDemand: function fetchDemandListView() {
            this.loadModelData();
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
            var id = $(event.target).closest("[data-selection]").attr('data-selection');
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
        cancelEdition: function cancelListEdition() {
            // reset the collection with the previous models.
            //this.model.reset(this.storedModels);
            this.model.restorePrevious();
            this.toggleEditMode();
        },
        //Add one line view from the model.
        addOne: function addOneLineView(model) {
            //console.log("modelNameAddone", model, model.modelName, this);
            var opt = _.extend({ isEdit: false }, this.additionalData());
            if (this.isEdit) {
                opt.isEdit = this.isEdit;
            }
            //Copy the references to the child.
            model.set(_.pick(this.model, this.referenceNames), { silent: true });
            //
            var lineView = new this.viewForEachLineConfiguration.LineView(_.extend({
                model: model
            }, opt));
            this.lineViewsContainer[model.cid] = lineView;
            $(this.viewForEachLineConfiguration.parentContainer, this.$el).append(
                lineView.render().el
            );
        },
        render: function renderListView(options) {
            options = options || {};
        
            //If there is no result.
            if (this.model.length === 0 && !this.isEdit) {
                this.renderEmptyList();
            } else {
                this.renderList();
            }

            this.delegateEvents();
            return this;
        },
        afterRender: function postRenderListView() {
            ConsultEditView.prototype.afterRender.call(this);
            $('.collapse', this.$el).collapse('show');
        },
        renderEmptyList: function renderEmptyList() {
            this.renderList();
        },
        renderList: function renderList() {
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
            }, {
                exportUrl: this.opts.exportUrl + '/' + this.exportId
            }, _.pick(this.model, this.referenceNames, "modelName", "metadatas"), { isEdit: this.isEdit }, this.additionalData())));

            //Conditionnal code for rendering a View  foreach line
            if (this.viewForEachLineConfiguration.isActive) {
                this.model.forEach(this.addOne, this);
            }

            //render pagination
            $(this.resultsPagination, this.$el).html(this.templatePagination(this.model.pageInfo())); //TODO : this.model.pageInfo() {currentPage: 0, firstPage: 0, totalPages: 10}

            //If there is a detail id set in the view, render it inside.
            if (this.detailId) {
                this.renderDetail();
            }
        },
        saveCriteria: function (criteria, pageInfo) {
            this.saveSessionCriteria({
                criteria: criteria,
                pageInfo: pageInfo
            });
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

/*global   $, window,_*/
(function (NS) {
    "use strict";
    // Filename: views/modal-view.js
    NS = NS || {};
    var isInBrowser = typeof module === 'undefined' && typeof window !== 'undefined';
    var ConsultEditView = isInBrowser ? NS.Views.ConsultEditView : require('./consult-edit-view');
    var templateModal = isInBrowser ? NS.templates.modalSkeleton : function () { };
    var utilHelper = isInBrowser ? NS.Helpers.utilHelper : require('../helpers/utilHelper');
    //var ArgumentInvalidException = isInBrowser ? NS.Helpers.Exceptions.ArgumentInvalidException : require("../helpers/custom_exception").ArgumentInvalidException;
    var ModalView = ConsultEditView.extend({
        tagName: 'div',
        className: 'modalView',
        //Fefault options of the modal view.
        defaultOptions: _.extend({}, ConsultEditView.prototype.defaultOptions, {
            isModelToLoad: false, //By default the model is loaded.
            isEditMode: true,
            isEdit: true,
            isNavigationOnSave: false,
            isNavigationOnDelete: true,
            isSaveOnServer: false,
            isReadyModelData: true,
        }),
        modalTitle: "Modal title i18n key.",
        //Configuration of the modal.
        configuration: {
            templateModal: templateModal,
            container: "div[data-modal]",
            selector: "div[data-modal-content]",
            //Override the default modal options.
            modalOptions: {
                backdrop: 'static',
                keyboard: true,
                show: false,
                remote: false
            }
        },
        //Initialization of the modal.
        initialize: function initializeModalView(options) {
            options = options || {};
            ConsultEditView.prototype.initialize.call(this, options);
            //Modal title.
            this.opts.modalTitle = options.modalTitle || this.modalTitle;
            this.model.off('change');
            this.model.on('change', this.renderModalContent, this);
        },
        //Events listen by default on the modal.
        events: {
            "click button[data-dismiss]": "cancelModal",
            "click button[data-close]": "closeModal"
        },
        //Action call on cancel on the modal.
        cancelModal: function cancelModal() {
            //console.log('the modal is cancel');
            this.trigger('modal:cancel', { cancel: true });
        },
        saveSuccess: function saveSuccessModalClose(jsonModel) {
            var currentModal = this;
            $(this.configuration.container, this.$el).on('hidden.bs.modal', function () {
                currentModal.trigger('modal:close', jsonModel);
                $(currentModal.configuration.container, currentModal.$el).off('hidden.bs.modal');
            });
            this.hideModal();
            //console.log('the modal is close is successfull...');
        },
        //Action called on close the modale.
        closeModal: function closeModal(event) {
            event.preventDefault();
            //console.log('the modal is close is called...');
            if (utilHelper.isBackboneModel(this.model)) {
                this.saveModel();
            } else if (utilHelper.isBackboneCollection(this.model)) {
                this.saveCollection();
            }
        },
        //Render the modal container.
        renderModalContainer: function renderModalContainer() {
            this.$el.html(this.configuration.templateModal(this.getModalData()));
        },
        //Render the modal content.
        renderModalContent: function renderModalContent() {
            var templateName = this.isEdit ? 'templateEdit' : 'templateConsult';
            $(this.configuration.selector, this.$el).html(this[templateName](this.getRenderData()));
            $(this.configuration.selector, this.$el).modal(this.configuration.modalOptions);
            this.afterRender();
            this.delegateEvents();
        },
        getModalData: function () {
            return _.extend({
                title: this.opts.modalTitle,
            }, this.configuration.modalOptions, this.opts);
        },
        showModal: function showModal() {
            
            //this.delegateEvents();
            this.model.unsetErrors();
            $(this.configuration.container, this.$el).modal('show');
        },
        hideModal: function hideModal() {
            $(this.configuration.container, this.$el).modal('hide');
        },
        //Render the modal view.
        render: function renderModalView(options) {
            options = options || {};
            this.renderModalContainer();
            this.renderModalContent();
            //this.delegateEvents();
        }
    });
    // Differenciating export for node or browser.
    if (isInBrowser) {
        NS.Views = NS.Views || {};
        NS.Views.ModalView = ModalView;
    } else {
        module.exports = ModalView;
    }
})(typeof module === 'undefined' && typeof window !== 'undefined' ? window.Fmk : module.exports);
/*global  i18n, _, window*/
(function (NS) {
    "use strict";
    // Filename: views/search-results-view.js
    NS = NS || {};
    var isInBrowser = typeof module === 'undefined' && typeof window !== 'undefined';

    //Dependencies.
    var ListView = isInBrowser ? NS.Views.ListView : require('./list-view');
    var templateNoResults = isInBrowser ? NS.templates.noResults : function () { };

    //View to use in order to display search results.
    var SearchResultsView = ListView.extend({

        //Defaults options of the searchresults view.
        defaultOptions: _.extend({}, ListView.prototype.defaultOptions, {
            isModelToLoad: false,
            isReadyResultsData: true
        }),

        // Get the criteria used to get the results.
        getCriteria : function getCriteriaResultsView(){
            var criteria = this.opts.searchView.getCriteria();
            return _.extend({}, ListView.prototype.getCriteria.call(this), criteria);
        },

        //Template use in order to display the fact that there is no results.
        templateNoResults: templateNoResults,

        //Trigger a fetch for the consultation 
        fetchDemand: function fetchDemandResultView() {
            this.trigger('results:fetchDemand');
        },
        render: function renderSearchResultView(options) {
            options = options || {};
            //If the research was not launch triggered.
            return ListView.prototype.render.call(this, options);
        },
        //Function call when there is no result.
        renderEmptyList: function renderEmptySearchResults() {
            //Is recherche launched.
            if (this.isSearchTriggered) {
                this.$el.html(this.templateNoResults({
                    message: i18n.t('search.noResult')
                }));
            } else {
                this.$el.html(this.templateNoResults({
                    message: i18n.t('search.ready')
                }));
            }
        },
        toggleEditMode: function toogleEditModeSRV(event) {
            if (event) {
                event.preventDefault();
            }
            this.isEdit = !this.isEdit;
            this.render({
                isSearchTriggered: true
            }); //todo: fix this to have no options.
        },
        //Indicate if the function is ready to be displayed. If not the spinner is display.
        isReady: function readySearchResults() {
            return this.opts.isReadyResultsData === true && ListView.prototype.isReady.call(this);
        },

        saveCriteria: function saveSearchCriteria(criteria, pageInfo) {
            this.saveSessionCriteria({ criteria: criteria, pageInfo: pageInfo }).then(function (s) {
                console.log('criteria save in session', s);
            });
        }
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
(function (NS) {
    // Filename: views/search-view.js
    NS = NS || {};
    var isInBrowser = typeof module === 'undefined' && typeof window !== 'undefined';
    var NotImplementedException = isInBrowser ? NS.Helpers.Exceptions.NotImplementedException : require('../helpers/custom_exception').NotImplementedException;
    var ErrorHelper = isInBrowser ? NS.Helpers.errorHelper : require('../helpers/error_helper');
    var form_helper = isInBrowser ? NS.Helpers.formHelper : require('../helpers/form_helper');
    var ModelValidator = isInBrowser ? NS.Helpers.modelValidationPromise : require('../helpers/modelValidationPromise');
    var CoreView = isInBrowser ? NS.Views.CoreView : require('./core-view');
    var errorHelper = isInBrowser ? NS.Helpers.errorHelper : require('../helpers/error_helper');
    var backboneNotification = isInBrowser ? NS.Helpers.backboneNotification : require("../helpers/backbone_notification");

    var SearchView = CoreView.extend({
        tagName: 'div',
        className: 'searchView',
        ResultsView: undefined,
        Results: undefined,
        search: undefined,
        resultsSelector: 'div#results',
        isMoreCriteria: false,

        //Default options of the search view.
        defaultOptions: _.extend({}, Fmk.Views.CoreView.prototype.defaultOptions, {
            isRefreshSearchOnInputChange: true
        }),

        initialize: function initializeSearch(options) {
            options = options || {};
            // Call the initialize function of the core view.
            CoreView.prototype.initialize.call(this, options);
            this.isSearchTriggered = options.isSearchTriggered || false;
            this.stopListening(this.model, "reset");
            this.isReadOnly = options.isReadOnly || false;
            this.model.set({
                isCriteriaReadonly: false
            }, {
                silent: true
            });

            //init results collection
            this.searchResults = new this.Results();
            //initialization of the result view 
            this.searchResultsView = new this.ResultsView({
                model: this.searchResults,
                criteria: this.model,
                searchView: this,
                isSearchTriggered : false
            });
            //handle the clear criteria action
            this.listenTo(this.model, 'change', this.render);
            this.listenTo(this.searchResultsView, 'results:fetchDemand', function () {
                this.runSearch(null, {
                    isFormBinded: false
                });
            });
            this.listenTo(this.searchResultsView, 'listview:lineSelected', function () {
                $('.collapse', this.$el).collapse('hide');
            });
            var currentView = this;
            this.getSessionCriteria().then(function (crit) {
                //Restore the criteria if save into the session.
                if (crit !== undefined && crit !== null && crit.pageInfo !== undefined && crit.pageInfo !== null) {
                    currentView.model.set(crit.criteria, { silent: false });
                    currentView.searchResults.setPageInfo(crit.pageInfo);
                    currentView.isSearchTriggered = true;
                }
                //If the serach has to be triggered, trigger it.
                if (currentView.isSearchTriggered) {
                    currentView.runSearch(null, {
                        isFormBinded: false
                    });
                }
            }, function (error) {
                errorHelper.manageResponseErrors(error);
            });

            if (this.opts.isRefreshSearchOnInputChange) {
                this.events = _.extend({}, this.events, this.defaultEvents, this.refreshSearchOnInputChangeEvents);
            }
            this.delegateEvents();
        },

        defaultEvents: {
            "submit form": 'runSearch', // Launch the search.
            "click button.btnReset": 'clearSearchCriteria', // Reset all the criteria.
            "click button.btnEditCriteria": 'editCriteria', //Deal with the edit mode.
            "click button.toogleCriteria": 'toogleMoreCriteria', // Deal with the more / less criteria.
            "click .panel-heading": "toogleCollapse",
            "click button.btnCreate": "create",
        },
        events: this.defaultEvents,

        refreshSearchOnInputChangeEvents: {
            "change [data-refresh]  input:not([noRefresh])": "runSearch",
            "change [data-refresh] select:not([noRefresh]) ": "runSearch"
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
        create: function createNavigate() {
            this.searchResultsView.create();
        },

        searchSuccess: function searchSuccess(jsonResponse) {
            this.searchResults.setTotalRecords(jsonResponse.totalRecords);
            this.searchResults.reset(jsonResponse.values);
        },
        searchError: function searchError(response) {
            this.searchResults.reset([]);
            ErrorHelper.manageResponseErrors(response, {
                isDisplay: true,
                model: this.model
            });
        },

        getCriteria: function () {
            return _.clone(_.omit(this.model.toJSON(), this.referenceNames));
        },

        runSearch: function runSearchSearchView(event, options) {
            var searchButton;
            var isEvent = event !== undefined && event !== null;
            if (isEvent) {
                event.preventDefault();
                searchButton = $("button[type=submit]", event.target); // retrieving the button that triggered the search
            }
            options = options || {};
            var isFormBinded = options.isFormBinded === undefined ? true : options.isFormBinded;
            //bind form fields on model
            if (isFormBinded) {
                form_helper.formModelBinder({
                    inputs: $('input', this.$el),
                    options: $('select', this.$el)
                }, this.model);
            }
            //Render loading inside the search results:
            this.searchResultsView.opts.isReadyResultsData = false;
            this.searchResultsView.render();
            var currentView = this;
            ModelValidator
				.validate(this.model)
				.then(function (model) {
				    currentView.model.unsetErrors({
				        silent: false
				    });
				    var criteria = currentView.getCriteria();
				    var pageInfo = currentView.searchResults.pageInfo();

				    if (isEvent) {
				        pageInfo.currentPage = 1;
				    }

				    currentView.search(criteria, pageInfo)
						.then(function success(jsonResponse) {
						    //Save the criteria in session.
						    currentView.searchResultsView.opts.isReadyResultsData = true;
						    currentView.searchResultsView.isSearchTriggered = true;
						    currentView.searchResults.setPageInfo(pageInfo);
						    currentView.saveSessionCriteria({
						        criteria: criteria,
						        pageInfo: pageInfo
						    }).then(function (s) {
						        //console.log('criteria save in session', s);
						        backboneNotification.clearNotifications();
						        return currentView.searchSuccess(jsonResponse);
						    });
						}).then(null, function error(errorResponse) {
						    currentView.searchResultsView.opts.isReadyResultsData = true;
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
            var unchanged = {};
            var vals = this.getUnchangedFields();
            for (var i in vals) {
                unchanged[vals[i]] = this.model.get(vals[i]);
            }
            this.model.clear();
            for (field in unchanged) {
                this.model.set(field, unchanged[field], { silent: true });
            }
            this.saveSessionCriteria({}); // clear session criteria.
            this.initialize(); //Call initialize again in order to refresh the view with criteria lists.
        },

        getUnchangedFields: function getUnchangedFields() { return [] },

        render: function renderSearch(options) {
            options = options || {};
            CoreView.prototype.render.call(this, options);
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
/* global  _ , window, Promise,$, Backbone, i18n */
/**
 * @module helpers/message_helper
 * @description Message helper to deal wit confirm, alert, ...
 * @see file helpers/message_helper.js
 */

(function(NS) {
    "use strict";
    //Filename: 
    var isInBrowser = typeof module === 'undefined' && typeof window !== 'undefined';
    //Dependencies.
    var ModalView = isInBrowser ? NS.Views.ModalView : require('../views/modal-view');
    var isInitialize = false;

    var ConfirmView = ModalView.extend({
        modalTitle: " ",
        customOptions: {isEdit: false},
        templateConsult: function(data) {
            return "" + data.message;
        },
        //configuration: _.extend({}, ModalView.prototype.configuration, {templateModal: });
    });

    //Create a Modal in the dom for containige the alert page.
    var confirmView = new ConfirmView({
        modelName: "confirmModel",
        isButtonLabelRedefinition: false
    });

    //if (!$('div[data-modal-confirm]').length) {
    //Register the modal in the DOM.
    function initialize() {
        $('div#modalConfirmContainer').append(confirmView.render().el);
        isInitialize = true;
    }

    //Create an event manager.
    var eventManager = _.extend({}, Backbone.Events);

    /**
     * Helper to replace the confirm of JavaScript.
     * @param  {string} messageKey - internationalization key.
     * @param  {[type]} options    [description]
     * @return {[type]}            [description]
     */
    var confirm = function messageHelperConfirm(messageKey, options) {
        options = options || {};
        //Save the initial opts;
        var initialOpts = confirmView.opts;
        _.extend(confirmView.opts, options);
        confirmView.modalTitle = messageKey;
        confirmView.model.set({'message': messageKey},{silent: true});
        confirmView.render();
        return new Promise(function(resolve, reject) {
            confirmView.showModal();
            //Listen to once to the close event of the modal.
            eventManager.listenToOnce(confirmView, "modal:close", function(data) {
                eventManager.stopListening(confirmView, 'modal:cancel');
                confirmView.opts = initialOpts;
                resolve(messageKey);
            });
            //Listen to once the cancel event on the modal.
            eventManager.listenToOnce(confirmView, "modal:cancel", function(data) {
                eventManager.stopListening(confirmView, 'modal:close');
                confirmView.opts = initialOpts;
                reject(options.cancelMessageKey || {
                    responseJSON: {
                        "error": i18n.t("error.operationCancelled")
                    }
                });
            });
        });
        
    };

    //Message helper.
    var messageHelper = {
        confirm: confirm,
        initialize: initialize
    };
    if (isInBrowser) {
        NS.Helpers = NS.Helpers || {};
        NS.Helpers.messageHelper = messageHelper;
    } else {
        module.exports = messageHelper;
    }
})(typeof module === 'undefined' && typeof window !== 'undefined' ? window.Fmk : module.exports);