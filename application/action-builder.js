var dispatcher = require('../dispatcher');
function preServiceCall(config){
  dispatcher.handleViewAction({
    data: {[config.node]: undefined},
    type: config.type,
    status: {[config.type]: config.preStatus, isLoading: true}
  });
}
function postServiceCall(config, json){
  dispatcher.handleServerAction({
    data: {[config.node]: json},
    type: config.type,
    status: {[config.type]: config.status, isLoading: false}
  });
}

module.exports = function(config){
  config = config || {};
  config.type = config.type || 'update';
  config.preStatus = config.preStatus || 'loading';
  if(!config.service){
    throw new Error('You need to provide a service to call');
  }
  if(!config.status){
    throw new Error('You need to provide a status to your action');
  }
  /*if(!config.data){
    throw new Error('You need to provide an action data');
  }*/
  //Exposes a function consumes by the compoennt.
  return function(criteria){
    preServiceCall(config);
    return config.service(criteria).then(function(jsonData){
      postServiceCall(config, jsonData);
    }, function actionError(err){
      console.warn('Error in action', err);
      //Get code back from a project
      throw new Error('An errror occurs');
    });
  };
};
