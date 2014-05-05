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

    //Initialize the header view.
    initialize: function initializeHeaderItemsView(options) {
      options = options || {};
      this.listenTo(this.model, 'change', this.render);
    },
    
    //Render all the headers items.
    render: function renderHeaderItems(){
        this.$el.html(this.template({headerItems: this.model.toActiveJSON()}));
        return this;
    },

    //Hide the view.
    hide: function hide(){
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