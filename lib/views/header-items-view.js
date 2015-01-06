/* global Backbone, $*/
"use strict";
//Filename: views/header-items-view.js

//Template for the header items.
var template = require('../templates/hbs/headerItems.hbs');

//View for the header items.
var headerItemsView = Backbone.View.extend({

  //Default template.
  template: template,
  //Options for the param.
  paramOptions: {
    selector: "div#titleContainer",
    template: function () {
      console.warn('no template define for your param....')
    }
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
  render: function renderHeaderItems() {
    var parentName = this.model.processParentName();
    this.$el.html(this.template({headerItems: this.model.toActiveJSON(), parentName: parentName}));

    if (this.levelParams !== undefined && parentName !== undefined && this.levelParams[parentName] !== undefined) {
      $(this.paramOptions.selector, this.$el).html(this.paramOptions.template(this.levelParams[parentName]));
    }
    return this;
  },

  //Hide the view.
  hide: function hide() {
    this.model.currentActiveName = undefined;
    this.$el.html(null);
  }
});


module.exports = headerItemsView;