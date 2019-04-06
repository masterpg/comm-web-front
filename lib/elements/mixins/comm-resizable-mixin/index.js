"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var polymer_dom_js_1 = require("@polymer/polymer/lib/legacy/polymer.dom.js");
/**
 * The implementation of this mixin is based on the following URL:
 * @see {@link https://github.com/PolymerElements/iron-resizable-behavior/blob/master/iron-resizable-behavior.js}
 */
function CommResizableMixin(superclass) {
    // Contains all connected resizables that do not have a parent.
    var ORPHANS = new Set();
    return /** @class */ (function (_super) {
        __extends(class_1, _super);
        function class_1() {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            var _this = _super.call(this, args) || this;
            _this.isAttached = false;
            _this._notifyingDescendant = false;
            _this._interestedResizables = [];
            _this.__parentResizable = null;
            _this.addEventListener('comm-request-resize-notifications', _this._onIronRequestResizeNotifications);
            _this._boundNotifyResize = _this.notifyResize.bind(_this);
            _this._boundOnDescendantIronResize = _this._onDescendantIronResize.bind(_this);
            return _this;
        }
        Object.defineProperty(class_1.prototype, "_parentResizable", {
            get: function () {
                return this.__parentResizable;
            },
            set: function (value) {
                if (this.__parentResizable === value)
                    return;
                this.__parentResizable = value;
                this._parentResizableChanged(this.__parentResizable);
            },
            enumerable: true,
            configurable: true
        });
        class_1.prototype.connectedCallback = function () {
            _super.prototype.connectedCallback.call(this);
            this.isAttached = true;
            this._requestResizeNotifications();
        };
        class_1.prototype.disconnectedCallback = function () {
            _super.prototype.disconnectedCallback.call(this);
            this.isAttached = false;
            if (this._parentResizable) {
                this._parentResizable.stopResizeNotificationsFor(this);
            }
            else {
                ORPHANS.delete(this);
                window.removeEventListener('resize', this._boundNotifyResize);
            }
            this._parentResizable = null;
        };
        /**
         * Can be called to manually notify a resizable and its descendant
         * resizables of a resize change.
         */
        class_1.prototype.notifyResize = function () {
            var _this = this;
            if (!this.isAttached) {
                return;
            }
            this._interestedResizables.forEach(function (resizable) {
                if (_this.resizerShouldNotify(resizable)) {
                    _this._notifyDescendant(resizable);
                }
            });
            this._fireResize();
        };
        /**
         * Used to assign the closest resizable ancestor to this resizable
         * if the ancestor detects a request for notifications.
         */
        class_1.prototype.assignParentResizable = function (parentResizable) {
            if (this._parentResizable) {
                this._parentResizable.stopResizeNotificationsFor(this);
            }
            this._parentResizable = parentResizable;
            if (parentResizable && parentResizable._interestedResizables.indexOf(this) === -1) {
                parentResizable._interestedResizables.push(this);
                parentResizable._subscribeIronResize(this);
            }
        };
        /**
         * Used to remove a resizable descendant from the list of descendants
         * that should be notified of a resize change.
         */
        class_1.prototype.stopResizeNotificationsFor = function (target) {
            var index = this._interestedResizables.indexOf(target);
            if (index > -1) {
                this._interestedResizables.splice(index, 1);
                this._unsubscribeIronResize(target);
            }
        };
        /**
         * Subscribe this element to listen to comm-resize events on the given target.
         *
         * Preferred over target.listen because the property renamer does not
         * understand to rename when the target is not specifically "this"
         *
         * @param {!HTMLElement} target Element to listen to for comm-resize events.
         */
        class_1.prototype._subscribeIronResize = function (target) {
            target.addEventListener('comm-resize', this._boundOnDescendantIronResize);
        };
        /**
         * Unsubscribe this element from listening to to comm-resize events on the
         * given target.
         *
         * Preferred over target.unlisten because the property renamer does not
         * understand to rename when the target is not specifically "this"
         *
         * @param {!HTMLElement} target Element to listen to for comm-resize events.
         */
        class_1.prototype._unsubscribeIronResize = function (target) {
            target.removeEventListener('comm-resize', this._boundOnDescendantIronResize);
        };
        /**
         * This method can be overridden to filter nested elements that should or
         * should not be notified by the current element. Return true if an element
         * should be notified, or false if it should not be notified.
         *
         * @param {HTMLElement} element A candidate descendant element that
         * implements `IronResizableBehavior`.
         * @return {boolean} True if the `element` should be notified of resize.
         */
        class_1.prototype.resizerShouldNotify = function (element) {
            return true;
        };
        class_1.prototype._onDescendantIronResize = function (event) {
            if (this._notifyingDescendant) {
                event.stopPropagation();
                return;
            }
            // no need to use this during shadow dom because of event retargeting
            var useShadow = !window.ShadyDOM;
            if (!useShadow) {
                this._fireResize();
            }
        };
        class_1.prototype._fireResize = function () {
            this.dispatchEvent(new CustomEvent('comm-resize', { detail: {}, bubbles: false, composed: true }));
        };
        class_1.prototype._onIronRequestResizeNotifications = function (event) {
            var target = polymer_dom_js_1.dom(event).rootTarget;
            if (target === this) {
                return;
            }
            target.assignParentResizable(this);
            this._notifyDescendant(target);
            event.stopPropagation();
        };
        class_1.prototype._parentResizableChanged = function (parentResizable) {
            if (parentResizable) {
                window.removeEventListener('resize', this._boundNotifyResize);
            }
        };
        class_1.prototype._notifyDescendant = function (descendant) {
            // NOTE(cdata): In IE10, attached is fired on children first, so it's
            // important not to notify them if the parent is not attached yet (or
            // else they will get redundantly notified when the parent attaches).
            if (!this.isAttached) {
                return;
            }
            this._notifyingDescendant = true;
            descendant.notifyResize();
            this._notifyingDescendant = false;
        };
        class_1.prototype._requestResizeNotifications = function () {
            var _this = this;
            if (!this.isAttached) {
                return;
            }
            if (document.readyState === 'loading') {
                var _requestResizeNotifications_1 = this._requestResizeNotifications.bind(this);
                document.addEventListener('readystatechange', function readystatechanged() {
                    document.removeEventListener('readystatechange', readystatechanged);
                    _requestResizeNotifications_1();
                });
            }
            else {
                this._findParent();
                if (!this._parentResizable) {
                    // If this resizable is an orphan, tell other orphans to try to find
                    // their parent again, in case it's this resizable.
                    ORPHANS.forEach(function (orphan) {
                        if (orphan !== _this) {
                            orphan._findParent();
                        }
                    });
                    window.addEventListener('resize', this._boundNotifyResize);
                    this.notifyResize();
                }
                else {
                    // If this resizable has a parent, tell other child resizables of
                    // that parent to try finding their parent again, in case it's this
                    // resizable.
                    this._parentResizable._interestedResizables.forEach(function (resizable) {
                        if (resizable !== _this) {
                            resizable._findParent();
                        }
                    });
                }
            }
        };
        class_1.prototype._findParent = function () {
            this.assignParentResizable(null);
            this.dispatchEvent(new CustomEvent('comm-request-resize-notifications', {
                detail: {},
                bubbles: true,
                cancelable: true,
                composed: true,
            }));
            if (!this._parentResizable) {
                ORPHANS.add(this);
            }
            else {
                ORPHANS.delete(this);
            }
        };
        return class_1;
    }(superclass));
}
exports.CommResizableMixin = CommResizableMixin;
