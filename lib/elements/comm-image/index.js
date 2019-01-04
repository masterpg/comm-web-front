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
var polymer_element_1 = require("@polymer/polymer/polymer-element");
var decorators_1 = require("@polymer/decorators");
var class_1 = require("@polymer/polymer/lib/legacy/class");
var iron_resizable_behavior_1 = require("@polymer/iron-resizable-behavior");
var anime = require("animejs");
require("../../styles/polymer/base-styles");
var CommImage = /** @class */ (function (_super) {
    __extends(CommImage, _super);
    function CommImage() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        //----------------------------------------------------------------------
        //
        //  Properties
        //
        //----------------------------------------------------------------------
        _this.src = '';
        _this.alt = '';
        _this.hAlign = 'center';
        _this.vAlign = 'center';
        return _this;
    }
    Object.defineProperty(CommImage, "template", {
        get: function () {
            return polymer_element_1.html(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n      <style include=\"base-styles\">\n        :host([h-align=\"start\"]) {\n          --comm-image-h-align: {\n            @apply(--layout-start-justified);\n          };\n        }\n\n        :host([h-align=\"center\"]) {\n          --comm-image-h-align: {\n            @apply(--layout-center-justified);\n          };\n        }\n\n        :host([h-align=\"end\"]) {\n          --comm-image-h-align: {\n            @apply(--layout-end-justified);\n          };\n        }\n\n        :host([v-align=\"start\"]) {\n          --comm-image-v-align: {\n            @apply(--layout-start);\n          };\n        }\n\n        :host([v-align=\"center\"]) {\n          --comm-image-v-align: {\n            @apply(--layout-center);\n          };\n        }\n\n        :host([v-align=\"end\"]) {\n          --comm-image-v-align: {\n            @apply(--layout-end);\n          };\n        }\n\n        #container {\n          box-sizing: border-box;\n          height: 100%;\n          position: relative;\n          @apply(--layout-horizontal);\n          @apply(--comm-image-h-align);\n          @apply(--comm-image-v-align);\n        }\n\n        #loading {\n          width: 100%;\n          height: 100%;\n          top: 0;\n          position: absolute;\n        }\n\n        #img {\n          max-width: var(--comm-image-max-width);\n          max-height: var(--comm-image-max-height);\n        }\n\n        .loader {\n          position: relative;\n          display: inline-block;\n          width: 20px;\n          height: 20px;\n          border: 2px solid #0cf;\n          border-radius: 50%;\n          animation: spin 0.75s infinite linear;\n        }\n\n        .loader::before,\n        .loader::after {\n          left: -2px;\n          top: -2px;\n          display: none;\n          position: absolute;\n          content: '';\n          width: inherit;\n          height: inherit;\n          border: inherit;\n          border-radius: inherit;\n        }\n\n        .loader-type-one,\n        .loader-type-one::before {\n          display: inline-block;\n          border-color: transparent;\n          border-top-color: var(--comm-grey-500);\n        }\n        .loader-type-one::before {\n          animation: spin 1.5s infinite ease;\n        }\n\n        @keyframes spin {\n          from {\n            transform: rotate(0deg);\n          }\n          to {\n            transform: rotate(360deg);\n          }\n        }\n      </style>\n\n      <div id=\"container\">\n        <div id=\"loading\" class=\"layout vertical center-center\">\n          <div class=\"loader loader-type-one\"></div>\n        </div>\n        <img id=\"img\" on-load=\"m_imgOnLoad\">\n      </div>\n    "], ["\n      <style include=\"base-styles\">\n        :host([h-align=\"start\"]) {\n          --comm-image-h-align: {\n            @apply(--layout-start-justified);\n          };\n        }\n\n        :host([h-align=\"center\"]) {\n          --comm-image-h-align: {\n            @apply(--layout-center-justified);\n          };\n        }\n\n        :host([h-align=\"end\"]) {\n          --comm-image-h-align: {\n            @apply(--layout-end-justified);\n          };\n        }\n\n        :host([v-align=\"start\"]) {\n          --comm-image-v-align: {\n            @apply(--layout-start);\n          };\n        }\n\n        :host([v-align=\"center\"]) {\n          --comm-image-v-align: {\n            @apply(--layout-center);\n          };\n        }\n\n        :host([v-align=\"end\"]) {\n          --comm-image-v-align: {\n            @apply(--layout-end);\n          };\n        }\n\n        #container {\n          box-sizing: border-box;\n          height: 100%;\n          position: relative;\n          @apply(--layout-horizontal);\n          @apply(--comm-image-h-align);\n          @apply(--comm-image-v-align);\n        }\n\n        #loading {\n          width: 100%;\n          height: 100%;\n          top: 0;\n          position: absolute;\n        }\n\n        #img {\n          max-width: var(--comm-image-max-width);\n          max-height: var(--comm-image-max-height);\n        }\n\n        .loader {\n          position: relative;\n          display: inline-block;\n          width: 20px;\n          height: 20px;\n          border: 2px solid #0cf;\n          border-radius: 50%;\n          animation: spin 0.75s infinite linear;\n        }\n\n        .loader::before,\n        .loader::after {\n          left: -2px;\n          top: -2px;\n          display: none;\n          position: absolute;\n          content: '';\n          width: inherit;\n          height: inherit;\n          border: inherit;\n          border-radius: inherit;\n        }\n\n        .loader-type-one,\n        .loader-type-one::before {\n          display: inline-block;\n          border-color: transparent;\n          border-top-color: var(--comm-grey-500);\n        }\n        .loader-type-one::before {\n          animation: spin 1.5s infinite ease;\n        }\n\n        @keyframes spin {\n          from {\n            transform: rotate(0deg);\n          }\n          to {\n            transform: rotate(360deg);\n          }\n        }\n      </style>\n\n      <div id=\"container\">\n        <div id=\"loading\" class=\"layout vertical center-center\">\n          <div class=\"loader loader-type-one\"></div>\n        </div>\n        <img id=\"img\" on-load=\"m_imgOnLoad\">\n      </div>\n    "])));
        },
        enumerable: true,
        configurable: true
    });
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
        this.m_img.style.width = 'initial';
        this.m_img.style.height = 'initial';
        this.m_img.src = this.src;
    };
    CommImage.prototype.m_altChanged = function (newValue, oldValue) {
        this.alt = newValue;
        if (this.m_img) {
            this.m_img.alt = newValue;
        }
    };
    //----------------------------------------------------------------------
    //
    //  Lifecycle hooks
    //
    //----------------------------------------------------------------------
    CommImage.prototype.ready = function () {
        var _this = this;
        _super.prototype.ready.call(this);
        this.addEventListener('iron-resize', function (e) { return _this.m_onIronResize(e); });
        this.m_loading.hidden = true;
        this.m_img.alt = this.alt;
        this.m_img.src = this.src;
    };
    //----------------------------------------------------------------------
    //
    //  Internal methods
    //
    //----------------------------------------------------------------------
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
            var x = (this.m_img.naturalHeight * containerWidth) / this.m_img.naturalWidth;
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
    CommImage.prototype.m_onIronResize = function (event) {
        this.m_resize();
    };
    CommImage.prototype.m_imgOnLoad = function (event) {
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
    __decorate([
        decorators_1.property({ type: String, reflectToAttribute: true })
    ], CommImage.prototype, "hAlign", void 0);
    __decorate([
        decorators_1.property({ type: String, reflectToAttribute: true })
    ], CommImage.prototype, "vAlign", void 0);
    CommImage = __decorate([
        decorators_1.customElement('comm-image')
    ], CommImage);
    return CommImage;
}(class_1.mixinBehaviors([iron_resizable_behavior_1.IronResizableBehavior], polymer_element_1.PolymerElement)));
exports.CommImage = CommImage;
var templateObject_1;
