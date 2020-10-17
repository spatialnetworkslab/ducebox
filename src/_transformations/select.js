import { curryTransformation } from './_curry.js'

let select = function (data, ...selectionColumnNames) {
  const newData = {}

  for (const columnName of selectionColumnNames) {
    newData[columnName] = data[columnName]
  }

  return newData
}

function createRowOperation (...selectionColumnNames) {
  const selection = new Set(selectionColumnNames)

  return function (row, i) {
    for (const columnName in row) {
      if (!selection.has(columnName)) {
        delete row[columnName]
      }
    }
  }
}

function deriveColumns (columnSet, ...selectionColumnNames) {
  return new Set(selectionColumnNames)
}

select = curryTransformation(select, {
  type: 'rowWise',
  createRowOperation,
  deriveColumns
})

export { select }
