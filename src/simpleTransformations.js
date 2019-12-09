export function filter (condition) {
  return {
    type: 'filter',
    condition
  }
}

export function mutate (newColumnName, calculationFunc) {
  return {
    type: 'mutate',
    newColumnName,
    calculationFunc
  }
}

export function select (...columnNames) {
  return {
    type: 'select',
    columnNames: new Set(columnNames)
  }
}
