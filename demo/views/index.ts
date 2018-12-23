import '../../lib/elements/comm-tree-view';
import '../../lib/styles/base-styles';
import './comm-image-demo';
import './comm-tree-view-demo';
import '@polymer/app-layout/app-drawer-layout/app-drawer-layout';
import '@polymer/app-layout/app-drawer/app-drawer';
import '@polymer/app-layout/app-header-layout/app-header-layout';
import '@polymer/app-layout/app-header/app-header';
import '@polymer/app-layout/app-toolbar/app-toolbar';
import '@polymer/iron-pages/iron-pages';
import { CommTreeItem, CommTreeView } from '../../lib/elements/comm-tree-view';
import { PolymerElement, html } from '@polymer/polymer/polymer-element';
import { customElement, property, query } from '@polymer/decorators';

@customElement('app-view')
class AppView extends PolymerElement {
  static get template() {
    return html`
      <style include="base-styles">
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

        .link {
          @apply(--comm-pseudo-link);
        }
        .link:hover {
          @apply(--comm-pseudo-link-hover);
        }
      </style>

      <app-drawer-layout responsive-width="960px">
        <app-drawer ref="drawer" slot="drawer" :swipe-open="m_narrow">
          <app-toolbar class="drawer-toolbar">
            <div main-title class="comm-ml-8">DEMO</div>
          </app-toolbar>
          <div class="tree-view-wrapper">
            <comm-tree-view id="treeView" on-item-selected="m_treeNodeOnItemSelected"></comm-tree-view>
          </div>
        </app-drawer>
        <iron-pages selected="[[m_pageName]]" attr-for-selected="page-name" fallback-selection="fallback">
          <comm-tree-view-demo page-name="comm-tree-view-demo"></comm-tree-view-demo>
          <comm-image-demo page-name="comm-image-demo"></comm-image-demo>
          <!--<div page-name="comm-tree-view-demo">Page 0</div>-->
          <div page-name="">Page 1</div>
          <div page-name="">Page 2</div>
          <div page-name="">Page 3</div>
          <div page-name="fallback">
            Change pages by typing 'page-1', 'page-2', or 'page-3' in the input above.
          </div>
        </iron-pages>
      </app-drawer-layout>
    `;
  }

  //----------------------------------------------------------------------
  //
  //  Variables
  //
  //----------------------------------------------------------------------

  m_pageName: string = '';

  //--------------------------------------------------
  //  Elements
  //--------------------------------------------------

  @query('#treeView')
  m_treeView!: CommTreeView;

  //----------------------------------------------------------------------
  //
  //  Lifecycle hooks
  //
  //----------------------------------------------------------------------

  ready() {
    super.ready();

    this.m_treeView.buildTree([
      {
        itemHTML: 'comm-tree-view',
        selectedValue: 'comm-tree-view-demo',
      },
      {
        itemHTML: 'comm-image',
        selectedValue: 'comm-image-demo',
      },
    ]);
  }

  //----------------------------------------------------------------------
  //
  //  Event handlers
  //
  //----------------------------------------------------------------------

  m_treeNodeOnToggleNode(e) {}

  m_treeNodeOnItemSelected(e) {
    const item = e.detail.item as CommTreeItem;
    this.m_pageName = item.selectedValue;
  }
}
