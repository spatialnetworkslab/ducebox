import { forEachEntry } from '../utils/forEach.js'
import { enableColumnNameSyntax } from '../utils/curry.js'

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

const compareFunctions = forEachEntry(
  originalCompareFunctions,
  enableColumnNameSyntax
)

export { compareFunctions }
