//Global configuration uese for tests.
require('babel/register')({
  optional: ['runtime', 'es7.asyncFunctions']
});
let chai = require('chai');
let chaiSubset = require('chai-subset');
chai.use(chaiSubset);
/*eslint-disable */
let should  = chai.should();
global.expect = require('chai').expect;
/*eslint-enable */

let React = require('react/addons');
let TestUtils = React.addons.TestUtils;
/*eslint-disable */
//let {shallowRenderer} = TestUtils;
/*eslint-enable */

process.on('unhandledRejection', (error)=>{
    console.error('Unhandled Promise Rejection:');
    console.error(error && error.stack || error);
});
