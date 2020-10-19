import { _dispatchableCompareFn } from '../internal/_dispatchableCompareFn.js'

const ascendingStr = _dispatchableCompareFn((a, b) => {
  const sorted = [a, b].sort()
  return sorted[0] === a ? -1 : 1
})

export default ascendingStr
