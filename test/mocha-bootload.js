//Global configuration uese for tests.
require('babel/register')({
  optional: ['runtime', 'es7.asyncFunctions']
});
const chai = require('chai');
const chaiSubset = require('chai-subset');
chai.use(chaiSubset);
/*eslint-disable */
const should  = chai.should();
global.expect = require('chai').expect;
/*eslint-enable */

global.React = require('react');
global.ReactDOM = require('react-dom');
global.expect = chai.expect;
global.TestUtils = require('react-addons-test-utils');
/*eslint-disable */
//let {shallowRenderer} = TestUtils;
/*eslint-enable */

process.on('unhandledRejection', (error)=>{
    console.error('Unhandled Promise Rejection:');
    console.error(error && error.stack || error);
});
console.log('Test: bootload done');
