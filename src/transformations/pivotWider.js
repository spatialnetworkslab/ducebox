import { curryTransformation } from './_curry.js'
import { getDataLength, getId } from '../utils'

let pivotWider = function (
  data,
  {
    namesFrom,
    valuesFrom,
    valuesFill = null
  }
) {
  const dataLength = getDataLength(data)
  const idColumnNames = Object.keys(data).filter(columnName => {
    return columnName !== namesFrom && columnName !== valuesFrom
  })

  const newData = initNewData(
    idColumnNames,
    data[namesFrom],
    dataLength,
    valuesFill
  )

  let currentRowIndex = -1
  const idToRowIndex = {}

  for (let i = 0; i < dataLength; i++) {
    const id = getId(data, i, idColumnNames)

    if (!(id in idToRowIndex)) {
      currentRowIndex++
      idToRowIndex[id] = currentRowIndex

      for (let j = 0; j < idColumnNames.length; j++) {
        const columnName = idColumnNames[j]
        newData[columnName].push(data[columnName][i])
      }
    }

    const rowIndex = idToRowIndex[id]
    const columnName = data[valuesFrom][i]

    newData[columnName][rowIndex] = data[valuesFrom][i]
  }

  const newDataLength = newData[idColumnNames[0]].length

  for (const columnName in newData) {
    newData[columnName].length = newDataLength
  }

  return newData
}

pivotWider = curryTransformation(pivotWider)

export { pivotWider }

function initNewData (idColumnNames, namesFromColumn, dataLength, valuesFill) {
  const newData = {}
  const newColumns = new Set(namesFromColumn)

  for (const columnName of idColumnNames) {
    newData[columnName] = []
  }

  for (const columnName of newColumns) {
    newData[columnName] = new Array(dataLength).fill(valuesFill)
  }

  return newData
}
