//Dependencies.
var CoreStore = require('../CoreStore');
var buildDefinition = require('./definition');
/**
 * Class standing for the reference store.
 */
class ReferenceStore extends CoreStore {


  constructor(conf){
    conf = conf || {};
    conf.definition = conf.definition || buildDefinition();
    super(conf);
  }
  getReference(names){
    var refs = {};
    names.map((name)=>{
      if(this.data.has(name)){
        refs[name] = this.data.get(name);
      }
    });
    return {references: this.data.toJS()};
  }
  setReference(){}

}

module.exports = ReferenceStore;
