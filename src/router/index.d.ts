interface RouterConfig {
    log?: boolean;
    beforeRoute?: () => void;
    routes: {[x: string]: string};
}

declare let router: {
    extend<T>(config: T & RouterConfig): {new(): {}}
};

export = router

