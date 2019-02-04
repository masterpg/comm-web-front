import '@polymer/polymer/polymer-legacy.js'
import {html} from '@polymer/polymer/lib/utils/html-tag.js'

let classes = ''
classes += '.comm-mx-auto { margin-left: auto !important; margin-right: auto !important; }\n'
for (let i = 0; i <= 48; i++) {
  classes += `
    .comm-mt-${i} { margin-top: ${i}px !important; }
    .comm-mr-${i} { margin-right: ${i}px !important; }
    .comm-mb-${i} { margin-bottom: ${i}px !important; }
    .comm-ml-${i} { margin-left: ${i}px !important; }
    .comm-mx-${i} { margin-left: ${i}px !important; margin-right: ${i}px !important; }
    .comm-my-${i} { margin-top: ${i}px !important; margin-bottom: ${i}px !important; }
    .comm-ma-${i} { margin: ${i}px ${i}px !important; }
    .comm-pt-${i} { padding-top: ${i}px !important; }
    .comm-pr-${i} { padding-right: ${i}px !important; }
    .comm-pb-${i} { padding-bottom: ${i}px !important; }
    .comm-pl-${i} { padding-left: ${i}px !important; }
    .comm-px-${i} { padding-left: ${i}px !important; padding-right: ${i}px !important; }
    .comm-py-${i} { padding-top: ${i}px !important; padding-bottom: ${i}px !important; }
    .comm-pa-${i} { padding: ${i}px ${i}px !important; }
  `
}

const body = `
<dom-module id="comm-spacing">
  <template>
    <style>
      ${classes}
    </style>
  </template>
</dom-module>
`

const stringArray = [`${body}`]
const template = html({raw: stringArray, ...stringArray})
template.setAttribute('style', 'display: none;')
document.head.appendChild(template.content)
