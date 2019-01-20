import { PropertyValues } from 'lit-element';
import { CommBaseElement } from '../comm-base-element';
declare type AlignType = 'start' | 'center' | 'end';
declare const CommImage_base: import("../../base").Constructor<CommBaseElement> & import("../../base").Constructor<import("../mixins/comm-resizable-mixin").CommResizableElement>;
export declare class CommImage extends CommImage_base {
    protected render(): import("lit-element").TemplateResult;
    m_container: HTMLDivElement;
    m_img: HTMLImageElement;
    m_loading: HTMLDivElement;
    src: string;
    alt: string;
    hAlign: AlignType;
    vAlign: AlignType;
    constructor();
    protected updated(changedProperties: PropertyValues): void;
    m_srcChanged(newValue: string, oldValue: string | undefined): void;
    m_hAlignChanged(newValue: AlignType, oldValue: AlignType | undefined): void;
    m_vAlignChanged(newValue: AlignType, oldValue: AlignType | undefined): void;
    /**
     * コンポーネントのリサイズ処理を行います。
     */
    m_resize(): void;
    /**
     * 現在のimgのアスペクト比を取得します。
     */
    m_getCurrentAspect(): number;
    /**
     * 画像本来のアスペクト比を取得します。
     */
    m_getOriginalAspect(): number;
    m_getWidth(element: HTMLElement): number;
    m_getHeight(element: HTMLElement): number;
    m_parseInt(value: any): number;
    m_onCommResize(e: any): void;
    m_imgOnLoad(e: any): void;
}
export {};
