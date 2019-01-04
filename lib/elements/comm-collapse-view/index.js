"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
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
var comm_collapse_item_1 = require("./comm-collapse-item");
var flattened_nodes_observer_1 = require("@polymer/polymer/lib/utils/flattened-nodes-observer");
var polymer_element_1 = require("@polymer/polymer/polymer-element");
var decorators_1 = require("@polymer/decorators");
require("../../styles/polymer/base-styles");
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
    function CommCollapseView() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        //----------------------------------------------------------------------
        //
        //  Variables
        //
        //----------------------------------------------------------------------
        _this.m_toggleCollapseItemListeners = new WeakMap();
        _this.m_initialDividerStyle = '';
        return _this;
    }
    Object.defineProperty(CommCollapseView, "template", {
        get: function () {
            return polymer_element_1.html(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n      <style include=\"base-styles\">\n        .container {\n          border-style: var(--comm-collapse-frame-border-style, none);\n          border-color: var(--comm-collapse-frame-border-color, var(--comm-grey-300));\n          border-width: var(--comm-collapse-frame-border-width, 1px);\n        }\n      </style>\n      <div class=\"container\">\n        <slot id=\"slot\"></slot>\n      </div>\n    "], ["\n      <style include=\"base-styles\">\n        .container {\n          border-style: var(--comm-collapse-frame-border-style, none);\n          border-color: var(--comm-collapse-frame-border-color, var(--comm-grey-300));\n          border-width: var(--comm-collapse-frame-border-width, 1px);\n        }\n      </style>\n      <div class=\"container\">\n        <slot id=\"slot\"></slot>\n      </div>\n    "])));
        },
        enumerable: true,
        configurable: true
    });
    //----------------------------------------------------------------------
    //
    //  Lifecycle hooks
    //
    //----------------------------------------------------------------------
    CommCollapseView.prototype.ready = function () {
        var _this = this;
        _super.prototype.ready.call(this);
        this.m_initialDividerStyle = window.ShadyCSS.getComputedStyleValue(this, '--comm-collapse-divider-border-style');
        new flattened_nodes_observer_1.FlattenedNodesObserver(this.m_slot, function (info) {
            // 追加されたアイテムの処理
            for (var _i = 0, _a = info.addedNodes; _i < _a.length; _i++) {
                var addedItem = _a[_i];
                if (!(addedItem instanceof HTMLElement))
                    continue;
                if (!(addedItem instanceof comm_collapse_item_1.CommCollapseItem)) {
                    throw new Error('Light DOM must be CommCollapseItem.');
                }
                var listener = _this.m_collapseItemOnToggleCollapseItem.bind(_this);
                _this.m_toggleCollapseItemListeners.set(addedItem, listener);
                addedItem.addEventListener('toggle-item', listener);
            }
            // 削除されたアイテムの処理
            for (var _b = 0, _c = info.removedNodes; _b < _c.length; _b++) {
                var removedItem = _c[_b];
                var listener = _this.m_toggleCollapseItemListeners.get(removedItem);
                _this.m_toggleCollapseItemListeners.delete(removedItem);
                if (listener) {
                    removedItem.removeEventListener('toggle-item', listener);
                }
            }
            // アイテム間のボーダー設定
            _this.m_setupCollapseBorder();
        });
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
            if (this.m_initialDividerStyle === 'none' || i === items.length - 1) {
                // 外部から仕切りボーダーが非表示に設定された、
                // または最下部のアイテムの仕切りボーダーは非表示にする
                // (アイテムのボーダーとコンテナの枠線がかぶるため)
                item.updateStyles({
                    '--comm-collapse-divider-border-style': 'none',
                });
            }
            else {
                item.updateStyles({
                    '--comm-collapse-divider-border-style': 'solid',
                });
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
     * アイテムが開閉された際のハンドラです。
     * @param event
     */
    CommCollapseView.prototype.m_collapseItemOnToggleCollapseItem = function (event) {
        // 必要があれば用のプレースホルダ
    };
    __decorate([
        decorators_1.query('#slot')
    ], CommCollapseView.prototype, "m_slot", void 0);
    CommCollapseView = __decorate([
        decorators_1.customElement('comm-collapse-view')
    ], CommCollapseView);
    return CommCollapseView;
}(polymer_element_1.PolymerElement));
exports.CommCollapseView = CommCollapseView;
var templateObject_1;
