'use strict';

var dispatcher = require('../dispatcher');
module.exports = {
    builtInStore: require('./built-in-store'),
    /**
     * Action builder
     */
    actionBuilder: require('./action-builder'),
    log: function log() {
        var builtInStore = require('./built-in-store');
        console.info('---------------------------');
        console.info('QuickSearch', builtInStore.quickSearchStore.value);
        console.info('AdvancedSearch', builtInStore.advancedSearchStore.value);
        console.info('---------------------------');
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInByb2Nlc3Nvci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLElBQUksYUFBYSxRQUFRLGVBQVIsQ0FBakI7QUFDQSxPQUFPLE9BQVAsR0FBaUI7QUFDYixrQkFBYyxRQUFRLGtCQUFSLENBREQ7QUFFYjs7O0FBR0EsbUJBQWUsUUFBUSxrQkFBUixDQUxGO0FBTWIsT0FOYSxpQkFNUjtBQUNELFlBQUksZUFBZSxRQUFRLGtCQUFSLENBQW5CO0FBQ0EsZ0JBQVEsSUFBUixDQUFhLDZCQUFiO0FBQ0EsZ0JBQVEsSUFBUixDQUFhLGFBQWIsRUFBNEIsYUFBYSxnQkFBYixDQUE4QixLQUExRDtBQUNBLGdCQUFRLElBQVIsQ0FBYSxnQkFBYixFQUErQixhQUFhLG1CQUFiLENBQWlDLEtBQWhFO0FBQ0EsZ0JBQVEsSUFBUixDQUFhLDZCQUFiO0FBQ0g7QUFaWSxDQUFqQiIsImZpbGUiOiJwcm9jZXNzb3IuanMiLCJzb3VyY2VzQ29udGVudCI6WyJsZXQgZGlzcGF0Y2hlciA9IHJlcXVpcmUoJy4uL2Rpc3BhdGNoZXInKTtcclxubW9kdWxlLmV4cG9ydHMgPSB7XHJcbiAgICBidWlsdEluU3RvcmU6IHJlcXVpcmUoJy4vYnVpbHQtaW4tc3RvcmUnKSxcclxuICAgIC8qKlxyXG4gICAgICogQWN0aW9uIGJ1aWxkZXJcclxuICAgICAqL1xyXG4gICAgYWN0aW9uQnVpbGRlcjogcmVxdWlyZSgnLi9hY3Rpb24tYnVpbGRlcicpLFxyXG4gICAgbG9nKCl7XHJcbiAgICAgICAgbGV0IGJ1aWx0SW5TdG9yZSA9IHJlcXVpcmUoJy4vYnVpbHQtaW4tc3RvcmUnKTtcclxuICAgICAgICBjb25zb2xlLmluZm8oJy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLScpO1xyXG4gICAgICAgIGNvbnNvbGUuaW5mbygnUXVpY2tTZWFyY2gnLCBidWlsdEluU3RvcmUucXVpY2tTZWFyY2hTdG9yZS52YWx1ZSk7XHJcbiAgICAgICAgY29uc29sZS5pbmZvKCdBZHZhbmNlZFNlYXJjaCcsIGJ1aWx0SW5TdG9yZS5hZHZhbmNlZFNlYXJjaFN0b3JlLnZhbHVlKTtcclxuICAgICAgICBjb25zb2xlLmluZm8oJy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLScpO1xyXG4gICAgfVxyXG59O1xyXG4iXX0=