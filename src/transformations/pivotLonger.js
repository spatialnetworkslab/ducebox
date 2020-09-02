export function pivotLonger (
  data,
  pivotColumns,
  {
    namesTo = 'names',
    valuesTo = 'values'
  }
) {
  const dataColumns = Object.keys(data)
  const pivotColumnsSet = new Set(pivotColumns)
  const idColumns = dataColumns.filter(columnName => !pivotColumnsSet.has(columnName))
}
