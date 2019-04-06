import {customElement, LitElement, html, property} from 'lit-element'
import {baseStyles} from '../../styles/polymer/base-styles'

@customElement('comm-awesome-element')
export class CommAwesomeElement extends LitElement {
  render() {
    return html`
      <style>
        ${baseStyles}
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
    `
  }

  @property({type: Boolean, reflect: true})
  hot = false
}
