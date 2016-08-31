import {Component, Requireable} from 'react';

/**
 * Component export spec
 */
export interface ComponentMixin {
    mixin: Component<{}, {}>;
    component?: Component<{}, {}>;
}

/**
 * Build a module with a mixin and a React component.
 * @param componentMixin    Mixin of the component.
 * @param isMixinOnly       If true, won't output a component
 */
export function builder(componentMixin: Component<{}, {}>, isMixinOnly?: boolean): ComponentMixin

/**
 * Expose a React type validation for the component properties validation.
 * @param type          String or array of the types to use.
 * @param isRequired    Defines if the props is mandatory.
 */
export function types(type: string | string[], isRequired?: boolean): Requireable<any>