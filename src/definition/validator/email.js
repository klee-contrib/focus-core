const EMAIL_REGEX = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

/**
 * Email validator using a Regex.
 * @param  {string} emailToValidate - The email to validate.
 * @return {boolean} - True if the email is valide , false otherwise.
 */
export default function emailValidation(emailToValidate) {
    return EMAIL_REGEX.test(emailToValidate);
}
