import { slice } from './slice.js'

export function arrange (data, ...arrangeInstructions) {
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

function arrangeSingleInstruction (data, arrangeInstruction) {
  const columnName = Object.keys(arrangeInstruction)[0]
  const compareFunction = arrangeInstruction[columnName]

  const array = data[columnName]

  const indices = array.map((_, i) => i)
  const arrangedIndices = indices.sort((a, b) => compareFunction(array[a], array[b]))

  return slice(data, arrangedIndices)
}
