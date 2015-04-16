/**
 * Classe standing for custom exception.
 */
class CustomException extends Error{
  constructor(name, message, options){
    super();
    if (Error.hasOwnProperty('captureStackTrace')){
      Error.captureStackTrace(this, this.constructor);
    } else{
      Object.defineProperty(this, 'stack', {
        value: (new Error()).stack
      });
    }
    Object.defineProperty(this, 'message', {
      value: message
    });
    this.options = options;
  }
  get name () {
    return this.constructor.name;
  }
  /**
   * Log the exception in the js console.
   */
  log(){
    console.error("name", this.name, "message", this.message, "options", this.options);
  }
  /**
   * JSONify the exception.
   */
  toJSON(){
    return {"name": this.name, "message": this.message,  "options": this.options};
  }
}



module.exports = CustomException;
