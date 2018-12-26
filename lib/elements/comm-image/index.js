"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const polymer_element_1 = require("@polymer/polymer/polymer-element");
const decorators_1 = require("@polymer/decorators");
const class_1 = require("@polymer/polymer/lib/legacy/class");
const iron_resizable_behavior_1 = require("@polymer/iron-resizable-behavior");
const gsap_1 = require("gsap");
require("../../styles/base-styles");
let CommImage = class CommImage extends class_1.mixinBehaviors([iron_resizable_behavior_1.IronResizableBehavior], polymer_element_1.PolymerElement) {
    constructor() {
        super(...arguments);
        //----------------------------------------------------------------------
        //
        //  Properties
        //
        //----------------------------------------------------------------------
        this.src = '';
        this.alt = '';
    }
    static get template() {
        return polymer_element_1.html `
      <style include="base-styles">
        /* デフォルト配置は左詰め */
        :host {
          --comm-image-align: {
            @apply(--layout-vertical);
            @apply(--layout-start);
            @apply(--layout-center-justified);
          };
        }

        :host([align="left"]) {
          --comm-image-align: {
            @apply(--layout-vertical);
            @apply(--layout-start);
            @apply(--layout-center-justified);
          };
        }

        :host([align="center"]) {
          --comm-image-align: {
            @apply(--layout-vertical);
            @apply(--layout-center-center);
          };
        }

        :host([align="right"]) {
          --comm-image-align: {
            @apply(--layout-vertical);
            @apply(--layout-end);
            @apply(--layout-center-justified);
          };
        }

        #container {
          box-sizing: border-box;
          height: 100%;
          position: relative;
          @apply(--comm-image-align);
        }

        #loading {
          width: 100%;
          height: 100%;
          top: 0;
          position: absolute;
        }

        #img {
          max-width: var(--comm-image-max-width);
          max-height: var(--comm-image-max-height);
        }

        .spinner {
          margin: 80px auto;
          width: 20px;
          height: 20px;
          position: relative;
          text-align: center;

          animation: sk-rotate 2.0s infinite linear;
        }

        .dot1, .dot2 {
          width: 60%;
          height: 60%;
          display: inline-block;
          position: absolute;
          top: 0;
          background-color: var(--comm-grey-500);
          border-radius: 100%;

          animation: sk-bounce 2.0s infinite ease-in-out;
        }

        .dot2 {
          top: auto;
          bottom: 0;
          animation-delay: -1.0s;
        }

        @keyframes sk-rotate {
          100% {
            transform: rotate(360deg);
          }
        }

        @keyframes sk-bounce {
          0%, 100% {
            transform: scale(0.0);
          }
          50% {
            transform: scale(1.0);
          }
        }
      </style>

      <div id="container">
        <div id="loading" class="layout vertical center-center">
          <div class="spinner">
            <div class="dot1"></div>
            <div class="dot2"></div>
          </div>
        </div>
        <img id="img" on-load="m_imgOnLoad">
      </div>
    `;
    }
    m_srcChanged(newValue, oldValue) {
        this.src = newValue ? newValue : '';
        if (this.m_img) {
            this.m_loading.hidden = false;
            this.m_loading.style.opacity = '1';
            this.m_img.hidden = false;
            this.m_img.style.opacity = '0';
            this.m_img.style.width = 'initial';
            this.m_img.style.height = 'initial';
            this.m_img.src = this.src;
        }
    }
    m_altChanged(newValue, oldValue) {
        this.alt = newValue;
        if (this.m_img) {
            this.m_img.alt = newValue;
        }
    }
    //----------------------------------------------------------------------
    //
    //  Lifecycle hooks
    //
    //----------------------------------------------------------------------
    ready() {
        super.ready();
        this.addEventListener('iron-resize', (e) => this.m_onIronResize(e));
        this.m_loading.hidden = true;
        this.m_img.alt = this.alt;
        this.m_img.src = this.src;
    }
    //----------------------------------------------------------------------
    //
    //  Internal methods
    //
    //----------------------------------------------------------------------
    /**
     * コンポーネントのリサイズ処理を行います。
     */
    m_resize() {
        const containerWidth = this.m_getWidth(this.m_container);
        const containerHeight = this.m_getHeight(this.m_container);
        const imgStyle = getComputedStyle(this.m_img);
        // ①: 画像本来のサイズよりimgの縦横両方がともに大きい場合
        if (this.m_img.naturalWidth < this.m_img.width || this.m_img.naturalHeight < this.m_img.height) {
            // console.log('① - 0:',
            //   'img.naturalWidth:', this.m_img.naturalWidth, '< img.width:', this.m_img.width,
            //   '|| img.naturalHeight:', this.m_img.naturalHeight, '< img.height:', this.m_img.height);
            // コンテナのサイズと画像本来のサイズが同じまたはそれより小さい場合
            if (containerWidth >= this.m_img.naturalWidth && containerHeight >= this.m_img.naturalHeight) {
                // console.log('① - 1:',
                //   'container.width:', containerWidth, '>= img.naturalWidth:', this.m_img.naturalWidth,
                //   '&& containerHeight:', containerHeight, '>= img.naturalHeight:', this.m_img.naturalHeight);
                // imgを画像本来のサイズに設定
                this.m_img.style.width = 'initial';
                this.m_img.style.height = 'initial';
                return;
            }
        }
        // ②: コンテナよりimgの縦横どちらかの方が大きい場合
        if (this.m_img.width > containerWidth || this.m_img.height > containerHeight) {
            // この計算式の説明:
            //   img.naturalHeight : img.naturalWidth = container.width : container.height
            //        (1500px)     :      (800px)     =     (1000px)    :        (x)
            //   1500x = 800 * 1000
            //       x = 533.333…
            const x = (this.m_img.naturalHeight * containerWidth) / this.m_img.naturalWidth;
            if (x <= containerHeight) {
                // console.log('② - 1:', 'container.height(x)', x, '<= container.height', containerHeight);
                this.m_img.style.width = '100%';
                this.m_img.style.height = 'initial';
            }
            else {
                // console.log('② - 2:', 'container.height(x)', x, '> container.height', containerHeight);
                this.m_img.style.width = 'initial';
                this.m_img.style.height = '100%';
            }
        }
    }
    /**
     * 現在のimgのアスペクト比を取得します。
     */
    m_getCurrentAspect() {
        const num = this.m_img.width / this.m_img.height;
        return num;
    }
    /**
     * 画像本来のアスペクト比を取得します。
     */
    m_getOriginalAspect() {
        const num = this.m_img.naturalWidth / this.m_img.naturalHeight;
        return num;
    }
    m_getWidth(element) {
        const style = getComputedStyle(element);
        return element.clientWidth - this.m_parseInt(style.paddingLeft) - this.m_parseInt(style.paddingRight);
    }
    m_getHeight(element) {
        const style = getComputedStyle(element);
        return element.clientHeight - this.m_parseInt(style.paddingTop) - this.m_parseInt(style.paddingBottom);
    }
    m_parseInt(value) {
        if (!value || value === '') {
            return 0;
        }
        const parsedValue = parseInt(value, 10);
        if (isNaN(parsedValue)) {
            return 0;
        }
        return parsedValue;
    }
    //----------------------------------------------------------------------
    //
    //  Event handlers
    //
    //----------------------------------------------------------------------
    m_onIronResize(event) {
        this.m_resize();
    }
    m_imgOnLoad(event) {
        this.m_resize();
        const timeline = new gsap_1.TimelineLite();
        timeline.to(this.m_img, 1, { opacity: 1 }).to(this.m_loading, 1, {
            opacity: 0,
            onComplete: () => {
                this.m_loading.hidden = true;
            },
        }, 0);
    }
};
__decorate([
    decorators_1.query('#container')
], CommImage.prototype, "m_container", void 0);
__decorate([
    decorators_1.query('#img')
], CommImage.prototype, "m_img", void 0);
__decorate([
    decorators_1.query('#loading')
], CommImage.prototype, "m_loading", void 0);
__decorate([
    decorators_1.property({ type: String })
], CommImage.prototype, "src", void 0);
__decorate([
    decorators_1.observe('src')
], CommImage.prototype, "m_srcChanged", null);
__decorate([
    decorators_1.property({ type: String })
], CommImage.prototype, "alt", void 0);
__decorate([
    decorators_1.observe('alt')
], CommImage.prototype, "m_altChanged", null);
CommImage = __decorate([
    decorators_1.customElement('comm-image')
], CommImage);
exports.CommImage = CommImage;