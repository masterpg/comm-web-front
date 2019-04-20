import { PropertyValues } from 'lit-element';
import { CommBaseElement } from '../comm-base-element';
declare type AlignType = 'start' | 'center' | 'end';
declare const CommImage_base: import("../../base").Constructor<CommBaseElement> & import("../../base").Constructor<import("../mixins/comm-resizable-mixin").CommResizableElement>;
export declare class CommImage extends CommImage_base {
    static readonly styles: import("lit-element").CSSResult;
    protected render(): import("lit-element").TemplateResult;
    private m_container;
    private m_img;
    private m_loading;
    src: string;
    alt: string;
    hAlign: AlignType;
    vAlign: AlignType;
    constructor();
    protected updated(changedProperties: PropertyValues): void;
    private m_srcChanged;
    private m_hAlignChanged;
    private m_vAlignChanged;
    /**
     * コンポーネントのリサイズ処理を行います。
     */
    private m_resize;
    /**
     * 現在のimgのアスペクト比を取得します。
     */
    private m_getCurrentAspect;
    /**
     * 画像本来のアスペクト比を取得します。
     */
    private m_getOriginalAspect;
    private m_getWidth;
    private m_getHeight;
    private m_parseInt;
    private m_onCommResize;
    private m_imgOnLoad;
}
export {};
