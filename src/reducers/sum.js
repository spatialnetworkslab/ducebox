export function sum (array) {
  if (array.length === 0) return null

  let total = 0

  for (let i = 0; i < array.length; i++) {
    total += array[i]
  }

  return total
}
