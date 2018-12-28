import '@polymer/paper-card/paper-card';
import '@polymer/paper-button/paper-button';
import '@polymer/paper-radio-group/paper-radio-group';
import { PolymerElement, html } from '@polymer/polymer/polymer-element';
import { customElement, property, query } from '@polymer/decorators';

import '../../../lib/elements/comm-image';
import '../../../lib/styles/base-styles';
import { CommImage } from '../../../lib/elements/comm-image';

@customElement('comm-image-demo')
class CommImageDemo extends PolymerElement {
  static get template() {
    return html`
      <style include="base-styles">
        .main-container {
          padding: 48px;
        }

        .settings-container {
        }

        .image-container {
          width: 500px;
          height: 500px;
          border: solid 1px var(--comm-grey-300);
        }

        comm-image {
          --comm-image-max-width: 400px;
        }
      </style>

      <div class="layout vertical center main-container">
        <div class="layout vertical center-center comm-mb-20 settings-container">
          <div class="layout horizontal center">
            <label>h-align:</label>
            <paper-radio-group selected="{{m_hAlignSelected}}">
              <paper-radio-button name="start">start</paper-radio-button>
              <paper-radio-button name="center">center</paper-radio-button>
              <paper-radio-button name="end">end</paper-radio-button>
            </paper-radio-group>
          </div>
          <div class="layout horizontal center">
            <label>v-align:</label>
            <paper-radio-group selected="{{m_vAlignSelected}}">
              <paper-radio-button name="start">start</paper-radio-button>
              <paper-radio-button name="center">center</paper-radio-button>
              <paper-radio-button name="end">end</paper-radio-button>
            </paper-radio-group>
          </div>
          <paper-button on-click="m_reloadButtonOnClick">Reload</paper-button>
        </div>
        <div class="image-container">
          <comm-image id="commImage" h-align="[[m_hAlignSelected]]" v-align="[[m_vAlignSelected]]" src="https://dummyimage.com/300x200/000/fff"></comm-image>
        </div>
      </div>
    `;
  }

  @query('#commImage')
  m_commImage!: CommImage;

  m_hAlignSelected: string = 'center';

  m_vAlignSelected: string = 'center';

  m_reloadButtonOnClick() {
    this.m_commImage.src = '';
    this.m_commImage.src = 'https://dummyimage.com/300x200/000/fff';
  }
}
