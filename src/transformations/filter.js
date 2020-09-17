import { curryTransformation } from './_curry.js'
import { getDataLength } from '../utils'

let filter = function (data, condition) {
  const dataLength = getDataLength(data)
  const row = {}
  const newData = initNewData(data)

  for (let i = 0; i < dataLength; i++) {
    for (const columnName in data) {
      row[columnName] = data[columnName][i]
    }

    if (condition(row, i)) {
      for (const columnName in data) {
        newData[columnName].push(row[columnName])
      }
    }
  }

  return newData
}

filter = curryTransformation(filter)

export { filter }

export function initNewData (data) {
  const newData = {}

  for (const columnName in data) {
    newData[columnName] = []
  }

  return newData
}
