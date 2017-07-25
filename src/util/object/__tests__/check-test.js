/*global it, describe, expect*/

import ArgumentInvalidException from '../../../exception/argument-invalid-exception';
import checkObject from '../check';

describe('### object validation', () => {
    it('An empty object should wokks', () => {
        //console.log('checkObjet', checkObject);
        expect(checkObject('propertyName', {})).to.equal(undefined);
    });
    it('A string shoud be invalid', () => {
        expect(() => { checkObject('propertyName', 'aaaaa'); }).to.throw(/*ArgumentInvalidException,*/ 'propertyName should be an object');
    });
    it('A number shoud be invalid', () => {
        expect(() => { checkObject('propertyName', 123); }).to.throw(/*ArgumentInvalidException, */'propertyName should be an object');
    });
});
