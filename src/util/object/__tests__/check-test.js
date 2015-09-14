/*global it, describe, expect*/

const ArgumentInvalidException = require('../../../exception/argument-invalid-exception');

describe('### object validation', ()=>{
    it('An empty object should wokks', ()=>{
        const checkObject = require('../check');
        //console.log('checkObjet', checkObject);
        expect(checkObject('propertyName', {})).to.equal(undefined);
    });
    it('A string shoud be invalid', ()=>{
        const checkObject = require('../check');
        expect(()=>{checkObject('propertyName', 'aaaaa'); }).to.throw(ArgumentInvalidException, 'propertyName should be an object');
    });
    it('A number shoud be invalid', ()=>{
        const checkObject = require('../check');
        expect(()=>{checkObject('propertyName', 123); }).to.throw(ArgumentInvalidException, 'propertyName should be an object');
    });
});
