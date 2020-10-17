import { enableColumnNameSyntax, attachFoldableVersion } from './_curry.js'

let max = function (array) {
  return Math.max(...array)
}

const foldableMax = {
  startValue: -Infinity,
  fold (currentValue, previousValue) {
    return currentValue > previousValue
      ? currentValue
      : previousValue
  },
  finally (value, length) {
    return value
  }
}

max = enableColumnNameSyntax(max)
max = attachFoldableVersion(max, foldableMax)

export { max }
