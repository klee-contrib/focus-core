/*global Backbone,  _*/

"use strict";
//Filename: models/menuItems.js
var HeaderItem = require('./header-item');

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
  processParentName: function () {
    if (this.currentActiveName === undefined) {
      return;
    }
    var splitName = this.currentActiveName.split('.');
    var res = '';
    for (var i = 0, l = splitName.length - 1; i < l; i++) {
      res = res + splitName[i] + '.';
    }
    if (res !== '') {
      res = res.slice(0, -1);
    }
    return res;
  },
  //Define which part of the json is active.
  toActiveJSON: function toActiveJSON() {
    if (this.currentActiveName === undefined) {
      return;
    }
    var splitName = this.currentActiveName.split('.');
    var res = '';
    for (var i = 0, l = splitName.length - 1; i < l; i++) {
      res = res + splitName[i] + '.';
    }
    if (res !== '') {
      res = res.slice(0, -1);
    }
    return _.filter(this.toJSON(), function (element) {
      return element.name.indexOf(res) === 0;
    });
  }
});


module.exports = HeaderItems;