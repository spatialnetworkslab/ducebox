import { sum } from './sum.js'

export function mean (array) {
  const total = sum(array)
  return total / array.length
}

export const foldableMean = {
  startValue: 0,
  fold (currentValue, previousValue) {
    return previousValue + currentValue
  },
  finally (value, length) {
    return value / length
  }
}
