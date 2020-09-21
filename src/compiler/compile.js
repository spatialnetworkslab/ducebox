import { getDataLength } from '../utils'

export function compile (fns) {
  const rowOperations = getRowOperations(fns)
  const sink = createSink(fns)

  return createOptimizedTransformation(rowOperations, sink)
}

function getRowOperations () {}

function createSink () {}

function createOptimizedTransformation (rowOperations, sink) {
  return function (data) {
    const dataLength = getDataLength(data)

    for (let i = 0; i < dataLength; i++) {
      const row = {}
      for (const columnName in data) row[columnName] = data[columnName][i]

      let skipRow = false

      for (let j = 0; j < rowOperations.length; j++) {
        const rowOperation = rowOperations[j]

        if (rowOperation.type === 'filter') {
          if (!rowOperation.condition(row)) {
            skipRow = true
            break
          }
        } else {
          rowOperation.update(row)
        }
      }

      if (!skipRow) {
        sink.add(row)
      }
    }

    return sink.output()
  }
}
