import { curryTransformation } from './_curry.js'
import { filter } from './filter.js'
import { nest } from './nest.js'
import { createSource, createSink } from '../io/columnOriented.js'
import { keyMap } from '../utils/keyMap.js'
import { transduce } from '../core/transduce.js'

let filterBy = function (data, getPredicate, by = []) {
  if (by.length === 0) {
    return filter(getPredicate(data))(data)
  }

  const source = createSource(data)
  const sink = createSink(source.columnNames())

  const rowOperation = createRowOperation(data, getPredicate, by)

  return transduce(source, rowOperation, sink)
}

function createRowOperation (data, getPredicate, by) {
  const nestedDataSource = createSource(nest('$nested', by)(data))
  const predicatePerGroup = keyMap(by)

  nestedDataSource.forEachRow(row => {
    predicatePerGroup.set(row, getPredicate(row.$nested))
  })

  return function (row, i) {
    const predicate = predicatePerGroup.get(row)
    return predicate(row, i) ? row : undefined
  }
}

filterBy = curryTransformation(filterBy)

export { filterBy }
