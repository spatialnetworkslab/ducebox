import { sum } from './sum.js'

export function mean (array) {
  const total = sum(array)
  return total / array.length
}
