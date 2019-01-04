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
var lit_element_1 = require("@polymer/lit-element");
var base_styles_1 = require("../../styles/polymer/base-styles");
var CommAwesomeElement = /** @class */ (function (_super) {
    __extends(CommAwesomeElement, _super);
    function CommAwesomeElement() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.hot = false;
        return _this;
    }
    CommAwesomeElement.prototype.render = function () {
        return lit_element_1.html(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n      <style>\n        ", "\n\n        :host {\n          width: 100%;\n        }\n\n        :host([hot]) {\n          --comm-awesome-element-container: {\n            color: red;\n          };\n        }\n\n        :host(:not([hot])) {\n          --comm-awesome-element-container: {\n            color: blue;\n          };\n        }\n\n        .container {\n          @apply(--comm-font-display1);\n          @apply(--comm-awesome-element-container);\n        }\n      </style>\n\n      <div class=\"layout horizontal center-justified container\">Hello World!</div>\n    "], ["\n      <style>\n        ", "\n\n        :host {\n          width: 100%;\n        }\n\n        :host([hot]) {\n          --comm-awesome-element-container: {\n            color: red;\n          };\n        }\n\n        :host(:not([hot])) {\n          --comm-awesome-element-container: {\n            color: blue;\n          };\n        }\n\n        .container {\n          @apply(--comm-font-display1);\n          @apply(--comm-awesome-element-container);\n        }\n      </style>\n\n      <div class=\"layout horizontal center-justified container\">Hello World!</div>\n    "])), base_styles_1.baseStyles);
    };
    __decorate([
        lit_element_1.property({ type: Boolean, reflect: true })
    ], CommAwesomeElement.prototype, "hot", void 0);
    return CommAwesomeElement;
}(lit_element_1.LitElement));
exports.CommAwesomeElement = CommAwesomeElement;
customElements.define('comm-awesome-element', CommAwesomeElement);
var templateObject_1;
