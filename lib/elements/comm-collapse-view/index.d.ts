import { CommBaseElement } from '../comm-base-element';
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
 * `--comm-collapse-transition-duration` | 展開/収縮アニメーションの時間です | `300ms`
 */
export declare class CommCollapseView extends CommBaseElement {
    static readonly styles: import("lit-element").CSSResult;
    protected render(): import("lit-element").TemplateResult;
    private m_toggleCollapseItemListeners;
    private m_initialDividerStyle;
    private m_slot;
    constructor();
    /**
     * アイテム間のボーダーを設定します。
     */
    private m_setupCollapseBorder;
    /**
     * slotタグに挿入されたアイテムを取得します。
     */
    private m_getCollapseItems;
    /**
     * slotにノードが配置(削除含む)された際のハンドラです。
     * @param e
     */
    private m_slotOnSlotChange;
    /**
     * アイテムが開閉された際のハンドラです。
     * @param e
     */
    private m_collapseItemOnToggleCollapseItem;
}
