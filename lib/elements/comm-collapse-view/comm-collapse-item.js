"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
require("../../styles/base-styles");
require("@polymer/iron-collapse/iron-collapse");
require("@polymer/iron-flex-layout/iron-flex-layout");
require("@polymer/iron-flex-layout/iron-flex-layout-classes");
require("@polymer/iron-icon/iron-icon");
require("@polymer/iron-icons/iron-icons");
const gesture_event_listeners_1 = require("@polymer/polymer/lib/mixins/gesture-event-listeners");
const polymer_element_1 = require("@polymer/polymer/polymer-element");
const decorators_1 = require("@polymer/decorators");
let CommCollapseItem = class CommCollapseItem extends gesture_event_listeners_1.GestureEventListeners(polymer_element_1.PolymerElement) {
    //----------------------------------------------------------------------
    //
    //  Lifecycle callbacks
    //
    //----------------------------------------------------------------------
    constructor() {
        super();
        //----------------------------------------------------------------------
        //
        //  Variables
        //
        //----------------------------------------------------------------------
        this.m_toggleIcon = '';
        //----------------------------------------------------------------------
        //
        //  Properties
        //
        //----------------------------------------------------------------------
        /**
         * タイトルです。
         */
        this.title = '';
        /**
         * アイコンです。
         * 例: "icons:info"
         */
        this.icon = '';
        /**
         * アイコンのURLです。
         * Polymerで用意されている以外のアイコンを使用したい場合は
         * iconプロパティではなくこのプロパティでアイコンのURLを指定してください。
         */
        this.src = '';
        /**
         * アイテムの開閉です。
         */
        this.opened = false;
    }
    static get template() {
        return polymer_element_1.html `
      <style include="base-styles">
        .container {
          border-bottom-style: var(--comm-collapse-divider-border-style, solid);
          border-bottom-color: var(--comm-collapse-divider-border-color, var(--comm-grey-300));
          border-bottom-width: var(--comm-collapse-divider-border-width, 1px);
        }
        .title-wrapper {
          @apply(--comm-font-common-base);
          font-size: var(--comm-collapse-title-font-size, 16px);
          color: var(--comm-collapse-title-color, var(--comm-grey-900));
          font-weight: var(--comm-collapse-title-font-weight, 500);
          line-height: var(--comm-collapse-title-line-height, normal);
          @apply(--comm-collapse-title);
          min-height: 48px;
          padding-left: 16px;
          text-align: left;
          cursor: pointer;
        }
        .icon {
          margin-right: 16px;
          --iron-icon-height: 24px;
          --iron-icon-width: 24px;
        }
        .toogle {
          padding-right: 16px;
          color: var(--comm-grey-500);
        }
        .content {
          padding-left: 16px;
          padding-right: 16px;
          text-align: left;
          color: var(--comm-grey-900);
          --iron-collapse-transition-duration: var(--comm-collapse-transition-duration, 300ms);
          @apply(--comm-font-body1);
        }
        .content > div {
          padding-bottom: 16px;
        }
      </style>
      <div class="container">
        <div class="layout horizontal center-center title-wrapper" on-tap="m_titleWrapperOnTap">
          <iron-icon id="icon" class="icon" src="[[src]]" icon="[[icon]]"></iron-icon>
          <div class="flex">[[title]]</div>
          <iron-icon class="toogle" icon="[[m_toggleIcon]]"></iron-icon>
        </div>
        <iron-collapse class="content" opened="{{opened}}">
          <div><slot></slot></div>
        </iron-collapse>
      </div>
    `;
    }
    m_computeToggleIcon(opened) {
        return opened ? 'icons:expand-less' : 'icons:expand-more';
    }
    ready() {
        super.ready();
        // アイコン指定がない場合
        if (!this.icon && !this.src) {
            this.m_icon.style.display = 'none';
        }
    }
    //----------------------------------------------------------------------
    //
    //  Internal methods
    //
    //----------------------------------------------------------------------
    m_titleWrapperOnTap(event) {
        this.opened = !this.opened;
        this.dispatchEvent(new CustomEvent('toggle-item'));
    }
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
exports.CommCollapseItem = CommCollapseItem;
