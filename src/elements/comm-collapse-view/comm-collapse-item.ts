import '@polymer/iron-collapse/iron-collapse'
import '@polymer/iron-icon/iron-icon'
import '@polymer/iron-icons/iron-icons'
import {LitElement, html, property, query, PropertyValues} from 'lit-element'

import {baseStyles} from '../../styles/polymer/base-styles'

export class CommCollapseItem extends LitElement {
  protected render() {
    return html`
      <style>
        ${baseStyles}

        .container {
          border-bottom-style: var(--comm-collapse-divider-border-style, solid);
          border-bottom-color: var(--comm-collapse-divider-border-color, var(--comm-grey-300));
          border-bottom-width: var(--comm-collapse-divider-border-width, 1px);
        }

        .header-wrapper {
          display: flex;
        }

        .header {
          @apply (--comm-font-common-base);
          font-size: var(--comm-collapse-title-font-size, 16px);
          color: var(--comm-collapse-title-color, var(--comm-grey-900));
          font-weight: var(--comm-collapse-title-font-weight, 500);
          line-height: var(--comm-collapse-title-line-height, normal);
          @apply (--comm-collapse-title);
          width: 100%;
          min-height: 48px;
          padding-left: 16px;
          text-align: left;
          cursor: pointer;
        }

        .icon {
          margin-right: 16px;
          --iron-icon-height: 24px;
          --iron-icon-width: 24px;
        }

        .title {
          @apply (--layout-flex);
        }

        .toggle {
          padding-right: 16px;
          color: var(--comm-grey-500);
        }

        .content {
          padding-left: 16px;
          padding-right: 16px;
          text-align: left;
          color: var(--comm-grey-900);
          --iron-collapse-transition-duration: var(--comm-collapse-transition-duration, 300ms);
          @apply (--comm-font-body1);
        }

        .content > .inner {
          padding-bottom: 16px;
        }
      </style>

      <div class="container">
        <!--
          IE11でflexboxとmin-heightの組み合わせが効かないのでラッパーで囲んでいる
          参照: https://bottoms-programming.com/archives/ie11-flexbox-align-items-center.html
        -->
        <div class="header-wrapper">
          <div class="layout horizontal center-center header" @click="${this.m_titleWrapperOnClick}">
            <iron-icon id="icon" class="icon" src="${this.src}" icon="${this.icon}"></iron-icon>
            <div class="title">${this.title}</div>
            <iron-icon class="toggle" icon="${this.m_toggleIcon}"></iron-icon>
          </div>
        </div>
        <iron-collapse class="content" ?opened="${this.opened}">
          <div class="inner"><slot></slot></div>
        </iron-collapse>
      </div>
    `
  }

  //----------------------------------------------------------------------
  //
  //  Variables
  //
  //----------------------------------------------------------------------

  @property({type: String})
  m_toggleIcon: string = ''

  //--------------------------------------------------
  //  Elements
  //--------------------------------------------------

  @query('#icon')
  m_icon!: HTMLElement

  //----------------------------------------------------------------------
  //
  //  Properties
  //
  //----------------------------------------------------------------------

  /**
   * タイトルです。
   */
  @property({type: String})
  title: string = ''

  /**
   * アイコンです。
   * 例: "icons:info"
   */
  @property({type: String})
  icon: string = ''

  /**
   * アイコンのURLです。
   * Polymerで用意されている以外のアイコンを使用したい場合は
   * iconプロパティではなくこのプロパティでアイコンのURLを指定してください。
   */
  @property({type: String})
  src: string = ''

  /**
   * アイテムの開閉です。
   */
  @property({type: Boolean})
  opened: boolean = false

  //----------------------------------------------------------------------
  //
  //  Lifecycle hooks
  //
  //----------------------------------------------------------------------

  constructor() {
    super()
  }

  protected updated(changedProperties: PropertyValues): void {
    changedProperties.forEach((oldValue, propName) => {
      switch (propName) {
        case 'opened':
          this.m_openedChanged(this.opened)
          break
        case 'icon':
        case 'src':
          this.m_displayIcon()
          break
      }
    })
  }

  attributeChangedCallback(name: string, old: string, value: string): void {
    super.attributeChangedCallback(name, old, value)
  }

  //----------------------------------------------------------------------
  //
  //  Internal methods
  //
  //----------------------------------------------------------------------

  m_openedChanged(opened: boolean): void {
    this.m_toggleIcon = opened ? 'icons:expand-less' : 'icons:expand-more'
  }

  m_displayIcon(): void {
    // アイコン指定がない場合
    if (!this.icon && !this.src) {
      this.m_icon.style.display = 'none'
    }
    // アイコンの指定がある場合
    else {
      this.m_icon.style.display = 'block'
    }
  }

  //----------------------------------------------------------------------
  //
  //  Event handlers
  //
  //----------------------------------------------------------------------

  m_titleWrapperOnClick(event) {
    this.opened = !this.opened
    this.dispatchEvent(new CustomEvent('toggle-item'))
  }
}
customElements.define('comm-collapse-item', CommCollapseItem)
