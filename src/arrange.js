export function arrange (...arrangeInstructions) {
  return {
    type: 'arrange',
    arrangeInstructions
  }
}

export function ascending (columnName) {
  return {
    compareFunction: (a, b) => a - b,
    columnName
  }
}

export function descending (columnName) {
  return {
    compareFunction: (a, b) => b - a,
    columnName
  }
}
