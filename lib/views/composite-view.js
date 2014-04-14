/*global Backbone, i18n, $, window, _*/
"use strict";
(function (NS) {
    // Filename: views/list-view.js
    NS = NS || {};
    var isInBrowser = typeof module === 'undefined' && typeof window !== 'undefined';
    //var NotImplementedException = isInBrowser ? NS.Helpers.Exceptions.NotImplementedException : require('../helpers/custom_exception').NotImplementedException;
    var _url = isInBrowser ? NS.Helpers.urlHelper : require('../helpers/url_helper');
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
        viewsConfiguration: [],

        //Initialize function of the composite view.
        initialize: function initializeCompositeView(options) {
            options = options || {};
            ConsultEditView.prototype.initialize.call(this, options);
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
            //Should a test on the selector be added^in order to know if it's in the dom? 

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
            if (type !== "model" || type !== "collection") {
                throw new ArgumentInvalidException("viewconfiguration.type must be a model or a collection.", viewConfiguration);
            }
            if (typeof viewConfiguration.modelProperty !== "string") {
                throw new ArgumentInvalidException("viewconfiguration.modelProperty must be a string.", viewConfiguration);
            }
            this.viewsConfiguration.push(viewConfiguration);
            //this["render"+viewConfiguration.name] = function(){ this[viewConfiguration.name].render();}
        },

        //Register many views by calling each time the registerViews.
        registerViews: function (viewsConfigurations) {
            //If the view is not an array.
            if (!_.isArray(viewsConfigurations)) {
                throw new ArgumentInvalidException("viewconfigurations must be an array.", viewConfigurations);
            }
            for (var i = 0, l = viewsConfigurations.length; i < l ; i++) {
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
                this.viewsConfiguration = _.reject(this.viewsConfiguration, function (viewConf) { return viewConf.name === viewName });
            }
        },

        //Events handle by the view.
        events: {
            "click .panel-heading": "toogleCollapse",
            //Edition events
            "click button.btnEdit": "edit",
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
            for (var i = 0, l = this.viewsConfiguration.length; i < l ; i++) {
                var vConf = this.viewsConfiguration[i];
                //Render each view inside its selector.
                $(vConf.selector, this.$el).html(this[vConf.name].render().el);
            }

            //this.delegateEvents();
            return this;
        },
        toggleEditMode: function toggleEditModeCompositeView() {
            //Render each view inside the configuration.
            for (var i = 0, l = this.viewsConfiguration.length; i < l ; i++) {
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
            for (var i = 0, l = this.viewsConfiguration.length; i < l ; i++) {
                if (vconf.type === "model") {
                    //Bind the model.
                    form_helper.formModelBinder({
                        inputs: $(vConf.selector + ' input', this[vConf.name].$el),
                        options: $(vConf.selector + ' select', this[vConf.name].model.$el)
                    }, this[vConf.name].model);
                    promisesContainer.push(
                        ModelValidator.validate(compoView[vConf.name].model).then(
                            null,
                            function (errors) {
                                errorHelper.setModelErrors(compoView[vConf.name].model, errors);
                            }
                        )
                    );

                } else {
                    //Bind the collection.
                    form_helper.formCollectionBinder(
                       $(this.opts.collectionSelector, this[vConf.name].$el),
                       this[vConf.name].model
                    );

                    //Push promises inside the container.
                    promisesContainer.push(
                        ModelValidator.validateAll(compoView[vConf.name].model).then(
                            null,
                            function (errors) {
                                errorHelper.setCollectionErrors(compoView[vConf.name].model, errors);
                            }
                        )
                    );
                }
            }
            Promise.all(promisesContainer).then(function (success) {
                //Save the collection
                var jsonToSave = compoView.buildJSONToSave();
                compoView.saveModelSvc();
            }, function (error) {
                console.error();
            });
        },
        //Build the json from differents models.
        buildJSONToSave: function () {
            var json = {};
            for (var i = 0, l = this.viewsConfiguration.length; i < l ; i++) {
                json.viewsConfiguration[i].modelProperty = this[viewsConfiguration[i].name].model.toSaveJSON();
            }
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
