 var container = {};
 var mod = {};
mod.sessionStorage = mod.localStorage = {
  getItem: function(name){
    return container[name];
  },
  setItem: function(name, data){
    container[name] = data;
  }
};

module.exports = mod;