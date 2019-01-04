"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
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
require("@polymer/iron-flex-layout/iron-flex-layout");
require("@polymer/iron-flex-layout/iron-flex-layout-classes");
require("@polymer/iron-icon/iron-icon");
require("@polymer/iron-icons/iron-icons");
var gesture_event_listeners_1 = require("@polymer/polymer/lib/mixins/gesture-event-listeners");
var polymer_element_1 = require("@polymer/polymer/polymer-element");
var decorators_1 = require("@polymer/decorators");
require("../../styles/polymer/base-styles");
var CommCollapseItem = /** @class */ (function (_super) {
    __extends(CommCollapseItem, _super);
    //----------------------------------------------------------------------
    //
    //  Lifecycle callbacks
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
    Object.defineProperty(CommCollapseItem, "template", {
        get: function () {
            return polymer_element_1.html(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n      <style include=\"base-styles\">\n        .container {\n          border-bottom-style: var(--comm-collapse-divider-border-style, solid);\n          border-bottom-color: var(--comm-collapse-divider-border-color, var(--comm-grey-300));\n          border-bottom-width: var(--comm-collapse-divider-border-width, 1px);\n        }\n        .title-wrapper {\n          @apply(--comm-font-common-base);\n          font-size: var(--comm-collapse-title-font-size, 16px);\n          color: var(--comm-collapse-title-color, var(--comm-grey-900));\n          font-weight: var(--comm-collapse-title-font-weight, 500);\n          line-height: var(--comm-collapse-title-line-height, normal);\n          @apply(--comm-collapse-title);\n          min-height: 48px;\n          padding-left: 16px;\n          text-align: left;\n          cursor: pointer;\n        }\n        .icon {\n          margin-right: 16px;\n          --iron-icon-height: 24px;\n          --iron-icon-width: 24px;\n        }\n        .toogle {\n          padding-right: 16px;\n          color: var(--comm-grey-500);\n        }\n        .content {\n          padding-left: 16px;\n          padding-right: 16px;\n          text-align: left;\n          color: var(--comm-grey-900);\n          --iron-collapse-transition-duration: var(--comm-collapse-transition-duration, 300ms);\n          @apply(--comm-font-body1);\n        }\n        .content > div {\n          padding-bottom: 16px;\n        }\n      </style>\n      <div class=\"container\">\n        <div class=\"layout horizontal center-center title-wrapper\" on-tap=\"m_titleWrapperOnTap\">\n          <iron-icon id=\"icon\" class=\"icon\" src=\"[[src]]\" icon=\"[[icon]]\"></iron-icon>\n          <div class=\"flex\">[[title]]</div>\n          <iron-icon class=\"toogle\" icon=\"[[m_toggleIcon]]\"></iron-icon>\n        </div>\n        <iron-collapse class=\"content\" opened=\"{{opened}}\">\n          <div><slot></slot></div>\n        </iron-collapse>\n      </div>\n    "], ["\n      <style include=\"base-styles\">\n        .container {\n          border-bottom-style: var(--comm-collapse-divider-border-style, solid);\n          border-bottom-color: var(--comm-collapse-divider-border-color, var(--comm-grey-300));\n          border-bottom-width: var(--comm-collapse-divider-border-width, 1px);\n        }\n        .title-wrapper {\n          @apply(--comm-font-common-base);\n          font-size: var(--comm-collapse-title-font-size, 16px);\n          color: var(--comm-collapse-title-color, var(--comm-grey-900));\n          font-weight: var(--comm-collapse-title-font-weight, 500);\n          line-height: var(--comm-collapse-title-line-height, normal);\n          @apply(--comm-collapse-title);\n          min-height: 48px;\n          padding-left: 16px;\n          text-align: left;\n          cursor: pointer;\n        }\n        .icon {\n          margin-right: 16px;\n          --iron-icon-height: 24px;\n          --iron-icon-width: 24px;\n        }\n        .toogle {\n          padding-right: 16px;\n          color: var(--comm-grey-500);\n        }\n        .content {\n          padding-left: 16px;\n          padding-right: 16px;\n          text-align: left;\n          color: var(--comm-grey-900);\n          --iron-collapse-transition-duration: var(--comm-collapse-transition-duration, 300ms);\n          @apply(--comm-font-body1);\n        }\n        .content > div {\n          padding-bottom: 16px;\n        }\n      </style>\n      <div class=\"container\">\n        <div class=\"layout horizontal center-center title-wrapper\" on-tap=\"m_titleWrapperOnTap\">\n          <iron-icon id=\"icon\" class=\"icon\" src=\"[[src]]\" icon=\"[[icon]]\"></iron-icon>\n          <div class=\"flex\">[[title]]</div>\n          <iron-icon class=\"toogle\" icon=\"[[m_toggleIcon]]\"></iron-icon>\n        </div>\n        <iron-collapse class=\"content\" opened=\"{{opened}}\">\n          <div><slot></slot></div>\n        </iron-collapse>\n      </div>\n    "])));
        },
        enumerable: true,
        configurable: true
    });
    CommCollapseItem.prototype.m_computeToggleIcon = function (opened) {
        return opened ? 'icons:expand-less' : 'icons:expand-more';
    };
    CommCollapseItem.prototype.ready = function () {
        _super.prototype.ready.call(this);
        // アイコン指定がない場合
        if (!this.icon && !this.src) {
            this.m_icon.style.display = 'none';
        }
    };
    //----------------------------------------------------------------------
    //
    //  Internal methods
    //
    //----------------------------------------------------------------------
    CommCollapseItem.prototype.m_titleWrapperOnTap = function (event) {
        this.opened = !this.opened;
        this.dispatchEvent(new CustomEvent('toggle-item'));
    };
    __decorate([
        decorators_1.property({ type: String, computed: 'm_computeToggleIcon(opened)' })
    ], CommCollapseItem.prototype, "m_toggleIcon", void 0);
    __decorate([
        decorators_1.query('#icon')
    ], CommCollapseItem.prototype, "m_icon", void 0);
    __decorate([
        decorators_1.property({ type: String })
    ], CommCollapseItem.prototype, "title", void 0);
    __decorate([
        decorators_1.property({ type: String })
    ], CommCollapseItem.prototype, "icon", void 0);
    __decorate([
        decorators_1.property({ type: String })
    ], CommCollapseItem.prototype, "src", void 0);
    __decorate([
        decorators_1.property({ type: Boolean })
    ], CommCollapseItem.prototype, "opened", void 0);
    CommCollapseItem = __decorate([
        decorators_1.customElement('comm-collapse-item')
    ], CommCollapseItem);
    return CommCollapseItem;
}(gesture_event_listeners_1.GestureEventListeners(polymer_element_1.PolymerElement)));
exports.CommCollapseItem = CommCollapseItem;
var templateObject_1;
