/*global expect, it, describe*/
// __tests__/container-test.js


describe('### domain container', ()=>{
    it('domain should be empty by default', ()=>{
        const domainContainer = require('../container');
        expect(domainContainer.getAll()).to.deep.equal({});
    });
    it('domain set should add a domain', ()=>{
        const domainContainer = require('../container');
        const doText = {name: 'DO_TEXT', type: 'string'};
        domainContainer.set(doText);
        expect(domainContainer.getAll().DO_TEXT).to.deep.equal(doText);
    });


});
/*it('wrong domain set should throw an exception', function() {
const domainContainer = require('../container');
const doText = 'Roberto';
expect( function(){ domainContainer.set(doText);}).toThrow(new Error('domain.name should extists and be a string'));
});*/
