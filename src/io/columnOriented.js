export default {
  getDataLength,
  getColumnNames,
  getRow,
  initData,
  addRow,
  sortIntoOrder
}

function getDataLength (data) {
  return data[Object.keys(data)[0]].length
}

function getColumnNames (data) {
  return Object.keys(data)
}

function getRow (data, index) {
  const row = {}

  for (const columnName in data) {
    row[columnName] = data[columnName][index]
  }

  return row
}

function initData (columns) {
  const newData = {}

  for (const columnName of columns) {
    newData[columnName] = []
  }

  return newData
}

function addRow (data, row) {
  for (const columnName in row) {
    data[columnName].push(row[columnName])
  }
}

function sortIntoOrder (data, indexArray) {
  const newData = {}

  for (const columnName in data) {
    newData[columnName] = indexArray.map(index => data[columnName][index])
  }

  return newData
}
