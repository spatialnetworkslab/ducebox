import { getDataLength, getKeyValuePair } from '../utils'

export function mutate (data, ...mutateInstructions) {
  const length = getDataLength(data)
  const newData = initNewData(data, mutateInstructions)

  for (let i = 0; i < length; i++) {
    const row = {}

    for (const columnName in data) {
      row[columnName] = data[columnName][i]
    }

    for (const mutateInstruction of mutateInstructions) {
      const { key: columnName, value: mutateFunction } = getKeyValuePair(mutateInstruction)
      newData[columnName][i] = mutateFunction(row, i)
    }
  }

  return newData
}

export function transmute (data, ...transmuteInstructions) {
  const newData = mutate(data, ...transmuteInstructions)
  const mutateColumns = getMutateColumns(transmuteInstructions)

  for (const columnName in newData) {
    if (!(mutateColumns.has(columnName))) {
      delete newData[columnName]
    }
  }

  return newData
}

function initNewData (data, mutateInstructions) {
  const length = getDataLength(data)
  const newData = Object.assign({}, data)

  const dataColumns = new Set(Object.keys(data))
  const mutateColumns = getMutateColumns(mutateInstructions)

  for (const columnName of mutateColumns) {
    if (!dataColumns.has(columnName)) {
      newData[columnName] = new Array(length).fill(undefined)
    }
  }

  return newData
}

function getMutateColumns (mutateInstructions) {
  return new Set(mutateInstructions.map(instruction => {
    const { key: column } = getKeyValuePair(instruction)
    return column
  }))
}
