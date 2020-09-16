import { getDataLength, getId } from '../utils'

export function nestBy (data, nestColumnName, by, construct) {
  const dataLength = getDataLength(data)
  const newData = initNewData(nestColumnName, by)

  let currentRowIndex = -1
  const idToRowIndex = {}

  for (let i = 0; i < dataLength; i++) {
    const id = getId(data, i, by)

    if (!(id in idToRowIndex)) {
      currentRowIndex++
      idToRowIndex[id] = currentRowIndex

      for (let j = 0; j < by.length; j++) {
        const columnName = by[j]
        newData[columnName].push(data[columnName][i])
      }

      newData[nestColumnName].push(initNestedData(data))
    }

    const rowIndex = idToRowIndex[id]

    for (const columnName in data) {
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

function initNewData (nestColumnName, by) {
  const newData = { [nestColumnName]: [] }

  for (const columnName of by) {
    newData[columnName] = []
  }

  return newData
}

function initNestedData (data) {
  const nestedData = {}

  for (const columnName in data) {
    nestedData[columnName] = []
  }

  return nestedData
}
