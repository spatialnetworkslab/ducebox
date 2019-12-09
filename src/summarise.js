export function summarise (summariseObject) {
  return {
    type: 'summarise',
    summariseObject
  }
}

export function mean (columnName) {
  return {
    initialValue: 0,
    reducer: (accumulator, row) => accumulator + row[columnName],
    afterReduce: (result, length) => result / length
  }
}

export function sum (columnName) {
  return {
    initialValue: 0,
    reducer: (accumulator, row) => accumulator + row[columnName]
  }
}
