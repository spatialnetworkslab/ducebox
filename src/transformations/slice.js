import { getIndices } from '../utils/getIndices.js'

export function slice (data, indices) {
  const newData = {}

  for (const columnName in data) {
    newData[columnName] = getIndices(data[columnName], indices)
  }

  return newData
}
