import { sum } from './sum.js'

export function mean (array) {
  if (array.length === 0) return null

  const total = sum(array)
  return total / array.length
}
