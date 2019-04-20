import {css, customElement, html, property} from 'lit-element'

import {CommBaseElement, CommCSSStyle} from '../comm-base-element'

@customElement('comm-awesome-element')
export class CommAwesomeElement extends CommBaseElement {
  static get styles() {
    return css`
      ${CommCSSStyle.styles}

      :host {
        width: 100%;
      }

      :host([hot]) {
        color: var(--comm-red-500);
      }

      :host(:not([hot])) {
        color: var(--comm-indigo-500);
      }

      ${CommCSSStyle.extendClass('.link', '.comm-pseudo-link')}
    `
  }

  protected render() {
    return html`
      <div class="layout horizontal center-justified">
        <div>Hello World!</div>
        <div @click="${this.m_linkOnClick}" class="link comm-ml-10">click</div>
      </div>
    `
  }

  @property({type: Boolean, reflect: true})
  hot = false

  private m_linkOnClick(e) {
    alert('Hello World!')
  }
}
