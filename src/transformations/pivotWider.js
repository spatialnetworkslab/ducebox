import { curryTransformation } from './_curry.js'
import { getNrow, getId } from '../utils/misc.js'

let pivotWider = function (
  data,
  {
    namesFrom,
    valuesFrom,
    valuesFill = null
  }
) {
  const nrow = getNrow(data)
  const idColumnNames = Object.keys(data).filter(columnName => {
    return columnName !== namesFrom && columnName !== valuesFrom
  })

  const newData = initNewData(
    idColumnNames,
    data[namesFrom],
    nrow,
    valuesFill
  )

  let currentRowIndex = -1
  const idToRowIndex = {}

  for (let i = 0; i < nrow; i++) {
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
    const columnName = data[namesFrom][i]

    newData[columnName][rowIndex] = data[valuesFrom][i]
  }

  const newNrow = newData[idColumnNames[0]].length

  for (const columnName in newData) {
    newData[columnName].length = newNrow
  }

  return newData
}

pivotWider = curryTransformation(pivotWider)

export { pivotWider }

function initNewData (idColumnNames, namesFromColumn, nrow, valuesFill) {
  const newData = {}
  const newColumns = new Set(namesFromColumn)

  for (const columnName of idColumnNames) {
    newData[columnName] = []
  }

  for (const columnName of newColumns) {
    newData[columnName] = new Array(nrow).fill(valuesFill)
  }

  return newData
}
