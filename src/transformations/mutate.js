import { curryTransformation } from './_curry.js'
import { getDataLength, getKeyValuePair } from '../utils'

let mutate = function (data, ...mutateInstructions) {
  const dataLength = getDataLength(data)
  const newData = initNewData(data, mutateInstructions)

  const mutateColumnNames = getMutateColumnNames(mutateInstructions)
  const mutateFunctions = getMutateFunctions(mutateInstructions)

  for (let i = 0; i < dataLength; i++) {
    const row = {}

    for (const columnName in data) {
      row[columnName] = data[columnName][i]
    }

    for (let j = 0; j < mutateColumnNames.length; j++) {
      const columnName = mutateColumnNames[j]
      const mutateFunction = mutateFunctions[j]

      row[columnName] = mutateFunction(row, i)
    }

    for (const columnName in row) {
      newData[columnName].push(row[columnName])
    }
  }

  return newData
}

mutate = curryTransformation(mutate)

export { mutate }

export function initNewData (data, mutateInstructions) {
  const newData = {}

  const dataColumnNames = new Set(Object.keys(data))
  const mutateColumnNames = getMutateColumnNames(mutateInstructions)

  for (const columnName of dataColumnNames) {
    newData[columnName] = []
  }

  for (const columnName of mutateColumnNames) {
    newData[columnName] = []
  }

  return newData
}

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
