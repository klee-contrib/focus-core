import numeral from 'numeral';
// see http://numeraljs.com
const DEFAULT_FORMAT = '0,0';

/**
* Format a number using a given format.
* @param  {number} number - The number to format.
* @param  {string} format - The format to transform.
* @return {string} - The formated number.
*/
function format(number, format) {
    return numeral(number).format(format);
}

/**
 * Initialize numeral locale and default format.
 * 
 * @param {string} [format='0,0'] format to use 
 * @param {string} [locale='fr'] locale to use
 */
function init(format = DEFAULT_FORMAT, locale = 'fr') {
    numeral.locale(locale);
    numeral.defaultFormat(format);
}

export default {
    init,
    format
};

export {
    init,
    format
};