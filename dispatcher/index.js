'use strict';

var Dispatcher = require('flux').Dispatcher;
var assign = require('object-assign');

/**
* Application dispatcher.
* @type {Object}
*/
var AppDispatcher = assign(new Dispatcher(), {
    /**
    * @param {object} action The details of the action, including the action's
    * type and additional data coming from the server.
    */
    handleServerAction: function handleServerAction(action) {
        var payload = {
            source: 'SERVER_ACTION',
            action: action
        };
        this.dispatch(payload);
    },

    /**
    * @param {object} action The details of the action, including the action's
    * type and additional data coming from the view.
    */
    handleViewAction: function handleViewAction(action) {
        var payload = {
            source: 'VIEW_ACTION',
            action: action
        };
        this.dispatch(payload);
    }
});

module.exports = AppDispatcher;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInByb2Nlc3Nvci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLElBQU0sYUFBYSxRQUFRLE1BQVIsRUFBZ0IsVUFBbkM7QUFDQSxJQUFNLFNBQVMsUUFBUSxlQUFSLENBQWY7O0FBRUE7Ozs7QUFJQSxJQUFNLGdCQUFnQixPQUFPLElBQUksVUFBSixFQUFQLEVBQXlCO0FBQzNDOzs7O0FBSUEsc0JBTDJDLDhCQUt4QixNQUx3QixFQUtoQjtBQUN2QixZQUFNLFVBQVU7QUFDWixvQkFBUSxlQURJO0FBRVosb0JBQVE7QUFGSSxTQUFoQjtBQUlBLGFBQUssUUFBTCxDQUFjLE9BQWQ7QUFDSCxLQVgwQzs7QUFZM0M7Ozs7QUFJQSxvQkFoQjJDLDRCQWdCMUIsTUFoQjBCLEVBZ0JsQjtBQUNyQixZQUFNLFVBQVU7QUFDWixvQkFBUSxhQURJO0FBRVosb0JBQVE7QUFGSSxTQUFoQjtBQUlBLGFBQUssUUFBTCxDQUFjLE9BQWQ7QUFDSDtBQXRCMEMsQ0FBekIsQ0FBdEI7O0FBeUJBLE9BQU8sT0FBUCxHQUFpQixhQUFqQiIsImZpbGUiOiJwcm9jZXNzb3IuanMiLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCBEaXNwYXRjaGVyID0gcmVxdWlyZSgnZmx1eCcpLkRpc3BhdGNoZXI7XHJcbmNvbnN0IGFzc2lnbiA9IHJlcXVpcmUoJ29iamVjdC1hc3NpZ24nKTtcclxuXHJcbi8qKlxyXG4qIEFwcGxpY2F0aW9uIGRpc3BhdGNoZXIuXHJcbiogQHR5cGUge09iamVjdH1cclxuKi9cclxuY29uc3QgQXBwRGlzcGF0Y2hlciA9IGFzc2lnbihuZXcgRGlzcGF0Y2hlcigpLCB7XHJcbiAgICAvKipcclxuICAgICogQHBhcmFtIHtvYmplY3R9IGFjdGlvbiBUaGUgZGV0YWlscyBvZiB0aGUgYWN0aW9uLCBpbmNsdWRpbmcgdGhlIGFjdGlvbidzXHJcbiAgICAqIHR5cGUgYW5kIGFkZGl0aW9uYWwgZGF0YSBjb21pbmcgZnJvbSB0aGUgc2VydmVyLlxyXG4gICAgKi9cclxuICAgIGhhbmRsZVNlcnZlckFjdGlvbihhY3Rpb24pIHtcclxuICAgICAgICBjb25zdCBwYXlsb2FkID0ge1xyXG4gICAgICAgICAgICBzb3VyY2U6ICdTRVJWRVJfQUNUSU9OJyxcclxuICAgICAgICAgICAgYWN0aW9uOiBhY3Rpb25cclxuICAgICAgICB9O1xyXG4gICAgICAgIHRoaXMuZGlzcGF0Y2gocGF5bG9hZCk7XHJcbiAgICB9LFxyXG4gICAgLyoqXHJcbiAgICAqIEBwYXJhbSB7b2JqZWN0fSBhY3Rpb24gVGhlIGRldGFpbHMgb2YgdGhlIGFjdGlvbiwgaW5jbHVkaW5nIHRoZSBhY3Rpb24nc1xyXG4gICAgKiB0eXBlIGFuZCBhZGRpdGlvbmFsIGRhdGEgY29taW5nIGZyb20gdGhlIHZpZXcuXHJcbiAgICAqL1xyXG4gICAgaGFuZGxlVmlld0FjdGlvbihhY3Rpb24pIHtcclxuICAgICAgICBjb25zdCBwYXlsb2FkID0ge1xyXG4gICAgICAgICAgICBzb3VyY2U6ICdWSUVXX0FDVElPTicsXHJcbiAgICAgICAgICAgIGFjdGlvbjogYWN0aW9uXHJcbiAgICAgICAgfTtcclxuICAgICAgICB0aGlzLmRpc3BhdGNoKHBheWxvYWQpO1xyXG4gICAgfVxyXG59KTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gQXBwRGlzcGF0Y2hlcjtcclxuIl19