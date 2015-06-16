let numeral = require('numeral');

const DEFAULT_FORMAT = '0,0';

module.exports = {
    format(number, format) {
        format = format || DEFAULT_FORMAT;
        return numeral(number).format(format);
    }
};
