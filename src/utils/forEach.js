import { getDataLength } from './index.js'

export function forEachRow (data, fn) {
  const dataLength = getDataLength(data)

  for (let i = 0; i < dataLength; i++) {
    const row = {}

    for (const columnName in data) row[columnName] = data[columnName][i]
    fn(row, i)
  }
}

export function forRowByIndex (data, indices, fn) {
  for (let i = 0; i < indices.length; i++) {
    const index = indices[i]
    const row = {}

    for (const columnName in data) row[columnName] = data[columnName][index]
    fn(row, index)
  }
}
