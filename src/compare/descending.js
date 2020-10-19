import _dispatchableCompareFn from '../internal/_dispatchableCompareFn.js'

const descending = _dispatchableCompareFn(
  (a, b) => b < a ? -1 : b > a ? 1 : b >= a ? 0 : NaN
)

export default descending
