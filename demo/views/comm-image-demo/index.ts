import '../../../lib/elements/comm-image';
import '../../../lib/styles/base-styles';
import '@polymer/paper-card/paper-card';
import { PolymerElement, html } from '@polymer/polymer/polymer-element';
import { customElement, property, query } from '@polymer/decorators';

@customElement('comm-image-demo')
class CommImageDemo extends PolymerElement {
  static get template() {
    return html`
      <style include="base-styles">
        comm-image {
          --comm-image-max-width: 400px;
        }

        .image-container {
          width: 80%;
          height: 600px;
        }
      </style>

      <div class="layout vertical center">
        <paper-card class="comm-mx-48 comm-mt-48 comm-pa-12 image-container">
          <comm-image align="center" src="https://dummyimage.com/600x400/000/fff"></comm-image>
        </paper-card>
      </div>
    `;
  }
}
