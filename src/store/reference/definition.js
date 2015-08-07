var refConfigAccessor = require('../../reference/config');
var keyMirror = require('keymirror');
var isEmpty = require('lodash/lang/isEmpty');

/**
 * Build the reference definition from the keys registered into the definitions.
 * @returns {object} - The reference definition.
 */
function buildReferenceDefinition(){
  //Read the current configuration in the reference config.
  var referenceConf = refConfigAccessor.get();
  //Warn the user if empty.
  if(!referenceConf || isEmpty(referenceConf)){
    console.warn('You did not set any reference list in the reference configuration, see Focus.reference.config.set.');
  }
  //Build an object from the keys.
  return keyMirror(referenceConf);
}

module.exports = buildReferenceDefinition;
