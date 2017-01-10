import refConfigAccessor from '../../reference/config';
import keyMirror from 'keymirror';
import isEmpty from 'lodash';

/**
 * Build the reference definition from the keys registered into the definitions.
 * @returns {object} - The reference definition.
 */
function buildReferenceDefinition() {
    //Read the current configuration in the reference config.
    let referenceConf = refConfigAccessor.get();
    //Warn the user if empty.
    if (!referenceConf || isEmpty(referenceConf)) {
        console.warn('You did not set any reference list in the reference configuration, see Focus.reference.config.set.');
    }
    //Build an object from the keys.
    return keyMirror(referenceConf);
}

export default buildReferenceDefinition;
