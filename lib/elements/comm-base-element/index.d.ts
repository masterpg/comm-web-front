import { LitElement } from 'lit-element';
export declare class CommBaseElement extends LitElement {
    m_slotElementsAssignedNodes: WeakMap<HTMLSlotElement, Node[]>;
    /**
     * 指定されたスロットに対して、前回配置されたノードと現在配置されているノードの差分を取得します。
     * @param slot
     */
    f_getDistributedChildDiff(slot: HTMLSlotElement): {
        removed: Node[];
        added: Node[];
    };
    /**
     * Runs a callback function asynchronously.
     *
     * By default (if no waitTime is specified), async callbacks are run at
     * microtask timing, which will occur before paint.
     *
     * @param {!Function} callback The callback function to run, bound to `this`.
     * @param {number=} waitTime Time to wait before calling the
     *   `callback`.  If unspecified or 0, the callback will be run at microtask
     *   timing (before paint).
     * @return {number} Handle that may be used to cancel the async job.
     */
    f_async(callback: () => any, waitTime?: number): number;
    /**
     * Cancels an async operation started with `async`.
     *
     * @param {number} handle Handle returned from original `async` call to
     *   cancel.
     * @return {void}
     */
    f_cancelAsync(handle: any): void;
}
