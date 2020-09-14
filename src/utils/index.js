export function getDataLength (data) {
  return data[Object.keys(data)[0]].length
}

export function getIndices (array, indices) {
  const result = []

  for (let i = 0; i < indices.length; i++) {
    const index = indices[i]
    result.push(array[index])
  }

  return result
}

export function getKeyValuePair (object) {
  const key = Object.keys(object)[0]
  const value = object[key]

  return { key, value }
}

export function getId (data, rowNumber, columnNames) {
  let id = ''

  for (let i = 0; i < columnNames.length; i++) {
    const columnName = columnNames[i]

    id += '$'
    id += data[columnName][rowNumber].toString()
  }

  return id
}
