const ALL = 'ALL';
module.exports = function(config){
  return function(options){
    options = options || {};
    let {scope, query} = options.criteria; //Cannot be read from the store ?
    if(scope === ALL){
      //Call the search action.
    }else{
      //The search is unscoped.

      
    }
  };
}
