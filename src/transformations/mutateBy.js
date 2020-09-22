import { getDataLength, getId, getKeyValuePair, shallowCopy } from '../utils/misc.js'
import { nest } from './nest.js'
import { mutate } from './mutate.js'
import { curryTransformation } from './_curry.js'

let mutateBy = function (data, ...args) {
  const { mutateInstructions, by } = parseArgs(args)

  if (by.length === 0) {
    return mutateWithoutBy(data, mutateInstructions)
  }

  return _mutateBy(data, mutateInstructions, by)
}

mutateBy = curryTransformation(mutateBy)

export { mutateBy }

function parseArgs (args) {
  const lastArg = args[args.length - 1]
  const lastArgIsBy = lastArg.constructor === Array

  const by = lastArgIsBy
    ? lastArg
    : []

  const mutateInstructions = []

  for (let i = 0; i < args.length - 1; i++) {
    mutateInstructions.push(args[i])
  }

  if (!lastArgIsBy) mutateInstructions.push(lastArg)

  return { mutateInstructions, by }
}

function mutateWithoutBy (data, mutateInstructions) {
  const parsedMutateInstructions = []

  for (const mutateInstruction of mutateInstructions) {
    const {
      key: columnName,
      value: getMutateFunction
    } = getKeyValuePair(mutateInstruction)

    parsedMutateInstructions.push({
      [columnName]: getMutateFunction(data)
    })
  }

  return mutate(...parsedMutateInstructions)(data)
}

function _mutateBy (data, mutateInstructions, by) {
  const dataLength = getDataLength(data)
  const newData = initNewData(data, mutateInstructions)

  let firstRound = true

  for (const mutateInstruction of mutateInstructions) {
    const nestedData = nest('$nested', by)(firstRound ? data : newData)
    const nestedDataLength = getDataLength(nestedData)

    const {
      key: mutateColumnName,
      value: getMutateFunction
    } = getKeyValuePair(mutateInstruction)

    const mutateFunctionHolder = {}

    for (let i = 0; i < nestedDataLength; i++) {
      const id = getId(nestedData, i, by)
      mutateFunctionHolder[id] = getMutateFunction(nestedData.$nested[i])
    }

    for (let i = 0; i < dataLength; i++) {
      const id = getId(data, i, by)
      const row = {}

      for (const columnName in data) {
        row[columnName] = data[columnName][i]
      }

      const mutateFunction = mutateFunctionHolder[id]
      newData[mutateColumnName].push(mutateFunction(row, i))
    }

    firstRound = false
  }

  return newData
}

function initNewData (data, mutateInstructions) {
  const newData = shallowCopy(data)

  for (const mutateInstruction of mutateInstructions) {
    const { key: columnName } = getKeyValuePair(mutateInstruction)
    newData[columnName] = []
  }

  return newData
}
