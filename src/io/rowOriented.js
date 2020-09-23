export function createSource (data) {
  return {
    forEachRow (fn) {
      for (let i = 0; i < data.length; i++) {
        fn(data[i])
      }
    },

    columnNames () {
      return Object.keys(data[0])
    }
  }
}

export function createSink (columnNames) {
  const newData = []

  return {
    addRow (row) {
      newData.push(row)
    },

    prepareOutput () {
      return newData
    }
  }
}
