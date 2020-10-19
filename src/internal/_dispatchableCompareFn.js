export default function _dispatchableCompareFn (fn) {
  return function (column) {
    const getValue = column.constructor === Function
      ? column
      : row => row[column]

    return function (rowA, rowB) {
      return fn(getValue(rowA), getValue(rowB))
    }
  }
}
