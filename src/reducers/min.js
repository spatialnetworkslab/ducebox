import { enableColumnNameSyntax, attachFoldableVersion } from './index.js'

let min = function (array) {
  return Math.min(...array)
}

const foldableMin = {
  startValue: Infinity,
  fold (currentValue, previousValue) {
    return currentValue < previousValue
      ? currentValue
      : previousValue
  },
  finally (value, length) {
    return value
  }
}

min = enableColumnNameSyntax(min)
min = attachFoldableVersion(min, foldableMin)

export { min }
