export default function getResultingColumnNames (data, transformations, input) {
  const resultingColumnNames = new Set(input.getColumnNames(data))

  for (const transformation of transformations) {
    if (transformation.type === 'mutate') {
      resultingColumnNames.add(transformation.newColumnName)
    }

    if (transformation.type === 'select') {
      for (const columnName of resultingColumnNames) {
        if (!transformation.columnNames.has(columnName)) {
          resultingColumnNames.delete(columnName)
        }
      }
    }
  }

  return [...resultingColumnNames]
}
