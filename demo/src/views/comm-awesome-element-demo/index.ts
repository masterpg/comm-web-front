import {customElement, html} from 'lit-element'

import '../../../../lib/styles/polymer/base-styles'
import '../../../../lib/elements/comm-awesome-element'

import {CommBaseElement} from '../../../../lib/elements/comm-base-element'
import {CommResizableMixin} from '../../../../lib/elements/mixins/comm-resizable-mixin'
import {baseStyles} from '../../../../lib/styles/polymer/base-styles'
import {mix} from '../../../../lib'

@customElement('comm-awesome-element-demo')
export class CommAwesomeElementDemo extends mix(CommBaseElement).with(CommResizableMixin) {
  render() {
    return html`
      <style>
        ${baseStyles}
      </style>

      <style>
        :host {
          display: block;
          padding: 48px;
        }
      </style>

      <comm-awesome-element hot></comm-awesome-element>
    `
  }
}
