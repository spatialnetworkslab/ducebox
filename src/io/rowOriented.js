export default {
  getDataLength,
  getColumnNames,
  getRow,
  initData,
  addRow,
  sortIntoOrder
}

function getDataLength (data) {
  return data.length
}

function getColumnNames (data) {
  return Object.keys(data[0])
}

function getRow (data, index) {
  return data[index]
}

function initData (columns) {
  return []
}

function addRow (data, row) {
  data.push(row)
}

function sortIntoOrder (data, indexArray) {
  return indexArray.map(index => data[index])
}
