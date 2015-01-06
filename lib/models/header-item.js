/*global Backbone*/

"use strict";
//Filename: models/headerItems.js

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


module.exports = HeaderItem;