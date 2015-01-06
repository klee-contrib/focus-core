/*global window, _*/
(function initialization(container) {
  var fmk = container.Fmk || {};
  _.extend(fmk, {
    Models: {},
    Views: {},
    Services: {},
    Helpers: {},
    initialize: function initialize(options) {
      this.Helpers.metadataBuilder.initialize(options);
      this.Helpers.modelValidationPromise.initialize(options);
      this.Core.listMetadataParser.configure(options.listOptions);
      //this.Helpers.messageHelper.initialize();
    }
  });
  container.Fmk = fmk;
})();