import '@polymer/paper-card/paper-card'
import '@polymer/paper-button/paper-button'
import '@polymer/paper-radio-group/paper-radio-group'
import {customElement, html, property, query} from 'lit-element'

import '../../../../lib/elements/comm-image'
import '../../../../lib/styles/polymer/base-styles'
import {CommBaseElement} from '../../../../lib/elements/comm-base-element'
import {CommImage} from '../../../../lib/elements/comm-image'
import {baseStyles} from '../../../../lib/styles/polymer/base-styles'

@customElement('comm-image-demo')
class CommImageDemo extends CommBaseElement {
  render() {
    return html`
      <style>
        ${baseStyles}
      </style>

      <style>
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
            <label>halign:</label>
            <paper-radio-group selected="${this.m_hAlignSelected}" @selected-changed="${this.m_hAlignGroupOnSelectedChanged}">
              <paper-radio-button name="start">start</paper-radio-button>
              <paper-radio-button name="center">center</paper-radio-button>
              <paper-radio-button name="end">end</paper-radio-button>
            </paper-radio-group>
          </div>
          <div class="layout horizontal center">
            <label>valign:</label>
            <paper-radio-group selected="${this.m_vAlignSelected}" @selected-changed="${this.m_vAlignGroupOnSelectedChanged}">
              <paper-radio-button name="start">start</paper-radio-button>
              <paper-radio-button name="center">center</paper-radio-button>
              <paper-radio-button name="end">end</paper-radio-button>
            </paper-radio-group>
          </div>
          <paper-button @click="${this.m_reloadButtonOnClick}">Reload</paper-button>
        </div>
        <div class="image-container">
          <comm-image
            id="commImage"
            halign="${this.m_hAlignSelected}"
            valign="${this.m_vAlignSelected}"
            src="https://dummyimage.com/300x200/000/fff"
            alt="Dummy Image"
          ></comm-image>
        </div>
      </div>
    `
  }

  @query('#commImage')
  m_commImage!: CommImage

  @property({type: String})
  m_hAlignSelected: string = 'center'

  @property({type: String})
  m_vAlignSelected: string = 'center'

  m_reloadButtonOnClick() {
    this.m_commImage.src = ''
    setTimeout(() => {
      this.m_commImage.src = 'https://dummyimage.com/300x200/000/fff'
    })
  }

  m_hAlignGroupOnSelectedChanged(e) {
    this.m_hAlignSelected = e.detail.value
  }

  m_vAlignGroupOnSelectedChanged(e) {
    this.m_vAlignSelected = e.detail.value
  }
}
