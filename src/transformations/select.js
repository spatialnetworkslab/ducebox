import { curryTransformation } from './_syntax.js'

let select = function (data, ...selectionColumnNames) {
  const newData = {}

  for (const columnName of selectionColumnNames) {
    newData[columnName] = data[columnName]
  }

  return newData
}

select = curryTransformation(select)

export { select }
