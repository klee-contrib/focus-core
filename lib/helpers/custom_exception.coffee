#global $, _
  "use strict"
  # Filename: helpers/error_helper.js */
  # Exception class
  ###
   * Creates a new CustomException.
   * @class Exception class.
  ###
  class CustomException
    # @constructor
    constructor:(@name, @message,@options) ->
      @log()
    #Log the content of the exception.
    log: ->
      console.error("name", @name, "message", @message, "options", @options)
    # JSONify the content of the exception.
    toJSON:->
      return {"name": @name, "message": @message,  "options": @options}
  # Exception for a not implemented method.
  class NotImplementedException extends CustomException
    constructor:(message, options) ->
      super("NotImplementedException", message, options)
  # Exception class for an argument null exeption.
  class ArgumentNullException extends CustomException
    constructor:(message) ->
      super("ArgumentNull", message)
  # Exception for a invalid argument exeption
  class ArgumentInvalidException extends CustomException
    constructor:(message, options) ->
      super("ArgumentInvalidException", message, options)
  class DependencyException extends CustomException
    constructor:(message, options) ->
      super("DependencyException", message, options)
  mod = {
    CustomException: CustomException
    NotImplementedException: NotImplementedException
    ArgumentNullException: ArgumentNullException
    ArgumentInvalidException: ArgumentInvalidException
    DependencyException: DependencyException
  }
  module.exports = mod