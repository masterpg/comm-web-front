import '@polymer/app-layout/app-drawer-layout/app-drawer-layout'
import '@polymer/app-layout/app-drawer/app-drawer'
import '@polymer/app-layout/app-header-layout/app-header-layout'
import '@polymer/app-layout/app-header/app-header'
import '@polymer/app-layout/app-toolbar/app-toolbar'
import '@polymer/iron-pages/iron-pages'
import {html, query, property} from 'lit-element'

import '../../../lib/elements/comm-tree-view'
import './comm-awesome-element-demo'
import './comm-collapse-view-demo'
import './comm-image-demo'
import './comm-tree-view-demo'
import {CommBaseElement} from '../../../lib/elements/comm-base-element'
import {CommResizableMixin} from '../../../lib/elements/mixins/comm-resizable-mixin'
import {CommTreeItem, CommTreeView} from '../../../lib/elements/comm-tree-view'
import {baseStyles} from '../../../lib/styles/polymer/base-styles'
import {mix} from '../../../lib'

class AppView extends mix(CommBaseElement).with(CommResizableMixin) {
  render() {
    return html`
      <style>
        ${baseStyles}

        app-drawer-layout {
          --app-drawer-width: 256px;
        }
        app-drawer-layout:not([narrow]) [drawer-toggle] {
          display: none;
        }

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

        .tree-view-wrapper {
          padding: 8px 16px;
        }
      </style>

      <app-drawer-layout responsive-width="960px">
        <app-drawer ref="drawer" slot="drawer" :swipe-open="m_narrow">
          <app-toolbar class="drawer-toolbar"><div main-title class="comm-ml-8">DEMO</div></app-toolbar>
          <div class="tree-view-wrapper"><comm-tree-view id="treeView" @item-selected="${this.m_treeViewOnItemSelected}"></comm-tree-view></div>
        </app-drawer>
        <iron-pages selected="${this.m_pageName}" attr-for-selected="page-name" fallback-selection="fallback">
          <comm-awesome-element-demo page-name="comm-awesome-element-demo"></comm-awesome-element-demo>
          <comm-tree-view-demo page-name="comm-tree-view-demo"></comm-tree-view-demo>
          <comm-image-demo page-name="comm-image-demo"></comm-image-demo>
          <comm-collapse-view-demo page-name="comm-collapse-view-demo"></comm-collapse-view-demo>
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
  m_pageName: string = ''

  //--------------------------------------------------
  //  Elements
  //--------------------------------------------------

  @query('#treeView')
  m_treeView!: CommTreeView

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
          itemHTML: 'comm-awesome-element',
          selectedValue: 'comm-awesome-element-demo',
        },
        {
          itemHTML: 'comm-tree-view',
          selectedValue: 'comm-tree-view-demo',
        },
        {
          itemHTML: 'comm-image',
          selectedValue: 'comm-image-demo',
        },
        {
          itemHTML: 'comm-collapse-view',
          selectedValue: 'comm-collapse-view-demo',
        },
      ])
    })
  }

  //----------------------------------------------------------------------
  //
  //  Event handlers
  //
  //----------------------------------------------------------------------

  m_treeNodeOnToggleNode(e) {}

  m_treeViewOnItemSelected(e) {
    const item = e.detail.item as CommTreeItem
    this.m_pageName = item.selectedValue
    this.f_async(this.notifyResize)
  }
}
customElements.define('app-view', AppView)
