import { LitElement } from 'lit-element';
import { Constructor } from '../../../base';
export interface CommResizableElement extends HTMLElement {
    notifyResize(): void;
    assignParentResizable(parentResizable: CommResizableElement | null): void;
    stopResizeNotificationsFor(target: CommResizableElement): void;
    _interestedResizables: CommResizableElement[];
    _findParent(): void;
    _subscribeIronResize(target: HTMLElement): void;
}
/**
 * The implementation of this mixin is based on the following URL:
 * @see {@link https://github.com/PolymerElements/iron-resizable-behavior/blob/master/iron-resizable-behavior.js}
 */
export declare function CommResizableMixin(superclass: Constructor<LitElement>): Constructor<CommResizableElement>;
