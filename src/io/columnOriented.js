export function init (inputColumnNames) {
  const newData = {}
  for (const columnName of inputColumnNames) newData[columnName] = []

  return newData
}

export function forEachRow (data, fn) {
  const nrow = getNrow(data)

  for (let i = 0; i < nrow; i++) {
    const row = {}
    for (const columnName in data) row[columnName] = data[columnName][i]

    fn(row, i)
  }
}

export function addRow (data, row) {
  for (const columnName in row) {
    data[columnName].push(row[columnName])
  }
}

export function prepareOutput (data) {
  return data
}

export function getColumnNames (data) {
  return Object.keys(data)
}

function getNrow (data) {
  return data[Object.keys(data)[0]].length
}
