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
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var lit_element_1 = require("lit-element");
var base_styles_1 = require("../../styles/polymer/base-styles");
var comm_base_element_1 = require("../comm-base-element");
var comm_collapse_item_1 = require("./comm-collapse-item");
/**
 * # comm-collapse-view
 *
 * ## Description
 *
 * 折りたたみ可能なコンテンツブロックのコンポーネントです。
 *
 * ## Styling
 *
 * Custom property | Description | Default
 * ----------------|-------------|----------
 * `--comm-collapse-frame-border-style` | コンポーネントを囲むボーダーのスタイルです | `none`
 * `--comm-collapse-frame-border-color` | コンポーネントを囲むボーダーのカラーです | `var(--comm-grey-300)`
 * `--comm-collapse-frame-border-width` | コンポーネントを囲むボーダーの太さです | `1px`
 * `--comm-collapse-divider-border-style` | アイテム間を仕切るボーダーのスタイルです | `solid`
 * `--comm-collapse-divider-border-color` | アイテム間を仕切るボーダーのカラーです。 | `var(--comm-grey-300)`
 * `--comm-collapse-divider-border-width` | アイテム間を仕切るボーダーの太さです | `1px`
 * `--comm-collapse-title-font-size` | アイテムタイトルのフォントサイズです。 | `16px`
 * `--comm-collapse-title-color` | アイテムタイトルのカラーです | `var(--comm-grey-900)`
 * `--comm-collapse-title-font-weight` | アイテムタイトルのフォントの太さです | `500`
 * `--comm-collapse-title-line-height` | アイテムタイトルの行の高さです | `normal`
 * `--comm-collapse-title` | アイテムタイトルのミックスインです | `{}`
 * `--comm-collapse-transition-duration` | 展開/収縮アニメーションの時間です | `300ms`
 */
var CommCollapseView = /** @class */ (function (_super) {
    __extends(CommCollapseView, _super);
    //----------------------------------------------------------------------
    //
    //  Lifecycle hooks
    //
    //----------------------------------------------------------------------
    function CommCollapseView() {
        var _this = _super.call(this) || this;
        //----------------------------------------------------------------------
        //
        //  Variables
        //
        //----------------------------------------------------------------------
        _this.m_toggleCollapseItemListeners = new WeakMap();
        _this.m_initialDividerStyle = null;
        return _this;
    }
    CommCollapseView.prototype.render = function () {
        return lit_element_1.html(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n      <style>\n        ", "\n\n        .container {\n          border-style: var(--comm-collapse-frame-border-style, none);\n          border-color: var(--comm-collapse-frame-border-color, var(--comm-grey-300));\n          border-width: var(--comm-collapse-frame-border-width, 1px);\n        }\n      </style>\n      <div class=\"container\"><slot id=\"slot\" @slotchange=\"", "\"></slot></div>\n    "], ["\n      <style>\n        ", "\n\n        .container {\n          border-style: var(--comm-collapse-frame-border-style, none);\n          border-color: var(--comm-collapse-frame-border-color, var(--comm-grey-300));\n          border-width: var(--comm-collapse-frame-border-width, 1px);\n        }\n      </style>\n      <div class=\"container\"><slot id=\"slot\" @slotchange=\"", "\"></slot></div>\n    "])), base_styles_1.baseStyles, this.m_slotOnSlotChange);
    };
    //----------------------------------------------------------------------
    //
    //  Internal methods
    //
    //----------------------------------------------------------------------
    /**
     * アイテム間のボーダーを設定します。
     */
    CommCollapseView.prototype.m_setupCollapseBorder = function () {
        var items = this.m_getCollapseItems();
        for (var i = 0; i < items.length; i++) {
            var item = items[i];
            // 外部から仕切りボーダーが非表示に設定された、または最下部のアイテムの場合
            if (this.m_initialDividerStyle === 'none' || i === items.length - 1) {
                // 仕切りボーダーは非表示にする(アイテムのボーダーとコンテナの枠線がかぶるため)
                window.ShadyCSS.styleSubtree(item, { '--comm-collapse-divider-border-style': 'none' });
            }
            // 上記以外の場合
            else {
                window.ShadyCSS.styleSubtree(item, { '--comm-collapse-divider-border-style': 'solid' });
            }
        }
    };
    /**
     * slotタグに挿入されたアイテムを取得します。
     */
    CommCollapseView.prototype.m_getCollapseItems = function () {
        if (!this.m_slot)
            return [];
        var assignedNodes = this.m_slot.assignedNodes({ flatten: false });
        return assignedNodes.filter(function (node) {
            return node instanceof comm_collapse_item_1.CommCollapseItem;
        });
    };
    //----------------------------------------------------------------------
    //
    //  Event handlers
    //
    //----------------------------------------------------------------------
    /**
     * slotにノードが配置(削除含む)された際のハンドラです。
     * @param e
     */
    CommCollapseView.prototype.m_slotOnSlotChange = function (e) {
        if (this.m_initialDividerStyle === null) {
            this.m_initialDividerStyle = window.ShadyCSS.getComputedStyleValue(this, '--comm-collapse-divider-border-style');
        }
        var diff = this.f_getDistributedChildDiff(this.m_slot);
        // 追加されたアイテムの処理
        for (var _i = 0, _a = diff.added; _i < _a.length; _i++) {
            var addedItem = _a[_i];
            if (!(addedItem instanceof HTMLElement))
                continue;
            if (!(addedItem instanceof comm_collapse_item_1.CommCollapseItem)) {
                throw new Error('Light DOM must be CommCollapseItem.');
            }
            var listener = this.m_collapseItemOnToggleCollapseItem.bind(this);
            this.m_toggleCollapseItemListeners.set(addedItem, listener);
            addedItem.addEventListener('toggle-item', listener);
        }
        // 削除されたアイテムの処理
        for (var _b = 0, _c = diff.removed; _b < _c.length; _b++) {
            var removedItem = _c[_b];
            var listener = this.m_toggleCollapseItemListeners.get(removedItem);
            this.m_toggleCollapseItemListeners.delete(removedItem);
            if (listener) {
                removedItem.removeEventListener('toggle-item', listener);
            }
        }
        // アイテム間のボーダー設定
        this.m_setupCollapseBorder();
    };
    /**
     * アイテムが開閉された際のハンドラです。
     * @param e
     */
    CommCollapseView.prototype.m_collapseItemOnToggleCollapseItem = function (e) {
        // 必要があれば用のプレースホルダ
    };
    __decorate([
        lit_element_1.query('#slot')
    ], CommCollapseView.prototype, "m_slot", void 0);
    return CommCollapseView;
}(comm_base_element_1.CommBaseElement));
exports.CommCollapseView = CommCollapseView;
customElements.define('comm-collapse-view', CommCollapseView);
var templateObject_1;
