import numeral from 'numeral';

const DEFAULT_FORMAT = '0,0';

//TODO change numeral lib and regroup initializers
function language(key, conf) {
    return numeral.language(key, conf);
};

/**
* Format a number using a given format.
* @param  {number} number - The number to format.
* @param  {string} format - The format to transform.
* @return {string} - The formated number.
*/
function format(number, format) {
    format = format || DEFAULT_FORMAT;
    return numeral(number).format(format);
}

module.export {
    format,
    language
}


