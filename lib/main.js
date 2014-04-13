/*global window*/
(function initialization(container) {
  container.Fmk = {
    Models: {},
    Views: {},
    Services: {},
    Helpers: {},
    initialize: function initialize(options){
      this.Helpers.metadataBuilder.initialize(options);
      this.Helpers.modelValidationPromise.initialize(options);
    }
  };
})(typeof module === 'undefined' && typeof window !== 'undefined' ? window : exports);