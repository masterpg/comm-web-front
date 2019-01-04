import '@polymer/iron-collapse/iron-collapse';
import '@polymer/iron-flex-layout/iron-flex-layout';
import '@polymer/iron-flex-layout/iron-flex-layout-classes';
import '@polymer/iron-icon/iron-icon';
import '@polymer/iron-icons/iron-icons';
import { GestureEventListeners } from '@polymer/polymer/lib/mixins/gesture-event-listeners';
import { PolymerElement, html } from '@polymer/polymer/polymer-element';
import { customElement, observe, property, query, listen } from '@polymer/decorators';

import '../../styles/polymer/base-styles';

@customElement('comm-collapse-item')
export class CommCollapseItem extends GestureEventListeners(PolymerElement) {
  static get template() {
    return html`
      <style include="base-styles">
        .container {
          border-bottom-style: var(--comm-collapse-divider-border-style, solid);
          border-bottom-color: var(--comm-collapse-divider-border-color, var(--comm-grey-300));
          border-bottom-width: var(--comm-collapse-divider-border-width, 1px);
        }
        .title-wrapper {
          @apply(--comm-font-common-base);
          font-size: var(--comm-collapse-title-font-size, 16px);
          color: var(--comm-collapse-title-color, var(--comm-grey-900));
          font-weight: var(--comm-collapse-title-font-weight, 500);
          line-height: var(--comm-collapse-title-line-height, normal);
          @apply(--comm-collapse-title);
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
        .toogle {
          padding-right: 16px;
          color: var(--comm-grey-500);
        }
        .content {
          padding-left: 16px;
          padding-right: 16px;
          text-align: left;
          color: var(--comm-grey-900);
          --iron-collapse-transition-duration: var(--comm-collapse-transition-duration, 300ms);
          @apply(--comm-font-body1);
        }
        .content > div {
          padding-bottom: 16px;
        }
      </style>
      <div class="container">
        <div class="layout horizontal center-center title-wrapper" on-tap="m_titleWrapperOnTap">
          <iron-icon id="icon" class="icon" src="[[src]]" icon="[[icon]]"></iron-icon>
          <div class="flex">[[title]]</div>
          <iron-icon class="toogle" icon="[[m_toggleIcon]]"></iron-icon>
        </div>
        <iron-collapse class="content" opened="{{opened}}">
          <div><slot></slot></div>
        </iron-collapse>
      </div>
    `;
  }

  //----------------------------------------------------------------------
  //
  //  Variables
  //
  //----------------------------------------------------------------------

  @property({ type: String, computed: 'm_computeToggleIcon(opened)' })
  m_toggleIcon: string = '';

  m_computeToggleIcon(opened: boolean) {
    return opened ? 'icons:expand-less' : 'icons:expand-more';
  }

  //--------------------------------------------------
  //  Elements
  //--------------------------------------------------

  @query('#icon')
  m_icon!: HTMLElement;

  //----------------------------------------------------------------------
  //
  //  Properties
  //
  //----------------------------------------------------------------------

  /**
   * タイトルです。
   */
  @property({ type: String })
  title: string = '';

  /**
   * アイコンです。
   * 例: "icons:info"
   */
  @property({ type: String })
  icon: string = '';

  /**
   * アイコンのURLです。
   * Polymerで用意されている以外のアイコンを使用したい場合は
   * iconプロパティではなくこのプロパティでアイコンのURLを指定してください。
   */
  @property({ type: String })
  src: string = '';

  /**
   * アイテムの開閉です。
   */
  @property({ type: Boolean })
  opened: boolean = false;

  //----------------------------------------------------------------------
  //
  //  Lifecycle callbacks
  //
  //----------------------------------------------------------------------

  constructor() {
    super();
  }

  ready() {
    super.ready();

    // アイコン指定がない場合
    if (!this.icon && !this.src) {
      this.m_icon.style.display = 'none';
    }
  }

  //----------------------------------------------------------------------
  //
  //  Internal methods
  //
  //----------------------------------------------------------------------

  m_titleWrapperOnTap(event) {
    this.opened = !this.opened;
    this.dispatchEvent(new CustomEvent('toggle-item'));
  }
}
