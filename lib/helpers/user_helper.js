/*global i18n, _, window*/
(function(NS) {
  "use strict";
  //Filename: helpers/user_helper.js
  var isInBrowser = typeof module === 'undefined' && typeof window !== 'undefined';
  var t = i18n;
  //Setting the default user configuration.
  var userConfiguration = {
    cultureCode: "en-US", //Culture code.
    name: t('default.name'), //User default name.
    timeZone: "france",  //TimeZoneName
    roles: [], //User role lists.,
    routes: []
  };

  //State variable in order to know if it has been loaded once.
  var isLoadedOnce = false;

  //Call this method in order to get a clone of the user informations.
  var getUserInformations = function getConfiguration() {
    return _.clone(userConfiguration);
  };

  //Call this method in order to extend the default user configuration.
  // Only the defined elements will be overriden.
  //Example `configureUserInformations({cultureCode: "fr-FR", timeZone: "uk"})`
  // Result `{{  cultureCode: "fr-FR",  name: default.name,  timeZone: "uk"}`
  var configureUserInformations = function configureUserInformations(configurationElements) {
    _.extend(userConfiguration, configurationElements);
    isLoadedOnce = true;
  };

  // Load the users informations from a promise which is given in arguments.
  var loadUserInformations = function loadUserInformations(promiseOfLoading) {
    return promiseOfLoading.then(function successLoading(loadedConfiguration) {
      configureUserInformations(loadedConfiguration);
    });
  };

  var userHelper = {
    loadUserInformations: loadUserInformations,
    getUserInformations: getUserInformations,
    configureUserInformations: configureUserInformations
  };
  // Differenciating export for node or browser.
  if (isInBrowser) {
    NS.Helpers = NS.Helpers || {};
    NS.Helpers.userHelper = userHelper;
  } else {
    module.exports = userHelper;
  }
})(typeof module === 'undefined' && typeof window !== 'undefined' ? window.Fmk : module.exports);