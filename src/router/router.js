let _Router;

export const setRouterFunction =(Router) => {
    _Router = Router;
};

export const getRouterFunction = (...args) => {
    if (!_Router) {
        throw new Error(`
            Router: you need to define your Backbone router using focus-core/router/router setRouterFunction'
            // Don't forget to add backbone to your dependency.
            Example :
            import Backbone from 'backbone';
            setRouterFunction(Backbone.Router)
            `);
    }
    return _Router
};

export const start = (...args) => {
    window.Backbone.history.start();
};
