/*global Backbone, _, window */
(function(NS) {
  NS = NS || {};
  var isInBrowser = typeof module === 'undefined' && typeof window !== 'undefined';
  var postRenderingBuilder = isInBrowser ? NS.Helpers.postRenderingBuilder : require('../helpers/post_rendering_builder');
  //View which is the default view for each view.
  //This view is able to deal with errors and to render the default json moodel.
  var CoreView = Backbone.View.extend({
    //The handlebars template has to be defined here.
    template: function emptyTemplate(json) {
      return "<p>Your template has to be implemented.</p>"
    }, // Example: require('./templates/coreView')
    //Defaults events.
    events: {
      "focus input": "inputFocus", //Deal with the focus in the field.
      "blur input": "inputBlur" //Deal with the focus out of the field.
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
    //Render function  by default call the getRenderData and inject it into the view dom element.
    render: function renderCoreView() {
      this.$el.html(this.template(this.getRenderData()));
      _.defer(this.afterRender, this);
      return this;
    },
    afterRender: function afterRenderCoreView(currentView) {
      postRenderingBuilder({model: currentView.model, viewSelector: currentView.$el});
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