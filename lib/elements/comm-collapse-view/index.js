"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
require("../../styles/base-styles");
const comm_collapse_item_1 = require("./comm-collapse-item");
const flattened_nodes_observer_1 = require("@polymer/polymer/lib/utils/flattened-nodes-observer");
const polymer_element_1 = require("@polymer/polymer/polymer-element");
const decorators_1 = require("@polymer/decorators");
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
let CommCollapseView = class CommCollapseView extends polymer_element_1.PolymerElement {
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
    constructor() {
        super(...arguments);
        //----------------------------------------------------------------------
        //
        //  Variables
        //
        //----------------------------------------------------------------------
        this.m_toggleCollapseItemListeners = new WeakMap();
        this.m_initialDividerStyle = '';
    }
    static get template() {
        return polymer_element_1.html `
      <style include="base-styles">
        .container {
          border-style: var(--comm-collapse-frame-border-style, none);
          border-color: var(--comm-collapse-frame-border-color, var(--comm-grey-300));
          border-width: var(--comm-collapse-frame-border-width, 1px);
        }
      </style>
      <div class="container">
        <slot id="slot"></slot>
      </div>
    `;
    }
    //----------------------------------------------------------------------
    //
    //  Lifecycle hooks
    //
    //----------------------------------------------------------------------
    ready() {
        super.ready();
        this.m_initialDividerStyle = window.ShadyCSS.getComputedStyleValue(this, '--comm-collapse-divider-border-style');
        new flattened_nodes_observer_1.FlattenedNodesObserver(this.m_slot, (info) => {
            // 追加されたアイテムの処理
            for (const addedItem of info.addedNodes) {
                if (!(addedItem instanceof HTMLElement))
                    continue;
                if (!(addedItem instanceof comm_collapse_item_1.CommCollapseItem)) {
                    throw new Error('Light DOM must be CommCollapseItem.');
                }
                const listener = this.m_collapseItemOnToggleCollapseItem.bind(this);
                this.m_toggleCollapseItemListeners.set(addedItem, listener);
                addedItem.addEventListener('toggle-item', listener);
            }
            // 削除されたアイテムの処理
            for (const removedItem of info.removedNodes) {
                const listener = this.m_toggleCollapseItemListeners.get(removedItem);
                this.m_toggleCollapseItemListeners.delete(removedItem);
                if (listener) {
                    removedItem.removeEventListener('toggle-item', listener);
                }
            }
            // アイテム間のボーダー設定
            this.m_setupCollapseBorder();
        });
    }
    //----------------------------------------------------------------------
    //
    //  Internal methods
    //
    //----------------------------------------------------------------------
    /**
     * アイテム間のボーダーを設定します。
     */
    m_setupCollapseBorder() {
        const items = this.m_getCollapseItems();
        for (let i = 0; i < items.length; i++) {
            const item = items[i];
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
    }
    /**
     * slotタグに挿入されたアイテムを取得します。
     */
    m_getCollapseItems() {
        if (!this.m_slot)
            return [];
        const assignedNodes = this.m_slot.assignedNodes({ flatten: false });
        return assignedNodes.filter((node) => {
            return node instanceof comm_collapse_item_1.CommCollapseItem;
        });
    }
    //----------------------------------------------------------------------
    //
    //  Event handlers
    //
    //----------------------------------------------------------------------
    /**
     * アイテムが開閉された際のハンドラです。
     * @param event
     */
    m_collapseItemOnToggleCollapseItem(event) {
        // 必要があれば用のプレースホルダ
    }
};
__decorate([
    decorators_1.query('#slot')
], CommCollapseView.prototype, "m_slot", void 0);
CommCollapseView = __decorate([
    decorators_1.customElement('comm-collapse-view')
], CommCollapseView);
exports.CommCollapseView = CommCollapseView;
