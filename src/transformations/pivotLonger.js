import { curryTransformation } from './_curry.js'
import { getNrow } from '../utils/misc.js'

let pivotLonger = function (
  data,
  pivotColumnNames,
  {
    namesTo = 'names',
    valuesTo = 'values'
  }
) {
  const dataColumnNames = Object.keys(data)
  const pivotColumnNamesSet = new Set(pivotColumnNames)
  const idColumnNames = dataColumnNames.filter(columnName => !pivotColumnNamesSet.has(columnName))

  const nrow = getNrow(data)
  const newData = initNewData(idColumnNames, namesTo, valuesTo)

  for (let i = 0; i < nrow; i++) {
    for (let j = 0; j < pivotColumnNames.length; j++) {
      const pivotColumnName = pivotColumnNames[j]
      const pivotColumnValue = data[pivotColumnName][i]

      for (let k = 0; k < idColumnNames.length; k++) {
        const columnName = idColumnNames[k]
        newData[columnName].push(data[columnName][i])
      }

      newData[namesTo].push(pivotColumnName)
      newData[valuesTo].push(pivotColumnValue)
    }
  }

  return newData
}

pivotLonger = curryTransformation(pivotLonger)

export { pivotLonger }

function initNewData (idColumnNames, namesTo, valuesTo) {
  const newData = {}

  for (const columnName in idColumnNames) {
    newData[columnName] = []
  }

  newData[namesTo] = []
  newData[valuesTo] = []

  return newData
}
