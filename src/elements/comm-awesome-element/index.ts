import {LitElement, html, property} from 'lit-element'
import {baseStyles} from '../../styles/polymer/base-styles'

export class CommAwesomeElement extends LitElement {
  render() {
    return html`
      <style>
        ${baseStyles}

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
customElements.define('comm-awesome-element', CommAwesomeElement)
