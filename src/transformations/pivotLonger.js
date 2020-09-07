export function pivotLonger (
  data,
  pivotColumnNames,
  {
    namesTo = 'names',
    valuesTo = 'values'
  }
) {
  const dataColumnNames = Object.keys(data)
  const pivotColumnNamesSet = new Set(pivotColumnNames)
  const idColumnNames = dataColumns.filter(columnName => !pivotColumnNamesSet.has(columnName))

  
}
