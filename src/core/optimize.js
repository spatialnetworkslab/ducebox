import { ARGS, META } from '../symbols.js'
import { transduce } from './transduce.js'
import { pipe, parsePipeArgs } from './pipe.js'
import { createSource, createSink } from '../io/columnOriented.js'

export function optimize (...args) {
  const transformations = parsePipeArgs(args)
  const optimizedTransformations = []

  let rowWiseTransformations = []

  transformations.forEach(transformation => {
    const meta = transformation[META]
    const isRowWise = meta && meta.type === 'rowWise'

    if (isRowWise) {
      rowWiseTransformations.push(transformation)
    }

    if (!isRowWise) {
      if (rowWiseTransformations.length > 0) {
        optimizedTransformations.push(combineRowWiseTransformations(rowWiseTransformations))
        rowWiseTransformations = []
      }

      optimizedTransformations.push(transformation)
    }
  })

  if (rowWiseTransformations.length > 0) {
    optimizedTransformations.push(combineRowWiseTransformations(rowWiseTransformations))
  }

  return optimizedTransformations
}

function combineRowWiseTransformations (rowWiseTransformations) {
  if (rowWiseTransformations.length === 1) {
    return rowWiseTransformations[0]
  }

  const combinedRowOperation = getCombinedRowOperation(rowWiseTransformations)
  const deriveColumnNames = getColumnNameDeriver(rowWiseTransformations)

  return function (data) {
    const source = createSource(data)
    const sink = createSink(deriveColumnNames(source.columnNames()))

    return transduce(source, combinedRowOperation, sink)
  }
}

export function getCombinedRowOperation (rowWiseTransformations) {
  const rowOperations = rowWiseTransformations.map(transformation => {
    const meta = transformation[META]
    const args = transformation[ARGS]

    return meta.createRowOperation(...args)
  })

  return pipe(rowOperations)
}

export function getColumnNameDeriver (rowWiseTransformations) {
  const columnNameDerivers = rowWiseTransformations.map(transformation => {
    const meta = transformation[META]
    const args = transformation[ARGS]

    return columnSet => meta.deriveColumns(columnSet, ...args)
  })

  return pipe(columnNameDerivers)
}
