import { CSSResult, LitElement } from 'lit-element';
export interface CSSClass {
    /**
     * CSSクラスの中身を文字列で表現したものです。
     * 例: "font-size: 20px; font-weight: 500;"
     */
    cssText: string;
    /**
     * CSSクラスの中身をオブジェクトで表現したものです。
     * 例: {
     *   'font-size': '20px',
     *   'font-weight': '500',
     * }
     */
    properties: {
        [key: string]: CSSResult;
    };
    /**
     * 疑似クラスの配列です。
     */
    pseudoClasses: [{
        /**
         * 擬似クラスの名前です。
         * 例: ":hover"
         */
        name: string;
        /**
         * 擬似クラスの中身を文字列で表現したものです。
         * 例: "text-decoration: underline;"
         */
        cssText: string;
        /**
         * 疑似クラスの中身をオブジェクトで表現したものです。
         * 例: {
         *   'text-decoration': 'underline',
         * }
         */
        properties: {
            [key: string]: CSSResult;
        };
    }];
}
export declare class CommCSSStyle {
    static init(): void;
    static readonly styles: CSSResult;
    private static m_cssDataMap;
    /**
     * 指定したCSSクラスのデータを取得します。
     * @param key CSSクラス名を指定します。例: ".comm-font-title"
     */
    static getClass(key: any): CSSClass;
    /**
     * CSSクラスの継承を行った結果を取得します。
     * @param targetClass 継承先を指定します。例: ".item" or ":host" など
     * @param sourceClass 継承元のCSSクラスを指定します。例: ".comm-pseudo-link"
     * @return 例: ".item { color: #3f51b5; cursor: pointer } .item:hover { text-decoration: underline }
     */
    static extendClass(targetClass: string, sourceClass: string): CSSResult;
    /**
     * クラス変数m_cssDataMapの設定を行います。
     */
    private static m_setupCssDataMap;
    /**
     * 指定されたCSSクラス名を解析してクラス変数m_cssDataMapに格納します。
     * @param selector CSSクラス名を指定します。例: ".comm-pseudo-link" or ".comm-pseudo-link:hover"
     * @param postcssItem
     */
    private static m_setupCSSClass;
    private static m_dashify;
}
export declare class CommBaseElement extends LitElement {
    m_slotElementsAssignedNodes: WeakMap<HTMLSlotElement, Node[]>;
    /**
     * 指定されたスロットに対して、前回配置されたノードと現在配置されているノードの差分を取得します。
     * @param slot
     */
    protected getDistributedChildDiff(slot: HTMLSlotElement): {
        removed: Node[];
        added: Node[];
    };
    /**
     * Runs a callback function asynchronously.
     *
     * By default (if no waitTime is specified), async callbacks are run at
     * microtask timing, which will occur before paint.
     *
     * @param {!Function} callback The callback function to run, bound to `this`.
     * @param {number=} waitTime Time to wait before calling the
     *   `callback`.  If unspecified or 0, the callback will be run at microtask
     *   timing (before paint).
     * @return {number} Handle that may be used to cancel the async job.
     */
    f_async(callback: () => any, waitTime?: number): number;
    /**
     * Cancels an async operation started with `async`.
     *
     * @param {number} handle Handle returned from original `async` call to
     *   cancel.
     * @return {void}
     */
    f_cancelAsync(handle: any): void;
}
