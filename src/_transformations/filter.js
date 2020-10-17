function _filter (input, output, predicate) {
  return input.reduce(filterReduce(predicate), output)
}

function filterReduce (predicate) {

}

const filter = _filter

export { filter }

// import { createSource, createSink } from '../io/columnOriented.js'
// import { transduce } from '../core/transduce.js'
// import { curryTransformation } from './_curry.js'

// let filter = function (data, predicate) {
//   const source = createSource(data)
//   const sink = createSink(source.columnNames())

//   const rowOperation = createRowOperation(predicate)

//   return transduce(source, rowOperation, sink)
// }

// function createRowOperation (predicate) {
//   return (row, i) => predicate(row, i) ? row : undefined
// }

// const deriveColumns = c => c

// filter = curryTransformation(filter, {
//   type: 'rowWise',
//   createRowOperation,
//   deriveColumns
// })

// export { filter }
