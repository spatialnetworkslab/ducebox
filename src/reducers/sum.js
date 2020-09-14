export function sum (array) {
  let total = 0

  for (let i = 0; i < array.length; i++) {
    total += array[i]
  }

  return total
}

export const foldableSum = {
  startValue: 0,
  fold (currentValue, previousValue) {
    return previousValue + currentValue
  },
  finally (value, length) {
    return value
  }
}
