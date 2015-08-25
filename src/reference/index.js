module.exports = {
  config: require('./config'),
  builder: require('./builder'),
  builtInAction: require('./built-in-action'),
  getStore: () => require('./built-in-store')
};
