export function groupBy (...columnNames) {
  return {
    type: 'groupBy',
    columnNames: [...new Set(columnNames)]
  }
}
