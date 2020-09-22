import { getDataLength } from '../utils/misc.js'

export function toRowOriented (columnOrientedData) {
  const rowData = []
  const dataLength = getDataLength(columnOrientedData)

  for (let i = 0; i < dataLength; i++) {
    const row = {}

    for (const columnName in columnOrientedData) {
      row[columnName] = columnOrientedData[columnName][i]
    }

    rowData.push(row)
  }

  return rowData
}
