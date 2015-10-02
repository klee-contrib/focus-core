/* global it, describe, expect */
import errorParsing from '../error-parsing';
const {manageResponseErrors: errorParser} = errorParsing;
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
        expect(errorParser(response)).to.equal(null);
    });
    it.skip('should return the global error when there is one', ()=>{
        const response = {
            status: 422,
            responseJSON: {
                ...errorGlobalJSONResponse
            }
        };
        expect(errorParser(response)).to.equal();
    });
    it('should return the field error when thhey are set', ()=>{
        const response = {
            status: 422,
            responseJSON: errorEntityJSONResponse
        };
        expect(errorParser(response)).to.equal({fields: errorEntityJSONResponse.fieldErrors});
    });
    it('shoud deal with field errors only when the http code is correct', ()=>{
        const response = {
            status: 622,
            responseJSON: errorEntityJSONResponse
        };
        expect(errorParser(response.fields)).to.equal(null);
    });
    it('should return the field error when thhey are set', ()=>{

    });
});
