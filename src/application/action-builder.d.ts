export interface Service {
    (...args: any[]): Promise<any>;
}

export interface ActionBuilderSpec<S extends Service> {
    node: string | string[];
    preStatus?: string;
    service: S;
    status: string;
    shouldDumpStoreOnActionCall?: boolean;
}

type ActionBuilderSpecExt<S extends Service> = ActionBuilderSpec<S> & {type: string, callerId?: string};

/**
 * Action builder function. The built action dispatch the preStatus, call the service and dispatch the result from the server.
 * @param config The action builder config
 */
export default function actionBuilder<S extends Service>(config: ActionBuilderSpec<S>): S

/**
 * Method call after the service call.
 * @param config Action builder config.
 * @param json The data return from the service call.
 */
export function dispatchServiceResponse({node, type, status, callerId}: ActionBuilderSpecExt<any>, response: any): void

/**
 * Method call when there is an error.
 * @param config The action builder configuration.
 * @param err The error from the API call.
 */
export function errorOnCall(config: ActionBuilderSpecExt<any>, err: {}): void

/**
 * Method call before the service.
 * @param config The action builder config.
 * @param payload The request payload.
 */
export function preServiceCall({node, preStatus, callerId, shouldDumpStoreOnActionCall}: ActionBuilderSpecExt<any>, payload: any): void