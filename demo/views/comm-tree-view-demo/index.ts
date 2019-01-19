import '@polymer/paper-card/paper-card';
import '@polymer/paper-checkbox/paper-checkbox';
import { PaperCheckboxElement } from '@polymer/paper-checkbox/paper-checkbox';
import { dom } from '@polymer/polymer/lib/legacy/polymer.dom.js';
import { html, query } from 'lit-element';

import '../../../lib/elements/comm-tree-view';
import { CommTreeItem, CommTreeView } from '../../../lib/elements/comm-tree-view';
import { CommBaseElement } from '../../../lib/elements/comm-base-element';
import { baseStyles } from '../../../lib/styles/polymer/base-styles';

class CommTreeViewDemo extends CommBaseElement {
  render() {
    return html`
      <style>
        ${baseStyles}

        .main-container {
          padding: 48px;
        }

        .tree-container {
          width: 100%;
          padding: 12px;
          /*--comm-tree-node-distance: 0px;*/
          /*--comm-tree-node-indent: 30px;*/
          --comm-tree-item: {
            @apply (--comm-font-code1);
          }
        }

        *.tree-container:not(:first-child) {
          margin-top: 48px;
        }
      </style>

      <div class="layout vertical center main-container">
        <paper-card class="tree-container">
          <comm-tree-view id="regularTree" on-item-selected="m_treeNodeOnItemSelected">
            <comm-tree-node slot="child">
              <comm-tree-item slot="item">Item 1</comm-tree-item>
              <comm-tree-node slot="child" opened>
                <comm-tree-item slot="item">Item 1-1</comm-tree-item>
                <comm-tree-node slot="child">
                  <custom-tree-item slot="item">Item 1-1-1</custom-tree-item>
                </comm-tree-node>
                <comm-tree-node slot="child">
                  <custom-tree-item slot="item">Item 1-1-2</custom-tree-item>
                </comm-tree-node>
              </comm-tree-node>
              <comm-tree-node slot="child">
                <comm-tree-item slot="item" unselectable>Item 1-2</comm-tree-item>
                <comm-tree-node slot="child">
                  <comm-tree-item slot="item">Item 1-2-1</comm-tree-item>
                </comm-tree-node>
                <comm-tree-node slot="child">
                  <comm-tree-item slot="item">Item 1-2-2</comm-tree-item>
                </comm-tree-node>
              </comm-tree-node>
            </comm-tree-node>
          </comm-tree-view>
        </paper-card>

        <paper-card class="tree-container">
          <comm-tree-view
            id="customTree"
            @item-selected="${this.m_treeNodeOnItemSelected}"
            @item-checkbox-changed="${this.m_treeNodeOnItemCheckboxChanged}"
          ></comm-tree-view>
        </paper-card>
      </div>
    `;
  }

  //----------------------------------------------------------------------
  //
  //  Variables
  //
  //----------------------------------------------------------------------

  //--------------------------------------------------
  //  Elements
  //--------------------------------------------------

  @query('#regularTree')
  m_regularView!: CommTreeView;

  @query('#customTree')
  m_customTree!: CommTreeView;

  //----------------------------------------------------------------------
  //
  //  Lifecycle hooks
  //
  //----------------------------------------------------------------------

  connectedCallback() {
    super.connectedCallback();

    setTimeout(() => {
      this.m_customTree.buildTree(
        [
          {
            itemHTML: 'Item 1',
            selectedValue: 'item-1',
            children: [
              {
                itemHTML: 'Item 1-1',
                selectedValue: 'item-1-1',
                opened: true,
                children: [
                  { itemHTML: 'Item 1-1-1', selectedValue: 'item-1-1-1', itemClass: 'CustomTreeItem' },
                  { itemHTML: 'Item 1-1-2', selectedValue: 'item-1-1-2', itemClass: 'CustomTreeItem' },
                ],
              },
              {
                itemHTML: 'Item 1-2',
                selectedValue: 'item-1-2',
                unselectable: true,
                children: [
                  { itemHTML: 'Item 1-2-1', selectedValue: 'item-1-2-1' },
                  { itemHTML: 'Item 1-2-2', selectedValue: 'item-1-2-2' },
                ],
              },
            ],
          },
        ],
        { itemClasses: { CustomTreeItem }, itemEvents: ['item-checkbox-changed'] },
      );
    });
  }

  //----------------------------------------------------------------------
  //
  //  Event handlers
  //
  //----------------------------------------------------------------------

  m_treeNodeOnToggleNode(e) {}

  m_treeNodeOnItemSelected(e) {
    // tslint:disable-next-line
    console.log(e);
  }

  m_treeNodeOnItemCheckboxChanged(e) {
    // tslint:disable-next-line
    console.log(e);
  }
}
customElements.define('comm-tree-view-demo', CommTreeViewDemo);

class CustomTreeItem extends CommTreeItem {
  //----------------------------------------------------------------------
  //
  //  Variables
  //
  //----------------------------------------------------------------------

  f_extraStyle = html`
    :host { --paper-checkbox-checked-color: var(--comm-pink-500); }
  `;

  f_itemTemplate = html`
    <paper-checkbox id="checkbox"></paper-checkbox><slot></slot>
  `;

  //--------------------------------------------------
  //  Elements
  //--------------------------------------------------

  @query('#checkbox')
  m_checkbox!: PaperCheckboxElement;

  //----------------------------------------------------------------------
  //
  //  Event handlers
  //
  //----------------------------------------------------------------------

  f_itemOnClick(e) {
    const target = (dom(e) as any).localTarget;

    // チェックボックスがクリックされた場合
    if (target === this.m_checkbox) {
      this.selected = Boolean(this.m_checkbox.checked);
    }
    // チェックボックス以外がタップされた場合
    else {
      const checked = Boolean(!this.m_checkbox.checked);
      this.m_checkbox.checked = checked;
      this.selected = checked;
    }

    this.dispatchEvent(new CustomEvent('item-checkbox-changed', { bubbles: true, composed: true }));
  }
}
customElements.define('custom-tree-item', CustomTreeItem);
