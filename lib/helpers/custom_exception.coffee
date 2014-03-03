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
module.exports=
	CustomException: CustomException
	NotImplementedException: NotImplementedException
	ArgumentNullException: ArgumentNullException
	ArgumentInvalidException: ArgumentInvalidException