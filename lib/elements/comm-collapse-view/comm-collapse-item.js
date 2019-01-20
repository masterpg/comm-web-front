"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
require("@polymer/iron-collapse/iron-collapse");
require("@polymer/iron-icon/iron-icon");
require("@polymer/iron-icons/iron-icons");
var lit_element_1 = require("lit-element");
var base_styles_1 = require("../../styles/polymer/base-styles");
var CommCollapseItem = /** @class */ (function (_super) {
    __extends(CommCollapseItem, _super);
    //----------------------------------------------------------------------
    //
    //  Lifecycle hooks
    //
    //----------------------------------------------------------------------
    function CommCollapseItem() {
        var _this = _super.call(this) || this;
        //----------------------------------------------------------------------
        //
        //  Variables
        //
        //----------------------------------------------------------------------
        _this.m_toggleIcon = '';
        //----------------------------------------------------------------------
        //
        //  Properties
        //
        //----------------------------------------------------------------------
        /**
         * タイトルです。
         */
        _this.title = '';
        /**
         * アイコンです。
         * 例: "icons:info"
         */
        _this.icon = '';
        /**
         * アイコンのURLです。
         * Polymerで用意されている以外のアイコンを使用したい場合は
         * iconプロパティではなくこのプロパティでアイコンのURLを指定してください。
         */
        _this.src = '';
        /**
         * アイテムの開閉です。
         */
        _this.opened = false;
        return _this;
    }
    CommCollapseItem.prototype.render = function () {
        return lit_element_1.html(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n      <style>\n        ", "\n\n        .container {\n          border-bottom-style: var(--comm-collapse-divider-border-style, solid);\n          border-bottom-color: var(--comm-collapse-divider-border-color, var(--comm-grey-300));\n          border-bottom-width: var(--comm-collapse-divider-border-width, 1px);\n        }\n\n        .header-wrapper {\n          display: flex;\n        }\n\n        .header {\n          @apply (--comm-font-common-base);\n          font-size: var(--comm-collapse-title-font-size, 16px);\n          color: var(--comm-collapse-title-color, var(--comm-grey-900));\n          font-weight: var(--comm-collapse-title-font-weight, 500);\n          line-height: var(--comm-collapse-title-line-height, normal);\n          @apply (--comm-collapse-title);\n          width: 100%;\n          min-height: 48px;\n          padding-left: 16px;\n          text-align: left;\n          cursor: pointer;\n        }\n\n        .icon {\n          margin-right: 16px;\n          --iron-icon-height: 24px;\n          --iron-icon-width: 24px;\n        }\n\n        .title {\n          @apply (--layout-flex);\n        }\n\n        .toggle {\n          padding-right: 16px;\n          color: var(--comm-grey-500);\n        }\n\n        .content {\n          padding-left: 16px;\n          padding-right: 16px;\n          text-align: left;\n          color: var(--comm-grey-900);\n          --iron-collapse-transition-duration: var(--comm-collapse-transition-duration, 300ms);\n          @apply (--comm-font-body1);\n        }\n\n        .content > .inner {\n          padding-bottom: 16px;\n        }\n      </style>\n\n      <div class=\"container\">\n        <!--\n          IE11\u3067flexbox\u3068min-height\u306E\u7D44\u307F\u5408\u308F\u305B\u304C\u52B9\u304B\u306A\u3044\u306E\u3067\u30E9\u30C3\u30D1\u30FC\u3067\u56F2\u3093\u3067\u3044\u308B\n          \u53C2\u7167: https://bottoms-programming.com/archives/ie11-flexbox-align-items-center.html\n        -->\n        <div class=\"header-wrapper\">\n          <div class=\"layout horizontal center-center header\" @click=\"", "\">\n            <iron-icon id=\"icon\" class=\"icon\" src=\"", "\" icon=\"", "\"></iron-icon>\n            <div class=\"title\">", "</div>\n            <iron-icon class=\"toggle\" icon=\"", "\"></iron-icon>\n          </div>\n        </div>\n        <iron-collapse class=\"content\" ?opened=\"", "\">\n          <div class=\"inner\">\n            <slot></slot>\n          </div>\n        </iron-collapse>\n      </div>\n    "], ["\n      <style>\n        ", "\n\n        .container {\n          border-bottom-style: var(--comm-collapse-divider-border-style, solid);\n          border-bottom-color: var(--comm-collapse-divider-border-color, var(--comm-grey-300));\n          border-bottom-width: var(--comm-collapse-divider-border-width, 1px);\n        }\n\n        .header-wrapper {\n          display: flex;\n        }\n\n        .header {\n          @apply (--comm-font-common-base);\n          font-size: var(--comm-collapse-title-font-size, 16px);\n          color: var(--comm-collapse-title-color, var(--comm-grey-900));\n          font-weight: var(--comm-collapse-title-font-weight, 500);\n          line-height: var(--comm-collapse-title-line-height, normal);\n          @apply (--comm-collapse-title);\n          width: 100%;\n          min-height: 48px;\n          padding-left: 16px;\n          text-align: left;\n          cursor: pointer;\n        }\n\n        .icon {\n          margin-right: 16px;\n          --iron-icon-height: 24px;\n          --iron-icon-width: 24px;\n        }\n\n        .title {\n          @apply (--layout-flex);\n        }\n\n        .toggle {\n          padding-right: 16px;\n          color: var(--comm-grey-500);\n        }\n\n        .content {\n          padding-left: 16px;\n          padding-right: 16px;\n          text-align: left;\n          color: var(--comm-grey-900);\n          --iron-collapse-transition-duration: var(--comm-collapse-transition-duration, 300ms);\n          @apply (--comm-font-body1);\n        }\n\n        .content > .inner {\n          padding-bottom: 16px;\n        }\n      </style>\n\n      <div class=\"container\">\n        <!--\n          IE11\u3067flexbox\u3068min-height\u306E\u7D44\u307F\u5408\u308F\u305B\u304C\u52B9\u304B\u306A\u3044\u306E\u3067\u30E9\u30C3\u30D1\u30FC\u3067\u56F2\u3093\u3067\u3044\u308B\n          \u53C2\u7167: https://bottoms-programming.com/archives/ie11-flexbox-align-items-center.html\n        -->\n        <div class=\"header-wrapper\">\n          <div class=\"layout horizontal center-center header\" @click=\"", "\">\n            <iron-icon id=\"icon\" class=\"icon\" src=\"", "\" icon=\"", "\"></iron-icon>\n            <div class=\"title\">", "</div>\n            <iron-icon class=\"toggle\" icon=\"", "\"></iron-icon>\n          </div>\n        </div>\n        <iron-collapse class=\"content\" ?opened=\"", "\">\n          <div class=\"inner\">\n            <slot></slot>\n          </div>\n        </iron-collapse>\n      </div>\n    "])), base_styles_1.baseStyles, this.m_titleWrapperOnClick, this.src, this.icon, this.title, this.m_toggleIcon, this.opened);
    };
    CommCollapseItem.prototype.updated = function (changedProperties) {
        var _this = this;
        changedProperties.forEach(function (oldValue, propName) {
            switch (propName) {
                case 'opened':
                    _this.m_openedChanged(_this.opened);
                    break;
                case 'icon':
                case 'src':
                    _this.m_displayIcon();
                    break;
            }
        });
    };
    CommCollapseItem.prototype.attributeChangedCallback = function (name, old, value) {
        _super.prototype.attributeChangedCallback.call(this, name, old, value);
    };
    //----------------------------------------------------------------------
    //
    //  Internal methods
    //
    //----------------------------------------------------------------------
    CommCollapseItem.prototype.m_openedChanged = function (opened) {
        this.m_toggleIcon = opened ? 'icons:expand-less' : 'icons:expand-more';
    };
    CommCollapseItem.prototype.m_displayIcon = function () {
        // アイコン指定がない場合
        if (!this.icon && !this.src) {
            this.m_icon.style.display = 'none';
        }
        // アイコンの指定がある場合
        else {
            this.m_icon.style.display = 'block';
        }
    };
    //----------------------------------------------------------------------
    //
    //  Event handlers
    //
    //----------------------------------------------------------------------
    CommCollapseItem.prototype.m_titleWrapperOnClick = function (event) {
        this.opened = !this.opened;
        this.dispatchEvent(new CustomEvent('toggle-item'));
    };
    __decorate([
        lit_element_1.property({ type: String })
    ], CommCollapseItem.prototype, "m_toggleIcon", void 0);
    __decorate([
        lit_element_1.query('#icon')
    ], CommCollapseItem.prototype, "m_icon", void 0);
    __decorate([
        lit_element_1.property({ type: String })
    ], CommCollapseItem.prototype, "title", void 0);
    __decorate([
        lit_element_1.property({ type: String })
    ], CommCollapseItem.prototype, "icon", void 0);
    __decorate([
        lit_element_1.property({ type: String })
    ], CommCollapseItem.prototype, "src", void 0);
    __decorate([
        lit_element_1.property({ type: Boolean })
    ], CommCollapseItem.prototype, "opened", void 0);
    return CommCollapseItem;
}(lit_element_1.LitElement));
exports.CommCollapseItem = CommCollapseItem;
customElements.define('comm-collapse-item', CommCollapseItem);
var templateObject_1;
