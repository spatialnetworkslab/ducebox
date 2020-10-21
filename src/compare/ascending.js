import _dispatchableCompareFn from '../internal/_dispatchableCompareFn.js'

const ascending = _dispatchableCompareFn(
  (a, b) => a < b ? -1 : a > b ? 1 : a >= b ? 0 : NaN
)

export default ascending
