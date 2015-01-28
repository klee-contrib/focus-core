/**
 * Focus initialization function.
 * @param options - options to initialize.
 */
module.exports = function initializeFocus(options) {
  require('./core/list_metadata_parser').configure(options);
  require('./helpers/metadata_builder.coffee').metadataBuilder.initialize(options);
  require('./helpers/model_validation_promise').initialize(options);
  require('./config').configure(options);
}