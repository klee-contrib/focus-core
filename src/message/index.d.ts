import {MessageStore} from '../store';

/**
 * Add a message.
 * @param message The message content.
 */
export function addMessage({content}: {content: string}): void

/**
 * Add a warning message.
 * @param message The message content.
 */
export function addWarningMessage(message: string | {content: string}): void

/**
 * Add an information message.
 * @param message The message content.
 */
export function addInformationMessage(message: string | {content: string}): void

/**
 * Add an error message.
 * @param message The message content.
 */
export function addErrorMessage(message: string | {content: string}): void

/**
 * Add a success message.
 * @param message The message content.
 */
export function addSuccessMessage(message: string | {content: string}): void

/**
 * The message store
 */
export let builtInStore: MessageStore;

/**
 * Clear all the messages
 */
export function clearMessages(): void