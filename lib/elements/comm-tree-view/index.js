"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var CommTreeNode_1;
"use strict";
require("@polymer/iron-collapse/iron-collapse");
require("@polymer/iron-flex-layout/iron-flex-layout");
require("@polymer/iron-flex-layout/iron-flex-layout-classes");
require("@polymer/iron-icon/iron-icon");
require("@polymer/iron-icons/iron-icons");
const flattened_nodes_observer_1 = require("@polymer/polymer/lib/utils/flattened-nodes-observer");
const gesture_event_listeners_1 = require("@polymer/polymer/lib/mixins/gesture-event-listeners");
const polymer_element_1 = require("@polymer/polymer/polymer-element");
const decorators_1 = require("@polymer/decorators");
require("../../styles/polymer/base-styles");
/**
 * # comm-tree-view
 *
 * ## Description
 *
 * ツリーコンポーネントです。
 *
 * ## Styling
 *
 * Custom property | Description | Default
 * ----------------|-------------|----------
 * `--comm-tree-node-distance` | ノードとノードの縦の間隔です | `10px`
 * `--comm-tree-node-indent` | ノードの左インデントです | `12px`
 * `--comm-tree-item-font-size` | ノードアイテムのフォントサイズです | `16px`
 * `--comm-tree-item-font-weight` | ノードアイテムのフォントの太さです | `500`
 * `--comm-tree-item-line-height` | ノードアイテムの行の高さです | `24px`
 * `--comm-tree-item` |  | `{}`
 * `--comm-tree-item-link-color` | ノードアイテムのリンクカラーです | `var(--comm-indigo-800)`
 * `--comm-tree-item-selected-color` | ノードアイテムの選択時のカラーです | `var(--comm-pink-500)`
 * `--comm-tree-item-unselectable-color` | ノードアイテムが非選択ノードの場合のカラー | `var(--comm-grey900)`
 */
let CommTreeView = class CommTreeView extends gesture_event_listeners_1.GestureEventListeners(polymer_element_1.PolymerElement) {
    static get template() {
        return polymer_element_1.html `
      <slot id="slot" name="child"></slot>
    `;
    }
    //----------------------------------------------------------------------
    //
    //  Lifecycle hooks
    //
    //----------------------------------------------------------------------
    ready() {
        super.ready();
        // ノードアイテムのイベント設定
        this.m_addItemSelectedEventListener();
        // スロットの監視処理
        new flattened_nodes_observer_1.FlattenedNodesObserver(this.m_slot, (info) => {
            // 追加されたアイテムの処理
            for (const addedItem of info.addedNodes) {
                if (!(addedItem instanceof HTMLElement))
                    continue;
                if (!(addedItem instanceof CommTreeNode)) {
                    throw new Error('Light DOM must be CommTreeNode.');
                }
            }
        });
    }
    //----------------------------------------------------------------------
    //
    //  Methods
    //
    //----------------------------------------------------------------------
    /**
     * ツリービューを指定されたツリーデータで構築します。
     * @param tree ツリービューを構築するためのデータ
     * @param options
     *   itemClasses: ツリービューの構築に必要なノードアイテムのクラスリスト
     *   itemEvents: ツリービューが集約すべきノードアイテムのイベント名のリスト
     */
    buildTree(tree, options) {
        options = options || {};
        const itemClasses = Object.assign({ CommTreeItem }, options.itemClasses);
        const itemEvents = options.itemEvents ? options.itemEvents : [];
        for (const eventName of itemEvents) {
            this.m_addAnyEventListener(eventName);
        }
        for (const structureNode of tree) {
            this.f_recursiveBuildTree(itemClasses, structureNode, this);
        }
    }
    //----------------------------------------------------------------------
    //
    //  Internal methods
    //
    //----------------------------------------------------------------------
    /**
     * ツリービューのノードとアイテムを再帰的に構築します。
     * @param itemClasses ツリービューの構築に必要なアイテムのクラスリスト
     * @param item ツリービューを構築するためのノードアイテムのデータ
     * @param parentOfNode ノードの親エレメント
     */
    f_recursiveBuildTree(itemClasses, item, parentOfNode) {
        // ノードアイテムエレメントの作成
        const itemClassName = item.itemClass ? item.itemClass : 'CommTreeItem';
        const itemClass = itemClasses[itemClassName];
        // @ts-ignore
        const nodeItem = new itemClass();
        nodeItem.setAttribute('slot', 'item');
        nodeItem.selectedValue = item.selectedValue;
        nodeItem.unselectable = Boolean(item.unselectable);
        const el = document.createElement('span');
        el.innerHTML = item.itemHTML;
        nodeItem.appendChild(el);
        // ノードエレメントの作成
        const node = new CommTreeNode();
        node.opened = Boolean(item.opened);
        node.setAttribute('slot', 'child');
        node.appendChild(nodeItem);
        // ノードエレメントの子ノードを作成
        if (item.children) {
            for (const childStructureItem of item.children) {
                this.f_recursiveBuildTree(itemClasses, childStructureItem, node);
            }
        }
        // ノードの親に上記で作成したノードエレメントを追加
        parentOfNode.appendChild(node);
    }
    /**
     * 指定されたイベントのリスナーを登録します。
     * 登録されたリスナーではイベントを集約し、ツリービューが代わりにそのイベントを発火します。
     * @param eventName
     */
    m_addAnyEventListener(eventName) {
        this.addEventListener(eventName, (e) => {
            if (e.target instanceof CommTreeItem) {
                // 選択されたノードアイテムを取得
                const item = e.target;
                // ノードアイテムのイベントを伝搬しないようここでストップする
                e.stopImmediatePropagation();
                // ツリービューが代わりにそのイベントを発火
                this.dispatchEvent(new CustomEvent(eventName, { detail: { item } }));
            }
        }, true);
    }
    /**
     * item-selectedイベントのリスナーを登録します。
     * 登録されたリスナーではイベントを集約し、ツリービューが代わりにそのイベントを発火します。
     */
    m_addItemSelectedEventListener() {
        const EVENT_ITEM_SELECTED = 'item-selected';
        this.addEventListener(EVENT_ITEM_SELECTED, (e) => {
            if (e.target instanceof CommTreeItem) {
                // 選択されたノードアイテムを取得
                const item = e.target;
                // 選択されたノードアイテム以外の選択を解除
                if (this.m_selectedItem && this.m_selectedItem !== item) {
                    this.m_selectedItem.selected = false;
                }
                this.m_selectedItem = item;
                // ノードアイテムのイベントを伝搬しないようここでストップする
                e.stopImmediatePropagation();
                // ツリービューが代わりにそのイベントを発火
                this.dispatchEvent(new CustomEvent(EVENT_ITEM_SELECTED, { detail: { item } }));
            }
        }, true);
    }
    /**
     * 子ノードを取得します。
     */
    m_getChildNodes() {
        return this.m_slot.assignedNodes().filter((node) => {
            return node instanceof CommTreeNode;
        });
    }
};
__decorate([
    decorators_1.query('#slot')
], CommTreeView.prototype, "m_slot", void 0);
CommTreeView = __decorate([
    decorators_1.customElement('comm-tree-view')
], CommTreeView);
exports.CommTreeView = CommTreeView;
let CommTreeNode = CommTreeNode_1 = class CommTreeNode extends gesture_event_listeners_1.GestureEventListeners(polymer_element_1.PolymerElement) {
    //----------------------------------------------------------------------
    //
    //  Lifecycle hooks
    //
    //----------------------------------------------------------------------
    constructor() {
        super();
        //----------------------------------------------------------------------
        //
        //  Variables
        //
        //----------------------------------------------------------------------
        this.m_toggleIconKind = '';
        //----------------------------------------------------------------------
        //
        //  Properties
        //
        //----------------------------------------------------------------------
        /**
         * アイテムの開閉です。
         */
        this.opened = false;
    }
    static get template() {
        return polymer_element_1.html `
      <style include="base-styles">
        #itemContainer {
          padding-top: var(--comm-tree-node-distance, 10px);
        }
        .toggle-icon {
          margin-right: 2px;
          color: var(--comm-grey-600);
          cursor: pointer;
        }
        #collapse > div {
          padding-left: var(--comm-tree-node-indent, 12px);
        }
      </style>
      <div id="itemContainer" class="layout horizontal center">
        <iron-icon id="toggleIcon" class="toggle-icon" icon="[[m_toggleIconKind]]" on-tap="m_toggleIconOnTap"></iron-icon>
        <svg id="pointIcon" width="24" height="24" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
          <circle cx="12" cy="12" r="3" stroke="blue" fill="#9b9b9b" stroke-width="0"/>
        </svg>
        <div class="flex"><slot id="itemSlot" name="item"></slot></div>
      </div>
      <iron-collapse id="collapse" opened="{{opened}}">
        <div><slot id="childSlot" name="child"></slot></div>
      </iron-collapse>
    `;
    }
    m_computeToggleIconKind(opened) {
        return opened ? 'icons:expand-more' : 'icons:chevron-right';
    }
    ready() {
        super.ready();
        // 表示関連の設定処理
        this.m_setupDisplay();
        // アイテムスロットの監視処理
        new flattened_nodes_observer_1.FlattenedNodesObserver(this.m_itemSlot, (info) => {
            // 追加されたアイテムの処理
            for (const addedItem of info.addedNodes) {
                if (!(addedItem instanceof HTMLElement))
                    continue;
                if (addedItem instanceof CommTreeItem) {
                }
            }
        });
        // 子ノードスロットの監視処理
        new flattened_nodes_observer_1.FlattenedNodesObserver(this.m_childSlot, (info) => {
            // 追加されたアイテムの処理
            for (const addedItem of info.addedNodes) {
                if (!(addedItem instanceof HTMLElement))
                    continue;
                if (!(addedItem instanceof CommTreeNode_1)) {
                    throw new Error('Light DOM must be CommTreeNode.');
                }
            }
            // 表示関連の設定処理
            this.m_setupDisplay();
        });
    }
    //----------------------------------------------------------------------
    //
    //  Internal methods
    //
    //----------------------------------------------------------------------
    /**
     * 表示関連の設定処理を行います。
     */
    m_setupDisplay() {
        this.m_setupAppropriateIcon();
        this.m_setDistance();
    }
    /**
     * ノードアイテムの左側に適切なアイコン(トグルまたはポイントアイコン)を設定します。
     */
    m_setupAppropriateIcon() {
        const childNodes = this.m_getChildNodes();
        if (childNodes.length === 0) {
            this.m_toggleIcon.style.display = 'none';
            this.m_pointIcon.style.display = 'block';
        }
        else {
            this.m_toggleIcon.style.display = 'block';
            this.m_pointIcon.style.display = 'none';
        }
    }
    /**
     * 現ノードと隣接するノードの上下間隔を設定します。
     */
    m_setDistance() {
        // 現ノードが親から見た最初の子の場合、上下間隔は0pxに設定する
        const parent = this.m_getParent();
        if (parent) {
            const children = Array.prototype.slice.call(parent.children);
            if (children.length && children[0] === this) {
                this.m_itemContainer.style.setProperty('--comm-tree-node-distance', '0px');
            }
        }
        // 現ノードと子ノードの上下間隔を設定する
        const childNodes = this.m_getChildNodes();
        for (const childNode of childNodes) {
            const style = document.defaultView.getComputedStyle(childNode);
            const distance = style.getPropertyValue('--comm-tree-node-distance').trim();
            childNode.style.setProperty('--comm-tree-node-distance', distance);
        }
    }
    /**
     * 親エレメントを取得します。
     */
    m_getParent() {
        if (this.parentElement instanceof CommTreeView || this.parentElement instanceof CommTreeNode_1) {
            return this.parentElement;
        }
        return undefined;
    }
    /**
     * 子ノードを取得します。
     */
    m_getChildNodes() {
        return this.m_childSlot.assignedNodes().filter((node) => {
            return node instanceof CommTreeNode_1;
        });
    }
    //----------------------------------------------------------------------
    //
    //  Event handlers
    //
    //----------------------------------------------------------------------
    /**
     * トグルアイコンがタップされた際のハンドラです。
     * @param e
     */
    m_toggleIconOnTap(e) {
        this.opened = !this.opened;
        this.dispatchEvent(new CustomEvent('toggle-node'));
    }
};
__decorate([
    decorators_1.property({ type: String, computed: 'm_computeToggleIconKind(opened)' })
], CommTreeNode.prototype, "m_toggleIconKind", void 0);
__decorate([
    decorators_1.query('#itemContainer')
], CommTreeNode.prototype, "m_itemContainer", void 0);
__decorate([
    decorators_1.query('#itemSlot')
], CommTreeNode.prototype, "m_itemSlot", void 0);
__decorate([
    decorators_1.query('#childSlot')
], CommTreeNode.prototype, "m_childSlot", void 0);
__decorate([
    decorators_1.query('#toggleIcon')
], CommTreeNode.prototype, "m_toggleIcon", void 0);
__decorate([
    decorators_1.query('#pointIcon')
], CommTreeNode.prototype, "m_pointIcon", void 0);
__decorate([
    decorators_1.property({ type: Boolean, reflectToAttribute: true })
], CommTreeNode.prototype, "opened", void 0);
CommTreeNode = CommTreeNode_1 = __decorate([
    decorators_1.customElement('comm-tree-node')
], CommTreeNode);
exports.CommTreeNode = CommTreeNode;
let CommTreeItem = class CommTreeItem extends gesture_event_listeners_1.GestureEventListeners(polymer_element_1.PolymerElement) {
    constructor() {
        super(...arguments);
        //----------------------------------------------------------------------
        //
        //  Properties
        //
        //----------------------------------------------------------------------
        /**
         * 選択されているか否かです。
         */
        this.selected = false;
        /**
         * 選択値です。
         */
        this.selectedValue = '';
        /**
         * 選択不可フラグです。
         */
        this.unselectable = false;
    }
    static get template() {
        return polymer_element_1.html `
      <style include="base-styles">
        ::slotted(*) {
        }
        .item {
          @apply(--comm-font-common-base);
          font-size: var(--comm-tree-item-font-size, 16px);
          color: var(--comm-tree-item-link-color, var(--comm-indigo-800));
          font-weight: var(--comm-tree-item-font-weight, 500);
          line-height: var(--comm-tree-item-line-height, 24px);
          cursor: pointer;
          @apply(--comm-tree-item);
        }
        .item:hover {
          text-decoration: underline;
        }
        :host([selected]) .item {
          color: var(--comm-tree-item-selected-color, var(--comm-pink-500));
        }
        :host([unselectable]) .item {
          color: var(--comm-tree-item-unselectable-color, var(--comm-grey900));
          cursor: default;
        }
        :host([unselectable]) .item:hover {
          text-decoration: none;
        }
        ${this.f_extendedStyle}
      </style>
      <span class="item" on-tap="f_itemOnTap">${this.f_extendedTemplate}</span>
    `;
    }
    //----------------------------------------------------------------------
    //
    //  Lifecycle hooks
    //
    //----------------------------------------------------------------------
    ready() {
        super.ready();
    }
    //----------------------------------------------------------------------
    //
    //  Event handlers
    //
    //----------------------------------------------------------------------
    f_itemOnTap(e) {
        this.selected = true;
        if (!this.unselectable) {
            this.dispatchEvent(new CustomEvent('item-selected', { bubbles: true, composed: true }));
        }
    }
};
//----------------------------------------------------------------------
//
//  Variables
//
//----------------------------------------------------------------------
/**
 * 本クラスを継承した際に拡張可能なHTMLテンプレートです。
 * 継承した際は必要に応じてスタイルを変更することができます。
 */
CommTreeItem.f_extendedStyle = polymer_element_1.html ``;
/**
 * 本クラスを継承した際に拡張可能なHTMLテンプレートです。
 * 継承した際は必要に応じてHTMLテンプレートを変更することができます。
 */
CommTreeItem.f_extendedTemplate = polymer_element_1.html `<slot></slot>`;
__decorate([
    decorators_1.property({ type: Boolean, reflectToAttribute: true })
], CommTreeItem.prototype, "selected", void 0);
__decorate([
    decorators_1.property({ type: String })
], CommTreeItem.prototype, "selectedValue", void 0);
__decorate([
    decorators_1.property({ type: Boolean, reflectToAttribute: true })
], CommTreeItem.prototype, "unselectable", void 0);
CommTreeItem = __decorate([
    decorators_1.customElement('comm-tree-item')
], CommTreeItem);
exports.CommTreeItem = CommTreeItem;
