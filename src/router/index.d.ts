interface RouterConfig {
    log?: boolean;
    beforeRoute?: () => void;
    routes?: {[x: string]: string};
}

declare let Router: {
    extend<T>(config: T & RouterConfig): typeof Router & RouterConfig & {new(): {}}
};

declare function createRouter(Backbone: {}): typeof Router;
export = createRouter;
