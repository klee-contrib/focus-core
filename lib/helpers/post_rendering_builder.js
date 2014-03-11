/*global window*/
(function(NS) {
  NS = NS || {};
  var isInBrowser = typeof module === 'undefined' && typeof window !== 'undefined';
  var metadataBuilder = isInBrowser ? NS.Helpers.metadataBuilder : require('./metadata_builder').metadataBuilder;
  var callPostRenderingForEachAttributes = function(model, viewSelector){
    //Get all the metadatas of the model.
    var metadatas = metadataBuilder.getMetadatas(model);
    //Iterate through each attributes of the model.
    for(var attr in model.attributes){
      var mdt = metadatas[attr];
      /*Check for any of the metadata.*/
      if (mdt !== undefined && mdt !== null){
        if(mdt.decorator){
          //$('[data-name:'+attr+']', viewSelector)
        }
      }
    }
  };

})(typeof module === 'undefined' && typeof window !== 'undefined' ? window.Fmk : module.exports);