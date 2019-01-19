export declare type Constructor<T = any> = new (...args: any[]) => T;
export declare type Mixin<BASE, RESULT> = (superclass: Constructor<BASE>) => Constructor<RESULT>;
export declare function mix<T>(superclass: Constructor<T>): MixinBuilder<T>;
export declare class MixinBuilder<T> {
    constructor(superclass: Constructor<T>);
    superclass: Constructor<T>;
    with<A>(MixinA: Mixin<T, A>): Constructor<T> & Constructor<A>;
    with<A, B>(MixinA: Mixin<T, A>, MixinB: Mixin<T, B>): Constructor<T> & Constructor<A> & Constructor<B>;
    with<A, B, C>(MixinA: Mixin<T, A>, MixinB: Mixin<T, B>, MixinC: Mixin<T, C>): Constructor<T> & Constructor<A> & Constructor<B> & Constructor<C>;
    with<A, B, C, D>(MixinA: Mixin<T, A>, MixinB: Mixin<T, B>, MixinC: Mixin<T, C>, MixinD: Mixin<T, D>): Constructor<T> & Constructor<A> & Constructor<B> & Constructor<C> & Constructor<D>;
    with<A, B, C, D, E>(MixinA: Mixin<T, A>, MixinB: Mixin<T, B>, MixinC: Mixin<T, C>, MixinD: Mixin<T, D>, MixinE: Mixin<T, E>): Constructor<T> & Constructor<A> & Constructor<B> & Constructor<C> & Constructor<D> & Constructor<E>;
}
declare class BaseClass {
    constructor(...args: any[]);
    boo(): void;
}
interface Extra {
    foo(): void;
}
export declare function ExtraMixin(superclass: Constructor<BaseClass>): Constructor<Extra>;
export {};
