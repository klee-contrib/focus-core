export interface UrlParam {
    /**
     * The JSON data to inject in the URL.
     */
    urlData: {};

    /**
     * The JSON data to give to the request.
     */
    data?: {};
}

export interface Url {
    url: string;
    method: string;
    data: {};
}

/**
 * Builds an url.
 * @param url url with params such as http://url/entity/${id}.
 * @param method HTTP verb {GET, POST, PUT, DELETE}.
 */
export function builder(url: string, method: string): (param: UrlParam) => Url

/**
 * Processes an url in order to build them.
 * @param url The url.
 * @param data The data.
 */
export function preprocessor(url: string, data: {}): string