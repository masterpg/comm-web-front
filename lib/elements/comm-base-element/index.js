"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lit_element_1 = require("lit-element");
const async_js_1 = require("@polymer/polymer/lib/utils/async.js");
class CommBaseElement extends lit_element_1.LitElement {
    constructor() {
        //----------------------------------------------------------------------
        //
        //  Variables
        //
        //----------------------------------------------------------------------
        super(...arguments);
        this.m_slotElementsAssignedNodes = new WeakMap();
    }
    //----------------------------------------------------------------------
    //
    //  Internal methods
    //
    //----------------------------------------------------------------------
    /**
     * 指定されたスロットに対して、前回配置されたノードと現在配置されているノードの差分を取得します。
     * @param slot
     */
    f_getDistributedChildDiff(slot) {
        let previousNodes;
        if (this.m_slotElementsAssignedNodes.has(slot)) {
            previousNodes = this.m_slotElementsAssignedNodes.get(slot);
        }
        else {
            previousNodes = [];
        }
        const newNodes = slot.assignedNodes({ flatten: true });
        // 新しいノード(newNodes)を保存する。このノードは次回から前のノードとして扱われる
        this.m_slotElementsAssignedNodes.set(slot, newNodes);
        const diff = {
            removed: [],
            added: [],
        };
        for (let i = 0; i < previousNodes.length; i++) {
            const oldNode = previousNodes[i];
            const newIndex = newNodes.indexOf(oldNode);
            // 前のノードがnewNodesに存在しない場合、前のノードは削除されたことになる
            if (!(newIndex >= 0)) {
                diff.removed.push(oldNode);
            }
            // otherwise the node wasn't added or removed.
            // 上記以外の場合、前のノードは既に追加されているのでnewNodesから削除する
            else {
                newNodes.splice(i, 1);
            }
        }
        // ここまででnewNodesには新たに追加されたノードのみに絞られている
        diff.added = newNodes;
        return diff;
    }
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
    f_async(callback, waitTime = 0) {
        // tslint:disable-next-line
        return waitTime > 0 ? async_js_1.timeOut.run(callback.bind(this), waitTime) : ~async_js_1.microTask.run(callback.bind(this));
    }
    /**
     * Cancels an async operation started with `async`.
     *
     * @param {number} handle Handle returned from original `async` call to
     *   cancel.
     * @return {void}
     */
    f_cancelAsync(handle) {
        // tslint:disable-next-line
        handle < 0 ? async_js_1.microTask.cancel(~handle) : async_js_1.timeOut.cancel(handle);
    }
}
exports.CommBaseElement = CommBaseElement;
