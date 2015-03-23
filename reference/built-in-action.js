var loadManyReferenceList = require('./builder').loadMany;
var dispatcher = require('../dispatcher');
module.exports =
function(referenceNames){
  return function(){
       return Promise.all(loadManyReferenceList(referenceNames))
           .then(function successReferenceLoading(data){
             dispatcher.handleViewAction({data: data, type: 'update'});
           }, function errorReferenceLoading(err){
             dispatcher.handleViewAction({data: err, type: 'error'});
           });
     };
};
