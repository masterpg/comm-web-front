import '../../../lib/elements/comm-image';
import '../../../lib/styles/base-styles';
import '@polymer/paper-card/paper-card';
import '@polymer/paper-button/paper-button';
import { PolymerElement, html } from '@polymer/polymer/polymer-element';
import { customElement, property, query } from '@polymer/decorators';
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
        <div class="comm-mb-20 settings-container">
          <paper-button on-click="m_reloadButtonOnClick">Reload</paper-button>
        </div>
        <div class="image-container">
          <comm-image id="commImage" align="center" src="https://dummyimage.com/300x200/000/fff"></comm-image>
        </div>
      </div>
    `;
  }

  @query('#commImage')
  m_commImage!: CommImage;

  m_reloadButtonOnClick() {
    this.m_commImage.src = '';
    this.m_commImage.src = 'https://dummyimage.com/300x200/000/fff';
  }
}
