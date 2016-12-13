'use strict';

//http://www.ascii-fr.com/Generateur-de-texte.html

var infos = require(__PACKAGE_JSON_PATH__ + '/package.json');

console.log('\n        FOCUS CORE\n\n        version: ' + infos.version + '\n        focus: ' + infos.homepage + '\n        documentation: ' + infos.documentation + '\n        issues: ' + infos.bugs.url + '\n    ');
/**
* Focus library.
* This file requires all submodules.
* @type {Object}
*/
module.exports = {
    application: require('./application'),
    history: require('./history'),
    component: require('./component'),
    definition: require('./definition'),
    dispatcher: require('./dispatcher'),
    list: require('./list'),
    exception: require('./exception'),
    network: require('./network'),
    router: require('./router'),
    reference: require('./reference'),
    search: require('./search'),
    siteDescription: require('./site-description'),
    store: require('./store'),
    util: require('./util'),
    user: require('./user'),
    translation: require('./translation'),
    message: require('./message'),
    VERSION: infos.version,
    AUTHOR: infos.author,
    DOCUMENTATION: function DOCUMENTATION() {
        console.log('documentation: ' + infos.documentation);
        console.log('repository: ' + infos.repository.url);
        console.log('issues: ' + infos.bugs.url);
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInByb2Nlc3Nvci5qcyJdLCJuYW1lcyI6WyJpbmZvcyIsInJlcXVpcmUiLCJfX1BBQ0tBR0VfSlNPTl9QQVRIX18iLCJjb25zb2xlIiwibG9nIiwidmVyc2lvbiIsImhvbWVwYWdlIiwiZG9jdW1lbnRhdGlvbiIsImJ1Z3MiLCJ1cmwiLCJtb2R1bGUiLCJleHBvcnRzIiwiYXBwbGljYXRpb24iLCJoaXN0b3J5IiwiY29tcG9uZW50IiwiZGVmaW5pdGlvbiIsImRpc3BhdGNoZXIiLCJsaXN0IiwiZXhjZXB0aW9uIiwibmV0d29yayIsInJvdXRlciIsInJlZmVyZW5jZSIsInNlYXJjaCIsInNpdGVEZXNjcmlwdGlvbiIsInN0b3JlIiwidXRpbCIsInVzZXIiLCJ0cmFuc2xhdGlvbiIsIm1lc3NhZ2UiLCJWRVJTSU9OIiwiQVVUSE9SIiwiYXV0aG9yIiwiRE9DVU1FTlRBVElPTiIsInJlcG9zaXRvcnkiXSwibWFwcGluZ3MiOiI7O0FBQUE7O0FBRUEsSUFBTUEsUUFBUUMsUUFBV0MscUJBQVgsbUJBQWQ7O0FBRUFDLFFBQVFDLEdBQVIsK0NBSW1CSixNQUFNSyxPQUp6Qix5QkFLaUJMLE1BQU1NLFFBTHZCLGlDQU15Qk4sTUFBTU8sYUFOL0IsMEJBT2tCUCxNQUFNUSxJQUFOLENBQVdDLEdBUDdCO0FBVUE7Ozs7O0FBS0FDLE9BQU9DLE9BQVAsR0FBaUI7QUFDYkMsaUJBQWFYLFFBQVEsZUFBUixDQURBO0FBRWJZLGFBQVNaLFFBQVEsV0FBUixDQUZJO0FBR2JhLGVBQVdiLFFBQVEsYUFBUixDQUhFO0FBSWJjLGdCQUFZZCxRQUFRLGNBQVIsQ0FKQztBQUtiZSxnQkFBWWYsUUFBUSxjQUFSLENBTEM7QUFNYmdCLFVBQU1oQixRQUFRLFFBQVIsQ0FOTztBQU9iaUIsZUFBV2pCLFFBQVEsYUFBUixDQVBFO0FBUWJrQixhQUFTbEIsUUFBUSxXQUFSLENBUkk7QUFTYm1CLFlBQVFuQixRQUFRLFVBQVIsQ0FUSztBQVVib0IsZUFBV3BCLFFBQVEsYUFBUixDQVZFO0FBV2JxQixZQUFRckIsUUFBUSxVQUFSLENBWEs7QUFZYnNCLHFCQUFpQnRCLFFBQVEsb0JBQVIsQ0FaSjtBQWFidUIsV0FBT3ZCLFFBQVEsU0FBUixDQWJNO0FBY2J3QixVQUFNeEIsUUFBUSxRQUFSLENBZE87QUFlYnlCLFVBQU16QixRQUFRLFFBQVIsQ0FmTztBQWdCYjBCLGlCQUFhMUIsUUFBUSxlQUFSLENBaEJBO0FBaUJiMkIsYUFBUzNCLFFBQVEsV0FBUixDQWpCSTtBQWtCYjRCLGFBQVM3QixNQUFNSyxPQWxCRjtBQW1CYnlCLFlBQVE5QixNQUFNK0IsTUFuQkQ7QUFvQmJDLGlCQXBCYSwyQkFvQkU7QUFDWDdCLGdCQUFRQyxHQUFSLHFCQUE4QkosTUFBTU8sYUFBcEM7QUFDQUosZ0JBQVFDLEdBQVIsa0JBQTJCSixNQUFNaUMsVUFBTixDQUFpQnhCLEdBQTVDO0FBQ0FOLGdCQUFRQyxHQUFSLGNBQXVCSixNQUFNUSxJQUFOLENBQVdDLEdBQWxDO0FBQ0g7QUF4QlksQ0FBakIiLCJmaWxlIjoicHJvY2Vzc29yLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy9odHRwOi8vd3d3LmFzY2lpLWZyLmNvbS9HZW5lcmF0ZXVyLWRlLXRleHRlLmh0bWxcclxuXHJcbmNvbnN0IGluZm9zID0gcmVxdWlyZShgJHtfX1BBQ0tBR0VfSlNPTl9QQVRIX199L3BhY2thZ2UuanNvbmApO1xyXG5cclxuY29uc29sZS5sb2coXHJcbiAgICBgXHJcbiAgICAgICAgRk9DVVMgQ09SRVxyXG5cclxuICAgICAgICB2ZXJzaW9uOiAke2luZm9zLnZlcnNpb259XHJcbiAgICAgICAgZm9jdXM6ICR7aW5mb3MuaG9tZXBhZ2V9XHJcbiAgICAgICAgZG9jdW1lbnRhdGlvbjogJHtpbmZvcy5kb2N1bWVudGF0aW9ufVxyXG4gICAgICAgIGlzc3VlczogJHtpbmZvcy5idWdzLnVybH1cclxuICAgIGBcclxuKTtcclxuLyoqXHJcbiogRm9jdXMgbGlicmFyeS5cclxuKiBUaGlzIGZpbGUgcmVxdWlyZXMgYWxsIHN1Ym1vZHVsZXMuXHJcbiogQHR5cGUge09iamVjdH1cclxuKi9cclxubW9kdWxlLmV4cG9ydHMgPSB7XHJcbiAgICBhcHBsaWNhdGlvbjogcmVxdWlyZSgnLi9hcHBsaWNhdGlvbicpLFxyXG4gICAgaGlzdG9yeTogcmVxdWlyZSgnLi9oaXN0b3J5JyksXHJcbiAgICBjb21wb25lbnQ6IHJlcXVpcmUoJy4vY29tcG9uZW50JyksXHJcbiAgICBkZWZpbml0aW9uOiByZXF1aXJlKCcuL2RlZmluaXRpb24nKSxcclxuICAgIGRpc3BhdGNoZXI6IHJlcXVpcmUoJy4vZGlzcGF0Y2hlcicpLFxyXG4gICAgbGlzdDogcmVxdWlyZSgnLi9saXN0JyksXHJcbiAgICBleGNlcHRpb246IHJlcXVpcmUoJy4vZXhjZXB0aW9uJyksXHJcbiAgICBuZXR3b3JrOiByZXF1aXJlKCcuL25ldHdvcmsnKSxcclxuICAgIHJvdXRlcjogcmVxdWlyZSgnLi9yb3V0ZXInKSxcclxuICAgIHJlZmVyZW5jZTogcmVxdWlyZSgnLi9yZWZlcmVuY2UnKSxcclxuICAgIHNlYXJjaDogcmVxdWlyZSgnLi9zZWFyY2gnKSxcclxuICAgIHNpdGVEZXNjcmlwdGlvbjogcmVxdWlyZSgnLi9zaXRlLWRlc2NyaXB0aW9uJyksXHJcbiAgICBzdG9yZTogcmVxdWlyZSgnLi9zdG9yZScpLFxyXG4gICAgdXRpbDogcmVxdWlyZSgnLi91dGlsJyksXHJcbiAgICB1c2VyOiByZXF1aXJlKCcuL3VzZXInKSxcclxuICAgIHRyYW5zbGF0aW9uOiByZXF1aXJlKCcuL3RyYW5zbGF0aW9uJyksXHJcbiAgICBtZXNzYWdlOiByZXF1aXJlKCcuL21lc3NhZ2UnKSxcclxuICAgIFZFUlNJT046IGluZm9zLnZlcnNpb24sXHJcbiAgICBBVVRIT1I6IGluZm9zLmF1dGhvcixcclxuICAgIERPQ1VNRU5UQVRJT04oKXtcclxuICAgICAgICBjb25zb2xlLmxvZyhgZG9jdW1lbnRhdGlvbjogJHtpbmZvcy5kb2N1bWVudGF0aW9ufWApO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKGByZXBvc2l0b3J5OiAke2luZm9zLnJlcG9zaXRvcnkudXJsfWApO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKGBpc3N1ZXM6ICR7aW5mb3MuYnVncy51cmx9YCk7XHJcbiAgICB9XHJcbn07XHJcbiJdfQ==