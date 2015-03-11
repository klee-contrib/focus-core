/**
 * Classe standing for custom exception.
 */
class CustomException extends Error{
  constructor(name, message, options){
    super(message);
    this.name = name;
    this.options = options;
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
  /*toJSON(){
    return {"name": this.name, "message": this.message,  "options": this.options};
  }*/
}


module.exports = CustomException;
