import { PolymerElement, html } from '@polymer/polymer/polymer-element';
import { customElement, property } from '@polymer/decorators';
import '../../styles/base-styles';

@customElement('comm-awesome-element')
export class AwesomeElement extends PolymerElement {
  static get template() {
    return html`
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
}
