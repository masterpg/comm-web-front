import '@polymer/polymer/polymer-legacy.js'
import {html} from '@polymer/polymer/lib/utils/html-tag.js'

const template = html`
  <dom-module id="comm-common">
    <template>
      <style>
        :host {
          --comm-pseudo-link: {
            color: var(--comm-indigo-500);
            font-weight: 500;
            cursor: pointer;
          }
          --comm-pseudo-link-hover: {
            text-decoration: underline;
          }
        }
      </style>
    </template>
  </dom-module>
`
template.setAttribute('style', 'display: none;')
document.head.appendChild(template.content)
