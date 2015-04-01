var dispatcher = require('../dispatcher');
module.exports = function(config){
  config = config || {};
  config.type = config.type || 'update';
  if(!config.service){
    throw new Error('You need to provide a service');
  }
  if(!config.service){
    throw new Error('You need to provide a service to call');
  }

  if(!config.data){
    throw new Error('You need to provide an action data');
  }
  return config.service(config.data).then(function(jsonData){
    dispatcher.handleServerAction({
      data: {[config.property]: jsonData},
      type: config.type
    });
  }, function actionError(err){
    console.warn('Error in action', err);
    throw new Error('An errror occurs');
  });
};
