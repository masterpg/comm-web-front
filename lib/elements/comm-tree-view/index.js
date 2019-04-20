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
const lit_element_1 = require("lit-element");
const comm_base_element_1 = require("../comm-base-element");
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
 * `--comm-tree-node-item-font-size` | ノードアイテムのフォントサイズです | `16px`
 * `--comm-tree-node-item-font-weight` | ノードアイテムのフォントの太さです | `500`
 * `--comm-tree-node-item-line-height` | ノードアイテムの行の高さです | `24px`
 * `--comm-tree-node-item` |  | `{}`
 * `--comm-tree-node-item-link-color` | ノードアイテムのリンクカラーです | `var(--comm-indigo-800)`
 * `--comm-tree-node-item-selected-color` | ノードアイテムの選択時のカラーです | `var(--comm-pink-500)`
 * `--comm-tree-node-item-unselectable-color` | ノードアイテムが非選択ノードの場合のカラーです | `var(--comm-grey900)`
 */
let CommTreeView = class CommTreeView extends comm_base_element_1.CommBaseElement {
    //----------------------------------------------------------------------
    //
    //  Lifecycle hooks
    //
    //----------------------------------------------------------------------
    constructor() {
        super();
        // ノードアイテムのイベント設定
        this.m_addItemSelectedEventListener();
    }
    render() {
        return lit_element_1.html `
      <slot id="slot" name="child" @slotchange="${this.m_slotOnSlotChange}"></slot>
    `;
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
     *   itemEvents: ツリービューが集約すべきノードアイテムのイベント名のリスト
     */
    buildTree(tree, options) {
        options = options || {};
        const itemEvents = options.itemEvents ? options.itemEvents : [];
        for (const eventName of itemEvents) {
            this.m_addAnyEventListener(eventName);
        }
        for (const structureNode of tree) {
            this.recursiveBuildTree(structureNode, this);
        }
    }
    //----------------------------------------------------------------------
    //
    //  Internal methods
    //
    //----------------------------------------------------------------------
    /**
     * ツリービューのノードとアイテムを再帰的に構築します。
     * @param item ツリービューを構築するためのノードアイテムのデータ
     * @param parentOfNode ノードの親エレメント
     */
    recursiveBuildTree(item, parentOfNode) {
        // ノードアイテムエレメントの作成
        const itemClass = item.itemClass || CommTreeNodeItem;
        const nodeItem = new itemClass();
        nodeItem.setAttribute('slot', 'item');
        nodeItem.value = item.value;
        nodeItem.unselectable = Boolean(item.unselectable);
        const el = document.createElement('span');
        el.innerHTML = item.content;
        nodeItem.appendChild(el);
        // ノードエレメントの作成
        const node = new CommTreeNode();
        node.opened = Boolean(item.opened);
        node.setAttribute('slot', 'child');
        node.appendChild(nodeItem);
        // ノードエレメントの子ノードを作成
        if (item.children) {
            for (const childStructureItem of item.children) {
                this.recursiveBuildTree(childStructureItem, node);
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
        this.addEventListener(eventName, e => {
            if (e.target instanceof CommTreeNodeItem) {
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
        this.addEventListener(EVENT_ITEM_SELECTED, e => {
            if (e.target instanceof CommTreeNodeItem) {
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
        return this.m_slot.assignedNodes().filter(node => {
            return node instanceof CommTreeNode;
        });
    }
    //----------------------------------------------------------------------
    //
    //  Event handlers
    //
    //----------------------------------------------------------------------
    /**
     * slotにノードが配置(削除含む)された際のハンドラです。
     * @param e
     */
    m_slotOnSlotChange(e) {
        const diff = this.getDistributedChildDiff(this.m_slot);
        // 追加されたアイテムの処理
        for (const addedItem of diff.added) {
            if (!(addedItem instanceof HTMLElement))
                continue;
            if (!(addedItem instanceof CommTreeNode)) {
                throw new Error('Light DOM must be CommTreeNode.');
            }
        }
    }
};
__decorate([
    lit_element_1.query('#slot')
], CommTreeView.prototype, "m_slot", void 0);
CommTreeView = __decorate([
    lit_element_1.customElement('comm-tree-view')
], CommTreeView);
exports.CommTreeView = CommTreeView;
let CommTreeNode = CommTreeNode_1 = class CommTreeNode extends comm_base_element_1.CommBaseElement {
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
    static get styles() {
        return lit_element_1.css `
      ${comm_base_element_1.CommCSSStyle.styles}

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
    `;
    }
    render() {
        return lit_element_1.html `
      <div id="itemContainer" class="layout horizontal center">
        <iron-icon id="toggleIcon" class="toggle-icon" icon="${this.m_toggleIconKind}" @click="${this.m_toggleIconOnClick}"></iron-icon>
        <svg id="pointIcon" width="24" height="24" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
          <circle cx="12" cy="12" r="3" stroke="blue" fill="#9b9b9b" stroke-width="0" />
        </svg>
        <div class="flex"><slot id="itemSlot" name="item" @slotchange="${this.m_itemSlotOnSlotChange}"></slot></div>
      </div>
      <iron-collapse id="collapse" ?opened="${this.opened}">
        <div><slot id="childSlot" name="child" @slotchange="${this.m_childSlotOnSlotChange}"></slot></div>
      </iron-collapse>
    `;
    }
    connectedCallback() {
        super.connectedCallback();
        setTimeout(() => {
            // 表示関連の設定処理
            this.m_setupDisplay();
        });
    }
    updated(changedProperties) {
        changedProperties.forEach((oldValue, propName) => {
            switch (propName) {
                case 'opened':
                    this.m_openedChanged(this.opened, oldValue);
                    break;
            }
        });
    }
    //----------------------------------------------------------------------
    //
    //  Internal methods
    //
    //----------------------------------------------------------------------
    m_openedChanged(newValue, oldValue) {
        this.m_toggleIconKind = newValue ? 'icons:expand-more' : 'icons:chevron-right';
    }
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
        return this.m_childSlot.assignedNodes().filter(node => {
            return node instanceof CommTreeNode_1;
        });
    }
    //----------------------------------------------------------------------
    //
    //  Event handlers
    //
    //----------------------------------------------------------------------
    /**
     * アイテムスロットにノードが配置(削除含む)された際のハンドラです。
     * @param e
     */
    m_itemSlotOnSlotChange(e) {
        const diff = this.getDistributedChildDiff(this.m_itemSlot);
        // 追加されたアイテムの処理
        for (const addedItem of diff.added) {
            if (!(addedItem instanceof HTMLElement))
                continue;
            if (addedItem instanceof CommTreeNodeItem) {
            }
        }
    }
    /**
     * チャイルドスロットにノードが配置(削除含む)された際のハンドラです。
     * @param e
     */
    m_childSlotOnSlotChange(e) {
        const diff = this.getDistributedChildDiff(this.m_childSlot);
        // 追加されたアイテムの処理
        for (const addedItem of diff.added) {
            if (!(addedItem instanceof HTMLElement))
                continue;
            if (!(addedItem instanceof CommTreeNode_1)) {
                throw new Error('Light DOM must be CommTreeNode.');
            }
        }
        // 表示関連の設定処理
        this.m_setupDisplay();
    }
    /**
     * トグルアイコンがクリックされた際のハンドラです。
     * @param e
     */
    m_toggleIconOnClick(e) {
        this.opened = !this.opened;
        this.dispatchEvent(new CustomEvent('toggle-node'));
    }
};
__decorate([
    lit_element_1.property({ type: String })
], CommTreeNode.prototype, "m_toggleIconKind", void 0);
__decorate([
    lit_element_1.query('#itemContainer')
], CommTreeNode.prototype, "m_itemContainer", void 0);
__decorate([
    lit_element_1.query('#itemSlot')
], CommTreeNode.prototype, "m_itemSlot", void 0);
__decorate([
    lit_element_1.query('#childSlot')
], CommTreeNode.prototype, "m_childSlot", void 0);
__decorate([
    lit_element_1.query('#toggleIcon')
], CommTreeNode.prototype, "m_toggleIcon", void 0);
__decorate([
    lit_element_1.query('#pointIcon')
], CommTreeNode.prototype, "m_pointIcon", void 0);
__decorate([
    lit_element_1.property({ type: Boolean, reflect: true })
], CommTreeNode.prototype, "opened", void 0);
CommTreeNode = CommTreeNode_1 = __decorate([
    lit_element_1.customElement('comm-tree-node')
], CommTreeNode);
exports.CommTreeNode = CommTreeNode;
let CommTreeNodeItem = class CommTreeNodeItem extends comm_base_element_1.CommBaseElement {
    //----------------------------------------------------------------------
    //
    //  Lifecycle hooks
    //
    //----------------------------------------------------------------------
    constructor() {
        super();
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
         * 選択不可フラグです。
         */
        this.unselectable = false;
        //----------------------------------------------------------------------
        //
        //  Variables
        //
        //----------------------------------------------------------------------
        /**
         * 本クラスを継承した際に拡張可能なHTMLテンプレートです。
         * 継承した際は必要に応じてHTMLテンプレートを変更することができます。
         */
        this.itemTemplate = lit_element_1.html `
    <slot></slot>
  `;
    }
    static get styles() {
        return lit_element_1.css `
      ${comm_base_element_1.CommCSSStyle.styles}

      ::slotted(*) {
      }

      ${comm_base_element_1.CommCSSStyle.extendClass('.item', '.comm-font-common-base')}

      .item {
        font-size: var(--comm-tree-node-item-font-size, 16px);
        color: var(--comm-tree-node-item-link-color, var(--comm-indigo-800));
        font-weight: var(--comm-tree-node-item-font-weight, 500);
        line-height: var(--comm-tree-node-item-line-height, 24px);
        cursor: pointer;
      }

      .item:hover {
        text-decoration: underline;
      }

      :host([selected]) .item {
        color: var(--comm-tree-node-item-selected-color, var(--comm-pink-500));
      }

      :host([unselectable]) .item {
        color: var(--comm-tree-node-item-unselectable-color, var(--comm-grey900));
        cursor: default;
      }

      :host([unselectable]) .item:hover {
        text-decoration: none;
      }
    `;
    }
    render() {
        return lit_element_1.html `
      <span class="item" @click="${this.itemOnClick}">${this.itemTemplate}</span>
    `;
    }
    //----------------------------------------------------------------------
    //
    //  Event handlers
    //
    //----------------------------------------------------------------------
    itemOnClick(e) {
        this.selected = true;
        if (!this.unselectable) {
            this.dispatchEvent(new CustomEvent('item-selected', { bubbles: true, composed: true }));
        }
    }
};
__decorate([
    lit_element_1.property({ type: Boolean, reflect: true })
], CommTreeNodeItem.prototype, "selected", void 0);
__decorate([
    lit_element_1.property({ type: String })
], CommTreeNodeItem.prototype, "value", void 0);
__decorate([
    lit_element_1.property({ type: Boolean, reflect: true })
], CommTreeNodeItem.prototype, "unselectable", void 0);
CommTreeNodeItem = __decorate([
    lit_element_1.customElement('comm-tree-node-item')
], CommTreeNodeItem);
exports.CommTreeNodeItem = CommTreeNodeItem;
