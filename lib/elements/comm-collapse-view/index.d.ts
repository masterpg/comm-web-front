import { CommBaseElement } from '../comm-base-element';
import { CommCollapseItem } from './comm-collapse-item';
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
export declare class CommCollapseView extends CommBaseElement {
    protected render(): import("lit-html/lib/template-result").TemplateResult;
    m_toggleCollapseItemListeners: WeakMap<CommCollapseItem, EventListener>;
    m_initialDividerStyle: string | null;
    m_slot: HTMLSlotElement;
    constructor();
    /**
     * アイテム間のボーダーを設定します。
     */
    m_setupCollapseBorder(): void;
    /**
     * slotタグに挿入されたアイテムを取得します。
     */
    m_getCollapseItems(): CommCollapseItem[];
    /**
     * slotにノードが配置(削除含む)された際のハンドラです。
     * @param e
     */
    m_slotOnSlotChange(e: any): void;
    /**
     * アイテムが開閉された際のハンドラです。
     * @param e
     */
    m_collapseItemOnToggleCollapseItem(e: any): void;
}
