"use strict";
//
// このミックスインの実装は下記URLを参考にしている:
// http://justinfagnani.com/2015/12/21/real-mixins-with-javascript-classes/
//
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
function mix(superclass) {
    return new MixinBuilder(superclass);
}
exports.mix = mix;
var MixinBuilder = /** @class */ (function () {
    function MixinBuilder(superclass) {
        this.superclass = superclass;
    }
    MixinBuilder.prototype.with = function () {
        var mixins = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            mixins[_i] = arguments[_i];
        }
        return mixins.reduce(function (c, mixin) { return mixin(c); }, this.superclass);
    };
    return MixinBuilder;
}());
exports.MixinBuilder = MixinBuilder;
//----------------------------------------------------------------------
//
//  Examples
//
//----------------------------------------------------------------------
var BaseClass = /** @class */ (function () {
    function BaseClass() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
    }
    BaseClass.prototype.boo = function () {
        // console.log('boo from BaseClass');
    };
    return BaseClass;
}());
function ExtraMixin(superclass) {
    return /** @class */ (function (_super) {
        __extends(class_1, _super);
        function class_1() {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            return _super.call(this, args) || this;
        }
        class_1.prototype.boo = function () {
            _super.prototype.boo.call(this);
            // console.log('boo from ExtraMixin');
        };
        class_1.prototype.foo = function () {
            // console.log('foo from ExtraMixin');
        };
        return class_1;
    }(superclass));
}
exports.ExtraMixin = ExtraMixin;
var ExtraClass = /** @class */ (function (_super) {
    __extends(ExtraClass, _super);
    function ExtraClass() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var _this = _super.call(this, args) || this;
        _this.boo();
        _this.foo();
        return _this;
    }
    return ExtraClass;
}(mix(BaseClass).with(ExtraMixin)));
var extraClass = new ExtraClass();
