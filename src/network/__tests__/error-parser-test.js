/* global it, describe, expect */
import { manageResponseErrors as errorParser } from '../error-parsing';
import omit from 'lodash/object/omit';

const NODE_OPTS = { node: 'field1' };
const NODES_OPTS = { node: ['field1', 'field2'] };

import errorJSONResponse from './fixture/global-and-entity-error-fixture';
import errorGlobalJSONResponse from './fixture/global-error-fixture';
import errorEntityJSONResponse from './fixture/entity-error-fixture';

import { init } from '../../translation';
init({
    resources: {},
    lng: 'fr-FR'
}); // Initialise i18n


describe('# error parser ', () => {
    it.skip('should return null when there is no error', () => {
        expect(errorParser({})).toEqual(null);
    });
    it.skip('should return null when there is no status', () => {
        const response = {
            // responseJSON: {
            ...errorGlobalJSONResponse
            // }
        };
        expect(errorParser(response, NODE_OPTS)).toEqual(null);
    });
    it('should return the global error when there is one', () => {
        const response = {
            status: 422,
            // responseJSON: {
            ...errorGlobalJSONResponse
            // }
        };
        expect(errorParser(response, NODE_OPTS).globals).toEqual(errorGlobalJSONResponse.globalErrors);
    });
    it('should return the field error when they are set', () => {
        const response = {
            status: 422,
            // responseJSON: {
            ...errorEntityJSONResponse
            // }
        };
        expect(errorParser(response, NODE_OPTS)).toEqual({ globals: [], fields: errorEntityJSONResponse.fieldErrors });
    });
    it('should return the field error when multi node are passed', () => {
        const response = {
            status: 422,
            // responseJSON: {
            fieldErrors: {
                n1: { f11: 'f11E' }, n2: { f21: 'f21' }, n3: { f31: 'f31' }
            }
            // }
        };
        expect(errorParser(response, { node: ['n1', 'n2'] })).toEqual({ globals: [], fields: omit(response.fieldErrors, 'n3') });
    });
    it('shoud deal with field errors only when the http code is correct', () => {
        const response = {
            status: 1111,
            // responseJSON: {
            ...errorEntityJSONResponse
            // }
        };
        const filds = errorParser(response, NODE_OPTS).fields;
        expect(filds).toEqual(null);
    });
});
