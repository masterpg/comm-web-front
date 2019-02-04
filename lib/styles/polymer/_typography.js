import '@polymer/polymer/polymer-legacy.js'
import {html} from '@polymer/polymer/lib/utils/html-tag.js'

const template = html`
  <dom-module id="comm-typography">
    <template>
      <style>
        :host {
          --comm-font-common-base: {
            font-family: 'Roboto', 'Noto', sans-serif;
            -webkit-font-smoothing: antialiased;
          }

          --comm-font-common-code: {
            font-family: 'Roboto Mono', 'Consolas', 'Menlo', monospace;
            -webkit-font-smoothing: antialiased;
          }

          --comm-font-common-nowrap: {
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }

          --comm-font-display4: {
            @apply (--comm-font-common-base);
            @apply (--comm-font-common-nowrap);

            font-size: 112px;
            font-weight: 300;
            letter-spacing: -0.044em;
            line-height: 120px;
          }

          --comm-font-display3: {
            @apply (--comm-font-common-base);
            @apply (--comm-font-common-nowrap);

            font-size: 56px;
            font-weight: 400;
            letter-spacing: -0.026em;
            line-height: 60px;
          }

          --comm-font-display2: {
            @apply (--comm-font-common-base);

            font-size: 45px;
            font-weight: 400;
            letter-spacing: -0.018em;
            line-height: 48px;
          }

          --comm-font-display1: {
            @apply (--comm-font-common-base);

            font-size: 34px;
            font-weight: 400;
            letter-spacing: -0.01em;
            line-height: 40px;
          }

          --comm-font-headline: {
            @apply (--comm-font-common-base);

            font-size: 24px;
            font-weight: 400;
            letter-spacing: -0.012em;
            line-height: 32px;
          }

          --comm-font-title: {
            @apply (--comm-font-common-base);
            @apply (--comm-font-common-nowrap);

            font-size: 20px;
            font-weight: 500;
            line-height: 28px;
          }

          --comm-font-subhead2: {
            @apply (--comm-font-common-base);

            font-size: 16px;
            font-weight: 500;
            line-height: 24px;
          }

          --comm-font-subhead1: {
            @apply (--comm-font-common-base);

            font-size: 16px;
            font-weight: 400;
            line-height: 24px;
          }

          --comm-font-body2: {
            @apply (--comm-font-common-base);

            font-size: 14px;
            font-weight: 500;
            line-height: 24px;
          }

          --comm-font-body1: {
            @apply (--comm-font-common-base);

            font-size: 14px;
            font-weight: 400;
            line-height: 20px;
          }

          --comm-font-caption: {
            @apply (--comm-font-common-base);
            @apply (--comm-font-common-nowrap);

            font-size: 12px;
            font-weight: 400;
            letter-spacing: 0.011em;
            line-height: 20px;
          }

          --comm-font-menu: {
            @apply (--comm-font-common-base);
            @apply (--comm-font-common-nowrap);

            font-size: 13px;
            font-weight: 500;
            line-height: 24px;
          }

          --comm-font-button: {
            @apply (--comm-font-common-base);
            @apply (--comm-font-common-nowrap);

            font-size: 14px;
            font-weight: 500;
            letter-spacing: 0.018em;
            line-height: 24px;
            text-transform: uppercase;
          }

          --comm-font-code2: {
            @apply (--comm-font-common-base);

            font-size: 14px;
            font-weight: 700;
            line-height: 20px;
          }

          --comm-font-code1: {
            @apply (--comm-font-common-base);

            font-size: 14px;
            font-weight: 500;
            line-height: 20px;
          }
        }
      </style>
    </template>
  </dom-module>
`
template.setAttribute('style', 'display: none;')
document.head.appendChild(template.content)
