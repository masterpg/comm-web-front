//--------------------------------------------------
//  qs (https://github.com/ljharb/qs)
//--------------------------------------------------

declare module qs {
  function parse(str: string, options?: {
    allowDots?: boolean,
    allowPrototypes?: boolean,
    arrayLimit?: number,
    decoder?: Function,
    delimiter?: string,
    depth?: number,
    parameterLimit?: number,
    plainObjects?: boolean,
    strictNullHandling?: boolean,
  }): any;
}
