/**
 * Build the cartridge store definition.
 * @return {object} - The error store component.
 */
export default function () {
    return {
        error: 'error',
        success: 'success',
        pending: 'pending',
        cancelled: 'cancelled'
    };
}
