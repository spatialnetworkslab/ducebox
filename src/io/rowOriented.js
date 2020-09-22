export function init () {
  return []
}

export function forEachRow (data, fn) {
  const nrow = getNrow(data)

  for (let i = 0; i < nrow; i++) {
    fn(data[i], i)
  }
}

export function addRow (data, row) {
  data.push(row)
}

export function prepareOutput (data) {
  return data
}

export function getColumnNames (data) {
  return Object.keys(data[0])
}

function getNrow (data) {
  return data.length
}
