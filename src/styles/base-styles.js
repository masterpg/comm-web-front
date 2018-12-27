import '@polymer/polymer/polymer-legacy.js';
import '@polymer/iron-flex-layout/iron-flex-layout.js';
import '@polymer/iron-flex-layout/iron-flex-layout-classes.js';
import { html } from '@polymer/polymer/lib/utils/html-tag.js';

import './partial/_common.js';
import './partial/_shadows.js';
import './partial/_spacing.js';
import './partial/_typography.js';

const template = html`
<dom-module id="base-styles">
  <template>
    <style include="comm-spacing iron-flex iron-flex-alignment iron-flex-reverse iron-flex-factors iron-positioning">
    </style>
  </template>
</dom-module>
`;
template.setAttribute('style', 'display: none;');
document.head.appendChild(template.content);
