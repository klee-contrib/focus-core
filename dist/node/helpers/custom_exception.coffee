#global $, _
((NS)->
  NS = NS or {}
  isInBrowser = if typeof module is 'undefined' and typeof window isnt 'undefined' then window.Fmk else module.exports
  # Exception class
  class CustomException
    constructor:(@name, @message,@options)->
    log:->
      console.log("name", @name, "message", @message, "options", @options)
  # Exception for a not implemented method.
  class NotImplementedException extends CustomException
    constructor:(message, options)->
      super("NotImplementedException", message, options)
  # Exception class for an argument null exeption.
  class ArgumentNullException extends CustomException
    constructor:(message)->
      super("ArgumentNull", message)
  # Exception for a invalid argument exeption
  class ArgumentInvalidException extends CustomException
    constructor:(message, options)->
      super("ArgumentInvalidException", message, options)
  class DependencyException extends CustomException
    constructor:(message)->
      super("DependencyException", message)
  mod = {
    CustomException: CustomException
    NotImplementedException: NotImplementedException
    ArgumentNullException: ArgumentNullException
    ArgumentInvalidException: ArgumentInvalidException
  }
  if isInBrowser
    NS.Helpers = NS.Helpers or {}
    NS.Helpers.Exceptions = mod
  else
    module.exports = mod
)(if typeof module is 'undefined' and typeof window isnt 'undefined' then window.Fmk else module.exports)