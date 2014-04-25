/*global i18n, _, window*/
(function(NS) {
  "use strict";
  //Filename: helpers/user_helper.js
  var isInBrowser = typeof module === 'undefined' && typeof window !== 'undefined';
  var t = i18n.t || function(s){return s;};
  var ArgumentInvalidException = isInBrowser ? NS.Helpers.Exceptions.ArgumentInvalidException : require("./custom_exception").ArgumentInvalidException;
  //var siteDescriptionHelper = isInBrowser ? NS.Helpers.siteDescriptionHelper : require("./site_description_helper");
  //Setting the default user configuration.
  var userConfiguration = {
    cultureCode: "en-US", //Culture code.
    name: t('default.name'), //User default name.
    timeZone: "us",  //TimeZoneName
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
    //If the roles are redefine
    if(configurationElements !== undefined && _.isArray(configurationElements.roles)){
      console.warn('The roles have change, the site description should be reload.');
      //Attention si les roles sont redéfinis il faut rafraîchir le plan du site.
      //siteDescriptionHelper.regenerateRoutes();
    }
    isLoadedOnce = true;
    return getUserInformations();
  };

  // Load the users informations from a promise which is given in arguments.
  var loadUserInformations = function loadUserInformations(promiseOfLoading) {
    return promiseOfLoading.then(function successLoading(loadedConfiguration) {
      configureUserInformations(loadedConfiguration);
    });
  };

  //Test it the user has the given role in parameter.
  var hasRole = function hasRole(role){
    return _.contains(userConfiguration.roles, role);
  };

  //Test if the user has one of the role given in argument.
  //_roles_ should be an array.
  var hasOneRole = function hasOneRole(roles){
    if(!_.isArray(roles)){
      throw new ArgumentInvalidException("The roles should be an array", roles);
    }
    return _.intersection(userConfiguration.roles, roles).length > 0;
  };

  var userHelper = {
    loadUserInformations: loadUserInformations,
    getUserInformations: getUserInformations,
    configureUserInformations: configureUserInformations,
    hasRole: hasRole,
    hasOneRole: hasOneRole
  };
  // Differenciating export for node or browser.
  if (isInBrowser) {
    NS.Helpers = NS.Helpers || {};
    NS.Helpers.userHelper = userHelper;
  } else {
    module.exports = userHelper;
  }
})(typeof module === 'undefined' && typeof window !== 'undefined' ? window.Fmk : module.exports);