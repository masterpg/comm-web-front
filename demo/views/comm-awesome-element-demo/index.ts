import { html } from 'lit-element';

import '../../../lib/styles/polymer/base-styles';
import '../../../lib/elements/comm-awesome-element';

import { CommBaseElement } from '../../../lib/elements/comm-base-element';
import { CommResizableMixin } from '../../../lib/elements/mixins/comm-resizable-mixin';
import { baseStyles } from '../../../lib/styles/polymer/base-styles';
import { mix } from '../../../lib';

export class CommAwesomeElementDemo extends mix(CommBaseElement).with(CommResizableMixin) {
  render() {
    return html`
      <style>
        ${baseStyles}

        :host {
          display: block;
          padding: 48px;
        }
      </style>

      <comm-awesome-element hot></comm-awesome-element>
    `;
  }
}
customElements.define('comm-awesome-element-demo', CommAwesomeElementDemo);
