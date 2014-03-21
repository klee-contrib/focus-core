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