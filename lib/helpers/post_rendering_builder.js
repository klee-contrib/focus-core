/* global $ */
"use strict";
//Filename: post_rendering_builder.js
var metadataBuilder = require('./metadata_builder').metadataBuilder;
var postRenderingHelper = require('./post_rendering_helper');
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
module.exports = postRenderingBuilder;