import { PolymerElement } from '@polymer/polymer/polymer-element';
import '../../styles/base-styles';
declare const CommImage_base: new () => PolymerElement;
export declare class CommImage extends CommImage_base {
    static readonly template: HTMLTemplateElement;
    m_container: HTMLDivElement;
    m_img: HTMLImageElement;
    m_loading: HTMLDivElement;
    src: string;
    m_srcChanged(newValue: any, oldValue: any): void;
    alt: string;
    m_altChanged(newValue: any, oldValue: any): void;
    ready(): void;
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
    m_onIronResize(event: any): void;
    m_imgOnLoad(event: any): void;
}
export {};
