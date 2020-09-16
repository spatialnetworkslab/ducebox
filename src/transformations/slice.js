import { curryTransformation } from './_syntax.js'
import { getIndices } from '../utils'

let slice = function (data, indices) {
  const newData = {}

  for (const columnName in data) {
    newData[columnName] = getIndices(data[columnName], indices)
  }

  return newData
}

slice = curryTransformation(slice)

export { slice }
