import {ComponentClass} from 'react';

export interface Domain {
    formatter?: (value: any) => string;
    unformatter?: (text: string) => any;
    locale?: string;
    format?: string;
    type: string;
    validator?: (value: any) => boolean;
    listName?: string;
    FieldComponent?: ComponentClass<{}>;
    InputLabelComponent?: ComponentClass<{}>;
    InputComponent?: ComponentClass<{}>;
    SelectComponent?: ComponentClass<{}>;
    TextComponent?: ComponentClass<{}>;
    DisplayComponent?: ComponentClass<{}>;
    options?: {};
}