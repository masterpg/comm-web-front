//
// このミックスインの実装は下記URLを参考にしている:
// http://justinfagnani.com/2015/12/21/real-mixins-with-javascript-classes/
//

export type Constructor<T = any> = new (...args: any[]) => T

export type Mixin<BASE, RESULT> = (superclass: Constructor<BASE>) => Constructor<RESULT>

export function mix<T>(superclass: Constructor<T>): MixinBuilder<T> {
  return new MixinBuilder<T>(superclass)
}

export class MixinBuilder<T> {
  constructor(superclass: Constructor<T>) {
    this.superclass = superclass
  }

  superclass: Constructor<T>

  with<A>(MixinA: Mixin<T, A>): Constructor<T> & Constructor<A>
  with<A, B>(MixinA: Mixin<T, A>, MixinB: Mixin<T, B>): Constructor<T> & Constructor<A> & Constructor<B>
  with<A, B, C>(MixinA: Mixin<T, A>, MixinB: Mixin<T, B>, MixinC: Mixin<T, C>): Constructor<T> & Constructor<A> & Constructor<B> & Constructor<C>
  with<A, B, C, D>(
    MixinA: Mixin<T, A>,
    MixinB: Mixin<T, B>,
    MixinC: Mixin<T, C>,
    MixinD: Mixin<T, D>
  ): Constructor<T> & Constructor<A> & Constructor<B> & Constructor<C> & Constructor<D>
  with<A, B, C, D, E>(
    MixinA: Mixin<T, A>,
    MixinB: Mixin<T, B>,
    MixinC: Mixin<T, C>,
    MixinD: Mixin<T, D>,
    MixinE: Mixin<T, E>
  ): Constructor<T> & Constructor<A> & Constructor<B> & Constructor<C> & Constructor<D> & Constructor<E>
  with(...mixins) {
    return mixins.reduce((c, mixin) => mixin(c), this.superclass)
  }
}

//----------------------------------------------------------------------
//
//  Examples
//
//----------------------------------------------------------------------

class BaseClass {
  constructor(...args: any[]) {}

  boo(): void {
    // console.log('boo from BaseClass');
  }
}

interface Extra {
  foo(): void
}

export function ExtraMixin(superclass: Constructor<BaseClass>): Constructor<Extra> {
  return class extends superclass implements Extra {
    constructor(...args: any[]) {
      super(args)
    }

    boo(): void {
      super.boo()
      // console.log('boo from ExtraMixin');
    }

    foo(): void {
      // console.log('foo from ExtraMixin');
    }
  }
}

class ExtraClass extends mix(BaseClass).with(ExtraMixin) {
  constructor(...args: any[]) {
    super(args)
    this.boo()
    this.foo()
  }
}

const extraClass = new ExtraClass()
