import '@polymer/iron-collapse/iron-collapse';
import '@polymer/iron-flex-layout/iron-flex-layout';
import '@polymer/iron-flex-layout/iron-flex-layout-classes';
import '@polymer/iron-icon/iron-icon';
import '@polymer/iron-icons/iron-icons';
import { PropertyValues } from 'lit-element';
import { CommBaseElement } from '../comm-base-element';
export interface TreeStructureNode {
    /**
     * ノードアイテムのコンテンツを指定します。
     * 文字列またはHTML文字列で指定できます。
     */
    content: string;
    /**
     * ノードアイテムが選択された際にアイテムを特定するための値を指定します。
     */
    value?: string;
    /**
     * 非選択なノードアイテムか否かを指定します。
     * デフォルトは選択可能なので、非選択にしたい場合にtrueを設定します。
     */
    unselectable?: boolean;
    /**
     * ノードが開いているか否かを指定します。
     * デフォルトは閉じているので、開いた状態にしたい場合にtrueを設定します。
     */
    opened?: boolean;
    /**
     * CommTreeNodeItemを拡張した場合、拡張したノードアイテムのクラスを指定します。
     */
    itemClass?: {
        new (): CommTreeNodeItem;
    };
    /**
     * 子ノードを指定します。
     */
    children?: TreeStructureNode[];
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
export declare class CommTreeView extends CommBaseElement {
    protected render(): import("lit-element").TemplateResult;
    private m_selectedItem?;
    private m_slot;
    constructor();
    /**
     * ツリービューを指定されたツリーデータで構築します。
     * @param tree ツリービューを構築するためのデータ
     * @param options
     *   itemEvents: ツリービューが集約すべきノードアイテムのイベント名のリスト
     */
    buildTree<T extends TreeStructureNode>(tree: T[], options?: {
        itemEvents?: string[];
    }): void;
    /**
     * ツリービューのノードとアイテムを再帰的に構築します。
     * @param item ツリービューを構築するためのノードアイテムのデータ
     * @param parentOfNode ノードの親エレメント
     */
    protected recursiveBuildTree<T extends TreeStructureNode>(item: T, parentOfNode: CommTreeView | CommTreeNode): void;
    /**
     * 指定されたイベントのリスナーを登録します。
     * 登録されたリスナーではイベントを集約し、ツリービューが代わりにそのイベントを発火します。
     * @param eventName
     */
    private m_addAnyEventListener;
    /**
     * item-selectedイベントのリスナーを登録します。
     * 登録されたリスナーではイベントを集約し、ツリービューが代わりにそのイベントを発火します。
     */
    private m_addItemSelectedEventListener;
    /**
     * 子ノードを取得します。
     */
    private m_getChildNodes;
    /**
     * slotにノードが配置(削除含む)された際のハンドラです。
     * @param e
     */
    private m_slotOnSlotChange;
}
export declare class CommTreeNode extends CommBaseElement {
    static readonly styles: import("lit-element").CSSResult;
    protected render(): import("lit-element").TemplateResult;
    private m_toggleIconKind;
    private m_itemContainer;
    private m_itemSlot;
    private m_childSlot;
    private m_toggleIcon;
    private m_pointIcon;
    /**
     * アイテムの開閉です。
     */
    opened: boolean;
    constructor();
    connectedCallback(): void;
    protected updated(changedProperties: PropertyValues): void;
    private m_openedChanged;
    /**
     * 表示関連の設定処理を行います。
     */
    private m_setupDisplay;
    /**
     * ノードアイテムの左側に適切なアイコン(トグルまたはポイントアイコン)を設定します。
     */
    private m_setupAppropriateIcon;
    /**
     * 現ノードと隣接するノードの上下間隔を設定します。
     */
    private m_setDistance;
    /**
     * 親エレメントを取得します。
     */
    private m_getParent;
    /**
     * 子ノードを取得します。
     */
    private m_getChildNodes;
    /**
     * アイテムスロットにノードが配置(削除含む)された際のハンドラです。
     * @param e
     */
    private m_itemSlotOnSlotChange;
    /**
     * チャイルドスロットにノードが配置(削除含む)された際のハンドラです。
     * @param e
     */
    private m_childSlotOnSlotChange;
    /**
     * トグルアイコンがクリックされた際のハンドラです。
     * @param e
     */
    private m_toggleIconOnClick;
}
export declare class CommTreeNodeItem extends CommBaseElement {
    static readonly styles: import("lit-element").CSSResult;
    protected render(): import("lit-element").TemplateResult;
    constructor();
    /**
     * 選択されているか否かです。
     */
    selected: boolean;
    /**
     * 選択値です。
     */
    value?: string;
    /**
     * 選択不可フラグです。
     */
    unselectable: boolean;
    /**
     * 本クラスを継承した際に拡張可能なHTMLテンプレートです。
     * 継承した際は必要に応じてHTMLテンプレートを変更することができます。
     */
    protected readonly itemTemplate: import("lit-element").TemplateResult;
    protected itemOnClick(e: any): void;
}
