import '@polymer/iron-collapse/iron-collapse';
import '@polymer/iron-icon/iron-icon';
import '@polymer/iron-icons/iron-icons';
import { LitElement, PropertyValues } from 'lit-element';
export declare class CommCollapseItem extends LitElement {
    protected render(): import("lit-element").TemplateResult;
    m_toggleIcon: string;
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
    protected updated(changedProperties: PropertyValues): void;
    attributeChangedCallback(name: string, old: string, value: string): void;
    m_openedChanged(opened: boolean): void;
    m_displayIcon(): void;
    m_titleWrapperOnClick(event: any): void;
}
