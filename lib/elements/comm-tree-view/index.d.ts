import '@polymer/iron-collapse/iron-collapse';
import '@polymer/iron-flex-layout/iron-flex-layout';
import '@polymer/iron-flex-layout/iron-flex-layout-classes';
import '@polymer/iron-icon/iron-icon';
import '@polymer/iron-icons/iron-icons';
import { PropertyValues } from 'lit-element';
import { CommBaseElement } from '../comm-base-element';
export interface TreeStructureNode<T extends TreeStructureNode = TreeStructureNode<any>> {
    itemClass?: string;
    itemHTML: string;
    selectedValue?: string;
    unselectable?: boolean;
    opened?: boolean;
    children?: T[];
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
 * `--comm-tree-item-font-size` | ノードアイテムのフォントサイズです | `16px`
 * `--comm-tree-item-font-weight` | ノードアイテムのフォントの太さです | `500`
 * `--comm-tree-item-line-height` | ノードアイテムの行の高さです | `24px`
 * `--comm-tree-item` |  | `{}`
 * `--comm-tree-item-link-color` | ノードアイテムのリンクカラーです | `var(--comm-indigo-800)`
 * `--comm-tree-item-selected-color` | ノードアイテムの選択時のカラーです | `var(--comm-pink-500)`
 * `--comm-tree-item-unselectable-color` | ノードアイテムが非選択ノードの場合のカラー | `var(--comm-grey900)`
 */
export declare class CommTreeView extends CommBaseElement {
    render(): import("lit-html/lib/template-result").TemplateResult;
    m_selectedItem?: CommTreeItem;
    m_slot: HTMLSlotElement;
    constructor();
    /**
     * ツリービューを指定されたツリーデータで構築します。
     * @param tree ツリービューを構築するためのデータ
     * @param options
     *   itemClasses: ツリービューの構築に必要なノードアイテムのクラスリスト
     *   itemEvents: ツリービューが集約すべきノードアイテムのイベント名のリスト
     */
    buildTree<T extends TreeStructureNode>(tree: T[], options?: {
        itemClasses?: {
            [index: string]: object;
        };
        itemEvents?: string[];
    }): void;
    /**
     * ツリービューのノードとアイテムを再帰的に構築します。
     * @param itemClasses ツリービューの構築に必要なアイテムのクラスリスト
     * @param item ツリービューを構築するためのノードアイテムのデータ
     * @param parentOfNode ノードの親エレメント
     */
    f_recursiveBuildTree<T extends TreeStructureNode>(itemClasses: {
        [index: string]: object;
    }, item: T, parentOfNode: CommTreeView | CommTreeNode): void;
    /**
     * 指定されたイベントのリスナーを登録します。
     * 登録されたリスナーではイベントを集約し、ツリービューが代わりにそのイベントを発火します。
     * @param eventName
     */
    m_addAnyEventListener(eventName: string): void;
    /**
     * item-selectedイベントのリスナーを登録します。
     * 登録されたリスナーではイベントを集約し、ツリービューが代わりにそのイベントを発火します。
     */
    m_addItemSelectedEventListener(): void;
    /**
     * 子ノードを取得します。
     */
    m_getChildNodes(): CommTreeNode[];
    /**
     * slotにノードが配置(削除含む)された際のハンドラです。
     * @param e
     */
    m_slotOnSlotChange(e: any): void;
}
export declare class CommTreeNode extends CommBaseElement {
    render(): import("lit-html/lib/template-result").TemplateResult;
    m_toggleIconKind: string;
    m_itemContainer: HTMLElement;
    m_itemSlot: HTMLSlotElement;
    m_childSlot: HTMLSlotElement;
    m_toggleIcon: HTMLElement;
    m_pointIcon: HTMLElement;
    /**
     * アイテムの開閉です。
     */
    opened: boolean;
    constructor();
    connectedCallback(): void;
    protected updated(changedProperties: PropertyValues): void;
    m_openedChanged(newValue: boolean, oldValue: boolean): void;
    /**
     * 表示関連の設定処理を行います。
     */
    m_setupDisplay(): void;
    /**
     * ノードアイテムの左側に適切なアイコン(トグルまたはポイントアイコン)を設定します。
     */
    m_setupAppropriateIcon(): void;
    /**
     * 現ノードと隣接するノードの上下間隔を設定します。
     */
    m_setDistance(): void;
    /**
     * 親エレメントを取得します。
     */
    m_getParent(): CommTreeView | CommTreeNode | undefined;
    /**
     * 子ノードを取得します。
     */
    m_getChildNodes(): CommTreeNode[];
    /**
     * アイテムスロットにノードが配置(削除含む)された際のハンドラです。
     * @param e
     */
    m_itemSlotOnSlotChange(e: any): void;
    /**
     * チャイルドスロットにノードが配置(削除含む)された際のハンドラです。
     * @param e
     */
    m_childSlotOnSlotChange(e: any): void;
    /**
     * トグルアイコンがクリックされた際のハンドラです。
     * @param e
     */
    m_toggleIconOnClick(e: any): void;
}
export declare class CommTreeItem extends CommBaseElement {
    render(): import("lit-html/lib/template-result").TemplateResult;
    constructor();
    /**
     * 選択されているか否かです。
     */
    selected: boolean;
    /**
     * 選択値です。
     */
    selectedValue: string;
    /**
     * 選択不可フラグです。
     */
    unselectable: boolean;
    /**
     * 本クラスを継承した際に拡張可能なCSSです。
     * 継承した際は必要に応じてスタイルを変更することができます。
     */
    f_extraStyle: import("lit-html/lib/template-result").TemplateResult;
    /**
     * 本クラスを継承した際に拡張可能なHTMLテンプレートです。
     * 継承した際は必要に応じてHTMLテンプレートを変更することができます。
     */
    f_itemTemplate: import("lit-html/lib/template-result").TemplateResult;
    f_itemOnClick(e: any): void;
}
