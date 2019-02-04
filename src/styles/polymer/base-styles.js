import '@polymer/iron-flex-layout/iron-flex-layout-classes.js'
import '@polymer/iron-flex-layout/iron-flex-layout.js'
import '@polymer/polymer/polymer-legacy.js'
import {html} from '@polymer/polymer/lib/utils/html-tag.js'
import {DomModule} from '@polymer/polymer/lib/elements/dom-module.js'

import './_colors.js'
import './_common.js'
import './_shadows.js'
import './_spacing.js'
import './_typography.js'

/**
 * 指定されたShared StylesのIDからスタイル部分を抽出し、文字列として取得します。
 * コーディングは次のURLを参照: https://github.com/Polymer/lit-element/issues/100#issuecomment-396793641
 * @param ids
 * @returns {string}
 */
function generateStyleString(ids) {
  let result = ''
  ids.forEach(id => {
    const styleTemplate = DomModule.import(id, 'template')
    if (styleTemplate.content.firstElementChild) {
      result += `\n${styleTemplate.content.firstElementChild.textContent}`
    } else {
      // for IE11
      result += `\n${styleTemplate.content.textContent}`
    }
  })
  return result
}

const styleString = generateStyleString([
  'iron-flex',
  'iron-flex-alignment',
  'iron-flex-reverse',
  'iron-flex-factors',
  'iron-positioning',
  'comm-colors',
  'comm-common',
  'comm-shadows',
  'comm-spacing',
  'comm-typography',
])

const body = `
<dom-module id="base-styles">
  <template>
    <style>
      ${styleString}
    </style>
  </template>
</dom-module>
`

const stringArray = [`${body}`]
const template = html({raw: stringArray, ...stringArray})
template.setAttribute('style', 'display: none;')
document.head.appendChild(template.content)

const baseStylesTemplate = DomModule.import('base-styles', 'template')
let baseStyles
if (baseStylesTemplate.content.firstElementChild) {
  baseStyles = baseStylesTemplate.content.firstElementChild.textContent
} else {
  // for IE11
  baseStyles = baseStylesTemplate.content.textContent
}

export {baseStyles}
