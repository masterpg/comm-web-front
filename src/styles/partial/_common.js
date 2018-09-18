import '@polymer/polymer/polymer-legacy.js';
import { html } from '@polymer/polymer/lib/utils/html-tag.js';

const template = html`
<custom-style>
  <style is="base-styles">
    html {
      --comm-pseudo-link: {
        color: var(--comm-indigo-500);
        font-weight: 500;
        cursor: pointer;
      };
      --comm-pseudo-link-hover: {
        text-decoration: underline;
      };
    }
  </style>
</custom-style>
`;
template.setAttribute('style', 'display: none;');
document.head.appendChild(template.content);
