/*global _*/
var ArgumentInvalidException = require('./custom_exception').ArgumentInvalidException;
var ArgumentNullException = require('./custom_exception').ArgumentNullException;
//Singleton container for all the binders.
var binders = {};

function registerBinder(binder){
  if(_.isNull(binder) || !_.isObject(binder)){
    throw new ArgumentInvalidException("Binder to register should be an object and not null", binder);
  }
  if(!_.isString(binder.name)){
    throw new ArgumentInvalidException('binder name should be a string.',binder.name);
  }
  if(!_.isFunction(binder.fn)){
    throw new ArgumentInvalidException('binder value should be a function', binder.fn);
  }
  binders[binder.name] =  binder;
}

function callBinder(binderConf, value){
  if(_.isNull(binderConf) || !_.isObject(binderConf)){
    throw new ArgumentInvalidException("Binder to register should be an object and not null", binderConf);
  }
  if(!_.isString(binderConf.name)){
    throw new ArgumentInvalidException('binder name should be a string.',binderConf.name);
  }
  /*
  if(!_.isNull(binderConf.options) &&!_.isObject(binderConf.options)){
    throw new ArgumentInvalidException('binder value should be a function', binderConf.options);
  }*/
  var binder = binders[binderConf.name];
  if(_.isNull(binder)){
    throw new ArgumentNullException("The binder you are trying to call is not registered, call the registerBinder function", name);
  }
  if(!_.isFunction(binder.fn)){
    throw new ArgumentInvalidException('binder fn should be a function', binder.fn);
  }
  return binder.fn(value, binder.options);
}

/**
 * Helper to deal with the view binders.
 * The input parsed value from the form can be transform.
 * The process is html ->parse ->binder(parse)-> {}.
 * @type {{registerBinder: *, callBinder: *}}
 */
module.exports = {
  registerBinder: registerBinder,
  callBinder: callBinder
}