import { getNrow } from '../utils/misc.js'
import { ARGS, FN_NAME } from '../symbols.js'

const rowTransformations = new Set(['filter', 'mutate', 'select'])

export function combine (fns) {
  const rowOperations = getRowOperations(fns)
  const sink = createSink(fns)

  return createOptimizedTransformation(rowOperations, sink)
}

function getRowOperations (fns) {
  const rowOperations = []

  for (const fn of fns) {
    const type = fn[FN_NAME]

    if (rowTransformations.has(type)) {
      const args = fn[ARGS]
      rowOperations.push(parseRowOperation(type, args))
    }
  }

  return rowOperations
}

function parseRowOperation (type, args) {
  const rowOperation = { type }

  if (type === 'filter') {

  }

  if (type === 'mutate') {

  }

  if (type === 'select') {

  }
}

function createSink () {}

function createOptimizedTransformation (rowOperations, sink) {
  return function (data) {
    const nrow = getNrow(data)

    for (let i = 0; i < nrow; i++) {
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
