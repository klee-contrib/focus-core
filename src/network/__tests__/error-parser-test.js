/* global it, describe, expect */
import errorParsing from '../error-parsing';
const {manageResponseErrors: errorParser} = errorParsing;
const NODE_OPTS = {node: 'field1'};
const NODES_OPTS = {node: ['field1', 'field2']};

import errorJSONResponse from './fixture/global-and-entity-error-fixture';
import errorGlobalJSONResponse from './fixture/global-error-fixture';
import errorEntityJSONResponse from './fixture/entity-error-fixture';
describe.only('# error parser ', ()=>{
    it('should return null when there is no error', ()=>{
        expect(errorParser({})).to.equal(null);
    });
    it('should return null when there is no status', ()=>{
        const response = {
            responseJSON: {
                ...errorGlobalJSONResponse
            }
        };
        expect(errorParser(response, NODE_OPTS)).to.equal(null);
    });
    it('should return the global error when there is one', ()=>{
        const response = {
            status: 422,
            responseJSON: {
                ...errorGlobalJSONResponse
            }
        };
        expect(errorParser(response, NODE_OPTS).globals).to.eql(errorGlobalJSONResponse.globalErrors);
    });
    it('should return the field error when thhey are set', ()=>{
        const response = {
            status: 422,
            responseJSON: errorEntityJSONResponse
        };
        expect(errorParser(response, NODE_OPTS)).to.eql({globals: [], fields: errorEntityJSONResponse.fieldErrors });
    });
    it.skip('shoud deal with field errors only when the http code is correct', ()=>{
        const response = {
            status: 1111,
            responseJSON: errorEntityJSONResponse
        };
        const filds = errorParser(response, NODE_OPTS).fields;
        expect(filds).to.equal(null);
    });
});
