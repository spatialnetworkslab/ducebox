const compareFunctions = {
  number: {
    // https://beta.observablehq.com/@mbostock/manipulating-flat-arrays
    // Also works for dates
    ascending: (a, b) => a < b ? -1 : a > b ? 1 : a >= b ? 0 : NaN,
    descending: (a, b) => b < a ? -1 : b > a ? 1 : b >= a ? 0 : NaN
  },

  string: {
    ascending: (a, b) => {
      const sorted = [a, b].sort()
      return sorted[0] === a ? -1 : 1
    },
    descending: (a, b) => {
      const sorted = [a, b].sort()
      return sorted[0] === a ? 1 : -1
    }
  }
}

export function ascending (columnName) {

}

export function descending (columnName) {

}
