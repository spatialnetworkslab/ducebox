import { curryTransformation } from './_curry.js'
import { getDataLength, getId } from '../utils/index.js'

let nest = function (data, nestColumnName, by = [], construct) {
  if (by.length === 0) {
    return { [nestColumnName]: [data] }
  }

  const dataLength = getDataLength(data)
  const newData = initNewData(nestColumnName, by)

  let currentRowIndex = -1
  const idToRowIndex = {}

  const notByColumns = Object.keys(data).filter(columnName => !by.includes(columnName))

  for (let i = 0; i < dataLength; i++) {
    const id = getId(data, i, by)

    if (!(id in idToRowIndex)) {
      currentRowIndex++
      idToRowIndex[id] = currentRowIndex

      for (let j = 0; j < by.length; j++) {
        const columnName = by[j]
        newData[columnName].push(data[columnName][i])
      }

      newData[nestColumnName].push(initNestedData(notByColumns))
    }

    const rowIndex = idToRowIndex[id]

    for (let j = 0; j < notByColumns.length; j++) {
      const columnName = notByColumns[j]

      newData[nestColumnName][rowIndex][columnName].push(
        data[columnName][i]
      )
    }
  }

  if (construct) {
    const newDataLength = getDataLength(newData)

    for (let i = 0; i < newDataLength; i++) {
      newData[nestColumnName][i] = construct(newData[nestColumnName][i])
    }
  }

  return newData
}

nest = curryTransformation(nest)

export { nest }

function initNewData (nestColumnName, by) {
  const newData = { [nestColumnName]: [] }

  for (const columnName of by) {
    newData[columnName] = []
  }

  return newData
}

function initNestedData (notByColumns) {
  const nestedData = {}

  for (const columnName of notByColumns) {
    nestedData[columnName] = []
  }

  return nestedData
}
