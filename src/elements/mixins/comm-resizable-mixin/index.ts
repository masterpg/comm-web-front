import { LitElement } from 'lit-element'
import { dom } from '@polymer/polymer/lib/legacy/polymer.dom.js'
import { Constructor } from '../../../base'

export interface CommResizableElement extends HTMLElement {
  notifyResize(): void
  assignParentResizable(parentResizable: CommResizableElement | null): void
  stopResizeNotificationsFor(target: CommResizableElement): void
  _interestedResizables: CommResizableElement[]
  _findParent(): void
  _subscribeIronResize(target: HTMLElement): void
}

/**
 * The implementation of this mixin is based on the following URL:
 * @see {@link https://github.com/PolymerElements/iron-resizable-behavior/blob/master/iron-resizable-behavior.js}
 */
export function CommResizableMixin(superclass: Constructor<LitElement>): Constructor<CommResizableElement> {
  // Contains all connected resizables that do not have a parent.
  const ORPHANS = new Set<CommResizableElement>()

  return class extends superclass implements CommResizableElement {
    constructor(...args: any[]) {
      super(args)

      this.addEventListener('comm-request-resize-notifications', this._onIronRequestResizeNotifications)
      this._boundNotifyResize = this.notifyResize.bind(this)
      this._boundOnDescendantIronResize = this._onDescendantIronResize.bind(this)
    }

    isAttached: boolean = false

    _notifyingDescendant: boolean = false

    _interestedResizables: CommResizableElement[] = []

    _boundNotifyResize: (event) => void

    _boundOnDescendantIronResize: (event) => void

    __parentResizable: CommResizableElement | null = null

    get _parentResizable(): CommResizableElement | null {
      return this.__parentResizable
    }

    set _parentResizable(value: CommResizableElement | null) {
      if (this.__parentResizable === value) return
      this.__parentResizable = value
      this._parentResizableChanged(this.__parentResizable)
    }

    connectedCallback() {
      super.connectedCallback()
      this.isAttached = true
      this._requestResizeNotifications()
    }

    disconnectedCallback() {
      super.disconnectedCallback()
      this.isAttached = false

      if (this._parentResizable) {
        this._parentResizable.stopResizeNotificationsFor(this)
      } else {
        ORPHANS.delete(this)
        window.removeEventListener('resize', this._boundNotifyResize)
      }

      this._parentResizable = null
    }

    /**
     * Can be called to manually notify a resizable and its descendant
     * resizables of a resize change.
     */
    notifyResize(): void {
      if (!this.isAttached) {
        return
      }

      this._interestedResizables.forEach((resizable) => {
        if (this.resizerShouldNotify(resizable)) {
          this._notifyDescendant(resizable)
        }
      })

      this._fireResize()
    }

    /**
     * Used to assign the closest resizable ancestor to this resizable
     * if the ancestor detects a request for notifications.
     */
    assignParentResizable(parentResizable: CommResizableElement | null): void {
      if (this._parentResizable) {
        this._parentResizable.stopResizeNotificationsFor(this)
      }

      this._parentResizable = parentResizable

      if (parentResizable && parentResizable._interestedResizables.indexOf(this) === -1) {
        parentResizable._interestedResizables.push(this)
        parentResizable._subscribeIronResize(this)
      }
    }

    /**
     * Used to remove a resizable descendant from the list of descendants
     * that should be notified of a resize change.
     */
    stopResizeNotificationsFor(target: CommResizableElement): void {
      const index = this._interestedResizables.indexOf(target)

      if (index > -1) {
        this._interestedResizables.splice(index, 1)
        this._unsubscribeIronResize(target)
      }
    }

    /**
     * Subscribe this element to listen to comm-resize events on the given target.
     *
     * Preferred over target.listen because the property renamer does not
     * understand to rename when the target is not specifically "this"
     *
     * @param {!HTMLElement} target Element to listen to for comm-resize events.
     */
    _subscribeIronResize(target: HTMLElement): void {
      target.addEventListener('comm-resize', this._boundOnDescendantIronResize)
    }

    /**
     * Unsubscribe this element from listening to to comm-resize events on the
     * given target.
     *
     * Preferred over target.unlisten because the property renamer does not
     * understand to rename when the target is not specifically "this"
     *
     * @param {!HTMLElement} target Element to listen to for comm-resize events.
     */
    _unsubscribeIronResize(target: HTMLElement): void {
      target.removeEventListener('comm-resize', this._boundOnDescendantIronResize)
    }

    /**
     * This method can be overridden to filter nested elements that should or
     * should not be notified by the current element. Return true if an element
     * should be notified, or false if it should not be notified.
     *
     * @param {HTMLElement} element A candidate descendant element that
     * implements `IronResizableBehavior`.
     * @return {boolean} True if the `element` should be notified of resize.
     */
    resizerShouldNotify(element: HTMLElement): boolean {
      return true
    }

    _onDescendantIronResize(event): void {
      if (this._notifyingDescendant) {
        event.stopPropagation()
        return
      }

      // no need to use this during shadow dom because of event retargeting
      const useShadow = !(window as any).ShadyDOM
      if (!useShadow) {
        this._fireResize()
      }
    }

    _fireResize(): void {
      this.dispatchEvent(new CustomEvent('comm-resize', { detail: {}, bubbles: false, composed: true }))
    }

    _onIronRequestResizeNotifications(event): void {
      const target = (dom(event) as any).rootTarget as CommResizableElement
      if (target === this) {
        return
      }

      target.assignParentResizable(this)
      this._notifyDescendant(target)

      event.stopPropagation()
    }

    _parentResizableChanged(parentResizable: CommResizableElement | null): void {
      if (parentResizable) {
        window.removeEventListener('resize', this._boundNotifyResize)
      }
    }

    _notifyDescendant(descendant: CommResizableElement): void {
      // NOTE(cdata): In IE10, attached is fired on children first, so it's
      // important not to notify them if the parent is not attached yet (or
      // else they will get redundantly notified when the parent attaches).
      if (!this.isAttached) {
        return
      }

      this._notifyingDescendant = true
      descendant.notifyResize()
      this._notifyingDescendant = false
    }

    _requestResizeNotifications(): void {
      if (!this.isAttached) {
        return
      }

      if (document.readyState === 'loading') {
        const _requestResizeNotifications = this._requestResizeNotifications.bind(this)
        document.addEventListener('readystatechange', function readystatechanged() {
          document.removeEventListener('readystatechange', readystatechanged)
          _requestResizeNotifications()
        })
      } else {
        this._findParent()

        if (!this._parentResizable) {
          // If this resizable is an orphan, tell other orphans to try to find
          // their parent again, in case it's this resizable.
          ORPHANS.forEach((orphan) => {
            if (orphan !== this) {
              orphan._findParent()
            }
          })

          window.addEventListener('resize', this._boundNotifyResize)
          this.notifyResize()
        } else {
          // If this resizable has a parent, tell other child resizables of
          // that parent to try finding their parent again, in case it's this
          // resizable.
          this._parentResizable._interestedResizables.forEach((resizable) => {
            if (resizable !== this) {
              resizable._findParent()
            }
          })
        }
      }
    }

    _findParent(): void {
      this.assignParentResizable(null)
      this.dispatchEvent(
        new CustomEvent('comm-request-resize-notifications', {
          detail: {},
          bubbles: true,
          cancelable: true,
          composed: true,
        }),
      )

      if (!this._parentResizable) {
        ORPHANS.add(this)
      } else {
        ORPHANS.delete(this)
      }
    }
  }
}
