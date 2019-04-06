"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const lit_element_1 = require("lit-element");
const base_styles_1 = require("../../styles/polymer/base-styles");
let CommAwesomeElement = class CommAwesomeElement extends lit_element_1.LitElement {
    constructor() {
        super(...arguments);
        this.hot = false;
    }
    render() {
        return lit_element_1.html `
      <style>
        ${base_styles_1.baseStyles}
      </style>

      <style>
        :host {
          width: 100%;
        }

        :host([hot]) {
          --comm-awesome-element-container: {
            color: red;
          }
        }

        :host(:not([hot])) {
          --comm-awesome-element-container: {
            color: blue;
          }
        }

        .container {
          @apply (--comm-font-display1);
          @apply (--comm-awesome-element-container);
        }
      </style>

      <div class="layout horizontal center-justified container">Hello World!</div>
    `;
    }
};
__decorate([
    lit_element_1.property({ type: Boolean, reflect: true })
], CommAwesomeElement.prototype, "hot", void 0);
CommAwesomeElement = __decorate([
    lit_element_1.customElement('comm-awesome-element')
], CommAwesomeElement);
exports.CommAwesomeElement = CommAwesomeElement;
