/*global window, $*/
(function(NS) {
  NS = NS || {};
  var isInBrowser = typeof module === 'undefined' && typeof window !== 'undefined';
  var metadataBuilder = isInBrowser ? NS.Helpers.metadataBuilder : require('./metadata_builder').metadataBuilder;
  var postRenderingHelper = isInBrowser ? NS.Helpers.postRenderingHelper : require('./post_rendering_helper').metadataBuilder;
  //Options must contain a model and a viewSelecrot property.
  var postRenderingBuilder = function(options) {
    //Get all the metadatas of the model.
    var metadatas = metadataBuilder.getMetadatas(options.model);
    //Iterate through each attributes of the modoptions.modelel.
    for (var attr in options.model.attributes) {
      var mdt = metadatas[attr];
      /*Check for any of the metadata.*/
      if (mdt !== undefined && mdt !== null) {
        if (mdt.decorator) {
          postRenderingHelper.callHelper({helperName: mdt.decorator, selector: $('[data-name=' + attr + ']', options.viewSelector)});
          //$('[data-name:'+attr+']', viewSelector)
        }
      }
    }
  };
   if (isInBrowser) {
    NS.Helpers = NS.Helpers || {};
    NS.Helpers.postRenderingBuilder = postRenderingBuilder;
  } else {
    module.exports = postRenderingBuilder;
  }

})(typeof module === 'undefined' && typeof window !== 'undefined' ? window.Fmk : module.exports);