import '../../lib/elements/comm-awesome-element';
import '../../lib/elements/comm-image';
import '../../lib/styles/base-styles';
import { PolymerElement, html } from '@polymer/polymer/polymer-element';
import { customElement, property, query } from '@polymer/decorators';

@customElement('app-view')
class AppView extends PolymerElement {
  static get template() {
    return html`
      <style include="base-styles">
        .link {
          @apply(--comm-pseudo-link);
        }
        .link:hover {
          @apply(--comm-pseudo-link-hover);
        }
        comm-image {
          --comm-image-max-width: 400px;
        }
      </style>

      <div class="layout horizontal link comm-ma-10">
        <div>Hello</div>
        <div class="comm-ml-4">World!</div>
      </div>
      <comm-awesome-element color="red"></comm-awesome-element>
      <comm-image align="center" src="https://dummyimage.com/600x400/000/fff"></comm-image>
    `;
  }
}
