/*global expect, it, describe*/
// __tests__/container-test.js

import domainContainer from '../container';

describe('### domain container', () => {
    it('domain should be empty by default', () => {
        expect(domainContainer.getAll()).toEqual({});
    });
    it('domain set should add a domain', () => {
        const doText = { name: 'DO_TEXT', type: 'string' };
        domainContainer.set(doText);
        expect(domainContainer.getAll().DO_TEXT).toEqual(doText);
    });


});
/*it('wrong domain set should throw an exception', function() {
const domainContainer = require('../container');
const doText = 'Roberto';
expect( function(){ domainContainer.set(doText);}).toThrow(new Error('domain.name should extists and be a string'));
});*/
