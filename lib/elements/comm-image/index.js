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
var lit_element_1 = require("lit-element");
var anime = require("animejs");
var base_styles_1 = require("../../styles/polymer/base-styles");
var base_1 = require("../../base");
var comm_resizable_mixin_1 = require("../mixins/comm-resizable-mixin");
var comm_base_element_1 = require("../comm-base-element");
var CommImage = /** @class */ (function (_super) {
    __extends(CommImage, _super);
    //----------------------------------------------------------------------
    //
    //  Lifecycle hooks
    //
    //----------------------------------------------------------------------
    function CommImage() {
        var _this = _super.call(this) || this;
        //----------------------------------------------------------------------
        //
        //  Properties
        //
        //----------------------------------------------------------------------
        _this.src = '';
        _this.alt = '';
        _this.hAlign = 'center';
        _this.vAlign = 'center';
        _this.addEventListener('comm-resize', function (e) { return _this.m_onCommResize(e); });
        return _this;
    }
    CommImage.prototype.render = function () {
        return lit_element_1.html(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n      <style>\n        ", "\n\n        #container {\n          box-sizing: border-box;\n          height: 100%;\n          position: relative;\n        }\n\n        #loading {\n          width: 100%;\n          height: 100%;\n          top: 0;\n          left: 0;\n          position: absolute;\n        }\n\n        #img {\n          max-width: var(--comm-image-max-width);\n          max-height: var(--comm-image-max-height);\n        }\n\n        .loader {\n          position: relative;\n          display: inline-block;\n          width: 20px;\n          height: 20px;\n          border: 2px solid #0cf;\n          border-radius: 50%;\n          animation: spin 0.75s infinite linear;\n        }\n\n        .loader::before,\n        .loader::after {\n          left: -2px;\n          top: -2px;\n          display: none;\n          position: absolute;\n          content: '';\n          width: inherit;\n          height: inherit;\n          border: inherit;\n          border-radius: inherit;\n        }\n\n        .loader-type-one,\n        .loader-type-one::before {\n          display: inline-block;\n          border-color: transparent;\n          border-top-color: var(--comm-grey-500);\n        }\n        .loader-type-one::before {\n          animation: spin 1.5s infinite ease;\n        }\n\n        @keyframes spin {\n          from {\n            transform: rotate(0deg);\n          }\n          to {\n            transform: rotate(360deg);\n          }\n        }\n      </style>\n\n      <div id=\"container\" class=\"layout horizontal\">\n        <div id=\"loading\" class=\"layout vertical center-center\"><div class=\"loader loader-type-one\"></div></div>\n        <img id=\"img\" src=\"", "\" alt=\"", "\" @load=\"", "\" />\n      </div>\n    "], ["\n      <style>\n        ", "\n\n        #container {\n          box-sizing: border-box;\n          height: 100%;\n          position: relative;\n        }\n\n        #loading {\n          width: 100%;\n          height: 100%;\n          top: 0;\n          left: 0;\n          position: absolute;\n        }\n\n        #img {\n          max-width: var(--comm-image-max-width);\n          max-height: var(--comm-image-max-height);\n        }\n\n        .loader {\n          position: relative;\n          display: inline-block;\n          width: 20px;\n          height: 20px;\n          border: 2px solid #0cf;\n          border-radius: 50%;\n          animation: spin 0.75s infinite linear;\n        }\n\n        .loader::before,\n        .loader::after {\n          left: -2px;\n          top: -2px;\n          display: none;\n          position: absolute;\n          content: '';\n          width: inherit;\n          height: inherit;\n          border: inherit;\n          border-radius: inherit;\n        }\n\n        .loader-type-one,\n        .loader-type-one::before {\n          display: inline-block;\n          border-color: transparent;\n          border-top-color: var(--comm-grey-500);\n        }\n        .loader-type-one::before {\n          animation: spin 1.5s infinite ease;\n        }\n\n        @keyframes spin {\n          from {\n            transform: rotate(0deg);\n          }\n          to {\n            transform: rotate(360deg);\n          }\n        }\n      </style>\n\n      <div id=\"container\" class=\"layout horizontal\">\n        <div id=\"loading\" class=\"layout vertical center-center\"><div class=\"loader loader-type-one\"></div></div>\n        <img id=\"img\" src=\"", "\" alt=\"", "\" @load=\"", "\" />\n      </div>\n    "])), base_styles_1.baseStyles, this.src, this.alt, this.m_imgOnLoad);
    };
    CommImage.prototype.updated = function (changedProperties) {
        var _this = this;
        changedProperties.forEach(function (oldValue, propName) {
            switch (propName) {
                case 'src':
                    _this.m_srcChanged(_this.src, oldValue);
                    break;
                case 'hAlign':
                    _this.m_hAlignChanged(_this.hAlign, oldValue);
                    break;
                case 'vAlign':
                    _this.m_vAlignChanged(_this.vAlign, oldValue);
                    break;
            }
        });
    };
    //----------------------------------------------------------------------
    //
    //  Internal methods
    //
    //----------------------------------------------------------------------
    CommImage.prototype.m_srcChanged = function (newValue, oldValue) {
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
    };
    CommImage.prototype.m_hAlignChanged = function (newValue, oldValue) {
        var toClass = function (position) {
            return position + "-justified";
        };
        if (oldValue) {
            this.m_container.classList.remove(toClass(oldValue));
        }
        this.m_container.classList.add(toClass(newValue));
    };
    CommImage.prototype.m_vAlignChanged = function (newValue, oldValue) {
        if (oldValue) {
            this.m_container.classList.remove(oldValue);
        }
        this.m_container.classList.add(newValue);
    };
    /**
     * コンポーネントのリサイズ処理を行います。
     */
    CommImage.prototype.m_resize = function () {
        var containerWidth = this.m_getWidth(this.m_container);
        var containerHeight = this.m_getHeight(this.m_container);
        var imgStyle = getComputedStyle(this.m_img);
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
            var x = (this.m_img.naturalHeight * containerWidth) / this.m_img.naturalWidth;
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
    };
    /**
     * 現在のimgのアスペクト比を取得します。
     */
    CommImage.prototype.m_getCurrentAspect = function () {
        var num = this.m_img.width / this.m_img.height;
        return num;
    };
    /**
     * 画像本来のアスペクト比を取得します。
     */
    CommImage.prototype.m_getOriginalAspect = function () {
        var num = this.m_img.naturalWidth / this.m_img.naturalHeight;
        return num;
    };
    CommImage.prototype.m_getWidth = function (element) {
        var style = getComputedStyle(element);
        return element.clientWidth - this.m_parseInt(style.paddingLeft) - this.m_parseInt(style.paddingRight);
    };
    CommImage.prototype.m_getHeight = function (element) {
        var style = getComputedStyle(element);
        return element.clientHeight - this.m_parseInt(style.paddingTop) - this.m_parseInt(style.paddingBottom);
    };
    CommImage.prototype.m_parseInt = function (value) {
        if (!value || value === '') {
            return 0;
        }
        var parsedValue = parseInt(value, 10);
        if (isNaN(parsedValue)) {
            return 0;
        }
        return parsedValue;
    };
    //----------------------------------------------------------------------
    //
    //  Event handlers
    //
    //----------------------------------------------------------------------
    CommImage.prototype.m_onCommResize = function (e) {
        this.m_resize();
    };
    CommImage.prototype.m_imgOnLoad = function (e) {
        var _this = this;
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
            complete: function () {
                _this.m_loading.hidden = true;
            },
        });
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
    return CommImage;
}(base_1.mix(comm_base_element_1.CommBaseElement).with(comm_resizable_mixin_1.CommResizableMixin)));
exports.CommImage = CommImage;
customElements.define('comm-image', CommImage);
var templateObject_1;
