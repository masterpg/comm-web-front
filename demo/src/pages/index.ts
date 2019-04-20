import '@polymer/app-layout/app-drawer-layout/app-drawer-layout'
import '@polymer/app-layout/app-drawer/app-drawer'
import '@polymer/app-layout/app-header-layout/app-header-layout'
import '@polymer/app-layout/app-header/app-header'
import '@polymer/app-layout/app-toolbar/app-toolbar'
import '@polymer/iron-pages/iron-pages'
import {css, customElement, html, query, property} from 'lit-element'

import '../../../lib/elements/comm-tree-view'
import './comm-awesome-element-page'
import './comm-collapse-view-page'
import './comm-image-page'
import './comm-tree-view-page'
import {CommBaseElement, CommCSSStyle} from '../../../lib/elements/comm-base-element'
import {CommResizableMixin} from '../../../lib/elements/mixins/comm-resizable-mixin'
import {CommTreeNodeItem, CommTreeView} from '../../../lib/elements/comm-tree-view'
import {mix} from '../../../lib'

@customElement('app-view')
class AppView extends mix(CommBaseElement).with(CommResizableMixin) {
  static get styles() {
    return css`
      ${CommCSSStyle.styles}

      app-drawer-layout {
        --app-drawer-width: 256px;
      }
      app-drawer-layout:not([narrow]) [drawer-toggle] {
        display: none;
      }

      .tree-view-wrapper {
        padding: 8px 16px;
      }
    `
  }

  protected render() {
    return html`
      <style>
        app-drawer {
          --app-drawer-content-container: {
            background-color: var(--comm-grey-100);
          }
        }

        @media (min-width: 600px) {
          app-drawer {
            --app-drawer-content-container: {
              background-color: var(--comm-grey-100);
              border-right: 1px solid var(--comm-grey-300);
            }
          }
        }
      </style>

      <app-drawer-layout responsive-width="960px">
        <app-drawer ref="drawer" slot="drawer" :swipe-open="m_narrow">
          <app-toolbar class="drawer-toolbar"><div main-title class="comm-ml-8">DEMO</div></app-toolbar>
          <div class="tree-view-wrapper"><comm-tree-view id="treeView" @item-selected="${this.m_treeViewOnItemSelected}"></comm-tree-view></div>
        </app-drawer>
        <iron-pages selected="${this.m_pageName}" attr-for-selected="page-name" fallback-selection="fallback">
          <comm-awesome-element-page page-name="comm-awesome-element-page"></comm-awesome-element-page>
          <comm-tree-view-page page-name="comm-tree-view-page"></comm-tree-view-page>
          <comm-image-page page-name="comm-image-page"></comm-image-page>
          <comm-collapse-view-page page-name="comm-collapse-view-page"></comm-collapse-view-page>
          <div page-name="">Page 1</div>
          <div page-name="">Page 2</div>
          <div page-name="">Page 3</div>
          <div page-name="fallback">Change pages by typing 'page-1', 'page-2', or 'page-3' in the input above.</div>
        </iron-pages>
      </app-drawer-layout>
    `
  }

  //----------------------------------------------------------------------
  //
  //  Variables
  //
  //----------------------------------------------------------------------

  @property({type: String})
  private m_pageName: string = ''

  //--------------------------------------------------
  //  Elements
  //--------------------------------------------------

  @query('#treeView')
  private m_treeView!: CommTreeView

  //----------------------------------------------------------------------
  //
  //  Lifecycle hooks
  //
  //----------------------------------------------------------------------

  connectedCallback(): void {
    super.connectedCallback()

    setTimeout(() => {
      this.m_treeView.buildTree([
        {
          content: 'comm-awesome-element',
          value: 'comm-awesome-element-page',
        },
        {
          content: 'comm-tree-view',
          value: 'comm-tree-view-page',
        },
        {
          content: 'comm-image',
          value: 'comm-image-page',
        },
        {
          content: 'comm-collapse-view',
          value: 'comm-collapse-view-page',
        },
      ])
    })
  }

  //----------------------------------------------------------------------
  //
  //  Event handlers
  //
  //----------------------------------------------------------------------

  private m_treeNodeOnToggleNode(e) {}

  private m_treeViewOnItemSelected(e) {
    const item = e.detail.item as CommTreeNodeItem
    this.m_pageName = item.value!
    this.f_async(this.notifyResize)
  }
}
