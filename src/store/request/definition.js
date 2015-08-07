/**
 * Build the cartridge store definition.
 * @return {object} - The error store component.
 */
module.exports = function(){
  return {
    'error': 'error',
    'success': 'success',
    'pending': 'pending',
    'cancelled': 'cancelled'
  };
};
