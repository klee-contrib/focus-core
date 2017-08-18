import compile from 'lodash/string/template';
/**
* Process an url in order to build them.
*/
export default function (url, data) {
    return compile(url)(data);
}
