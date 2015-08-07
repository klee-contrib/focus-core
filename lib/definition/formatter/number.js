'use strict';

var numeral = require('numeral');

var DEFAULT_FORMAT = '0,0';

module.exports = {
    format: function format(number, _format) {
        _format = _format || DEFAULT_FORMAT;
        return numeral(number).format(_format);
    }
};