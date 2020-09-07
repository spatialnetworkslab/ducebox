export function select (data, ...selectionColumnNames) {
  const newData = {}

  for (const columnName of selectionColumnNames) {
    newData[columnName] = data[columnName]
  }

  return newData
}
