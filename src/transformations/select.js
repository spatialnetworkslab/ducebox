export function select (data, ...selection) {
  const newData = {}

  for (const columnName of selection) {
    newData[columnName] = data[columnName]
  }

  return newData
}
