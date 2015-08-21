const numeral = require('numeral');

const DEFAULT_FORMAT = '0,0';

module.exports = {
    /**
     * Format a number using a given format.
     * @param  {number} number - The number to format.
     * @param  {string} format - The format to transform.
     * @return {string} - The formated number.
     */
    format(number, format) {
        format = format || DEFAULT_FORMAT;
        return numeral(number).format(format);
    }
};
