"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const lit_element_1 = require("lit-element");
const anime = require("animejs/lib/anime");
const base_styles_1 = require("../../styles/polymer/base-styles");
const base_1 = require("../../base");
const comm_resizable_mixin_1 = require("../mixins/comm-resizable-mixin");
const comm_base_element_1 = require("../comm-base-element");
let CommImage = class CommImage extends base_1.mix(comm_base_element_1.CommBaseElement).with(comm_resizable_mixin_1.CommResizableMixin) {
    //----------------------------------------------------------------------
    //
    //  Lifecycle hooks
    //
    //----------------------------------------------------------------------
    constructor() {
        super();
        //----------------------------------------------------------------------
        //
        //  Properties
        //
        //----------------------------------------------------------------------
        this.src = '';
        this.alt = '';
        this.hAlign = 'center';
        this.vAlign = 'center';
        this.addEventListener('comm-resize', e => this.m_onCommResize(e));
    }
    render() {
        return lit_element_1.html `
      <style>
        ${base_styles_1.baseStyles}
      </style>

      <style>
        #container {
          box-sizing: border-box;
          height: 100%;
          position: relative;
        }

        #loading {
          width: 100%;
          height: 100%;
          top: 0;
          left: 0;
          position: absolute;
        }

        #img {
          max-width: var(--comm-image-max-width);
          max-height: var(--comm-image-max-height);
        }

        .loader {
          position: relative;
          display: inline-block;
          width: 20px;
          height: 20px;
          border: 2px solid #0cf;
          border-radius: 50%;
          animation: spin 0.75s infinite linear;
        }

        .loader::before,
        .loader::after {
          left: -2px;
          top: -2px;
          display: none;
          position: absolute;
          content: '';
          width: inherit;
          height: inherit;
          border: inherit;
          border-radius: inherit;
        }

        .loader-type-one,
        .loader-type-one::before {
          display: inline-block;
          border-color: transparent;
          border-top-color: var(--comm-grey-500);
        }
        .loader-type-one::before {
          animation: spin 1.5s infinite ease;
        }

        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
      </style>

      <div id="container" class="layout horizontal">
        <div id="loading" class="layout vertical center-center"><div class="loader loader-type-one"></div></div>
        <img id="img" src="${this.src}" alt="${this.alt}" @load="${this.m_imgOnLoad}" />
      </div>
    `;
    }
    updated(changedProperties) {
        changedProperties.forEach((oldValue, propName) => {
            switch (propName) {
                case 'src':
                    this.m_srcChanged(this.src, oldValue);
                    break;
                case 'hAlign':
                    this.m_hAlignChanged(this.hAlign, oldValue);
                    break;
                case 'vAlign':
                    this.m_vAlignChanged(this.vAlign, oldValue);
                    break;
            }
        });
    }
    //----------------------------------------------------------------------
    //
    //  Internal methods
    //
    //----------------------------------------------------------------------
    m_srcChanged(newValue, oldValue) {
        this.src = newValue || '';
        if (this.src) {
            this.m_loading.hidden = false;
            this.m_loading.style.opacity = '1';
            this.m_img.hidden = false;
            this.m_img.style.opacity = '0';
        }
        else {
            this.m_loading.hidden = true;
            this.m_img.hidden = true;
        }
        this.m_img.style.width = 'auto';
        this.m_img.style.height = 'auto';
    }
    m_hAlignChanged(newValue, oldValue) {
        const toClass = (position) => {
            return `${position}-justified`;
        };
        if (oldValue) {
            this.m_container.classList.remove(toClass(oldValue));
        }
        this.m_container.classList.add(toClass(newValue));
    }
    m_vAlignChanged(newValue, oldValue) {
        if (oldValue) {
            this.m_container.classList.remove(oldValue);
        }
        this.m_container.classList.add(newValue);
    }
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
                this.m_img.style.width = 'auto';
                this.m_img.style.height = 'auto';
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
                this.m_img.style.height = 'auto';
            }
            else {
                // console.log('② - 2:', 'container.height(x)', x, '> container.height', containerHeight);
                this.m_img.style.width = 'auto';
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
    m_onCommResize(e) {
        this.m_resize();
    }
    m_imgOnLoad(e) {
        this.m_resize();
        anime({
            targets: this.m_img,
            opacity: 1,
            duration: 1000,
            easing: 'easeInOutQuad',
        });
        anime({
            targets: this.m_loading,
            opacity: 0,
            duration: 500,
            easing: 'easeInOutQuad',
            complete: () => {
                this.m_loading.hidden = true;
            },
        });
    }
};
__decorate([
    lit_element_1.query('#container')
], CommImage.prototype, "m_container", void 0);
__decorate([
    lit_element_1.query('#img')
], CommImage.prototype, "m_img", void 0);
__decorate([
    lit_element_1.query('#loading')
], CommImage.prototype, "m_loading", void 0);
__decorate([
    lit_element_1.property({ type: String, reflect: true })
], CommImage.prototype, "src", void 0);
__decorate([
    lit_element_1.property({ type: String, reflect: true })
], CommImage.prototype, "alt", void 0);
__decorate([
    lit_element_1.property({ type: String, reflect: true })
], CommImage.prototype, "hAlign", void 0);
__decorate([
    lit_element_1.property({ type: String, reflect: true })
], CommImage.prototype, "vAlign", void 0);
CommImage = __decorate([
    lit_element_1.customElement('comm-image')
], CommImage);
exports.CommImage = CommImage;
