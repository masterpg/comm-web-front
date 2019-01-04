import '@polymer/paper-card/paper-card';
import { PolymerElement, html } from '@polymer/polymer/polymer-element';
import { customElement, property, query } from '@polymer/decorators';

import '../../../lib/elements/comm-collapse-view';
import '../../../lib/styles/polymer/base-styles';

@customElement('comm-collapse-view-demo')
class CommCollapseViewDemo extends PolymerElement {
  static get template() {
    return html`
      <style include="base-styles">
        .main-container {
          padding: 48px;
          --comm-collapse-title: {
            @apply(--comm-font-subhead2);
          }
        }

        .collapse-container {
          width: 100%;
        }

        *.collapse-container:not(:first-child) {
          margin-top: 48px;
        }

        .collapse1 {
        }

        .collapse2 {
          --comm-collapse-frame-border-style: solid;
        }

        .collapse3 {
          --comm-collapse-divider-border-style: none;
        }
      </style>

      <div class="layout vertical center main-container">
        <paper-card class="collapse-container">
          <comm-collapse-view class="collapse1">
            <comm-collapse-item title="Item1">[[m_text]]</comm-collapse-item>
            <comm-collapse-item title="Item2">[[m_text]]</comm-collapse-item>
            <comm-collapse-item title="Item3">[[m_text]]</comm-collapse-item>
          </comm-collapse-view>
        </paper-card>

        <paper-card class="collapse-container comm-pa-48">
          <comm-collapse-view class="collapse2">
            <comm-collapse-item title="Item1">[[m_text]]</comm-collapse-item>
            <comm-collapse-item title="Item2">[[m_text]]</comm-collapse-item>
            <comm-collapse-item title="Item3">[[m_text]]</comm-collapse-item>
          </comm-collapse-view>
        </paper-card>

        <paper-card class="collapse-container comm-pa-48">
          <comm-collapse-view class="collapse3">
            <comm-collapse-item title="Item1">[[m_text]]</comm-collapse-item>
            <comm-collapse-item title="Item2">[[m_text]]</comm-collapse-item>
            <comm-collapse-item title="Item3">[[m_text]]</comm-collapse-item>
          </comm-collapse-view>
        </paper-card>
      </div>
    `;
  }

  //----------------------------------------------------------------------
  //
  //  Variables
  //
  //----------------------------------------------------------------------

  m_text =
    'Lorem ipsum dolor sit amet, per in nusquam nominavi periculis, sit elit oportere ea, id minim maiestatis incorrupte duo. Dolorum verterem ad ius, his et nullam verterem. Eu alia debet usu, an doming tritani est. Vix ad ponderum petentium suavitate, eum eu tempor populo, graece sententiae constituam vim ex. Cu torquatos reprimique neglegentur nec, voluptua periculis has ut, at eos discere deleniti sensibus. Lorem ipsum dolor sit amet, per in nusquam nominavi periculis, sit elit oportere ea, id minim maiestatis incorrupte duo. Dolorum verterem ad ius, his et nullam verterem. Eu alia debet usu, an doming tritani est. Vix ad ponderum petentium suavitate, eum eu tempor populo, graece sententiae constituam vim ex. Cu torquatos reprimique neglegentur nec, voluptua periculis has ut, at eos discere deleniti sensibus.';
}
