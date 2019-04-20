import '@polymer/paper-card/paper-card'
import '@polymer/paper-checkbox/paper-checkbox'
import {PaperCheckboxElement} from '@polymer/paper-checkbox/paper-checkbox'
import {dom} from '@polymer/polymer/lib/legacy/polymer.dom.js'
import {css, customElement, html, query} from 'lit-element'

import '../../../../lib/elements/comm-tree-view'
import {CommTreeNodeItem, CommTreeView} from '../../../../lib/elements/comm-tree-view'
import {CommBaseElement, CommCSSStyle} from '../../../../lib/elements/comm-base-element'

@customElement('comm-tree-view-page')
class CommTreeViewPage extends CommBaseElement {
  static get styles() {
    const commFontCode1 = CommCSSStyle.getClass('.comm-font-code1')
    return css`
      ${CommCSSStyle.styles}

      .main-container {
        padding: 48px;
      }

      .tree-container {
        width: 100%;
        padding: 12px;
        --comm-tree-node-item-font-size: ${commFontCode1.properties['font-size']};
        --comm-tree-node-item-font-weight: ${commFontCode1.properties['font-weight']};
        --comm-tree-node-item-line-height: ${commFontCode1.properties['line-height']};
        /*--comm-tree-node-distance: 0px;*/
        /*--comm-tree-node-indent: 30px;*/
      }

      ${CommCSSStyle.extendClass('.tree-container', '.comm-font-code1')}

      *.tree-container:not(:first-child) {
        margin-top: 48px;
      }
    `
  }

  protected render() {
    return html`
      <div class="layout vertical center main-container">
        <paper-card class="tree-container">
          <comm-tree-view id="regularTree"
            @item-selected="${this.m_treeNodeOnItemSelected}"
            @item-checkbox-changed="${this.m_treeNodeOnItemCheckboxChanged}"
          >
            <comm-tree-node slot="child">
              <comm-tree-node-item slot="item" value="item1-1">Item 1</comm-tree-node-item>
              <comm-tree-node slot="child" opened>
                <comm-tree-node-item slot="item">Item 1-1</comm-tree-node-item>
                <comm-tree-node slot="child"><custom-tree-node-item slot="item" value="item1-1-1">Item 1-1-1</custom-tree-node-item></comm-tree-node>
                <comm-tree-node slot="child"><custom-tree-node-item slot="item" value="item1-1-2">Item 1-1-2</custom-tree-node-item></comm-tree-node>
              </comm-tree-node>
              <comm-tree-node slot="child">
                <comm-tree-node-item slot="item" unselectable>Item 1-2</comm-tree-node-item>
                <comm-tree-node slot="child"><comm-tree-node-item slot="item" value=""item1-2-1">Item 1-2-1</comm-tree-node-item></comm-tree-node>
                <comm-tree-node slot="child"><comm-tree-node-item slot="item" value=""item1-2-2">Item 1-2-2</comm-tree-node-item></comm-tree-node>
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
    `
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
  private m_regularView!: CommTreeView

  @query('#customTree')
  private m_customTree!: CommTreeView

  //----------------------------------------------------------------------
  //
  //  Lifecycle hooks
  //
  //----------------------------------------------------------------------

  connectedCallback() {
    super.connectedCallback()

    setTimeout(() => {
      this.m_customTree.buildTree(
        [
          {
            content: 'Item 1',
            value: 'item-1',
            children: [
              {
                content: 'Item 1-1',
                value: 'item-1-1',
                opened: true,
                children: [
                  {content: 'Item 1-1-1', value: 'item-1-1-1', itemClass: CustomTreeNodeItem},
                  {content: 'Item 1-1-2', value: 'item-1-1-2', itemClass: CustomTreeNodeItem},
                ],
              },
              {
                content: 'Item 1-2',
                value: 'item-1-2',
                unselectable: true,
                children: [{content: 'Item 1-2-1', value: 'item-1-2-1'}, {content: 'Item 1-2-2', value: 'item-1-2-2'}],
              },
            ],
          },
        ],
        {itemEvents: ['item-checkbox-changed']}
      )
    })
  }

  //----------------------------------------------------------------------
  //
  //  Event handlers
  //
  //----------------------------------------------------------------------

  private m_treeNodeOnToggleNode(e) {}

  private m_treeNodeOnItemSelected(e) {
    // tslint:disable-next-line
    console.log(e)
  }

  private m_treeNodeOnItemCheckboxChanged(e) {
    // tslint:disable-next-line
    console.log(e)
  }
}

@customElement('custom-tree-node-item')
class CustomTreeNodeItem extends CommTreeNodeItem {
  static get styles() {
    return css`
      ${CommTreeNodeItem.styles}

      :host {
        --paper-checkbox-checked-color: var(--comm-pink-500);
      }
    `
  }

  //----------------------------------------------------------------------
  //
  //  Variables
  //
  //----------------------------------------------------------------------

  protected readonly itemTemplate = html`
    <paper-checkbox id="checkbox"></paper-checkbox><slot></slot>
  `

  //--------------------------------------------------
  //  Elements
  //--------------------------------------------------

  @query('#checkbox')
  private m_checkbox!: PaperCheckboxElement

  //----------------------------------------------------------------------
  //
  //  Event handlers
  //
  //----------------------------------------------------------------------

  protected itemOnClick(e) {
    const target = (dom(e) as any).localTarget

    // チェックボックスがクリックされた場合
    if (target === this.m_checkbox) {
      this.selected = Boolean(this.m_checkbox.checked)
    }
    // チェックボックス以外がタップされた場合
    else {
      const checked = Boolean(!this.m_checkbox.checked)
      this.m_checkbox.checked = checked
      this.selected = checked
    }

    this.dispatchEvent(new CustomEvent('item-checkbox-changed', {bubbles: true, composed: true}))
  }
}
