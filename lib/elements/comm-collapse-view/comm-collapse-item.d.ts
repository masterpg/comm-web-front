import '@polymer/iron-collapse/iron-collapse';
import '@polymer/iron-flex-layout/iron-flex-layout';
import '@polymer/iron-flex-layout/iron-flex-layout-classes';
import '@polymer/iron-icon/iron-icon';
import '@polymer/iron-icons/iron-icons';
import { PolymerElement } from '@polymer/polymer/polymer-element';
import '../../styles/polymer/base-styles';
declare const CommCollapseItem_base: typeof PolymerElement & import("@polymer/polymer/lib/mixins/gesture-event-listeners").GestureEventListenersConstructor;
export declare class CommCollapseItem extends CommCollapseItem_base {
    static readonly template: HTMLTemplateElement;
    m_toggleIcon: string;
    m_computeToggleIcon(opened: boolean): "icons:expand-less" | "icons:expand-more";
    m_icon: HTMLElement;
    /**
     * タイトルです。
     */
    title: string;
    /**
     * アイコンです。
     * 例: "icons:info"
     */
    icon: string;
    /**
     * アイコンのURLです。
     * Polymerで用意されている以外のアイコンを使用したい場合は
     * iconプロパティではなくこのプロパティでアイコンのURLを指定してください。
     */
    src: string;
    /**
     * アイテムの開閉です。
     */
    opened: boolean;
    constructor();
    ready(): void;
    m_titleWrapperOnTap(event: any): void;
}
export {};
