import { ARGS, FN_META } from '../symbols.js'

export function curryTransformation (transformation, meta) {
  return function (...args) {
    const fn = function (data) {
      return transformation(data, ...args)
    }

    fn[ARGS] = args

    fn[FN_META] = {
      name: transformation.name,
      ...meta
    }

    return fn
  }
}
