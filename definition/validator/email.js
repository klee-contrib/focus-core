"use strict";

var EMAIL_REGEX = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

/**
 * Email validator using a Regex.
 * @param  {string} emailToValidate - The email to validate.
 * @return {boolean} - True if the email is valide , false otherwise.
 */
module.exports = function emailValidation(emailToValidate) {
  return EMAIL_REGEX.test(emailToValidate);
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInByb2Nlc3Nvci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLElBQU0sY0FBYywySkFBcEI7O0FBRUE7Ozs7O0FBS0EsT0FBTyxPQUFQLEdBQWlCLFNBQVMsZUFBVCxDQUF5QixlQUF6QixFQUEwQztBQUN2RCxTQUFPLFlBQVksSUFBWixDQUFpQixlQUFqQixDQUFQO0FBQ0gsQ0FGRCIsImZpbGUiOiJwcm9jZXNzb3IuanMiLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCBFTUFJTF9SRUdFWCA9IC9eKChbXjw+KClbXFxdXFxcXC4sOzpcXHNAXFxcIl0rKFxcLltePD4oKVtcXF1cXFxcLiw7Olxcc0BcXFwiXSspKil8KFxcXCIuK1xcXCIpKUAoKFxcW1swLTldezEsM31cXC5bMC05XXsxLDN9XFwuWzAtOV17MSwzfVxcLlswLTldezEsM31cXF0pfCgoW2EtekEtWlxcLTAtOV0rXFwuKStbYS16QS1aXXsyLH0pKSQvO1xyXG5cclxuLyoqXHJcbiAqIEVtYWlsIHZhbGlkYXRvciB1c2luZyBhIFJlZ2V4LlxyXG4gKiBAcGFyYW0gIHtzdHJpbmd9IGVtYWlsVG9WYWxpZGF0ZSAtIFRoZSBlbWFpbCB0byB2YWxpZGF0ZS5cclxuICogQHJldHVybiB7Ym9vbGVhbn0gLSBUcnVlIGlmIHRoZSBlbWFpbCBpcyB2YWxpZGUgLCBmYWxzZSBvdGhlcndpc2UuXHJcbiAqL1xyXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGVtYWlsVmFsaWRhdGlvbihlbWFpbFRvVmFsaWRhdGUpIHtcclxuICAgIHJldHVybiBFTUFJTF9SRUdFWC50ZXN0KGVtYWlsVG9WYWxpZGF0ZSk7XHJcbn07XHJcbiJdfQ==