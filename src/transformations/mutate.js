import { curryTransformation } from './_curry.js'
import { createSource, createSink } from '../io/columnOriented.js'
import { getKeyValuePair } from '../utils/misc.js'
import { transduce } from '../core/transduce.js'

let mutate = function (data, ...mutateInstructions) {
  const source = createSource(data)
  const sink = createSink([
    ...Object.keys(data),
    ...getMutateColumnNames(mutateInstructions)]
  )

  const rowOperation = createRowOperation(...mutateInstructions)

  return transduce(source, rowOperation, sink)
}

function createRowOperation (...mutateInstructions) {
  const mutateColumnNames = getMutateColumnNames(mutateInstructions)
  const mutateFunctions = getMutateFunctions(mutateInstructions)

  return function (row, i) {
    for (let j = 0; j < mutateColumnNames.length; j++) {
      const columnName = mutateColumnNames[j]
      const mutateFunction = mutateFunctions[j]

      row[columnName] = mutateFunction(row, i)
    }

    return row
  }
}

function deriveColumns (columnSet, ...mutateInstructions) {
  for (const mutateInstruction of mutateInstructions) {
    const { key: newColumnName } = getKeyValuePair(mutateInstruction)
    columnSet.add(newColumnName)
  }

  return columnSet
}

mutate = curryTransformation(mutate, {
  type: 'rowWise',
  createRowOperation,
  deriveColumns
})

export { mutate }

export function getMutateColumnNames (mutateInstructions) {
  return mutateInstructions.map(instruction => {
    const { key: columnName } = getKeyValuePair(instruction)
    return columnName
  })
}

export function getMutateFunctions (mutateInstructions) {
  return mutateInstructions.map(instruction => {
    const { value: fn } = getKeyValuePair(instruction)
    return fn
  })
}
