import {RequestStore} from '../store';

/**
 * FetchRequest spec
 */
export interface FetchRequest {
    /**
     * HTTP verb
     */
    method: string;

    /**
     * URL to fetch
     */
    url: string;

    /**
     * JSON data
     */
    data: {};
}

/**
 * Cancellable Promise spec
 */
export interface CancellablePromise<T> extends Promise<T> {
    cancel?: Function;
}

/**
 * The built-in request store
 */
export let builtInStore: RequestStore;

/**
 * Create a cancellable promise {}, with an optional cancel handler function given as an argument.
 * @param promiseFn
 * @param cancelHandler
 */
export function cancellablePromiseBuilder<T>(promiseFn: Function, cancelHandler?: Function): CancellablePromise<T>

/**
 * Creates a cors http request.
 * @param method    Type of method you want to reach.
 * @param url       Url to reach.
 * @param options   The cors options.
 */
export function cors(method: string, url: string, {}?: {}): XMLHttpRequest

/**
 * Fetch function to ease http request.
 * @param obj       The request
 * @param options   The options {}.
 */
export function fetch<T>(obj: FetchRequest, options?: {}): CancellablePromise<T>