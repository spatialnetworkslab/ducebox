export function max (array) {
  return Math.max(...array)
}

export const foldableMax = {
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
