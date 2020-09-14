import { getDataLength, getId } from '../utils'

export function pivotWider (
  data,
  {
    namesFrom,
    valuesFrom,
    valuesFill = null
  }
) {
  const length = getDataLength(data)
  const idColumnNames = Object.keys(data).filter(columnName => {
    return columnName !== namesFrom && columnName !== valuesFrom
  })

  const newData = initNewData(
    idColumnNames,
    data[namesFrom],
    length,
    valuesFill
  )

  let currentRowIndex = -1
  const idToRowIndex = {}

  for (let i = 0; i < length; i++) {
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

function initNewData (idColumnNames, namesFromColumn, length, valuesFill) {
  const newData = {}
  const newColumns = new Set(namesFromColumn)

  for (const columnName of idColumnNames) {
    newData[columnName] = []
  }

  for (const columnName of newColumns) {
    newData[columnName] = new Array(length).fill(valuesFill)
  }

  return newData
}
