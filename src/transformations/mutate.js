import { getDataLength, getKeyValuePair } from '../utils'

export function mutate (data, ...mutateInstructions) {
  const dataLength = getDataLength(data)
  const newData = initNewData(data, mutateInstructions)

  const mutateColumnNames = getMutateColumnNames(mutateInstructions)
  const mutateFunctions = getMutateFunctions(mutateInstructions)

  for (let i = 0; i < dataLength; i++) {
    const row = {}

    for (const columnName in data) {
      row[columnName] = data[columnName][i]
    }

    for (let i = 0; i < mutateColumnNames.length; i++) {
      const columnName = mutateColumnNames[i]
      const mutateFunction = mutateFunctions[i]

      newData[columnName].push(mutateFunction(row, i))
    }
  }

  return newData
}

export function transmute (data, ...transmuteInstructions) {
  const newData = mutate(data, ...transmuteInstructions)
  const mutateColumnNames = new Set(getMutateColumnNames(transmuteInstructions))

  for (const columnName in newData) {
    if (!(mutateColumnNames.has(columnName))) {
      delete newData[columnName]
    }
  }

  return newData
}

function initNewData (data, mutateInstructions) {
  const newData = Object.assign({}, data)

  const dataColumnNames = new Set(Object.keys(data))
  const mutateColumnNames = getMutateColumnNames(mutateInstructions)

  for (const columnName of mutateColumnNames) {
    if (!dataColumnNames.has(columnName)) {
      newData[columnName] = []
    }
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
