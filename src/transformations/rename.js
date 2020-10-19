import { map } from 'ramda'

export default function rename (renameInstructions, df) {
  const renameFn = _getRenameFn(renameInstructions)
  return df
    ? map(renameFn, df)
    : map(renameFn)
}

function _getRenameFn (renameInstructions) {
  return row => {
    const newRow = Object.assign({}, row)

    for (const newCol in renameInstructions) {
      const oldCol = renameInstructions[newCol]
      newRow[newCol] = newRow[oldCol]
      delete newRow[oldCol]
    }

    return newRow
  }
}
