const ALL = 'ALL';
module.exports = function(config){
  return function(options){
    options = options || {};
    let {scope, query} = options.criteria; //Cannot be read from the store ?
    if(scope === ALL){
      //Call the search action.
      options.service.scope(options);
    }else{
      if(options.scroll){ //Maybe rename pagination or something like that.
        options.service.unScope(options).then((response)=>{
            // Read the previous data from options.previous;
            return response;
        });
        //Read the totalCount

      }
      //The search is unscoped.


    }
  };
};
