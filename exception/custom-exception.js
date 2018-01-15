/**
* Classe standing for custom exception.
* @see https://gist.github.com/daliwali/09ca19032ab192524dc6
*/
class CustomException extends Error {
    constructor(name, message, options) {
        super();
        if (Error.hasOwnProperty('captureStackTrace')) {
            Error.captureStackTrace(this, this.constructor);
        } else {
            Object.defineProperty(this, 'stack', {
                value: (new Error()).stack
            });
        }
        Object.defineProperty(this, 'message', {
            value: message
        });
        this.options = options;
    }
    get name() {
        return this.constructor.name;
    }
    /**
    * Log the exception in the js console.
    */
    log() {
        console.error('name', this.name, 'message', this.message, 'options', this.options);
    }
    /**
     * Jsonify the exception.
     * @return {object} - The json exception.
     */
    toJSON() {
        const { name, message, options } = this;
        return { name, message, options };
    }
}

export default CustomException;
