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
var infos = require('./package.json');
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
  user: require('./user'),
  message: require('./message'),
  VERSION: infos.version,
  AUTHOR: infos.author,
  DOCUMENTATION: function(){
    console.log(`documentation: ${infos.documentation}`);
    console.log(`repository: ${infos.repository.url}`);
    console.log(`issues: ${infos.bugs.url}`);
  }
};
