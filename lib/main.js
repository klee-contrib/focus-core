/*global window*/
(function initialization(container) {
  container.Fmk = {
    Models: {},
    Views: {},
    Services: {},
    Helpers: {},
    initialize: function initialize(options){
      this.Helpers.metadataHelper.initialize(options);
      this.Helpers.modelValidationPromiseHelper.initialize(options);
    }
  };
})(typeof module === 'undefined' && typeof window !== 'undefined' ? window : exports);