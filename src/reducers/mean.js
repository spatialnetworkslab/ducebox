import { enableColumnNameSyntax, attachFoldableVersion } from './_curry.js'
import { sum } from './sum.js'

let mean = function (array) {
  const total = sum(array)
  return total / array.length
}

const foldableMean = {
  startValue: 0,
  fold (currentValue, previousValue) {
    return previousValue + currentValue
  },
  finally (value, length) {
    return value / length
  }
}

mean = enableColumnNameSyntax(mean)
mean = attachFoldableVersion(mean, foldableMean)

export { mean }
