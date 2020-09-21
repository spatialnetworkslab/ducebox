import { ARGS, FN_NAME } from '../symbols.js'

export function curryTransformation (transformation) {
  return function (...args) {
    const fn = function (data) {
      return transformation(data, ...args)
    }

    fn[ARGS] = args
    fn[FN_NAME] = transformation.name

    return fn
  }
}
