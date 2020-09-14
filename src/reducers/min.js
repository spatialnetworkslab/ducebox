export function min (array) {
  return Math.min(...array)
}

export const foldableMin = {
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
