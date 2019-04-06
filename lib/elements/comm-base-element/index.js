"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var lit_element_1 = require("lit-element");
var async_js_1 = require("@polymer/polymer/lib/utils/async.js");
var CommBaseElement = /** @class */ (function (_super) {
    __extends(CommBaseElement, _super);
    function CommBaseElement() {
        //----------------------------------------------------------------------
        //
        //  Variables
        //
        //----------------------------------------------------------------------
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.m_slotElementsAssignedNodes = new WeakMap();
        return _this;
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
    CommBaseElement.prototype.f_getDistributedChildDiff = function (slot) {
        var previousNodes;
        if (this.m_slotElementsAssignedNodes.has(slot)) {
            previousNodes = this.m_slotElementsAssignedNodes.get(slot);
        }
        else {
            previousNodes = [];
        }
        var newNodes = slot.assignedNodes({ flatten: true });
        // 新しいノード(newNodes)を保存する。このノードは次回から前のノードとして扱われる
        this.m_slotElementsAssignedNodes.set(slot, newNodes);
        var diff = {
            removed: [],
            added: [],
        };
        for (var i = 0; i < previousNodes.length; i++) {
            var oldNode = previousNodes[i];
            var newIndex = newNodes.indexOf(oldNode);
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
    CommBaseElement.prototype.f_async = function (callback, waitTime) {
        if (waitTime === void 0) { waitTime = 0; }
        // tslint:disable-next-line
        return waitTime > 0 ? async_js_1.timeOut.run(callback.bind(this), waitTime) : ~async_js_1.microTask.run(callback.bind(this));
    };
    /**
     * Cancels an async operation started with `async`.
     *
     * @param {number} handle Handle returned from original `async` call to
     *   cancel.
     * @return {void}
     */
    CommBaseElement.prototype.f_cancelAsync = function (handle) {
        // tslint:disable-next-line
        handle < 0 ? async_js_1.microTask.cancel(~handle) : async_js_1.timeOut.cancel(handle);
    };
    return CommBaseElement;
}(lit_element_1.LitElement));
exports.CommBaseElement = CommBaseElement;
