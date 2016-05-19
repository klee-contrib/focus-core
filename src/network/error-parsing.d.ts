/**
 * Configures the error parsing module
 * @param options The config options
 */
export function configure(options?: {globalMessages?: Array<any>, errorTypes?: {}}): void

/**
 * Transforms errors send by API to application errors. Dispatch depending on the response http code. Returns parsed error response.
 * @param response  Response {} that needs to be transformed
 * @param options   Options for the exceptions teratement such as the model, {model: modelVar}.
 */
export function manageResponseErrors(response: {}, options?: {}): {}