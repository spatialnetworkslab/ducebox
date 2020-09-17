import { enableColumnNameSyntax, attachFoldableVersion } from './_curry.js'

let sum = function (array) {
  let total = 0

  for (let i = 0; i < array.length; i++) {
    total += array[i]
  }

  return total
}

const foldableSum = {
  startValue: 0,
  fold (currentValue, previousValue) {
    return previousValue + currentValue
  },
  finally (value, length) {
    return value
  }
}

sum = enableColumnNameSyntax(sum)
sum = attachFoldableVersion(sum, foldableSum)

export { sum }
