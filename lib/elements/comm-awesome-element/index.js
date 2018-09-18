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
require("../../styles/base-styles");
let AwesomeElement = class AwesomeElement extends polymer_element_1.PolymerElement {
    static get template() {
        return polymer_element_1.html `
      <style include="base-styles">
        :host([color="red"]) {
          --comm-awesome-element-container: {
            color: red;
          };
        }
        :host(:not([color="red"])) {
          --comm-awesome-element-container: {
            color: blue;
          };
        }
        .container {
          @apply(--comm-font-display1);
          @apply(--comm-awesome-element-container);
        }
      </style>

      <div class="layout horizontal center-justified container">Hello World!</div>
    `;
    }
};
AwesomeElement = __decorate([
    decorators_1.customElement('comm-awesome-element')
], AwesomeElement);
exports.AwesomeElement = AwesomeElement;
