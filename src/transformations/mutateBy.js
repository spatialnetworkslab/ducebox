import { getDataLength, getId } from '../utils'
import { nestBy } from './nestBy.js'
import { getMutateColumnNames, getMutateFunctions, initNewData } from './mutate.js'
import { curryTransformation } from './_curry.js'

let mutateBy = function (data, ...args) {
  const { mutateInstructions, by } = parseArgs(args)
  const nestedData = nestBy('$nested', by)(data)
  const nestedDataLength = getDataLength(nestedData)

  const mutateColumnNames = getMutateColumnNames(mutateInstructions)
  const mutateFunctionGetters = getMutateFunctions(mutateInstructions)

  const mutateFunctionHolder = initMutateFunctionHolder(mutateColumnNames)

  for (let i = 0; i < nestedDataLength; i++) {
    const id = getId(nestedData, i, by)

    for (let j = 0; j < mutateColumnNames.length; j++) {
      const columnName = mutateColumnNames[i]
      const getMutateFunction = mutateFunctionGetters[i]

      mutateFunctionHolder[columnName][id] = getMutateFunction(nestedData.$nested[i])
    }
  }

  const dataLength = getDataLength(data)
  const newData = initNewData(data)

  for (let i = 0; i < dataLength; i++) {
    const id = getId(data, i, by)
    const row = {}

    for (const columnName in data) {
      row[columnName] = data[columnName][i]
    }

    for (let i = 0; i < mutateColumnNames.length; i++) {
      const columnName = mutateColumnNames[i]
      const mutateFunction = mutateFunctionHolder[columnName][id]

      newData[columnName].push(mutateFunction(row, i))
    }
  }

  return newData
}

mutateBy = curryTransformation(mutateBy)

export { mutateBy }

function parseArgs (args) {
  const mutateInstructions = []

  for (let i = 0; i < args.length - 1; i++) {
    mutateInstructions.push(args[i])
  }

  const by = args[args.length - 1]

  return { mutateInstructions, by }
}

function initMutateFunctionHolder (mutateColumnNames) {
  const mutateFuntionHolder = {}

  for (const columnName of mutateColumnNames) {
    mutateFuntionHolder[columnName] = {}
  }

  return mutateFuntionHolder
}
