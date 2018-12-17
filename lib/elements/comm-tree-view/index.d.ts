import '../../styles/base-styles';
import '@polymer/iron-collapse/iron-collapse';
import '@polymer/iron-flex-layout/iron-flex-layout';
import '@polymer/iron-flex-layout/iron-flex-layout-classes';
import '@polymer/iron-icon/iron-icon';
import '@polymer/iron-icons/iron-icons';
import { PolymerElement } from '@polymer/polymer/polymer-element';
export interface TreeStructureNode<T extends TreeStructureNode = TreeStructureNode<any>> {
    itemClass?: string;
    itemHTML: string;
    selectedValue?: string;
    unselectable?: boolean;
    opened?: boolean;
    children?: T[];
}
declare const CommTreeView_base: typeof PolymerElement & import("@polymer/polymer/lib/mixins/gesture-event-listeners").GestureEventListenersConstructor;
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
     * 現ノードと子ノードの上下間隔を設定します。
     */
    m_setDistance(): void;
    /**
     * 親ノードを取得します。
     */
    m_getParentNode(): CommTreeNode | undefined;
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
