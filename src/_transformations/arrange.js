import { curryTransformation } from './_curry.js'
import { CURRIED_COMPARE_FN } from '../symbols.js'
import { slice } from './slice.js'
import { getKeyValuePair } from '../utils/misc.js'

let arrange = function (data, ...arrangeInstructions) {
  let newData

  for (let i = arrangeInstructions.length - 1; i >= 0; i--) {
    const arrangeInstruction = arrangeInstructions[i]
    newData = arrangeSingleInstruction(newData || data, arrangeInstruction)
  }

  return newData
}

arrange = curryTransformation(arrange)

export { arrange }

function arrangeSingleInstruction (data, arrangeInstruction) {
  const { key: columnName } = getKeyValuePair(arrangeInstruction)
  const compareFunction = getCompareFunction(arrangeInstruction[columnName])

  const column = data[columnName]

  const indices = column.map((_, i) => i)
  const arrangedIndices = indices.sort((a, b) => compareFunction(column[a], column[b]))

  return slice(arrangedIndices)(data)
}

function getCompareFunction (fn) {
  if (fn[CURRIED_COMPARE_FN]) return fn()

  return fn
}
