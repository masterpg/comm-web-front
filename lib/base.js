"use strict";
//
// このミックスインの実装は下記URLを参考にしている:
// http://justinfagnani.com/2015/12/21/real-mixins-with-javascript-classes/
//
Object.defineProperty(exports, "__esModule", { value: true });
function mix(superclass) {
    return new MixinBuilder(superclass);
}
exports.mix = mix;
class MixinBuilder {
    constructor(superclass) {
        this.superclass = superclass;
    }
    with(...mixins) {
        return mixins.reduce((c, mixin) => mixin(c), this.superclass);
    }
}
exports.MixinBuilder = MixinBuilder;
//----------------------------------------------------------------------
//
//  Examples
//
//----------------------------------------------------------------------
class BaseClass {
    constructor(...args) { }
    boo() {
        // console.log('boo from BaseClass');
    }
}
function ExtraMixin(superclass) {
    return class extends superclass {
        constructor(...args) {
            super(args);
        }
        boo() {
            super.boo();
            // console.log('boo from ExtraMixin');
        }
        foo() {
            // console.log('foo from ExtraMixin');
        }
    };
}
exports.ExtraMixin = ExtraMixin;
class ExtraClass extends mix(BaseClass).with(ExtraMixin) {
    constructor(...args) {
        super(args);
        this.boo();
        this.foo();
    }
}
const extraClass = new ExtraClass();
