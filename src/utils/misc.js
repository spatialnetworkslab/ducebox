export function getNrow (data) {
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
  let id = '$'

  for (let i = 0; i < columnNames.length; i++) {
    const columnName = columnNames[i]

    id += data[columnName][rowNumber]
    id += '$'
  }

  return id
}

export function shallowCopy (data) {
  const nrow = getNrow(data)
  const newData = {}

  for (const columnName in data) {
    newData[columnName] = []

    for (let i = 0; i < nrow; i++) {
      newData[columnName].push(data[columnName][i])
    }
  }

  return newData
}
