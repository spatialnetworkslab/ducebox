import { FOLDABLE_REDUCER } from '../symbols.js'

export function enableColumnNameSyntax (fn) {
  // These reducers all only take 1 argument, so we only need to check the first
  return function (arg) {
    if (arg.constructor === String) {
      return { [arg]: fn }
    }

    if (arg.constrctor === Array) {
      return fn(arg)
    }
  }
}

export function attachFoldableVersion (transformation, foldableVersion) {
  transformation[FOLDABLE_REDUCER] = foldableVersion
  return transformation
}
