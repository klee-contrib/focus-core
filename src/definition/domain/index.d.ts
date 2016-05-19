export interface Domain {
    formatter?: (value: any) => string;
    unformatter?: (text: string) => any;
    locale?: string;
    format?: string;
    type: string;
    validator?: (value: any) => boolean;
    listName?: string;
    FieldComponent?: React.ComponentClass<{}>;
    InputLabelComponent?: React.ComponentClass<{}>;
    InputComponent?: React.ComponentClass<{}>;
    SelectComponent?: React.ComponentClass<{}>;
    TextComponent?: React.ComponentClass<{}>;
    DisplayComponent?: React.ComponentClass<{}>;
    options?: {};
}