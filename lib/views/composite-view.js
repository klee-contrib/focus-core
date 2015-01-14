/*global  $, _, Promise*/
"use strict";
// Filename: views/list-view.js

//var NotImplementedException = isInBrowser ? NS.Helpers.Exceptions.NotImplementedException : require('../helpers/custom_exception').NotImplementedException;
var ConsultEditView = require('./consult-edit-view');
var errorHelper = require('../helpers/error_helper');
var utilHelper = require('../helpers/util_helper');
var ArgumentNullException = require("../helpers/custom_exception").ArgumentNullException;
var ArgumentInvalidException = require("../helpers/custom_exception").ArgumentInvalidException;
var ModelValidator = require('../helpers/model_validation_promise');

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
    isListeningToModelChange: false,
    isGlobalLoading: false
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
    //register all views of the composite
    this.initViews();

    //manage global loading on the composite : must be executed after registering all views
    if(this.opts.isGlobalLoading){
      //re dispatch on save
      this.opts.isForceReload = false;
      if (this.model.getId() !== undefined && this.model.getId() !== null) {
        var view = this;
        this.getModelSvc(this.model.getId()).then(
            function (infoData) {
              view.dispatchModels(view,infoData);
            }, function error(err) {
              console.error(err);
            }
        );
      }
    }
  },

  initViews : function initViews(){
  },

  /**
   * Dispatch models into each views of the composite.
   * @param context execution context
   * @param data data to dispatch
   */
  dispatchModels: function dispatchModels(context,data){
    _.each(context.viewsConfiguration, function (viewConfig) {
      context[viewConfig.name].model.set(data[viewConfig.modelProperty]);
    }, this);
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
    "click .panel-heading": "toggleCollapse",
    //Edition events
    "click button.btnEdit": "toggleEditMode",
    "click button[type='submit']": "save",
    "click button.btnCancel": "cancelEdition",
    "click button[data-loading]": "loadLoadingButton",
    "click button.btnDelete": "deleteItem"
  },
  // Get the data to give to the template.
  getRenderData: function getRenderDataCompositeView() {
    return _.extend({}, {
      listUrl: this.opts.listUrl
    }, this.additionalData());
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
  /**
   * Toggle the main view and each sub view into the edit/consult mode.
   * @return {[type]} [description]
   */
  toggleEditMode: function toggleEditModeCompositeView() {
    ConsultEditView.prototype.toggleEditMode.apply(this);
    //Render each view inside the configuration.
    for (var i = 0, l = this.viewsConfiguration.length; i < l; i++) {
      var vConf = this.viewsConfiguration[i];
      //Render each view inside its selector.
      this[vConf.name].toggleEditMode();
    }
  },
  /**
   * Bind the form to the model [model or collection].
   * @return {undefined}
   */
  bindToModel: function bindToModelCompositeView() {
    var compoView = this;
    for (var i = 0, l = compoView.viewsConfiguration.length; i < l; i++) {
      var viewConf = compoView.viewsConfiguration[i];
      compoView[viewConf.name].bindToModel();
    }
    this.model.set(this.buildJSONToSave());
  },
  /**
   * Save action on the composite view.
   * @param  {event} - jQuery event of the action.
   * @return {undefined}
   */
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
                errorHelper.setModelErrors(compoView[vConf.name].model, {
                  fieldErrors: errors
                });
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
    var promisesContainer = _.union(promisesValidationContainer, compoView.businessValidationPromises());
    //Resolve all validation promise inside the page.
    Promise.all(promisesContainer)
      .then(function (success) {
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

  //Method called when the save action is on success
  saveSuccess: function saveSuccessComposite(jsonModel) {
    if(this.opts.isGlobalLoading){
      this.dispatchModels(this,jsonModel);
      this.toggleEditMode();
    }else{
      ConsultEditView.prototype.saveSuccess.call(this, jsonModel);
    }
  },

  //Cancel the edition.
  cancelEdition: function cancelEditionCompositeView() {
    // cancelEdit on composite = ToggleEdit on compositeView only + cancelEdit on each child view.

    if (this.isCreateMode()) {
      ConsultEditView.prototype.cancelEdition.call(this);
    } else {
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
module.exports = CompositeView;