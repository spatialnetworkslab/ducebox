import { createSource, createSink } from '../io/columnOriented.js'
import { transduce } from '../utils/transduce.js'
import { curryTransformation } from './_curry.js'

let filter = function (data, predicate) {
  const source = createSource(data)
  const sink = createSink(source.columnNames())

  const rowOperation = createRowOperation(predicate)

  return transduce(source, rowOperation, sink)
}

function createRowOperation (predicate) {
  return (row, i) => predicate(row, i) ? row : undefined
}

filter = curryTransformation(filter, {
  type: 'rowOperation',
  createRowOperation
})

export { filter }
