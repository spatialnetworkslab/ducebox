export default function processArrangeCycle (data, input, output, arrangeInstructions) {
  const dataLength = input.getDataLength(data)
  if (dataLength < 2) return data

  const indexArray = new Array(dataLength).fill(0).map((_, i) => i)
  const compareFunction = createCompareFunction(data, arrangeInstructions)

  indexArray.sort(compareFunction)

  return output.sortIntoOrder(data, indexArray)
}

function createCompareFunction (data, arrangeInstructions) {
  return function compare (a, b) {
    for (let i = 0; i < arrangeInstructions.length; i++) {
      const { columnName, compareFunction } = arrangeInstructions[i]
      const compareResult = compareFunction(data[columnName][a], data[columnName][b])

      if (compareResult !== 0) return compareResult
    }

    return 0
  }
}
