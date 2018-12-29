import { LitElement, html, property } from '@polymer/lit-element';
import '../../styles/base-styles';

export class CommAwesomeElement extends LitElement {
  render() {
    return html`
      <style include="base-styles">
        :host {
          width: 100%;
        }
        :host([hot]) {
          --comm-awesome-element-container: {
            color: red;
          };
        }
        :host(:not([hot])) {
          --comm-awesome-element-container: {
            color: blue;
          };
        }
        .container {
          @apply(--comm-font-display1);
          @apply(--layout-horizontal);
          @apply(--layout-center-justified);
          @apply(--comm-awesome-element-container);
        }
      </style>

      <div class="container">Hello World!</div>
    `;
  }

  @property({ type: Boolean, reflect: true })
  hot = false;
}

customElements.define('comm-awesome-element', CommAwesomeElement);
