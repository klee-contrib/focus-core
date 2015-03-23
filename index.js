//Generator http://patorjk.com/software/taag/#p=display&h=1&f=Banner4&t=Focus
console.log(
  `
    .########..#######...######..##.....##..######.
    .##.......##.....##.##....##.##.....##.##....##
    .##.......##.....##.##.......##.....##.##......
    .######...##.....##.##.......##.....##..######.
    .##.......##.....##.##.......##.....##.......##
    .##.......##.....##.##....##.##.....##.##....##
    .##........#######...######...#######...######.
`
);
var infos = {
  author: "pbesson",
  version: "0.5.0",
  documentation: "http://github.com"
}; //require('../package.json'); //Bug with literalify.
/**
 * Focus library.
 * This file requires all submodules.
 * @type {Object}
 */
module.exports = {
  application: require('./application'),
  component: require('./component'),
  definition: require('./definition'),
  dispatcher: require('./dispatcher'),
  exception: require('./exception'),
  helper: require('./helper'),
  network: require('./network'),
  router: require('./router'),
  reference: require('./reference'),
  store: require('./store'),
  util: require('./util'),
  VERSION: infos.version,
  AUTHOR: infos.author,
  DOCUMENTATION: infos.documentation
};
