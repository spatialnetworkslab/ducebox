export function createSource (data) {
  return {
    forEachRow (fn) {
      const nrow = getNrow(data)

      for (let i = 0; i < nrow; i++) {
        const row = {}
        for (const columnName in data) row[columnName] = data[columnName][i]

        fn(row, i)
      }
    },

    columnNames () {
      return Object.keys(data)
    }
  }
}

export function createSink (columnNames) {
  const newData = {}
  for (const columnName of columnNames) newData[columnName] = []

  return {
    addRow (row) {
      for (const columnName in row) {
        newData[columnName].push(row[columnName])
      }
    },

    prepareOutput () {
      return newData
    }
  }
}

export function getNrow (data) {
  return data[Object.keys(data)[0]].length
}
