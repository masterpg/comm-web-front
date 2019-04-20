import {css, customElement, html} from 'lit-element'

import '../../../../lib/elements/comm-awesome-element'

import {CommBaseElement, CommCSSStyle} from '../../../../lib/elements/comm-base-element'
import {CommResizableMixin} from '../../../../lib/elements/mixins/comm-resizable-mixin'
import {mix} from '../../../../lib'

@customElement('comm-awesome-element-page')
export class CommAwesomeElementPage extends mix(CommBaseElement).with(CommResizableMixin) {
  static get styles() {
    return css`
      ${CommCSSStyle.styles}

      :host {
        display: block;
        padding: 48px;
      }
    `
  }

  protected render() {
    return html`
      <comm-awesome-element hot></comm-awesome-element>
    `
  }
}
