import '@polymer/iron-collapse/iron-collapse';
import '@polymer/iron-flex-layout/iron-flex-layout';
import '@polymer/iron-flex-layout/iron-flex-layout-classes';
import '@polymer/iron-icon/iron-icon';
import '@polymer/iron-icons/iron-icons';
import { PolymerElement } from '@polymer/polymer/polymer-element';
import '../../styles/polymer/base-styles';
export interface TreeStructureNode<T extends TreeStructureNode = TreeStructureNode<any>> {
    itemClass?: string;
    itemHTML: string;
    selectedValue?: string;
    unselectable?: boolean;
    opened?: boolean;
    children?: T[];
}
declare const CommTreeView_base: typeof PolymerElement & import("@polymer/polymer/lib/mixins/gesture-event-listeners").GestureEventListenersConstructor;
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
export declare class CommTreeView extends CommTreeView_base {
    static readonly template: HTMLTemplateElement;
    m_selectedItem?: CommTreeItem;
    m_slot: HTMLSlotElement;
    ready(): void;
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
}
declare const CommTreeNode_base: typeof PolymerElement & import("@polymer/polymer/lib/mixins/gesture-event-listeners").GestureEventListenersConstructor;
export declare class CommTreeNode extends CommTreeNode_base {
    static readonly template: HTMLTemplateElement;
    m_toggleIconKind: string;
    m_computeToggleIconKind(opened: boolean): "icons:expand-more" | "icons:chevron-right";
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
    ready(): void;
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
     * トグルアイコンがタップされた際のハンドラです。
     * @param e
     */
    m_toggleIconOnTap(e: any): void;
}
declare const CommTreeItem_base: typeof PolymerElement & import("@polymer/polymer/lib/mixins/gesture-event-listeners").GestureEventListenersConstructor;
export declare class CommTreeItem extends CommTreeItem_base {
    static readonly template: HTMLTemplateElement;
    ready(): void;
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
     * 本クラスを継承した際に拡張可能なHTMLテンプレートです。
     * 継承した際は必要に応じてスタイルを変更することができます。
     */
    static f_extendedStyle: HTMLTemplateElement;
    /**
     * 本クラスを継承した際に拡張可能なHTMLテンプレートです。
     * 継承した際は必要に応じてHTMLテンプレートを変更することができます。
     */
    static f_extendedTemplate: HTMLTemplateElement;
    f_itemOnTap(e: any): void;
}
export {};
