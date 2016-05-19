/**
 * Class standing for the ArgumentInvalid exception.
 */
export class ArgumentInvalidException extends CustomException {

    /**
     * Exception constructor.
     * @param message Exception message.
     * @param options {} to add to the exception.
     */
    constructor(message: string, options: {})
}

/**
 * Class standing for the ArgumentNull exception.
 */
export class ArgumentNullException extends CustomException {

    /**
     * Exception constructor.
     * @param message Exception message.
     * @param options {} to add to the exception.
     */
    constructor(message: string, options: {})
}

/**
 * Class standing for custom exception.
 */
export class CustomException implements Error {

    // Properties
    message: string;
    name: string;

    /**
     * Exception constructor.
     * @param name    Exception name.
     * @param message Exception message.
     * @param options {} to add to the exception.
     */
    constructor(name: string, message: string, options: {})

    /**
     * Log the exception in the js console.
     */
    log(): void

    /**
     * Jsonify the exception.
     */
    toJSON(): {}
}

/**
 * Class standing for the Dependency exception.
 */
export class DependencyExcepton extends CustomException {

    /**
     * Exception constructor.
     * @param message Exception message.
     * @param options {} to add to the exception.
     */
    constructor(message: string, options: {})
}

/**
 * Class standing for the Focus exception.
 */
export class FocusException extends CustomException {

    /**
     * Exception constructor.
     * @param message Exception message.
     * @param options {} to add to the exception.
     */
    constructor(message: string, options: {})
}

/**
 * Class standing for the NotImplemented exception.
 */
export class NotImplementedException extends CustomException {

    /**
     * Exception constructor.
     * @param message Exception message.
     * @param options {} to add to the exception.
     */
    constructor(message: string, options: {})
}