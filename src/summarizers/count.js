import { enableColumnNameSyntax, attachFoldableVersion } from './_curry.js'

let count = function (array) {
  return array.length
}

const foldableCount = {
  startValue: -1,
  fold (currentValue, previousValue) {
    return previousValue + 1
  },
  finally (value, length) {
    return value
  }
}

count = enableColumnNameSyntax(count)
count = attachFoldableVersion(count, foldableCount)

export { count }
