(function() {
  "use strict";
  (function(NS) {
    var S4, defaultInputSize, defaultLabelSize, domains_definition, fieldHelpers, gridSize, guid, htmlHelpers, isDateHTML5, isInBrowser, metadataBuilder, mod, optionsHelpers;
    NS = NS || {};
    isInBrowser = typeof module === 'undefined' && typeof window !== 'undefined';
    metadataBuilder = isInBrowser ? NS.Helpers.metadataBuilder : require('../../helpers/metadata_builder').metadataBuilder;
    domains_definition = void 0;
    isDateHTML5 = true;
    gridSize = 12;
    defaultLabelSize = 3;
    defaultInputSize = 8;
    ({
      configure: function(options) {
        domains_definition = options.domains;
        isDateHTML5 = options.isDateHTML5 || isDateHTML5;
        gridSize = options.gridSize || gridSize;
        defaultLabelSize = options.labelSize;
        return defaultInputSize = options.inputSize || defaultInputSize;
      }
    });
    S4 = function() {
      return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    };
    guid = function() {
      return S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4();
    };
    fieldHelpers = {};
    fieldHelpers.process = function(property, options, context) {
      var result;
      options = options || {};
      result = {};
      fieldHelpers.processMetadatas(property, options, result, context);
      fieldHelpers.processDomain(property, options, result, context);
      return fieldHelpers.processOptions(property, options, result, context);
    };
    fieldHelpers.processOption = function(property, options, result, context) {
      var metadata, opt;
      opt = options;
      metadata = result.metadata;
      result.options = optionsHelpers.process(opt, metadata);
      return result.options;
    };
    fieldHelpers.processMetadatas = function(property, options, result, context) {
      result.metadata = metadataBuilder.getMetadataForAttribute(context, property);
      return result.metadata;
    };
    fieldHelpers.processDomain = function(property, options, result, context) {
      result.domain = domains_definition[result.metadata.domain] || {};
      return result.domain;
    };
    fieldHelpers.processInputPropertyValue = function(property, options, result, context) {
      var metadata, propValue;
      if (context[property] != null) {
        propValue = context[property];
        metadata = result.metadata;
        if (metadata.format != null) {
          propValue = metadata.format(propValue);
        }
        if (dataType === "checkbox") {
          if (propValue) {
            return 'checked';
          }
        }
        if (dataType === "date" && propValue !== "") {
          return "value='" + propValue + "'";
        } else {
          return "value='" + (_.escape(propValue)) + "'";
        }
      }
    };
    return "";
    fieldHelpers.processTranslation = function(property, options, result, context) {
      var metadata, translation, translationRoot;
      if (typeof i18n === "undefined" || i18n === null) {
        throw new Error('i18n is not defined');
      }
      metadata = result.metadata;
      translationRoot = result.options.translationRoot;
      translation = metadata.label || (context['modelName'] != null ? "" + context['modelName'] + "." + property : void 0) || "";
      if (translationRoot != null) {
        translation = ((translationRoot != null) && typeof translationRoot === "string" ? translationRoot + "." : "") + property;
      }
      result.translation = translation === "" ? "" : i18n.t(translation);
      return result.translation;
    };
    htmlHelpers = {};
    htmlHelpers.processIcon = function(property, options, result, context) {
      if (result.params.icon != null) {
        return "<span class='input-group-addon'><i class='fa fa-" + result.params.icon + "  fa-fw'></i> </span>";
      } else {
        return "";
      }
    };
    htmlHelpers.processLabel = function(property, options, result, context) {
      var opt;
      opt = result.params;
      if (opt.isNoLabel != null) {
        return "";
      } else {
        return "<label class='control-label " + opt.labelSize + "' for='" + property + "'>" + result.translation + "</label>";
      }
    };
    htmlHelpers.processErrors = function(property, options, result, context) {
      var error, errorSize, errorValue, errors;
      error = "";
      if ((this.errors != null) && (this.errors[property] != null)) {
        error = "has-error";
      }
      errorValue = (this.errors != null) && (this.errors[property] != null) ? this.errors[property] : "";
      errorSize = (function(_this) {
        return function() {
          var errorLength, offsetError;
          errorLength = gridSize - labelSizeValue;
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
      return errors();
    };
    optionsHelpers = {};
    optionsHelpers.process = function(opt, metadata) {
      var options;
      options = {
        required: optionsHelpers.required(opt, metadata),
        symbol: optionsHelpers.symbol(opt, metadata),
        dataType: optionsHelpers.dataType(opt, metadata),
        readonly: optionsHelpers.readonly(opt, metadata),
        formSize: optionsHelpers.formSize(opt, metadata),
        isNoLabel: opt.isNoLabel,
        isAddOnInput: optionsHelpers.isAddOnInput(opt, metadata),
        translationRoot: opt.translationRoot || void 0,
        icon: opt.icon
      };
      return options;
    };
    optionsHelpers.required = function(opt, metadata) {
      var required;
      required = void 0;
      if (opt.isRequired != null) {
        required = opt.isRequired ? "*" : void 0;
      } else if (metadata.required != null) {
        required = opt.isRequired ? "*" : void 0;
      }
      return required;
    };
    optionsHelpers.symbol = function(opt, metadata) {
      var symbol;
      symbol = void 0;
      if (opt.symbol != null) {
        symbol = opt.symbol;
      } else if (metadata.symbol != null) {
        symbol = metadata.symbol;
      }
      return symbol;
    };
    optionsHelpers.dataType = function(opt, metadata) {
      var dataType;
      dataType = opt.dataType || domain.type || "text";
      if (dataType === "boolean") {
        dataType = "checkbox";
      } else if (dataType === "date") {
        if (!isDateHTML5) {
          dataType = "text";
        }
      }
      return dataType;
    };
    optionsHelpers.readonly = function(opt, metadata) {
      var readonly;
      readonly = opt.readonly || false;
      return readonly = readonly ? "readonly" : "";
    };
    optionsHelpers.disabled = function(opt, metadata) {
      var disabled;
      disabled = opt.disabled || false;
      return disabled = disabled ? "disabled" : "";
    };
    optionsHelpers.formSize = function(opt, metadata) {
      var size;
      size = {};
      size.label = opt.isNoLabel ? 0 : opt.labelSize ? opt.labelSize : defaultLabelSize;
      if (opt.containerCss) {
        size.input = "";
      } else {
        size.input = gridSize - size.label;
      }
      return size;
    };
    optionsHelpers.isAddOnInput = function(opt, metadata) {
      return true || (opt.icon != null) || (opt.isRequired || metadata.required) === true || ((opt.symbol || metadata.symbol) != null);
      return size;
    };
    mod = {
      guid: guid,
      processField: process
    };
    if (isInBrowser) {
      NS.Helpers = NS.Helpers || {};
      return NS.Templates.helpers = mod;
    } else {
      return module.exports = mod;
    }
  })(typeof module === 'undefined' && typeof window !== 'undefined' ? window.Fmk : module.exports);

}).call(this);

(function() {
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


  /*
  Example call:
  	- debug the current this
  	```{{debug}}```
  	- debug a value ant the this
  	```{{debug option1="test" option2="test2"```
   */

}).call(this);

(function() {
  Handlebars.registerHelper('pick', function(val, options) {
    return options.hash[val];
  });

}).call(this);

(function() {
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


  /*
  Example call: (inside an hbs file)
  	{{t "contact.firstName"}}
   */

}).call(this);
