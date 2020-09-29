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
    const id = predicatePerGroup.getId(row)
    predicatePerGroup.set(id, getPredicate(row.$nested))
  })

  return function (row, i) {
    const id = predicatePerGroup.getId(row)
    const predicate = predicatePerGroup.get(id)
    return predicate(row, i) ? row : undefined
  }
}

filterBy = curryTransformation(filterBy)

export { filterBy }
