interface RouterConfig {
    log?: boolean;
    beforeRoute?: () => void;
    routes: {[x: string]: string};
}

declare let Router: {
    extend<T>(config: T & RouterConfig): {new(): {}}
};

export = (router: typeof Router) => typeof Router

