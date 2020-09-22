import { getNrow } from '../utils/misc.js'

export function toRowOriented (columnOrientedData) {
  const rowData = []
  const nrow = getNrow(columnOrientedData)

  for (let i = 0; i < nrow; i++) {
    const row = {}

    for (const columnName in columnOrientedData) {
      row[columnName] = columnOrientedData[columnName][i]
    }

    rowData.push(row)
  }

  return rowData
}
