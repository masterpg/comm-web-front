"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lit_element_1 = require("lit-element");
const async_js_1 = require("@polymer/polymer/lib/utils/async.js");
const postcss = require('postcss');
const postcssJs = require('postcss-js');
const common_1 = require("../../styles/classes/common");
const flex_layout_1 = require("../../styles/classes/flex-layout");
const shadows_1 = require("../../styles/classes/shadows");
const spacing_1 = require("../../styles/classes/spacing");
const typography_1 = require("../../styles/classes/typography");
class CommCSSStyle {
    static init() {
        this.m_setupCssDataMap();
    }
    /**
     * 指定したCSSクラスのデータを取得します。
     * @param key CSSクラス名を指定します。例: ".comm-font-title"
     */
    static getClass(key) {
        return this.m_cssDataMap[key];
    }
    /**
     * CSSクラスの継承を行った結果を取得します。
     * @param targetClass 継承先を指定します。例: ".item" or ":host" など
     * @param sourceClass 継承元のCSSクラスを指定します。例: ".comm-pseudo-link"
     * @return 例: ".item { color: #3f51b5; cursor: pointer } .item:hover { text-decoration: underline }
     */
    static extendClass(targetClass, sourceClass) {
        const classData = this.getClass(sourceClass);
        if (!classData) {
            console.warn(`CSSDataMap.extendCSS: sourceClass "${sourceClass}" was not found.`);
            return lit_element_1.unsafeCSS('');
        }
        let cssText = `${targetClass} { ${classData.cssText} }`;
        for (const pseudoClass of classData.pseudoClasses) {
            cssText = `${cssText} ${targetClass}${pseudoClass.name} { ${pseudoClass.cssText} }`.trim();
        }
        return lit_element_1.unsafeCSS(cssText);
    }
    /**
     * クラス変数m_cssDataMapの設定を行います。
     */
    static m_setupCssDataMap() {
        const postcssObject = {};
        Object.assign(postcssObject, postcssJs.objectify(postcss.parse(common_1.default.cssText)));
        Object.assign(postcssObject, postcssJs.objectify(postcss.parse(flex_layout_1.default.cssText)));
        Object.assign(postcssObject, postcssJs.objectify(postcss.parse(shadows_1.default.cssText)));
        Object.assign(postcssObject, postcssJs.objectify(postcss.parse(spacing_1.default.cssText)));
        Object.assign(postcssObject, postcssJs.objectify(postcss.parse(typography_1.default.cssText)));
        for (const key of Object.keys(postcssObject)) {
            const postcssItem = postcssObject[key];
            // keyには"  .layout.center-justified,\n   .layout.center-center"のように
            // スペースと改行が含まれるので、一旦スペースと改行を除去し、","でスプリットする
            const selectors = key.replace(/(\s|\S")/g, '').split(',');
            for (const selector of selectors) {
                this.m_setupCSSClass(selector, postcssItem);
            }
        }
    }
    /**
     * 指定されたCSSクラス名を解析してクラス変数m_cssDataMapに格納します。
     * @param selector CSSクラス名を指定します。例: ".comm-pseudo-link" or ".comm-pseudo-link:hover"
     * @param postcssItem
     */
    static m_setupCSSClass(selector, postcssItem) {
        const cssText = postcss().process(postcssItem, { parser: postcssJs }).css;
        // selectorには".comm-pseudo-link:hover"のように擬似クラスが含まれるので、":"でスプリットする
        const selectorArray = selector.split(':');
        // mainSelectorには".comm-pseudo-link"が入る
        const mainSelector = selectorArray[0];
        // pseudoClassには":hover"が入る
        const pseudoClass = selectorArray.length === 1 ? '' : selectorArray[1];
        const cssData = this.m_cssDataMap[mainSelector] || { cssText: '', pseudoClasses: [], properties: {} };
        const properties = Object.keys(postcssItem).reduce((result, key) => {
            result[this.m_dashify(key)] = lit_element_1.unsafeCSS(postcssItem[key]);
            return result;
        }, {});
        this.m_cssDataMap[selector] = cssData;
        if (!pseudoClass) {
            const newCssText = `${cssData.cssText} ${cssText}`.trim();
            cssData.cssText = newCssText;
            cssData.properties = properties;
        }
        else {
            cssData.pseudoClasses = cssData.pseudoClasses || [];
            cssData.pseudoClasses.push({
                name: `:${pseudoClass}`,
                cssText,
                properties,
            });
        }
    }
    static m_dashify(str) {
        return str
            .replace(/([A-Z])/g, '-$1')
            .replace(/^ms-/, '-ms-')
            .toLowerCase();
    }
}
CommCSSStyle.styles = lit_element_1.css `
      ${common_1.default}
      ${flex_layout_1.default}
      ${shadows_1.default}
      ${spacing_1.default}
      ${typography_1.default}
    `;
CommCSSStyle.m_cssDataMap = {};
exports.CommCSSStyle = CommCSSStyle;
CommCSSStyle.init();
class CommBaseElement extends lit_element_1.LitElement {
    constructor() {
        //----------------------------------------------------------------------
        //
        //  Variables
        //
        //----------------------------------------------------------------------
        super(...arguments);
        this.m_slotElementsAssignedNodes = new WeakMap();
    }
    //----------------------------------------------------------------------
    //
    //  Internal methods
    //
    //----------------------------------------------------------------------
    /**
     * 指定されたスロットに対して、前回配置されたノードと現在配置されているノードの差分を取得します。
     * @param slot
     */
    getDistributedChildDiff(slot) {
        let previousNodes;
        if (this.m_slotElementsAssignedNodes.has(slot)) {
            previousNodes = this.m_slotElementsAssignedNodes.get(slot);
        }
        else {
            previousNodes = [];
        }
        const newNodes = slot.assignedNodes({ flatten: true });
        // 新しいノード(newNodes)を保存する。このノードは次回から前のノードとして扱われる
        this.m_slotElementsAssignedNodes.set(slot, newNodes);
        const diff = {
            removed: [],
            added: [],
        };
        for (let i = 0; i < previousNodes.length; i++) {
            const oldNode = previousNodes[i];
            const newIndex = newNodes.indexOf(oldNode);
            // 前のノードがnewNodesに存在しない場合、前のノードは削除されたことになる
            if (!(newIndex >= 0)) {
                diff.removed.push(oldNode);
            }
            // otherwise the node wasn't added or removed.
            // 上記以外の場合、前のノードは既に追加されているのでnewNodesから削除する
            else {
                newNodes.splice(i, 1);
            }
        }
        // ここまででnewNodesには新たに追加されたノードのみに絞られている
        diff.added = newNodes;
        return diff;
    }
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
    f_async(callback, waitTime = 0) {
        // tslint:disable-next-line
        return waitTime > 0 ? async_js_1.timeOut.run(callback.bind(this), waitTime) : ~async_js_1.microTask.run(callback.bind(this));
    }
    /**
     * Cancels an async operation started with `async`.
     *
     * @param {number} handle Handle returned from original `async` call to
     *   cancel.
     * @return {void}
     */
    f_cancelAsync(handle) {
        // tslint:disable-next-line
        handle < 0 ? async_js_1.microTask.cancel(~handle) : async_js_1.timeOut.cancel(handle);
    }
}
exports.CommBaseElement = CommBaseElement;
