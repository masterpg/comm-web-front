import '../../styles/base-styles';
import '@polymer/iron-collapse/iron-collapse';
import '@polymer/iron-flex-layout/iron-flex-layout';
import '@polymer/iron-flex-layout/iron-flex-layout-classes';
import '@polymer/iron-icon/iron-icon';
import '@polymer/iron-icons/iron-icons';
import * as Gestures from '@polymer/polymer/lib/utils/gestures.js';
import { FlattenedNodesObserver } from '@polymer/polymer/lib/utils/flattened-nodes-observer';
import { GestureEventListeners } from '@polymer/polymer/lib/mixins/gesture-event-listeners';
import { PolymerElement, html } from '@polymer/polymer/polymer-element';
import { customElement, observe, property, query, listen } from '@polymer/decorators';

export interface TreeStructureNode<T extends TreeStructureNode = TreeStructureNode<any>> {
  itemClass?: string;
  itemHTML: string;
  selectedValue?: string;
  unselectable?: boolean;
  opened?: boolean;
  children?: T[];
}

@customElement('comm-tree-view')
export class CommTreeView extends GestureEventListeners(PolymerElement) {
  static get template() {
    return html`
      <slot id="slot" name="child"></slot>
    `;
  }

  //----------------------------------------------------------------------
  //
  //  Variables
  //
  //----------------------------------------------------------------------

  m_selectedItem?: CommTreeItem;

  //--------------------------------------------------
  //  Elements
  //--------------------------------------------------

  @query('#slot')
  m_slot!: HTMLSlotElement;

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
    new FlattenedNodesObserver(this.m_slot, (info: any) => {
      // 追加されたアイテムの処理
      for (const addedItem of info.addedNodes as CommTreeNode[]) {
        if (!(addedItem instanceof HTMLElement)) continue;
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
  buildTree<T extends TreeStructureNode>(
    tree: T[],
    options?: { itemClasses?: { [index: string]: object }; itemEvents?: string[] },
  ): void {
    options = options || {};

    const itemClasses = Object.assign({ CommTreeItem }, options.itemClasses);
    const itemEvents = options.itemEvents ? options.itemEvents : [];

    for (const eventName of itemEvents) {
      this.m_addAnyEventListener(eventName);
    }
    for (const structureItem of tree) {
      this.f_recursiveBuildTree(itemClasses, structureItem, this);
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
  f_recursiveBuildTree<T extends TreeStructureNode>(
    itemClasses: { [index: string]: object },
    item: T,
    parentOfNode: CommTreeView | CommTreeNode,
  ): void {
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
  m_addAnyEventListener(eventName: string) {
    this.addEventListener(
      eventName,
      (e) => {
        if (e.target instanceof CommTreeItem) {
          // 選択されたノードアイテムを取得
          const item = e.target as CommTreeItem;
          // ノードアイテムのイベントを伝搬しないようここでストップする
          e.stopImmediatePropagation();
          // ツリービューが代わりにそのイベントを発火
          this.dispatchEvent(new CustomEvent(eventName, { detail: { item } }));
        }
      },
      true,
    );
  }

  /**
   * item-selectedイベントのリスナーを登録します。
   * 登録されたリスナーではイベントを集約し、ツリービューが代わりにそのイベントを発火します。
   */
  m_addItemSelectedEventListener() {
    const EVENT_ITEM_SELECTED = 'item-selected';
    this.addEventListener(
      EVENT_ITEM_SELECTED,
      (e) => {
        if (e.target instanceof CommTreeItem) {
          // 選択されたノードアイテムを取得
          const item = e.target as CommTreeItem;
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
      },
      true,
    );
  }

  /**
   * 子ノードを取得します。
   */
  m_getChildNodes(): CommTreeNode[] {
    return this.m_slot.assignedNodes().filter((node) => {
      return node instanceof CommTreeNode;
    }) as CommTreeNode[];
  }
}

@customElement('comm-tree-node')
export class CommTreeNode extends GestureEventListeners(PolymerElement) {
  static get template() {
    return html`
      <style include="base-styles">
        #itemContainer {
          padding-top: var(--comm-tree-node-distance, 10px);
        }
        .toggle-icon {
          color: var(--comm-grey-800);
          cursor: pointer;
        }
        #collapse > div {
          padding-left: var(--comm-tree-node-indent, 12px);
        }
      </style>
      <div id="itemContainer" class="layout horizontal center-center">
        <iron-icon id="toggleIcon" class="toggle-icon" icon="[[m_toggleIconKind]]" on-tap="m_toggleIconOnTap"></iron-icon>
        <svg id="pointIcon" width="24" height="24" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
          <circle cx="12" cy="12" r="3" stroke="blue" fill="#424242" stroke-width="0"/>
        </svg>
        <div class="flex"><slot id="itemSlot" name="item"></slot></div>
      </div>
      <iron-collapse id="collapse" opened="{{opened}}">
        <div><slot id="childSlot" name="child"></slot></div>
      </iron-collapse>
    `;
  }

  //----------------------------------------------------------------------
  //
  //  Variables
  //
  //----------------------------------------------------------------------

  @property({ type: String, computed: 'm_computeToggleIconKind(opened)' })
  m_toggleIconKind: string = '';

  m_computeToggleIconKind(opened: boolean) {
    return opened ? 'icons:expand-more' : 'icons:chevron-right';
  }

  //--------------------------------------------------
  //  Elements
  //--------------------------------------------------

  @query('#itemContainer')
  m_itemContainer!: HTMLElement;

  @query('#itemSlot')
  m_itemSlot!: HTMLSlotElement;

  @query('#childSlot')
  m_childSlot!: HTMLSlotElement;

  @query('#toggleIcon')
  m_toggleIcon!: HTMLElement;

  @query('#pointIcon')
  m_pointIcon!: HTMLElement;

  //----------------------------------------------------------------------
  //
  //  Properties
  //
  //----------------------------------------------------------------------

  /**
   * アイテムの開閉です。
   */
  @property({ type: Boolean, reflectToAttribute: true })
  opened: boolean = false;

  //----------------------------------------------------------------------
  //
  //  Lifecycle hooks
  //
  //----------------------------------------------------------------------

  constructor() {
    super();
  }

  ready() {
    super.ready();

    // 表示関連の設定処理
    this.m_setupDisplay();

    // アイテムスロットの監視処理
    new FlattenedNodesObserver(this.m_itemSlot, (info: any) => {
      // 追加されたアイテムの処理
      for (const addedItem of info.addedNodes as CommTreeNode[]) {
        if (!(addedItem instanceof HTMLElement)) continue;
        if (addedItem instanceof CommTreeItem) {
        }
      }
    });

    // 子ノードスロットの監視処理
    new FlattenedNodesObserver(this.m_childSlot, (info: any) => {
      // 追加されたアイテムの処理
      for (const addedItem of info.addedNodes as CommTreeNode[]) {
        if (!(addedItem instanceof HTMLElement)) continue;
        if (!(addedItem instanceof CommTreeNode)) {
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
  m_setupDisplay(): void {
    this.m_setupAppropriateIcon();
    this.m_setDistance();
  }

  /**
   * ノードアイテムの左側に適切なアイコン(トグルまたはポイントアイコン)を設定します。
   */
  m_setupAppropriateIcon(): void {
    const childNodes = this.m_getChildNodes();
    if (childNodes.length === 0) {
      this.m_toggleIcon.style.display = 'none';
      this.m_pointIcon.style.display = 'block';
    } else {
      this.m_toggleIcon.style.display = 'block';
      this.m_pointIcon.style.display = 'none';
    }
  }

  /**
   * 現ノードと子ノードの上下間隔を設定します。
   */
  m_setDistance(): void {
    // 親ノードがない場合、上下間隔は0pxに設定する
    const parentNode = this.m_getParentNode();
    if (!parentNode) {
      this.m_itemContainer.style.setProperty('--comm-tree-node-distance', '0px');
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
   * 親ノードを取得します。
   */
  m_getParentNode(): CommTreeNode | undefined {
    if (this.parentElement instanceof CommTreeNode) {
      return this.parentElement as CommTreeNode;
    }
    return undefined;
  }

  /**
   * 子ノードを取得します。
   */
  m_getChildNodes(): CommTreeNode[] {
    return this.m_childSlot.assignedNodes().filter((node) => {
      return node instanceof CommTreeNode;
    }) as CommTreeNode[];
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
}

@customElement('comm-tree-item')
export class CommTreeItem extends GestureEventListeners(PolymerElement) {
  static get template() {
    return html`
      <style include="base-styles">
        ::slotted(*) {
        }
        .item {
          @apply(--comm-font-common-base);
          font-size: var(--comm-tree-item-font-size, 16px);
          color: var(--comm-tree-item-link-color, var(--comm-indigo-800));
          font-weight: var(--comm-tree-item-font-weight, 500);
          cursor: pointer;
        }
        .item:hover {
          text-decoration: underline;
        }
        :host([selected]) .item {
          color: var(--comm-tree-item-selected-color, var(--comm-pink-500));
        }
        :host([unselectable]) .item {
          color: var(--comm-tree-item-unselected-color, var(--comm-grey900));
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
  //  Properties
  //
  //----------------------------------------------------------------------

  /**
   * 選択されているか否かです。
   */
  @property({ type: Boolean, reflectToAttribute: true })
  selected: boolean = false;

  /**
   * 選択値です。
   */
  @property({ type: String })
  selectedValue: string = '';

  /**
   * 選択不可フラグです。
   */
  @property({ type: Boolean, reflectToAttribute: true })
  unselectable: boolean = false;

  //----------------------------------------------------------------------
  //
  //  Variables
  //
  //----------------------------------------------------------------------

  /**
   * 本クラスを継承した際に拡張可能なHTMLテンプレートです。
   * 継承した際は必要に応じてスタイルを変更することができます。
   */
  static f_extendedStyle = html``;

  /**
   * 本クラスを継承した際に拡張可能なHTMLテンプレートです。
   * 継承した際は必要に応じてHTMLテンプレートを変更することができます。
   */
  static f_extendedTemplate = html`<slot></slot>`;

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
}
