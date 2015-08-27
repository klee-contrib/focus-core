'use strict';

var numeral = require('numeral');

var DEFAULT_FORMAT = '0,0';

module.exports = {
    /**
     * Format a number using a given format.
     * @param  {number} number - The number to format.
     * @param  {string} format - The format to transform.
     * @return {string} - The formated number.
     */
    format: function format(number, _format) {
        _format = _format || DEFAULT_FORMAT;
        return numeral(number).format(_format);
    }
};