/**
 * Spec for number validation options
 */
export interface MinMax {
    min?: number;
    max?: number;
}

/**
 * Spec for string validation options
 */
export interface MinMaxLength {
    minLength?: number;
    maxLength?: number;
}

/**
 * Spec for validation property
 */
export interface ValidationProperty {
    name: string;
    value: string;
}

/**
 * Validator {}
 */
export interface Validator {
    options: MinMax | MinMaxLength | {};
    type: string;
    value?: (param: any, {}) => boolean;
}

/**
 * ValidatorStatus {}
 */
export interface ValidationStatus {
    name: string;
    value: string;
    isValid: boolean;
    errors: {};
}

/**
 * Returns true is the date is valid, false otherwise.
 * @param dateToValidate    The date to validate.
 * @param options           The validator options.
 */
export function date(dateToValidate: string | Date, options: {}): boolean

/**
 * Returns true is the email is valid, false otherwise.
 * @param dateToValidate    The email to validate.
 */
export function email(emailtoValidate: string): boolean

/**
 * Returns true is the number is valid, false otherwise.
 * @param numberToValidate  The number to validate.
 * @param options           The validator options.
 */
export function number(numberToValidate: number, options: MinMax): boolean

/**
 * Returns true is the string is valid, false otherwise.
 * @param stringToTest  The number to validate.
 * @param options       The validator options.
 */
export function stringLength(stringToTest: number, options: MinMaxLength): boolean

/**
 * Validate a property with given validators and returns the validation status.
 * @param property      Property to validate.
 * @param validators    The validators to apply on the property.
 */
export function validate(property: ValidationProperty, validators: Array<Validator>): ValidationStatus