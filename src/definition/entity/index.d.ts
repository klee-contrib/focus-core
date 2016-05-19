export interface EntityField {
    domain: string;
    isRequired: boolean;
    name: string;
}

export interface Entity<T> {
    fields: {[name: string]: EntityField};
    moduleName: string;
    name: string;
    type: T;
}