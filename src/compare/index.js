import { forEachEntry } from '../utils/forEach.js'

// https://beta.observablehq.com/@mbostock/manipulating-flat-arrays
// Also works for dates
const ascending = (a, b) => a < b ? -1 : a > b ? 1 : a >= b ? 0 : NaN
const descending = (a, b) => b < a ? -1 : b > a ? 1 : b >= a ? 0 : NaN

const ascendingStr = (a, b) => {
  const sorted = [a, b].sort()
  return sorted[0] === a ? -1 : 1
}

const descendingStr = (a, b) => {
  const sorted = [a, b].sort()
  return sorted[0] === a ? 1 : -1
}

const originalCompareFunctions = {
  ascending,
  descending,
  ascendingStr,
  descendingStr
}

function enableColumnNameSyntax (fn) {
  /*
   * This currying layer slows down the compare function if the user wants
   * to use the function directly, like `array.sort(ascending)`, because
   * of the argument length check. However, the layer can be peeled off by using
   * `array.sort(ascending())`, which will yield the normal uncurried function.
   * Not ideal syntax-wise, but seems for now the most reasonable solution.
   * In any case, this should be documented.
   */
  return function (...args) {
    if (args.length === 2) return fn(...args)

    if (args.length === 0) return fn

    if (args.length === 1) {
      return { [args[0]]: fn }
    }
  }
}

const compareFunctions = forEachEntry(
  originalCompareFunctions,
  enableColumnNameSyntax
)

export { compareFunctions }
