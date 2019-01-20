//--------------------------------------------------
//  qs (https://github.com/ljharb/qs)
//--------------------------------------------------

declare namespace qs {
  function parse(
    str: string,
    options?: {
      allowDots?: boolean
      allowPrototypes?: boolean
      arrayLimit?: number
      decoder?: () => void
      delimiter?: string
      depth?: number
      parameterLimit?: number
      plainObjects?: boolean
      strictNullHandling?: boolean,
    },
  ): any
}
