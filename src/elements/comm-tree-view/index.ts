import '@polymer/iron-collapse/iron-collapse'
import '@polymer/iron-flex-layout/iron-flex-layout'
import '@polymer/iron-flex-layout/iron-flex-layout-classes'
import '@polymer/iron-icon/iron-icon'
import '@polymer/iron-icons/iron-icons'
import {customElement, html, property, query, PropertyValues} from 'lit-element'

import {baseStyles} from '../../styles/polymer/base-styles'
import {CommBaseElement} from '../comm-base-element'

export interface TreeStructureNode {
  /**
   * ノードアイテムのコンテンツを指定します。
   * 文字列またはHTML文字列で指定できます。
   */
  content: string
  /**
   * ノードアイテムが選択された際にアイテムを特定するための値を指定します。
   */
  value?: string
  /**
   * 非選択なノードアイテムか否かを指定します。
   * デフォルトは選択可能なので、非選択にしたい場合にtrueを設定します。
   */
  unselectable?: boolean
  /**
   * ノードが開いているか否かを指定します。
   * デフォルトは閉じているので、開いた状態にしたい場合にtrueを設定します。
   */
  opened?: boolean
  /**
   * CommTreeNodeItemを拡張した場合、拡張したノードアイテムのクラスを指定します。
   */
  itemClass?: {new (): CommTreeNodeItem}
  /**
   * 子ノードを指定します。
   */
  children?: TreeStructureNode[]
}

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
@customElement('comm-tree-view')
export class CommTreeView extends CommBaseElement {
  render() {
    return html`
      <slot id="slot" name="child" @slotchange="${this.m_slotOnSlotChange}"></slot>
    `
  }

  //----------------------------------------------------------------------
  //
  //  Variables
  //
  //----------------------------------------------------------------------

  m_selectedItem?: CommTreeNodeItem

  //--------------------------------------------------
  //  Elements
  //--------------------------------------------------

  @query('#slot')
  m_slot!: HTMLSlotElement

  //----------------------------------------------------------------------
  //
  //  Lifecycle hooks
  //
  //----------------------------------------------------------------------

  constructor() {
    super()

    // ノードアイテムのイベント設定
    this.m_addItemSelectedEventListener()
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
  buildTree<T extends TreeStructureNode>(tree: T[], options?: {itemEvents?: string[]}): void {
    options = options || {}

    const itemEvents = options.itemEvents ? options.itemEvents : []

    for (const eventName of itemEvents) {
      this.m_addAnyEventListener(eventName)
    }
    for (const structureNode of tree) {
      this.f_recursiveBuildTree(structureNode, this)
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
  f_recursiveBuildTree<T extends TreeStructureNode>(item: T, parentOfNode: CommTreeView | CommTreeNode): void {
    // ノードアイテムエレメントの作成
    const itemClass = item.itemClass || CommTreeNodeItem
    const nodeItem = new itemClass()
    nodeItem.setAttribute('slot', 'item')
    nodeItem.value = item.value
    nodeItem.unselectable = Boolean(item.unselectable)
    const el = document.createElement('span')
    el.innerHTML = item.content
    nodeItem.appendChild(el)

    // ノードエレメントの作成
    const node = new CommTreeNode()
    node.opened = Boolean(item.opened)
    node.setAttribute('slot', 'child')
    node.appendChild(nodeItem)

    // ノードエレメントの子ノードを作成
    if (item.children) {
      for (const childStructureItem of item.children) {
        this.f_recursiveBuildTree(childStructureItem, node)
      }
    }

    // ノードの親に上記で作成したノードエレメントを追加
    parentOfNode.appendChild(node)
  }

  /**
   * 指定されたイベントのリスナーを登録します。
   * 登録されたリスナーではイベントを集約し、ツリービューが代わりにそのイベントを発火します。
   * @param eventName
   */
  m_addAnyEventListener(eventName: string) {
    this.addEventListener(
      eventName,
      e => {
        if (e.target instanceof CommTreeNodeItem) {
          // 選択されたノードアイテムを取得
          const item = e.target as CommTreeNodeItem
          // ノードアイテムのイベントを伝搬しないようここでストップする
          e.stopImmediatePropagation()
          // ツリービューが代わりにそのイベントを発火
          this.dispatchEvent(new CustomEvent(eventName, {detail: {item}}))
        }
      },
      true
    )
  }

  /**
   * item-selectedイベントのリスナーを登録します。
   * 登録されたリスナーではイベントを集約し、ツリービューが代わりにそのイベントを発火します。
   */
  m_addItemSelectedEventListener() {
    const EVENT_ITEM_SELECTED = 'item-selected'
    this.addEventListener(
      EVENT_ITEM_SELECTED,
      e => {
        if (e.target instanceof CommTreeNodeItem) {
          // 選択されたノードアイテムを取得
          const item = e.target as CommTreeNodeItem
          // 選択されたノードアイテム以外の選択を解除
          if (this.m_selectedItem && this.m_selectedItem !== item) {
            this.m_selectedItem.selected = false
          }
          this.m_selectedItem = item
          // ノードアイテムのイベントを伝搬しないようここでストップする
          e.stopImmediatePropagation()
          // ツリービューが代わりにそのイベントを発火
          this.dispatchEvent(new CustomEvent(EVENT_ITEM_SELECTED, {detail: {item}}))
        }
      },
      true
    )
  }

  /**
   * 子ノードを取得します。
   */
  m_getChildNodes(): CommTreeNode[] {
    return this.m_slot.assignedNodes().filter(node => {
      return node instanceof CommTreeNode
    }) as CommTreeNode[]
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
    const diff = this.f_getDistributedChildDiff(this.m_slot)

    // 追加されたアイテムの処理
    for (const addedItem of diff.added) {
      if (!(addedItem instanceof HTMLElement)) continue
      if (!(addedItem instanceof CommTreeNode)) {
        throw new Error('Light DOM must be CommTreeNode.')
      }
    }
  }
}

@customElement('comm-tree-node')
export class CommTreeNode extends CommBaseElement {
  render() {
    return html`
      <style>
        ${baseStyles}
      </style>

      <style>
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
        <iron-icon id="toggleIcon" class="toggle-icon" icon="${this.m_toggleIconKind}" @click="${this.m_toggleIconOnClick}"></iron-icon>
        <svg id="pointIcon" width="24" height="24" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
          <circle cx="12" cy="12" r="3" stroke="blue" fill="#9b9b9b" stroke-width="0" />
        </svg>
        <div class="flex"><slot id="itemSlot" name="item" @slotchange="${this.m_itemSlotOnSlotChange}"></slot></div>
      </div>
      <iron-collapse id="collapse" ?opened="${this.opened}">
        <div><slot id="childSlot" name="child" @slotchange="${this.m_childSlotOnSlotChange}"></slot></div>
      </iron-collapse>
    `
  }

  //----------------------------------------------------------------------
  //
  //  Variables
  //
  //----------------------------------------------------------------------

  @property({type: String})
  m_toggleIconKind: string = ''

  //--------------------------------------------------
  //  Elements
  //--------------------------------------------------

  @query('#itemContainer')
  m_itemContainer!: HTMLElement

  @query('#itemSlot')
  m_itemSlot!: HTMLSlotElement

  @query('#childSlot')
  m_childSlot!: HTMLSlotElement

  @query('#toggleIcon')
  m_toggleIcon!: HTMLElement

  @query('#pointIcon')
  m_pointIcon!: HTMLElement

  //----------------------------------------------------------------------
  //
  //  Properties
  //
  //----------------------------------------------------------------------

  /**
   * アイテムの開閉です。
   */
  @property({type: Boolean, reflect: true})
  opened: boolean = false

  //----------------------------------------------------------------------
  //
  //  Lifecycle hooks
  //
  //----------------------------------------------------------------------

  constructor() {
    super()
  }

  connectedCallback(): void {
    super.connectedCallback()

    setTimeout(() => {
      // 表示関連の設定処理
      this.m_setupDisplay()
    })
  }

  protected updated(changedProperties: PropertyValues): void {
    changedProperties.forEach((oldValue, propName) => {
      switch (propName) {
        case 'opened':
          this.m_openedChanged(this.opened, oldValue as boolean)
          break
      }
    })
  }

  //----------------------------------------------------------------------
  //
  //  Internal methods
  //
  //----------------------------------------------------------------------

  m_openedChanged(newValue: boolean, oldValue: boolean): void {
    this.m_toggleIconKind = newValue ? 'icons:expand-more' : 'icons:chevron-right'
  }

  /**
   * 表示関連の設定処理を行います。
   */
  m_setupDisplay(): void {
    this.m_setupAppropriateIcon()
    this.m_setDistance()
  }

  /**
   * ノードアイテムの左側に適切なアイコン(トグルまたはポイントアイコン)を設定します。
   */
  m_setupAppropriateIcon(): void {
    const childNodes = this.m_getChildNodes()
    if (childNodes.length === 0) {
      this.m_toggleIcon.style.display = 'none'
      this.m_pointIcon.style.display = 'block'
    } else {
      this.m_toggleIcon.style.display = 'block'
      this.m_pointIcon.style.display = 'none'
    }
  }

  /**
   * 現ノードと隣接するノードの上下間隔を設定します。
   */
  m_setDistance(): void {
    // 現ノードが親から見た最初の子の場合、上下間隔は0pxに設定する
    const parent = this.m_getParent()
    if (parent) {
      const children = Array.prototype.slice.call(parent.children)
      if (children.length && children[0] === this) {
        this.m_itemContainer.style.setProperty('--comm-tree-node-distance', '0px')
      }
    }

    // 現ノードと子ノードの上下間隔を設定する
    const childNodes = this.m_getChildNodes()
    for (const childNode of childNodes) {
      const style = document.defaultView!.getComputedStyle(childNode)
      const distance = style.getPropertyValue('--comm-tree-node-distance').trim()
      childNode.style.setProperty('--comm-tree-node-distance', distance)
    }
  }

  /**
   * 親エレメントを取得します。
   */
  m_getParent(): CommTreeView | CommTreeNode | undefined {
    if (this.parentElement instanceof CommTreeView || this.parentElement instanceof CommTreeNode) {
      return this.parentElement
    }
    return undefined
  }

  /**
   * 子ノードを取得します。
   */
  m_getChildNodes(): CommTreeNode[] {
    return this.m_childSlot.assignedNodes().filter(node => {
      return node instanceof CommTreeNode
    }) as CommTreeNode[]
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
    const diff = this.f_getDistributedChildDiff(this.m_itemSlot)

    // 追加されたアイテムの処理
    for (const addedItem of diff.added) {
      if (!(addedItem instanceof HTMLElement)) continue
      if (addedItem instanceof CommTreeNodeItem) {
      }
    }
  }

  /**
   * チャイルドスロットにノードが配置(削除含む)された際のハンドラです。
   * @param e
   */
  m_childSlotOnSlotChange(e) {
    const diff = this.f_getDistributedChildDiff(this.m_childSlot)

    // 追加されたアイテムの処理
    for (const addedItem of diff.added) {
      if (!(addedItem instanceof HTMLElement)) continue
      if (!(addedItem instanceof CommTreeNode)) {
        throw new Error('Light DOM must be CommTreeNode.')
      }
    }

    // 表示関連の設定処理
    this.m_setupDisplay()
  }

  /**
   * トグルアイコンがクリックされた際のハンドラです。
   * @param e
   */
  m_toggleIconOnClick(e) {
    this.opened = !this.opened
    this.dispatchEvent(new CustomEvent('toggle-node'))
  }
}

@customElement('comm-tree-node-item')
export class CommTreeNodeItem extends CommBaseElement {
  render() {
    return html`
      <style>
        ${baseStyles}
      </style>

      <style>
        ::slotted(*) {
        }

        .item {
          @apply(--comm-font-common-base);
          font-size: var(--comm-tree-node-item-font-size, 16px);
          color: var(--comm-tree-node-item-link-color, var(--comm-indigo-800));
          font-weight: var(--comm-tree-node-item-font-weight, 500);
          line-height: var(--comm-tree-node-item-line-height, 24px);
          cursor: pointer;
          @apply(--comm-tree-node-item);
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

        ${this.f_extraStyle}
      </style>
      <span class="item" @click="${this.f_itemOnClick}">${this.f_itemTemplate}</span>
    `
  }

  //----------------------------------------------------------------------
  //
  //  Lifecycle hooks
  //
  //----------------------------------------------------------------------

  constructor() {
    super()
  }

  //----------------------------------------------------------------------
  //
  //  Properties
  //
  //----------------------------------------------------------------------

  /**
   * 選択されているか否かです。
   */
  @property({type: Boolean, reflect: true})
  selected: boolean = false

  /**
   * 選択値です。
   */
  @property({type: String})
  value?: string

  /**
   * 選択不可フラグです。
   */
  @property({type: Boolean, reflect: true})
  unselectable: boolean = false

  //----------------------------------------------------------------------
  //
  //  Variables
  //
  //----------------------------------------------------------------------

  /**
   * 本クラスを継承した際に拡張可能なCSSです。
   * 継承した際は必要に応じてスタイルを変更することができます。
   */
  f_extraStyle = html``

  /**
   * 本クラスを継承した際に拡張可能なHTMLテンプレートです。
   * 継承した際は必要に応じてHTMLテンプレートを変更することができます。
   */
  f_itemTemplate = html`
    <slot></slot>
  `

  //----------------------------------------------------------------------
  //
  //  Event handlers
  //
  //----------------------------------------------------------------------

  f_itemOnClick(e) {
    this.selected = true
    if (!this.unselectable) {
      this.dispatchEvent(new CustomEvent('item-selected', {bubbles: true, composed: true}))
    }
  }
}
