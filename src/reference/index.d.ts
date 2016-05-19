import {ReferenceStore} from '../store';

/**
 * Focus reference action.
 * @param referenceNames An array which contains the name of all the references to load.
 */
export function builtInAction(referenceNames: string[]): () => Promise<any>

/**
 * Builds a new reference store
 */
export function storeGetter(): ReferenceStore