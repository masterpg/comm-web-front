import '@polymer/iron-collapse/iron-collapse';
import '@polymer/iron-icon/iron-icon';
import '@polymer/iron-icons/iron-icons';
import { PropertyValues } from 'lit-element';
import { CommBaseElement } from '../comm-base-element';
export declare class CommCollapseItem extends CommBaseElement {
    static readonly styles: import("lit-element").CSSResult;
    protected render(): import("lit-element").TemplateResult;
    private m_toggleIcon;
    private m_icon;
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
    private m_openedChanged;
    private m_displayIcon;
    private m_titleWrapperOnClick;
}
