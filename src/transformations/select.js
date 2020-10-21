import { map } from 'ramda'

export default function select (columns, df) {
  const selectFn = _getSelectFn(columns)
  return df
    ? map(selectFn, df)
    : map(selectFn)
}

export function _getSelectFn (columns) {
  return row => {
    const newRow = {}

    for (let i = 0; i < columns.length; i++) {
      const columnName = columns[i]
      newRow[columnName] = row[columnName]
    }

    return newRow
  }
}
