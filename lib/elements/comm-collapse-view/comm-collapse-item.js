"use strict";
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
const lit_element_1 = require("lit-element");
const comm_base_element_1 = require("../comm-base-element");
let CommCollapseItem = class CommCollapseItem extends comm_base_element_1.CommBaseElement {
    //----------------------------------------------------------------------
    //
    //  Lifecycle hooks
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
    static get styles() {
        return lit_element_1.css `
      ${comm_base_element_1.CommCSSStyle.styles}

      .container {
        border-bottom-style: var(--comm-collapse-divider-border-style, solid);
        border-bottom-color: var(--comm-collapse-divider-border-color, var(--comm-grey-300));
        border-bottom-width: var(--comm-collapse-divider-border-width, 1px);
      }

      .header-wrapper {
        display: flex;
      }

      ${comm_base_element_1.CommCSSStyle.extendClass('.header', '.comm-font-common-base')}
      .header {
        font-size: var(--comm-collapse-title-font-size, 16px);
        color: var(--comm-collapse-title-color, var(--comm-grey-900));
        font-weight: var(--comm-collapse-title-font-weight, 500);
        line-height: var(--comm-collapse-title-line-height, normal);
        width: 100%;
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

      ${comm_base_element_1.CommCSSStyle.extendClass('.title', '.flex')}

      .toggle {
        padding-right: 16px;
        color: var(--comm-grey-500);
      }

      ${comm_base_element_1.CommCSSStyle.extendClass('.content', '.comm-font-body1')}
      .content {
        padding-left: 16px;
        padding-right: 16px;
        text-align: left;
        color: var(--comm-grey-900);
        --iron-collapse-transition-duration: var(--comm-collapse-transition-duration, 300ms);
      }

      .content > .inner {
        padding-bottom: 16px;
      }
    `;
    }
    render() {
        return lit_element_1.html `
      <div class="container">
        <!--
          IE11でflexboxとmin-heightの組み合わせが効かないのでラッパーで囲んでいる
          参照: https://bottoms-programming.com/archives/ie11-flexbox-align-items-center.html
        -->
        <div class="header-wrapper">
          <div class="layout horizontal center-center header" @click="${this.m_titleWrapperOnClick}">
            <iron-icon id="icon" class="icon" src="${this.src}" icon="${this.icon}"></iron-icon>
            <div class="title">${this.title}</div>
            <iron-icon class="toggle" icon="${this.m_toggleIcon}"></iron-icon>
          </div>
        </div>
        <iron-collapse class="content" ?opened="${this.opened}">
          <div class="inner"><slot></slot></div>
        </iron-collapse>
      </div>
    `;
    }
    updated(changedProperties) {
        changedProperties.forEach((oldValue, propName) => {
            switch (propName) {
                case 'opened':
                    this.m_openedChanged(this.opened);
                    break;
                case 'icon':
                case 'src':
                    this.m_displayIcon();
                    break;
            }
        });
    }
    attributeChangedCallback(name, old, value) {
        super.attributeChangedCallback(name, old, value);
    }
    //----------------------------------------------------------------------
    //
    //  Internal methods
    //
    //----------------------------------------------------------------------
    m_openedChanged(opened) {
        this.m_toggleIcon = opened ? 'icons:expand-less' : 'icons:expand-more';
    }
    m_displayIcon() {
        // アイコン指定がない場合
        if (!this.icon && !this.src) {
            this.m_icon.style.display = 'none';
        }
        // アイコンの指定がある場合
        else {
            this.m_icon.style.display = 'block';
        }
    }
    //----------------------------------------------------------------------
    //
    //  Event handlers
    //
    //----------------------------------------------------------------------
    m_titleWrapperOnClick(event) {
        this.opened = !this.opened;
        this.dispatchEvent(new CustomEvent('toggle-item'));
    }
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
CommCollapseItem = __decorate([
    lit_element_1.customElement('comm-collapse-item')
], CommCollapseItem);
exports.CommCollapseItem = CommCollapseItem;
