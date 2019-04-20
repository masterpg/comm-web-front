"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const lit_element_1 = require("lit-element");
const comm_base_element_1 = require("../comm-base-element");
let CommAwesomeElement = class CommAwesomeElement extends comm_base_element_1.CommBaseElement {
    constructor() {
        super(...arguments);
        this.hot = false;
    }
    static get styles() {
        return lit_element_1.css `
      ${comm_base_element_1.CommCSSStyle.styles}

      :host {
        width: 100%;
      }

      :host([hot]) {
        color: var(--comm-red-500);
      }

      :host(:not([hot])) {
        color: var(--comm-indigo-500);
      }

      ${comm_base_element_1.CommCSSStyle.extendClass('.link', '.comm-pseudo-link')}
    `;
    }
    render() {
        return lit_element_1.html `
      <div class="layout horizontal center-justified">
        <div>Hello World!</div>
        <div @click="${this.m_linkOnClick}" class="link comm-ml-10">click</div>
      </div>
    `;
    }
    m_linkOnClick(e) {
        alert('Hello World!');
    }
};
__decorate([
    lit_element_1.property({ type: Boolean, reflect: true })
], CommAwesomeElement.prototype, "hot", void 0);
CommAwesomeElement = __decorate([
    lit_element_1.customElement('comm-awesome-element')
], CommAwesomeElement);
exports.CommAwesomeElement = CommAwesomeElement;
