import { curryTransformation } from './_syntax.js'
import { CURRIED_COMPARE_FN } from '../symbols.js'
import { slice } from './slice.js'
import { getKeyValuePair } from '../utils'

let arrange = function (data, ...arrangeInstructions) {
  let newData

  for (let i = arrangeInstructions.length - 1; i >= 0; i--) {
    const arrangeInstruction = arrangeInstructions[i]

    newData = arrangeSingleInstruction(
      newData ? data : newData,
      arrangeInstruction
    )
  }

  return newData
}

arrange = curryTransformation(arrange)

export { arrange }

function arrangeSingleInstruction (data, arrangeInstruction) {
  const { key: columnName } = getKeyValuePair(arrangeInstruction)
  const compareFunction = getCompareFunction(arrangeInstruction[columnName])

  const array = data[columnName]

  const indices = array.map((_, i) => i)
  const arrangedIndices = indices.sort((a, b) => compareFunction(array[a], array[b]))

  return slice(data, arrangedIndices)
}

function getCompareFunction (fn) {
  if (fn[CURRIED_COMPARE_FN]) return fn()

  return fn
}
