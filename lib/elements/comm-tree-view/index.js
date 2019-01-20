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
require("@polymer/iron-collapse/iron-collapse");
require("@polymer/iron-flex-layout/iron-flex-layout");
require("@polymer/iron-flex-layout/iron-flex-layout-classes");
require("@polymer/iron-icon/iron-icon");
require("@polymer/iron-icons/iron-icons");
var lit_element_1 = require("lit-element");
var base_styles_1 = require("../../styles/polymer/base-styles");
var comm_base_element_1 = require("../comm-base-element");
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
var CommTreeView = /** @class */ (function (_super) {
    __extends(CommTreeView, _super);
    //----------------------------------------------------------------------
    //
    //  Lifecycle hooks
    //
    //----------------------------------------------------------------------
    function CommTreeView() {
        var _this = _super.call(this) || this;
        // ノードアイテムのイベント設定
        _this.m_addItemSelectedEventListener();
        return _this;
    }
    CommTreeView.prototype.render = function () {
        return lit_element_1.html(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n      <slot id=\"slot\" name=\"child\" @slotchange=\"", "\"></slot>\n    "], ["\n      <slot id=\"slot\" name=\"child\" @slotchange=\"", "\"></slot>\n    "])), this.m_slotOnSlotChange);
    };
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
    CommTreeView.prototype.buildTree = function (tree, options) {
        options = options || {};
        var itemClasses = Object.assign({ CommTreeItem: CommTreeItem }, options.itemClasses);
        var itemEvents = options.itemEvents ? options.itemEvents : [];
        for (var _i = 0, itemEvents_1 = itemEvents; _i < itemEvents_1.length; _i++) {
            var eventName = itemEvents_1[_i];
            this.m_addAnyEventListener(eventName);
        }
        for (var _a = 0, tree_1 = tree; _a < tree_1.length; _a++) {
            var structureNode = tree_1[_a];
            this.f_recursiveBuildTree(itemClasses, structureNode, this);
        }
    };
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
    CommTreeView.prototype.f_recursiveBuildTree = function (itemClasses, item, parentOfNode) {
        // ノードアイテムエレメントの作成
        var itemClassName = item.itemClass ? item.itemClass : 'CommTreeItem';
        var itemClass = itemClasses[itemClassName];
        // @ts-ignore
        var nodeItem = new itemClass();
        nodeItem.setAttribute('slot', 'item');
        nodeItem.selectedValue = item.selectedValue;
        nodeItem.unselectable = Boolean(item.unselectable);
        var el = document.createElement('span');
        el.innerHTML = item.itemHTML;
        nodeItem.appendChild(el);
        // ノードエレメントの作成
        var node = new CommTreeNode();
        node.opened = Boolean(item.opened);
        node.setAttribute('slot', 'child');
        node.appendChild(nodeItem);
        // ノードエレメントの子ノードを作成
        if (item.children) {
            for (var _i = 0, _a = item.children; _i < _a.length; _i++) {
                var childStructureItem = _a[_i];
                this.f_recursiveBuildTree(itemClasses, childStructureItem, node);
            }
        }
        // ノードの親に上記で作成したノードエレメントを追加
        parentOfNode.appendChild(node);
    };
    /**
     * 指定されたイベントのリスナーを登録します。
     * 登録されたリスナーではイベントを集約し、ツリービューが代わりにそのイベントを発火します。
     * @param eventName
     */
    CommTreeView.prototype.m_addAnyEventListener = function (eventName) {
        var _this = this;
        this.addEventListener(eventName, function (e) {
            if (e.target instanceof CommTreeItem) {
                // 選択されたノードアイテムを取得
                var item = e.target;
                // ノードアイテムのイベントを伝搬しないようここでストップする
                e.stopImmediatePropagation();
                // ツリービューが代わりにそのイベントを発火
                _this.dispatchEvent(new CustomEvent(eventName, { detail: { item: item } }));
            }
        }, true);
    };
    /**
     * item-selectedイベントのリスナーを登録します。
     * 登録されたリスナーではイベントを集約し、ツリービューが代わりにそのイベントを発火します。
     */
    CommTreeView.prototype.m_addItemSelectedEventListener = function () {
        var _this = this;
        var EVENT_ITEM_SELECTED = 'item-selected';
        this.addEventListener(EVENT_ITEM_SELECTED, function (e) {
            if (e.target instanceof CommTreeItem) {
                // 選択されたノードアイテムを取得
                var item = e.target;
                // 選択されたノードアイテム以外の選択を解除
                if (_this.m_selectedItem && _this.m_selectedItem !== item) {
                    _this.m_selectedItem.selected = false;
                }
                _this.m_selectedItem = item;
                // ノードアイテムのイベントを伝搬しないようここでストップする
                e.stopImmediatePropagation();
                // ツリービューが代わりにそのイベントを発火
                _this.dispatchEvent(new CustomEvent(EVENT_ITEM_SELECTED, { detail: { item: item } }));
            }
        }, true);
    };
    /**
     * 子ノードを取得します。
     */
    CommTreeView.prototype.m_getChildNodes = function () {
        return this.m_slot.assignedNodes().filter(function (node) {
            return node instanceof CommTreeNode;
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
    CommTreeView.prototype.m_slotOnSlotChange = function (e) {
        var diff = this.f_getDistributedChildDiff(this.m_slot);
        // 追加されたアイテムの処理
        for (var _i = 0, _a = diff.added; _i < _a.length; _i++) {
            var addedItem = _a[_i];
            if (!(addedItem instanceof HTMLElement))
                continue;
            if (!(addedItem instanceof CommTreeNode)) {
                throw new Error('Light DOM must be CommTreeNode.');
            }
        }
    };
    __decorate([
        lit_element_1.query('#slot')
    ], CommTreeView.prototype, "m_slot", void 0);
    return CommTreeView;
}(comm_base_element_1.CommBaseElement));
exports.CommTreeView = CommTreeView;
customElements.define('comm-tree-view', CommTreeView);
var CommTreeNode = /** @class */ (function (_super) {
    __extends(CommTreeNode, _super);
    //----------------------------------------------------------------------
    //
    //  Lifecycle hooks
    //
    //----------------------------------------------------------------------
    function CommTreeNode() {
        var _this = _super.call(this) || this;
        //----------------------------------------------------------------------
        //
        //  Variables
        //
        //----------------------------------------------------------------------
        _this.m_toggleIconKind = '';
        //----------------------------------------------------------------------
        //
        //  Properties
        //
        //----------------------------------------------------------------------
        /**
         * アイテムの開閉です。
         */
        _this.opened = false;
        return _this;
    }
    CommTreeNode.prototype.render = function () {
        return lit_element_1.html(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n      <style>\n        ", "\n\n        #itemContainer {\n          padding-top: var(--comm-tree-node-distance, 10px);\n        }\n\n        .toggle-icon {\n          margin-right: 2px;\n          color: var(--comm-grey-600);\n          cursor: pointer;\n        }\n\n        #collapse > div {\n          padding-left: var(--comm-tree-node-indent, 12px);\n        }\n      </style>\n\n      <div id=\"itemContainer\" class=\"layout horizontal center\">\n        <iron-icon\n          id=\"toggleIcon\"\n          class=\"toggle-icon\"\n          icon=\"", "\"\n          @click=\"", "\"\n        ></iron-icon>\n        <svg\n          id=\"pointIcon\"\n          width=\"24\"\n          height=\"24\"\n          xmlns=\"http://www.w3.org/2000/svg\"\n          xmlns:xlink=\"http://www.w3.org/1999/xlink\"\n        >\n          <circle cx=\"12\" cy=\"12\" r=\"3\" stroke=\"blue\" fill=\"#9b9b9b\" stroke-width=\"0\" />\n        </svg>\n        <div class=\"flex\"><slot id=\"itemSlot\" name=\"item\" @slotchange=\"", "\"></slot></div>\n      </div>\n      <iron-collapse id=\"collapse\" ?opened=\"", "\">\n        <div><slot id=\"childSlot\" name=\"child\" @slotchange=\"", "\"></slot></div>\n      </iron-collapse>\n    "], ["\n      <style>\n        ", "\n\n        #itemContainer {\n          padding-top: var(--comm-tree-node-distance, 10px);\n        }\n\n        .toggle-icon {\n          margin-right: 2px;\n          color: var(--comm-grey-600);\n          cursor: pointer;\n        }\n\n        #collapse > div {\n          padding-left: var(--comm-tree-node-indent, 12px);\n        }\n      </style>\n\n      <div id=\"itemContainer\" class=\"layout horizontal center\">\n        <iron-icon\n          id=\"toggleIcon\"\n          class=\"toggle-icon\"\n          icon=\"", "\"\n          @click=\"", "\"\n        ></iron-icon>\n        <svg\n          id=\"pointIcon\"\n          width=\"24\"\n          height=\"24\"\n          xmlns=\"http://www.w3.org/2000/svg\"\n          xmlns:xlink=\"http://www.w3.org/1999/xlink\"\n        >\n          <circle cx=\"12\" cy=\"12\" r=\"3\" stroke=\"blue\" fill=\"#9b9b9b\" stroke-width=\"0\" />\n        </svg>\n        <div class=\"flex\"><slot id=\"itemSlot\" name=\"item\" @slotchange=\"", "\"></slot></div>\n      </div>\n      <iron-collapse id=\"collapse\" ?opened=\"", "\">\n        <div><slot id=\"childSlot\" name=\"child\" @slotchange=\"", "\"></slot></div>\n      </iron-collapse>\n    "])), base_styles_1.baseStyles, this.m_toggleIconKind, this.m_toggleIconOnClick, this.m_itemSlotOnSlotChange, this.opened, this.m_childSlotOnSlotChange);
    };
    CommTreeNode.prototype.connectedCallback = function () {
        var _this = this;
        _super.prototype.connectedCallback.call(this);
        setTimeout(function () {
            // 表示関連の設定処理
            _this.m_setupDisplay();
        });
    };
    CommTreeNode.prototype.updated = function (changedProperties) {
        var _this = this;
        changedProperties.forEach(function (oldValue, propName) {
            switch (propName) {
                case 'opened':
                    _this.m_openedChanged(_this.opened, oldValue);
                    break;
            }
        });
    };
    //----------------------------------------------------------------------
    //
    //  Internal methods
    //
    //----------------------------------------------------------------------
    CommTreeNode.prototype.m_openedChanged = function (newValue, oldValue) {
        this.m_toggleIconKind = newValue ? 'icons:expand-more' : 'icons:chevron-right';
    };
    /**
     * 表示関連の設定処理を行います。
     */
    CommTreeNode.prototype.m_setupDisplay = function () {
        this.m_setupAppropriateIcon();
        this.m_setDistance();
    };
    /**
     * ノードアイテムの左側に適切なアイコン(トグルまたはポイントアイコン)を設定します。
     */
    CommTreeNode.prototype.m_setupAppropriateIcon = function () {
        var childNodes = this.m_getChildNodes();
        if (childNodes.length === 0) {
            this.m_toggleIcon.style.display = 'none';
            this.m_pointIcon.style.display = 'block';
        }
        else {
            this.m_toggleIcon.style.display = 'block';
            this.m_pointIcon.style.display = 'none';
        }
    };
    /**
     * 現ノードと隣接するノードの上下間隔を設定します。
     */
    CommTreeNode.prototype.m_setDistance = function () {
        // 現ノードが親から見た最初の子の場合、上下間隔は0pxに設定する
        var parent = this.m_getParent();
        if (parent) {
            var children = Array.prototype.slice.call(parent.children);
            if (children.length && children[0] === this) {
                this.m_itemContainer.style.setProperty('--comm-tree-node-distance', '0px');
            }
        }
        // 現ノードと子ノードの上下間隔を設定する
        var childNodes = this.m_getChildNodes();
        for (var _i = 0, childNodes_1 = childNodes; _i < childNodes_1.length; _i++) {
            var childNode = childNodes_1[_i];
            var style = document.defaultView.getComputedStyle(childNode);
            var distance = style.getPropertyValue('--comm-tree-node-distance').trim();
            childNode.style.setProperty('--comm-tree-node-distance', distance);
        }
    };
    /**
     * 親エレメントを取得します。
     */
    CommTreeNode.prototype.m_getParent = function () {
        if (this.parentElement instanceof CommTreeView || this.parentElement instanceof CommTreeNode) {
            return this.parentElement;
        }
        return undefined;
    };
    /**
     * 子ノードを取得します。
     */
    CommTreeNode.prototype.m_getChildNodes = function () {
        return this.m_childSlot.assignedNodes().filter(function (node) {
            return node instanceof CommTreeNode;
        });
    };
    //----------------------------------------------------------------------
    //
    //  Event handlers
    //
    //----------------------------------------------------------------------
    /**
     * アイテムスロットにノードが配置(削除含む)された際のハンドラです。
     * @param e
     */
    CommTreeNode.prototype.m_itemSlotOnSlotChange = function (e) {
        var diff = this.f_getDistributedChildDiff(this.m_itemSlot);
        // 追加されたアイテムの処理
        for (var _i = 0, _a = diff.added; _i < _a.length; _i++) {
            var addedItem = _a[_i];
            if (!(addedItem instanceof HTMLElement))
                continue;
            if (addedItem instanceof CommTreeItem) {
            }
        }
    };
    /**
     * チャイルドスロットにノードが配置(削除含む)された際のハンドラです。
     * @param e
     */
    CommTreeNode.prototype.m_childSlotOnSlotChange = function (e) {
        var diff = this.f_getDistributedChildDiff(this.m_childSlot);
        // 追加されたアイテムの処理
        for (var _i = 0, _a = diff.added; _i < _a.length; _i++) {
            var addedItem = _a[_i];
            if (!(addedItem instanceof HTMLElement))
                continue;
            if (!(addedItem instanceof CommTreeNode)) {
                throw new Error('Light DOM must be CommTreeNode.');
            }
        }
        // 表示関連の設定処理
        this.m_setupDisplay();
    };
    /**
     * トグルアイコンがクリックされた際のハンドラです。
     * @param e
     */
    CommTreeNode.prototype.m_toggleIconOnClick = function (e) {
        this.opened = !this.opened;
        this.dispatchEvent(new CustomEvent('toggle-node'));
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
    return CommTreeNode;
}(comm_base_element_1.CommBaseElement));
exports.CommTreeNode = CommTreeNode;
customElements.define('comm-tree-node', CommTreeNode);
var CommTreeItem = /** @class */ (function (_super) {
    __extends(CommTreeItem, _super);
    //----------------------------------------------------------------------
    //
    //  Lifecycle hooks
    //
    //----------------------------------------------------------------------
    function CommTreeItem() {
        var _this = _super.call(this) || this;
        //----------------------------------------------------------------------
        //
        //  Properties
        //
        //----------------------------------------------------------------------
        /**
         * 選択されているか否かです。
         */
        _this.selected = false;
        /**
         * 選択値です。
         */
        _this.selectedValue = '';
        /**
         * 選択不可フラグです。
         */
        _this.unselectable = false;
        //----------------------------------------------------------------------
        //
        //  Variables
        //
        //----------------------------------------------------------------------
        /**
         * 本クラスを継承した際に拡張可能なCSSです。
         * 継承した際は必要に応じてスタイルを変更することができます。
         */
        _this.f_extraStyle = lit_element_1.html(templateObject_3 || (templateObject_3 = __makeTemplateObject([""], [""])));
        /**
         * 本クラスを継承した際に拡張可能なHTMLテンプレートです。
         * 継承した際は必要に応じてHTMLテンプレートを変更することができます。
         */
        _this.f_itemTemplate = lit_element_1.html(templateObject_4 || (templateObject_4 = __makeTemplateObject(["\n    <slot></slot>\n  "], ["\n    <slot></slot>\n  "])));
        return _this;
    }
    CommTreeItem.prototype.render = function () {
        return lit_element_1.html(templateObject_5 || (templateObject_5 = __makeTemplateObject(["\n      <style>\n        ", "\n\n        ::slotted(*) {\n        }\n\n        .item {\n          @apply(--comm-font-common-base);\n          font-size: var(--comm-tree-item-font-size, 16px);\n          color: var(--comm-tree-item-link-color, var(--comm-indigo-800));\n          font-weight: var(--comm-tree-item-font-weight, 500);\n          line-height: var(--comm-tree-item-line-height, 24px);\n          cursor: pointer;\n          @apply(--comm-tree-item);\n        }\n\n        .item:hover {\n          text-decoration: underline;\n        }\n\n        :host([selected]) .item {\n          color: var(--comm-tree-item-selected-color, var(--comm-pink-500));\n        }\n\n        :host([unselectable]) .item {\n          color: var(--comm-tree-item-unselectable-color, var(--comm-grey900));\n          cursor: default;\n        }\n\n        :host([unselectable]) .item:hover {\n          text-decoration: none;\n        }\n\n        ", "\n      </style>\n      <span class=\"item\" @click=\"", "\">", "</span>\n    "], ["\n      <style>\n        ", "\n\n        ::slotted(*) {\n        }\n\n        .item {\n          @apply(--comm-font-common-base);\n          font-size: var(--comm-tree-item-font-size, 16px);\n          color: var(--comm-tree-item-link-color, var(--comm-indigo-800));\n          font-weight: var(--comm-tree-item-font-weight, 500);\n          line-height: var(--comm-tree-item-line-height, 24px);\n          cursor: pointer;\n          @apply(--comm-tree-item);\n        }\n\n        .item:hover {\n          text-decoration: underline;\n        }\n\n        :host([selected]) .item {\n          color: var(--comm-tree-item-selected-color, var(--comm-pink-500));\n        }\n\n        :host([unselectable]) .item {\n          color: var(--comm-tree-item-unselectable-color, var(--comm-grey900));\n          cursor: default;\n        }\n\n        :host([unselectable]) .item:hover {\n          text-decoration: none;\n        }\n\n        ", "\n      </style>\n      <span class=\"item\" @click=\"", "\">", "</span>\n    "])), base_styles_1.baseStyles, this.f_extraStyle, this.f_itemOnClick, this.f_itemTemplate);
    };
    //----------------------------------------------------------------------
    //
    //  Event handlers
    //
    //----------------------------------------------------------------------
    CommTreeItem.prototype.f_itemOnClick = function (e) {
        this.selected = true;
        if (!this.unselectable) {
            this.dispatchEvent(new CustomEvent('item-selected', { bubbles: true, composed: true }));
        }
    };
    __decorate([
        lit_element_1.property({ type: Boolean, reflect: true })
    ], CommTreeItem.prototype, "selected", void 0);
    __decorate([
        lit_element_1.property({ type: String })
    ], CommTreeItem.prototype, "selectedValue", void 0);
    __decorate([
        lit_element_1.property({ type: Boolean, reflect: true })
    ], CommTreeItem.prototype, "unselectable", void 0);
    return CommTreeItem;
}(comm_base_element_1.CommBaseElement));
exports.CommTreeItem = CommTreeItem;
customElements.define('comm-tree-item', CommTreeItem);
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5;
