import {html, query} from 'lit-element'

import {baseStyles} from '../../styles/polymer/base-styles'
import {CommBaseElement} from '../comm-base-element'
import {CommCollapseItem} from './comm-collapse-item'

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
export class CommCollapseView extends CommBaseElement {
  protected render() {
    return html`
      <style>
        ${baseStyles}

        .container {
          border-style: var(--comm-collapse-frame-border-style, none);
          border-color: var(--comm-collapse-frame-border-color, var(--comm-grey-300));
          border-width: var(--comm-collapse-frame-border-width, 1px);
        }
      </style>
      <div class="container"><slot id="slot" @slotchange="${this.m_slotOnSlotChange}"></slot></div>
    `
  }

  //----------------------------------------------------------------------
  //
  //  Variables
  //
  //----------------------------------------------------------------------

  m_toggleCollapseItemListeners = new WeakMap<CommCollapseItem, EventListener>()

  m_initialDividerStyle: string | null = null

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
  }

  //----------------------------------------------------------------------
  //
  //  Internal methods
  //
  //----------------------------------------------------------------------

  /**
   * アイテム間のボーダーを設定します。
   */
  m_setupCollapseBorder(): void {
    const items = this.m_getCollapseItems()
    for (let i = 0; i < items.length; i++) {
      const item = items[i]
      // 外部から仕切りボーダーが非表示に設定された、または最下部のアイテムの場合
      if (this.m_initialDividerStyle === 'none' || i === items.length - 1) {
        // 仕切りボーダーは非表示にする(アイテムのボーダーとコンテナの枠線がかぶるため)
        (window as any).ShadyCSS.styleSubtree(item, {'--comm-collapse-divider-border-style': 'none'})
      }
      // 上記以外の場合
      else {
        (window as any).ShadyCSS.styleSubtree(item, {'--comm-collapse-divider-border-style': 'solid'})
      }
    }
  }

  /**
   * slotタグに挿入されたアイテムを取得します。
   */
  m_getCollapseItems(): CommCollapseItem[] {
    if (!this.m_slot) return []
    const assignedNodes = this.m_slot.assignedNodes({flatten: false})
    return assignedNodes.filter(node => {
      return node instanceof CommCollapseItem
    }) as CommCollapseItem[]
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
    if (this.m_initialDividerStyle === null) {
      this.m_initialDividerStyle = (window as any).ShadyCSS.getComputedStyleValue(this, '--comm-collapse-divider-border-style')
    }

    const diff = this.f_getDistributedChildDiff(this.m_slot)

    // 追加されたアイテムの処理
    for (const addedItem of diff.added) {
      if (!(addedItem instanceof HTMLElement)) continue
      if (!(addedItem instanceof CommCollapseItem)) {
        throw new Error('Light DOM must be CommCollapseItem.')
      }
      const listener = this.m_collapseItemOnToggleCollapseItem.bind(this)
      this.m_toggleCollapseItemListeners.set(addedItem, listener)
      addedItem.addEventListener('toggle-item', listener)
    }
    // 削除されたアイテムの処理
    for (const removedItem of diff.removed as CommCollapseItem[]) {
      const listener = this.m_toggleCollapseItemListeners.get(removedItem)
      this.m_toggleCollapseItemListeners.delete(removedItem)
      if (listener) {
        removedItem.removeEventListener('toggle-item', listener)
      }
    }
    // アイテム間のボーダー設定
    this.m_setupCollapseBorder()
  }

  /**
   * アイテムが開閉された際のハンドラです。
   * @param e
   */
  m_collapseItemOnToggleCollapseItem(e) {
    // 必要があれば用のプレースホルダ
  }
}
customElements.define('comm-collapse-view', CommCollapseView)
