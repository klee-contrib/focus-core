import {ComponentClass} from 'react';
import {ApplicationStore} from '../store';

/**
 * Action spec
 */
export interface Action {
    type: string;
    data: {};
    callerId?: number;
    status?: string | number;
    identifier?: string;
}

/**
 * Action builder config parameter
 */
export interface ActionBuilderSpec<S> {
    node: string;
    preStatus?: string;
    service: S;
    status: string;
    shouldDumpStoreOnActionCall?: boolean;
}

export interface CartridgeComponent {
    component: ComponentClass<{}> | ((props: {}) => JSX.Element);
    props?: {};
}

export interface CartridgeConfiguration {
    barLeft?: CartridgeComponent;
    barRight?: CartridgeComponent;
    cartridge?: CartridgeComponent;
    summary?: CartridgeComponent;
    actions?: {
        primary: {icon: string, action: (object: any) => any}[];
        secondary: {label: string, action: (object: any) => any}[];
    };
}

/**
 * Describe the mountedComponent literal
 */
export interface MountedComponentSpec {
    [x: string]: boolean;
}

/**
 *  An instanciated application store.
 */
export let builtInStore: ApplicationStore;

/**
 * Contains all selectors from the mounted components
 */
export let mountedComponent: MountedComponentSpec;

/**
 * Action builder function. The built action dispatch the preStatus, call the service and dispatch the result from the server.
 * @param config The action builder config
 */
export function actionBuilder<S>(config: ActionBuilderSpec<S>): S

/**
 * Clear a React component.
 * @param targetSelector The component DOM selector
 */
export function clearComponent(targetSelector: string): void

/**
 * Change application mode.
 * @param newMode       New application mode.
 * @param previousMode  Previous mode.
 */
export function changeMode(newMode: string, previousMode: string): void

/**
 * Change application route (maybe not the whole route but a route's group.)
 * @param newRoute new route name.
 */
export function changeRoute(newRoute: string): void

/**
 * Clear the application header.
 */
export function clearHeader(): void

/**
 * Sets the header.
 */
export function setHeader(config: CartridgeConfiguration): void

/**
 * Render a React component in a DOM selector.
 * @param component A react component.
 * @param selector  A selector on a DOM node.
 * @param options   Options for the component rendering.
 */
export function render(component: ComponentClass<{}>, selector: string, options?: {}): void