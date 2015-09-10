/**
 * Build the cartridge store definition.
 * @return {object} - The error store component.
 */
'use strict';

module.exports = function () {
  return {
    'error': 'error',
    'success': 'success',
    'pending': 'pending',
    'cancelled': 'cancelled'
  };
};