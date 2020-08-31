export function getIndices (array, indices) {
  const result = []

  for (let i = 0; i < indices.length; i++) {
    const index = indices[i]
    result.push(array[index])
  }

  return result
}