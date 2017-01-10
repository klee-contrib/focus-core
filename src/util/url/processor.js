import { template } from 'lodash';
/**
* Process an url in order to build them.
*/
function processor(url, data) {
    return template(url)(data);
}

export default processor;