export function count (array) {
  return array.length
}

export const foldableCount = {
  startValue: -1,
  fold (currentValue, previousValue) {
    return previousValue + 1
  },
  finally (value, length) {
    return value
  }
}
