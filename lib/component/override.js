'use strict';

module.exports = function (fn, args, context) {
  context = context || this;
  if (context.fn) {
    console.log('test');
  }
};