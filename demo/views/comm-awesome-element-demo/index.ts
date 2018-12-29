import { LitElement, html } from '@polymer/lit-element';
import '../../../lib/styles/base-styles';
import '../../../lib/elements/comm-awesome-element';

export class CommAwesomeElementDemo extends LitElement {
  render() {
    return html`
      <style>
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
